// Curtir publicações
document.querySelectorAll(".curtir").forEach((botao) => {
  botao.addEventListener("click", () => {
    const post = botao.closest(".post");
    const likes = post.querySelector(".likes");

    botao.classList.toggle("curtido");

    if (botao.classList.contains("curtido")) {
      botao.textContent = "♥";
      likes.textContent = "❤️ Você curtiu esta publicação!";
    } else {
      botao.textContent = "♡";
      likes.textContent = "Publicação curtida";
    }
  });
});

// Pesquisa de publicações
const pesquisa = document.getElementById("pesquisa");

pesquisa.addEventListener("input", () => {
  const termo = pesquisa.value.toLowerCase();

  document.querySelectorAll(".post").forEach((post) => {
    const conteudo = post.innerText.toLowerCase();

    post.style.display = conteudo.includes(termo)
      ? "block"
      : "none";
  });
});

// Publicar comentários
document.querySelectorAll(".form-comentario").forEach((formulario) => {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const campo = formulario.querySelector("input");
    const comentario = campo.value.trim();

    if (comentario === "") {
      mostrarAviso("Digite um comentário primeiro!");
      return;
    }

    const novoComentario = document.createElement("p");
    novoComentario.innerHTML = `<strong>@wagnerfx7_:</strong> ${escaparHTML(comentario)}`;

    formulario.previousElementSibling.appendChild(novoComentario);

    campo.value = "";
    mostrarAviso("Comentário publicado!");
  });
});

// Botões de seguir
document.querySelectorAll(".seguir").forEach((botao) => {
  botao.addEventListener("click", () => {
    if (botao.textContent === "Seguir") {
      botao.textContent = "Seguindo";
      mostrarAviso("Você começou a seguir!");
    } else {
      botao.textContent = "Seguir";
      mostrarAviso("Você deixou de seguir.");
    }
  });
});

// Editar perfil
document.getElementById("editarPerfil").addEventListener("click", () => {
  const novoNome = prompt("Digite o nome que deseja usar no perfil:");

  if (novoNome && novoNome.trim() !== "") {
    document.querySelector(".perfil-info h2").innerHTML =
      `${escaparHTML(novoNome.trim())} <span class="verificado">✓</span>`;

    mostrarAviso("Nome do perfil atualizado!");
  }
});

// Compartilhar publicação
document.querySelectorAll(".compartilhar").forEach((botao) => {
  botao.addEventListener("click", async () => {
    const texto = "Confira esta publicação no InsMarvel!";

    try {
      await navigator.clipboard.writeText(texto);
      mostrarAviso("Texto copiado para compartilhar!");
    } catch {
      mostrarAviso("Não foi possível copiar automaticamente.");
    }
  });
});

// Salvar publicação
document.querySelectorAll(".salvar").forEach((botao) => {
  botao.addEventListener("click", () => {
    botao.textContent = botao.textContent === "♧" ? "🔖" : "♧";
    mostrarAviso("Publicação atualizada!");
  });
});

// Botão de comentário
document.querySelectorAll(".comentar").forEach((botao) => {
  botao.addEventListener("click", () => {
    const campo = botao.closest(".post").querySelector(".form-comentario input");
    campo.focus();
  });
});

// Stories
document.querySelectorAll(".story").forEach((story) => {
  story.addEventListener("click", () => {
    const nome = story.querySelector("span").textContent;
    mostrarAviso("Você abriu o story: " + nome);
  });
});

// Mensagens na tela
function mostrarAviso(mensagem) {
  const aviso = document.getElementById("aviso");

  aviso.textContent = mensagem;
  aviso.classList.add("mostrar");

  setTimeout(() => {
    aviso.classList.remove("mostrar");
  }, 2500);
}

// Evita inserir HTML digitado pelo usuário nos comentários e nome
function escaparHTML(texto) {
  const elemento = document.createElement("div");
  elemento.textContent = texto;
  return elemento.innerHTML;
}