
const feed = document.getElementById("feed");
const criacao = document.getElementById("criacao");

let publicacoes = [];

document.getElementById("abrirCriacao").onclick = () => {
    criacao.scrollIntoView({ behavior: "smooth" });
};

function publicar() {
    const legenda = document.getElementById("legenda");
    const foto = document.getElementById("foto");

    const texto = legenda.value.trim();
    const arquivo = foto.files[0];

    if (!texto && !arquivo) {
        alert("Escreva algo ou escolha uma foto!");
        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        texto,
        imagem: arquivo ? URL.createObjectURL(arquivo) : null,
        curtidas: 0,
        comentarios: [],
        curtido: false
    };

    publicacoes.unshift(novaPublicacao);

    legenda.value = "";
    foto.value = "";

    renderizar();
}

function renderizar() {
    feed.innerHTML = "<h2>Feed</h2>";

    publicacoes.forEach(post => {
        const elemento = document.createElement("article");
        elemento.className = "post";

        const titulo = document.createElement("h3");
        titulo.textContent = "EnoquePTCOM";

        const texto = document.createElement("p");
        texto.textContent = post.texto;

        elemento.appendChild(titulo);
        elemento.appendChild(texto);

        if (post.imagem) {
            const imagem = document.createElement("img");
            imagem.src = post.imagem;
            imagem.alt = "Imagem da publicação";
            elemento.appendChild(imagem);
        }

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = `${post.curtido ? "❤️" : "🤍"} Curtir (${post.curtidas})`;

        curtir.onclick = () => {
            post.curtido = !post.curtido;
            post.curtidas += post.curtido ? 1 : -1;
            renderizar();
        };

        const comentar = document.createElement("button");
        comentar.textContent = "💬 Comentar";

        comentar.onclick = () => {
            const comentario = prompt("Escreva seu comentário:");

            if (comentario && comentario.trim()) {
                post.comentarios.push(comentario.trim());
                renderizar();
            }
        };

        const compartilhar = document.createElement("button");
        compartilhar.textContent = "📤 Compartilhar";

        compartilhar.onclick = async () => {
            const conteudo = `EnoquePTCOM: ${post.texto}`;

            if (navigator.share) {
                try {
                    await navigator.share({ text: conteudo });
                } catch (erro) {
                    console.log("Compartilhamento cancelado.");
                }
            } else {
                await navigator.clipboard.writeText(conteudo);
                alert("Texto copiado!");
            }
        };

        acoes.append(curtir, comentar, compartilhar);
        elemento.appendChild(acoes);

        if (post.comentarios.length) {
            const lista = document.createElement("div");
            lista.className = "comentarios";

            post.comentarios.forEach(comentario => {
                const linha = document.createElement("p");
                linha.textContent = "💬 " + comentario;
                lista.appendChild(linha);
            });

            elemento.appendChild(lista);
        }

        feed.appendChild(elemento);
    });
}

function mostrarInicio() {
    renderizar();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function mostrarExplorar() {
    alert("Área Explorar do EnoquePTCOM!");
}

function mostrarNotificacoes() {
    alert("Você não tem novas notificações.");
}

function mostrarPerfil() {
    alert("Bem-vindo ao seu perfil EnoquePTCOM!");
}

function adicionarStory() {
    alert("Funcionalidade de Stories selecionada!");
}

document.getElementById("pesquisa").addEventListener("input", function() {
    const termo = this.value.toLowerCase();

    document.querySelectorAll(".post").forEach(post => {
        post.style.display =
            post.textContent.toLowerCase().includes(termo)
            ? "block"
            : "none";
    });
});

renderizar();
