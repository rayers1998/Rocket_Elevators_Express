/**	CONTACT FORM
*************************************************** **/
var _hash = window.location.hash;

/**
	BROWSER HASH - from php/contact.php redirect!

	#alert_success 		= email sent
	#alert_failed		= email not sent - internal server error (404 error or SMTP problem)
	#alert_mandatory	= email not sent - required fields empty
**/	jQuery(_hash).show();


// Attaching an event listener to the form with the ID 'contact-form' for the 'submit' event
document.getElementById('contact-form').addEventListener('submit', async function(e) {
	// Preventing the default form submission behavior
	e.preventDefault();
  
	// Retrieving form field values using their respective IDs
	const fullname = document.getElementById('name').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const companyName = document.getElementById('company_name').value;
	const projectName = document.getElementById('project_name').value;
	const projectDescription = document.getElementById('project_description').value;
	const department = document.getElementById('department').value;
	const message = document.getElementById('message').value;
  
	// Preparing the data object to be sent in the POST request
	  const data = {
	  fullname,
	  email,
	  phone,
	  company_name: companyName,
	  project_name: projectName,
	  project_description: projectDescription,
	  department,
	  message,
	  file: null
	};
  
	// Logging the data to be sent to the console
	console.log('Data to be sent:', data);
  
	try {
		//Makes a POST request to the specified URL with the data
		const response = await fetch('http://99.79.77.144:3000/api/contact', {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json', // Setting the content type of the request
		  },
		  body: JSON.stringify(data), // Converting the data object to JSON string
		});
		
		// Waiting for the response and converting it to JSON format
		const responseData = await response.json();
		
		//SUCCESSFULLY- Handling the response data 
	   // console.log('Success:', responseData);
		//alert(`Message sent successfully`);

	} catch (error) {
		//ERRORS & FAILED TO SEND MESSAGES- Handling any errors that occur during the request
		// console.error('Error:', error);
	    // alert(`Failed to send message: ${error}`);
	}
  });
  
  
  document.getElementById('contact-form').addEventListener('submit', function(event) {
	  // Prevent the default FORM submission
	  event.preventDefault();
  
	  // Get the user's name and email from the FORM
	  var userName = document.getElementById('name').value;
	  var userEmail = document.getElementById('email').value;
  
	  // Construct the message
	  var message = 'Thank you ' + userName + ' for contacting Rocket Elevators. <br>' + 
					'Your inquiry is our top priority and <br>' + 
					'we will get back to you shortly at ' + userEmail + '.';
  
	  // Insert the message into the FORM
	  document.getElementById('modal-message').innerHTML = message;
  
	  // Show the FORM (IF you are using Bootstrap method)
	  $('#success-message').modal('show');
  });
  
    
  //make the FORM print a pop up of the the user name and email, compnay name, etc..... into the text succesfully sent message... after the FORM is submitted.
  
  $("#contact-form").on("submit", function(e){
	e.preventDefault(); // Prevent the default form submission
	
	// Get the user's name and email from the form
	var userName = $("#name").val();
	var userEmail = $("#email").val();
	var userPhone = $("#phone").val();
	var userCompanyName = $("#company_name").val();
	var userProjectName = $("#project_name").val();
	var userProjectDescription = $("#project_description").val();
	var userDepartment = $("#department").find(":selected").text(); // Get the selected option's text
	var userMessage = $("#message").val();
  
	// Construct the message with user's name and email wrapped in spans for blue text
	var personalizedMessage = '<p>Thank you, <span class="blue-text">' + userName + '</span>, for contacting Rocket Elevators!</p>' +
	'<p>Your inquiry is our top priority and we will send you an email shortly at <span class="blue-text">' + userEmail + '</span>.</p>' +
	'<ul>' +
	'<li>Phone Number: <span class="blue-text">' + userPhone + '</span></li>' +
	'<li>Company Name: <span class="blue-text">' + userCompanyName + '</span></li>' +
	'<li>Project Name: <span class="blue-text">' + userProjectName + '</span></li>' +
	'<li>Project Description: <span class="blue-text">' + userProjectDescription + '</span></li>' +
	'<li>Department: <span class="blue-text">' + userDepartment + '</span></li>' +
	'<li>Message: <span class="blue-text">' + userMessage + '</span></li>' +
	'</ul>';
	
	// Set the personalized message into the body of the FORM
	$("#success-message .modal-body h4").html(personalizedMessage);
	
	// Show the FORM
	$("#success-message").modal("show");
	
	// Optionally reset the form or perform other actions
	this.reset();
  });
  
  // Keep the subscribe FORM handler as is
  $("#subscribe-form").on("submit", function(e){
	e.preventDefault();
	$("#subscribe-message").modal("show");
	this.reset();
  });