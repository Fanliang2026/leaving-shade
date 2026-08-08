// ==========================================
// Table of Contents
// ==========================================

const tocButton = document.getElementById("tocButton");
const tocPanel = document.getElementById("tocPanel");
const tocOverlay = document.getElementById("tocOverlay");
const tocClose = document.getElementById("tocClose");
const tocBack = document.getElementById("tocBack");


// ==========================================
// Remember current reading position
// ==========================================

function saveReadingPosition() {

    sessionStorage.setItem(
        "leavingShadeReturnPage",
        window.location.href
    );

    sessionStorage.setItem(
        "leavingShadeReturnScroll",
        window.scrollY
    );

}


// ==========================================
// Open / Close TOC
// ==========================================

function openTOC() {

    saveReadingPosition();

    tocPanel.classList.add("open");
    tocOverlay.classList.add("show");

}


function closeTOC() {

    tocPanel.classList.remove("open");
    tocOverlay.classList.remove("show");

}


// ==========================================
// TOC controls
// ==========================================

tocButton.addEventListener("click", openTOC);

tocClose.addEventListener("click", closeTOC);

tocOverlay.addEventListener("click", closeTOC);


// ==========================================
// Normal TOC links
// ==========================================

document.querySelectorAll(".toc-list a").forEach(link => {

    link.addEventListener("click", closeTOC);

});


// ==========================================
// Return to previous reading position
// ==========================================

if (tocBack) {

    tocBack.addEventListener("click", function(event) {

        event.preventDefault();

        const returnPage =
            sessionStorage.getItem("leavingShadeReturnPage");

        const returnScroll =
            sessionStorage.getItem("leavingShadeReturnScroll");

        if (!returnPage || returnScroll === null) {

            closeTOC();

            return;

        }

        const currentPage =
            window.location.href.split("#")[0];

        const savedPage =
            returnPage.split("#")[0];

        // Same page:
        if (currentPage === savedPage) {

            closeTOC();

            window.scrollTo({
                top: Number(returnScroll),
                behavior: "smooth"
            });

            return;

        }

        // Different page:
        sessionStorage.setItem(
            "leavingShadeRestore",
            returnScroll
        );

        window.location.href = returnPage;

    });

}


// ==========================================
// Restore position after changing pages
// ==========================================

const restoreScroll =
    sessionStorage.getItem("leavingShadeRestore");

if (restoreScroll !== null) {

    sessionStorage.removeItem("leavingShadeRestore");

    window.addEventListener("load", function() {

        setTimeout(function() {

            window.scrollTo({
                top: Number(restoreScroll),
                behavior: "smooth"
            });

        }, 100);

    });

}
