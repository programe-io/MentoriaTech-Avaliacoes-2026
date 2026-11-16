
const feed = document.getElementById("feed");

let publicacoes = [
    {
        id: 1,
        usuario: "maria_oficial",
        imagem: "https://picsum.photos/id/1011/600/500",
        legenda: "Aproveitando o dia! 🌸",
        curtidas: 245,
        comentarios: [],
        curtiu: false
    },
    {
        id: 2,
        usuario: "pedro_fotos",
        imagem: "https://picsum.photos/id/1015/600/500",
        legenda: "Que paisagem incrível! 😍",
        curtidas: 120,
        comentarios: [],
        curtiu: false
    }
];

// CRIAR PUBLICAÇÃO
function publicar() {
    const usuario = document.getElementById("usuario").value.trim();
    const imagem = document.getElementById("imagem").value.trim();
    const legenda = document.getElementById("legenda").value.trim();

    if (!usuario || !imagem || !legenda) {
        alert("Preencha todos os campos!");
        return;
    }

    publicacoes.unshift({
        id: Date.now(),
        usuario,
        imagem,
        legenda,
        curtidas: 0,
        comentarios: [],
        curtiu: false
    });

    document.getElementById("usuario").value = "";
    document.getElementById("imagem").value = "";
    document.getElementById("legenda").value = "";

    mostrarFeed();
}

// MOSTRAR PUBLICAÇÕES
function mostrarFeed() {
    feed.innerHTML = "";

    publicacoes.forEach(post => {
        const artigo = document.createElement("article");
        artigo.className = "post";

        const cabecalho = document.createElement("div");
        cabecalho.className = "post-header";

        const nome = document.createElement("strong");
        nome.textContent = "👤 " + post.usuario;

        const excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";

        excluir.onclick = () => excluirPost(post.id);

        cabecalho.append(nome, excluir);

        const foto = document.createElement("img");
        foto.className = "foto";
        foto.src = post.imagem;
        foto.alt = "Foto publicada por " + post.usuario;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const curtir = document.createElement("button");
        curtir.textContent = post.curtiu ? "❤️" : "🤍";

        curtir.onclick = () => curtirPost(post.id);

        const comentar = document.createElement("button");
        comentar.textContent = "💬";

        comentar.onclick = () => {
            artigo.querySelector(".comentario-input").focus();
        };

        const salvar = document.createElement("button");
        salvar.textContent = "🔖";

        salvar.onclick = () => {
            alert("Publicação salva!");
        };

        acoes.append(curtir, comentar, salvar);

        const info = document.createElement("div");
        info.className = "info";

        const quantidade = document.createElement("strong");
        quantidade.textContent = post.curtidas + " curtidas";

        const legenda = document.createElement("p");
        const usuarioLegenda = document.createElement("strong");
        usuarioLegenda.textContent = post.usuario + " ";
        legenda.append(usuarioLegenda, document.createTextNode(post.legenda));

        info.append(quantidade, legenda);

        const comentarios = document.createElement("div");
        comentarios.className = "comentarios";

        post.comentarios.forEach(texto => {
            const p = document.createElement("p");
            p.textContent = texto;
            comentarios.appendChild(p);
        });

        const campo = document.createElement("input");
        campo.className = "comentario-input";
        campo.placeholder = "Adicione um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        enviar.onclick = () => adicionarComentario(post.id, campo.value);

        comentarios.append(campo, enviar);

        artigo.append(cabecalho, foto, acoes, info, comentarios);

        feed.appendChild(artigo);
    });
}

// CURTIR PUBLICAÇÃO
function curtirPost(id) {
    const post = publicacoes.find(p => p.id === id);

    if (post.curtiu) {
        post.curtidas--;
        post.curtiu = false;
    } else {
        post.curtidas++;
        post.curtiu = true;
    }

    mostrarFeed();
}

// ADICIONAR COMENTÁRIO
function adicionarComentario(id, texto) {
    if (!texto.trim()) {
        alert("Digite um comentário!");
        return;
    }

    const post = publicacoes.find(p => p.id === id);

    post.comentarios.push("Você: " + texto.trim());

    mostrarFeed();
}

// EXCLUIR PUBLICAÇÃO
function excluirPost(id) {
    if (confirm("Deseja excluir esta publicação?")) {
        publicacoes = publicacoes.filter(p => p.id !== id);
        mostrarFeed();
    }
}

// STORIES
const stories = [
    { nome: "Maria", foto: "https://i.pravatar.cc/100?img=5" },
    { nome: "Pedro", foto: "https://i.pravatar.cc/100?img=8" },
    { nome: "Ana", foto: "https://i.pravatar.cc/100?img=9" },
    { nome: "Lucas", foto: "https://i.pravatar.cc/100?img=11" }
];

const listaStories = document.getElementById("listaStories");

stories.forEach(story => {
    const div = document.createElement("div");
    div.className = "story";

    const img = document.createElement("img");
    img.src = story.foto;
    img.alt = story.nome;

    const nome = document.createElement("p");
    nome.textContent = story.nome;

    div.append(img, nome);
    listaStories.appendChild(div);
});

// INICIAR FEED
mostrarFeed();
