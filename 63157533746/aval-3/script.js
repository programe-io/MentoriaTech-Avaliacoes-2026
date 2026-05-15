/* =========================================================
   JAVASCRIPT MODERNO COMPLETO (2026)
   DOM + EVENTS + API + DARK MODE + FORM + UTILITÁRIOS
========================================================= */

"use strict";

/* =========================
   SELETORES
========================= */
const body = document.body;

const menuBtn = document.querySelector("#menuBtn");
const menu = document.querySelector("#menu");

const form = document.querySelector("form");

const relogio = document.querySelector("#relogio");

const btnTopo = document.querySelector("#btnTopo");

/* =========================
   DARK MODE
========================= */
function toggleDarkMode() {
  body.classList.toggle("dark");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark") ? "dark" : "light"
  );
}

/* carregar tema salvo */
(function loadTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    body.classList.add("dark");
  }
})();

/* =========================
   MENU MOBILE
========================= */
if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
  });
}

/* =========================
   RELÓGIO DIGITAL
========================= */
function updateClock() {
  if (!relogio) return;

  const now = new Date();

  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");

  relogio.textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock, 1000);
updateClock();

/* =========================
   FORMULÁRIO
========================= */
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = document.querySelector("#nome");
    const email = document.querySelector("#email");

    if (!nome.value.trim()) {
      alert("Digite seu nome");
      nome.focus();
      return;
    }

    if (!email.value.trim()) {
      alert("Digite seu email");
      email.focus();
      return;
    }

    alert("Formulário enviado com sucesso!");

    form.reset();
  });
}

/* =========================
   BOTÃO VOLTAR AO TOPO
========================= */
if (btnTopo) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      btnTopo.style.display = "block";
    } else {
      btnTopo.style.display = "none";
    }
  });

  btnTopo.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

/* =========================
   MUDAR COR ALEATÓRIA
========================= */
function changeColor() {
  const colors = [
    "#3b82f6",
    "#ef4444",
    "#22c55e",
    "#f59e0b",
    "#8b5cf6",
    "#06b6d4",
  ];

  const random = colors[Math.floor(Math.random() * colors.length)];

  document.documentElement.style.setProperty("--primary", random);
}

/* =========================
   API (FETCH)
========================= */
async function loadUsers() {
  try {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    const data = await res.json();

    console.log("Usuários:", data);
  } catch (err) {
    console.error("Erro na API:", err);
  }
}

loadUsers();

/* =========================
   SLIDER SIMPLES
========================= */
let index = 0;

function slider() {
  const slides = document.querySelectorAll(".slide");

  if (slides.length === 0) return;

  slides.forEach((s) => (s.style.display = "none"));

  index++;

  if (index > slides.length) index = 1;

  slides[index - 1].style.display = "block";

  setTimeout(slider, 3000);
}

slider();

/* =========================
   ANIMAÇÃO AO SCROLL
========================= */
const elements = document.querySelectorAll(".animate");

function animateOnScroll() {
  const trigger = window.innerHeight * 0.85;

  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("show");
    }
  });
}

window.addEventListener("scroll", animateOnScroll);

/* =========================
   LOCAL STORAGE EXEMPLO
========================= */
function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

/* =========================
   EXEMPLO DE ARRAY
========================= */
const produtos = ["Mouse", "Teclado", "Monitor"];

produtos.forEach((item) => {
  console.log("Produto:", item);
});

/* =========================
   OBJETO EXEMPLO
========================= */
const user = {
  nome: "João",
  idade: 30,
  cidade: "São Paulo",
};

console.log(user.nome);

/* =========================
   TIMER
========================= */
let seconds = 5;

const countdown = setInterval(() => {
  console.log(seconds);

  seconds--;

  if (seconds < 0) {
    clearInterval(countdown);
    console.log("Fim do tempo!");
  }
}, 1000);

/* =========================
   NOTIFICAÇÃO
========================= */
function notify(message) {
  const div = document.createElement("div");

  div.textContent = message;

  div.style.position = "fixed";
  div.style.bottom = "20px";
  div.style.right = "20px";
  div.style.padding = "15px";
  div.style.background = "#22c55e";
  div.style.color = "white";
  div.style.borderRadius = "10px";
  div.style.boxShadow = "0 10px 20px rgba(0,0,0,0.2)";

  document.body.appendChild(div);

  setTimeout(() => div.remove(), 3000);
}

/* =========================
   MENSAGEM FINAL
========================= */
console.log("JavaScript moderno carregado com sucesso!");