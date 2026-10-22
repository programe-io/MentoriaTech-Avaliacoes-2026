
function lerMais(id) {
    const texto = document.getElementById(id);
    const aberto = texto.classList.toggle("visivel");

    const botao = texto.previousElementSibling;
    botao.textContent = aberto ? "Ler menos" : "Ler mais";
}

// Pesquisa de artigos pelo título e conteúdo
const busca = document.getElementById("busca");

busca.addEventListener("input", function () {
    const termo = busca.value.toLowerCase().trim();
    const artigos = document.querySelectorAll(".card");

    artigos.forEach(function (artigo) {
        const conteudo = artigo.textContent.toLowerCase();
        artigo.style.display = conteudo.includes(termo)
            ? ""
            : "none";
    });
});

console.log("Blog Mundo da Computação carregado!");
