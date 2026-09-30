// ---------- Menu no celular ----------
const menuBtn = document.querySelector('.menu-btn');
const nav = document.getElementById('nav');

menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', String(open));
});

nav.addEventListener('click', (e) => {
  if (e.target.tagName === 'A') {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

// ---------- Calculadora de preparo ----------
const cups = document.getElementById('cups');
const cupsOut = document.getElementById('cups-out');
const coffeeEl = document.getElementById('coffee');
const waterEl = document.getElementById('water');
const tipEl = document.getElementById('tip');
const methodBtns = document.querySelectorAll('.methods button');

const ML_PER_CUP = 150;
let ratio = 15; // 1 g de café para cada 15 ml de água

function updateCalc() {
  const n = Number(cups.value);
  const water = n * ML_PER_CUP;
  const coffee = Math.round(water / ratio);
  cupsOut.textContent = n;
  waterEl.textContent = `${water} ml`;
  coffeeEl.textContent = `${coffee} g`;
}

cups.addEventListener('input', updateCalc);

methodBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    methodBtns.forEach((b) => b.setAttribute('aria-pressed', 'false'));
    btn.setAttribute('aria-pressed', 'true');
    ratio = Number(btn.dataset.ratio);
    tipEl.textContent = btn.dataset.tip;
    updateCalc();
  });
});

updateCalc();

// ---------- Sacola ----------
const cartCount = document.getElementById('cart-count');
let items = 0;

document.querySelectorAll('.add').forEach((btn) => {
  btn.addEventListener('click', () => {
    items += 1;
    cartCount.textContent = items;
    const original = btn.textContent;
    btn.textContent = 'Adicionado';
    setTimeout(() => { btn.textContent = original; }, 1200);
  });
});

// ---------- Formulário de contato ----------
const form = document.getElementById('form');
const statusEl = document.getElementById('status');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    statusEl.textContent = '';
    return;
  }
  const name = form.elements.name.value.trim().split(' ')[0];
  statusEl.textContent = `Obrigado, ${name}! Recebemos sua mensagem.`;
  form.reset();
});