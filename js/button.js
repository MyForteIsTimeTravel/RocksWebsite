(function(){

    let signUpMessage = document.getElementById("signUpMessage")
    let signUpForm    = document.getElementById("signUpForm")

    var acknowledge = function (event) {
        event.preventDefault()
        signUpMessage.innerHTML = "check your emails, an invite is on its way!"
        signUpForm.style.width = "0"
        signUpForm.style.height = "0"
    }

    // Listens for a form submit action: 
    if (typeof event === "undefined") {
        signUpForm.onsubmit = acknowledge; // for Firefox
    }
    else {
        document.getElementById("submitButton").addEventListener("onclick", acknowledge)
        //signUpForm.addEventListener("submit", acknowledge);
        event.preventDefault();
    }
}());