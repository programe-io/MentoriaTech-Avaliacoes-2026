// Funções para gerenciar o Modal de Análise Completa
function openModal(title, description) {
    const modal = document.getElementById('gameModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');

    modalTitle.innerText = title;
    modalDescription.innerText = description;
    
    modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    modal.style.display = 'none';
}

// Fechar o modal ao clicar fora da caixa de conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('gameModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}