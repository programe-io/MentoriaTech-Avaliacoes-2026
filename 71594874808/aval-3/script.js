// 1. Acessando e selecionando elementos do DOM
const titulo = document.getElementById('titulo-principal'); // Seleção por ID
const descricoes = document.querySelectorAll('.descricao'); // Seleção por Classe usando querySelector
const botao = document.querySelector('#botao-interagir');   // querySelector aceita seletores CSS (# para ID)

// 2. Criando uma função para alterar os elementos dinamicamente
function alterarConteudo() {
    // Acessando e modificando o texto com textContent
    titulo.textContent = "¡DOM Dominado com Sucesso!";
    
    // Modificando elementos selecionados por classe
    descricoes[0].textContent = "O conteúdo foi alterado dinamicamente via JavaScript.";
    
    // Adicionando uma nova classe CSS a um elemento
    descricoes[0].classList.add('destaque');
    
    // Desabilita o botão após o clique
    botao.textContent = "Conteúdo Atualizado";
    botao.disabled = true;
    botao.style.backgroundColor = "#757575";
}

// 3. Adicionando um ouvinte de evento para o clique do botão
botao.addEventListener('click', alterarConteudo);
