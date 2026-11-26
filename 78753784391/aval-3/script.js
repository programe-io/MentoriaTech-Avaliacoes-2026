
// ======================================
// NEON SOCIAL - JAVASCRIPT
// REDE SOCIAL CYBERPUNK
// ======================================

// ELEMENTOS DA PÁGINA

const postsContainer = document.getElementById("postsContainer");
const postText = document.getElementById("postText");
const publishButton = document.getElementById("publishButton");
const searchInput = document.getElementById("searchInput");
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const fileName = document.getElementById("fileName");
const postCount = document.getElementById("postCount");

const storyModal = document.getElementById("storyModal");
const storyText = document.getElementById("storyText");
const closeStory = document.getElementById("closeStory");

// DADOS DO USUÁRIO

const currentUser = {
    name: "PROXY_01",
    handle: "@proxy_01",
    avatar: "https://i.pravatar.cc/100?img=12"
};

// PUBLICAÇÕES INICIAIS

const initialPosts = [
    {
        id: 1,
        user: "V_Netrunner",
        handle: "@v_netrunner",
        avatar: "https://i.pravatar.cc/100?img=47",
        text: "Mais uma noite explorando Night City. As luzes neon nunca deixam de impressionar! #NightCity #Cyberpunk",
        image: "",
        likes: 28,
        liked: false,
        comments: [
            { user: "Judy.exe", text: "Essa cidade nunca dorme!" }
        ],
        date: "Hoje"
    },
    {
        id: 2,
        user: "Judy.exe",
        handle: "@judy_exe",
        avatar: "https://i.pravatar.cc/100?img=33",
        text: "Novo equipamento instalado. Agora estou pronta para qualquer missão. #Cyberware",
        image: "",
        likes: 46,
        liked: false,
        comments: [],
        date: "Hoje"
    },
    {
        id: 3,
        user: "Rogue_77",
        handle: "@rogue_77",
        avatar: "https://i.pravatar.cc/100?img=15",
        text: "Uma dica: nunca confie em uma transmissão desconhecida nos becos de Night City.",
        image: "",
        likes: 15,
        liked: false,
        comments: [],
        date: "Ontem"
    }
];

// CARREGAR PUBLICAÇÕES SALVAS

function carregarPosts() {
    try {
        const salvos = localStorage.getItem("neonSocialPosts");

        if (salvos !== null) {
            const dados = JSON.parse(salvos);

            if (Array.isArray(dados)) {
                return dados;
            }
        }
    } catch (erro) {
        console.error("Não foi possível carregar as publicações:", erro);
    }

    return initialPosts;
}

let posts = carregarPosts();
let imagemSelecionada = "";

// SALVAR PUBLICAÇÕES

function salvarPosts() {
    try {
        localStorage.setItem("neonSocialPosts", JSON.stringify(posts));
    } catch (erro) {
        alert("Não foi possível salvar. Tente usar uma imagem menor.");
        console.error("Erro ao salvar:", erro);
    }
}

// CRIAR ELEMENTO COM TEXTO SEGURO

function criarElemento(tag, classe, texto) {
    const elemento = document.createElement(tag);

    if (classe) {
        elemento.className = classe;
    }

    if (texto !== undefined) {
        elemento.textContent = texto;
    }

    return elemento;
}

// ATUALIZAR CONTADOR DO PERFIL

function atualizarContador() {
    const quantidade = posts.filter(
        post => post.user === currentUser.name
    ).length;

    postCount.textContent = quantidade;
}

// ======================================
// RENDERIZAR PUBLICAÇÕES
// ======================================

function renderizarPosts() {
    postsContainer.replaceChildren();

    const termo = searchInput.value.toLowerCase().trim();

    const filtrados = posts.filter(post => {
        const texto = (
            post.user + " " +
            post.handle + " " +
            post.text
        ).toLowerCase();

        return texto.includes(termo);
    });

    filtrados.forEach(post => {
        const card = criarElemento("article", "post-card");
        card.dataset.id = post.id;

        // CABEÇALHO

        const header = criarElemento("div", "post-header");

        const avatar = criarElemento("img");
        avatar.src = post.avatar;
        avatar.alt = "Foto de " + post.user;

        const userInfo = criarElemento("div", "post-user");

        userInfo.appendChild(
            criarElemento("strong", "", post.user)
        );

        userInfo.appendChild(
            criarElemento("span", "", post.handle + " • " + post.date)
        );

        header.appendChild(avatar);
        header.appendChild(userInfo);

        card.appendChild(header);

        // TEXTO DA PUBLICAÇÃO

        const texto = criarElemento("p", "post-text", post.text);
        card.appendChild(texto);

        // IMAGEM

        if (post.image) {
            const imagem = criarElemento("img", "post-image");

            imagem.src = post.image;
            imagem.alt = "Imagem publicada por " + post.user;

            card.appendChild(imagem);
        }

        // BOTÕES

        const actions = criarElemento("div", "post-actions");

        const likeButton = criarElemento(
            "button",
            post.liked ? "post-action liked" : "post-action"
        );

        likeButton.type = "button";
        likeButton.dataset.action = "like";
        likeButton.textContent = post.liked ? "♥ Curtido " : "♡ Curtir ";

        const likeCount = criarElemento("span", "", post.likes);
        likeButton.appendChild(likeCount);

        const commentButton = criarElemento(
            "button",
            "post-action",
            "▤ Comentar"
        );

        commentButton.type = "button";
        commentButton.dataset.action = "comment";

        actions.appendChild(likeButton);
        actions.appendChild(commentButton);

        card.appendChild(actions);

        // ÁREA DOS COMENTÁRIOS

        const commentsArea = criarElemento("div", "comments-area");

        const commentList = criarElemento("div", "comment-list");

        post.comments.forEach(comment => {
            const item = criarElemento("div", "comment");

            item.appendChild(
                criarElemento("strong", "", comment.user)
            );

            item.appendChild(
                document.createTextNode(comment.text)
            );

            commentList.appendChild(item);
        });

        commentsArea.appendChild(commentList);

        const commentForm = criarElemento("form", "comment-form");

        const commentInput = criarElemento("input");
        commentInput.type = "text";
        commentInput.placeholder = "Escreva um comentário...";
        commentInput.maxLength = 250;
        commentInput.setAttribute("aria-label", "Escreva um comentário");

        const sendButton = criarElemento("button", "", "Enviar");
        sendButton.type = "submit";

        commentForm.appendChild(commentInput);
        commentForm.appendChild(sendButton);

        commentsArea.appendChild(commentForm);
        card.appendChild(commentsArea);

        postsContainer.appendChild(card);
    });

    // MENSAGEM DE PESQUISA VAZIA

    document.getElementById("emptyMessage").hidden =
        filtrados.length !== 0;

    atualizarContador();
}

