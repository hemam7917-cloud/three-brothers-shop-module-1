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
