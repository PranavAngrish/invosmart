import os
import json
import re
from io import BytesIO
from typing import Optional, Dict, Any
from pdf2image import convert_from_path
from paddleocr import PaddleOCR
from llama_index.core import VectorStoreIndex, Document
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
from jsonschema import validate, ValidationError
import cv2
import numpy as np
from .config import settings


# Initialize PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang="en")

# JSON Schema for invoice validation
INVOICE_SCHEMA = {
    "type": "object",
    "properties": {
        "invoice_info": {
            "type": "object",
            "properties": {
                "number": {"type": "string"},
                "date": {"type": "string"},
                "due_date": {"type": "string"},
                "po_number": {"type": "string"}
            },
            "required": ["number", "date", "due_date"]
        },
        "bill_to": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "address": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["name", "address"]
        },
        "ship_to": {
            "type": "object",
            "properties": {
                "name": {"type": "string"},
                "address": {"type": "array", "items": {"type": "string"}}
            },
            "required": ["name", "address"]
        },
        "line_items": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "description": {"type": "string"},
                    "unit_price": {"type": "number"},
                    "amount": {"type": "number"}
                },
                "required": ["description", "unit_price", "amount"]
            }
        },
        "summary": {
            "type": "object",
            "properties": {
                "subtotal": {"type": "number"},
                "tax_rate": {"type": "number"},
                "tax_amount": {"type": "number"},
                "total": {"type": "number"}
            },
            "required": ["subtotal", "tax_amount", "total"]
        }
    },
    "required": ["invoice_info", "bill_to", "line_items", "summary"]
}

def clean_json_response(response_str: str) -> str:
    """
    Clean the JSON response from the LLM by removing markdown code blocks and trailing commas.
    """
    try:
        # Extract JSON content using regex
        json_match = re.search(r'\{.*\}', response_str, re.DOTALL)
        if json_match:
            cleaned = json_match.group()
            # Remove trailing commas
            cleaned = re.sub(r',\s*}', '}', cleaned)
            cleaned = re.sub(r',\s*]', ']', cleaned)
            return cleaned
        return response_str
    except Exception as e:
        print(f"Error cleaning response: {e}")
        return response_str

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file using PaddleOCR.
    """
    try:
        # Convert PDF to images (only first page for efficiency)
        images = convert_from_path(pdf_path, dpi=200, first_page=1, last_page=1)
        
        # Convert image to numpy array for OCR
        img = np.array(images[0])
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        
        # Perform OCR
        result = ocr.ocr(img, cls=False)
        
        # Combine all detected text into a single string
        extracted_text = ' '.join([word[1][0] for line in result for word in line])
        return extracted_text
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

def extract_invoice_data(file_path: str) -> Optional[VectorStoreIndex]:
    """
    Process a PDF file and create a vector index for the extracted text.
    """
    try:
        # Extract text from PDF
        extracted_text = extract_text_from_pdf(file_path)
        if not extracted_text:
            raise ValueError("No text extracted from PDF")
        
        # Create a document for the extracted text
        document = Document(text=extracted_text)
        
        # Initialize embedding model
        embed_model = HuggingFaceEmbedding(model_name=settings.embed_model)
        
        # Create vector index
        vector_index = VectorStoreIndex.from_documents([document], embed_model=embed_model)
        
        print(f"✅ Invoice '{os.path.basename(file_path)}' processed successfully!")
        return vector_index
    except Exception as e:
        print(f"❌ Processing error: {e}")
        return None

def extract_json_invoice(vector_index: VectorStoreIndex) -> Optional[Dict[str, Any]]:
    """
    Extract structured invoice data from the vector index using an LLM.
    """
    try:
        if not vector_index:
            print("⚠ No valid index found")
            return None

        # Initialize LLM
        llm = HuggingFaceInferenceAPI(
            model_name=settings.llm_model,
            token=settings.huggingface_token,
            context_window=8192,
            max_tokens=4000,
            temperature=0.1,
            top_p=0.95
        )

        # Create query engine
        query_engine = vector_index.as_query_engine(llm=llm)

        # Define extraction prompt
        extraction_prompt = (
            "Extract invoice details strictly in this JSON format:\n"
            "{\n"
            '  "invoice_info": {"number": "", "date": "", "due_date": "", "po_number": ""},\n'
            '  "bill_to": {"name": "", "address": []},\n'
            '  "ship_to": {"name": "", "address": []},\n'
            '  "line_items": [{"description": "", "unit_price": 0.0, "amount": 0.0}],\n'
            '  "summary": {"subtotal": 0.0, "tax_rate": 0.0, "tax_amount": 0.0, "total": 0.0}\n'
            "}\n\n"
            "Rules:\n"
            "1. Only valid JSON, no markdown\n"
            "2. Dates as DD/MM/YYYY\n"
            "3. Numerical values as floats\n"
            "4. Empty strings for missing data\n"
            "5. Address as array of strings\n\n"
            "Text to process:\n"
        )

        # Query the LLM
        response = query_engine.query(extraction_prompt)
        cleaned_response = clean_json_response(response.response)

        try:
            # Parse and validate the JSON response
            invoice_data = json.loads(cleaned_response)
            validate(instance=invoice_data, schema=INVOICE_SCHEMA)
            
            # Save the extracted data to a file (for debugging)
            with open("invoice_data.json", "w") as f:
                json.dump(invoice_data, f, indent=4)
            
            print("\n✅ Valid invoice data extracted:")
            print(json.dumps(invoice_data, indent=4))
            return invoice_data
            
        except ValidationError as ve:
            print(f"❌ Validation error: {ve}")
            return {"error": "Schema validation failed", "details": str(ve)}
            
        except json.JSONDecodeError as je:
            print(f"❌ JSON parsing error: {je}")
            print(f"Raw response: {cleaned_response}")
            return {"error": "Invalid JSON", "raw_response": cleaned_response}

    except Exception as e:
        print(f"❌ Extraction error: {e}")
        return None