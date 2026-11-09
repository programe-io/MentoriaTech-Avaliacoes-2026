// 1. Buscamos os elementos do HTML que queremos controlar
const elementoTitulo = document.getElementById("titulo");
const botaoMudar = document.getElementById("btn-mudar");

// 2. Criamos uma função que diz o que deve acontecer
function alterarConteudo() {
    elementoTitulo.textContent = "Texto alterado pelo JavaScript externo!";
    elementoTitulo.style.color = "red"; // Também podemos mudar o estilo por aqui
\}

// 3. Dizemos ao botão para escutar o clique do usuário e rodar a função
botaoMudar.addEventListener("click", alterarConteudo);$0