function EmailMessageTemplate(userName, otp) {
    return `<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px; margin: auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
    <tr>
      <td align="center" style="padding: 30px 20px; background-color: #4CAF50; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="margin: 0; font-size: 24px;">Account Created Successfully!</h1>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px; color: #333;">
        <p>Hi <strong>${userName}</strong>,</p>
        <p>Thank you for signing up with <strong>[Your Company Name]</strong>.</p>
        <p>Your account has been created successfully. Please verify your email address to activate your account:</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="https://yourdomain.com/verify?token=your-verification-token" style="background-color: #4CAF50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">${otp}</a>
        </p>
        <p>If the button doesn’t work, copy and paste this otp into your browser:</p>
        <p style="word-break: break-all;">
                     
        </p>
        <p>If you did not create this account, you can safely ignore this email.</p>
        <p>Best regards,<br><strong>The [Your Company Name] Team</strong></p>
      </td>
    </tr>
    <tr>
      <td align="center" style="padding: 20px; font-size: 12px; color: #777;">
        <p>&copy; 2025 [Your Company Name]. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>`
}

module.exports=EmailMessageTemplate;