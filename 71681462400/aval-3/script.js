/* =========================================
   CARRINHO
========================================= */

let carrinho = [];


// Adicionar produto
function adicionarCarrinho(nome, preco) {

    const produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    atualizarCarrinho();

    mostrarMensagem(`${nome} foi adicionado ao carrinho! 💗`);
}


// Atualizar carrinho
function atualizarCarrinho() {

    const contador = document.getElementById("contador");

    const cartItems = document.getElementById("cartItems");

    const cartTotal = document.getElementById("cartTotal");


    // Atualiza quantidade
    contador.textContent = carrinho.length;


    // Carrinho vazio
    if (carrinho.length === 0) {

        cartItems.innerHTML =
            "<p>Seu carrinho está vazio.</p>";

        cartTotal.textContent = "R$ 0,00";

        return;
    }


    // Cria lista de produtos
    cartItems.innerHTML = "";


    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item = document.createElement("div");

        item.classList.add("cart-item");


        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                R$ ${produto.preco.toFixed(2).replace(".", ",")}
            </div>

            <button
                class="remove-item"
                onclick="removerProduto(${index})"
            >
                Remover
            </button>
        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;
}


// Remover produto
function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// Abrir carrinho
function abrirCarrinho() {

    document
        .getElementById("cartModal")
        .classList.add("active");

}


// Fechar carrinho
function fecharCarrinho() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


/* =========================================
   FINALIZAR COMPRA
========================================= */

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio! 🌸");

        return;
    }


    alert(
        "Obrigada pela compra! 💗\n\n" +
        "Esta é uma demonstração de loja."
    );

}


/* =========================================
   FILTRO DE PRODUTOS
========================================= */

function filtrarProdutos(categoria) {

    const produtos =
        document.querySelectorAll(".product-card");


    produtos.forEach(produto => {

        const categoriaProduto =
            produto.dataset.category;


        if (
            categoria === "todos" ||
            categoriaProduto === categoria
        ) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

}


/* =========================================
   MENSAGEM
========================================= */

function mostrarMensagem(texto) {

    const mensagem =
        document.createElement("div");


    mensagem.textContent = texto;


    mensagem.style.position = "fixed";
    mensagem.style.bottom = "30px";
    mensagem.style.right = "30px";

    mensagem.style.padding = "15px 25px";

    mensagem.style.background =
        "linear-gradient(135deg, #ff79bd, #dd218c)";

    mensagem.style.color = "white";

    mensagem.style.fontWeight = "bold";

    mensagem.style.borderRadius = "20px";

    mensagem.style.boxShadow =
        "0 10px 30px rgba(190, 35, 125, .3)";

    mensagem.style.zIndex = "2000";


    document.body.appendChild(mensagem);


    setTimeout(() => {

        mensagem.remove();

    }, 2500);

}


/* =========================================
   FECHAR MODAL CLICANDO FORA
========================================= */

document
    .getElementById("cartModal")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            fecharCarrinho();

        }

    });
    