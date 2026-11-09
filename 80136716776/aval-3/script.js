// Funcionalidade para o botão Seguir
const followBtn = document.querySelector('.follow-btn');

followBtn.addEventListener('click', () => {
    if (followBtn.textContent === 'Seguir') {
        followBtn.textContent = 'Seguindo';
        followBtn.classList.add('following');
    } else {
        followBtn.textContent = 'Seguir';
        followBtn.classList.remove('following');
    }
});

// Mensagem ao clicar em uma foto de teia
const gridItems = document.querySelectorAll('.grid-item');

gridItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        alert(`Carregando publicação ${index + 1}... Thwip! 🕸️`);
    });
});
