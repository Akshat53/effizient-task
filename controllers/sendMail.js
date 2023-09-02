var Brevo = require('@getbrevo/brevo');
var defaultClient = Brevo.ApiClient.instance;

var partnerKey = defaultClient.authentications['partner-key'];
partnerKey.apiKey = process.env.BREVO_API_KEY;
var apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

// transactional email
var transacMailApi = new Brevo.TransactionalEmailsApi();
var sendSmtpEmail = new Brevo.SendSmtpEmail();

exports.sendMail = async (req, res) => {
    try {
        const formData = req.body;
        
        // Extract form fields
        const recipientEmail = formData.email; // Extract the recipient's email from the form

        sendSmtpEmail.sender = { "name": "Akshat", "email": "akshat.singh@gmail.com" };
        sendSmtpEmail.to = [{ "name": "Recipient Name", "email": recipientEmail }]; // Use the recipient's email
        sendSmtpEmail.subject = "Form Data";
        
        // Construct the email content with form data
        sendSmtpEmail.htmlContent = `<html><body>
            Email: ${formData.email}<br>
            Phone: ${formData.contact}<br>
            Name: ${formData.name}<br>
        </body></html>`;

        sendSmtpEmail.replyTo = { "name": "Akshat", "email": "akshat.singh@gmail.com" };
        sendSmtpEmail.headers = { "X-Mailin-custom": `partner-key:${process.env.BREVO_API_KEY}|api-key:${process.env.BREVO_API_KEY}` };
        sendSmtpEmail.tags = ["task"];

        // Send the email
        const emailResponse = await transacMailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully. Response:', emailResponse);

        res.status(200).json({
            success: true,
            message: "Your message is received. Team will contact you soon!"
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: "Error Occurred. Can not contact our team!"
        });
    }
};
