/* =====================================================
   MINEFEED MOTO
   JavaScript — Funcionalidades do Feed
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  carregarPosts();
  configurarEventos();
  atualizarContadores();
});


/* =====================================================
   CONFIGURAÇÕES
   ===================================================== */

const STORAGE_KEY = "minefeed_moto_posts";

const usuario = {
  nome: "Você",
  username: "@motoca_lover",
  avatar: "🏍️"
};


/* =====================================================
   EVENTOS
   ===================================================== */

function configurarEventos() {

  const textarea = document.getElementById("postText");
  const search = document.getElementById("search");

  if (textarea) {
    textarea.addEventListener("input", atualizarContadorTexto);

    textarea.addEventListener("keydown", event => {

      // Ctrl + Enter publica
      if (event.ctrlKey && event.key === "Enter") {
        criarPost();
      }

    });
  }

  if (search) {
    search.addEventListener("input", pesquisarPosts);
  }
}


/* =====================================================
   CRIAR POST
   ===================================================== */

function createPost() {
  criarPost();
}

function criarPost() {

  const textarea = document.getElementById("postText");

  if (!textarea) return;

  const texto = textarea.value.trim();

  if (!texto) {
    mostrarMensagem("Digite algo antes de publicar! 🏍️");
    textarea.focus();
    return;
  }

  if (texto.length > 500) {
    mostrarMensagem("Sua publicação pode ter no máximo 500 caracteres.");
    return;
  }

  const novoPost = {
    id: Date.now(),

    usuario: usuario.nome,

    username: usuario.username,

    avatar: usuario.avatar,

    texto: texto,

    likes: 0,

    liked: false,

    comentarios: [],

    data: new Date().toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    })
  };

  const posts = obterPosts();

  posts.unshift(novoPost);

  salvarPosts(posts);

  textarea.value = "";

  atualizarContadorTexto();

  renderizarPosts();

  mostrarMensagem("Publicação criada! 🔥🏍️");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =====================================================
   RENDERIZAR POSTS
   ===================================================== */

function renderizarPosts() {

  const feed = document.getElementById("feed");

  if (!feed) return;

  const posts = obterPosts();

  // Mantém a caixa de publicação
  const createPostBox = document.getElementById("createPost");

  feed.innerHTML = "";

  if (createPostBox) {
    feed.appendChild(createPostBox);
  }

  posts.forEach(post => {

    const elemento = criarElementoPost(post);

    feed.appendChild(elemento);

  });

  atualizarContadores();
}


/* =====================================================
   CRIAR ELEMENTO HTML DO POST
   ===================================================== */

function criarElementoPost(post) {

  const article = document.createElement("article");

  article.className = "post";

  article.dataset.id = post.id;

  const comentariosHTML = post.comentarios
    .map(comentario => `
      <div class="comment">
        <strong>${escapeHTML(comentario.usuario)}:</strong>
        ${escapeHTML(comentario.texto)}
      </div>
    `)
    .join("");

  article.innerHTML = `

    <div class="post-header">

      <div class="mini-avatar">
        ${escapeHTML(post.avatar)}
      </div>

      <div>

        <strong>
          ${escapeHTML(post.usuario)}
        </strong>

        <small>
          ${escapeHTML(post.username)}
          · ${escapeHTML(post.data)}
        </small>

      </div>

    </div>


    <div class="post-text">

      ${escapeHTML(post.texto)}

    </div>


    <div class="actions">

      <button
        class="action ${post.liked ? "liked" : ""}"
        onclick="likePost(this)"
      >
        ❤️ Curtir
        <span>${post.likes}</span>
      </button>


      <button
        class="action"
        onclick="toggleComments(this)"
      >
        💬 Comentários
        <span>${post.comentarios.length}</span>
      </button>


      <button
        class="action"
        onclick="sharePost(${post.id})"
      >
        ↗️ Compartilhar
      </button>


      ${
        post.username === usuario.username
        ? `
          <button
            class="action"
            onclick="excluirPost(${post.id})"
          >
            🗑️ Excluir
          </button>
        `
        : ""
      }

    </div>


    <div class="comments">

      <input
        class="comment-input"
        placeholder="Escreva um comentário..."
        maxlength="200"
      >

      <div class="comment-list">

        ${comentariosHTML}

      </div>

    </div>

  `;


  // Evento de comentário
  const input = article.querySelector(".comment-input");

  input.addEventListener("keydown", event => {

    if (event.key === "Enter") {

      adicionarComentario(
        event,
        input,
        post.id
      );

    }

  });


  return article;
}


/* =====================================================
   CURTIR POST
   ===================================================== */

