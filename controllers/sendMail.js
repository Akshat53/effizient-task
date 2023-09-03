var Brevo = require("@getbrevo/brevo");
var defaultClient = Brevo.ApiClient.instance;

var partnerKey = defaultClient.authentications["partner-key"];
partnerKey.apiKey = process.env.BREVO_API_KEY;
var apiKey = defaultClient.authentications["api-key"];
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
    sendSmtpEmail.sender = {
      name: "Team Effizient",
      email: "no-reply@effizient.ca",
    }; // Change to your sender's name and email
    sendSmtpEmail.to = [{ name: "Recipient Name", email: recipientEmail }]; // Use the recipient's email

    // Set email subject
    sendSmtpEmail.subject = "Got The response from Form"; // Change to your desired subject

    // Construct the email content with form data
    sendSmtpEmail.htmlContent = `<html>

        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    background-color: #f5f5f5;
                    margin: 0;
                    padding: 0;
                }
                .styled-table {
                    border-collapse: collapse;
                    margin: 25px 0;
                    font-size: 0.9em;
                    font-family: sans-serif;
                    min-width: 400px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
                }
                .styled-table thead tr {
                    background-color: #009879;
                    color: #ffffff;
                    text-align: left;
                }
                .styled-table th,
.styled-table td {
    padding: 12px 15px;
}
.styled-table tbody tr {
    border-bottom: 1px solid #dddddd;
}

.styled-table tbody tr:nth-of-type(even) {
    background-color: #f3f3f3;
}

.styled-table tbody tr:last-of-type {
    border-bottom: 2px solid #009879;
}

    
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: white;
                    border-radius: 10px;
                }
        
                h2 {
                    font-family: "Times New Roman", Times, serif;
                    font-weight: 400;
                    font-size: 24pt;
                    color: #333;
                }
        
                p {
                    font-size: 16px;
                    color: #555;
                }
        
                .info {
                    font-size: 18px;
                    color: #333;
                    margin-bottom: 10px;
                }
        
                .info-label {
                    font-weight: bold;
                }
            </style>
        </head>
        
        <body>
            <div class="container">
                <h2>Student Information</h2>
                <p>Below is the information submitted by the student:</p>
        
                <div class="info">

                    <table class="styled-table">
                    <thead>
                        <tr>
                            <th>Questions</th>
                            <th>Answers</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="info-label">Email:</span></td>
                            <td>${formData.email}</td>
                        </tr>
                        <tr class="active-row">
                            <td><span class="info-label">Full Name:</span></td>
                            <td>${formData.name}</td>
                        </tr>
                        <tr class="active-row">
                        <td><span class="info-label">Age:</span></td>
                        <td>${formData.age}</td>
                    </tr>
                     <tr class="active-row">
                            <td><span class="info-label">Highest Level of Education:</span></td>
                            <td>${formData.educationLevel}</td>
                        </tr>
                        <tr class="active-row">
                        <td><span class="info-label">Education Institute:</span></td>
                        <td>${formData.institute}</td>
                    </tr>
                    <tr class="active-row">
                    <td><span class="info-label">Study Field:</span></td>
                    <td>${formData.study}</td>
                </tr>
                <tr class="active-row">
                <td> <span class="info-label">Work Experience:</span></td>
                <td>${formData.workExperience}</td>
            </tr>
            <tr class="active-row">
            <td><span class="info-label">Admission Institute:</span></td>
            <td>${formData.admissionInstitute}</td>
        </tr>
        <tr class="active-row">
        <td><span class="info-label">Program Of study:</span></td>
        <td>${formData.programOfStudy}</td>
    </tr>
    <tr class="active-row">
    <td><span class="info-label">Applying From:</span></td>
    <td>${formData.applyingFrom}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Future Goals:</span></td>
<td>${formData.futureGoals}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Listening Score:</span></td>
<td>${formData.listeningScore}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Reading Score:</span></td>
<td>${formData.readingScore}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Speaking Score:</span></td>
<td>${formData.speakingScore}</td>
</tr>
<tr class="active-row">
<td> <span class="info-label">Writing Score:</span></td>
<td>${formData.writingScore}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Tuition Payment:</span></td>
<td>${formData.tuitionPayment}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">Tuition Fee:</span></td>
<td>${formData.tuitionFee}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">GIC:</span></td>
<td>${formData.gic}</td>
</tr>
<tr class="active-row">
<td><span class="info-label">GIC Amount:</span></td>
<td>${formData.gicAmount}</td>
</tr>
                        <!-- and so on... -->
                    </tbody>
                </table>
                </div>
            </div>

           
        </body>
        
        </html>`;

    // Set reply-to email
    sendSmtpEmail.replyTo = {
      name: "Team Effizient",
      email: "info@effizient.ca",
    }; // Change to your reply-to name and email

    // Set headers and tags as needed
    sendSmtpEmail.headers = {
      "X-Mailin-custom": `partner-key:${process.env.BREVO_API_KEY}|api-key:${process.env.BREVO_API_KEY}`,
    };
    sendSmtpEmail.tags = ["task"]; // Modify or add tags as needed

    // Send the email
    const emailResponse = await transacMailApi.sendTransacEmail(sendSmtpEmail);
    console.log("Email sent successfully. Response:", emailResponse);

    res.status(200).json({
      success: true,
      message: "Your form data is received. You will receive an email soon.",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred while sending the email.",
    });
  }
};
