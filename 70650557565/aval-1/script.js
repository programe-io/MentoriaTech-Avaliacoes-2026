/* ===== MOBILE MENU TOGGLE ===== */
const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');

menuToggle.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Fecha o menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('active');
  });
});

// Fecha o menu ao clicar fora
document.addEventListener('click', (e) => {
  if (!nav.contains(e.target) && !menuToggle.contains(e.target)) {
    nav.classList.remove('active');
  }
});

/* ===== BACK TO TOP BUTTON ===== */
const backTop = document.getElementById('backTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backTop.classList.add('show');
  } else {
    backTop.classList.remove('show');
  }
});

backTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== ANIMAÇÃO DOS NÚMEROS (CURIOSIDADES) ===== */
const counters = document.querySelectorAll('.curio-num');

const animateCounter = (el) => {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 2000; // ms
  const step = Math.max(1, Math.floor(target / 60));
  let current = 0;

  const update = () => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      return;
    }
    el.textContent = current;
    requestAnimationFrame(update);
  };

  update();
};

// Dispara a animação quando a seção entra na viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      // Só anima se ainda estiver em 0
      if (parseInt(counter.textContent, 10) === 0) {
        animateCounter(counter);
      }
    }
  });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

/* ===== FORMULÁRIO DE CONTATO ===== */
const form = document.getElementById('formContato');
const formMsg = document.getElementById('formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  // Validação simples
  if (!nome || !email || !mensagem) {
    formMsg.textContent = '⚠️ Preencha todos os campos!';
    formMsg.className = 'form-msg error';
    return;
  }

  if (!email.includes('@') || !email.includes('.')) {
    formMsg.textContent = '⚠️ Digite um e-mail válido!';
    formMsg.className = 'form-msg error';
    return;
  }

  // Simula envio bem-sucedido
  formMsg.textContent = '✅ Mensagem enviada com sucesso! Entraremos em contato em breve.';
  formMsg.className = 'form-msg success';
  form.reset();

  // Remove a mensagem após 5 segundos
  setTimeout(() => {
    formMsg.textContent = '';
    formMsg.className = 'form-msg';
  }, 5000);
});

/* ===== DESTAQUE DO LINK ATIVO NO SCROLL ===== */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 200;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.style.background = link.getAttribute('href') === `#${current}` ? '#f1c40f' : '';
    link.style.color = link.getAttribute('href') === `#${current}` ? '#2d1b0e' : '';
  });
});
