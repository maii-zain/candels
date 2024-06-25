function signup() {
    var name = document.getElementById('name').value;
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var repeatPassword = document.getElementById('repeatPassword').value;
    var gender = document.getElementById('gender').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // Validate input fields
    if (!validateName(name) || !validateUsername(username) || !validateEmail(email) || !validatePassword(password) || !validateRepeatPassword(password, repeatPassword) || !validateGender(gender) || !validatePhoneNumber(phoneNumber)) {
        alert('Please fill in all fields correctly.');
        return;
    } else {
        // Retrieve existing registration processes or initialize an empty array
        var registrationProcesses = JSON.parse(localStorage.getItem('registrationProcesses')) || [];

        // Push new registration process to the array
        registrationProcesses.push({ name, username, email, password, gender, phoneNumber });

        // Store the updated array back in localStorage
        localStorage.setItem('registrationProcesses', JSON.stringify(registrationProcesses));

        alert('Sign up successful!');
        clearForm('signupForm');

        // Display all registration processes after signup
        
    }
}


function validateName(name) {
    // Regular expression for name: should start with letters and be more than 2 characters
    return /^[a-zA-Z]{3,}/.test(name);
}

function validateUsername(username) {
    // Regular expression for username: should start with a letter and may contain an optional underscore (_) between first and last name
    return /^[a-zA-Z]{3,}/.test(username);
}


function validateEmail(email) {
    // Regular expression for email: start with a letter, have @ sign after 3 letters at least, include . and finish with com or eg
    return /^[a-zA-Z]{3,}@[a-zA-Z]+\.(com|eg)$/.test(email);
}

function validatePassword(password) {
    // Regular expression for password: contain small letter, capital letter, and number, and consist of 6 characters at least
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);
}
function validateRepeatPassword(password, repeatPassword) {
    return password.trim() === repeatPassword.trim();
}

function validateGender(gender) {
    return gender !== "";
}

function validatePhoneNumber(phoneNumber) {
    // Assuming a simple validation for a phone number
    return /^\d{10}$/.test(phoneNumber);
}

// ... (Other functions remain the same)





function clearForm(formId) {
    document.getElementById(formId).reset();
}

