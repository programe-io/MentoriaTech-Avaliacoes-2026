
const seguirBtn = document.getElementById("seguirBtn");
const seguidores = document.getElementById("seguidores");
const publicarBtn = document.getElementById("publicarBtn");
const textoPost = document.getElementById("textoPost");
const imagemPost = document.getElementById("imagemPost");
const feed = document.getElementById("publicacoes");
const pesquisa = document.getElementById("pesquisa");

let seguindo = false;

// Seguir e deixar de seguir
seguirBtn.addEventListener("click", () => {
  seguindo = !seguindo;

  const total = Number(seguidores.textContent);
  seguidores.textContent = seguindo ? total + 1 : total - 1;

  seguirBtn.textContent = seguindo ? "Seguindo 💜" : "Seguir 💜";
  seguirBtn.classList.toggle("seguindo", seguindo);
});

// Curtir publicações
document.addEventListener("click", (event) => {
  const botao = event.target.closest(".curtir");

  if (!botao) return;

  const contador = botao.querySelector("span");
  let curtidas = Number(contador.textContent);
  const curtiu = botao.classList.toggle("ativo");

  curtidas = curtiu ? curtidas + 1 : curtidas - 1;
  contador.textContent = curtidas;
  botao.firstChild.textContent = curtiu ? "❤️ " : "🤍 ";
});

// Salvar publicações
document.addEventListener("click", (event) => {
  const botao = event.target.closest(".salvar");

  if (!botao) return;

  const salvo = botao.classList.toggle("ativo");
  botao.textContent = salvo ? "🔖 Salvo" : "🔖";
});

// Mostrar ou esconder comentários
document.addEventListener("click", (event) => {
  const botao = event.target.closest(".comentario-btn");

  if (!botao) return;

  const post = botao.closest(".post");
  const comentarios = post.querySelector(".comentarios");

  comentarios.classList.toggle("aberto");

  if (comentarios.classList.contains("aberto")) {
    comentarios.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });

    comentarios.querySelector("input").focus();
  }
});

// Adicionar comentários
document.addEventListener("submit", (event) => {
  if (!event.target.matches(".form-comentario")) return;

  event.preventDefault();

  const formulario = event.target;
  const input = formulario.querySelector("input");
  const mensagem = input.value.trim();

  if (!mensagem) return;

  const post = formulario.closest(".post");
  const areaComentarios = formulario.parentElement;
  const novoComentario = document.createElement("p");

  novoComentario.textContent = "💬 " + mensagem;
  areaComentarios.insertBefore(novoComentario, formulario);

  const contador = post.querySelector(".comentario-btn span");
  contador.textContent = Number(contador.textContent) + 1;

  input.value = "";
});

// Publicar um novo post
publicarBtn.addEventListener("click", () => {
  const legenda = textoPost.value.trim();
  const urlImagem = imagemPost.value.trim();

  if (!legenda && !urlImagem) {
    alert("Escreva uma legenda ou adicione o link de uma imagem! 💗");
    return;
  }

  if (urlImagem) {
    try {
      const url = new URL(urlImagem);

      if (!["http:", "https:"].includes(url.protocol)) {
        throw new Error("URL inválida");
      }
    } catch {
      alert("Digite um link de imagem válido começando com https://");
      return;
    }
  }

  const post = document.createElement("article");
  post.className = "post";

  const cabecalho = document.createElement("div");
  cabecalho.className = "post-cabecalho";

  const avatar = document.createElement("img");
  avatar.src = "avatar.png";
  avatar.alt = "Avatar";
  avatar.className = "mini-avatar";

  const dados = document.createElement("div");
  const usuario = document.createElement("strong");
  usuario.textContent = "@Lunnadelmondes_";

  const data = document.createElement("small");
  data.textContent = "Agora mesmo";

  dados.append(usuario, data);
  cabecalho.append(avatar, dados);
  post.appendChild(cabecalho);

  if (legenda) {
    const texto = document.createElement("p");
    texto.className = "legenda";
    texto.textContent = legenda;
    post.appendChild(texto);
  }

  if (urlImagem) {
    const imagem = document.createElement("img");
    imagem.className = "imagem-post";
    imagem.src = urlImagem;
    imagem.alt = "Imagem da publicação";
    imagem.loading = "lazy";

    imagem.addEventListener("error", () => {
      imagem.remove();
      alert("Não foi possível carregar essa imagem. Confira o link.");
    });

    post.appendChild(imagem);
  }

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  acoes.innerHTML = `
    <button class="curtir">🤍 <span>0</span></button>
    <button class="comentario-btn">💬 <span>0</span></button>
    <button class="compartilhar">↗️ Compartilhar</button>
    <button class="salvar">🔖</button>
  `;

  const comentarios = document.createElement("div");
  comentarios.className = "comentarios";

  comentarios.innerHTML = `
    <form class="form-comentario">
      <input type="text" placeholder="Escreva um comentário..." required>
      <button type="submit">Enviar</button>
    </form>
  `;

  post.append(acoes, comentarios);
  feed.insertBefore(post, feed.children[1]);

  textoPost.value = "";
  imagemPost.value = "";

  const totalPosts = document.getElementById("totalPosts");
  totalPosts.textContent = Number(totalPosts.textContent) + 1;

  alert("Sua publicação foi criada! 💖");
});

// Compartilhar publicações
document.addEventListener("click", async (event) => {
  const botao = event.target.closest(".compartilhar");

  if (!botao) return;

  const post = botao.closest(".post");
  const legenda = post.querySelector(".legenda")?.textContent || "";
  const texto = `${legenda}\nConfira o perfil @Lunnadelmondes_ 💗`;

  if (navigator.share) {
    try {
      await navigator.share({
        title: "Lunnadelmondes_",
        text: texto
      });
    } catch (erro) {
      if (erro.name !== "AbortError") {
        alert("Não foi possível compartilhar agora.");
      }
    }
  } else {
    try {
      await navigator.clipboard.writeText(texto);
      alert("Texto copiado! Você já pode compartilhar 💜");
    } catch {
      alert(texto);
    }
  }
});

// Abrir stories
const modalStory = document.getElementById("modalStory");
const textoStory = document.getElementById("textoStory");

document.querySelectorAll(".story").forEach((story) => {
  story.addEventListener("click", () => {
    textoStory.textContent = story.dataset.story;
    modalStory.classList.add("aberto");
  });
});

document.getElementById("fecharStory").addEventListener("click", () => {
  modalStory.classList.remove("aberto");
});

modalStory.addEventListener("click", (event) => {
  if (event.target === modalStory) {
    modalStory.classList.remove("aberto");
  }
});

// Pesquisar publicações
pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLowerCase().trim();

  document.querySelectorAll(".post").forEach((post) => {
    const conteudo = post.textContent.toLowerCase();
    post.style.display = conteudo.includes(termo) ? "" : "none";
  });
});
