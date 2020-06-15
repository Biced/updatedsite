

document.querySelector('.menu-btn').addEventListener('click', closeWin);
function closeWin()   // Tested Code
{
    var someIframe = window.parent.document.querySelector('.iframex');
    someIframe.classList.remove('in');
    setTimeout(() => someIframe.parentNode.removeChild(window.parent.document.querySelector('.iframex')), 500)
}

var currentD = 0,
    slides = document.querySelectorAll(".slideD");

setInterval(function () {
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
    currentD = (currentD != slides.length - 1) ? currentD + 1 : 0;
    slides[currentD].style.opacity = 1;
}, 3000);

var current = 0,
    slide = document.querySelectorAll(".slide")

setInterval(function () {
    for (var i = 0; i < slide.length; i++) {
        slide[i].style.opacity = 0;
    }
    current = (current != slide.length - 1) ? current + 1 : 0;
    slide[current].style.opacity = 1;
}, 3000);
