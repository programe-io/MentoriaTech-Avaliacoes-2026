// Seleciona os elementos do modal
const modal = document.getElementById('videoModal');
const modalIframe = document.getElementById('modalIframe');

// Função para abrir o modal com a URL do vídeo correspondente
function abrirModal(videoUrl) {
    modalIframe.src = videoUrl;
    modal.style.display = 'flex';
}

// Função para fechar o modal e pausar o vídeo
function fecharModal() {
    modal.style.display = 'none';
    modalIframe.src = ''; // Limpa o src para parar a reprodução
}

// Fecha o modal caso o usuário clique fora da área do vídeo
window.onclick = function(event) {
    if (event.target === modal) {
        fecharModal();
    }
}