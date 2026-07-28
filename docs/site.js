(function () {
  "use strict";

  function setupNavigation() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".nav-links");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  function setupReveals() {
    var targets = document.querySelectorAll(".reveal, .reveal-group");
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
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
    );

    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  function setupInstallTabs() {
    var root = document.querySelector("[data-install-tabs]");
    if (!root) return;

    var tabs = Array.prototype.slice.call(
      root.querySelectorAll('[role="tab"]'),
    );
    var panels = Array.prototype.slice.call(
      root.querySelectorAll('[role="tabpanel"]'),
    );

    function activate(tab) {
      tabs.forEach(function (candidate) {
        candidate.setAttribute(
          "aria-selected",
          candidate === tab ? "true" : "false",
        );
      });
      panels.forEach(function (panel) {
        panel.hidden = panel.id !== tab.getAttribute("aria-controls");
      });
    }

    tabs.forEach(function (tab, index) {
      tab.addEventListener("click", function () {
        activate(tab);
      });

      tab.addEventListener("keydown", function (event) {
        if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
        var direction = event.key === "ArrowRight" ? 1 : -1;
        var next = (index + direction + tabs.length) % tabs.length;
        activate(tabs[next]);
        tabs[next].focus();
        event.preventDefault();
      });
    });
  }

  function setupCopyButtons() {
    document.querySelectorAll("[data-copy-target]").forEach(function (button) {
      button.addEventListener("click", function () {
        var target = document.getElementById(
          button.getAttribute("data-copy-target"),
        );
        if (!target) return;

        var value = target.textContent;
        var original = button.textContent;

        function showStatus(label) {
          button.textContent = label;
          window.setTimeout(function () {
            button.textContent = original;
          }, 1500);
        }

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(value).then(
            function () {
              showStatus("Copied");
            },
            function () {
              showStatus("Select text");
            },
          );
          return;
        }

        var selection = window.getSelection();
        var range = document.createRange();
        range.selectNodeContents(target);
        selection.removeAllRanges();
        selection.addRange(range);
        showStatus("Select text");
      });
    });
  }

  setupNavigation();
  setupReveals();
  setupInstallTabs();
  setupCopyButtons();
})();
