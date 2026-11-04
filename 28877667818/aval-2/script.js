
function publicar() {
    const nome = document.getElementById("nome").value.trim();
    const texto = document.getElementById("texto").value.trim();

    if (nome === "" || texto === "") {
        alert("Preencha seu nome e sua publicação!");
        return;
    }

    const publicacoes = document.getElementById("publicacoes");

    const post = document.createElement("div");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = nome;

    const data = document.createElement("p");
    data.className = "data";
    data.textContent = new Date().toLocaleDateString("pt-BR");

    const conteudo = document.createElement("p");
    conteudo.textContent = texto;

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtirBtn = document.createElement("button");
    curtirBtn.innerHTML = '❤️ Curtir <span>0</span>';
    curtirBtn.onclick = function() {
        curtir(this);
    };

    const comentarBtn = document.createElement("button");
    comentarBtn.textContent = "💬 Comentar";
    comentarBtn.onclick = function() {
        comentar(this);
    };

    const comentarios = document.createElement("div");
    comentarios.className = "comentarios";

    acoes.appendChild(curtirBtn);
    acoes.appendChild(comentarBtn);

    post.appendChild(titulo);
    post.appendChild(data);
    post.appendChild(conteudo);
    post.appendChild(acoes);
    post.appendChild(comentarios);

    publicacoes.prepend(post);

    document.getElementById("nome").value = "";
    document.getElementById("texto").value = "";

    alert("Publicação realizada com sucesso!");
}

function curtir(botao) {
    const numero = botao.querySelector("span");
    let curtidas = Number(numero.textContent);

    if (botao.dataset.curtido === "true") {
        curtidas--;
        botao.dataset.curtido = "false";
        botao.style.background = "#1877f2";
    } else {
        curtidas++;
        botao.dataset.curtido = "true";
        botao.style.background = "#e84360";
    }

    numero.textContent = curtidas;
}

function comentar(botao) {
    const post = botao.closest(".post");
    const comentarios = post.querySelector(".comentarios");

    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const novoComentario = document.createElement("div");
        novoComentario.className = "comentario";
        novoComentario.textContent = texto;

        comentarios.appendChild(novoComentario);
    }
}
