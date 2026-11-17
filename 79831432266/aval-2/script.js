
let seguidores = 120;
let quantidadePosts = 0;

function mostrarAba(nome) {
  document.querySelectorAll(".aba").forEach(aba => {
    aba.classList.add("escondido");
  });

  document.getElementById(nome).classList.remove("escondido");
}

function seguir() {
  seguidores++;
  document.getElementById("seguidores").textContent = seguidores;
  document.getElementById("seguidoresPerfil").textContent = seguidores;
}

function publicar() {
  const legenda = document.getElementById("legenda").value;
  const arquivo = document.getElementById("arquivo").files[0];

  if (!legenda.trim() && !arquivo) {
    alert("Escreva algo ou escolha uma imagem ou vídeo!");
    return;
  }

  const post = document.createElement("article");
  post.className = "post";

  const titulo = document.createElement("h3");
  titulo.textContent = "Lorrane";
  post.appendChild(titulo);

  if (legenda.trim()) {
    const texto = document.createElement("p");
    texto.textContent = legenda;
    post.appendChild(texto);
  }

  if (arquivo) {
    const url = URL.createObjectURL(arquivo);
    let midia;

    if (arquivo.type.startsWith("image/")) {
      midia = document.createElement("img");
    } else if (arquivo.type.startsWith("video/")) {
      midia = document.createElement("video");
      midia.controls = true;
    } else {
      alert("Escolha uma imagem ou vídeo válido.");
      return;
    }

    midia.src = url;
    post.appendChild(midia);
  }

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  const curtida = document.createElement("button");
  let curtidas = 0;
  curtida.textContent = "♡ Curtir (0)";

  curtida.onclick = () => {
    curtidas++;
    curtida.textContent = `❤️ Curtir (${curtidas})`;
  };

  acoes.appendChild(curtida);
  post.appendChild(acoes);

  const areaComentarios = document.createElement("div");
  areaComentarios.className = "comentarios";

  const campo = document.createElement("input");
  campo.placeholder = "Escreva um comentário...";

  const botao = document.createElement("button");
  botao.textContent = "Comentar";

  const lista = document.createElement("div");

  botao.onclick = () => {
    if (!campo.value.trim()) return;

    const comentario = document.createElement("p");
    comentario.className = "comentario";
    comentario.textContent = "Visitante: " + campo.value;
    lista.appendChild(comentario);
    campo.value = "";
  };

  areaComentarios.append(campo, botao, lista);
  post.appendChild(areaComentarios);

  document.getElementById("feed").prepend(post);

  quantidadePosts++;
  document.getElementById("totalPosts").textContent =
    quantidadePosts + " publicações";

  document.getElementById("legenda").value = "";
  document.getElementById("arquivo").value = "";
}

function enviarMensagem() {
  const campo = document.getElementById("mensagem");

  if (!campo.value.trim()) return;

  const texto = document.createElement("p");
  texto.textContent = "Você: " + campo.value;

  document.getElementById("conversa").appendChild(texto);
  campo.value = "";
}

document.getElementById("pesquisa").addEventListener("input", function() {
  const busca = this.value.toLowerCase();

  document.querySelectorAll(".post").forEach(post => {
    post.style.display = post.textContent.toLowerCase().includes(busca)
      ? "block"
      : "none";
  });
});
