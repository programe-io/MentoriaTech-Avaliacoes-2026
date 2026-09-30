```javascript
// ========================================
// RESPONSIVIDADE DO THE GEEK
// ========================================

function ajustarTela() {
    const largura = window.innerWidth;

    const header = document.querySelector(".header-content");
    const main = document.querySelector("main");
    const nav = document.querySelector("nav");
    const posts = document.querySelectorAll(".post");
    const novaPublicacao = document.querySelector(".new-post");

    // Tela pequena: celular
    if (largura <= 600) {

        header.style.flexDirection = "column";
        header.style.gap = "15px";
        header.style.textAlign = "center";

        nav.style.flexDirection = "column";
        nav.style.gap = "10px";

        main.style.width = "100%";
        main.style.padding = "0 10px";

        novaPublicacao.style.flexDirection = "column";
        novaPublicacao.style.alignItems = "stretch";
        novaPublicacao.style.gap = "15px";

        posts.forEach((post) => {
            post.style.padding = "15px";
        });

    } else {

        // Tela maior: computador
        header.style.flexDirection = "row";
        header.style.gap = "0";

        nav.style.flexDirection = "row";
        nav.style.gap = "20px";

        main.style.width = "100%";
        main.style.padding = "0 15px";

        novaPublicacao.style.flexDirection = "row";
        novaPublicacao.style.alignItems = "center";
        novaPublicacao.style.gap = "0";

        posts.forEach((post) => {
            post.style.padding = "20px";
        });
    }
}


// Executa quando a página abre
ajustarTela();


// Executa novamente quando o tamanho da janela muda
window.addEventListener("resize", ajustarTela);
```
