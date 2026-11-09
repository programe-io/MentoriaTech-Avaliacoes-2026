// Exibe uma mensagem de boas-vindas no console quando a página carrega
console.log("Trabalho carregado com sucesso!");

// Função simples para alternar o modo escuro (Dark Mode) caso você queira colocar um botão na página
function alternarModoEscuro() {
    document.body.style.backgroundColor = document.body.style.backgroundColor === "rgb(34, 34, 34)" ? "#f4f4f4" : "#222";
        document.body.style.color = document.body.style.color === "rgb(255, 255, 255)" ? "#333" : "#fff";
        }