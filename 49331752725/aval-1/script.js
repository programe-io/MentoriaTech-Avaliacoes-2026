const posts = [
    {
        titulo: "O futuro da tecnologia",
        categoria: "Tecnologia",
        imagem: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600",
        descricao: "A tecnologia está transformando o mundo. Inteligência artificial, robótica e novas ferramentas estão criando oportunidades incríveis para o futuro."
    \},
    {
        titulo: "Como começar a programar",
        categoria: "Programação",
        imagem: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600",
        descricao: "Aprender programação pode abrir muitas portas. Comece estudando HTML, CSS e JavaScript e pratique criando pequenos projetos."
    \},
    {
        titulo: "A importância do design",
        categoria: "Design",
        imagem: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=600",
        descricao: "O design é essencial para criar experiências agradáveis. Cores, formas e organização ajudam a transmitir mensagens."
    \}
];

const container = document.getElementById("posts");
const pesquisa = document.getElementById("pesquisa");
let categoriaAtual = "Todos";

function renderizarPosts() {
    container.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const filtrados = posts.filter(post => {
        const combinaCategoria =
            categoriaAtual === "Todos" ||
            post.categoria === categoriaAtual;

        const combinaPesquisa =
            post.titulo.toLowerCase().includes(termo) ||
            post.descricao.toLowerCase().includes(termo);

        return combinaCategoria && combinaPesquisa;
    \});

    if (filtrados.length === 0) {
        container.innerHTML = "<p>Nenhum artigo encontrado.</p>";
        return;
    \}

    filtrados.forEach(post => {
        const card = document.createElement("article");
        card.className = "card";

        const img = document.createElement("img");
        img.src = post.imagem || "https://placehold.co/600x400?text=Blog";
        img.alt = post.titulo;

        const info = document.createElement("div");
        info.className = "card-info";

        const categoria = document.createElement("small");
        categoria.textContent = post.categoria;

        const titulo = document.createElement("h3");
        titulo.textContent = post.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = post.descricao.slice(0, 100) + "...";

        const botao = document.createElement("button");
        botao.textContent = "Ler artigo →";
        botao.addEventListener("click", () => abrirArtigo(post));

        info.append(categoria, titulo, descricao, botao);
        card.append(img, info);
        container.appendChild(card);
    \});
\}

function abrirArtigo(post) {
    document.getElementById("modalTitulo").textContent = post.titulo;
    document.getElementById("modalCategoria").textContent = post.categoria;
    document.getElementById("modalTexto").textContent = post.descricao;
    document.getElementById("modal").style.display = "flex";
\}

document.getElementById("fecharModal").onclick = () => {
    document.getElementById("modal").style.display = "none";
\};

document.getElementById("modal").addEventListener("click", e => {
    if (e.target.id === "modal") {
        e.currentTarget.style.display = "none";
    \}
\});

pesquisa.addEventListener("input", renderizarPosts);

document.querySelectorAll(".filtro").forEach(botao => {
    botao.addEventListener("click", () => {
        document.querySelector(".filtro.ativo").classList.remove("ativo");
        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;
        renderizarPosts();
    \});
\});

document.getElementById("formPost").addEventListener("submit", e => {
    e.preventDefault();

    const novoPost = {
        titulo: document.getElementById("titulo").value.trim(),
        categoria: document.getElementById("categoria").value,
        imagem: document.getElementById("imagem").value.trim(),
        descricao: document.getElementById("descricao").value.trim()
    \};

    if (!novoPost.titulo || !novoPost.categoria || !novoPost.descricao) {
        alert("Preencha os campos obrigatórios!");
        return;
    \}

    posts.unshift(novoPost);

    e.target.reset();

    categoriaAtual = "Todos";
    pesquisa.value = "";

    document.querySelectorAll(".filtro").forEach(botao => {
        botao.classList.toggle(
            "ativo",
            botao.dataset.categoria === "Todos"
        );
    \});

    renderizarPosts();

    alert("Artigo publicado com sucesso!");
\});

document.getElementById("darkMode").addEventListener("click", () => {
    document.body.classList.toggle("escuro");

    const escuro = document.body.classList.contains("escuro");

    document.getElementById("darkMode").textContent =
        escuro ? "☀️" : "🌙";
\});

renderizarPosts();$0