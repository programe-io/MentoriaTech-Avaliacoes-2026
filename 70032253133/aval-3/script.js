function publicar() {
  const usuario = document.getElementById("usuario").value.trim();
  const texto = document.getElementById("texto").value.trim();
  const imagem = document.getElementById("imagem").value.trim();
  const postagens = document.getElementById("postagens");

  if (usuario === "" || texto === "") {
    alert("Preencha seu nome e sua publicação!");
    return;
  }

  const post = document.createElement("div");
  post.className = "post";

  const nome = document.createElement("h3");
  nome.textContent = usuario;

  const legenda = document.createElement("p");
  legenda.textContent = texto;

  post.appendChild(nome);

  if (imagem !== "") {
    const foto = document.createElement("img");
    foto.src = imagem;
    foto.alt = "Imagem da publicação";
    post.appendChild(foto);
  }

  post.appendChild(legenda);

  const curtir = document.createElement("button");
  let curtidas = 0;

  curtir.textContent = "❤️ Curtir";

  curtir.onclick = function() {
    curtidas++;
    curtir.textContent = "❤️ Curtido " + curtidas;
  };

  post.appendChild(curtir);
  postagens.prepend(post);

  document.getElementById("usuario").value = "";
  document.getElementById("texto").value = "";
  document.getElementById("imagem").value = "";
}