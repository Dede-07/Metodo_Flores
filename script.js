/* Interações do Método Flores — os textos dos métodos ficam centralizados neste arquivo. */
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
      var petals = Array.prototype.slice.call(
        flower.querySelectorAll(".mf-petal-wrap")
      );
      var detail = document.getElementById("methodDetail");
      var kicker = document.getElementById("methodKicker");
      var title = document.getElementById("methodTitle");
      var description = document.getElementById("methodDescription");

      var methodInfo = {
        "Fônico": {
          kicker: "01 · O som como ponto de partida",
          description:
            "Ensino do som das letras. Cada letra, ou grupo de letras, é apresentado pelo som que produz, para que a criança aprenda a decodificar, não a adivinhar palavras."
        },
        "Lúdico": {
          kicker: "02 · Aprender também é brincar",
          description:
            "Uso de músicas, brincadeiras, fichas ilustradas e estímulos sensoriais para trazer significado a cada som e tornar o aprendizado mais leve, visual e engajador."
        },
        "Ordenado": {
          kicker: "03 · Cada descoberta no seu tempo",
          description:
            "Aplicação de uma sequência gradual e progressiva, em que sons e habilidades são apresentados para criar repertório, segurança e continuidade."
        },
        "Regrado": {
          kicker: "04 · A língua tem pistas claras",
          description:
            "Sistema com regras claras: a criança aprende as regularidades da língua portuguesa e entende por que as palavras são lidas daquela forma."
        },
        "Explícito": {
          kicker: "05 · O ensino torna o caminho visível",
          description:
            "Instrução direta e clara, sem deixar a criança adivinhar o processo. A professora modela, explica, pratica junto e cria oportunidades para a autonomia."
        },
        "Sensorial": {
          kicker: "06 · O corpo também participa",
          description:
            "Além dos estímulos auditivos, integramos estímulos visuais e motores, como as boquinhas, para materializar cada som e apoiar a memória."
        }
      };

      function activatePetal(petal) {
        if (!petal || !detail) return;

        var methodTitle = petal.dataset.title || "Método Flores";
        var info = methodInfo[methodTitle] || {
          kicker: "Pilar do Método Flores",
          description: "Conheça este pilar do Método Flores."
        };

        petals.forEach(function (item) {
          var isSelected = item === petal;
          item.classList.toggle("active", isSelected);
          item.setAttribute("aria-pressed", String(isSelected));
        });

        detail.classList.add("is-changing");

        window.setTimeout(function () {
          if (kicker) kicker.textContent = info.kicker;
          if (title) title.textContent = methodTitle;
          if (description) description.textContent = info.description;
          detail.classList.remove("is-changing");
        }, 120);
      }

      petals.forEach(function (petal, index) {
        petal.addEventListener("mouseenter", function () {
          activatePetal(petal);
        });

        petal.addEventListener("focus", function () {
          activatePetal(petal);
        });

        petal.addEventListener("click", function () {
          activatePetal(petal);
        });

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
      var message = encodeURIComponent(
        link.dataset.whatsappMessage || "Olá!"
      );

      if (phone) {
        link.href = "https://wa.me/" + phone + "?text=" + message;
        link.target = "_blank";
        link.rel = "noopener";
        link.setAttribute("aria-disabled", "false");
      } else {
        link.addEventListener("click", function (event) {
          event.preventDefault();
          window.alert(
            "Inclua o número do WhatsApp no atributo data-whatsapp-number para ativar este botão."
          );
        });
      }
    });
  });
})();
