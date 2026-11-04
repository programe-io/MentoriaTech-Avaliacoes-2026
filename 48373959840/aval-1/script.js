
// Mensagem de boas-vindas
window.addEventListener("load", () => {
    console.log("Bem-vindo ao DevBlog!");
});

// Interação dos artigos
document.querySelectorAll("article a").forEach(link => {
    link.addEventListener("click", (event) => {
        event.preventDefault();

        const titulo = link.parentElement.querySelector("h3").textContent;

        alert("Você selecionou o artigo: " + titulo);
    });
});

// Efeito ao passar o mouse nos artigos
document.querySelectorAll("article").forEach(article => {
    article.addEventListener("mouseenter", () => {
        article.style.cursor = "pointer";
    });
});

// Botão de explorar artigos
const botao = document.querySelector(".botao");

if (botao) {
    botao.addEventListener("click", () => {
        console.log("Usuário acessou os artigos.");
    });
}

// Navegação suave
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener("click", () => {
        console.log("Navegação realizada!");
    });
});
