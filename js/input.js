var onCanvas = false
var canvas = document.getElementById("canvasContainer")

var mouseX = 0
var mouseY = 0
var middleX = window.innerWidth / 2
var middleY = window.innerHeight / 2


canvas.addEventListener("mouseover", function(e) {
    onCanvas = true
})

canvas.addEventListener("mouseout", function (e) {
    onCanvas = false
})

document.onmousemove = function (event) {
    if (onCanvas) {
         mouseX = (event.clientX - middleX)
         mouseY = (event.clientY - middleY)   
    }
}

function updateInput () {
}