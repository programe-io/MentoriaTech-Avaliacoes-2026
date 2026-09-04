/* Lógica de Interatividade do Blog */

// Função para abrir o modal de detalhes do jogo
function openModal(title, description) {
    document.getElementById('modalTitle').innerText = title;
    document.getElementById('modalDesc').innerText = description;
    document.getElementById('gameModal').style.display = 'flex';
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

// Fechar modal ao clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Sistema de busca em tempo real
const searchInput = document.getElementById('searchInput');
const gameCards = document.querySelectorAll('.game-card');

searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();

    gameCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        if (title.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});