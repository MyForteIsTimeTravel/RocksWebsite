/* * * * * * * * * * * * * * * * * * * * *
 *  scroll.js
 *
 *  User interuptable smooth scroll
 *
 *  Ryan Needham
 * * * * * * * * * * * * * * * * * * * * */
(function () {
    var scrollDown = function (e) {
        var targetY = window.innerHeight * 1
        var lastY = 0
        var scrollFrame = function ()  {
            if (!(window.scrollY < lastY)) {
                lastY = window.scrollY
                window.scrollBy(0,(targetY - window.scrollY) * 0.05)
                if (window.scrollY < targetY)
                    requestAnimationFrame(scrollFrame)   
            }
        }
        requestAnimationFrame(scrollFrame)
    }
    
    var scrollUp = function (e) {
        
    }
    
    document.getElementById("down").addEventListener("click", scrollDown)
}())