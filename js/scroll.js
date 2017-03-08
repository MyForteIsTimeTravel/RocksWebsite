/* * * * * * * * * * * * * * * * * *
 *  scroll.js
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * */
(function () {
    let arrow = document.getElementById("down")
    var targetY = window.innerHeight*0.95
    
    arrow.addEventListener("click", function (e) {
        
        var scrollFrame = function ()  {
            window.scrollBy(0,((window.innerHeight*1.2) - window.scrollY) * 0.1)
            if (window.scrollY < targetY) 
                requestAnimationFrame(scrollFrame)
        }
        requestAnimationFrame(scrollFrame)
    })
}())