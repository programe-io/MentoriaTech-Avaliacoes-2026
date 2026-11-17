
const postInput = document.getElementById("postInput");
const imageInput = document.getElementById("imageInput");
const publishButton = document.getElementById("publishButton");
const feed = document.getElementById("feed");
const imagePreview = document.getElementById("imagePreview");

const usuario = {
    nome: "Lucas Mendes",
    foto: "https://randomuser.me/api/portraits/men/32.jpg"
};

// PUBLICAÇÕES DE EXEMPLO
const exemplos = [
    {
        id: "exemplo1",
        autor: "Maria Oliveira",
        profissao: "Designer Gráfica",
        foto: "https://randomuser.me/api/portraits/women/44.jpg",
        texto: "Hoje finalizei um novo projeto de identidade visual! 🎨 É muito gratificante transformar ideias em experiências visuais.",
        imagem: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=1000",
        curtidas: 28,
        curtido: false,
        comentarios: [
            {
                nome: "João Santos",
                foto: "https://randomuser.me/api/portraits/men/45.jpg",
                texto: "Parabéns pelo excelente trabalho!"
            },
            {
                nome: "Ana Costa",
                foto: "https://randomuser.me/api/portraits/women/68.jpg",
                texto: "Ficou incrível! 👏"
            }
        ],
        data: "Há 15 minutos"
    },
    {
        id: "exemplo2",
        autor: "João Santos",
        profissao: "Desenvolvedor Full Stack",
        foto: "https://randomuser.me/api/portraits/men/45.jpg",
        texto: "Estudando JavaScript e desenvolvendo novos projetos. Cada linha de código é uma oportunidade de aprender algo novo! 💻🚀",
        imagem: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1000",
        curtidas: 42,
        curtido: false,
        comentarios: [
            {
                nome: "Pedro Lima",
                foto: "https://randomuser.me/api/portraits/men/52.jpg",
                texto: "Continue assim!"
            }
        ],
        data: "Há 1 hora"
    },
    {
        id: "exemplo3",
        autor: "Ana Costa",
        profissao: "Analista de Sistemas",
        foto: "https://randomuser.me/api/portraits/women/68.jpg",
        texto: "A tecnologia transforma o mundo, mas são as pessoas que transformam a tecnologia. Nunca parem de aprender! 🚀",
        imagem: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1000",
        curtidas: 67,
        curtido: false,
        comentarios: [],
        data: "Há 3 horas"
    }
];

// CARREGAR DADOS
let posts;

try {
    const dados = localStorage.getItem("miniLinkedinPosts");
    posts = dados ? JSON.parse(dados) : exemplos;

    if (!Array.isArray(posts)) posts = exemplos;

} catch {
    posts = exemplos;
}

function salvarPosts() {
    try {
        localStorage.setItem(
            "miniLinkedinPosts",
            JSON.stringify(posts)
        );
    } catch {
        alert("O armazenamento está cheio. Remova algumas imagens ou publicações.");
    }
}

// PRÉVIA DA IMAGEM
imageInput.addEventListener("change", () => {
    imagePreview.innerHTML = "";

    const arquivo = imageInput.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione uma imagem válida.");
        imageInput.value = "";
        return;
    }

    if (arquivo.size > 1024 * 1024) {
        alert("Escolha uma imagem de até 1 MB.");
        imageInput.value = "";
        return;
    }

    const reader = new FileReader();

    reader.onload = event => {
        const img = document.createElement("img");
        img.src = event.target.result;
        img.alt = "Prévia da publicação";

        imagePreview.append(img);
    };

    reader.readAsDataURL(arquivo);
});

