/* ==========================================
   Project Shade
   app.js
   Version 1.0
========================================== */


/* ==========================================
   QUOTATION
========================================== */

const quote =

"The tree may fall. But the shade it provided will continue to shelter those who come after.";



/* ==========================================
   PAGE ELEMENTS
========================================== */

const quoteText =
document.getElementById("quoteText");

const startButton =
document.getElementById("startButton");

const title =
document.querySelector(".title");

const subtitle =
document.querySelector(".subtitle");

const author =
document.querySelector(".author");

const seed =
document.getElementById("seed");

/* ==========================================
   TYPEWRITER
========================================== */

function typeQuote(text, element, speed = 45) {

    let index = 0;

    element.textContent = "";

    function type() {

        if (index < text.length) {

    element.textContent += text.charAt(index);

    index++;

    setTimeout(type, speed);

}
else{

    startButton.classList.remove("hidden");

    startButton.classList.add("show");

}
    }

    type();

}
/* ==========================================
   START PAGE
========================================== */

typeQuote(quote, quoteText);
