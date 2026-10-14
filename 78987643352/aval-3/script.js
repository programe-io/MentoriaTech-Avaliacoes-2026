
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const backToTop = document.getElementById("backToTop");
  const contactForm = document.getElementById("contactForm");
  const formFeedback = document.getElementById("formFeedback");
  const currentYear = document.getElementById("currentYear");

  // Ano automático no rodapé
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // MODO CLARO E ESCURO
  let savedTheme = null;

  try {
    savedTheme = localStorage.getItem("nova-theme");
  } catch (error) {
    savedTheme = null;
  }

  if (savedTheme === "light") {
    body.classList.add("light");
  }

  function updateThemeButton() {
    const lightMode = body.classList.contains("light");

    themeToggle.textContent = lightMode ? "☀" : "☾";
    themeToggle.setAttribute(
      "aria-label",
      lightMode ? "Ativar modo escuro" : "Ativar modo claro"
    );
  }

  if (themeToggle) {
    updateThemeButton();

    themeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      try {
        localStorage.setItem(
          "nova-theme",
          body.classList.contains("light") ? "light" : "dark"
        );
      } catch (error) {
        // O tema continua funcionando sem armazenamento.
      }

      updateThemeButton();
    });
  }

  // MENU PARA CELULAR
  function closeMenu() {
    if (!menuToggle || !navLinks) return;

    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // BOTÃO VOLTAR AO TOPO
  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "visible",
      window.scrollY > 400
    );
  }

  window.addEventListener("scroll", updateBackToTop, {
    passive: true
  });

  updateBackToTop();

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ANIMAÇÕES AO ROLAR A PÁGINA
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, currentObserver) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            currentObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  // NÚMEROS ANIMADOS
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(element) {
    if (element.dataset.done === "true") return;

    element.dataset.done = "true";

    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix || "";
    const duration = 1000;

    if (!Number.isFinite(target)) return;

    const startTime = performance.now();

    function updateNumber(currentTime) {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);

      element.textContent = value + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateNumber);
      }
    }

    requestAnimationFrame(updateNumber);
  }

  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach(animateCounter);
  }

  // VALIDAÇÃO DO FORMULÁRIO
  if (contactForm && formFeedback) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      formFeedback.textContent = "";
      formFeedback.classList.remove("error");

      const name = contactForm.elements.namedItem("name");
      const email = contactForm.elements.namedItem("email");
      const message = contactForm.elements.namedItem("message");

      const fields = [name, email, message];

      fields.forEach((field) => {
        field.classList.remove("invalid");
      });

      let firstInvalid = null;

      for (const field of fields) {
        if (!field.checkValidity()) {
          field.classList.add("invalid");

          if (!firstInvalid) {
            firstInvalid = field;
          }
        }
      }

      if (firstInvalid) {
        formFeedback.textContent =
          "Confira os campos destacados e tente novamente.";

        formFeedback.classList.add("error");
        firstInvalid.focus();
        return;
      }

      formFeedback.textContent =
        "Formulário validado! Nenhuma mensagem foi enviada.";

      contactForm.reset();
    });

    contactForm.querySelectorAll("input, textarea, select")
      .forEach((field) => {
        field.addEventListener("input", () => {
          field.classList.remove("invalid");
        });
      });
  }
});
