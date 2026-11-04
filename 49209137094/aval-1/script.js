const pesquisa = document.getElementById("pesquisa");
const botoesFiltro = document.querySelectorAll(".filtro");
const listaArtigos = document.getElementById("lista-artigos");
const formulario = document.getElementById("form-artigo");

let categoriaAtual = "Todos";

// Pesquisar e filtrar artigos
function filtrarArtigos() {
    const texto = pesquisa.value.toLowerCase();
    const artigos = document.querySelectorAll(".card");

    let encontrados = 0;

    artigos.forEach(artigo => {
        const categoria = artigo.dataset.categoria;
        const conteudo = artigo.textContent.toLowerCase();

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            categoria === categoriaAtual;

        const correspondeTexto = conteudo.includes(texto);

        const mostrar = correspondeCategoria && correspondeTexto;

        artigo.style.display = mostrar ? "block" : "none";

        if (mostrar) encontrados++;
    \});

    document.getElementById("sem-resultados").hidden =
        encontrados > 0;
\}

pesquisa.addEventListener("input", filtrarArtigos);

botoesFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        botoesFiltro.forEach(b => b.classList.remove("ativo"));

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        filtrarArtigos();
    \});
\});

// Curtir artigos
listaArtigos.addEventListener("click", event => {
    const botao = event.target.closest(".curtir");

    if (!botao) return;

    const contador = botao.querySelector("span");

    let curtidas = Number(contador.textContent);

    curtidas++;

    contador.textContent = curtidas;
    botao.firstChild.textContent = "♥ ";
\});

// Criar novos artigos
formulario.addEventListener("submit", event => {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const imagem = document.getElementById("imagem").value;
    const descricao = document.getElementById("descricao").value;

    const artigo = document.createElement("article");

    artigo.className = "card";
    artigo.dataset.categoria = categoria;

    const foto = document.createElement("img");
    foto.src = imagem || "https://placehold.co/600x400?text=Meu+Blog";
    foto.alt = titulo;

    foto.onerror = () => {
        foto.src = "https://placehold.co/600x400?text=Meu+Blog";
    \};

    const conteudo = document.createElement("div");
    conteudo.className = "conteudo";

    const etiqueta = document.createElement("span");
    etiqueta.textContent = categoria;

    const tituloElemento = document.createElement("h3");
    tituloElemento.textContent = titulo;

    const descricaoElemento = document.createElement("p");
    descricaoElemento.textContent = descricao;

    const curtir = document.createElement("button");
    curtir.className = "curtir";
    curtir.innerHTML = "♡ <span>0</span>";

    conteudo.append(
        etiqueta,
        tituloElemento,
        descricaoElemento,
        curtir
    );

    artigo.append(foto, conteudo);

    listaArtigos.prepend(artigo);

    formulario.reset();

    categoriaAtual = "Todos";
    pesquisa.value = "";

    botoesFiltro.forEach(b => b.classList.remove("ativo"));
    document.querySelector('[data-categoria="Todos"]')
        .classList.add("ativo");

    filtrarArtigos();

    alert("Artigo publicado com sucesso!");
\});

// Alternar tema
const botaoTema = document.getElementById("tema");

botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("escuro");

    const escuro = document.body.classList.contains("escuro");

    botaoTema.textContent = escuro ? "☀️" : "🌙";
\});$0