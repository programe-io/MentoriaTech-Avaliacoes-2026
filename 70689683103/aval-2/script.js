
// Sistema de curtidas
document.querySelectorAll(".curtir").forEach(botao => {
  botao.addEventListener("click", () => {
    const contador = botao.querySelector("span");
    let curtidas = Number(contador.textContent);

    if (botao.classList.contains("ativo")) {
      curtidas--;
      botao.classList.remove("ativo");
      botao.style.background = "#087e55";
    } else {
      curtidas++;
      botao.classList.add("ativo");
      botao.style.background = "#d6336c";
    }

    contador.textContent = curtidas;
  });
});

// Sistema de comentários
document.querySelectorAll(".comentar").forEach(botao => {
  botao.addEventListener("click", () => {
    const comentario = prompt("Digite seu comentário:");

    if (comentario && comentario.trim() !== "") {
      const area = botao.parentElement.querySelector(".comentarios");
      const novoComentario = document.createElement("p");

      novoComentario.textContent = "💬 " + comentario;
      area.appendChild(novoComentario);
    }
  });
});

// Criar novas publicações
document.getElementById("publicar").addEventListener("click", () => {
  const campo = document.getElementById("novoPost");
  const texto = campo.value.trim();

  if (texto === "") {
    alert("Escreva algo antes de publicar!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  post.innerHTML = `
    <div class="post-conteudo">
      <h3>📝 Nova publicação</h3>
      <p></p>
      <button class="curtir">❤️ Curtir <span>0</span></button>
      <button class="comentar">💬 Comentar</button>
      <div class="comentarios"></div>
    </div>
  `;

  post.querySelector(".post-conteudo p").textContent = texto;

  const feed = document.getElementById("feed");
  feed.appendChild(post);

  campo.value = "";
  alert("Publicação realizada com sucesso!");

  // Ativar os botões da nova publicação
  ativarBotoes(post);
});

// Ativa curtidas e comentários em qualquer publicação
function ativarBotoes(post) {
  const curtir = post.querySelector(".curtir");

  curtir.addEventListener("click", () => {
    const contador = curtir.querySelector("span");
    let numero = Number(contador.textContent);

    if (curtir.classList.contains("ativo")) {
      numero--;
      curtir.classList.remove("ativo");
      curtir.style.background = "#087e55";
    } else {
      numero++;
      curtir.classList.add("ativo");
      curtir.style.background = "#d6336c";
    }

    contador.textContent = numero;
  });

  const comentar = post.querySelector(".comentar");

  comentar.addEventListener("click", () => {
    const texto = prompt("Digite seu comentário:");

    if (texto && texto.trim() !== "") {
      const area = post.querySelector(".comentarios");
      const novo = document.createElement("p");
      novo.textContent = "💬 " + texto;
      area.appendChild(novo);
    }
  });
}
