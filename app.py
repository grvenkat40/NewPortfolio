from flask import Flask, render_template, request, redirect, url_for, flash, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)
app.secret_key = 'aS3cr3t!Key#789@dev'

# ------------------ Flask-Mail Config ------------------
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'venkat2040gr@gmail.com'  # Your Gmail
app.config['MAIL_PASSWORD'] = 'oipo nbgc hejs oiuq'    # App Password
app.config['MAIL_DEFAULT_SENDER'] = 'venkat2040gr@gmail.com'

mail = Mail(app)

# ------------------ Routes ------------------

@app.route('/send_message', methods=['GET', 'POST'])
def send_message():
    if request.method == 'POST':
        name = request.form.get('name')
        email = request.form.get('email')
        message = request.form.get('message')

        if not name or not email or not message:
            flash("All fields are required!", "error")
            return redirect(url_for('index'))

        # Print to console
        print(f"Name: {name}, Email: {email}, Message: {message}")

        # Send email
        try:
            msg = Message(
                subject=f"New Contact Form Submission from {name}",
                sender=email,
                recipients=['venkat2040gr@gmail.com'],  # Your email to receive messages
                body=f"Name: {name}\nEmail: {email}\nMessage: {message}"
            )
            mail.send(msg)
            flash("Message sent successfully 👋", "success")
        except Exception as e:
            print(f"Error sending email: {e}")
            flash("Failed to send message. Try again later.", "error")



@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
