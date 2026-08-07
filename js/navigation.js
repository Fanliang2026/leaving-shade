// ==========================================
// Table of Contents
// ==========================================

const tocButton = document.getElementById("tocButton");
const tocPanel = document.getElementById("tocPanel");
const tocOverlay = document.getElementById("tocOverlay");
const tocClose = document.getElementById("tocClose");

function openTOC() {

    tocPanel.classList.add("open");
    tocOverlay.classList.add("show");

}

function closeTOC() {

    tocPanel.classList.remove("open");
    tocOverlay.classList.remove("show");

}

tocButton.addEventListener("click", openTOC);

tocClose.addEventListener("click", closeTOC);

tocOverlay.addEventListener("click", closeTOC);

// Close after clicking any TOC link

document.querySelectorAll(".toc-list a").forEach(link => {

    link.addEventListener("click", closeTOC);

});
