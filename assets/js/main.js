/* ==========================================================
   HERO SLIDER
   Advanced Navigation, Swipe and Transition Lock
========================================================== */

class HeroSlider {
    constructor(selector = "[data-hero-slider]") {
        this.slider = document.querySelector(selector);

        if (!this.slider) {
            return;
        }

        this.heroSection = this.slider.closest(".hero");
        this.track = this.slider.querySelector("[data-hero-track]");

        this.slides = Array.from(
            this.slider.querySelectorAll("[data-hero-slide]")
        );

        this.previousButton = this.slider.querySelector(
            "[data-hero-previous]"
        );

        this.nextButton = this.slider.querySelector(
            "[data-hero-next]"
        );

        this.pagination = Array.from(
            this.heroSection?.querySelectorAll(".hero-slider__dot") ?? []
        );

        this.status = this.slider.querySelector("[data-hero-status]");

        /* --------------------------------------------------
           Slider state
        -------------------------------------------------- */

        this.currentIndex = 0;
        this.totalSlides = this.slides.length;

        this.autoPlayEnabled = true;
        this.autoPlayDelay = 5000;
        this.timer = null;

        this.isAnimating = false;
        this.transitionDuration = 700;
        this.transitionTimer = null;


        /* --------------------------------------------------
   Performance and lifecycle state
-------------------------------------------------- */

this.isPageVisible = !document.hidden;
this.isSliderVisible = true;
this.isDestroyed = false;

this.intersectionObserver = null;
this.resizeTimer = null;

this.reducedMotionQuery = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
);

this.prefersReducedMotion =
    this.reducedMotionQuery.matches;

this.desktopBreakpoint = 992;
this.lastViewportWidth = window.innerWidth;

/* --------------------------------------------------
   Bound event handlers
-------------------------------------------------- */

this.handleVisibilityChange =
    this.handleVisibilityChange.bind(this);

this.handleResize =
    this.handleResize.bind(this);

this.handleReducedMotionChange =
    this.handleReducedMotionChange.bind(this);

this.handlePageHide =
    this.handlePageHide.bind(this);

this.handlePageShow =
    this.handlePageShow.bind(this);


        /* --------------------------------------------------
           Swipe state
        -------------------------------------------------- */

        this.pointerStartX = 0;
        this.pointerStartY = 0;
        this.pointerCurrentX = 0;

        this.isPointerActive = false;
        this.swipeThreshold = 55;

        /* --------------------------------------------------
           Bind methods
        -------------------------------------------------- */

        this.handleTransitionEnd =
            this.handleTransitionEnd.bind(this);

        this.handleKeydown =
            this.handleKeydown.bind(this);

        this.handlePointerDown =
            this.handlePointerDown.bind(this);

        this.handlePointerMove =
            this.handlePointerMove.bind(this);

        this.handlePointerUp =
            this.handlePointerUp.bind(this);

