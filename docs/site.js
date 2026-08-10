(function () {
  "use strict";

  function setupNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav-links");

    if (!toggle || !nav) return;

    function closeNavigation() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeNavigation();
    });

    document.addEventListener("click", function (event) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(event.target) || toggle.contains(event.target)) return;
      closeNavigation();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key !== "Escape" || !nav.classList.contains("is-open")) return;
      closeNavigation();
      toggle.focus();
    });
  }

  function setupReveals() {
    var targets = document.querySelectorAll(
      "[data-reveal], [data-reveal-group]",
    );
    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      targets.forEach(function (target) {
        target.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        rootMargin: "0px 0px -8% 0px",
        threshold: 0.08,
      },
    );

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function fallbackCopy(value) {
    var textArea = document.createElement("textarea");
    textArea.value = value;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    document.body.appendChild(textArea);
    textArea.select();

    var copied = document.execCommand("copy");
    textArea.remove();

    if (!copied) throw new Error("Copy was unavailable");
  }

  function copyText(value) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(value);
    }

    return new Promise(function (resolve, reject) {
      try {
        fallbackCopy(value);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  function setupCopyButtons() {
    var status = document.getElementById("copy-status");

    document.querySelectorAll("[data-copy-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.getElementById(
          button.getAttribute("data-copy-target"),
        );

        if (!target) return;

        var originalLabel = button.textContent.trim();

        copyText(target.textContent).then(
          function () {
            button.textContent = "Copied";
            if (status) status.textContent = "Command copied to clipboard.";
          },
          function () {
            button.textContent = "Select";
            if (status)
              status.textContent = "Copy unavailable. Select the command text.";
          },
        );

        window.setTimeout(function () {
          button.textContent = originalLabel;
        }, 1600);
      });
    });
  }

  setupNavigation();
  setupReveals();
  setupCopyButtons();
})();
