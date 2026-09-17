// ❄️ MINI FEED FROZEN - JAVASCRIPT
// Funciona com o HTML e CSS anteriores.

// Curtir
function curtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes");
    const deslike = post.querySelectorAll(".botoes button")[1];

    if (botao.classList.contains("ativo")) {
        botao.classList.remove("ativo");
        contador.textContent = Math.max(0, Number(contador.textContent) - 1);
    } else {
        botao.classList.add("ativo");
        contador.textContent = Number(contador.textContent) + 1;

        // Remove o deslike, caso esteja ativo
        if (deslike.classList.contains("ativo")) {
            deslike.classList.remove("ativo");
        }
    }
}

// Descurtir
function descurtir(botao) {
    const post = botao.closest(".post");
    const contador = post.querySelector(".likes");
    const curtirBotao = post.querySelectorAll(".botoes button")[0];

    if (botao.classList.contains("ativo")) {
        botao.classList.remove("ativo");
    } else {
        botao.classList.add("ativo");

        // Se estava curtido, remove a curtida
        if (curtirBotao.classList.contains("ativo")) {
            curtirBotao.classList.remove("ativo");
            contador.textContent = Math.max(
                0,
                Number(contador.textContent) - 1
            );
        }
    }
}

// Mostrar / esconder comentários
function mostrarComentarios(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    comentarios.classList.toggle("mostrar");

    if (comentarios.classList.contains("mostrar")) {
        botao.textContent = "❌ Fechar comentários";
    } else {
        botao.textContent = "💬 Comentários";
    }
}

// Adicionar comentário
function adicionarComentario(botao) {
    const comentarios = botao.closest(".comentarios");
    const input = comentarios.querySelector("input");
    const lista = comentarios.querySelector(".lista-comentarios");

    const texto = input.value.trim();

    if (texto === "") {
        alert("❄️ Digite um comentário antes de enviar!");
        input.focus();
        return;
    }

    const novoComentario = document.createElement("div");
    novoComentario.className = "comentario";

    const nome = document.createElement("strong");
    nome.textContent = "Você 💙";

    const mensagem = document.createElement("p");
    mensagem.textContent = texto;

    novoComentario.appendChild(nome);
    novoComentario.appendChild(mensagem);

    lista.appendChild(novoComentario);

    // Limpa o campo
    input.value = "";
    input.focus();
}

// Permitir enviar comentário apertando Enter
document.addEventListener("keydown", function(event) {

    if (event.key === "Enter" && event.target.matches(".campo-comentario input")) {

        event.preventDefault();

        const campo = event.target;
        const botao = campo.parentElement.querySelector("button");

        adicionarComentario(botao);
    }
});

// Pequeno efeito ao carregar a página
document.addEventListener("DOMContentLoaded", function() {

    const posts = document.querySelectorAll(".post");

    posts.forEach(function(post, index) {
        post.style.animationDelay = `${index * 0.15}s`;
        post.style.animation = "aparecerPost 0.6s ease forwards";
    });

});