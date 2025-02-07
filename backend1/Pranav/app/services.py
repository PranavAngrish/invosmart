# app/services.py
import imaplib
import email
import os
from datetime import datetime
from sqlalchemy.orm import Session
from .database import SessionLocal
from .ocr_processor import extract_invoice_data, extract_json_invoice
from .config import settings
from .models import Invoice

class EmailMonitor:
    def __init__(self, config):
        self.config = config
        self.running = True

    async def start_monitoring(self):
        while self.running:
            try:
                self.check_emails()
            except Exception as e:
                logger.error(f"Email monitoring error: {str(e)}")
            await asyncio.sleep(300)  # Check every 5 minutes

    def check_emails(self):
        mail = imaplib.IMAP4_SSL(self.config.imap_server)
        mail.login(self.config.email_user, self.config.email_password)
        mail.select('inbox')

        status, messages = mail.search(None, 'UNSEEN')
        if status != 'OK':
            return

        for num in messages[0].split():
            try:
                status, data = mail.fetch(num, '(RFC822)')
                msg = email.message_from_bytes(data[0][1])
                self.process_message(msg, num, mail)
            except Exception as e:
                logger.error(f"Error processing email: {str(e)}")

        mail.close()
        mail.logout()

    def process_message(self, msg, num, mail):
        db = SessionLocal()
        try:
            for part in msg.walk():
                if part.get_content_maintype() == 'multipart':
                    continue
                if part.get('Content-Disposition') is None:
                    continue

                filename = part.get_filename()
                if filename and filename.lower().endswith('.pdf'):
                    file_path = os.path.join(self.config.upload_dir, filename)
                    with open(file_path, 'wb') as f:
                        f.write(part.get_payload(decode=True))

                    vector_index = extract_invoice_data(file_path)
                    invoice_data = extract_json_invoice(vector_index)

                    # Store in database
                    new_invoice = Invoice(
                        original_filename=filename,
                        ocr_json=invoice_data,
                        validation_status="pending"
                    )
                    db.add(new_invoice)
                    db.commit()

                    # Mark email as processed
                    mail.store(num, '+FLAGS', '\\Seen')
                    logger.info(f"Processed invoice: {filename}")
                    
        finally:
            db.close()

class OCRProcessor:
    @staticmethod
    def process_invoice(file_path):
        vector_index = extract_invoice_data(file_path)
        if not vector_index:
            raise ValueError("Failed to create vector index")
        return extract_json_invoice(vector_index)