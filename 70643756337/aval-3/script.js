// ========================================
// MENU MOBILE
// ========================================

const botaoMenu = document.getElementById("botaoMenu");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {

    menu.classList.toggle("menu-aberto");

});


// Fecha o menu quando clicar em algum link

const links = document.querySelectorAll("#menu a");

links.forEach(link => {

    link.addEventListener("click", () => {

        menu.classList.remove("menu-aberto");

    });

});


// ========================================
// FILTRO DE PRODUTOS
// ========================================

const botoesFiltro =
    document.querySelectorAll(".filtro");

const produtos =
    document.querySelectorAll(".produto");


botoesFiltro.forEach(botao => {

    botao.addEventListener("click", () => {

        // Remove o botão ativo
        botoesFiltro.forEach(btn => {
            btn.classList.remove("ativo");
        });

        // Adiciona ativo ao botão clicado
        botao.classList.add("ativo");

        const categoria =
            botao.getAttribute("data-categoria");


        produtos.forEach(produto => {

            const categoriaProduto =
                produto.getAttribute("data-categoria");


            if (
                categoria === "todos" ||
                categoria === categoriaProduto
            ) {

                produto.style.display = "block";

            } else {

                produto.style.display = "none";

            }

        });

    });

});


// ========================================
// PESQUISA DE PRODUTOS
// ========================================

const campoPesquisa =
    document.getElementById("campoPesquisa");


campoPesquisa.addEventListener("input", () => {

    const texto =
        campoPesquisa.value.toLowerCase();


    produtos.forEach(produto => {

        const nome =
            produto
            .getAttribute("data-nome")
            .toLowerCase();


        if (nome.includes(texto)) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

});


// ========================================
// CARRINHO
// ========================================

const botaoCarrinho =
    document.getElementById("botaoCarrinho");

const carrinho =
    document.getElementById("carrinho");

const fecharCarrinho =
    document.getElementById("fecharCarrinho");

const contadorCarrinho =
    document.getElementById("contadorCarrinho");

const itensCarrinho =
    document.getElementById("itensCarrinho");

const totalCarrinho =
    document.getElementById("totalCarrinho");

const botaoFinalizar =
    document.getElementById("finalizarCompra");


let carrinhoProdutos = [];


// Abrir carrinho

botaoCarrinho.addEventListener("click", () => {

    carrinho.classList.add("aberto");

});


// Fechar carrinho

fecharCarrinho.addEventListener("click", () => {

    carrinho.classList.remove("aberto");

});


// ========================================
// ADICIONAR PRODUTO AO CARRINHO
// ========================================

const botoesComprar =
    document.querySelectorAll(".btn-comprar");


botoesComprar.forEach(botao => {

    botao.addEventListener("click", () => {

        const nome =
            botao.getAttribute("data-produto");

        const preco =
            Number(
                botao.getAttribute("data-preco")
            );


        const produtoExistente =
            carrinhoProdutos.find(
                produto => produto.nome === nome
            );


        if (produtoExistente) {

            produtoExistente.quantidade++;

        } else {

            carrinhoProdutos.push({

                nome: nome,

                preco: preco,

                quantidade: 1

            });

        }


        atualizarCarrinho();


        carrinho.classList.add("aberto");

    });

});


// ========================================
// ATUALIZAR CARRINHO
// ========================================

function atualizarCarrinho() {

    itensCarrinho.innerHTML = "";


    if (carrinhoProdutos.length === 0) {

        itensCarrinho.innerHTML = `
            <p>
                Seu carrinho está vazio.
            </p>
        `;

        contadorCarrinho.textContent = "0";

        totalCarrinho.textContent = "R$ 0,00";

        return;

    }


    let quantidadeTotal = 0;

    let valorTotal = 0;


    carrinhoProdutos.forEach(
        (produto, index) => {

            quantidadeTotal +=
                produto.quantidade;


            const subtotal =
                produto.preco *
                produto.quantidade;


            valorTotal += subtotal;


            const item =
                document.createElement("div");


            item.classList.add(
                "item-carrinho"
            );


            item.innerHTML = `

                <div>

                    <strong>
                        ${produto.nome}
                    </strong>

                    <p>
                        ${produto.quantidade}
                        x
                        R$ ${produto.preco
                            .toFixed(2)
                            .replace(".", ",")}
                    </p>

                </div>

                <button
                    onclick="removerProduto(${index})">

                    ✕

                </button>

            `;


            itensCarrinho.appendChild(item);

        }
    );


    contadorCarrinho.textContent =
        quantidadeTotal;


    totalCarrinho.textContent =
        "R$ " +
        valorTotal
            .toFixed(2)
            .replace(".", ",");

}


// ========================================
// REMOVER PRODUTO
// ========================================

function removerProduto(index) {

    carrinhoProdutos.splice(index, 1);

    atualizarCarrinho();

}


// ========================================
// FINALIZAR PEDIDO
// ========================================

botaoFinalizar.addEventListener(
    "click",
    () => {

        if (carrinhoProdutos.length === 0) {

            alert(
                "Seu carrinho está vazio!"
            );

            return;

        }


        alert(
            "Pedido recebido! Nossa equipe entrará em contato para confirmar sua compra."
        );


        carrinhoProdutos = [];

        atualizarCarrinho();

        carrinho.classList.remove("aberto");

    }
);


// ========================================
// FORMULÁRIO DE CONTATO
// ========================================

const formulario =
    document.getElementById(
        "formularioContato"
    );


formulario.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        const nome =
            document.getElementById(
                "nome"
            ).value;


        alert(
            `Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`
        );


        formulario.reset();

    }
);


// ========================================
// ANO AUTOMÁTICO
// ========================================

const ano =
    document.getElementById("ano");


ano.textContent =
    new Date().getFullYear();


// ========================================
// MENSAGEM NO CONSOLE
// ========================================

console.log(
    "Constrular carregada com sucesso!"
);