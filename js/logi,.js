document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage if 'Save Me' was checked
    var savedDataList = JSON.parse(localStorage.getItem('savedDataList')) || [];

    savedDataList.forEach(function(savedData) {
        var userinput = document.getElementById('username');
        var passwordInput = document.getElementById('password');
        var saveMeCheckbox = document.getElementById('saveMe');

        if (savedData.username === userinput.value && savedData.password === passwordInput.value) {
            userinput.value = savedData.username || '';
            passwordInput.value = savedData.password || '';
            saveMeCheckbox.checked = savedData.saveMe || false;
        }
    });
});

function checkLogin() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    var saveMe = document.getElementById('saveMe').checked;

    // Validate input fields
    if (!username || !password) {
        alert('Please fill in both username and password.');
        return;
    }

    // Perform login logic (for demonstration purposes, using localStorage)
    var users = JSON.parse(localStorage.getItem('registrationProcesses')) || [];
    var user = users.find(u => u.username === username && u.password === password);

    if (user) {
        alert('Login successful! Redirecting to the user dashboard.');
        window.location.href = 'afterlogin.html';

        // Save data if 'Save Me' is checked
        if (saveMe) {
            var loginProcesses = JSON.parse(localStorage.getItem('loginProcesses')) || [];

            // Add new data
            loginProcesses.push({ username, password });
            localStorage.setItem('loginProcesses', JSON.stringify(loginProcesses));

            // Display the new entry
            alert('Username: ' + username + '\nPassword: ' + password + '\nLogin information saved.');
        }
    } else {
        alert('Invalid username or password. Please try again.');
    }
}