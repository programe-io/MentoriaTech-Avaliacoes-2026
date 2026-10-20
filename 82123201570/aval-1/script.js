
"use strict";

// WhatsApp da Bella Moda, com código do Brasil e DDD.
// Formato: 55 + DDD + número, sem espaços ou símbolos.
const WHATSAPP_NUMBER = "5586981301675";

function openWhatsApp(message) {
  const url = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
  url.searchParams.set("text", message);
  window.open(url.href, "_blank", "noopener,noreferrer");
}

// Menu responsivo
const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Fechar menu" : "Abrir menu"
  );
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Fecha o menu depois de selecionar uma seção
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    menuToggle.textContent = "☰";
  });
});

// Filtros dos produtos
const filterButtons = document.querySelectorAll(".filter");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", String(active));
    });

    productCards.forEach((card) => {
      const matches =
        category === "todos" ||
        card.dataset.category === category;

      card.hidden = !matches;
    });
  });

  button.setAttribute(
    "aria-pressed",
    String(button.classList.contains("active"))
  );
});

// Botões de pedido de cada produto
document.querySelectorAll(".btn-product").forEach((button) => {
  button.addEventListener("click", () => {
    const product = button.dataset.product;
    const price = button.dataset.price;

    const message =
      `Olá! Vim pelo site da Bella Moda e tenho interesse ` +
      `no produto ${product}, anunciado por R$ ${price}. ` +
      `Poderia me informar os tamanhos, cores e disponibilidade?`;

    openWhatsApp(message);
  });
});

// Botão principal de contato
const contactButton = document.querySelector("#contact-button");

contactButton.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Olá! Vim pelo site da Bella Moda e gostaria de conhecer a coleção."
  );

contactButton.target = "_blank";
contactButton.rel = "noopener noreferrer";

// Botão flutuante de WhatsApp
const floatingButton = document.querySelector("#whatsapp-float");

floatingButton.href =
  `https://wa.me/${WHATSAPP_NUMBER}?text=` +
  encodeURIComponent(
    "Olá! Vim pelo site da Bella Moda e gostaria de atendimento."
  );

// Atualiza o ano automaticamente
document.querySelector("#year").textContent =
  new Date().getFullYear();
