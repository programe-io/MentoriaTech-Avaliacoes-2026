// Alternar entre tema escuro e claro
const themeBtn = document.getElementById('themeBtn');

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');

  themeBtn.textContent =
    document.body.classList.contains('light') ? '☀' : '☾';
});

// Animar os números das estatísticas
const counters = document.querySelectorAll('.counter');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      counter.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
    observer.unobserve(counter);
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// Animação de entrada das seções
const sections = document.querySelectorAll('.section');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(30px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ],
        {
          duration: 700,
          easing: 'ease-out',
          fill: 'both'
        }
      );

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

sections.forEach(section => revealObserver.observe(section));