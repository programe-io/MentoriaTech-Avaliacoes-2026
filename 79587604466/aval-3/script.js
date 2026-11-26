
let posts = [
    {
        id: 1,
        usuario: "mariana",
        avatar: "https://i.pravatar.cc/100?img=5",
        imagem: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900",
        legenda: "Um dia maravilhoso! ❤️",
        curtidas: 125,
        comentarios: []
    },
    {
        id: 2,
        usuario: "pedro",
        avatar: "https://i.pravatar.cc/100?img=8",
        imagem: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900",
        legenda: "Aproveitando a natureza! 🌿",
        curtidas: 89,
        comentarios: []
    },
    {
        id: 3,
        usuario: "ana",
        avatar: "https://i.pravatar.cc/100?img=9",
        imagem: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=900",
        legenda: "Flores para deixar o dia mais bonito! 🌸",
        curtidas: 210,
        comentarios: []
    }
];

const publicacoes = document.getElementById("publicacoes");

let curtidasUsuario = new Set();

function renderizarPosts() {

    publicacoes.innerHTML = "";

    posts.forEach(post => {

        const card = document.createElement("article");
        card.className = "post";

        const topo = document.createElement("div");
        topo.className = "post-topo";

        const avatar = document.createElement("img");
        avatar.src = post.avatar;

        const usuario = document.createElement("strong");
        usuario.textContent = post.usuario;

        topo.append(avatar, usuario);

        const imagem = document.createElement("img");
        imagem.className = "post-imagem";
        imagem.src = post.imagem;
        imagem.alt = "Publicação de " + post.usuario;

        const acoes = document.createElement("div");
        acoes.className = "post-acoes";

        const curtir = document.createElement("button");
        const jaCurtiu = curtidasUsuario.has(post.id);

        curtir.textContent = jaCurtiu ? "❤️" : "🤍";

        curtir.addEventListener("click", () => {

            if (curtidasUsuario.has(post.id)) {
                curtidasUsuario.delete(post.id);
                post.curtidas--;
            } else {
                curtidasUsuario.add(post.id);
                post.curtidas++;
            }

            renderizarPosts();
        });

        const comentar = document.createElement("button");
        comentar.textContent = "💬";

        comentar.addEventListener("click", () => {
            campoComentario.focus();
        });

        const compartilhar = document.createElement("button");
        compartilhar.textContent = "📤";

        compartilhar.addEventListener("click", () => {
            if (navigator.share) {
                navigator.share({
                    title: "Publicação de " + post.usuario,
                    text: post.legenda,
                    url: location.href
                }).catch(() => {});
            } else {
                alert("Compartilhamento não disponível neste navegador.");
            }
        });

        acoes.append(curtir, comentar, compartilhar);

        const info = document.createElement("div");
        info.className = "post-info";

        const totalCurtidas = document.createElement("strong");
        totalCurtidas.textContent = post.curtidas + " curtidas";

        const legenda = document.createElement("p");
        legenda.textContent = post.usuario + " " + post.legenda;

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        const campoComentario = document.createElement("input");
        campoComentario.placeholder = "Adicione um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Publicar";

        enviar.addEventListener("click", () => {

            const texto = campoComentario.value.trim();

            if (!texto) return;

            post.comentarios.push(texto);

            renderizarPosts();
        });

        const listaComentarios = document.createElement("div");

        post.comentarios.forEach(texto => {
            const p = document.createElement("p");
            p.textContent = "👤 " + texto;
            listaComentarios.appendChild(p);
        });

        comentarios.append(
            campoComentario,
            enviar,
            listaComentarios
        );

        info.append(totalCurtidas, legenda, comentarios);

        card.append(topo, imagem, acoes, info);

        publicacoes.appendChild(card);
    });
}

// ABRIR E FECHAR MODAL

function abrirModal() {
    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// CRIAR PUBLICAÇÃO

function criarPublicacao() {

    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!imagem) {
        alert("Informe o link da imagem!");
        return;
    }

    try {
        const url = new URL(imagem);

        if (!["http:", "https:"].includes(url.protocol)) {
            throw new Error("URL inválida");
        }

        posts.unshift({
            id: Date.now(),
            usuario: "meu_usuario",
            avatar: "https://i.pravatar.cc/100?img=12",
            imagem: url.href,
            legenda: legenda,
            curtidas: 0,
            comentarios: []
        });

        document.getElementById("imagem").value = "";
        document.getElementById("legenda").value = "";

        fecharModal();
        renderizarPosts();

    } catch {
        alert("Informe um endereço de imagem válido!");
    }
}

// NAVEGAÇÃO

function mostrarFeed() {
    document.getElementById("feed").hidden = false;
    document.getElementById("explorar").hidden = true;
    document.getElementById("perfil").hidden = true;
}

function mostrarExplorar() {
    document.getElementById("feed").hidden = true;
    document.getElementById("explorar").hidden = false;
    document.getElementById("perfil").hidden = true;

    const grade = document.getElementById("gradeExplorar");
    grade.innerHTML = "";

    posts.forEach(post => {
        const img = document.createElement("img");
        img.src = post.imagem;
        img.alt = "Publicação de " + post.usuario;
        grade.appendChild(img);
    });
}

function mostrarPerfil() {
    document.getElementById("feed").hidden = true;
    document.getElementById("explorar").hidden = true;
    document.getElementById("perfil").hidden = false;

    const grade = document.getElementById("gradePerfil");
    grade.innerHTML = "";

    posts.filter(post => post.usuario === "meu_usuario")
        .forEach(post => {
            const img = document.createElement("img");
            img.src = post.imagem;
            grade.appendChild(img);
        });
}

// INICIAR
renderizarPosts();