        this.initialize();
    }

    /* ======================================================
       INITIALIZATION
    ====================================================== */

   initialize() {
    if (
        !this.track ||
        this.totalSlides === 0
    ) {
        console.warn(
            "HeroSlider could not initialize because required elements are missing."
        );

        return;
    }

    this.currentIndex =
        this.getInitialSlideIndex();

    this.prepareAccessibility();
    this.applyMotionPreference();
    this.update(false);
    this.attachEvents();
    this.setupIntersectionObserver();

    if (this.shouldAutoPlay()) {
        this.startAutoPlay();
    }
}

    /* ======================================================
       EVENT LISTENERS
    ====================================================== */

    attachEvents() {
        this.previousButton?.addEventListener("click", () => {
            this.previous(true);
        });

        this.nextButton?.addEventListener("click", () => {
            this.next(true);
        });

        this.pagination.forEach((dot, index) => {
            dot.addEventListener("click", () => {
                this.goTo(index, true);
            });
        });

        this.track.addEventListener(
            "transitionend",
            this.handleTransitionEnd
        );

        this.slider.addEventListener(
            "keydown",
            this.handleKeydown
        );

        this.slider.addEventListener(
            "mouseenter",
            () => this.stopAutoPlay()
        );

        this.slider.addEventListener(
            "mouseleave",
            () => this.startAutoPlay()
        );

        this.slider.addEventListener(
            "focusin",
            () => this.stopAutoPlay()
        );

        this.slider.addEventListener("focusout", (event) => {
            if (!this.slider.contains(event.relatedTarget)) {
                this.startAutoPlay();
            }
        });

        this.slider.addEventListener(
            "pointerdown",
            this.handlePointerDown
        );

        this.slider.addEventListener(
            "pointermove",
            this.handlePointerMove
        );

        this.slider.addEventListener(
            "pointerup",
            this.handlePointerUp
        );

        this.slider.addEventListener(
            "pointercancel",
            this.handlePointerUp
        );

        this.slider.addEventListener(
            "dragstart",
            (event) => event.preventDefault()
        );
    }

    initialize() {
    if (
        !this.track ||
        this.totalSlides === 0
    ) {
        console.warn(
            "HeroSlider could not initialize because required elements are missing."
        );

        return;
    }

    this.currentIndex =
        this.getInitialSlideIndex();

    this.prepareAccessibility();
    this.applyMotionPreference();
    this.update(false);
    this.attachEvents();
    this.setupIntersectionObserver();

    if (this.shouldAutoPlay()) {
        this.startAutoPlay();
    }
}

    /* ======================================================
       KEYBOARD NAVIGATION
    ====================================================== */

    handleKeydown(event) {
        const interactiveElement = event.target.closest(
            "a, button, input, select, textarea"
        );

        if (
            interactiveElement &&
            !interactiveElement.classList.contains(
                "hero-slider__control"
            ) &&
            !interactiveElement.classList.contains(
                "hero-slider__dot"
            )
        ) {
            return;
        }

        switch (event.key) {
            case "ArrowRight":
                event.preventDefault();
                this.next(true);
                break;

            case "ArrowLeft":
                event.preventDefault();
                this.previous(true);
                break;

            case "Home":
                event.preventDefault();
                this.goTo(0, true);
                break;

            case "End":
                event.preventDefault();
                this.goTo(
                    this.totalSlides - 1,
                    true
                );
                break;

            default:
                break;
        }
    }

    /* ======================================================
       TOUCH AND POINTER SWIPE
    ====================================================== */

    handlePointerDown(event) {
        if (
            this.totalSlides <= 1 ||
            event.pointerType === "mouse" &&
            event.button !== 0
        ) {
            return;
        }

        this.isPointerActive = true;

        this.pointerStartX = event.clientX;
        this.pointerStartY = event.clientY;
        this.pointerCurrentX = event.clientX;

        this.stopAutoPlay();

        this.slider.setPointerCapture?.(
            event.pointerId
        );
    }

    handlePointerMove(event) {
        if (!this.isPointerActive) {
            return;
        }

        this.pointerCurrentX = event.clientX;

        const horizontalDistance =
            Math.abs(
                this.pointerCurrentX -
                this.pointerStartX
            );

        const verticalDistance =
            Math.abs(
                event.clientY -
                this.pointerStartY
            );

        if (horizontalDistance > verticalDistance) {
            event.preventDefault();
        }
    }

    handlePointerUp(event) {
        if (!this.isPointerActive) {
            return;
        }

        this.isPointerActive = false;

        const swipeDistance =
            this.pointerCurrentX -
            this.pointerStartX;

        if (
            Math.abs(swipeDistance) >=
            this.swipeThreshold
        ) {
            if (swipeDistance < 0) {
                this.next(true);
            } else {
                this.previous(true);
            }
        } else {
            this.startAutoPlay();
        }

        if (
            this.slider.hasPointerCapture?.(
                event.pointerId
            )
        ) {
            this.slider.releasePointerCapture(
                event.pointerId
            );
        }
    }

    /* ======================================================
       SLIDER NAVIGATION
    ====================================================== */

    next(isManual = false) {
        if (
            this.isAnimating ||
            this.totalSlides <= 1
        ) {
            return;
        }

        const nextIndex =
            (this.currentIndex + 1) %
            this.totalSlides;

        this.goTo(nextIndex, isManual);
    }

    previous(isManual = false) {
        if (
            this.isAnimating ||
            this.totalSlides <= 1
        ) {
            return;
        }

        const previousIndex =
            (
                this.currentIndex -
                1 +
                this.totalSlides
            ) % this.totalSlides;

        this.goTo(previousIndex, isManual);
    }

    goTo(index, isManual = false) {
        if (
            this.isAnimating ||
            !Number.isInteger(index) ||
            index < 0 ||
            index >= this.totalSlides ||
            index === this.currentIndex
        ) {
            if (isManual) {
                this.restartAutoPlay();
            }

            return;
        }

        this.isAnimating = true;
        this.currentIndex = index;

        this.update(true);
        this.startTransitionFallback();

        if (isManual) {
            this.restartAutoPlay();
        }
    }

    /* ======================================================
       UI UPDATE
    ====================================================== */

    update(animate = true) {
        if (!animate) {
            this.track.style.transition = "none";
        }

        this.track.style.transform =
            `translate3d(-${this.currentIndex * 100}%, 0, 0)`;

        this.slides.forEach((slide, index) => {
            const isActive =
                index === this.currentIndex;

            slide.classList.toggle(
                "is-active",
                isActive
            );

            slide.setAttribute(
                "aria-hidden",
                String(!isActive)
            );

            this.setSlideContentTabState(
                slide,
                isActive
            );
        });

        this.pagination.forEach((dot, index) => {
            const isActive =
                index === this.currentIndex;

            dot.classList.toggle(
                "is-active",
                isActive
            );

            dot.setAttribute(
                "aria-selected",
                String(isActive)
            );

            dot.setAttribute(
                "tabindex",
                isActive ? "0" : "-1"
            );
        });

        if (this.status) {
            this.status.textContent =
                `Slide ${this.currentIndex + 1} of ${this.totalSlides}`;
        }

        this.updateControlState();

        if (!animate) {
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    this.track.style.removeProperty(
                        "transition"
                    );
                });
            });
        }
    }

    setSlideContentTabState(slide, isActive) {
        const focusableElements =
            slide.querySelectorAll(
                "a, button, input, select, textarea, [tabindex]"
            );

        focusableElements.forEach((element) => {
            if (isActive) {
                if (
                    element.dataset.originalTabindex !==
                    undefined
                ) {
                    const originalValue =
                        element.dataset.originalTabindex;

                    if (originalValue === "") {
                        element.removeAttribute(
                            "tabindex"
                        );
                    } else {
                        element.setAttribute(
                            "tabindex",
                            originalValue
                        );
                    }

                    delete element.dataset
                        .originalTabindex;
                }

                return;
            }

            if (
                element.dataset.originalTabindex ===
                undefined
            ) {
                element.dataset.originalTabindex =
                    element.getAttribute(
                        "tabindex"
                    ) ?? "";
            }

            element.setAttribute(
                "tabindex",
                "-1"
            );
        });
    }

    updateControlState() {
        const shouldDisable =
            this.totalSlides <= 1;

        if (this.previousButton) {
            this.previousButton.disabled =
                shouldDisable;
        }

        if (this.nextButton) {
            this.nextButton.disabled =
                shouldDisable;
        }
    }

    /* ======================================================
       TRANSITION LOCK
    ====================================================== */

    handleTransitionEnd(event) {
        if (
            event.target !== this.track ||
            event.propertyName !== "transform"
        ) {
            return;
        }

        this.unlockTransition();
    }

   startTransitionFallback() {
    window.clearTimeout(
        this.transitionTimer
    );

    if (
        this.prefersReducedMotion ||
        this.transitionDuration === 0
    ) {
        this.unlockTransition();
        return;
    }

    this.transitionTimer =
        window.setTimeout(
            () => {
                this.unlockTransition();
            },
            this.transitionDuration + 100
        );
}

    unlockTransition() {
        this.isAnimating = false;

        window.clearTimeout(
            this.transitionTimer
        );

        this.transitionTimer = null;
    }

    /* ======================================================
   AUTOPLAY
====================================================== */

