/* ==========================================================
   MODULE 1 — LESSON 4
   PART 4C
   PROFESSIONAL HERO SLIDER
========================================================== */

(() => {

    const slider = document.querySelector(".hero-slider");

    if (!slider) return;

    const slides = slider.querySelectorAll(".hero-slide");

    const prevBtn = slider.querySelector(".hero-slider__prev");

    const nextBtn = slider.querySelector(".hero-slider__next");

    const dots = slider.querySelectorAll(".hero-dot");

    if (!slides.length) return;

    let currentIndex = 0;

    let autoplay = null;

    const AUTOPLAY_DELAY = 5000;

    /* ==========================
       UPDATE UI
    ========================== */

    function updateSlider(index) {

        slides.forEach((slide, i) => {

            slide.classList.toggle("active", i === index);

            slide.setAttribute(
                "aria-hidden",
                i === index ? "false" : "true"
            );

        });

        dots.forEach((dot, i) => {

            dot.classList.toggle("active", i === index);

            dot.setAttribute(
                "aria-selected",
                i === index ? "true" : "false"
            );

        });

    }

    /* ==========================
       GO TO SLIDE
    ========================== */

    function goToSlide(index) {

        if (index < 0) {

            currentIndex = slides.length - 1;

        }

        else if (index >= slides.length) {

            currentIndex = 0;

        }

        else {

            currentIndex = index;

        }

        updateSlider(currentIndex);

    }

    /* ==========================
       NEXT
    ========================== */

    function nextSlide() {

        goToSlide(currentIndex + 1);

    }

    /* ==========================
       PREVIOUS
    ========================== */

    function previousSlide() {

        goToSlide(currentIndex - 1);

    }

    /* ==========================
       AUTOPLAY
    ========================== */

    function startAutoplay() {

        stopAutoplay();

        autoplay = setInterval(() => {

            nextSlide();

        }, AUTOPLAY_DELAY);

    }

    function stopAutoplay() {

        if (autoplay) {

            clearInterval(autoplay);

            autoplay = null;

        }

    }

    /* ==========================
       BUTTON EVENTS
    ========================== */

    if (nextBtn) {

        nextBtn.addEventListener("click", () => {

            nextSlide();

            startAutoplay();

        });

    }

    if (prevBtn) {

        prevBtn.addEventListener("click", () => {

            previousSlide();

            startAutoplay();

        });

    }

    /* ==========================
       DOT EVENTS
    ========================== */

    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            goToSlide(index);

            startAutoplay();

        });

    });

    /* ==========================
       PAUSE ON HOVER
    ========================== */

    slider.addEventListener("mouseenter", stopAutoplay);

    slider.addEventListener("mouseleave", startAutoplay);

    /* ==========================
       KEYBOARD
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "ArrowRight") {

            nextSlide();

            startAutoplay();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

            startAutoplay();

        }

    });

    /* ==========================
       TOUCH SWIPE
    ========================== */

    let startX = 0;

    let endX = 0;

    slider.addEventListener("touchstart", (event) => {

        startX = event.changedTouches[0].clientX;

    }, { passive: true });

    slider.addEventListener("touchend", (event) => {

        endX = event.changedTouches[0].clientX;

        const distance = startX - endX;

        if (Math.abs(distance) < 50) return;

        if (distance > 0) {

            nextSlide();

        } else {

            previousSlide();

        }

        startAutoplay();

    }, { passive: true });

    /* ==========================
       INITIALIZE
    ========================== */

    updateSlider(currentIndex);

    startAutoplay();

})();

/* ==========================================================
   MODULE 1 — LESSON 8
   PART 8C
   FLASH SALE COUNTDOWN
========================================================== */

