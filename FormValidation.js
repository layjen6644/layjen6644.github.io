/*
Author: Layla Jenkins
Date: 07/26/2026
Purpose: demonstrating live client-side validation to check user inputs
*/

$(function () {
    //select the form once the document is ready
    const $form = $('#signUpForm');

    //live email validation
    $('#email').on('keyup blur', function () {
        //get the  current value of the email input
        const value = $(this).val();
        // if invalid, shows error
        if (!validator.isEmail(value)) {
            //if invalid show error message under field
            $('#emailError').text('Please enter a valid email address.');
        } else if (!value.endsWith('.com') && !value.endsWith('.edu')) {
            //if invalid, ending
            $('#emailError').text('Email must end in .com or .edu');
        } else {
            //if valid, clears error
            $('#emailError').text('');
        }
    });


    //live password validation
    $('#password').on('keyup blur', function() {
        //get current value of password input
        const value = $(this).val();
        //checks password requirements
        const validPassword =
        validator.isLength(value, { min: 8 }) &&
        /[A-Z]/.test(value) &&
        /[a-z]/.test(value) &&
        /[0-9]/.test(value);
        //if invalid, shows error
        if (!validPassword) {
            $('#passwordError').text('Password must contain 8 characters, 1 uppercase, 1 lowercase, and 1 number.');
        } else {
            //clears error if valid
            $('#passwordError').text('');
        }
    });

    //live URL validation
    $('#website').on('keyup blur', function () {
        //get current value of website input
        const value = $(this).val();
        //if invalid, shows error
        if (!validator.isURL(value, { protocols: ['http', 'https'] })) {
            $('#websiteError').text('Please enter a URL starting with http:// or https://.');
        } else {
            //clears error if valid
            $('#websiteError').text('');
        }
    });

    //live age validation
    $('#age').on('keyup blur', function () {
    //get curent value of age input
    const value = $(this).val();

        //checks if age is at least 1
        if (!validator.isInt(value, { min: 1 })) {
            //if invalid show an error under field
            $('#ageError').text('Enter a valid age (1 or greater)');
        } else {
            //if valid clear Message
            $('#ageError').text('');
        }
    });

    //form submission handling
    $form.on('submit', function (e) {
        //prevent the default form submission (page reload)
        e.preventDefault();

        //get all values
        const email = $('#email').val();
        const password = $('#password').val();
        const website = $('#website').val();
        const age = $('#age').val();

        //validates all fields
        const validEmail = validator.isEmail(email) && (email.endsWith('.com') || email.endsWith('.edu'));
        const validPassword = validator.isLength(password, { min: 8 }) && /[A-Z]/.test(password) && /[a-z]/.test(password) && /[0-9]/.test(password);
        const validWebsite = validator.isURL(website, { protocols: ['http', 'https'] });
        const validAge = validator.isInt(age, { min: 1 });

        if (validEmail &&  validPassword && validWebsite && validAge) {
            //if all are valid, success alert
            alert('Form submitted successfully!');

            //reset form inputs
            $form[0].reset();

            //clear any leftover error messages
            $('span').text('');
        } else {
            //if not valid, make sure errors are shown 
            if (!validEmail) $('#emailError').text('Please enter a valid .com or .edu email address.');
            if (!validPassword) $('#passwordError').text('Password must contain 8 charactors, 1 uppercase, 1 lowercase, and 1 number.');
            if (!validWebsite) $('#websiteError').text('Please enter a valid http:// or https:// URL.');
            if (!validAge) $('#ageError').text('Age must be greater than 1.');
        }
    });
});
