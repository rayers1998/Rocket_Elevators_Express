// Adding an event listener to the form with ID 'contact-form' to handle form submission
document.getElementById('contact-form').addEventListener('submit', async function(event) {
    // Preventing the form's default submission action
    event.preventDefault();

    // Gathering form input values by their respective IDs
    const fullname = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const companyName = document.getElementById('company_name').value;
    const projectName = document.getElementById('project_name').value;
    const projectDescription = document.getElementById('project_description').value;
    const department = document.getElementById('department').value;
    const message = document.getElementById('message').value;

    // Structuring the data to be sent in the POST request
    const formData = {
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

    // Outputting the data to the console for debugging purposes
    console.log('Sending the following data:', formData);

    try {
        // Sending a POST request to the server with the form data
        const response = await fetch('http://99.79.77.144:3000/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specifying the content type of the request
            },
            body: JSON.stringify(formData), // Converting the data object to a JSON string
        });

        // Converting the response to JSON format
        const responseData = await response.json();

        // Uncomment the lines below for handling success and error messages
        // console.log('Request successful:', responseData);
        // alert('Message sent successfully');
    } catch (error) {
        // Uncomment the lines below for handling success and error messages
        // console.error('Request failed:', error);
        // alert('Failed to send message: ' + error);
    }
});

document.getElementById('contact-form').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieving user's name and email from the form
    const userName = document.getElementById('name').value;
    const userEmail = document.getElementById('email').value;

    // Creating a personalized thank-you message
    const messageContent = `Thank you ${userName} for contacting Rocket Elevators. <br>
                            Your inquiry is our top priority and <br>
                            we will get back to you shortly at ${userEmail}.`;

    // Inserting the message into the modal's content area
    document.getElementById('modal-message').innerHTML = messageContent;

    // Displaying the modal 
    $('#success-message').modal('show');
});

// Ensure the modal displays a personalized message after form submission
$("#contact-form").on("submit", function(event) {
    event.preventDefault(); // Prevent the form's default submission action

    // Extracting user input values from the form
    const userName = $("#name").val();
    const userEmail = $("#email").val();
    const userPhone = $("#phone").val();
    const userCompanyName = $("#company_name").val();
    const userProjectName = $("#project_name").val();
    const userProjectDescription = $("#project_description").val();
    const userDepartment = $("#department").find(":selected").text(); // Retrieving the selected option's text
    const userMessage = $("#message").val();

    // Constructing a detailed message with user input values wrapped in spans for styling
    const detailedMessage = `<p>Thank you, <span class="blue-text">${userName}</span>, for contacting Rocket Elevators!</p>
                             <p>Your inquiry is our top priority and we will send you an email shortly at <span class="blue-text">${userEmail}</span>.</p>
                             <ul>
                                <li>Phone Number: <span class="blue-text">${userPhone}</span></li>
                                <li>Company Name: <span class="blue-text">${userCompanyName}</span></li>
                                <li>Project Name: <span class="blue-text">${userProjectName}</span></li>
                                <li>Project Description: <span class="blue-text">${userProjectDescription}</span></li>
                                <li>Department: <span class="blue-text">${userDepartment}</span></li>
                                <li>Message: <span class="blue-text">${userMessage}</span></li>
                             </ul>`;

    // Inserting the personalized message into the modal's body
    $("#success-message .modal-body h4").html(detailedMessage);

    // Showing the modal
    $("#success-message").modal("show");

    // Optionally reset the form after submission
    this.reset();
});

// Keeping the subscription form handler as is
$("#subscribe-form").on("submit", function(event) {
    event.preventDefault();
    $("#subscribe-message").modal("show");
    this.reset();
});
