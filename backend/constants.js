const sendOtpHtmlTemplate = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>OTP Verification</title>
    <style>
      .container {
        max-width: 400px;
        margin: 40px auto;
        padding: 24px;
        border-radius: 8px;
        background: #f9f9f9;
        font-family: Arial, sans-serif;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      }
      .otp {
        font-size: 2em;
        color: #2d8cff;
        letter-spacing: 4px;
        margin: 16px 0;
      }
      .footer {
        margin-top: 24px;
        font-size: 0.9em;
        color: #888;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h2>Email Verification</h2>
      <p>Your OTP for email verification is:</p>
      <div class="otp">{{OTP}}</div>
      <p>This OTP is valid for 10 minutes.</p>
      <div class="footer">
        If you did not request this, please ignore this email.<br>
        &copy; {{YEAR}} E-commerce App
      </div>
    </div>
  </body>
</html>`;

export {sendOtpHtmlTemplate};