$(document).ready(() => {
    // Getting references to our form and input
    const signUpForm = $('form.signup-form');
    const fNameInput = $('input#firstName-signup');
    const lNameInput = $('input#lastName-signup');
    const emailInput = $('input#email-signup');
    const passwordInput = $('input#password-signup');
    const bdayInput = $('input#inputBday');
    const genderInput = $('select#inputGender');
    const addressInput = $('input#inputAddress');
    const addressInput2 = $('input#inputAddress2');
    const cityInput = $('input#inputCity');
    const stateInput = $('select#inputState');
    const Zipcodeinput = $('input#inputZip');

    signUpForm.on('submit', event => {
        event.preventDefault();
        const userData = {
            first_name: fNameInput.val().trim(),
            last_name: lNameInput.val().trim(),
            email: emailInput.val().trim(),
            password: passwordInput.val().trim(),
            birthday: bdayInput.val().trim(),
            gender: genderInput.val(),
            address: getaddress(),
        };

        signupUser(userData);
    });

    function getaddress() {
        let newAddress = (addressInput.val().trim() + " " +
                          addressInput2.val().trim() + " " +
                          cityInput.val().trim() + " " +
                          stateInput.val() + " " +
                          Zipcodeinput.val().trim());
        console.log(newAddress);
        return newAddress;
    }

    function signupUser(data) {
        $.post('/api/users/signup', data)
          .then(() => window.location.replace('/profile'))
          .catch(err => {
              alert("missing info");
              console.log(err);
          });
    }
});