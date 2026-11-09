function publicar() {
  const mensagem = document.getElementById("mensagem");
  const feed = document.getElementById("feed");

  if (mensagem.value.trim() === "") {
    alert("Escreva alguma coisa antes de publicar!");
    return;
  }

  const postagem = document.createElement("div");
  postagem.className = "postagem";

  const texto = document.createElement("p");
  texto.textContent = mensagem.value;

  const curtir = document.createElement("button");
  curtir.textContent = "❤️ Curtir";

  let curtidas = 0;

  curtir.onclick = function() {
    curtidas++;
    curtir.textContent = "❤️ Curtido (" + curtidas + ")";
  };

  postagem.appendChild(texto);
  postagem.appendChild(curtir);

  feed.prepend(postagem);

  mensagem.value = "";
}