var onCanvas = false
var canvas = document.getElementById("canvasContainer")

var mouseX = 0
var mouseY = 0
var middleX = window.innerWidth / 2
var middleY = window.innerHeight / 2

var lastTouchX = 0
var lastTouchY = 0

var fullscreen = false

canvas.addEventListener("mouseover", function (e) {onCanvas = true})
canvas.addEventListener("mouseout",  function (e) {onCanvas = false})
canvas.addEventListener("click", function (e) {

})

document.onmousemove = function (event) {
    if (onCanvas) {
         mouseX = (event.clientX - middleX)
         mouseY = (event.clientY - middleY)   
    }
}

window.ondevicemotion = function (event) {
    mouseX + event.accelerationIncludingGravity.x
}

function updateInput () {
}