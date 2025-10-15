document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const form = e.target;
      const formData = new FormData(form);
      const statusDiv = document.getElementById("form-status");
      const submitButton = form.querySelector('button[type="submit"]');

      submitButton.textContent = "Sending...";
      submitButton.disabled = true;
      statusDiv.innerHTML = "";

      fetch(form.action, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            statusDiv.innerHTML =
              '<p class="text-green-600 font-semibold">Thank you! Your message has been sent successfully.</p>';
            form.reset();
          } else {
            throw new Error("Form submission failed");
          }
        })
        .catch((error) => {
          statusDiv.innerHTML =
            '<p class="text-red-600 font-semibold">Sorry, there was an error sending your message. Please try again.</p>';
        })
        .finally(() => {
          submitButton.textContent = "Send Message";
          submitButton.disabled = false;
        });
    });
  }
});

// Active page highlighting - Simple class toggle
document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  // Remove active class from all nav links first
  document.querySelectorAll("nav a").forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current page
  document.querySelectorAll("nav a").forEach((link) => {
    const href = link.getAttribute("href");

    // Skip contact button
    if (href && href.includes("contact")) {
      return;
    }

    // Check if this is the current page
    if (href === currentPage) {
      link.classList.add("active");
    }
  });
});