// CRIAR PUBLICAÇÃO
function criarPublicacao() {
    const texto = postInput.value.trim();
    const arquivo = imageInput.files[0];

    if (!texto && !arquivo) {
        alert("Escreva algo ou selecione uma imagem!");
        return;
    }

    function finalizar(imagem = "") {
        const novaPostagem = {
            id: Date.now().toString(),
            autor: usuario.nome,
            profissao: "Desenvolvedor Web",
            foto: usuario.foto,
            texto: texto,
            imagem: imagem,
            curtidas: 0,
            curtido: false,
            comentarios: [],
            data: "Agora"
        };

        posts.unshift(novaPostagem);

        salvarPosts();
        renderizarPosts();

        postInput.value = "";
        imageInput.value = "";
        imagePreview.innerHTML = "";
    }

    if (arquivo) {
        if (!arquivo.type.startsWith("image/") ||
            arquivo.size > 1024 * 1024) {
            alert("Escolha uma imagem válida de até 1 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = event => {
            finalizar(event.target.result);
        };

        reader.readAsDataURL(arquivo);

    } else {
        finalizar();
    }
}

publishButton.addEventListener("click", criarPublicacao);

// RENDERIZAR PUBLICAÇÕES
function renderizarPosts() {
    feed.innerHTML = "";

    posts.forEach(post => {
        const article = document.createElement("article");
        article.className = "post";

        // CABEÇALHO
        const header = document.createElement("div");
        header.className = "post-header";

        const avatar = document.createElement("img");
        avatar.src = post.foto;
        avatar.alt = "Foto de " + post.autor;

        const info = document.createElement("div");

        const nome = document.createElement("h3");
        nome.textContent = post.autor;

        const profissao = document.createElement("p");
        profissao.textContent =
            (post.profissao || "Profissional") + " • " + post.data;

        info.append(nome, profissao);
        header.append(avatar, info);

        article.append(header);

        // TEXTO
        if (post.texto) {
            const texto = document.createElement("p");
            texto.className = "post-text";
            texto.textContent = post.texto;
            article.append(texto);
        }

        // IMAGEM
        if (post.imagem) {
            const imagem = document.createElement("img");
            imagem.className = "post-image";
            imagem.src = post.imagem;
            imagem.alt = "Imagem publicada por " + post.autor;

            article.append(imagem);
        }

        // CONTADORES
        const stats = document.createElement("div");
        stats.className = "post-stats";

        const totalCurtidas = document.createElement("span");
        totalCurtidas.textContent = "👍 " + post.curtidas + " curtidas";

        const totalComentarios = document.createElement("span");
        totalComentarios.textContent =
            post.comentarios.length + " comentários";

        stats.append(totalCurtidas, totalComentarios);

        // BOTÕES
        const actions = document.createElement("div");
        actions.className = "post-actions";

        const likeButton = document.createElement("button");

        likeButton.textContent = post.curtido
            ? "👍 Curtido"
            : "👍 Curtir";

        likeButton.classList.toggle("liked", post.curtido);

        likeButton.addEventListener("click", () => {
            post.curtido = !post.curtido;

            post.curtidas += post.curtido ? 1 : -1;

            salvarPosts();
            renderizarPosts();
        });

        const commentButton = document.createElement("button");
        commentButton.textContent = "💬 Comentar";

        const shareButton = document.createElement("button");
        shareButton.textContent = "↗ Compartilhar";

        shareButton.addEventListener("click", () => {
            compartilhar(post);
        });

        actions.append(
            likeButton,
            commentButton,
            shareButton
        );

        // ÁREA DE COMENTÁRIOS
        const comments = document.createElement("div");
        comments.className = "comments";

        const form = document.createElement("div");
        form.className = "comment-form";

        const minhaFoto = document.createElement("img");
        minhaFoto.src = usuario.foto;
        minhaFoto.alt = "Minha foto";

        const input = document.createElement("input");
        input.placeholder = "Escreva um comentário...";

        const enviar = document.createElement("button");
        enviar.textContent = "Enviar";

        function adicionarComentario() {
            const texto = input.value.trim();

            if (!texto) return;

            post.comentarios.push({
                nome: usuario.nome,
                foto: usuario.foto,
                texto: texto
            });

            salvarPosts();
            renderizarPosts();
        }

        enviar.addEventListener("click", adicionarComentario);

        input.addEventListener("keydown", event => {
            if (event.key === "Enter") {
                adicionarComentario();
            }
        });

        form.append(minhaFoto, input, enviar);

        commentButton.addEventListener("click", () => {
            input.focus();
        });

        comments.append(form);

        // LISTAR COMENTÁRIOS
        post.comentarios.forEach(comentario => {
            const comment = document.createElement("div");
            comment.className = "comment";

            const foto = document.createElement("img");
            foto.src = comentario.foto;
            foto.alt = "Foto de " + comentario.nome;

            const content = document.createElement("div");
            content.className = "comment-content";

            const nomeComentario = document.createElement("strong");
            nomeComentario.textContent = comentario.nome;

            const textoComentario = document.createElement("p");
            textoComentario.textContent = comentario.texto;

            content.append(nomeComentario, textoComentario);
            comment.append(foto, content);

            comments.append(comment);
        });

        article.append(stats, actions, comments);

        feed.append(article);
    });
}

// COMPARTILHAR PUBLICAÇÃO
async function compartilhar(post) {
    const conteudo =
        `${post.autor} publicou no Mini LinkedIn:\n\n${post.texto}`;

    if (navigator.share) {
        try {
            await navigator.share({
                title: "Mini LinkedIn",
                text: conteudo
            });
        } catch (erro) {
            if (erro.name !== "AbortError") {
                alert("Não foi possível compartilhar.");
            }
        }
    } else {
        try {
            await navigator.clipboard.writeText(conteudo);
            alert("Publicação copiada! Você já pode compartilhar.");
        } catch {
            alert("Não foi possível copiar o conteúdo.");
        }
    }
}

// CONECTAR COM PROFISSIONAIS
document.querySelectorAll(".connect-button").forEach(button => {
    button.addEventListener("click", () => {
        button.classList.toggle("connected");

        if (button.classList.contains("connected")) {
            button.textContent = "✓ Conectado";
        } else {
            button.textContent = "+ Conectar";
        }
    });
});

// CARREGAR FEED
renderizarPosts();
