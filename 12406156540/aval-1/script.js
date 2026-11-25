document.addEventListener('DOMContentLoaded', () => {
  // 1. Alternância do Menu Mobile (Menu Hambúrguer)
  const menuToggle = document.getElementById('mobile-menu');
  const navbar = document.getElementById('navbar');

  if (menuToggle && navbar) {
    menuToggle.addEventListener('click', () => {
      navbar.classList.toggle('active');
    });
  }

  // 2. Fechar o menu ao clicar em qualquer link de navegação (mobile)
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navbar.classList.contains('active')) {
        navbar.classList.remove('active');
      }
    });
  });

  // 3. Efeito no Cabeçalho ao Rolar a Página (Sombra Dinâmica)
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.25)';
    } else {
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.15)';
    }
  });

  // 4. Animação de Entrada Suave dos Elementos na Tela (Observer)
  const observerOptions = {
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Aplica animação nas seções e cards
  const animatedElements = document.querySelectorAll('.card, .pricing-card, .whatsapp-box, .info-box');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
  });
});