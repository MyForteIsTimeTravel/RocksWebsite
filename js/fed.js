/* * * * * * * * * * * * * * * * * *
 *  Programmatic Fed Chase Demo (fed.js)
 *
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * */
window.onload = heroAnimation;

function heroAnimation () {
    
    /* * * * * * * * * * * * * * * * * * 
     * CONTEXT
     * * * * * * * * * * * * * * * * * */
    var canvas    = document.getElementById("heroCanvas")
    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight * 0.96
    
    renderer = canvas.getContext("2d")
    
    document.addEventListener("resize", function () {
        canvas.width  = window.innerWidth
        canvas.height = window.innerHeight * 0.96
    })
    
    /* * * * * * * * * * * * * * * * * * 
     * CONTENT
     * * * * * * * * * * * * * * * * * */
    renderer.fillRect(10, 10, 150, 80)
    
    function update () {

        // see you again soon
        requestAnimationFrame(update)
    }

    requestAnimationFrame(update) 
}