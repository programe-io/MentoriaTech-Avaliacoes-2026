const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const laserBtn = document.getElementById('laserBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const slideCounter = document.getElementById('slideCounter');
const progressBar = document.getElementById('progressBar');
const laserPointer = document.getElementById('laserPointer');
const blackoutScreen = document.getElementById('blackoutScreen');

let currentSlide = 0;
const totalSlides = slides.length;

function updateProjector() {
  slides.forEach((slide, index) => {
    slide.classList.toggle('active', index === currentSlide);
  });

  slideCounter.textContent = `${currentSlide + 1} / ${totalSlides}`;
  prevBtn.disabled = currentSlide === 0;
  nextBtn.textContent = currentSlide === totalSlides - 1 ? 'Reiniciar ↺' : 'Próximo →';

  const progress = ((currentSlide + 1) / totalSlides) * 100;
  progressBar.style.width = `${progress}%`;
}

function nextSlide() {
  currentSlide = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
  updateProjector();
}

function prevSlide() {
  if (currentSlide > 0) {
    currentSlide--;
    updateProjector();
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function toggleLaser() {
  document.body.classList.toggle('laser-mode');
  laserBtn.classList.toggle('active-tool');
}

// Eventos de clique
nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);
fullscreenBtn.addEventListener('click', toggleFullscreen);
laserBtn.addEventListener('click', toggleLaser);

// Rastreamento do ponteiro laser
document.addEventListener('mousemove', (e) => {
  laserPointer.style.left = `${e.clientX}px`;
  laserPointer.style.top = `${e.clientY}px`;
});

// Atalhos de teclado
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
    e.preventDefault();
    nextSlide();
  } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
    e.preventDefault();
    prevSlide();
  } else if (e.key === 'Home') {
    currentSlide = 0;
    updateProjector();
  } else if (e.key.toLowerCase() === 'f') {
    toggleFullscreen();
  } else if (e.key.toLowerCase() === 'l') {
    toggleLaser();
  } else if (e.key.toLowerCase() === 'b') {
    blackoutScreen.classList.toggle('active');
  }
});

// Atualiza o botão caso o usuário saia da tela cheia pressionando ESC
document.addEventListener('fullscreenchange', () => {
  fullscreenBtn.textContent = document.fullscreenElement ? 'Sair Tela Cheia' : 'Tela Cheia';
});

// Inicialização
updateProjector();