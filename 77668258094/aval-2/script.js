
// Mensagem de boas-vindas
window.addEventListener("load", function() {
    console.log("Bem-vindo ao Meu Blog!");
});

// Botão de boas-vindas
function boasVindas() {
    alert("Seja bem-vindo ao Meu Blog!");
}

// Alterar tema da página
function alterarTema() {
    document.body.classList.toggle("tema-escuro");

    const botao = document.getElementById("tema");

    if (document.body.classList.contains("tema-escuro")) {
        botao.textContent = "Tema Claro";
    } else {
        botao.textContent = "Tema Escuro";
    }
}

// Mostrar e ocultar posts
function mostrarPost(botao) {
    const conteudo = botao.previousElementSibling;

    if (conteudo.classList.contains("oculto")) {
        conteudo.classList.remove("oculto");
        botao.textContent = "Mostrar menos";
    } else {
        conteudo.classList.add("oculto");
        botao.textContent = "Leia mais";
    }
}