(() => {

    "use strict";

    /* ==========================================
       CONFIG
    ========================================== */

    // Example:
    // YYYY-MM-DDTHH:MM:SS

    const FLASH_SALE_END = "2026-12-31T23:59:59";

    /* ==========================================
       ELEMENTS
    ========================================== */

    const daysElement =
        document.querySelector("[data-flash-days]");

    const hoursElement =
        document.querySelector("[data-flash-hours]");

    const minutesElement =
        document.querySelector("[data-flash-minutes]");

    const secondsElement =
        document.querySelector("[data-flash-seconds]");

    if (
        !daysElement ||
        !hoursElement ||
        !minutesElement ||
        !secondsElement
    ) {
        return;
    }

    /* ==========================================
       FORMAT
    ========================================== */

    const pad = value => String(value).padStart(2, "0");

    /* ==========================================
       UPDATE TIMER
    ========================================== */

    function updateCountdown() {

        const now = new Date().getTime();

        const end = new Date(FLASH_SALE_END).getTime();

        const difference = end - now;

        if (difference <= 0) {

            daysElement.textContent = "00";
            hoursElement.textContent = "00";
            minutesElement.textContent = "00";
            secondsElement.textContent = "00";

            clearInterval(timer);

            document
                .querySelector(".flash-sale")
                ?.classList.add("flash-sale--expired");

            return;
        }

        const days =
            Math.floor(
                difference /
                (1000 * 60 * 60 * 24)
            );

        const hours =
            Math.floor(
                (difference %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );

        const minutes =
            Math.floor(
                (difference %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );

        const seconds =
            Math.floor(
                (difference %
                    (1000 * 60))
                / 1000
            );

        daysElement.textContent = pad(days);
        hoursElement.textContent = pad(hours);
        minutesElement.textContent = pad(minutes);
        secondsElement.textContent = pad(seconds);

    }

    updateCountdown();

    const timer =
        setInterval(updateCountdown, 1000);

})();

/* ==========================================================
   MODULE 1 — LESSON 9
   PART 9D
   PROFESSIONAL BRAND SLIDER
========================================================== */

(() => {

    "use strict";

    /* ==========================================
       ELEMENTS
    ========================================== */

    const slider = document.querySelector("[data-brand-slider]");
    const track = document.querySelector("[data-brand-track]");
    const prevButton = document.querySelector("[data-brand-prev]");
    const nextButton = document.querySelector("[data-brand-next]");

    if (!slider || !track) {
        return;
    }

    /* ==========================================
       CONFIG
    ========================================== */

    const AUTO_PLAY_DELAY = 3500;

    let autoPlay = null;

    /* ==========================================
       GET CARD WIDTH
    ========================================== */

    function getStep() {

        const card = track.querySelector(".brand-card");

        if (!card) {
            return 300;
        }

        const gap =
            parseFloat(
                window.getComputedStyle(track).columnGap
            ) || 24;

        return card.offsetWidth + gap;

    }

    /* ==========================================
       NEXT
    ========================================== */

    function next() {

        const step = getStep();

        const max =
            track.scrollWidth - track.clientWidth;

        if (track.scrollLeft + step >= max) {

            track.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            track.scrollBy({
                left: step,
                behavior: "smooth"
            });

        }

    }

    /* ==========================================
       PREVIOUS
    ========================================== */

    function previous() {

        const step = getStep();

        if (track.scrollLeft <= 0) {

            track.scrollTo({
                left:
                    track.scrollWidth,
                behavior: "smooth"
            });

        } else {

            track.scrollBy({
                left: -step,
                behavior: "smooth"
            });

        }

    }

    /* ==========================================
       AUTOPLAY
    ========================================== */

    function startAutoPlay() {

        stopAutoPlay();

        autoPlay = setInterval(next, AUTO_PLAY_DELAY);

    }

    function stopAutoPlay() {

        if (autoPlay) {

            clearInterval(autoPlay);

        }

    }

    startAutoPlay();

    /* ==========================================
       BUTTON EVENTS
    ========================================== */

    nextButton?.addEventListener(
        "click",
        next
    );

    prevButton?.addEventListener(
        "click",
        previous
    );

    /* ==========================================
       HOVER PAUSE
    ========================================== */

    slider.addEventListener(
        "mouseenter",
        stopAutoPlay
    );

    slider.addEventListener(
        "mouseleave",
        startAutoPlay
    );

    /* ==========================================
       KEYBOARD
    ========================================== */

    slider.setAttribute(
        "tabindex",
        "0"
    );

    slider.addEventListener(
        "keydown",
        event => {

            if (event.key === "ArrowRight") {

                next();

            }

            if (event.key === "ArrowLeft") {

                previous();

            }

        }
    );

    /* ==========================================
       TOUCH SUPPORT
    ========================================== */

    let startX = 0;

    let endX = 0;

    slider.addEventListener(
        "touchstart",
        event => {

            startX =
                event.changedTouches[0].clientX;

        },
        {
            passive: true
        }
    );

    slider.addEventListener(
        "touchend",
        event => {

            endX =
                event.changedTouches[0].clientX;

            if (startX - endX > 60) {

                next();

            }

            if (endX - startX > 60) {

                previous();

            }

        },
        {
            passive: true
        }
    );

    /* ==========================================
       MOUSE DRAG
    ========================================== */

    let isDragging = false;

    let dragStart = 0;

    let scrollStart = 0;

    track.addEventListener(
        "mousedown",
        event => {

            isDragging = true;

            dragStart = event.pageX;

            scrollStart = track.scrollLeft;

            track.classList.add("is-dragging");

        }
    );

    window.addEventListener(
        "mouseup",
        () => {

            isDragging = false;

            track.classList.remove("is-dragging");

        }
    );

    window.addEventListener(
        "mousemove",
        event => {

            if (!isDragging) {

                return;

            }

            event.preventDefault();

            const distance =
                event.pageX - dragStart;

            track.scrollLeft =
                scrollStart - distance;

        }
    );

    /* ==========================================
       WINDOW RESIZE
    ========================================== */

    window.addEventListener(
        "resize",
        () => {

            track.scrollLeft = 0;

        }
    );

})();


/* ==========================================================
   MODULE 1
   LESSON 10
   PART 10E
   PROFESSIONAL NEWSLETTER EMAIL VALIDATION
========================================================== */

(() => {

    "use strict";

    /* ==========================================
       ELEMENTS
    ========================================== */

    const newsletterForm =
        document.getElementById("newsletterForm");

    const newsletterEmail =
        document.getElementById("newsletterEmail");

    const successMessage =
        document.getElementById("newsletterSuccess");

    const errorMessage =
        document.getElementById("newsletterError");

    if (
        !newsletterForm ||
        !newsletterEmail ||
        !successMessage ||
        !errorMessage
    ) {
        return;
    }

    const submitButton =
        newsletterForm.querySelector(
            ".newsletter__submit"
        );

    if (!submitButton) {
        return;
    }

    /* ==========================================
       CONFIGURATION
    ========================================== */

    const SUBMISSION_DELAY = 900;

    const defaultButtonText =
        submitButton.textContent.trim();

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    /* ==========================================
       HELPER FUNCTIONS
    ========================================== */

    function normalizeEmail(value) {

        return value
            .trim()
            .toLowerCase();

    }

    function isValidEmail(email) {

        return emailPattern.test(email);

    }

    function hideMessages() {

        successMessage.style.display = "none";
        errorMessage.style.display = "none";

        successMessage.setAttribute(
            "aria-hidden",
            "true"
        );

        errorMessage.setAttribute(
            "aria-hidden",
            "true"
        );

    }

    function showSuccessMessage() {

        hideMessages();

        successMessage.style.display = "block";

        successMessage.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    function showErrorMessage(message) {

        hideMessages();

        errorMessage.textContent = message;

        errorMessage.style.display = "block";

        errorMessage.setAttribute(
            "aria-hidden",
            "false"
        );

    }

    function markInputInvalid() {

        newsletterEmail.setAttribute(
            "aria-invalid",
            "true"
        );

        newsletterEmail.classList.add(
            "is-invalid"
        );

    }

    function markInputValid() {

        newsletterEmail.setAttribute(
            "aria-invalid",
            "false"
        );

        newsletterEmail.classList.remove(
            "is-invalid"
        );

    }

    function setLoadingState(isLoading) {

        submitButton.disabled = isLoading;

        submitButton.classList.toggle(
            "is-loading",
            isLoading
        );

        newsletterEmail.disabled = isLoading;

        newsletterForm.setAttribute(
            "aria-busy",
            String(isLoading)
        );

        submitButton.textContent =
            isLoading
                ? "Subscribing..."
                : defaultButtonText;

    }

    /* ==========================================
       VALIDATION
    ========================================== */

    function validateEmail() {

        const email =
            normalizeEmail(
                newsletterEmail.value
            );

        if (!email) {

            markInputInvalid();

            showErrorMessage(
                "❌ Please enter your email address."
            );

            return false;

        }

        if (!isValidEmail(email)) {

            markInputInvalid();

            showErrorMessage(
                "❌ Please enter a valid email address."
            );

            return false;

        }

        newsletterEmail.value = email;

        markInputValid();
        hideMessages();

        return true;

    }

    /* ==========================================
       FORM SUBMISSION
    ========================================== */

    newsletterForm.addEventListener(
        "submit",
        async event => {

            event.preventDefault();

            if (!validateEmail()) {

                newsletterEmail.focus();

                return;

            }

            setLoadingState(true);
            hideMessages();

            try {

                /*
                 * Frontend simulation only.
                 *
                 * Later replace this block with:
                 *
                 * const response = await fetch(
                 *     "/api/newsletter/subscribe",
                 *     {
                 *         method: "POST",
                 *         headers: {
                 *             "Content-Type":
                 *                 "application/json",
                 *             "Accept":
                 *                 "application/json"
                 *         },
                 *         body: JSON.stringify({
                 *             email:
                 *                 newsletterEmail.value
                 *         })
                 *     }
                 * );
                 *
                 * if (!response.ok) {
                 *     throw new Error(
                 *         "Subscription failed."
                 *     );
                 * }
                 */

                await new Promise(resolve => {

                    window.setTimeout(
                        resolve,
                        SUBMISSION_DELAY
                    );

                });

                showSuccessMessage();

                newsletterForm.reset();

                markInputValid();

            } catch (error) {

                console.error(
                    "Newsletter subscription error:",
                    error
                );

                showErrorMessage(
                    "❌ Subscription failed. Please try again."
                );

            } finally {

                setLoadingState(false);

            }

        }
    );

    /* ==========================================
       REAL-TIME INPUT VALIDATION
    ========================================== */

    newsletterEmail.addEventListener(
        "input",
        () => {

            hideMessages();

            if (
                newsletterEmail.hasAttribute(
                    "aria-invalid"
                )
            ) {

                newsletterEmail.removeAttribute(
                    "aria-invalid"
                );

            }

            newsletterEmail.classList.remove(
                "is-invalid"
            );

        }
    );

    newsletterEmail.addEventListener(
        "blur",
        () => {

            const email =
                normalizeEmail(
                    newsletterEmail.value
                );

            if (!email) {
                return;
            }

            if (!isValidEmail(email)) {

                markInputInvalid();

                showErrorMessage(
                    "❌ Please check your email address."
                );

                return;

            }

            newsletterEmail.value = email;

            markInputValid();
            hideMessages();

        }
    );

    /* ==========================================
       INITIAL ACCESSIBILITY STATE
    ========================================== */

    hideMessages();

    newsletterForm.setAttribute(
        "aria-busy",
        "false"
    );

})();

