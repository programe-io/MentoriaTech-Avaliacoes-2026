
function alternarMenu() {
    document.querySelector("nav").classList.toggle("aberto");
}

// Filtrar publicações por categoria
function filtrar(categoria, botao) {
    const posts = document.querySelectorAll(".post");

    document.querySelectorAll(".categories button")
        .forEach(btn => btn.classList.remove("active"));

    botao.classList.add("active");

    posts.forEach(post => {
        const tipo = post.dataset.categoria;

        post.style.display =
            categoria === "Todos" || tipo === categoria
            ? "block" : "none";
    });
}

// Pesquisar artigos
function pesquisar() {
    const termo = document.getElementById("pesquisa")
        .value.toLowerCase();

    const posts = document.querySelectorAll(".post");

    posts.forEach(post => {
        const conteudo = post.innerText.toLowerCase();

        post.style.display = conteudo.includes(termo)
            ? "block" : "none";
    });
}

// Abrir artigo completo
function lerArtigo(titulo, texto) {
    document.getElementById("tituloModal").innerText = titulo;
    document.getElementById("textoModal").innerText = texto;

    document.getElementById("modal").style.display = "flex";
}

// Fechar artigo
function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

// Fechar modal clicando fora
document.getElementById("modal").addEventListener("click", function(event) {
    if (event.target === this) {
        fecharModal();
    }
});

// Inscrição na newsletter
function inscrever(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    document.getElementById("mensagem").innerText =
        "Obrigado! O e-mail " + email + " foi cadastrado com sucesso!";

    document.getElementById("email").value = "";
}
