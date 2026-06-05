// Mensagem que aparece no console do navegador (F12)
console.log("Blog do Victor Felipe carregado com sucesso!");

// --- INTERATIVIDADE DOS JOGOS ---
const cardsDosJogos = document.querySelectorAll('.game-card');

cardsDosJogos.forEach(card => {
    card.addEventListener('click', () => {
        const nomeDoJogo
