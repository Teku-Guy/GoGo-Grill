$(document).ready(() => {
      // Getting references to our form and inputs
      const loginForm = $("form.login-form");
      const emailInput = $("input#email-login");
      const passwordInput = $("input#password-login");
    
      // When the form is submitted, we validate there's an email and password entered
      loginForm.on("submit", event => {
        event.preventDefault();
        const userData = {
          email: emailInput.val().trim(),
          password: passwordInput.val().trim()
        };
    
        if (!userData.email) {
          emailInput.addClass("is-invalid");
          return;
        } 
        if(!userData.password) {
          passwordInput.addClass("is-invalid");
          return;
        } else {
          emailInput.removeClass("is-invalid");
          passwordInput.removeClass("is-invalid");
        }
    
        // If we have an email and password we run the loginUser function and clear the form
        loginUser(userData.email, userData.password);
        emailInput.val("");
        passwordInput.val("");
      });
    
      // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
      function loginUser(email, password) {
        $.post("/api/users/login", {
          email: email,
          password: password
        })
          .then(() => {
            window.location.replace("/profile");
            // If there's an error, log the error
          })
          .catch(err => {
            alert("Incorrect username or password.");
            console.log(err);
          });
      }
    });
    