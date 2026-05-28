// --- Menu Responsivo (Mobile) ---
const mobileMenu = document.getElementById('mobileMenu');
const navLinks = document.getElementById('navLinks');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    
    // Alterna o ícone entre barras e "X" caso queira aprimorar futuramente
    const icon = mobileMenu.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
    } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    }
});

// Fecha o menu mobile ao clicar em algum link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = mobileMenu.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
    });
});


// --- Sistema de Carrossel de Notícias ---
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let slideAtual = 0;

function mostrarSlide(index) {
    // Remove a classe ativa de todos
    slides.forEach(slide => slide.classList.remove('active'));
    
    // Controla os limites do índice
    if (index >=