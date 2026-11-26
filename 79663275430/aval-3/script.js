const MEU_USUARIO = "voce_oficial";
const MEU_AVATAR = "https://unsplash.com";

const stories = [
  {
    usuario: "ana.clara",
    avatar: "https://unsplash.com",
    storyImg: "https://unsplash.com"
  },
  {
    usuario: "lucas_m",
    avatar: "https://unsplash.com",
    storyImg: "https://unsplash.com"
  },
  {
    usuario: "chef.marina",
    avatar: "https://unsplash.com",
    storyImg: "https://unsplash.com"
  }
];

const postsPadrao = [
  {
    id: 1,
    usuario: "ana.clara",
    avatar: "https://unsplash.com",
    local: "Luís Correia, PI",
    imagem: "https://unsplash.com",
    curtidas: 184,
    curtido: false,
    salvo: true,
    legenda: "Sol, mar e tranquilidade no litoral! 🌊☀️",
    tempo: "Há 2 horas",
    comentarios: [{ usuario: "lucas_m", texto: "Foto incrível!" }]
  },
  {
    id: 2,
    usuario: MEU_USUARIO,
    avatar: MEU_AVATAR,
    local: "Teresina, PI",
    imagem: "https://unsplash.com",
    curtidas: 96,
    curtido: true,
    salvo: false,
    legenda: "Pausa para um café especial antes de programar ☕💻",
    tempo: "Há 1 dia",
    comentarios: []
  }
];

let posts = JSON.parse(localStorage.getItem("instaclone_posts")) || postsPadrao;
let abaPerfilAtual = "posts";
let imagemUploadBase64 = "";
let storyTimer = null;

function salvarEstado() {
  localStorage.setItem("instaclone_posts", JSON.stringify(posts));
}

// Renderiza Stories
document.getElementById("lista-stories").innerHTML = stories
  .map(
    (s, idx) => `
    <div class="story-item" onclick="abrirStory(${idx})">
      <div class="story-anel"><img src="${s.avatar}" alt="${s.usuario}"></div>
      <span>${s.usuario}</span>
    </div>
  `
  )
  .join("");

// Renderiza Feed
function renderizarFeed() {
  const termo = document.getElementById("busca").value.toLowerCase().trim();
  const feedEl = document.getElementById("feed-posts");

  const filtrados = posts.filter(
    (p) =>
      p.usuario.toLowerCase().includes(termo) ||
      p.legenda.toLowerCase().includes(termo)
  );

  feedEl.innerHTML = filtrados
    .map(
      (post) => `
      <article class="post-card">
        <div class="post-topo">
          <div class="post-autor-box">
            <img src="${post.avatar}" alt="${post.usuario}">
            <div class="post-user">
              <strong>${post.usuario}</strong>
              ${post.local ? `<small>${post.local}</small>` : ""}
            </div>
          </div>
          ${
            post.usuario === MEU_USUARIO
              ? `<button class="btn-excluir" onclick="excluirPost(${post.id})">Excluir</button>`
              : ""
          }
        </div>

        <div class="post-midia" ondblclick="curtirDuploClique(${post.id})">
          <img src="${post.imagem}" alt="Publicação">
          <div class="coracao-animado" id="heart-${post.id}">❤️</div>
        </div>

        <div class="post-barra-acoes">
          <div class="acoes-esquerda">
            <button class="btn-post" onclick="alternarCurtida(${post.id})">
              ${post.curtido ? "❤️" : "🤍"}
            </button>
            <button class="btn-post" onclick="document.getElementById('coment-${post.id}').focus()">
              💬
            </button>
          </div>
          <button class="btn-post" onclick="alternarSalvar(${post.id})">
            ${post.salvo ? "🔖" : "📑"}
          </button>
        </div>

        <div class="post-info">
          <div class="curtidas-texto">${post.curtidas} curtidas</div>
          <div class="legenda-texto"><strong>${post.usuario}</strong> ${post.legenda}</div>
          <ul class="comentarios-lista">
            ${post.comentarios
              .map((c) => `<li><strong>${c.usuario}</strong> ${c.texto}</li>`)
              .join("")}
          </ul>
          <span class="post-tempo">${post.tempo}</span>
        </div>

        <form class="post-comentar" onsubmit="enviarComentario(event, ${post.id})">
          <input type="text" id="coment-${post.id}" placeholder="Adicione um comentário..." required>
          <button type="submit">Publicar</button>
        </form>
      </article>
    `
    )
    .join("");
}

