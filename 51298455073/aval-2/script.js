// ==========================
// Função para mudar a cor do balão
// ==========================
function changeBalloonColor() {
    const balloon = document.querySelector('.balloon');
    const colors = ['#ff4d4d', '#4d94ff', '#4dff88', '#ffcc00', '#ff66cc'];
    const currentColor = balloon.style.backgroundColor;
    let newColor;

    do {
        newColor = colors[Math.floor(Math.random() * colors.length)];
    } while (newColor === currentColor);

    balloon.style.backgroundColor = newColor;
}

// Adiciona evento de clique no balão
const balloon = document.querySelector('.balloon');
if (balloon) {
    balloon.addEventListener('click', changeBalloonColor);
}

// ==========================
// Função para alternar tema claro/escuro
// ==========================
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
}

// ==========================
// Menu interativo (alerta de clique)
// ==========================
const navLinks = document.querySelectorAll('header nav a');
navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        alert('Você clicou em: ' + link.textContent);
    });
});