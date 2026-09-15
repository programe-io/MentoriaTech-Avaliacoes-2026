```javascript
// ==========================================
// VARIÁVEIS DO CARRINHO
// ==========================================

let carrinho = [];


// ==========================================
// MENU MOBILE
// ==========================================

function abrirMenu() {

    const menu = document.getElementById("menu");

    if (menu) {
        menu.classList.toggle("ativo");
    }
}


// ==========================================
// ADICIONAR PRODUTO
// ==========================================

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        produto => produto.nome === nome
    );

    if (produtoExistente) {

        produtoExistente.quantidade++;

    } else {

        carrinho.push({
            nome: nome,
            preco: preco,
            quantidade: 1
        });

    }

    atualizarCarrinho();

    alert("💗 Produto adicionado ao carrinho!");
}


// ==========================================
// ATUALIZAR CARRINHO
// ==========================================

function atualizarCarrinho() {

    const lista = document.getElementById("listaCarrinho");
    const contador = document.getElementById("contador");
    const totalElemento = document.getElementById("total");

    if (!lista || !contador || !totalElemento) {
        return;
    }

    lista.innerHTML = "";

    let quantidadeTotal = 0;
    let valorTotal = 0;


    carrinho.forEach(function (produto, indice) {

        quantidadeTotal += produto.quantidade;

        valorTotal += produto.preco * produto.quantidade;


        const item = document.createElement("div");

        item.className = "item-carrinho";


        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                <small>
                    ${produto.quantidade} x
                    R$ ${produto.preco.toFixed(2).replace(".", ",")}
                </small>
            </div>

            <button onclick="removerProduto(${indice})">
                ×
            </button>
        `;


        lista.appendChild(item);

    });


    contador.textContent = quantidadeTotal;

    totalElemento.textContent =
        "R$ " +
        valorTotal.toFixed(2).replace(".", ",");
}


// ==========================================
// REMOVER PRODUTO
// ==========================================

function removerProduto(indice) {

    if (
        indice >= 0 &&
        indice < carrinho.length
    ) {

        carrinho.splice(indice, 1);

        atualizarCarrinho();

    }
}


// ==========================================
// ABRIR CARRINHO
// ==========================================

function abrirCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {

        carrinhoElemento.classList.add("ativo");

    }
}


// ==========================================
// FECHAR CARRINHO
// ==========================================

function fecharCarrinho() {

    const carrinhoElemento =
        document.getElementById("carrinho");

    if (carrinhoElemento) {

        carrinhoElemento.classList.remove("ativo");

    }
}


// ==========================================
// FINALIZAR COMPRA
// ==========================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert(
            "🛍️ Seu carrinho está vazio!"
        );

        return;
    }


    let mensagem =
        "Olá! 💗 Gostaria de fazer um pedido:\n\n";


    let total = 0;


    carrinho.forEach(function (produto) {

        const subtotal =
            produto.preco * produto.quantidade;

        total += subtotal;


        mensagem +=
            `${produto.nome} - ` +
            `${produto.quantidade} unidade(s) - ` +
            `R$ ${subtotal.toFixed(2).replace(".", ",")}\n`;

    });


    mensagem +=
        `\nTotal: R$ ${total.toFixed(2).replace(".", ",")}`;


    const telefone =
        "5586999999999";


    const url =
        "https://wa.me/" +
        telefone +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");

}


// ==========================================
// OFERTA
// ==========================================

function mostrarOferta() {

    alert(
        "🔥 OFERTA ESPECIAL!\n\n" +
        "Confira nossos produtos em promoção " +
        "e aproveite até 30% de desconto!"
    );

}


// ==========================================
// NEWSLETTER
// ==========================================

function inscrever(event) {

    event.preventDefault();


    const email =
        document.getElementById("email");


    if (!email) {
        return;
    }


    alert(
        "💗 Cadastro realizado com sucesso!\n\n" +
        "Você receberá nossas novidades em:\n" +
        email.value
    );


    email.value = "";

}


// ==========================================
// WHATSAPP
// ==========================================

function whatsapp() {

    const telefone =
        "5586999999999";


    const mensagem =
        "Olá! 💗 Gostaria de conhecer os produtos da Pink & Black.";


    const url =
        "https://wa.me/" +
        telefone +
        "?text=" +
        encodeURIComponent(mensagem);


    window.open(url, "_blank");

}


// ==========================================
// INSTAGRAM
// ==========================================

function instagram() {

    const usuario =
        "pinkandblack";


    const url =
        "https://www.instagram.com/" +
        usuario;


    window.open(url, "_blank");

}


// ==========================================
// FECHAR CARRINHO COM ESC
// ==========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            fecharCarrinho();

        }

    }
);


// ==========================================
// INICIALIZAÇÃO
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        atualizarCarrinho();

        console.log(
            "💗 Pink & Black carregado com sucesso!"
        );

    }
);
```
