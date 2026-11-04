function curtir(botao) {

  let postagem = botao.closest(".post");
  let likes = postagem.querySelector(".likes");

  let quantidade = Number(
    likes.dataset.quantidade || 
    likes.textContent.replace(/\D/g, "")
  );

  if (botao.textContent === "♡") {

    botao.textContent = "♥";
    botao.style.color = "red";
    quantidade++;

  } else {

    botao.textContent = "♡";
    botao.style.color = "black";
    quantidade--;

  }

  likes.dataset.quantidade = quantidade;
  likes.textContent = quantidade + " curtidas";
}

function comentar() {

  let mensagem = prompt("Digite seu comentário:");

  if (mensagem && mensagem.trim()) {
    alert("Comentário enviado: " + mensagem);
  }

}

function novaPublicacao() {

  let legenda = prompt("Digite a legenda da publicação:");

  if (!legenda || !legenda.trim()) {
    return;
  }

  let postagem = document.createElement("div");

  postagem.className = "post";

  let usuario = document.createElement("div");
  usuario.className = "usuario";
  usuario.innerHTML = "<strong>Meu perfil</strong>";

  let texto = document.createElement("p");
  texto.textContent = legenda;

  let botoes = document.createElement("div");
  botoes.className = "botoes";

  let curtirBotao = document.createElement("button");
  curtirBotao.textContent = "♡";
  curtirBotao.onclick = function() {
    curtir(this);
  };

  let likes = document.createElement("p");
  likes.className = "likes";
  likes.textContent = "0 curtidas";

  botoes.appendChild(curtirBotao);

  postagem.appendChild(usuario);
  postagem.appendChild(texto);
  postagem.appendChild(botoes);
  postagem.appendChild(likes);

  document.getElementById("feed")
    .prepend(postagem);

  alert("Publicação criada com sucesso!");
}