// ======================================
// PUBLICAR CONTEÚDO
// ======================================

function publicar() {
    const texto = postText.value.trim();

    if (!texto && !imagemSelecionada) {
        alert("Escreva uma mensagem ou selecione uma imagem!");
        return;
    }

    const novaPublicacao = {
        id: Date.now(),
        user: currentUser.name,
        handle: currentUser.handle,
        avatar: currentUser.avatar,
        text: texto,
        image: imagemSelecionada,
        likes: 0,
        liked: false,
        comments: [],
        date: "Agora"
    };

    posts.unshift(novaPublicacao);

    salvarPosts();

    postText.value = "";
    imagemSelecionada = "";
    imageInput.value = "";

    imagePreview.src = "";
    imagePreview.hidden = true;

    fileName.textContent = "Nenhuma imagem selecionada";

    searchInput.value = "";

    renderizarPosts();
}

// BOTÃO PUBLICAR

publishButton.addEventListener("click", publicar);

// ======================================
// SELECIONAR E VISUALIZAR IMAGEM
// ======================================

imageInput.addEventListener("change", function() {
    const arquivo = this.files[0];

    if (!arquivo) {
        return;
    }

    if (!arquivo.type.startsWith("image/")) {
        alert("Selecione um arquivo de imagem válido.");
        this.value = "";
        return;
    }

    // Limitar o tamanho para 1,5 MB
    if (arquivo.size > 1.5 * 1024 * 1024) {
        alert("A imagem deve ter no máximo 1,5 MB.");
        this.value = "";
        return;
    }

    const leitor = new FileReader();

    leitor.onload = function(evento) {
        imagemSelecionada = evento.target.result;

        imagePreview.src = imagemSelecionada;
        imagePreview.hidden = false;

        fileName.textContent = arquivo.name;
    };

    leitor.readAsDataURL(arquivo);
});

// ======================================
// CURTIR E DESCURTIR PUBLICAÇÕES
// ======================================

postsContainer.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-action]");

    if (!botao) {
        return;
    }

    const card = botao.closest(".post-card");
    const id = Number(card.dataset.id);

    const post = posts.find(item => item.id === id);

    if (!post) {
        return;
    }

    if (botao.dataset.action === "like") {
        post.liked = !post.liked;

        post.likes += post.liked ? 1 : -1;

        salvarPosts();
        renderizarPosts();
    }

    if (botao.dataset.action === "comment") {
        const campo = card.querySelector(".comment-form input");
        campo.focus();
    }
});

// ======================================
// ADICIONAR COMENTÁRIOS
// ======================================

postsContainer.addEventListener("submit", function(evento) {
    const formulario = evento.target.closest(".comment-form");

    if (!formulario) {
        return;
    }

    evento.preventDefault();

    const card = formulario.closest(".post-card");
    const id = Number(card.dataset.id);

    const post = posts.find(item => item.id === id);

    if (!post) {
        return;
    }

    const campo = formulario.querySelector("input");
    const texto = campo.value.trim();

    if (!texto) {
        alert("Digite um comentário antes de enviar.");
        return;
    }

    post.comments.push({
        user: currentUser.name,
        text: texto
    });

    salvarPosts();
    renderizarPosts();
});

// ======================================
// PESQUISAR PUBLICAÇÕES
// ======================================

searchInput.addEventListener("input", renderizarPosts);

// ======================================
// STORIES
// ======================================

document.querySelectorAll(".story").forEach(story => {
    story.addEventListener("click", function() {
        const mensagem = this.dataset.story;

        if (this.classList.contains("add-story")) {
            const novoStory = prompt("Digite o conteúdo do seu story:");

            if (!novoStory || !novoStory.trim()) {
                return;
            }

            storyText.textContent = novoStory.trim();
        } else {
            storyText.textContent = mensagem;
        }

        storyModal.hidden = false;
    });
});

// FECHAR STORY

closeStory.addEventListener("click", function() {
    storyModal.hidden = true;
});

storyModal.addEventListener("click", function(evento) {
    if (evento.target === storyModal) {
        storyModal.hidden = true;
    }
});

// FECHAR STORY COM ESC

document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        storyModal.hidden = true;
    }
});

// ======================================
// INICIALIZAÇÃO
// ======================================

renderizarPosts();

console.log("NEON SOCIAL inicializada com sucesso!");
