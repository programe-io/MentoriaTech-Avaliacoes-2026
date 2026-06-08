// ==========================================
// SELEÇÃO E MANIPULAÇÃO DA TAG OBRIGATÓRIA 'IMG'
// ==========================================

// 1. Captura a primeira tag <img> que encontrar no seu HTML
const minhaImagem = document.querySelector('img');

// 2. Exemplo de uso: Trocar a imagem e o texto descritivo dinamicamente
// (Isso simula o que acontece quando você clica para ver a próxima foto em uma galeria)
function mudarImagem() {
    minhaImagem.src = "https://images.unsplash.com/photo-1542831371-29b0f74f9713";
    minhaImagem.alt = "Tela de computador exibindo códigos de programação coloridos";
}

// Se o seu exercício exigir apenas a seleção, a linha 6 (const minhaImagem...) já resolve!