shouldAutoPlay() {
    return (
        !this.isDestroyed &&
        this.autoPlayEnabled &&
        !this.prefersReducedMotion &&
        this.totalSlides > 1 &&
        this.isPageVisible &&
        this.isSliderVisible &&
        !document.hidden
    );
}

startAutoPlay() {
    if (
        !this.shouldAutoPlay() ||
        this.timer
    ) {
        return;
    }

    this.timer = window.setInterval(
        () => {
            if (this.shouldAutoPlay()) {
                this.next(false);
            } else {
                this.stopAutoPlay();
            }
        },
        this.autoPlayDelay
    );
}

stopAutoPlay() {
    if (!this.timer) {
        return;
    }

    window.clearInterval(this.timer);
    this.timer = null;
}

restartAutoPlay() {
    this.stopAutoPlay();

    if (this.shouldAutoPlay()) {
        this.startAutoPlay();
    }
}

resumeAutoPlayWhenAllowed() {
    if (this.shouldAutoPlay()) {
        this.startAutoPlay();
    } else {
        this.stopAutoPlay();
    }
}

/* ==========================================================
   INITIALIZE HERO SLIDER
========================================================== */

document.addEventListener("DOMContentLoaded", () => {
    const heroSlider = new HeroSlider();

    window.threeBrothersHeroSlider =
        heroSlider;
        /* ======================================================
   CLEANUP SYSTEM
====================================================== */

destroy() {
    if (this.isDestroyed) {
        return;
    }

    this.isDestroyed = true;

    this.stopAutoPlay();
    this.unlockTransition();

    window.clearTimeout(
        this.resizeTimer
    );

    this.resizeTimer = null;

    this.intersectionObserver?.disconnect();
    this.intersectionObserver = null;

    this.track.removeEventListener(
        "transitionend",
        this.handleTransitionEnd
    );

    this.slider.removeEventListener(
        "keydown",
        this.handleKeydown
    );

    this.slider.removeEventListener(
        "pointerdown",
        this.handlePointerDown
    );

    this.slider.removeEventListener(
        "pointermove",
        this.handlePointerMove
    );

    this.slider.removeEventListener(
        "pointerup",
        this.handlePointerUp
    );

    this.slider.removeEventListener(
        "pointercancel",
        this.handlePointerUp
    );

    document.removeEventListener(
        "visibilitychange",
        this.handleVisibilityChange
    );

    window.removeEventListener(
        "resize",
        this.handleResize
    );

    window.removeEventListener(
        "pagehide",
        this.handlePageHide
    );

    window.removeEventListener(
        "pageshow",
        this.handlePageShow
    );

    if (
        typeof this.reducedMotionQuery
            .removeEventListener === "function"
    ) {
        this.reducedMotionQuery.removeEventListener(
            "change",
            this.handleReducedMotionChange
        );
    } else {
        this.reducedMotionQuery.removeListener(
            this.handleReducedMotionChange
        );
    }

    this.slider.removeAttribute(
        "tabindex"
    );

    this.slider.classList.remove(
        "prefers-reduced-motion"
    );

    this.track.style.removeProperty(
        "transition"
    );

    this.track.style.removeProperty(
        "transition-duration"
    );

    this.track.style.removeProperty(
        "transform"
    );

    this.slides.forEach((slide) => {
        slide.classList.remove(
            "is-active"
        );

        slide.removeAttribute(
            "aria-hidden"
        );

        slide.removeAttribute(
            "aria-label"
        );

        this.setSlideContentTabState(
            slide,
            true
        );
    });

    this.pagination.forEach((dot) => {
        dot.classList.remove(
            "is-active"
        );

        dot.removeAttribute(
            "aria-selected"
        );

        dot.removeAttribute(
            "tabindex"
        );

        delete dot.dataset.slide;
    });

    window.threeBrothersHeroSlider =
        null;
}
});

    /* ==================================================
       EVENTS
    ================================================== */

    attachEvents() 

        this.previousButton?.addEventListener(
            "click",
            () => this.previous()
        );

        this.nextButton?.addEventListener(
            "click",
            () => this.next()
        );

        this.pagination.forEach((dot, index) => {

            dot.addEventListener("click", () => {

                this.goTo(index);

            });

        });

        this.slider.addEventListener(
            "mouseenter",
            () => this.stopAutoPlay()
        );

        this.slider.addEventListener(
            "mouseleave",
            () => this.startAutoPlay()
        );

        document.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowRight") {
                    this.next();
                }

                if (event.key === "ArrowLeft") {
                    this.previous();
                }

            }
        );



    /* ==================================================
       UPDATE UI
    ================================================== */

    update() 

        this.track.style.transform =
            `translateX(-${this.currentIndex * 100}%)`;

        this.slides.forEach((slide, index) => {

            const active = index === this.currentIndex;

            slide.classList.toggle(
                "is-active",
                active
            );

            slide.setAttribute(
                "aria-hidden",
                !active
            );

        });

        this.pagination.forEach((dot, index) => {

            const active = index === this.currentIndex;

            dot.classList.toggle(
                "is-active",
                active
            );

            dot.setAttribute(
                "aria-selected",
                active
            );

        });

        if (this.status) {

            this.status.textContent =
                `Slide ${this.currentIndex + 1} of ${this.totalSlides}`;

        }

    

    /* ==================================================
       NAVIGATION
    ================================================== */

    next() 

        if (this.isAnimating) {
            return;
        }

        this.currentIndex++;

        if (this.currentIndex >= this.totalSlides) {
            this.currentIndex = 0;
        }

        this.update();

    

    previous() 

        if (this.isAnimating) {
            return;
        }

        this.currentIndex--;

        if (this.currentIndex < 0) {
            this.currentIndex =
                this.totalSlides - 1;
        }

        this.update();

    

    goTo(index) 

        if (
            index < 0 ||
            index >= this.totalSlides
        ) {
            return;
        }

        this.currentIndex = index;

        this.update();

        /* ======================================================
   PAGE VISIBILITY API
====================================================== */

