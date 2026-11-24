
// CONTROLE DO MENU

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("aberto");

}


// FILTRAR PRODUTOS

function filtrarProdutos(categoria) {

    const produtos = document.querySelectorAll(".produto");

    const botoes = document.querySelectorAll(".filtro");

    let encontrou = false;

    produtos.forEach(produto => {

        const tipo = produto.dataset.categoria;

        if (categoria === "todos" || tipo === categoria) {

            produto.classList.remove("escondido");

            encontrou = true;

        } else {

            produto.classList.add("escondido");

        }

    });

    botoes.forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.textContent.trim().toLowerCase() === categoria
        );

    });

    document.getElementById("semResultados").style.display =
        encontrou ? "none" : "block";

}


// PESQUISAR PRODUTOS

function pesquisarProdutos() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .trim()
        .toLowerCase();

    const produtos = document.querySelectorAll(".produto");

    let encontrou = false;

    produtos.forEach(produto => {

        const texto = produto.innerText.toLowerCase();

        if (texto.includes(pesquisa)) {

            produto.classList.remove("escondido");

            encontrou = true;

        } else {

            produto.classList.add("escondido");

        }

    });

    // Retira a seleção dos filtros
    document.querySelectorAll(".filtro").forEach(botao => {
        botao.classList.remove("ativo");
    });

    document.getElementById("semResultados").style.display =
        encontrou ? "none" : "block";

}


// PESQUISAR TAMBÉM AO DIGITAR

document.getElementById("pesquisa").addEventListener(
    "input",
    pesquisarProdutos
);


// CARRINHO DE COMPRAS

let carrinho = [];


// ADICIONAR PRODUTO

function adicionar(nome, preco) {

    const produto = carrinho.find(item => item.nome === nome);

    if (produto) {

        produto.quantidade++;

    } else {

        carrinho.push({

            nome: nome,

            preco: preco,

            quantidade: 1

        });

    }

    atualizarCarrinho();

    mostrarMensagem(nome + " foi adicionado à sacola!");

}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const area = document.getElementById("itens");

    let total = 0;

    let quantidadeTotal = 0;

    area.innerHTML = "";

    if (carrinho.length === 0) {

        area.innerHTML = `
            <p class="vazio">
                Sua sacola está vazia.
            </p>
        `;

    }

    carrinho.forEach((produto, index) => {

        const subtotal = produto.preco * produto.quantidade;

        total += subtotal;

        quantidadeTotal += produto.quantidade;

        area.innerHTML += `

            <div class="item-carrinho">

                <div>

                    <strong>${protegerTexto(produto.nome)}</strong>

                    <small>
                        ${dinheiro(produto.preco)} cada
                    </small>

                    <div class="controles">

                        <button onclick="alterarQuantidade(${index}, -1)">
                            −
                        </button>

                        <span>${produto.quantidade}</span>

                        <button onclick="alterarQuantidade(${index}, 1)">
                            +
                        </button>

                    </div>

                    <button class="remover"
                        onclick="removerProduto(${index})">
                        Remover
                    </button>

                </div>

                <strong>${dinheiro(subtotal)}</strong>

            </div>

        `;

    });

    document.getElementById("contador").innerText =
        quantidadeTotal;

    document.getElementById("total").innerText =
        dinheiro(total);

}


// ALTERAR QUANTIDADE

function alterarQuantidade(index, valor) {

    carrinho[index].quantidade += valor;

    if (carrinho[index].quantidade <= 0) {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

}


// REMOVER PRODUTO

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();

}


// FORMATAR PREÇOS

function dinheiro(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// ABRIR CARRINHO

function abrirCarrinho() {

    document.getElementById("carrinho")
        .classList.add("aberto");

    document.getElementById("fundoCarrinho")
        .classList.add("aberto");

}


// FECHAR CARRINHO

function fecharCarrinho() {

    document.getElementById("carrinho")
        .classList.remove("aberto");

    document.getElementById("fundoCarrinho")
        .classList.remove("aberto");

}


// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Sua sacola está vazia!");

        return;

    }

    let resumo = "";

    let total = 0;

    carrinho.forEach(produto => {

        const subtotal = produto.preco * produto.quantidade;

        resumo +=
            produto.quantidade + "x " +
            produto.nome + " - " +
            dinheiro(subtotal) + "\n";

        total += subtotal;

    });

    alert(

        "RESUMO DO PEDIDO\n\n" +

        resumo +

        "\nTOTAL: " + dinheiro(total) +

        "\n\nObrigado por comprar na Aurora Acessórios!"

    );

}


// MENSAGEM DE CONFIRMAÇÃO

function mostrarMensagem(texto) {

    alert(texto);

}


// PROTEGER TEXTOS INSERIDOS NO HTML

function protegerTexto(texto) {

    return String(texto).replace(/[&<>"']/g, caractere => ({

        "&": "&amp;",

        "<": "&lt;",

        ">": "&gt;",

        '"': "&quot;",

        "'": "&#039;"

    })[caractere]);

}
