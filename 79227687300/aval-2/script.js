
const feed = document.getElementById("feed");

document.getElementById("publicar").addEventListener("click", () => {
  const autor = document.getElementById("autor").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  if (!autor || !mensagem) {
    alert("Digite seu nome e sua publicação!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const titulo = document.createElement("h3");
  titulo.textContent = "@" + autor.replace(/^@+/, "");

  const texto = document.createElement("p");
  texto.textContent = mensagem;

  post.append(titulo, texto, criarBotaoCurtir(), criarComentarios());
  feed.prepend(post);

  document.getElementById("autor").value = "";
  document.getElementById("mensagem").value = "";
});

function criarBotaoCurtir() {
  const botao = document.createElement("button");
  botao.className = "curtir";
  botao.innerHTML = '❤️ Curtir <span>0</span>';

  botao.addEventListener("click", () => {
    const contador = botao.querySelector("span");
    const curtiu = botao.dataset.curtiu === "sim";
    const total = Number(contador.textContent);

    contador.textContent = total + (curtiu ? -1 : 1);
    botao.dataset.curtiu = curtiu ? "nao" : "sim";
    botao.style.fontWeight = curtiu ? "normal" : "bold";
  });

  return botao;
}

function criarComentarios() {
  const area = document.createElement("div");
  area.className = "comentarios";

  const entrada = document.createElement("input");
  entrada.placeholder = "Escreva um comentário...";

  const botao = document.createElement("button");
  botao.textContent = "Enviar";

  const lista = document.createElement("div");
  lista.className = "lista-comentarios";

  botao.addEventListener("click", () => {
    const texto = entrada.value.trim();
    if (!texto) return;

    const comentario = document.createElement("p");
    comentario.textContent = "💬 " + texto;
    lista.appendChild(comentario);
    entrada.value = "";
  });

  area.append(entrada, botao, lista);
  return area;
}

// Ativa as curtidas e os comentários das publicações iniciais.
document.querySelectorAll(".post").forEach((post) => {
  const botaoAntigo = post.querySelector(".curtir");
  const novoBotao = criarBotaoCurtir();
  novoBotao.querySelector("span").textContent =
    botaoAntigo.querySelector("span").textContent;
  botaoAntigo.replaceWith(novoBotao);

  const areaAntiga = post.querySelector(".comentarios");
  const novaArea = criarComentarios();
  areaAntiga.replaceWith(novaArea);
});
