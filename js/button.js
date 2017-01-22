(function(){

    let signUpMessage = document.getElementById("signUpMessage")
    let signUpForm    = document.getElementById("signUpForm")

    var acknowledge = function () {
        signUpMessage.innerHTML = "check your emails, an invite is on its way!"
    }

    // Listens for a form submit action: 
    if (typeof event === "undefined") {
        signUpForm.onsubmit = acknowledge; // for Firefox
    }
    else {
        signUpForm.addEventListener("submit", acknowledge);
        event.preventDefault();
    }
}());