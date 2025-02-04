import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import secrets
import uuid

class EmailService:
    def _init_(self, smtp_host, smtp_port, smtp_username, smtp_password):
        self.smtp_host = smtp_host
        self.smtp_port = smtp_port
        self.smtp_username = smtp_username
        self.smtp_password = smtp_password

    def generate_verification_token(self):
        return str(uuid.uuid4())

    def send_verification_email(self, to_email, verification_token):
        msg = MIMEMultipart()
        msg['From'] = self.smtp_username
        msg['To'] = to_email
        msg['Subject'] = 'Email Verification'

        verification_link = f"http://yourdomain.com/verify?token={verification_token}"
        body = f"""
        Click the link below to verify your email:
        {verification_link}
        
        This link will expire in 24 hours.
        """
        
        msg.attach(MIMEText(body, 'plain'))

        try:
            with smtplib.SMTP(self.smtp_host, self.smtp_port) as server:
                server.starttls()
                server.login(self.smtp_username, self.smtp_password)
                server.send_message(msg)
            return True
        except Exception as e:
            print(f"Email sending failed: {e}")
            return False