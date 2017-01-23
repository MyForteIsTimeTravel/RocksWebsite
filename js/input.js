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
    /*
    if (fullscreen === false ){
        width  = window.innerWidth
        height = window.innerHeight

        camera.aspect = width/height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    
        fullscreen = true
    }
    
    else {
        width  = window.innerWidth
        height = window.innerHeight * 0.60

        camera.aspect = width/height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
    
        fullscreen = false
    }
    */

})

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