
// CURTIR PUBLICAÇÃO
document.querySelectorAll(".like-btn").forEach(botao => {
  botao.addEventListener("click", () => {
    const icone = botao.querySelector("i");

    botao.classList.toggle("liked");

    if (botao.classList.contains("liked")) {
      icone.classList.replace("bx-heart", "bxs-heart");
    } else {
      icone.classList.replace("bxs-heart", "bx-heart");
    }
  });
});

// SALVAR PUBLICAÇÃO
document.querySelectorAll(".save-btn").forEach(botao => {
  botao.addEventListener("click", () => {
    const icone = botao.querySelector("i");

    botao.classList.toggle("saved");

    if (botao.classList.contains("saved")) {
      icone.classList.replace("bx-bookmark", "bxs-bookmark");
    } else {
      icone.classList.replace("bxs-bookmark", "bx-bookmark");
    }
  });
});

// MOSTRAR COMENTÁRIOS
document.querySelectorAll(".comment-toggle").forEach(botao => {
  botao.addEventListener("click", () => {
    const comentarios = botao.nextElementSibling;

    comentarios.classList.toggle("hidden");

    botao.textContent = comentarios.classList.contains("hidden")
      ? "Ver todos os comentários"
      : "Ocultar comentários";
  });
});

// CRIAR PUBLICAÇÃO
const campo = document.getElementById("postText");
const publicar = document.getElementById("publishBtn");
const feed = document.getElementById("feed");

function novaPublicacao() {
  const texto = campo.value.trim();

  if (!texto) {
    alert("Digite algo antes de publicar!");
    return;
  }

  const post = document.createElement("article");
  post.className = "card post";

  const cabecalho = document.createElement("header");
  cabecalho.className = "post-header";

  const usuario = document.createElement("div");
  usuario.className = "flex items-center gap-3";

  const foto = document.createElement("img");
  foto.className = "avatar";
  foto.src = "https://i.pravatar.cc/100?img=12";
  foto.alt = "Seu perfil";

  const nome = document.createElement("strong");
  nome.textContent = "frojo_dev";

  usuario.append(foto, nome);
  cabecalho.append(usuario);

  const conteudo = document.createElement("div");
  conteudo.className = "post-content";

  const descricao = document.createElement("p");
  descricao.className = "description";

  const nomeDesc = document.createElement("strong");
  nomeDesc.textContent = "frojo_dev";

  descricao.append(nomeDesc, document.createTextNode(" " + texto));

  const horario = document.createElement("p");
  horario.className = "post-time";
  horario.textContent = "AGORA";

  conteudo.append(descricao, horario);
  post.append(cabecalho, conteudo);

  feed.prepend(post);

  campo.value = "";
}

publicar.addEventListener("click", novaPublicacao);

campo.addEventListener("keydown", evento => {
  if (evento.key === "Enter") {
    novaPublicacao();
  }
});

// SEGUIR USUÁRIOS
document.querySelectorAll(".follow-btn").forEach(botao => {
  botao.addEventListener("click", () => {
    if (botao.textContent.trim() === "Seguir") {
      botao.textContent = "Seguindo";
    } else if (botao.textContent.trim() === "Seguindo") {
      botao.textContent = "Seguir";
    }
  });
});
