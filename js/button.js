document.onLoad = function () {
    var submitButton = document.getElementById("submit")
    submitButton.addEventListener("submit", thanks)

    var thanks = function (event) {
        var signUpMessage = document.getElementById("signUpMessage")
        signUpMessage.innerHTML = "boo"
    }   
}