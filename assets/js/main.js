(() => {
  "use strict";

  const body = document.body;
  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  const backdrop = document.querySelector("[data-menu-backdrop]");
  const firstMenuLink = document.querySelector("[data-menu-link]");

  const setMenu = (open) => {
    if (!menu || !openButton) return;
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
    openButton.setAttribute("aria-expanded", String(open));
    body.classList.toggle("menu-open", open);
    if (open && firstMenuLink) firstMenuLink.focus();
    if (!open) openButton.focus();
  };

  openButton?.addEventListener("click", () => setMenu(true));
  closeButton?.addEventListener("click", () => setMenu(false));
  backdrop?.addEventListener("click", () => setMenu(false));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu?.classList.contains("is-open")) {
      setMenu(false);
    }
  });

  document.querySelectorAll("[data-menu-link]").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  // Scroll reveal
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  // Current year
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });

  // Demo form: replace with your backend / WhatsApp / Formspree / API.
  document.querySelectorAll("[data-contact-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const status = form.querySelector("[data-form-status]");
      if (status) {
        status.textContent = form.dataset.successMessage || "Mensagem enviada. Obrigado!";
        status.setAttribute("role", "status");
      }
      form.reset();
    });
  });
})();

/* =====================================================
   TATTOO FILTER
===================================================== */

const tattooFilters = document.querySelectorAll(".tattoo-filter");
const tattooCards = document.querySelectorAll(".tattoo-card");

tattooFilters.forEach((filterButton) => {

  filterButton.addEventListener("click", () => {

    const selectedCategory = filterButton.dataset.filter;

    // Atualiza botão ativo
    tattooFilters.forEach((button) => {
      const isActive = button === filterButton;

      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", isActive);
    });


    // Filtra as tatuagens
    tattooCards.forEach((card) => {

      const cardCategory = card.dataset.category;

      const shouldShow =
        selectedCategory === "all" ||
        cardCategory === selectedCategory;

      if (shouldShow) {

        card.hidden = false;

        requestAnimationFrame(() => {
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        });

      } else {

        card.style.opacity = "0";
        card.style.transform = "translateY(10px)";

        setTimeout(() => {
          card.hidden = true;
        }, 250);

      }

    });

  });

});


/* =====================================================
   TATTOO MODAL / LIGHTBOX
===================================================== */

const tattooModal = document.getElementById("tattoo-modal");
const tattooModalImage = document.getElementById("tattoo-modal-image");
const tattooModalTitle = document.getElementById("tattoo-modal-title");

const tattooImageButtons =
  document.querySelectorAll(".tattoo-image-button");

const modalCloseButtons =
  document.querySelectorAll("[data-modal-close]");


/* ABRIR */

tattooImageButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const imageSrc = button.dataset.image;
    const imageTitle = button.dataset.title;

    tattooModalImage.src = imageSrc;
    tattooModalImage.alt = `Tatuagem ${imageTitle}`;
    tattooModalTitle.textContent = imageTitle;

    tattooModal.classList.add("is-open");
    tattooModal.setAttribute("aria-hidden", "false");

    // Impede o scroll da página
    document.body.style.overflow = "hidden";

  });

});


/* FECHAR */

function closeTattooModal() {

  tattooModal.classList.remove("is-open");
  tattooModal.setAttribute("aria-hidden", "true");

  document.body.style.overflow = "";

  // Limpa a imagem depois da animação
  setTimeout(() => {
    tattooModalImage.src = "";
  }, 300);

}


modalCloseButtons.forEach((button) => {

  button.addEventListener("click", closeTattooModal);

});


/* ESC */

document.addEventListener("keydown", (event) => {

  if (
    event.key === "Escape" &&
    tattooModal.classList.contains("is-open")
  ) {
    closeTattooModal();
  }

});

/* =====================================================
   FORMULÁRIO DE TATUAGEM → WHATSAPP
===================================================== */

// COLOQUE AQUI O NÚMERO DA TATUADORA
// Formato internacional, somente números.
// Exemplo Brasil: 5511999999999

const tattooWhatsApp = "5521988873448";

const tattooForm = document.getElementById("tattoo-contact-form");
const formStatus = document.getElementById("form-status");


if (tattooForm) {

  tattooForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* ================================================
       ELEMENTOS
    ================================================ */

    const name = document.getElementById("name");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");

    const theme = document.getElementById("tattoo-theme");
    const placement = document.getElementById("placement");
    const size = document.getElementById("size");
    const style = document.getElementById("style");

    const message = document.getElementById("message");

    const preferredDate =
      document.getElementById("preferred-date");

    const location =
      document.getElementById("location");

    const reference =
      document.getElementById("reference");


    /* ================================================
       VALIDAÇÃO
    ================================================ */

    const requiredFields = [
      name,
      phone,
      theme,
      placement,
      size,
      message
    ];

    let formIsValid = true;


    requiredFields.forEach((field) => {

      const fieldWrapper = field.closest(".field");

      if (!field.value.trim()) {

        fieldWrapper.classList.add("has-error");

        formIsValid = false;

      } else {

        fieldWrapper.classList.remove("has-error");

      }

    });


    /* E-MAIL OPCIONAL, MAS SE PREENCHER DEVE SER VÁLIDO */

    if (
      email.value.trim() &&
      !email.validity.valid
    ) {

      email.closest(".field")
        .classList.add("has-error");

      formIsValid = false;

    }


    if (!formIsValid) {

      formStatus.textContent =
        "Por favor, preencha os campos obrigatórios.";

      return;

    }


    /* ================================================
       FUNÇÃO PARA EVITAR CAMPOS VAZIOS
    ================================================ */

    function valueOrDefault(value) {

      return value.trim()
        ? value.trim()
        : "Não informado";

    }


    /* ================================================
       DATA
    ================================================ */

    let formattedDate = "Não informada";

    if (preferredDate.value) {

      const dateParts =
        preferredDate.value.split("-");

      formattedDate =
        `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;

    }


    /* ================================================
       MONTA A MENSAGEM
    ================================================ */

    const whatsappMessage =

`✨ *NOVO PEDIDO DE TATUAGEM*

━━━━━━━━━━━━━━━━━━━━

👤 *DADOS DO CLIENTE*

Nome:
${valueOrDefault(name.value)}

WhatsApp:
${valueOrDefault(phone.value)}

E-mail:
${valueOrDefault(email.value)}

━━━━━━━━━━━━━━━━━━━━

🎨 *SOBRE A TATUAGEM*

Tema:
${valueOrDefault(theme.value)}

Estilo:
${valueOrDefault(style.value)}

Local do corpo:
${valueOrDefault(placement.value)}

Tamanho aproximado:
${valueOrDefault(size.value)}

Ideia / descrição:
${valueOrDefault(message.value)}

━━━━━━━━━━━━━━━━━━━━

📅 *AGENDAMENTO*

Data desejada:
${formattedDate}

Local:
${valueOrDefault(location.value)}

━━━━━━━━━━━━━━━━━━━━

🔗 *REFERÊNCIA*

${valueOrDefault(reference.value)}

━━━━━━━━━━━━━━━━━━━━

Mensagem enviada através do site.
`;


    /* ================================================
       ABRE WHATSAPP
    ================================================ */

    const whatsappURL =
      `https://wa.me/${tattooWhatsApp}?text=${encodeURIComponent(
        whatsappMessage
      )}`;


    window.open(
      whatsappURL,
      "_blank",
      "noopener,noreferrer"
    );


    /* ================================================
       MENSAGEM NO SITE
    ================================================ */

    formStatus.textContent =
      "Ok.";

  });

}
