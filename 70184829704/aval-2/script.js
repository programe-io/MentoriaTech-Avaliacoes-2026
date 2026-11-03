
/* =================================
   SITE DE DOCES E BOLOS
   DOCE ENCANTO
================================= */

// MENSAGEM NO CONSOLE
console.log("Bem-vindo ao site Doce Encanto!");

// =================================
// BOTÕES
// =================================

const botoes = document.querySelectorAll(".botao");

botoes.forEach(function(botao) {

    botao.addEventListener("click", function() {

        console.log(
            "Você clicou em: " +
            botao.textContent.trim()
        );

    });

});

// =================================
// ANIMAÇÃO DOS PRODUTOS
// =================================

const produtos = document.querySelectorAll(".produto");

produtos.forEach(function(produto, index) {

    produto.style.opacity = "0";

    produto.style.transform = "translateY(30px)";

    produto.style.transition = "all 0.6s ease";

    setTimeout(function() {

        produto.style.opacity = "1";

        produto.style.transform = "translateY(0)";

    }, 300 * (index + 1));

});

// =================================
// BOTÃO DO WHATSAPP
// =================================

const whatsapp = document.querySelector(".encomenda .botao");

if (whatsapp) {

    whatsapp.addEventListener("click", function() {

        console.log("Cliente deseja fazer uma encomenda!");

    });

}

// =================================
// ANIMAÇÃO AO ROLAR A PÁGINA
// =================================

const secoes = document.querySelectorAll("section");

const observador = new IntersectionObserver(function(entradas) {

    entradas.forEach(function(entrada) {

        if (entrada.isIntersecting) {

            entrada.target.classList.add("visivel");

        }

    });

}, {
    threshold: 0.1
});

secoes.forEach(function(secao) {

    observador.observe(secao);

});

// =================================
// ANO AUTOMÁTICO NO RODAPÉ
// =================================

const ano = document.querySelector("footer p:last-child");

if (ano) {

    ano.textContent =
        "© " +
        new Date().getFullYear() +
        " Doce Encanto - Todos os direitos reservados.";

}

// =================================
// FINALIZAÇÃO
// =================================

console.log("Site carregado com sucesso!");
