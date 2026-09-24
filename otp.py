from flask import Flask, render_template, request, jsonify
import smtplib
import random
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# SMTP server configuration
SMTP_SERVER = "smtp.mailersend.net"
SMTP_PORT = 587  # TLS port
SENDER_EMAIL = "<SMTP EMAIL>"
PASSWORD = "<SMTP PASSWORD>"  # Replace with your actual password

# In-memory storage for OTP and user emails (For demonstration)
otp_storage = {}

def send_otp(receiver_email, otp):
    """Send OTP to the user's email"""
    try:
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, PASSWORD)

            subject = "One Time Password (OTP) for verification"
            body = f"Dear User,\n\nYour One Time Password (OTP) is {otp}."
            message = f"Subject: {subject}\n\n{body}"

            server.sendmail(SENDER_EMAIL, receiver_email, message)
            print(f"OTP sent to {receiver_email}")

    except smtplib.SMTPException as e:
        print(f"SMTP error: {e}")
    except Exception as e:
        print(f"Error: {e}")

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_otp', methods=['POST'])
def send_otp_request():
    user_email = request.form['email']
    otp = random.randint(100000, 999999)  # Generate OTP
    
    # Store OTP for verification later
    otp_storage[user_email] = otp
    
    # Send OTP to the user's email
    send_otp(user_email, otp)
    
    return jsonify({"message": "OTP sent to your email!"})

@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    user_email = request.form['email']
    entered_otp = request.form['otp']
    
    if user_email in otp_storage and otp_storage[user_email] == int(entered_otp):
        return jsonify({"message": "OTP Verified!"})
    else:
        return jsonify({"message": "Invalid OTP!"})

if __name__ == '__main__':
    app.run(port=5000)
