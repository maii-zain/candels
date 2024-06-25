function signup() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var ID = document.getElementById('ID').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // Validate input fields
    if (!validateUsername(username) || !validateEmail(email) || !validateID(ID)  || !validatePhoneNumber(phoneNumber)) {
        alert('Please fill in all fields correctly.');
        return;
    } else {
        // Retrieve existing registration processes or initialize an empty array
        var Admins_signup = JSON.parse(localStorage.getItem('Admins_signup')) || [];

        // Push new registration process to the array
        Admins_signup.push({  username, email, ID,  phoneNumber });

        // Store the updated array back in localStorage
        localStorage.setItem('Admins_signup', JSON.stringify(Admins_signup));

        alert('Sign up successful!');
        clearForm('signupForm');

        // Display all registration processes after signup
        
    }
}




function validateUsername(username) {
    // Regular expression for username: should start with a letter and may contain an optional underscore (_) between first and last name
    return /^[a-zA-Z]{3,}/.test(username);
}


function validateEmail(email) {
    // Regular expression for email: start with a letter, have @ sign after 3 letters at least, include . and finish with com or eg
    return /^[a-zA-Z]{3,}@[a-zA-Z]+\.(com|eg)$/.test(email);
}

function validateID(ID) {
    // Regular expression for password: contain small letter, capital letter, and number, and consist of 6 characters at least
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(ID);
}


function validatePhoneNumber(phoneNumber) {
    // Assuming a simple validation for a phone number
    return /^\d{10}$/.test(phoneNumber);
}

// ... (Other functions remain the same)





function clearForm(formId) {
    document.getElementById(formId).reset();
}

