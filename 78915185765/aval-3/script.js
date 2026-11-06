// Funcionalidade do botão Seguir/Seguindo
const followBtn = document.getElementById('followBtn');
const followersCount = document.getElementById('followersCount');
let isFollowing = false;

followBtn.addEventListener('click', () => {
    isFollowing = !isFollowing;
    
    if (isFollowing) {
        followBtn.textContent = 'Seguindo';
        followBtn.classList.add('following');
        followersCount.textContent = '895K'; // Simula aumento de seguidor
    } else {
        followBtn.textContent = 'Seguir';
        followBtn.classList.remove('following');
        followersCount.textContent = '894K';
    }
});

// Funções para abrir e fechar o Modal de Imagem
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');

function openModal(element) {
    const img = element.querySelector('img');
    modal.style.display = 'flex';
    modalImg.src = img.src;
}

function closeModal() {
    modal.style.display = 'none';
}

// Fechar modal ao clicar fora da imagem
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});