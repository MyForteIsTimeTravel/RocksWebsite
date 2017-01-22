var onCanvas = false
var canvas = document.getElementById("canvasContainer")

var mouseX = 0
var mouseY = 0
var middleX = window.innerWidth / 2
var middleY = window.innerHeight / 2


canvas.addEventListener("mouseover", function (e) {onCanvas = true})
canvas.addEventListener("mouseout",  function (e) {onCanvas = false})

canvas.addEventListener("touchmove", function (e) {
    mouseX = (event.clientX - middleX)
    mouseY = (event.clientY - middleY)   
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