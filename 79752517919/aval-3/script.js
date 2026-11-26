
let publicacoes = [
    {
        usuario: "mariana",
        avatar: "https://i.pravatar.cc/100?img=32",
        imagem: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800",
        legenda: "Um dia incrível! ❤️☀️",
        curtidas: 125,
        curtido: false,
        comentarios: []
    },
    {
        usuario: "pedro",
        avatar: "https://i.pravatar.cc/100?img=11",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
        legenda: "A vida é feita de momentos! 🌎",
        curtidas: 89,
        curtido: false,
        comentarios: []
    },
    {
        usuario: "carolina",
        avatar: "https://i.pravatar.cc/100?img=45",
        imagem: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
        legenda: "Flores para alegrar o dia! 🌸",
        curtidas: 210,
        curtido: false,
        comentarios: []
    }
];

const feed = document.getElementById("feed");

function mostrarPublicacoes() {
    feed.innerHTML = "";

    publicacoes.forEach((post, index) => {

        const artigo = document.createElement("article");
        artigo.className = "post";

        const cabecalho = document.createElement("div");
        cabecalho.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = post.avatar;
        avatar.alt = "Foto de perfil de " + post.usuario;

        const nome = document.createElement("strong");
        nome.textContent = post.usuario;

        const opcoes = document.createElement("span");
        opcoes.textContent = "•••";

        cabecalho.append(avatar, nome, opcoes);

        const imagem = document.createElement("img");
        imagem.className = "post-image";
        imagem.src = post.imagem;
        imagem.alt = "Publicação de " + post.usuario;

        const acoes = document.createElement("div");
        acoes.className = "post-actions";

        const curtir = document.createElement("button");
        curtir.className = "like-button" +
            (post.curtido ? " liked" : "");

        curtir.textContent = post.curtido ? "❤️" : "🤍";

        curtir.onclick = () => {
            post.curtido = !post.curtido;
            post.curtidas += post.curtido ? 1 : -1;
            mostrarPublicacoes();
        };

        const comentar = document.createElement("button");
        comentar.textContent = "💬";

        const compartilhar = document.createElement("button");
        compartilhar.textContent = "📤";

        acoes.append(curtir, comentar, compartilhar);

        const informacoes = document.createElement("div");
        informacoes.className = "post-info";

        const quantidade = document.createElement("strong");
        quantidade.textContent = post.curtidas + " curtidas";

        const legenda = document.createElement("p");
        legenda.textContent = post.usuario + " " + post.legenda;

        informacoes.append(quantidade, legenda);

        const comentarios = document.createElement("div");
        comentarios.className = "post-info";

        post.comentarios.forEach(texto => {
            const p = document.createElement("p");
            p.textContent = texto;
            comentarios.appendChild(p);
        });

        const areaComentario = document.createElement("div");
        areaComentario.className = "comment-area";

        const input = document.createElement("input");
        input.placeholder = "Adicione um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Publicar";

        const adicionarComentario = () => {
            if (input.value.trim()) {
                post.comentarios.push(
                    "meu_usuario: " + input.value.trim()
                );
                mostrarPublicacoes();
            }
        };

        enviar.onclick = adicionarComentario;

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                adicionarComentario();
            }
        });

        comentar.onclick = () => input.focus();

        areaComentario.append(input, enviar);

        artigo.append(
            cabecalho,
            imagem,
            acoes,
            informacoes,
            comentarios,
            areaComentario
        );

        feed.appendChild(artigo);
    });
}

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function publicar() {
    const legenda = document.getElementById("legenda").value.trim();
    const foto = document.getElementById("foto").value.trim();

    if (!legenda || !foto) {
        alert("Adicione uma foto e uma legenda!");
        return;
    }

    try {
        const url = new URL(foto);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        publicacoes.unshift({
            usuario: "meu_usuario",
            avatar: "https://i.pravatar.cc/100?img=12",
            imagem: url.href,
            legenda: legenda,
            curtidas: 0,
            curtido: false,
            comentarios: []
        });

        document.getElementById("legenda").value = "";
        document.getElementById("foto").value = "";

        fecharModal();
        mostrarPublicacoes();

    } catch {
        alert("Digite um endereço de imagem válido!");
    }
}

function seguir(botao) {
    if (botao.textContent === "Seguir") {
        botao.textContent = "Seguindo";
    } else {
        botao.textContent = "Seguir";
    }
}

mostrarPublicacoes();
