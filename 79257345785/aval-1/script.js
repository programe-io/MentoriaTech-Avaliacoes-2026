// 1. SELEÇÃO DE ELEMENTOS (Pega os componentes do HTML para poder mexer neles)
const botao = document.querySelector('.botao-principal');
const texto = document.querySelector('p');
const titulo = document.querySelector('h1');

// 2. FUNÇÃO DE AÇÃO (O que vai acontecer quando o botão for clicado)
function reagirAoClique() {
    // Altera o texto do parágrafo
    texto.textContent = "O código JavaScript funcionou com sucesso! 🎉";
    
    // Altera temporariamente o título e a cor dele
    titulo.textContent = "Parabéns!";
    titulo.style.color = "#2ecc71"; // Muda para verde
    
    // Desativa o botão após o clique para evitar cliques repetidos (opcional)
    botao.textContent = "Concluído!";
    botao.style.backgroundColor = "#2ecc71";
    botao.disabled = true;

    // Exibe um alerta no navegador
    console.log("O usuário clicou no botão e o JS foi executado.");
}

// 3. OUVINTE DE EVENTOS (Fica esperando o usuário clicar no botão)
botao.addEventListener('click', reagirAoClique);
