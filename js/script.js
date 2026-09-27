const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', function () {
    navMenu.classList.toggle('active');
});

const navLinks = navMenu.querySelectorAll('a');

navLinks.forEach(link => {
    link.addEventListener('click', function () {
        navMenu.classList.remove('active');
    });
});

/* ================= CERTIFICATE MODAL ================= */

const certificateModal = document.getElementById("certificateModal");
const certificatePdf = document.getElementById("certificatePdf");
const certificateClose = document.getElementById("certificateClose");

const certificateButtons = document.querySelectorAll(".certificate-view");
const certificatePreviews = document.querySelectorAll(".certificate-preview");

function openCertificate(pdfUrl) {

    certificatePdf.src =
        pdfUrl + "#toolbar=1&navpanes=0&scrollbar=1";

    certificateModal.classList.add("active");

    document.body.style.overflow = "hidden";
}

certificateButtons.forEach(button => {

    button.addEventListener("click", function () {
        openCertificate(this.dataset.pdf);
    });

});

/* Whole thumbnail is clickable too, not just the small text link */
certificatePreviews.forEach(preview => {

    preview.addEventListener("click", function () {
        openCertificate(this.dataset.pdf);
    });

    preview.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openCertificate(this.dataset.pdf);
        }
    });

});


/* CLOSE BUTTON */

certificateClose.addEventListener("click", closeCertificate);


/* CLICK OUTSIDE */

certificateModal.addEventListener("click", function (event) {

    if (event.target === certificateModal) {
        closeCertificate();
    }

});


/* ESC KEY */

document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
        closeCertificate();
    }

});


function closeCertificate() {

    certificateModal.classList.remove("active");

    certificatePdf.src = "";

    document.body.style.overflow = "";
}


/* ================= SCROLL SPY (highlight active menu) ================= */

const sections = document.querySelectorAll("main section[id]");

const spyObserver = new IntersectionObserver(function (entries) {

    entries.forEach(entry => {

        const link = document.querySelector(
            `.nav-content nav a[href="#${entry.target.id}"]`
        );

        if (!link) return;

        if (entry.isIntersecting) {
            navLinks.forEach(a => a.classList.remove("active-link"));
            link.classList.add("active-link");
        }

    });

}, {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0
});

sections.forEach(section => spyObserver.observe(section));


/* ================= BACK TO TOP ================= */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (window.scrollY > 500) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});

backToTop.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});