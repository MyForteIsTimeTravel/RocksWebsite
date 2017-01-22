var onCanvas = false
var canvas = document.getElementById("canvasContainer")

var mouseX = 0
var mouseY = 0
var middleX = window.innerWidth / 2
var middleY = window.innerHeight / 2

var lastTouchX = 0
var lastTouchY = 0

canvas.addEventListener("mouseover", function (e) {onCanvas = true})
canvas.addEventListener("mouseout",  function (e) {onCanvas = false})


/*
canvas.addEventListener("touchstart", function (e) {
    lastTouchX = event.clientX
    lastTouchY = event.clientY
})

canvas.addEventListener("touchmove", function (e) {
    mouseX = (event.clientX - lastTouchX)
    mouseY = (event.clientY - lastTouchY)   
})
*/ 

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