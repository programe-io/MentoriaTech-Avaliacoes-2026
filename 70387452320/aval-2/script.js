
function curtir(botao) {
    let contador = botao.querySelector("span");
    let numero = Number(contador.textContent);

    if (botao.classList.contains("curtido")) {
        contador.textContent = numero - 1;
        botao.classList.remove("curtido");
        botao.style.background = "#d63384";
    } else {
        contador.textContent = numero + 1;
        botao.classList.add("curtido");
        botao.style.background = "#8e44ad";
    }
}

function comentar(botao) {
    let comentarios = botao.parentElement.querySelector(".comentarios");

    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        let novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + texto;

        comentarios.appendChild(novoComentario);
    }
}

function compartilhar() {
    if (navigator.share) {
        navigator.share({
            title: "K-POP WORLD",
            text: "Confira este feed incrível de K-POP!"
        });
    } else {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copiado!");
    }
}

function publicarPost() {
    let nome = document.getElementById("nome").value.trim();
    let mensagem = document.getElementById("mensagem").value.trim();

    if (nome === "" || mensagem === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    let post = document.createElement("article");
    post.className = "post";

    let titulo = document.createElement("h3");
    titulo.textContent = "🌸 " + nome;

    let texto = document.createElement("p");
    texto.textContent = mensagem;

    let curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    let comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    let compartilharBtn = document.createElement("button");
    compartilharBtn.textContent = "🔗 Compartilhar";
    compartilharBtn.onclick = compartilhar;

    let comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    post.append(
        titulo,
        texto,
        curtirBtn,
        comentarBtn,
        compartilharBtn,
        comentarios
    );

    document.getElementById("posts").prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("mensagem").value = "";

    alert("Publicação criada com sucesso! 💗");
}
