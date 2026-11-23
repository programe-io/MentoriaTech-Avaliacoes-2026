
// Curtir e descurtir publicações
const botoesCurtir = document.querySelectorAll(".curtir");

botoesCurtir.forEach(botao => {
    botao.addEventListener("click", () => {
        botao.classList.toggle("ativo");

        if (botao.classList.contains("ativo")) {
            botao.innerHTML = "♥ Curtido";
        } else {
            botao.innerHTML = "♡ Curtir";
        }
    });
});

// Adicionar comentários
const botoesPublicar = document.querySelectorAll(".enviar-comentario");

botoesPublicar.forEach(botao => {
    botao.addEventListener("click", () => {
        const post = botao.closest(".post");
        const campo = post.querySelector(".campo-comentario");
        const areaComentarios = post.querySelector(".comentarios");

        if (campo.value.trim() !== "") {
            const comentario = document.createElement("p");
            comentario.innerHTML = `<strong>Kayllow:</strong> ${campo.value}`;

            areaComentarios.appendChild(comentario);
            campo.value = "";
        }
    });
});

// Pesquisa de publicações
const pesquisa = document.querySelector("#pesquisa");

pesquisa.addEventListener("input", () => {
    const texto = pesquisa.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display = post.innerText.toLowerCase().includes(texto)
            ? "block"
            : "none";
    });
});

// Abrir stories
document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", () => {
        alert("Você abriu o story de " + story.querySelector("p").innerText);
    });
});
