
// Curtidas
document.querySelectorAll(".like").forEach(botao => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const contador = post.querySelector(".likes");

        let curtidas = Number(contador.dataset.count || 120);

        if (botao.classList.contains("curtido")) {
            curtidas--;
            botao.classList.remove("curtido");
            botao.innerHTML = "♡ Curtir";
        } else {
            curtidas++;
            botao.classList.add("curtido");
            botao.innerHTML = "♥ Curtido";
        }

        contador.dataset.count = curtidas;
        contador.textContent = curtidas + " curtidas";
    });
});

// Seguir pessoas
document.querySelectorAll(".follow").forEach(botao => {
    botao.addEventListener("click", () => {
        if (botao.textContent === "Seguir") {
            botao.textContent = "Seguindo";
            botao.style.background = "#16a34a";
        } else {
            botao.textContent = "Seguir";
            botao.style.background = "#1877f2";
        }
    });
});

// Comentários
document.querySelectorAll(".comment").forEach(botao => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const campo = post.querySelector(".comment-input");
        campo.focus();
    });
});

document.querySelectorAll(".comment-input").forEach(campo => {
    campo.addEventListener("keydown", evento => {
        if (evento.key === "Enter" && campo.value.trim() !== "") {
            const comentario = document.createElement("p");
            comentario.textContent = "Você: " + campo.value;

            campo.before(comentario);
            campo.value = "";
        }
    });
});

// Compartilhar
document.querySelectorAll(".share").forEach(botao => {
    botao.addEventListener("click", async () => {
        const dados = {
            title: "PhotoWave",
            text: "Confira esta publicação no PhotoWave!"
        };

        if (navigator.share) {
            await navigator.share(dados);
        } else {
            alert("Compartilhamento não disponível neste navegador.");
        }
    });
});

// Pesquisa
document.getElementById("pesquisa").addEventListener("input", evento => {
    const busca = evento.target.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        const texto = post.textContent.toLowerCase();
        post.style.display = texto.includes(busca) ? "block" : "none";
    });
});
