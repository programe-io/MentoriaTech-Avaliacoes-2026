
// Mensagem do botão Saiba Mais
function mostrarMensagem() {
    alert("Seja bem-vindo ao Meu Blog! Explore nossos conteúdos.");
}

// Mensagem dos artigos
function lerArtigo(artigo) {
    alert("Você selecionou o artigo: " + artigo);
}

// Enviar mensagem
function enviarMensagem() {

    let nome = document.getElementById("nome").value;
    let mensagem = document.getElementById("mensagem").value;

    if (nome === "" || mensagem === "") {
        alert("Por favor, preencha todos os campos!");
    } else {
        alert("Obrigado pela mensagem, " + nome + "!");
        
        document.getElementById("nome").value = "";
        document.getElementById("mensagem").value = "";
    }
}
