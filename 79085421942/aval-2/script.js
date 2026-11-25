const formulario = document.querySelector("#formulario");
const feed = document.querySelector("#feed");
const descricao = document.querySelector("#descricao");
const filtro = document.querySelector("#filtro");

function filtrar() {

  let quantidade = 0;

  document.querySelectorAll(".post").forEach(post => {

    const mostrar =
      filtro.value === "Todos" ||
      post.dataset.genero === filtro.value;

    post.hidden = !mostrar;

    if (mostrar) quantidade++;

  });

  document.querySelector("#vazio").hidden =
    quantidade > 0;
}

function criarPost(
  nome,
  musica,
  artista,
  genero,
  texto,
  likes = 0
) {

  const post = document.createElement("article");

  post.className = "post";
  post.dataset.genero = genero;

  post.innerHTML = `
    <div class="usuario">
      <div class="avatar"></div>

      <div>
        <strong class="nome"></strong>
        <small>Music Connect • Agora</small>
      </div>
    </div>

    <div class="faixa">

      <div class="disco">♫</div>

      <div>
        <h3 class="musica"></h3>
        <p class="artista"></p>
        <span class="tag"></span>
      </div>

    </div>

    <p class="descricao"></p>

    <div class="acoes">
      <button class="curtir">♡ Curtir</button>
      <button class="comentar">💬 Comentar</button>
    </div>

    <div class="comentarios"></div>

    <form class="form-comentario" hidden>
      <input placeholder="Escreva um comentário..."
             maxlength="150"
             required>

      <button type="submit">Enviar</button>
    </form>
  `;

  post.querySelector(".avatar").textContent =
    nome.split(" ")
      .map(palavra => palavra[0])
      .slice(0, 2)
      .join("");

  post.querySelector(".nome").textContent = nome;

  post.querySelector(".musica").textContent = musica;

  post.querySelector(".artista").textContent = artista;

  post.querySelector(".tag").textContent = genero;

  post.querySelector(".descricao").textContent = texto;

  const curtir = post.querySelector(".curtir");

  let curtido = false;

  curtir.textContent = "♡ Curtir " + likes;

  curtir.onclick = () => {

    curtido = !curtido;

    curtir.textContent = curtido
      ? "♥ Curtido " + (likes + 1)
      : "♡ Curtir " + likes;

    curtir.classList.toggle("ativo", curtido);

  };

  const formComentario =
    post.querySelector(".form-comentario");

  post.querySelector(".comentar").onclick = () => {

    formComentario.hidden = !formComentario.hidden;

    if (!formComentario.hidden) {
      formComentario.querySelector("input").focus();
    }

  };

  formComentario.onsubmit = evento => {

    evento.preventDefault();

    const campo = formComentario.querySelector("input");

    const mensagem = campo.value.trim();

    if (!mensagem) return;

    const comentario = document.createElement("p");

    comentario.textContent =
      "David Rafael: " + mensagem;

    post.querySelector(".comentarios").append(comentario);

    formComentario.reset();

  };

  feed.prepend(post);

  filtrar();

}

descricao.oninput = () => {

  document.querySelector("#contador").textContent =
    descricao.value.length + "/240";

};

filtro.onchange = filtrar;

formulario.onsubmit = evento => {

  evento.preventDefault();

  const musica =
    document.querySelector("#musica").value.trim();

  const artista =
    document.querySelector("#artista").value.trim();

  const genero =
    document.querySelector("#genero").value;

  const texto = descricao.value.trim();

  if (!musica || !artista || !texto) return;

  filtro.value = "Todos";

  criarPost(
    "David Rafael",
    musica,
    artista,
    genero,
    texto
  );

  formulario.reset();

  document.querySelector("#contador").textContent =
    "0/240";

};

criarPost(
  "Music Connect",
  "In the End",
  "Linkin Park",
  "Rock",
  "Uma música marcante que combina rock e elementos de rap.",
  24
);

criarPost(
  "David Rafael",
  "Blinding Lights",
  "The Weeknd",
  "Pop",
  "Uma produção musical com sintetizadores e influência dos anos 80.",
  18
);

criarPost(
  "Music Connect",
  "Around the World",
  "Daft Punk",
  "Eletrônica",
  "Uma ótima indicação para conhecer a música eletrônica.",
  15
);