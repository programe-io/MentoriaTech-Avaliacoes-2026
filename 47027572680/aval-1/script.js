// =========================
// BOTÃO "LER MAIS"
// =========================

function lerPost(botao) {
    const post = botao.parentElement;

    const mensagem = document.createElement("p");

    mensagem.classList.add("mensagem-post");

    mensagem.textContent =
        "Obrigado por ler este conteúdo! Em uma versão futura, este botão poderá abrir o artigo completo.";

    // Evita criar várias mensagens
    if (!post.querySelector(".mensagem-post")) {
        post.appendChild(mensagem);
    } else {
        const mensagemExistente = post.querySelector(".mensagem-post");
        mensagemExistente.remove();
    }
}


// =========================
// FORMULÁRIO DE CONTATO
// =========================

const formulario = document.getElementById("formContato");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;

    alert(
        "Obrigado, " + nome + "! Sua mensagem foi enviada com sucesso."
    );

    formulario.reset();
});


// =========================
// EFEITO NO MENU
// =========================

const linksMenu = document.querySelectorAll("nav a");

linksMenu.forEach(function(link) {

    link.addEventListener("click", function() {

        linksMenu.forEach(function(item) {
            item.style.textDecoration = "none";
        });

        this.style.textDecoration = "underline";
    });

});
