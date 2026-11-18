
// Curtir publicações
document.querySelectorAll(".curtir").forEach(botao => {
    botao.addEventListener("click", () => {
        const publicacao = botao.closest(".publicacao");
        const likes = publicacao.querySelector(".likes");

        let quantidade = Number(likes.textContent.match(/\d+/)[0]);

        if (botao.classList.contains("ativo")) {
            quantidade--;
            botao.classList.remove("ativo");
            botao.textContent = "♡ Curtir";
        } else {
            quantidade++;
            botao.classList.add("ativo");
            botao.textContent = "♥ Curtido";
        }

        likes.textContent = quantidade + " curtidas";
    });
});

// Adicionar comentários
document.querySelectorAll(".form-comentario").forEach(formulario => {
    formulario.addEventListener("submit", evento => {
        evento.preventDefault();

        const campo = formulario.querySelector("input");
        const texto = campo.value.trim();

        if (texto === "") {
            alert("Digite um comentário!");
            return;
        }

        const comentarios = formulario.parentElement.querySelector(".comentarios");
        const novoComentario = document.createElement("p");

        const nome = document.createElement("strong");
        nome.textContent = "Luiz ";

        novoComentario.appendChild(nome);
        novoComentario.appendChild(document.createTextNode(texto));

        comentarios.appendChild(novoComentario);
        campo.value = "";
    });
});

// Seguir e deixar de seguir
document.querySelectorAll(".seguir").forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
        } else {
            botao.textContent = "Seguir";
        }
    });
});

// Pesquisa de usuários
document.getElementById("pesquisa").addEventListener("input", evento => {
    const pesquisa = evento.target.value.toLowerCase();

    document.querySelectorAll(".publicacao").forEach(publicacao => {
        const nome = publicacao.querySelector(".usuario strong").textContent.toLowerCase();

        publicacao.style.display = nome.includes(pesquisa) ? "block" : "none";
    });
});

// Botão comentar
document.querySelectorAll(".comentar").forEach(botao => {
    botao.addEventListener("click", () => {
        const formulario = botao.closest(".publicacao").querySelector(".form-comentario");
        formulario.querySelector("input").focus();
    });
});

// Compartilhar publicação
document.querySelectorAll(".compartilhar").forEach(botao => {
    botao.addEventListener("click", async () => {
        const texto = "Confira esta publicação no Instagram de Luiz!";

        if (navigator.share) {
            try {
                await navigator.share({ text: texto });
            } catch (erro) {
                // O compartilhamento foi cancelado.
            }
        } else {
            alert(texto);
        }
    });
});
