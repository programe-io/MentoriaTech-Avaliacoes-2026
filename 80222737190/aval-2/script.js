
function criarPost() {
    const usuario = document.getElementById("usuario").value.trim();
    const jogo = document.getElementById("jogo").value;
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!usuario || !jogo || !texto) {
        alert("Preencha seu nome, jogo e publicação!");
        return;
    }

    const feed = document.getElementById("feed");

    const post = document.createElement("div");
    post.className = "post";

    const titulo = document.createElement("h3");
    titulo.textContent = "🎮 " + usuario;

    const nomeJogo = document.createElement("p");
    nomeJogo.textContent = "🕹️ Jogando: " + jogo;

    const descricao = document.createElement("p");
    descricao.textContent = texto;

    post.appendChild(titulo);
    post.appendChild(nomeJogo);
    post.appendChild(descricao);

    if (imagem) {
        try {
            const url = new URL(imagem);
            if (url.protocol === "https:" || url.protocol === "http:") {
                const img = document.createElement("img");
                img.src = url.href;
                img.alt = "Imagem da publicação";
                post.appendChild(img);
            }
        } catch {
            alert("Digite um link de imagem válido!");
            return;
        }
    }

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const curtir = document.createElement("button");
    let curtidas = 0;

    curtir.textContent = "❤️ Curtir (0)";

    curtir.onclick = function() {
        curtidas++;
        curtir.textContent = "❤️ Curtir (" + curtidas + ")";
    };

    const campo = document.createElement("input");
    campo.placeholder = "Escreva um comentário...";

    const comentar = document.createElement("button");
    comentar.textContent = "💬 Comentar";

    const comentarios = document.createElement("div");

    comentar.onclick = function() {
        if (!campo.value.trim()) return;

        const novoComentario = document.createElement("p");
        novoComentario.className = "comentario";
        novoComentario.textContent = "💬 " + campo.value;

        comentarios.appendChild(novoComentario);
        campo.value = "";
    };

    acoes.appendChild(curtir);

    post.appendChild(acoes);
    post.appendChild(campo);
    post.appendChild(comentar);
    post.appendChild(comentarios);

    feed.insertBefore(post, feed.children[1]);

    document.getElementById("usuario").value = "";
    document.getElementById("jogo").value = "";
    document.getElementById("texto").value = "";
    document.getElementById("imagem").value = "";
}
