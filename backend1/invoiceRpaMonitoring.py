import imaplib
import email
import os
from datetime import datetime
from your_ocr_module import extract_invoice_data, extract_json_invoice
from fuzzywuzzy import fuzz

class InvoiceMonitor:
    def _init_(self, email_address, email_password, imap_server):
        self.email_address = email_address
        self.email_password = email_password
        self.imap_server = imap_server

    def validate_invoice_with_backend(self, invoice_data, session):
        po_match = session.query(PurchaseOrder).filter_by(
            po_number=invoice_data['invoice_info']['po_number']
        ).first()

        grn_match = session.query(GRN).filter_by(
            po_number=invoice_data['invoice_info']['po_number']
        ).first()

        # Fuzzy matching logic
        if po_match and grn_match:
            po_similarity = fuzz.ratio(str(po_match.total_amount), 
                                       str(invoice_data['summary']['total']))
            grn_similarity = fuzz.ratio(str(grn_match.quantity), 
                                        str(len(invoice_data['line_items'])))

            if po_similarity > 80 and grn_similarity > 80:
                return 'validated'
            else:
                return 'partial_match'
        return 'no_match'

    def monitor_emails_and_process_invoices(self, session):
        try:
            mail = imaplib.IMAP4_SSL(self.imap_server)
            mail.login(self.email_address, self.email_password)
            mail.select('inbox')

            # Search for unprocessed invoice emails
            _, search_data = mail.search(None, 'UNSEEN')
            for num in search_data[0].split():
                _, data = mail.fetch(num, '(RFC822)')
                raw_email = data[0][1]
                email_message = email.message_from_bytes(raw_email)

                # Check for PDF attachments
                for part in email_message.walk():
                    if part.get_content_maintype() == 'multipart':
                        continue
                    if part.get('Content-Disposition') is None:
                        continue
                    
                    filename = part.get_filename()
                    if filename and filename.lower().endswith('.pdf'):
                        # Save attachment
                        file_path = f"/path/to/invoice/storage/{filename}"
                        with open(file_path, 'wb') as f:
                            f.write(part.get_payload(decode=True))

                        # Process invoice
                        vector_index = extract_invoice_data(file_path)
                        invoice_data = extract_json_invoice(vector_index)

                        validation_status = self.validate_invoice_with_backend(invoice_data, session)

                        # Store in database
                        new_invoice = Invoice(
                            user_id=None,  # Match to appropriate user
                            ocr_json=invoice_data,
                            original_filename=filename,
                            validation_status=validation_status
                        )
                        session.add(new_invoice)
                        session.commit()

        except Exception as e:
            print(f"Email monitoring error: {e}")