
const listaPosts = document.getElementById("lista-posts");
const pesquisa = document.getElementById("pesquisa");

// Carrega os artigos salvos no navegador
let posts = JSON.parse(localStorage.getItem("meuBlogPosts")) || [];

function salvarPosts() {
  localStorage.setItem("meuBlogPosts", JSON.stringify(posts));
}

// Cria um artigo na página
function criarArtigo(post, indice) {
  const artigo = document.createElement("article");
  artigo.className = "post";

  const imagem = document.createElement("img");
  imagem.src = post.imagem || "https://placehold.co/800x400?text=Meu+Blog";
  imagem.alt = post.titulo;
  imagem.onerror = () => {
    imagem.src = "https://placehold.co/800x400?text=Meu+Blog";
  };

  const conteudo = document.createElement("div");
  conteudo.className = "post-content";

  const categoria = document.createElement("small");
  categoria.textContent = post.categoria || "Geral";

  const titulo = document.createElement("h3");
  titulo.textContent = post.titulo;

  const texto = document.createElement("p");
  texto.textContent = post.texto;

  const completo = document.createElement("p");
  completo.textContent = post.completo || "";
  completo.hidden = true;

  const botaoLer = document.createElement("button");
  botaoLer.textContent = "Ler mais";

  botaoLer.addEventListener("click", () => {
    completo.hidden = !completo.hidden;
    botaoLer.textContent = completo.hidden
      ? "Ler mais"
      : "Ler menos";
  });

  const botaoExcluir = document.createElement("button");
  botaoExcluir.textContent = "Excluir";
  botaoExcluir.style.marginLeft = "8px";

  botaoExcluir.addEventListener("click", () => {
    if (confirm("Deseja excluir este artigo?")) {
      posts.splice(indice, 1);
      salvarPosts();
      renderizarPosts();
    }
  });

  conteudo.append(
    categoria,
    titulo,
    texto,
    completo,
    botaoLer,
    botaoExcluir
  );

  artigo.append(imagem, conteudo);
  return artigo;
}

// Mostra os artigos na página
function renderizarPosts() {
  const termo = pesquisa ? pesquisa.value.toLowerCase().trim() : "";

  listaPosts.replaceChildren();

  const encontrados = posts
    .map((post, indice) => ({ post, indice }))
    .filter(({ post }) =>
      [post.titulo, post.categoria, post.texto, post.completo]
        .join(" ")
        .toLowerCase()
        .includes(termo)
    );

  encontrados.forEach(({ post, indice }) => {
    listaPosts.appendChild(criarArtigo(post, indice));
  });

  let aviso = document.getElementById("aviso-vazio");

  if (!aviso) {
    aviso = document.createElement("p");
    aviso.id = "aviso-vazio";
    listaPosts.after(aviso);
  }

  aviso.textContent = encontrados.length
    ? ""
    : "Nenhum artigo encontrado.";
}

// Pesquisa artigos enquanto você digita
if (pesquisa) {
  pesquisa.addEventListener("input", renderizarPosts);
}

// Adiciona um novo artigo
function adicionarPost(dados) {
  if (!dados.titulo.trim() || !dados.texto.trim()) {
    alert("Preencha o título e o texto do artigo.");
    return;
  }

  posts.unshift({
    titulo: dados.titulo.trim(),
    categoria: dados.categoria.trim() || "Geral",
    texto: dados.texto.trim(),
    completo: dados.completo.trim(),
    imagem: dados.imagem.trim()
  });

  salvarPosts();
  renderizarPosts();
}

// Formulário de publicação
const formulario = document.getElementById("form-post");

if (formulario) {
  formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const dados = {
      titulo: formulario.elements["titulo"].value,
      categoria: formulario.elements["categoria"].value,
      texto: formulario.elements["texto"].value,
      completo: formulario.elements["completo"].value,
      imagem: formulario.elements["imagem"].value
    };

    adicionarPost(dados);
    formulario.reset();
  });
}

// Exibe os artigos ao abrir a página
renderizarPosts();
