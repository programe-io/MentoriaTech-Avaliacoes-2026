// Lista de curiosidades para exibir
const curiosidades = [
    "Um dia em Vênus é mais longo do que um ano inteiro em Vênus.",
    "A pegada dos astronautas na Lua pode durar milhões de anos porque não há vento por lá.",
    "O Sol representa 99,86% de toda a massa do Sistema Solar.",
    "Existe um planeta feito de diamante (55 Cancri e) duas vezes maior que a Terra.",
    "Se duas peças de metal se tocarem no espaço, elas se fundem permanentemente (soldagem a frio)."
];

// Selecionando os elementos HTML
const botao = document.getElementById('btn-curiosidade');
const textoCuriosidade = document.getElementById('texto-curiosidade');

// Função para mudar a curiosidade
botao.addEventListener('click', () => {
    // Sorteia um índice da lista
    const indiceAleatorio = Math.floor(Math.random() * curiosidades.length);
    
    // Insere o texto no parágrafo
    textoCuriosidade.textContent = curiosidades[indiceAleatorio];
});
