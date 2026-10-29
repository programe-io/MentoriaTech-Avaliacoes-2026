const formPost = document.getElementById("formPost");
const textoPost = document.getElementById("textoPost");
const listaPosts = document.getElementById("listaPosts");
const contador = document.getElementById("contador");
const busca = document.getElementById("busca");
const ordenacao = document.getElementById("ordenacao");
const aviso = document.getElementById("aviso");

let avisoTimer;

function mostrarAviso(mensagem) {
  aviso.textContent = mensagem;
  aviso.style.display = "block";

  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => {
    aviso.style.display = "none";
  }, 2500);
}

function atualizarTotal() {
  document.getElementById("totalPosts").textContent =
    listaPosts.querySelectorAll(".post").length;
}

textoPost.addEventListener("input", () => {
  contador.textContent = `${textoPost.value.length}/500`;
});

function criarPost(texto) {
  const post = document.createElement("article");
  post.className = "post painel";
  post.dataset.likes = "0";

  const topo = document.createElement("div");
  topo.className = "post-topo";

  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.textContent = "👨‍💻";

  const autor = document.createElement("div");
  autor.className = "autor";

  const nome = document.createElement("strong");
  nome.textContent = "Meu Perfil";

  const data = document.createElement("span");
  data.textContent = "@meuusuario · Agora";

  autor.append(nome, data);
  topo.append(avatar, autor);

  const textoPostagem = document.createElement("p");
  textoPostagem.className = "texto-post";
  textoPostagem.textContent = texto;

  const resumo = document.createElement("div");
  resumo.className = "resumo-curtidas";
  resumo.append("❤️ ");

  const numero = document.createElement("span");
  numero.className = "numero-curtidas";
  numero.textContent = "0";

  resumo.append(numero, " curtidas");

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  const curtir = document.createElement("button");
  curtir.className = "curtir";
  curtir.textContent = "♡ Curtir";

  const comentar = document.createElement("button");
  comentar.className = "comentar";
  comentar.textContent = "💬 Comentar";

  const compartilhar = document.createElement("button");
  compartilhar.className = "compartilhar";
  compartilhar.textContent = "↗ Compartilhar";

  acoes.append(curtir, comentar, compartilhar);

  const comentarios = document.createElement("div");
  comentarios.className = "comentarios";
  comentarios.hidden = true;

  post.append(topo, textoPostagem, resumo, acoes, comentarios);
  return post;
}

formPost.addEventListener("submit", event => {
  event.preventDefault();

  const texto = textoPost.value.trim();
  if (!texto) return;

  const post = criarPost(texto);
  listaPosts.prepend(post);

  textoPost.value = "";
  contador.textContent = "0/500";

  atualizarTotal();
  filtrarPosts();
  mostrarAviso("Publicação criada com sucesso! 🎉");
});

listaPosts.addEventListener("click", async event => {
  const button = event.target.closest("button");
  if (!button) return;

  const post = button.closest(".post");
  if (!post) return;

  if (button.classList.contains("curtir")) {
    const numero = post.querySelector(".numero-curtidas");
    let likes = Number(post.dataset.likes || 0);

    if (button.classList.contains("liked")) {
      likes--;
      button.classList.remove("liked");
      button.textContent = "♡ Curtir";
    } else {
      likes++;
      button.classList.add("liked");
      button.textContent = "♥ Curtido";
    }

    post.dataset.likes = likes;
    numero.textContent = likes;
    filtrarPosts();
  }

  if (button.classList.contains("comentar")) {
    const area = post.querySelector(".comentarios");
    area.hidden = !area.hidden;

    if (!area.querySelector(".comentario-form")) {
      const form = document.createElement("form");
      form.className = "comentario-form";

      const input = document.createElement("input");
      input.placeholder = "Escreva um comentário...";
      input.maxLength = 200;
      input.required = true;
      input.setAttribute("aria-label", "Comentário");

      const enviar = document.createElement("button");
      enviar.type = "submit";
      enviar.textContent = "Enviar";

      form.append(input, enviar);
      area.append(form);

      form.addEventListener("submit", e => {
        e.preventDefault();

        const valor = input.value.trim();
        if (!valor) return;

        const comentario = document.createElement("div");
        comentario.className = "comentario-item";

        const autor = document.createElement("strong");
        autor.textContent = "Você: ";

        comentario.append(autor, document.createTextNode(valor));
        area.insertBefore(comentario, form);

        input.value = "";
        mostrarAviso("Comentário adicionado!");
      });
    }
  }

  if (button.classList.contains("compartilhar")) {
    const texto = post.querySelector(".texto-post").textContent;

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Conecta",
          text: texto
        });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(texto);
        mostrarAviso("Texto copiado para compartilhar!");
      } else {
        mostrarAviso("Copie o texto da publicação para compartilhar.");
      }
    } catch (error) {
      if (error.name !== "AbortError") {
        mostrarAviso("Não foi possível compartilhar agora.");
      }
    }
  }
});

function filtrarPosts() {
  const termo = busca.value.toLowerCase().trim();
  const posts = [...listaPosts.querySelectorAll(".post")];

  posts.forEach(post => {
    post.hidden = !post.textContent.toLowerCase().includes(termo);
  });

  if (ordenacao.value === "curtidas") {
    posts.sort((a, b) =>
      Number(b.dataset.likes || 0) - Number(a.dataset.likes || 0)
    );
  } else {
    posts.reverse();
  }

  posts.forEach(post => listaPosts.appendChild(post));

  document.getElementById("mensagemVazia").hidden =
    posts.some(post => !post.hidden);
}

busca.addEventListener("input", filtrarPosts);
ordenacao.addEventListener("change", filtrarPosts);

document.getElementById("editarPerfil").addEventListener("click", () => {
  const nomeAtual = document.querySelector(".perfil h2").textContent;
  const novoNome = prompt("Qual nome você deseja usar?", nomeAtual);

  if (novoNome && novoNome.trim()) {
    document.querySelector(".perfil h2").textContent = novoNome.trim();
    mostrarAviso("Nome do perfil atualizado!");
  }
});

document.querySelectorAll(".seguir").forEach(button => {
  button.addEventListener("click", () => {
    const seguindo = button.dataset.seguindo === "true";

    button.dataset.seguindo = String(!seguindo);
    button.textContent = seguindo ? "+" : "✓";
    button.setAttribute(
      "aria-label",
      seguindo ? "Seguir perfil" : "Deixar de seguir"
    );

    mostrarAviso(seguindo ? "Você deixou de seguir." : "Agora você está seguindo!");
  });
});

atualizarTotal();
filtrarPosts();