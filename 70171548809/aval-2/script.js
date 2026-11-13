
// CARRINHO DE COMPRAS

let quantidade = 0;

let carrinho = [];

// FUNÇÃO PARA ADICIONAR PRODUTOS
function adicionarCarrinho(produto) {

    carrinho.push(produto);

    quantidade++;

    // Atualiza o número do carrinho
    document.getElementById("quantidade").innerText = quantidade;

    // Mensagem de confirmação
    alert(
        "💎 Brilho Real 💎\n\n" +
        produto +
        " foi adicionado ao carrinho com sucesso!"
    );

    console.log("Produto adicionado:", produto);
}


// FUNÇÃO PARA MOSTRAR OS PRODUTOS
function mostrarCarrinho() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

    } else {

        let mensagem = "💎 SEU CARRINHO 💎\n\n";

        carrinho.forEach(function(produto, index) {

            mensagem += (index + 1) + " - " + produto + "\n";

        });

        mensagem += "\nTotal de produtos: " + quantidade;

        alert(mensagem);
    }
}


// CLICAR NO CARRINHO
document.querySelector(".carrinho").addEventListener("click", function() {

    mostrarCarrinho();

});


// MENSAGEM DE BOAS-VINDAS
window.addEventListener("load", function() {

    console.log("Bem-vindo à Brilho Real!");

});


// EFEITO NOS BOTÕES
const botoes = document.querySelectorAll(".card button");

botoes.forEach(function(botao) {

    botao.addEventListener("mouseenter", function() {

        botao.style.transform = "scale(1.05)";

    });

    botao.addEventListener("mouseleave", function() {

        botao.style.transform = "scale(1)";

    });

});


// MENSAGEM DE NAVEGAÇÃO
const links = document.querySelectorAll("nav a");

links.forEach(function(link) {

    link.addEventListener("click", function() {

        console.log("Página acessada: " + link.textContent);

    });

});