handleVisibilityChange() {
    if (this.isDestroyed) {
        return;
    }

    this.isPageVisible = !document.hidden;

    if (this.isPageVisible) {
        this.resumeAutoPlayWhenAllowed();
    } else {
        this.stopAutoPlay();
    }
}

handlePageHide() {
    if (this.isDestroyed) {
        return;
    }

    this.stopAutoPlay();
}

handlePageShow(event) {
    if (this.isDestroyed) {
        return;
    }

    this.isPageVisible = true;

    /*
     * Browser Back-Forward Cache থেকে page restore
     * হলে slider state আবার synchronize করা হবে।
     */
    if (event.persisted) {
        this.isAnimating = false;
        this.update(false);
    }

    this.resumeAutoPlayWhenAllowed();
}


/* ======================================================
   INTERSECTION OBSERVER
====================================================== */

setupIntersectionObserver() {
    if (
        !("IntersectionObserver" in window) ||
        this.isDestroyed
    ) {
        this.isSliderVisible = true;
        return;
    }

    this.intersectionObserver =
        new IntersectionObserver(
            (entries) => {
                const [entry] = entries;

                if (!entry) {
                    return;
                }

                this.isSliderVisible =
                    entry.isIntersecting &&
                    entry.intersectionRatio >= 0.25;

                if (this.isSliderVisible) {
                    this.resumeAutoPlayWhenAllowed();
                } else {
                    this.stopAutoPlay();
                }
            },
            {
                root: null,
                threshold: [0, 0.25, 0.5, 1]
            }
        );

    this.intersectionObserver.observe(
        this.slider
    );
}

