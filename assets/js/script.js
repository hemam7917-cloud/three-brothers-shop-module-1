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