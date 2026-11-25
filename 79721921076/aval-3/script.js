
document.querySelectorAll(".like").forEach(botao => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const contador = post.querySelector(".contador");

        let numero = Number(contador.textContent.replace(/\D/g, ""));

        if (botao.classList.contains("liked")) {
            botao.classList.remove("liked");
            botao.textContent = "♡";
            numero--;
        } else {
            botao.classList.add("liked");
            botao.textContent = "♥";
            numero++;
        }

        contador.textContent = numero.toLocaleString("pt-BR") + " curtidas";
    });
});

document.querySelectorAll(".post-info input").forEach(input => {
    input.addEventListener("keydown", evento => {
        if (evento.key === "Enter" && input.value.trim() !== "") {
            const post = input.closest(".post");
            const comentarios = post.querySelector(".comentario");

            const novo = document.createElement("p");
            novo.innerHTML = "<strong>samuel_fla</strong> " +
                document.createTextNode(input.value).textContent;

            post.querySelector(".post-info").insertBefore(novo, input);
            input.value = "";
        }
    });
});

document.querySelectorAll(".share").forEach(botao => {
    botao.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert("Link copiado!");
        } catch {
            alert("Copie o endereço do site para compartilhar.");
        }
    });
});
