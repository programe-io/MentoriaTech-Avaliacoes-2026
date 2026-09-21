```javascript
// Mensagem ao clicar no botão

const botao = document.getElementById("mensagemBtn");

botao.addEventListener("click", function() {

    alert(
        "Olá! Obrigado por visitar meu portfólio. " +
        "Estou estudando Desenvolvimento de Sistemas " +
        "e buscando evoluir cada vez mais na programação!"
    );

});


// Efeito ao rolar a página

window.addEventListener("scroll", function() {

    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 15px rgba(0, 0, 0, 0.4)";
    } else {
        header.style.boxShadow = "none";
    }

});
```
