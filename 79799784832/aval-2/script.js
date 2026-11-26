
// BOTÃO SEGUIR

const botaoSeguir = document.getElementById("seguir");
const seguidores = document.getElementById("seguidores");

let seguindo = false;
let quantidade = 1250;

botaoSeguir.addEventListener("click", function() {

    seguindo = !seguindo;

    if (seguindo) {
        quantidade++;
        botaoSeguir.textContent = "Seguindo";
        botaoSeguir.style.background = "#efefef";
        botaoSeguir.style.color = "#262626";
    } else {
        quantidade--;
        botaoSeguir.textContent = "Seguir";
        botaoSeguir.style.background = "#0095f6";
        botaoSeguir.style.color = "white";
    }

    seguidores.textContent = quantidade.toLocaleString("pt-BR");
});

// CURTIR PUBLICAÇÕES

document.querySelectorAll(".post").forEach(post => {

    const botaoCurtir = post.querySelector(".curtir");
    const numeroCurtidas = post.querySelector(".curtidas span");

    let curtido = false;
    let quantidadeCurtidas = Number(numeroCurtidas.textContent);

    botaoCurtir.addEventListener("click", function() {

        curtido = !curtido;

        if (curtido) {
            quantidadeCurtidas++;
            botaoCurtir.textContent = "♥";
            botaoCurtir.classList.add("ativo");
        } else {
            quantidadeCurtidas--;
            botaoCurtir.textContent = "♡";
            botaoCurtir.classList.remove("ativo");
        }

        numeroCurtidas.textContent = quantidadeCurtidas;
    });

});

// COMENTÁRIOS

document.querySelectorAll(".form-comentario").forEach(form => {

    form.addEventListener("submit", function(event) {

        event.preventDefault();

        const campo = form.querySelector("input");
        const comentario = campo.value.trim();

        if (comentario === "") return;

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "Você: " + comentario;
        novoComentario.style.padding = "8px 12px";

        form.before(novoComentario);

        campo.value = "";

    });

});

// COMPARTILHAR

document.querySelectorAll(".compartilhar").forEach(botao => {

    botao.addEventListener("click", async function() {

        const link = window.location.href;

        try {
            await navigator.clipboard.writeText(link);
            alert("Link copiado para compartilhar!");
        } catch {
            alert("Não foi possível copiar o link.");
        }

    });

});
