
const botoesCurtir = document.querySelectorAll(".like");

botoesCurtir.forEach((botao) => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const contador = post.querySelector(".likes");

        let curtidas = Number(
            contador.textContent.match(/\d+/)[0]
        );

        if (botao.classList.contains("active")) {
            curtidas--;
            botao.classList.remove("active");
            botao.textContent = "♡";
        } else {
            curtidas++;
            botao.classList.add("active");
            botao.textContent = "♥";
        }

        contador.textContent = curtidas + " curtidas";
    });
});

// Publicar comentários
document.querySelectorAll(".comment-box").forEach((caixa) => {
    const input = caixa.querySelector("input");
    const botao = caixa.querySelector("button");

    botao.addEventListener("click", () => {
        const texto = input.value.trim();

        if (texto === "") {
            alert("Digite um comentário primeiro!");
            return;
        }

        const comentario = document.createElement("p");
        comentario.className = "new-comment";
        comentario.style.padding = "5px 12px";
        comentario.style.fontSize = "14px";
        comentario.textContent = "Você: " + texto;

        caixa.before(comentario);
        input.value = "";
    });

    input.addEventListener("keydown", (evento) => {
        if (evento.key === "Enter") {
            botao.click();
        }
    });
});

// Mensagem ao clicar em criar publicação
const links = document.querySelectorAll(".sidebar nav a");

links.forEach((link) => {
    if (link.textContent.includes("Criar publicação")) {
        link.addEventListener("click", (evento) => {
            evento.preventDefault();
            alert("Área de criação de publicação!");
        });
    }
});
