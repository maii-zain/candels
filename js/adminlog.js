document.addEventListener('DOMContentLoaded', function () {
    // Load saved data from localStorage if 'Save Me' was checked
    var Admins_List = JSON.parse(localStorage.getItem('Admins_List')) || [];

    Admins_List.forEach(function (savedData) {
        var UsernameInput = document.getElementById('User');
        var IDdInput = document.getElementById('ID');
        var saveMeCheckbox = document.getElementById('saveMe');

        if (savedData.User === UsernameInput.value && savedData.Admin_ID === IDdInput.value) {
            UsernameInput.value = savedData.User || '';
            IDdInput.value = savedData.Admin_ID || '';
            saveMeCheckbox.checked = savedData.saveMe || false;
        }
    });
});

function checkLogin() {
    var User = document.getElementById('User').value;
    var Admin_ID = document.getElementById('ID').value;
    var saveMe = document.getElementById('saveMe').checked;

    // Validate input fields
    if (!User || !Admin_ID) {
        alert('Please enter your User name and ID.');
        return;
    }

    // Perform login logic (for demonstration purposes, using localStorage)
    var users = JSON.parse(localStorage.getItem('Admins_signup')) || [];
    var user = users.find(u => u.username === User && u.ID === Admin_ID);

    if (user) {
        alert('Login successful! Redirecting to user dashboard.');
        window.location.href = 'CRUD.html';

        // Save data if 'Save Me' is checked
        if (saveMe) {
            var Admins_List = JSON.parse(localStorage.getItem('Admins_List')) || [];

            // Add new data
            Admins_List.push({ User, Admin_ID, saveMe });
            localStorage.setItem('Admins_List', JSON.stringify(Admins_List));

            // Display the new entry
            alert('USER NAME: ' + User + '\nID: ' + Admin_ID + '\nSaved for future logins.');
        }
    } else {
        alert('Invalid username or password. Please try again.');
    }
}

function signup() {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var ID = document.getElementById('ID').value;
    var phoneNumber = document.getElementById('phoneNumber').value;

    // Validate input fields
    if (!validateUsername(username) || !validateEmail(email) || !validateID(ID) || !validatePhoneNumber(phoneNumber)) {
        alert('Please fill in all fields correctly.');
        return;
    } else {
        // Retrieve existing registration processes or initialize an empty array
        var Admins_signup = JSON.parse(localStorage.getItem('Admins_signup')) || [];

        // Push new registration process to the array
        Admins_signup.push({ username, email, ID, phoneNumber });

        // Store the updated array back in localStorage
        localStorage.setItem('Admins_signup', JSON.stringify(Admins_signup));

        alert('Sign up successful!');
        clearForm('signupForm');

        // Display all registration processes after signup
    }
}

// Other functions remain the same