// Renderiza Página de Perfil
function renderizarPerfil() {
  const meusPosts = posts.filter((p) => p.usuario === MEU_USUARIO);
  const postsSalvos = posts.filter((p) => p.salvo);

  document.getElementById("total-posts").textContent = meusPosts.length;

  const listaExibir = abaPerfilAtual === "posts" ? meusPosts : postsSalvos;
  const grade = document.getElementById("grade-perfil");

  if (listaExibir.length === 0) {
    grade.innerHTML = `<p style="grid-column:1/-1; text-align:center; color:var(--texto-sec); padding:30px;">Nenhuma publicação nesta aba.</p>`;
    return;
  }

  grade.innerHTML = listaExibir
    .map(
      (p) => `
      <div class="grade-item">
        <img src="${p.imagem}" alt="Foto">
        <div class="grade-overlay">
          <span>❤️ ${p.curtidas}</span>
          <span>💬 ${p.comentarios.length}</span>
        </div>
      </div>
    `
    )
    .join("");
}

function alternarAbaPerfil(aba) {
  abaPerfilAtual = aba;
  document.getElementById("aba-posts").classList.toggle("ativa", aba === "posts");
  document.getElementById("aba-salvos").classList.toggle("ativa", aba === "salvos");
  renderizarPerfil();
}

function mostrarTela(tela) {
  document.getElementById("tela-feed").classList.toggle("oculto", tela !== "feed");
  document.getElementById("tela-perfil").classList.toggle("oculto", tela !== "perfil");
  if (tela === "perfil") renderizarPerfil();
  if (tela === "feed") renderizarFeed();
}

// Interações de Post
function alternarCurtida(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.curtido = !post.curtido;
  post.curtidas += post.curtido ? 1 : -1;
  salvarEstado();
  renderizarFeed();
}

function curtirDuploClique(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  if (!post.curtido) {
    post.curtido = true;
    post.curtidas += 1;
    salvarEstado();
    renderizarFeed();
  }
  const heart = document.getElementById(`heart-${id}`);
  if (heart) {
    heart.classList.add("mostrar");
    setTimeout(() => heart.classList.remove("mostrar"), 650);
  }
}

function alternarSalvar(id) {
  const post = posts.find((p) => p.id === id);
  if (!post) return;
  post.salvo = !post.salvo;
  salvarEstado();
  renderizarFeed();
}

function enviarComentario(e, id) {
  e.preventDefault();
  const input = document.getElementById(`coment-${id}`);
  const texto = input.value.trim();
  if (!texto) return;
  const post = posts.find((p) => p.id === id);
  if (post) {
    post.comentarios.push({ usuario: MEU_USUARIO, texto });
    salvarEstado();
    renderizarFeed();
  }
}

function excluirPost(id) {
  posts = posts.filter((p) => p.id !== id);
  salvarEstado();
  renderizarFeed();
  renderizarPerfil();
}

function alternarSeguir(btn) {
  const seguindo = btn.classList.toggle("seguindo");
  btn.textContent = seguindo ? "Seguindo" : "Seguir";
}

// Upload de imagem local (FileReader) + Criação de Post
const modalCriar = document.getElementById("modal-criar");
const inputArquivo = document.getElementById("arquivo-imagem");
const previewUpload = document.getElementById("preview-upload");

document.getElementById("btn-abrir-criar").onclick = () => modalCriar.classList.add("aberto");
document.getElementById("fechar-criar").onclick = () => modalCriar.classList.remove("aberto");

inputArquivo.addEventListener("change", (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;
  const leitor = new FileReader();
  leitor.onload = (ev) => {
    imagemUploadBase64 = ev.target.result;
    previewUpload.src = imagemUploadBase64;
    previewUpload.classList.remove("oculto");
  };
  leitor.readAsDataURL(arquivo);
});

document.getElementById("form-novo-post").addEventListener("submit", (e) => {
  e.preventDefault();
  const urlDigitada = document.getElementById("nova-imagem-url").value.trim();
  const imagemFinal = imagemUploadBase64 || urlDigitada;

  if (!imagemFinal) {
    alert("Escolha uma foto do dispositivo ou informe uma URL válida.");
    return;
  }

  posts.unshift({
    id: Date.now(),
    usuario: MEU_USUARIO,
    avatar: MEU_AVATAR,
    local: document.getElementById("nova-localizacao").value.trim(),
    imagem: imagemFinal,
    curtidas: 0,
    curtido: false,
    salvo: false,
    legenda: document.getElementById("nova-legenda").value.trim(),
    tempo: "Agora mesmo",
    comentarios: []
  });

  salvarEstado();
  e.target.reset();
  imagemUploadBase64 = "";
  previewUpload.classList.add("oculto");
  modalCriar.classList.remove("aberto");
  mostrarTela("feed");
});

// Stories
const modalStory = document.getElementById("modal-story");
const storyBarra = document.getElementById("story-barra");

function abrirStory(index) {
  const s = stories[index];
  document.getElementById("story-avatar").src = s.avatar;
  document.getElementById("story-usuario").textContent = s.usuario;
  document.getElementById("story-foto").src = s.storyImg;

  modalStory.classList.add("aberto");
  clearInterval(storyTimer);

  let progresso = 0;
  storyBarra.style.width = "0%";
  storyTimer = setInterval(() => {
    progresso += 2;
    storyBarra.style.width = `${progresso}%`;
