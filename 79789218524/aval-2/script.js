
function seguir() {
    const botao = document.querySelector(".informacoes button");

    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
        alert("Você começou a seguir denilson_086!");
    } else {
        botao.textContent = "Seguir";
        alert("Você deixou de seguir denilson_086.");
    }
}

function curtir(botao) {
    const post = botao.closest(".post");
    const quantidade = post.querySelector(".curtidas span");

    let numero = Number(quantidade.textContent);

    if (botao.classList.contains("curtido")) {
        numero--;
        botao.classList.remove("curtido");
        botao.textContent = "♡ Curtir";
    } else {
        numero++;
        botao.classList.add("curtido");
        botao.textContent = "❤️ Curtido";
    }

    quantidade.textContent = numero;
}

function comentar() {
    const post = event.currentTarget.closest(".post");
    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
        const comentarios = post.querySelector(".comentarios");

        const novoComentario = document.createElement("p");
        novoComentario.textContent = "💬 " + texto;

        comentarios.appendChild(novoComentario);
    }
}

function compartilhar() {
    alert("Publicação compartilhada com sucesso!");
}

function publicar() {
    const legenda = document.getElementById("legenda").value;
    const imagem = document.getElementById("imagem").value;

    if (legenda.trim() === "" || imagem.trim() === "") {
        alert("Adicione uma legenda e o link da imagem!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        const novaPostagem = document.createElement("div");
        novaPostagem.className = "post";

        const topo = document.createElement("div");
        topo.className = "post-topo";

        const usuario = document.createElement("strong");
        usuario.textContent = "denilson_086";

        topo.appendChild(usuario);

        const foto = document.createElement("img");
        foto.src = url.href;
        foto.alt = "Nova publicação";

        foto.onerror = function() {
            alert("Não foi possível carregar essa imagem.");
            novaPostagem.remove();
        };

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.innerHTML = `
            <button onclick="curtir(this)">♡ Curtir</button>
            <button onclick="comentar()">💬 Comentar</button>
            <button onclick="compartilhar()">↗ Compartilhar</button>
        `;

        const curtidas = document.createElement("p");
        curtidas.className = "curtidas";
        curtidas.innerHTML = "❤️ <span>0</span> curtidas";

        const descricao = document.createElement("p");
        descricao.textContent = "denilson_086 " + legenda;

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        novaPostagem.append(
            topo, foto, acoes, curtidas, descricao, comentarios
        );

        const publicacoes = document.querySelector(".publicacoes");
        publicacoes.insertBefore(
            novaPostagem,
            publicacoes.children[1]
        );

        document.getElementById("legenda").value = "";
        document.getElementById("imagem").value = "";

        const contador = document.getElementById("quantidadePosts");
        contador.textContent = Number(contador.textContent) + 1;

        alert("Publicação criada com sucesso!");

    } catch (erro) {
        alert("Digite um link válido de imagem!");
    }
}
