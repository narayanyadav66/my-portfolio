(() => {
  "use strict";

  const menuButton = document.getElementById("menu");
  const navLinks = document.getElementById("links");

  // Accessible mobile navigation
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.setAttribute("aria-label", "Open navigation");
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navLinks.classList.contains("open")) {
        navLinks.classList.remove("open");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.focus();
      }
    });
  }

  // Highlight the navigation item for the section in view
  const sections = document.querySelectorAll("header[id], section[id]");
  const links = Array.from(document.querySelectorAll("#links a"));

  if ("IntersectionObserver" in window && sections.length && links.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });

    sections.forEach((section) => observer.observe(section));
  }

  // Copy email address with a fallback for browsers without Clipboard API access
  const copyButton = document.getElementById("copy-email");
  const copyStatus = document.getElementById("copy-status");

  if (copyButton) {
    copyButton.addEventListener("click", async () => {
      const email = copyButton.dataset.email;
      if (!email) return;

      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(email);
        } else {
          const temporaryInput = document.createElement("textarea");
          temporaryInput.value = email;
          temporaryInput.setAttribute("readonly", "");
          temporaryInput.style.position = "absolute";
          temporaryInput.style.left = "-9999px";
          document.body.appendChild(temporaryInput);
          temporaryInput.select();
          const copied = document.execCommand("copy");
          temporaryInput.remove();
          if (!copied) throw new Error("Copy command was not successful");
        }

        copyStatus.textContent = "Email copied to clipboard.";
        copyButton.textContent = "Copied!";
      } catch (error) {
        copyStatus.textContent = "Copy failed. Please use the email link instead.";
      }

      window.setTimeout(() => {
        copyButton.textContent = "Copy email";
        if (copyStatus) copyStatus.textContent = "";
      }, 2500);
    });
  }

  // Keep the footer year current
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
