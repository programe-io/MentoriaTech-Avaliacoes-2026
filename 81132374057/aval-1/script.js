const posts = [
  {
    id: 1,
    titulo: "Por que começar simples na web",
    categoria: "Código",
    data: "26 Nov 2026",
    resumo: "HTML, CSS e JavaScript puros carregam rápido e ensinam o essencial antes de frameworks.",
    paragrafos: [
      "Um blog estático não precisa de build complexo para publicar textos com boa leitura e desempenho.",
      "Conforme o projeto cresce, você pode mover os artigos para arquivos JSON ou publicar direto via API."
    ]
  },
  {
    id: 2,
    titulo: "Rotina de leitura semanal",
    categoria: "Livros",
    data: "18 Nov 2026",
    resumo: "Vinte minutos antes de dormir mantêm a constância sem depender de metas exageradas.",
    paragrafos: [
      "Deixar o livro sobre o travesseiro reduz o atrito em comparação ao celular.",
      "Anotar uma frase por capítulo ajuda a lembrar o que fez sentido meses depois."
    ]
  },
  {
    id: 3,
    titulo: "Pequenas pausas no expediente",
    categoria: "Vida",
    data: "10 Nov 2026",
    resumo: "Levantar da cadeira por cinco minutos melhora o foco mais do que insistir cansado.",
    paragrafos: [
      "Caminhar sem tela no meio da tarde renova a atenção para tarefas que exigem clareza."
    ]
  }
];

let categoriaAtiva = "Todos";
let termoBusca = "";

const listaPosts = document.getElementById("lista-posts");
const buscaInput = document.getElementById("busca");
const botoesFiltro = document.querySelectorAll("#filtros button");
const toggleTema = document.getElementById("toggle-tema");
const modal = document.getElementById("modal-post");
const fecharModal = document.getElementById("fechar-modal");

function renderizarPosts() {
  const filtrados = posts.filter((post) => {
    const bateCategoria = categoriaAtiva === "Todos" || post.categoria === categoriaAtiva;
    const texto = `${post.titulo} ${post.resumo} ${post.categoria}`.toLowerCase();
    const bateBusca = texto.includes(termoBusca.trim().toLowerCase());
    return bateCategoria && bateBusca;
  });

  if (filtrados.length === 0) {
    listaPosts.innerHTML = "<p>Nenhum post encontrado.</p>";
    return;
  }

  listaPosts.innerHTML = filtrados
    .map(
      (post) => `
      <article class="card">
        <span class="meta">${post.categoria} · ${post.data}</span>
        <h2>${post.titulo}</h2>
        <p>${post.resumo}</p>
        <button type="button" onclick="abrirPost(${post.id})">Ler artigo</button>
      </article>
    `
    )
    .join("");
}

function abrirPost(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  document.getElementById("modal-meta").textContent = `${post.categoria} · ${post.data}`;
  document.getElementById("modal-titulo").textContent = post.titulo;
  document.getElementById("modal-corpo").innerHTML = post.paragrafos
    .map((p) => `<p>${p}</p>`)
    .join("");

  modal.showModal();
}

buscaInput.addEventListener("input", (e) => {
  termoBusca = e.target.value;
  renderizarPosts();
});

botoesFiltro.forEach((btn) => {
  btn.addEventListener("click", () => {
    botoesFiltro.forEach((b) => b.classList.remove("ativo"));
    btn.classList.add("ativo");
    categoriaAtiva = btn.dataset.categoria;
    renderizarPosts();
  });
});

toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const escuro = document.body.classList.contains("dark");
  localStorage.setItem("tema-escuro", escuro);
  toggleTema.textContent = escuro ? "Modo claro" : "Modo escuro";
});

fecharModal.addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.close();
});

if (localStorage.getItem("tema-escuro") === "true") {
  document.body.classList.add("dark");
  toggleTema.textContent = "Modo claro";
}

renderizarPosts();