function likePost(button) {

  const article = button.closest(".post");

  if (!article) return;

  const id = Number(article.dataset.id);

  const posts = obterPosts();

  const post = posts.find(item => item.id === id);

  if (!post) return;

  if (post.liked) {

    post.likes--;

    post.liked = false;

  } else {

    post.likes++;

    post.liked = true;

  }

  salvarPosts(posts);

  button.classList.toggle("liked", post.liked);

  const contador = button.querySelector("span");

  if (contador) {
    contador.textContent = post.likes;
  }
}


/* =====================================================
   COMENTÁRIOS
   ===================================================== */

function toggleComments(button) {

  const article = button.closest(".post");

  if (!article) return;

  const comments = article.querySelector(".comments");

  if (!comments) return;

  const aberto = comments.style.display === "block";

  comments.style.display = aberto
    ? "none"
    : "block";

  if (!aberto) {

    const input =
      comments.querySelector(".comment-input");

    if (input) {
      setTimeout(() => input.focus(), 100);
    }

  }
}


/* =====================================================
   ADICIONAR COMENTÁRIO
   ===================================================== */

function addComment(event, input) {

  const article = input.closest(".post");

  if (!article) return;

  const id = Number(article.dataset.id);

  adicionarComentario(
    event,
    input,
    id
  );
}


function adicionarComentario(event, input, id) {

  if (event.key !== "Enter") return;

  const texto = input.value.trim();

  if (!texto) return;

  if (texto.length > 200) {

    mostrarMensagem(
      "O comentário pode ter no máximo 200 caracteres."
    );

    return;
  }

  const posts = obterPosts();

  const post = posts.find(item => item.id === id);

  if (!post) return;

  post.comentarios.push({

    usuario: usuario.nome,

    texto: texto,

    data: Date.now()

  });

  salvarPosts(posts);

  input.value = "";

  renderizarPosts();

  // Reabre comentários do post
  setTimeout(() => {

    const article =
      document.querySelector(
        `.post[data-id="${id}"]`
      );

    if (!article) return;

    const comments =
      article.querySelector(".comments");

    if (comments) {
      comments.style.display = "block";
    }

  }, 50);
}


/* =====================================================
   EXCLUIR POST
   ===================================================== */

function excluirPost(id) {

  const confirmar = confirm(
    "Tem certeza que deseja excluir esta publicação?"
  );

  if (!confirmar) return;

  let posts = obterPosts();

  posts = posts.filter(post => post.id !== id);

  salvarPosts(posts);

  renderizarPosts();

  mostrarMensagem("Publicação excluída.");
}


/* =====================================================
   PESQUISA
   ===================================================== */

function searchPosts() {
  pesquisarPosts();
}


function pesquisarPosts() {

  const campo = document.getElementById("search");

  if (!campo) return;

  const pesquisa =
    campo.value
      .toLowerCase()
      .trim();

  const posts =
    document.querySelectorAll(".post");

  posts.forEach(post => {

    const texto =
      post.innerText.toLowerCase();

    if (texto.includes(pesquisa)) {

      post.style.display = "";

    } else {

      post.style.display = "none";

    }

  });
}


/* =====================================================
   COMPARTILHAR
   ===================================================== */

async function sharePost(id) {

  const posts = obterPosts();

  const post = posts.find(item => item.id === id);

  if (!post) return;

  const texto =
    `${post.usuario} publicou no MineFeed Moto:\n\n${post.texto}`;

  try {

    if (navigator.share) {

      await navigator.share({

        title: "MineFeed Moto",

        text: texto,

        url: window.location.href

      });

    } else {

      await navigator.clipboard.writeText(
        `${texto}\n\n${window.location.href}`
      );

      mostrarMensagem(
        "Link da publicação copiado! 🔗"
      );

    }

  } catch (error) {

    // Usuário cancelou o compartilhamento.
    console.log("Compartilhamento cancelado.");

  }
}


/* =====================================================
   LOCAL STORAGE
   ===================================================== */

function obterPosts() {

  try {

    const dados =
      localStorage.getItem(STORAGE_KEY);

    if (!dados) return [];

    return JSON.parse(dados);

  } catch (error) {

    console.error(
      "Erro ao carregar posts:",
      error
    );

    return [];

  }
}


function salvarPosts(posts) {

  try {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(posts)
    );

  } catch (error) {

    console.error(
      "Erro ao salvar posts:",
      error
    );

  }
}


/* =====================================================
   POSTS INICIAIS
   ===================================================== */

