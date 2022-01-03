// Select DOM items
const menuBtn = document.querySelector(".menu-btn");
const menu = document.querySelector(".menu");
const menuNav = document.querySelector(".menu-nav");
const menuBranding = document.querySelector(".menu-branding");
const navItems = document.querySelectorAll(".nav-item");
const info1 = document.querySelector(".info1");
const info2 = document.querySelector(".info2");
const inner1 = document.querySelector(".info1 > .inner-info");
const inner2 = document.querySelector(".info2 > .inner-info");
const info3 = document.querySelector(".info3");
const info4 = document.querySelector(".info4");
const inner3 = document.querySelector(".info3 > .inner-info");
const inner4 = document.querySelector(".info4 > .inner-info");

function delay(URL) {
  setTimeout(() => {
    window.location = URL;
  }, 500);
}
//Set Initial State Menu
let showMenu = false;

menuBtn.addEventListener("click", toggleMenu);
navItems.forEach(item => item.addEventListener("click", closeMenu));

function closeMenu() {
  menuBtn.classList.remove("close");
  menu.classList.remove("show");
  menuNav.classList.remove("show");
  menuBranding.classList.remove("show");
  navItems.forEach(item => item.classList.remove("show"));

  //Set Menu State
  showMenu = false;
}

function toggleMenu() {
  if (!showMenu) {
    menuBtn.classList.add("close");
    menu.classList.add("show");
    menuNav.classList.add("show");
    menuBranding.classList.add("show");
    navItems.forEach(item => item.classList.add("show"));

    //Set Menu State
    showMenu = true;
  } else {
    menuBtn.classList.remove("close");
    menu.classList.remove("show");
    menuNav.classList.remove("show");
    menuBranding.classList.remove("show");
    navItems.forEach(item => item.classList.remove("show"));

    //Set Menu State
    showMenu = false;
  }
}

// TypeWriter effect

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 300;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
// document.addEventListener("DOMContentLoaded", init);

// Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}

//   inner1.addEventListener("click", zIndex1);
//   inner2.addEventListener("mouseover", zIndex2);
//   inner1.addEventListener("mouseout", zIndex3);
//   inner2.addEventListener("mouseout", zIndex4);


// inner1.addEventListener("mouseover", zIndex1);
// inner1.addEventListener("mouseout", zIndex2);
// inner2.addEventListener("mouseover", zIndex3);
// inner2.addEventListener("mouseout", zIndex4);
// inner3.addEventListener("mouseover", zIndex13);
// inner3.addEventListener("mouseout", zIndex23);
// inner4.addEventListener("mouseover", zIndex34);
// inner4.addEventListener("mouseout", zIndex44);


function zIndex1() {
  info1.classList.add("zIndex");
  inner2.classList.add("opacity");



}
function zIndex2() {
  info1.classList.remove("zIndex");
  inner2.classList.remove("opacity");

}
function zIndex3() {
  info2.classList.add("zIndex");
  inner1.classList.add("opacity");


  //     inner2.classList.add("zIndex");
}
function zIndex4() {
  info2.classList.remove("zIndex");
  inner1.classList.remove("opacity");
  //     inner2.classList.remove("zIndex");
}
function zIndex13() {
  info3.classList.add("zIndex");
  inner4.classList.add("opacity");

  // inner1.classList.add("zIndex1");
}
function zIndex23() {
  info3.classList.remove("zIndex");
  inner4.classList.remove("opacity");
  // inner1.classList.remove("zIndex1");
}
function zIndex34() {
  info4.classList.add("zIndex");
  inner3.classList.add("opacity");

  //     inner2.classList.add("zIndex");
}
function zIndex44() {
  info4.classList.remove("zIndex");
  inner3.classList.remove("opacity");
  //     inner2.classList.remove("zIndex");
}


// iframe
function closeWin()   // Tested Code
{
  // someIframem = document.querySelector("iframe");
  someIframem.classList.remove('in')
  setTimeout(() => someIframem.parentNode.removeChild(someIframem), 500)
}
// let getiframes = document.querySelectorAll(".getiframe");
// getiframes.forEach(getiframe => {
//   getiframe.addEventListener('click', genIframe);
// });
// document.querySelector('#p1').addEventListener('click', genIframe);
// document.querySelector('#p2').addEventListener('click', genIframe);
// document.querySelector('#p3').addEventListener('click', genIframe);
// document.querySelector('#p4').addEventListener('click', genIframe);
function genIframe(e) {

  var iframe = document.createElement('iframe');


  if (!e.target.name) {
    iframe.src = e.target.parentNode.name;
    // console.log(e.target.parentNode.name);
  } else {
    iframe.src = e.target.name;
  }
  iframe.className = "iframex";
  document.body.appendChild(iframe);
  someIframem = document.querySelector(".iframex");
  someIframem.addEventListener("click", closeWin);
  setTimeout(() => iframe.classList.add('in'), 0)
}