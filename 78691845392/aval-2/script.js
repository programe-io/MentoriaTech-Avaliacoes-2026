const formulario = document.querySelector("#formulario");
const arquivo = document.querySelector("#arquivo");
const preview = document.querySelector("#preview");
const legenda = document.querySelector("#legenda");
const feed = document.querySelector("#feed");
const filtro = document.querySelector("#filtro");
const aviso = document.querySelector("#aviso");

let imagemSelecionada = "";
let carregando = false;
let leituraAtual = 0;

arquivo.addEventListener("change", () => {

  const foto = arquivo.files[0];
  const leitura = ++leituraAtual;

  imagemSelecionada = "";
  preview.hidden = true;
  aviso.textContent = "";
  carregando = false;

  if (!foto) return;

  const formatos = [
    "image/jpeg",
    "image/png",
    "image/webp"
  ];

  if (!formatos.includes(foto.type)) {

    aviso.textContent = "Selecione uma imagem JPG, PNG ou WEBP.";

    arquivo.value = "";

    return;

  }

  if (foto.size > 5 * 1024 * 1024) {

    aviso.textContent = "A fotografia deve possuir até 5 MB.";

    arquivo.value = "";

    return;

  }

  carregando = true;

  const leitor = new FileReader();

  leitor.onload = evento => {

    if (leitura !== leituraAtual) return;

    imagemSelecionada = evento.target.result;

    preview.src = imagemSelecionada;

    preview.hidden = false;

    carregando = false;

    aviso.textContent = "Fotografia selecionada com sucesso.";

  };

  leitor.onerror = () => {

    if (leitura !== leituraAtual) return;

    carregando = false;

    aviso.textContent = "Não foi possível abrir a fotografia.";

  };

  leitor.readAsDataURL(foto);

});

legenda.addEventListener("input", () => {

  document.querySelector("#contador").textContent =
    legenda.value.length + "/300";

});

function filtrar() {

  let total = 0;

  document.querySelectorAll(".post").forEach(post => {

    const mostrar =
      filtro.value === "Todas" ||
      post.dataset.categoria === filtro.value;

    post.hidden = !mostrar;

    if (mostrar) total++;

  });

  document.querySelector("#vazio").hidden = total > 0;

}

function criarPost(nome, texto, categoria, imagem, proprio, likes = 0) {

  const post = document.createElement("article");

  post.className = "post";

  post.dataset.categoria = categoria;

  post.innerHTML = `
    <div class="autor">

      <div class="avatar"></div>

      <div>
        <strong class="nome"></strong>
        <small>ClickShare • Fotografia</small>
      </div>

    </div>

    <img class="foto-post" alt="Fotografia publicada">

    <span class="tag"></span>

    <p class="legenda"></p>

    <div class="acoes">

      <button class="curtir">♡ Curtir</button>

      <button class="comentar">💬 Comentar</button>

    </div>

    <div class="comentarios"></div>

    <form class="comentario-form" hidden>

      <input placeholder="Escreva um comentário..."
             maxlength="180"
             required>

      <button type="submit">Enviar</button>

    </form>
  `;

  post.querySelector(".avatar").textContent =
    nome[0].toUpperCase();

  post.querySelector(".nome").textContent = nome;

  post.querySelector(".foto-post").src = imagem;

  post.querySelector(".tag").textContent = categoria;

  post.querySelector(".legenda").textContent = texto;

  const curtir = post.querySelector(".curtir");

  let curtido = false;

  curtir.textContent = "♡ Curtir " + likes;

  curtir.onclick = () => {

    curtido = !curtido;

    curtir.classList.toggle("curtido", curtido);

    curtir.textContent = curtido
      ? "♥ Curtido " + (likes + 1)
      : "♡ Curtir " + likes;

  };

  const formComentario =
    post.querySelector(".comentario-form");

  post.querySelector(".comentar").onclick = () => {

    formComentario.hidden = !formComentario.hidden;

    if (!formComentario.hidden) {

      formComentario.querySelector("input").focus();

    }

  };

  formComentario.onsubmit = evento => {

    evento.preventDefault();

    const campo = formComentario.querySelector("input");

    const texto = campo.value.trim();

    if (!texto) return;

    const comentario = document.createElement("p");

    comentario.textContent = "Débora: " + texto;

    post.querySelector(".comentarios").append(comentario);

    formComentario.reset();

  };

  if (proprio) {

    const excluir = document.createElement("button");

    excluir.className = "excluir";

    excluir.textContent = "Excluir";

    excluir.onclick = () => {

      post.remove();

      filtrar();

    };

    post.querySelector(".acoes").append(excluir);

  }

  feed.prepend(post);

  filtrar();

}

formulario.onsubmit = evento => {

  evento.preventDefault();

  const texto = legenda.value.trim();

  const categoria =
    document.querySelector("#categoria").value;

  if (carregando) {

    aviso.textContent = "A fotografia ainda está sendo carregada.";

    return;

  }

  if (!texto || !imagemSelecionada) {

    aviso.textContent = "Adicione uma fotografia e uma legenda.";

    return;

  }

  filtro.value = "Todas";

  criarPost(
    "Débora",
    texto,
    categoria,
    imagemSelecionada,
    true
  );

  formulario.reset();

  imagemSelecionada = "";

  preview.hidden = true;

  preview.removeAttribute("src");

  document.querySelector("#contador").textContent = "0/300";

  aviso.textContent = "Fotografia publicada!";

};

filtro.onchange = filtrar;

criarPost(
  "ClickShare Studio",
  "A natureza oferece possibilidades infinitas de composição e iluminação.",
  "Natureza",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=900",
  false,
  35
);

criarPost(
  "Comunidade ClickShare",
  "A fotografia urbana permite encontrar beleza em lugares comuns.",
  "Fotografia urbana",
  "https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=900",
  false,
  22
);