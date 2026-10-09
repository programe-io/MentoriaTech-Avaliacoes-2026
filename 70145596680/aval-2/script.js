// Controle do Carrossel de Destaques
const carouselInner = document.getElementById('carouselInner');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let index = 0;

function showSlide(currentIndex) {
    if (currentIndex > 1) index = 0;
    else if (currentIndex < 0) index = 1;
    else index = currentIndex;

    carouselInner.style.transform = `translateX(-${index * 50}%)`;
}

nextBtn.addEventListener('click', () => showSlide(index + 1));
prevBtn.addEventListener('click', () => showSlide(index - 1));

// Troca Automática a cada 6 segundos
setInterval(() => {
    showSlide(index + 1);
}, 6000);

// Botão Divertido de interação do Usuário
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    alert('Modo Ultra-Gamer de Yasmin Ativado com Sucesso! 🚀👾');
});
