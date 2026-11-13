
function publicar() {
  const texto = document.getElementById("texto");
  const feed = document.getElementById("feed");

  if (texto.value.trim() === "") {
    alert("Digite alguma coisa!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const titulo = document.createElement("h3");
  titulo.textContent = "🔥 Novo jogador";

  const mensagem = document.createElement("p");
  mensagem.textContent = texto.value;

  const actions = document.createElement("div");
  actions.className = "actions";

  const like = document.createElement("button");
  like.innerHTML = '❤️ Curtir <span>0</span>';
  like.onclick = () => curtir(like);

  const comment = document.createElement("button");
  comment.textContent = "💬 Comentar";
  comment.onclick = () => comentar(comment);

  actions.append(like, comment);
  post.append(titulo, mensagem, actions);

  feed.prepend(post);
  texto.value = "";
}

function curtir(botao) {
  const contador = botao.querySelector("span");
  contador.textContent = Number(contador.textContent) + 1;
}

function comentar(botao) {
  const comentario = prompt("Digite seu comentário:");

  if (comentario && comentario.trim()) {
    const novo = document.createElement("p");
    novo.textContent = "💬 " + comentario;
    botao.parentElement.parentElement.appendChild(novo);
  }
}
