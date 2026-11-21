/* ================= WHATSAPP FORM SUBMISSION ================= */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const myWhatsAppNumber = "923008285784";

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const service = document.getElementById("serviceSelect").value;
        const message = document.getElementById("message").value.trim();

        const whatsappText =
            `*New Inquiry - To Easy Solution*%0A%0A` +
            `*Name:* ${encodeURIComponent(name)}%0A` +
            `*Email:* ${encodeURIComponent(email)}%0A` +
            `*Service:* ${encodeURIComponent(service)}%0A` +
            `*Details:* ${encodeURIComponent(message)}`;

        const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${whatsappText}`;
        window.open(whatsappURL, "_blank", "noopener,noreferrer");

        const formResponse = document.getElementById("formResponse");
        if (formResponse) {
            formResponse.textContent = `Redirecting to WhatsApp to send your inquiry for ${service}...`;
        }
        e.target.reset();
    });
}

/* ================= LEARNING SECTION: INSTANT WHATSAPP ENROLLMENT ================= */
document.querySelectorAll(".enroll-whatsapp-btn").forEach(button => {
    button.addEventListener("click", function () {
        const myWhatsAppNumber = "923008285784";
        const selectedCourse = this.getAttribute("data-course");

        const enrollMessage =
            `Hello To Easy Solution!%0A%0A` +
            `I want to enroll and learn *${encodeURIComponent(selectedCourse)}*.%0A` +
            `Please share the course schedule, fee details, and next steps.`;

        const whatsappURL = `https://wa.me/${myWhatsAppNumber}?text=${enrollMessage}`;
        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
});

/* ================= JELLY SERVICE DROPDOWN & URL ?service= PREFILL ================= */
(function () {
    const dropdown = document.getElementById("jellyServiceDropdown");
    if (!dropdown) return;

    const trigger = dropdown.querySelector(".jelly-select-trigger");
    const selectedText = document.getElementById("jellySelectedText");
    const hiddenInput = document.getElementById("serviceSelect");
    const options = dropdown.querySelectorAll(".jelly-option");

    function selectServiceOption(value, animate) {
        if (!value) return;
        let matched = false;
        options.forEach(opt => {
            if (opt.getAttribute("data-value").toLowerCase() === value.toLowerCase()) {
                opt.classList.add("selected");
                selectedText.textContent = opt.getAttribute("data-value");
                hiddenInput.value = opt.getAttribute("data-value");
                matched = true;
            } else {
                opt.classList.remove("selected");
            }
        });
        if (!matched) {
            selectedText.textContent = value;
            hiddenInput.value = value;
        }
        if (animate) {
            trigger.classList.remove("jelly-bounce-pick");
            void trigger.offsetWidth;
            trigger.classList.add("jelly-bounce-pick");
        }
    }

    // Check URL parameter ?service=... when arriving from Services or Portfolio
    const params = new URLSearchParams(window.location.search);
    const prefill = params.get("service");
    if (prefill) {
        selectServiceOption(prefill, false);
    }

    trigger.addEventListener("click", (e) => {
        e.stopPropagation();
        dropdown.classList.toggle("open");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const value = option.getAttribute("data-value");
            selectServiceOption(value, true);
            dropdown.classList.remove("open");
        });
    });

    document.addEventListener("click", (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove("open");
        }
    });
})();

/* ================= PORTFOLIO FILTER ================= */
(function () {
    const filterButtons = document.querySelectorAll("#portfolioFilters .filter-pill-btn");
    const projectCards = document.querySelectorAll(".case-study-card");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");
            projectCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-category") === filter) {
                    card.classList.remove("hidden-project");
                } else {
                    card.classList.add("hidden-project");
                }
            });
        });
    });
})();

/* ================= BLOG CATEGORY FILTER ================= */
(function () {
    const blogFilterBtns = document.querySelectorAll("#blogFilters .filter-pill-btn");
    const blogCards = document.querySelectorAll(".blog-card");

    blogFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            blogFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-blog-filter");
            blogCards.forEach(card => {
                if (filter === "all" || card.getAttribute("data-blog-category") === filter) {
                    card.classList.remove("hidden-blog");
                } else {
                    card.classList.add("hidden-blog");
                }
            });
        });
    });
})();

/* ================= LAUNCHING ROCKET PILL SCROLL BEHAVIOR ================= */
(function () {
    const rocketBtn = document.getElementById("rocketTopBtn");
    if (!rocketBtn) return;

    window.addEventListener("scroll", () => {
        if (window.scrollY > 260) {
            rocketBtn.classList.add("show");
        } else if (!rocketBtn.classList.contains("launching")) {
            rocketBtn.classList.remove("show");
        }
    });

    rocketBtn.addEventListener("click", () => {
        rocketBtn.classList.add("launching");
        window.scrollTo({ top: 0, behavior: "smooth" });

        setTimeout(() => {
            rocketBtn.classList.remove("launching", "show");
        }, 750);
    });
})();
