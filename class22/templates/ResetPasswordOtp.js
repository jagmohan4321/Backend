function ResetPasswordOtp(firstName, otp) {
  console.log("rrr")
    return `<body style="margin:0; padding:0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table align="center" cellpadding="0" cellspacing="0" width="100%" 
    style="max-width:600px; margin:auto; background-color:#ffffff; border-radius:8px; box-shadow:0 0 10px rgba(0,0,0,0.1);">
    
    <!-- Header -->
    <tr>
      <td align="center" style="padding: 30px 20px; background-color: #4CAF50; color: white; border-top-left-radius: 8px; border-top-right-radius: 8px;">
        <h1 style="margin:0; font-size: 24px;">Account Verified Successfully!</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 20px; color: #333;">
        <p>Hi <strong>${firstName}</strong>,</p>
       <p>Use this Otp for resetting the password ${otp}</p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td align="center" style="padding: 20px; font-size: 12px; color: #777;">
        <p>&copy; 2025 Codeclimber. All rights reserved.</p>
      </td>
    </tr>
  </table>
</body>`;
}

module.exports = ResetPasswordOtp;
