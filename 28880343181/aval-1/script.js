
// ===================================
// ARTIGOS DO BLOG
// ===================================

const artigos = [
    {
        titulo: "O futuro da tecnologia",
        categoria: "Tecnologia",
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800",
        descricao: "Descubra como a tecnologia está mudando o mundo.",
        conteudo: "A tecnologia está transformando a sociedade. Inteligência artificial, automação e inovação estão criando novas oportunidades e mudando a maneira como trabalhamos, estudamos e vivemos."
    \},

    {
        titulo: "Aprender todos os dias",
        categoria: "Educação",
        imagem: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800",
        descricao: "O conhecimento é uma das maiores riquezas.",
        conteudo: "Aprender é um processo contínuo. Ler livros, fazer cursos e desenvolver novas habilidades são excelentes maneiras de crescer pessoal e profissionalmente."
    \},

    {
        titulo: "Como criar seu negócio",
        categoria: "Negócios",
        imagem: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800",
        descricao: "Transforme suas ideias em oportunidades.",
        conteudo: "Para iniciar um negócio, você precisa identificar uma oportunidade, conhecer seu público, planejar suas ações e desenvolver uma solução que gere valor."
    \},

    {
        titulo: "Programação para iniciantes",
        categoria: "Tecnologia",
        imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        descricao: "Comece a desenvolver seus próprios projetos.",
        conteudo: "HTML estrutura páginas, CSS define sua aparência e JavaScript adiciona interatividade. Essas tecnologias são uma ótima porta de entrada para o desenvolvimento web."
    \},

    {
        titulo: "A importância da leitura",
        categoria: "Educação",
        imagem: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800",
        descricao: "Leia mais e amplie seus conhecimentos.",
        conteudo: "A leitura estimula a criatividade, melhora a comunicação e amplia nossa visão de mundo."
    \},

    {
        titulo: "Planejamento e sucesso",
        categoria: "Negócios",
        imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800",
        descricao: "Organize seus objetivos e alcance resultados.",
        conteudo: "Um bom planejamento ajuda a definir prioridades, organizar recursos e acompanhar os resultados de cada etapa de um projeto."
    \}
];


// ===================================
// ELEMENTOS HTML
// ===================================

const posts = document.getElementById("posts");
const search = document.getElementById("search");
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const closeButton = document.getElementById("close");
const themeButton = document.getElementById("theme");


// ===================================
// CATEGORIA SELECIONADA
// ===================================

let categoriaAtual = "Todos";


// ===================================
// MOSTRAR ARTIGOS
// ===================================

function mostrarArtigos() {

    const termo = search.value.toLowerCase();

    const filtrados = artigos.filter(artigo => {

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            artigo.categoria === categoriaAtual;

        const correspondeBusca =
            artigo.titulo.toLowerCase().includes(termo) ||
            artigo.descricao.toLowerCase().includes(termo) ||
            artigo.categoria.toLowerCase().includes(termo);

        return correspondeCategoria && correspondeBusca;

    \});

    posts.innerHTML = "";

    if (filtrados.length === 0) {
        posts.innerHTML = "<p>Nenhum artigo encontrado.</p>";
        return;
    \}

    filtrados.forEach(artigo => {

        const indice = artigos.indexOf(artigo);

        const card = document.createElement("article");

        card.className = "card";

        const imagem = document.createElement("img");
        imagem.src = artigo.imagem;
        imagem.alt = artigo.titulo;

        const conteudo = document.createElement("div");
        conteudo.className = "card-content";

        const categoria = document.createElement("span");
        categoria.className = "tag";
        categoria.textContent = artigo.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = artigo.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = artigo.descricao;

        const botao = document.createElement("button");
        botao.className = "read";
        botao.textContent = "Ler artigo →";

        botao.addEventListener("click", () => {
            lerArtigo(indice);
        \});

        conteudo.append(
            categoria,
            titulo,
            descricao,
            botao
        );

        card.append(imagem, conteudo);

        posts.appendChild(card);

    \});

\}


// ===================================
// LER ARTIGO
// ===================================

function lerArtigo(indice) {

    const artigo = artigos[indice];

    modalTitle.textContent = artigo.titulo;

    modalText.textContent = artigo.conteudo;

    modal.style.display = "flex";

\}


// ===================================
// FECHAR ARTIGO
// ===================================

closeButton.addEventListener("click", () => {

    modal.style.display = "none";

\});

modal.addEventListener("click", event => {

    if (event.target === modal) {
        modal.style.display = "none";
    \}

\});


// ===================================
// PESQUISAR ARTIGOS
// ===================================

search.addEventListener("input", () => {

    mostrarArtigos();

\});


// ===================================
// FILTRAR CATEGORIAS
// ===================================

const botoesCategorias =
    document.querySelectorAll(".categories button");

botoesCategorias.forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelector(
            ".categories .active"
        ).classList.remove("active");

        botao.classList.add("active");

        categoriaAtual = botao.dataset.category;

        mostrarArtigos();

    \});

\});


// ===================================
// MODO ESCURO
// ===================================

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    const escuro =
        document.body.classList.contains("dark");

    themeButton.textContent =
        escuro ? "☀️ Tema" : "🌙 Tema";

\});


// ===================================
// INICIALIZAR BLOG
// ===================================

mostrarArtigos();$0