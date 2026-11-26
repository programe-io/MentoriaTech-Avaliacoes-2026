
function publicar() {
  let texto = document.getElementById("novoPost").value;

  if (texto.trim() === "") {
    alert("Digite algo para publicar!");
    return;
  }

  let post = document.createElement("article");
  post.className = "card post";
  post.innerHTML = `
    <strong>Alex Silva</strong>
    <p class="post-text">${texto}</p>
    <button onclick="curtir(this)">♡ Curtir</button>
  `;

  document.getElementById("feed").prepend(post);
  document.getElementById("novoPost").value = "";
}

function curtir(botao) {
  botao.innerText = "♥ Curtido";
  botao.disabled = true;
}