function carregarPosts() {

  const posts = obterPosts();

  // Se já existem posts salvos,
  // não cria posts novamente.
  if (posts.length > 0) {

    renderizarPosts();

    return;
  }

  const postsIniciais = [

    {
      id: 1,

      usuario: "Lucas Motoca",

      username: "@lucasmotoca",

      avatar: "🏍️",

      texto:
        "Primeiro rolê do mês! Essa máquina está simplesmente incrível. 🔥🏍️",

      likes: 12,

      liked: false,

      comentarios: [],

      data: "Hoje · 08:30"
    },

    {
      id: 2,

      usuario: "João Rider",

      username: "@joaorider",

      avatar: "🔥",

      texto:
        "Qual vocês escolheriam para viajar: uma esportiva ou uma trail? Quero saber a opinião da galera! 👇",

      likes: 28,

      liked: false,

      comentarios: [],

      data: "Hoje · 06:20"
    }

  ];

  salvarPosts(postsIniciais);

  renderizarPosts();
}


/* =====================================================
   CONTADOR DE CARACTERES
   ===================================================== */

function atualizarContadorTexto() {

  const textarea =
    document.getElementById("postText");

  if (!textarea) return;

  const quantidade =
    textarea.value.length;

  // Procura um contador existente
  let contador =
    document.getElementById("charCounter");

  // Cria caso não exista
  if (!contador) {

    contador =
      document.createElement("div");

    contador.id = "charCounter";

    contador.style.fontSize = "11px";

    contador.style.color = "#666";

    contador.style.marginTop = "7px";

    textarea.parentNode.appendChild(
      contador
    );
  }

  contador.textContent =
    `${quantidade}/500 caracteres`;

  if (quantidade > 450) {

    contador.style.color = "#ff6a00";

  } else {

    contador.style.color = "#666";

  }
}


/* =====================================================
   CONTADORES DO FEED
   ===================================================== */

function atualizarContadores() {

  const posts = obterPosts();

  const totalLikes =
    posts.reduce(
      (total, post) =>
        total + post.likes,
      0
    );

  const totalComentarios =
    posts.reduce(
      (total, post) =>
        total + post.comentarios.length,
      0
    );

  console.log(
    `MineFeed: ${posts.length} posts | ${totalLikes} curtidas | ${totalComentarios} comentários`
  );
}


/* =====================================================
   NAVEGAÇÃO
   ===================================================== */

function scrollToTop() {

  window.scrollTo({

    top: 0,

    behavior: "smooth"

  });

}


function focusPost() {

  const textarea =
    document.getElementById("postText");

  if (!textarea) return;

  textarea.scrollIntoView({

    behavior: "smooth",

    block: "center"

  });

  setTimeout(() => {

    textarea.focus();

  }, 400);
}


/* =====================================================
   NOTIFICAÇÃO
   ===================================================== */

function mostrarMensagem(texto) {

  let notificacao =
    document.getElementById(
      "minefeedNotification"
    );

  if (!notificacao) {

    notificacao =
      document.createElement("div");

    notificacao.id =
      "minefeedNotification";

    document.body.appendChild(
      notificacao
    );

    Object.assign(
      notificacao.style,
      {

        position: "fixed",

        bottom: "25px",

        left: "50%",

        transform:
          "translateX(-50%) translateY(20px)",

        background:
          "linear-gradient(135deg,#ff3d00,#ff6a00)",

        color: "#fff",

        padding: "12px 20px",

        borderRadius: "25px",

        fontSize: "13px",

        fontWeight: "700",

        boxShadow:
          "0 10px 30px rgba(0,0,0,.5)",

        zIndex: "9999",

        opacity: "0",

        transition: ".3s ease",

        pointerEvents: "none"

      }
    );
  }

  notificacao.textContent = texto;

  notificacao.style.opacity = "1";

  notificacao.style.transform =
    "translateX(-50%) translateY(0)";

  clearTimeout(
    notificacao.timeout
  );

  notificacao.timeout =
    setTimeout(() => {

      notificacao.style.opacity = "0";

      notificacao.style.transform =
        "translateX(-50%) translateY(20px)";

    }, 2500);
}


/* =====================================================
   SEGURANÇA
   Evita HTML malicioso em posts/comentários.
   ===================================================== */

function escapeHTML(texto) {

  const div =
    document.createElement("div");

  div.textContent = texto;

  return div.innerHTML;
}


/* =====================================================
   ATALHO DE TECLADO
   ===================================================== */

document.addEventListener(
  "keydown",
  event => {

    // "/" ativa a busca
    if (
      event.key === "/" &&
      document.activeElement.tagName !== "TEXTAREA" &&
      document.activeElement.tagName !== "INPUT"
    ) {

      event.preventDefault();

      const search =
        document.getElementById("search");

      if (search) {

        search.focus();

      }

    }

    // ESC limpa a busca
    if (event.key === "Escape") {

      const search =
        document.getElementById("search");

      if (
        search &&
        document.activeElement === search
      ) {

        search.value = "";

        pesquisarPosts();

        search.blur();

      }

    }

  }
);