/* ======================================================
   RESIZE HANDLING
====================================================== */

handleResize() {
    if (this.isDestroyed) {
        return;
    }

    window.clearTimeout(
        this.resizeTimer
    );

    this.resizeTimer =
        window.setTimeout(() => {
            const currentViewportWidth =
                window.innerWidth;

            const crossedBreakpoint =
                (
                    this.lastViewportWidth <
                        this.desktopBreakpoint &&
                    currentViewportWidth >=
                        this.desktopBreakpoint
                ) ||
                (
                    this.lastViewportWidth >=
                        this.desktopBreakpoint &&
                    currentViewportWidth <
                        this.desktopBreakpoint
                );

            this.lastViewportWidth =
                currentViewportWidth;

            this.isAnimating = false;
            this.unlockTransition();
            this.update(false);

            if (crossedBreakpoint) {
                this.resetPointerState();
            }

            this.resumeAutoPlayWhenAllowed();
        }, 150);
}

resetPointerState() {
    this.isPointerActive = false;

    this.pointerStartX = 0;
    this.pointerStartY = 0;
    this.pointerCurrentX = 0;
}

/* ======================================================
   REDUCED MOTION PREFERENCE
====================================================== */

handleReducedMotionChange(event) {
    if (this.isDestroyed) {
        return;
    }

    this.prefersReducedMotion =
        event.matches;

    this.applyMotionPreference();

    if (this.prefersReducedMotion) {
        this.stopAutoPlay();
    } else {
        this.resumeAutoPlayWhenAllowed();
    }
}

applyMotionPreference() {
    this.slider.classList.toggle(
        "prefers-reduced-motion",
        this.prefersReducedMotion
    );

    if (this.prefersReducedMotion) {
        this.autoPlayEnabled = false;
        this.transitionDuration = 0;

        this.track.style.setProperty(
            "transition-duration",
            "0ms"
        );
    } else {
        this.autoPlayEnabled = true;
        this.transitionDuration = 700;

        this.track.style.removeProperty(
            "transition-duration"
        );
    }
}

/* ======================================================
   REDUCED MOTION PREFERENCE
====================================================== */

handleReducedMotionChange(event) {
    if (this.isDestroyed) {
        return;
    }

    this.prefersReducedMotion =
        event.matches;

    this.applyMotionPreference();

    if (this.prefersReducedMotion) {
        this.stopAutoPlay();
    } else {
        this.resumeAutoPlayWhenAllowed();
    }
}

applyMotionPreference() {
    this.slider.classList.toggle(
        "prefers-reduced-motion",
        this.prefersReducedMotion
    );

    if (this.prefersReducedMotion) {
        this.autoPlayEnabled = false;
        this.transitionDuration = 0;

        this.track.style.setProperty(
            "transition-duration",
            "0ms"
        );
    } else {
        this.autoPlayEnabled = true;
        this.transitionDuration = 700;

        this.track.style.removeProperty(
            "transition-duration"
        );
    }
}

    /* ==================================================
       AUTOPLAY
    ================================================== */

   

    



