
/* FUNÇÃO DO BOTÃO */
function mostrarMensagem() {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = "Parabéns! Seu site está funcionando! 🚀";
}

/* MENSAGEM DE BOAS-VINDAS */
window.addEventListener("load", function() {
    console.log("Site carregado com sucesso!");
});

/* EFEITO NO MENU */
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {
    link.addEventListener("click", function() {
        console.log("Você clicou em: " + link.textContent);
    });
});

/* ALTERAR A COR DO FUNDO */
function mudarCor() {
    document.body.style.backgroundColor = "#dbeafe";
}

/* MOSTRAR DATA E HORA */
function mostrarData() {
    const agora = new Date();

    alert("Data e hora: " + agora.toLocaleString("pt-BR"));
}
