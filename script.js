/* DIREÇÃO VISUAL: Jardim Editorial Calmo — interações serenas, claras e acessíveis. */
(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    var toggle = document.getElementById("navToggle");
    var links = document.getElementById("navLinks");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        var isOpen = links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(isOpen));
      });
      links.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          links.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }

    var flower = document.getElementById("flowerDiagram");
    if (flower) {
      var petals = Array.prototype.slice.call(flower.querySelectorAll(".mf-petal-wrap"));
      var detail = document.getElementById("methodDetail");
      var kicker = document.getElementById("methodKicker");
      var title = document.getElementById("methodTitle");
      var description = document.getElementById("methodDescription");

      function activatePetal(petal) {
        if (!petal || !detail) return;

        petals.forEach(function (item) {
          var isSelected = item === petal;
          item.classList.toggle("active", isSelected);
          item.setAttribute("aria-pressed", String(isSelected));
        });

        detail.classList.add("is-changing");
        window.setTimeout(function () {
          kicker.textContent = petal.dataset.kicker;
          title.textContent = petal.dataset.title;
          description.textContent = petal.dataset.description;
          detail.classList.remove("is-changing");
        }, 120);
      }

      petals.forEach(function (petal, index) {
        petal.addEventListener("mouseenter", function () { activatePetal(petal); });
        petal.addEventListener("focus", function () { activatePetal(petal); });
        petal.addEventListener("click", function () { activatePetal(petal); });
        petal.addEventListener("keydown", function (event) {
          var nextIndex;
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            activatePetal(petal);
          }
          if (event.key === "ArrowRight" || event.key === "ArrowDown") {
            event.preventDefault();
            nextIndex = (index + 1) % petals.length;
            petals[nextIndex].focus();
          }
          if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
            event.preventDefault();
            nextIndex = (index - 1 + petals.length) % petals.length;
            petals[nextIndex].focus();
          }
        });
      });
    }

    document.querySelectorAll("[data-whatsapp-link]").forEach(function (link) {
      var phone = (link.dataset.whatsappNumber || "").replace(/\D/g, "");
      var message = encodeURIComponent(link.dataset.whatsappMessage || "Olá!");

      if (phone) {
        link.href = "https://wa.me/" + phone + "?text=" + message;
        link.target = "_blank";
        link.rel = "noopener";
        link.setAttribute("aria-disabled", "false");
      } else {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.alert("Inclua o número do WhatsApp no atributo data-whatsapp-number para ativar este botão.");
        });
      }
    });
  });
}());
