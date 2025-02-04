import os
import json
import re
from dotenv import load_dotenv
from pdf2image import convert_from_path
from paddleocr import PaddleOCR
from llama_index.core import VectorStoreIndex, Document
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.huggingface_api import HuggingFaceInferenceAPI
from io import BytesIO
import cv2
import numpy as np
from jsonschema import validate, ValidationError

# Load API keys from .env file
load_dotenv()
HF_TOKEN = os.getenv('HUGGINGFACE_TOKEN')

# Model settings
LLM_MODEL = "meta-llama/Meta-Llama-3-8B-Instruct"
EMBED_MODEL = "BAAI/bge-small-en-v1.5"

# Initialize PaddleOCR
ocr = PaddleOCR(use_angle_cls=True, lang="en")

# JSON Schema validation
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

def clean_json_response(response_str):
    """Extract JSON content from LLM response"""
    try:
        # Remove markdown code blocks and non-JSON text
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

def extract_text_from_pdf(pdf_path):
    """Extract text from PDF using PaddleOCR"""
    try:
        # Reduce DPI and process only first page
        images = convert_from_path(pdf_path, dpi=200, first_page=1, last_page=1)
        
        # Direct numpy conversion
        img = np.array(images[0])
        img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
        
        # Perform OCR
        result = ocr.ocr(img, cls=False)
        
        return ' '.join([word[1][0] for line in result for word in line])
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""

def extract_invoice_data(file_path):
    """Process PDF and create vector index"""
    try:
        extracted_text = extract_text_from_pdf(file_path)
        document = Document(text=extracted_text)
        embed_model = HuggingFaceEmbedding(model_name=EMBED_MODEL)
        vector_index = VectorStoreIndex.from_documents([document], embed_model=embed_model)

        print(f"✅ Invoice '{os.path.basename(file_path)}' processed successfully!")
        return vector_index
    except Exception as e:
        print(f"❌ Processing error: {e}")
        return None

def extract_json_invoice(vector_index):
    """Extract structured data using LLM"""
    try:
        if not vector_index:
            print("⚠ No valid index found")
            return None

        llm = HuggingFaceInferenceAPI(
            model_name=LLM_MODEL,
            token=HF_TOKEN,
            context_window=8192,
            max_tokens=4000,
            temperature=0.1,
            top_p=0.95
        )

        query_engine = vector_index.as_query_engine(llm=llm)

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

        response = query_engine.query(extraction_prompt)
        cleaned_response = clean_json_response(response.response)

        try:
            invoice_data = json.loads(cleaned_response)
            validate(instance=invoice_data, schema=INVOICE_SCHEMA)
            
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

if _name_ == "_main_":
    file_path = "inv.pdf"
    
    # Step 1: Process PDF
    vector_index = extract_invoice_data(file_path)
    
    # Step 2: Extract structured data
    if vector_index:
        result = extract_json_invoice(vector_index)
        if result and "error" not in result:
            print("\nFinal output saved to invoice_data.json")