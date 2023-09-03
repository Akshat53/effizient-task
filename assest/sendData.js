document.addEventListener("DOMContentLoaded", function () {
    const myForm = document.querySelector("#myForm");
    myForm.addEventListener("submit", function (event) {
      event.preventDefault();
      submitForm();
    });
  });
  
  function submitForm() {
    const formData = {
      email: document.getElementById("recipientEmail").value,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      educationLevel: document.getElementById("educationLevel").value,
      institute: document.getElementById("institute").value,
      study: document.getElementById("study").value,
      workExperience: document.getElementById("workExperience").value,
      admissionInstitute: document.getElementById("admissionInstitute").value,
      programOfStudy: document.getElementById("programOfStudy").value,
      applyingFrom: document.getElementById("applyingFrom").value,
      futureGoals: document.getElementById("futureGoals").value,
      listeningScore: document.getElementById("listeningScore").value,
      readingScore: document.getElementById("readingScore").value,
      speakingScore: document.getElementById("speakingScore").value,
      writingScore: document.getElementById("writingScore").value,
      tuitionPayment: document.querySelector('input[name="tuitionPayment"]:checked').value,
      tuitionFee: document.getElementById("tuitionFee").value,
      gic: document.querySelector('input[name="gic"]:checked').value,
      gicAmount: document.getElementById("gicAmount").value,
    };
  
    fetch("http://localhost:3000/api/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert("Form data submitted successfully.");
          sendEmail(formData);
        } else {
          alert("Error: " + data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
      });
  }
  
  function sendEmail(formData) {
    fetch("http://localhost:3000/api/sendmail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          alert(data.message);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while sending the email.");
      });
  }
  