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
        const recipientEmail = formData.email;

        // Set sender and recipient
        sendSmtpEmail.sender = { "name": "Form Data Response : Team Effizient", "email": "no-reply@effizient.ca" }; // Change to your sender's name and email
        sendSmtpEmail.to = [{ "name": "Recipient Name", "email": recipientEmail }]; // Use the recipient's email

        // Set email subject
        sendSmtpEmail.subject = "Statement of Purpose Submission"; // Change to your desired subject

        // Construct the email content with form data
        sendSmtpEmail.htmlContent = `<html><body>
            Email: ${formData.email}<br>
            Age: ${formData.age}<br>
            Full Name: ${formData.name}<br>
            Highest Level of Education: ${formData.educationLevel}<br>
            Education Institute: ${formData.institute}<br>
            Study Field: ${formData.study}<br>
            Work Experience: ${formData.workExperience}<br>
            Admission Institute: ${formData.admissionInstitute}<br>
            Program of Study: ${formData.programOfStudy}<br>
            Applying From: ${formData.applyingFrom}<br>
            Future Goals: ${formData.futureGoals}<br>
            Listening Score: ${formData.listeningScore}<br>
            Reading Score: ${formData.readingScore}<br>
            Speaking Score: ${formData.speakingScore}<br>
            Writing Score: ${formData.writingScore}<br>
            Tuition Payment: ${formData.tuitionPayment}<br>
            Tuition Fee: ${formData.tuitionFee}<br>
            GIC: ${formData.gic}<br>
            GIC Amount: ${formData.gicAmount}<br>
        </body></html>`;

        // Set reply-to email
        sendSmtpEmail.replyTo = { "name": "Your Name", "email": "your_email@example.com" }; // Change to your reply-to name and email

        // Set headers and tags as needed
        sendSmtpEmail.headers = { "X-Mailin-custom": `partner-key:${process.env.BREVO_API_KEY}|api-key:${process.env.BREVO_API_KEY}` };
        sendSmtpEmail.tags = ["task"]; // Modify or add tags as needed

        // Send the email
        const emailResponse = await transacMailApi.sendTransacEmail(sendSmtpEmail);
        console.log('Email sent successfully. Response:', emailResponse);

        res.status(200).json({
            success: true,
            message: "Your form data is received. You will receive an email soon."
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: "Error occurred while sending the email."
        });
    }
};
