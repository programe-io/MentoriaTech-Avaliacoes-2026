
function curtir(botao) {
    let contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        contador.textContent = numero - 1;
        botao.classList.remove("curtido");
        botao.style.color = "white";
    } else {
        contador.textContent = numero + 1;
        botao.classList.add("curtido");
        botao.style.color = "#ff2d75";
    }
}

function comentar() {
    let comentario = prompt("Escreva seu comentário:");

    if (comentario && comentario.trim() !== "") {
        alert("Seu comentário foi publicado: " + comentario);
    }
}

function compartilhar() {
    alert("Você compartilhou esse vídeo! ❤️");
}

document.querySelector(".seguir").addEventListener("click", function() {
    if (this.textContent === "Seguir") {
        this.textContent = "Seguindo ✓";
        this.style.background = "#444";
    } else {
        this.textContent = "Seguir";
        this.style.background = "#ff2d75";
    }
});
