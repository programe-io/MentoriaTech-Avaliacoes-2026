
function curtir(botao) {
    let numero = botao.querySelector("span");

    let curtidas = Number(numero.textContent);

    if (botao.dataset.curtido === "sim") {
        curtidas--;
        botao.dataset.curtido = "nao";
    } else {
        curtidas++;
        botao.dataset.curtido = "sim";
    }

    numero.textContent = curtidas;
}

function comentar(botao) {
    let texto = prompt("Digite seu comentário:");

    if (texto && texto.trim()) {
        let area = botao.parentElement.querySelector(".comentarios");

        let comentario = document.createElement("p");
        comentario.textContent = "💬 " + texto;

        area.appendChild(comentario);
    }
}

function publicar() {
    let nome = document.getElementById("nome").value;
    let foto = document.getElementById("foto").value;
    let legenda = document.getElementById("legenda").value;

    if (!nome.trim() || !foto.trim()) {
        alert("Digite seu nome e o link da foto!");
        return;
    }

    try {
        const url = new URL(foto);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        let post = document.createElement("article");
        post.className = "post";

        let titulo = document.createElement("h3");
        titulo.textContent = nome;

        let imagem = document.createElement("img");
        imagem.src = url.href;
        imagem.alt = "Foto publicada";
        imagem.onerror = () => imagem.remove();

        let descricao = document.createElement("p");
        descricao.textContent = legenda;

        let curtirBotao = document.createElement("button");
        curtirBotao.textContent = "❤️ Curtir ";

        let contador = document.createElement("span");
        contador.textContent = "0";
        curtirBotao.appendChild(contador);
        curtirBotao.onclick = () => curtir(curtirBotao);

        let comentarBotao = document.createElement("button");
        comentarBotao.textContent = "💬 Comentar";
        comentarBotao.onclick = () => comentar(comentarBotao);

        let comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.append(
            titulo,
            imagem,
            descricao,
            curtirBotao,
            comentarBotao,
            comentarios
        );

        document.getElementById("feed").prepend(post);

        document.getElementById("nome").value = "";
        document.getElementById("foto").value = "";
        document.getElementById("legenda").value = "";

    } catch {
        alert("Digite um link de imagem válido!");
    }
}
