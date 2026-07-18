/*
==========================================================
Three Brothers Shop Plus v3.0
Module 1
Lesson 11
Part 11G-1

Professional Footer JavaScript
==========================================================
*/

"use strict";

/*=========================================================
DOM READY
=========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    initializeFooter();

});

/*=========================================================
INITIALIZER
=========================================================*/

function initializeFooter() {

    updateCurrentYear();

    initializeNewsletter();

    initializeBackToTop();

    initializeRevealAnimation();

    initializeSocialIcons();

    initializeKeyboardAccessibility();

    initializeAdvancedFooterFeatures();

}

/*=========================================================
AUTO COPYRIGHT YEAR
=========================================================*/

function updateCurrentYear() {

    const yearElement = document.querySelector("[data-current-year]");

    if (!yearElement) return;

    yearElement.textContent = new Date().getFullYear();

}

/*=========================================================
NEWSLETTER
=========================================================*/

function initializeNewsletter() {

    const form = document.querySelector("[data-newsletter-form]");

    if (!form) return;

    form.addEventListener("submit", newsletterSubmitHandler);

}

/*=========================================================
SUBMIT
=========================================================*/

function newsletterSubmitHandler(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const input = form.querySelector("[data-newsletter-email]");

    if (!input) return;

    const email = input.value.trim();

    if (email === "") {

        showNewsletterMessage(

            "Please enter your email address.",

            "error"

        );

        input.focus();

        return;

    }

    if (!isValidEmail(email)) {

        showNewsletterMessage(

            "Please enter a valid email address.",

            "error"

        );

        input.focus();

        return;

    }

    showNewsletterMessage(

        "Thank you! You have successfully subscribed.",

        "success"

    );

    form.reset();

}

/*=========================================================
EMAIL VALIDATION
=========================================================*/

function isValidEmail(email) {

    const pattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    return pattern.test(email);

}

/*=========================================================
MESSAGE
=========================================================*/

function showNewsletterMessage(message, type) {

    let box = document.querySelector(

        ".newsletter-message"

    );

    if (!box) {

        box = document.createElement("div");

        box.className = "newsletter-message";

        document.body.appendChild(box);

    }

    box.textContent = message;

    box.classList.remove(

        "newsletter-message--success",

        "newsletter-message--error"

    );

    if (type === "success") {

        box.classList.add(

            "newsletter-message--success"

        );

    } else {

        box.classList.add(

            "newsletter-message--error"

        );

    }

    box.classList.add("newsletter-message--show");

    clearTimeout(box.hideTimer);

    box.hideTimer = setTimeout(() => {

        box.classList.remove(

            "newsletter-message--show"

        );

    }, 3500);

}

/*=========================================================
BACK TO TOP BUTTON
=========================================================*/

function initializeBackToTop() {

    const button = document.querySelector("[data-back-to-top]");

    if (!button) return;

    window.addEventListener(
        "scroll",
        () => {

            if (window.scrollY > 500) {

                button.classList.add("is-visible");

            } else {

                button.classList.remove("is-visible");

            }

        },
        { passive: true }
    );

    button.addEventListener("click", () => {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}

/*=========================================================
FOOTER REVEAL ANIMATION
=========================================================*/

function initializeRevealAnimation() {

    const elements = document.querySelectorAll(

        ".site-footer__column"

    );

    if (!elements.length) return;

    const observer = new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold: 0.15

        }

    );

    elements.forEach((element) => {

        observer.observe(element);

    });

}

/*=========================================================
SOCIAL ICON HOVER
=========================================================*/

function initializeSocialIcons() {

    const icons = document.querySelectorAll(

        ".footer-social__link"

    );

    if (!icons.length) return;

    icons.forEach((icon) => {

        icon.addEventListener("mouseenter", () => {

            icon.classList.add("is-hover");

        });

        icon.addEventListener("mouseleave", () => {

            icon.classList.remove("is-hover");

        });

        icon.addEventListener("focus", () => {

            icon.classList.add("is-hover");

        });

        icon.addEventListener("blur", () => {

            icon.classList.remove("is-hover");

        });

    });

}

/*=========================================================
KEYBOARD ACCESSIBILITY
=========================================================*/

function initializeKeyboardAccessibility() {

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            document.activeElement.blur();

        }

    });

}

/*=========================================================
DEBOUNCE
=========================================================*/

function debounce(callback, delay = 200) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

/*=========================================================
THROTTLE
=========================================================*/

function throttle(callback, limit = 100) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, limit);

    };

}

/*=========================================================
SAFE EVENT LISTENER
=========================================================*/

function addSafeEventListener(element, event, handler, options = {}) {

    if (!element) return;

    element.addEventListener(event, handler, options);

}

/*=========================================================
REDUCED MOTION SUPPORT
=========================================================*/

function prefersReducedMotion() {

    return window.matchMedia(

        "(prefers-reduced-motion: reduce)"

    ).matches;

}

/*=========================================================
PAGE VISIBILITY
=========================================================*/

function initializePageVisibility() {

    document.addEventListener(

        "visibilitychange",

        () => {

            if (document.hidden) {

                console.log("Footer JS Paused");

            } else {

                console.log("Footer JS Active");

            }

        }

    );

}

/*=========================================================
FOCUS ACCESSIBILITY
=========================================================*/

function initializeFocusAccessibility() {

    document.addEventListener("keydown", (event) => {

        if (event.key === "Tab") {

            document.body.classList.add("using-keyboard");

        }

    });

    document.addEventListener("mousedown", () => {

        document.body.classList.remove("using-keyboard");

    });

}

/*=========================================================
PERFORMANCE MARK
=========================================================*/

function logFooterPerformance() {

    if (!window.performance) return;

    const loadTime = performance.now();

    console.info(

        `Footer initialized in ${loadTime.toFixed(2)} ms`

    );

}

/*=========================================================
INITIALIZE ADVANCED FEATURES
=========================================================*/

function initializeAdvancedFooterFeatures() {

    initializePageVisibility();

    initializeFocusAccessibility();

    logFooterPerformance();

    if (prefersReducedMotion()) {

        document.documentElement.classList.add(

            "reduced-motion"

        );

    }

}

/*=========================================================
EXPORT READY
=========================================================*/

window.Footer = {

    updateCurrentYear,

    initializeNewsletter,

    initializeBackToTop,

    initializeRevealAnimation,

    initializeSocialIcons,

    initializeKeyboardAccessibility,

    initializeAdvancedFooterFeatures

};

