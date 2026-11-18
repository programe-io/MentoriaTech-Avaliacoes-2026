
const botaoSeguir = document.getElementById("seguir");
const seguidores = document.getElementById("seguidores");

let seguindo = false;

botaoSeguir.addEventListener("click", () => {
    seguindo = !seguindo;

    botaoSeguir.textContent = seguindo ? "✓ Seguindo" : "+ Seguir";
    botaoSeguir.style.background = seguindo ? "#444" : "#ff0050";

    seguidores.textContent = seguindo ? "1.201" : "1.2K";
});

// Curtir publicações
document.querySelectorAll(".curtir").forEach(botao => {
    botao.addEventListener("click", () => {
        const numero = botao.querySelector("span");
        let curtidas = Number(numero.textContent);

        if (botao.classList.contains("liked")) {
            curtidas--;
            botao.classList.remove("liked");
            botao.firstChild.textContent = "♡ ";
        } else {
            curtidas++;
            botao.classList.add("liked");
            botao.firstChild.textContent = "♥ ";
        }

        numero.textContent = curtidas;
    });
});

// Comentar
document.querySelectorAll(".comentar").forEach(botao => {
    botao.addEventListener("click", () => {
        const comentario = prompt("Digite seu comentário:");

        if (comentario && comentario.trim() !== "") {
            alert("Comentário enviado: " + comentario);
        }
    });
});

// Filtrar publicações
document.querySelectorAll(".aba").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelectorAll(".aba").forEach(aba => {
            aba.classList.remove("ativa");
        });

        botao.classList.add("ativa");

        const filtro = botao.dataset.filtro;

        document.querySelectorAll(".post").forEach(post => {
            if (filtro === "todos" ||
                post.dataset.categoria === filtro) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    });
});
