// ==========================================
// Table of Contents
// ==========================================

const tocButton = document.getElementById("tocButton");
const tocPanel = document.getElementById("tocPanel");
const tocOverlay = document.getElementById("tocOverlay");
const tocClose = document.getElementById("tocClose");
const tocBack = document.getElementById("tocBack");


// ==========================================
// Open / Close TOC
// ==========================================

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


// ==========================================
// Save reading position BEFORE leaving
// through a TOC link
// ==========================================

document.querySelectorAll(".toc-list a").forEach(link => {

    link.addEventListener("click", function() {

        // Do not save the "Back to where I was" link.
        if (this.id === "tocBack") {
            return;
        }

        sessionStorage.setItem(
            "leavingShadeReturnPage",
            window.location.href
        );

        sessionStorage.setItem(
            "leavingShadeReturnScroll",
            window.scrollY
        );

        closeTOC();

    });

});


// ==========================================
// Back to where I was
// ==========================================

if (tocBack) {

    tocBack.addEventListener("click", function(event) {

        event.preventDefault();

        const returnPage =
            sessionStorage.getItem("leavingShadeReturnPage");

        const returnScroll =
            sessionStorage.getItem("leavingShadeReturnScroll");


        // Nothing has been saved yet.
        if (!returnPage || returnScroll === null) {

            closeTOC();

            return;

        }


        const currentPage =
            window.location.href.split("#")[0];

        const savedPage =
            returnPage.split("#")[0];


        // ------------------------------------------
        // Same page
        // ------------------------------------------

        if (currentPage === savedPage) {

            closeTOC();

            setTimeout(function() {

                window.scrollTo({

                    top: Number(returnScroll),

                    behavior: "smooth"

                });

            }, 100);

            return;

        }


        // ------------------------------------------
        // Different page
        // ------------------------------------------

        sessionStorage.setItem(
            "leavingShadeRestore",
            returnScroll
        );

        window.location.href = returnPage;

    });

}


// ==========================================
// Restore position after returning to a page
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

        }, 200);

    });

}
