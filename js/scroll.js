/* * * * * * * * * * * * * * * * * *
 *  scroll.js
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * */
(function () {
    let arrow = document.getElementById("arrow")
    arrow.addEventListener("click", function (e) {
        var targetY = window.innerHeight * 0.94
        body.scrollTop -= 1
    })
}())