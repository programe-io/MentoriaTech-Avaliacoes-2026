
function curtir(botao) {
    const post = botao.closest(".post");
    const curtidas = post.querySelector(".likes");

    let quantidade = parseInt(
        curtidas.dataset.quantidade || "1250"
    );

    if (botao.classList.contains("ativo")) {
        quantidade--;
        botao.classList.remove("ativo");
        botao.textContent = "♡";
    } else {
        quantidade++;
        botao.classList.add("ativo");
        botao.textContent = "♥";
    }

    curtidas.dataset.quantidade = quantidade;
    curtidas.textContent = quantidade.toLocaleString("pt-BR") + " curtidas";
}

function comentar(botao) {
    const post = botao.closest(".post");
    post.querySelector("input").focus();
}

function enviarComentario(event, input) {
    if (event.key === "Enter" && input.value.trim() !== "") {
        const post = input.closest(".post");

        const novoComentario = document.createElement("p");
        novoComentario.innerHTML =
            "<strong>Você</strong> " + input.value;

        post.querySelector(".post-content").insertBefore(
            novoComentario,
            input
        );

        input.value = "";
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "InstaClone",
            text: "Confira esta publicação!"
        });
    } else {
        alert("Compartilhamento não disponível neste navegador.");
    }
}

function salvar(botao) {
    botao.classList.toggle("ativo");

    if (botao.classList.contains("ativo")) {
        botao.textContent = "🔖";
        alert("Publicação salva!");
    } else {
        botao.textContent = "♧";
        alert("Publicação removida dos salvos!");
    }
}
