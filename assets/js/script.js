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