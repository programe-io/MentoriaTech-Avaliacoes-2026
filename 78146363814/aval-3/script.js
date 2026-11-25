// ===================================
// SINUCA STORE - LOJA VIRTUAL
// ===================================

// CARRINHO DE COMPRAS
let carrinho = [];

let total = 0;


// ===================================
// ADICIONAR PRODUTOS
// ===================================

function adicionar(nome, preco) {

    const produto = {
        nome: nome,
        preco: preco,
        quantidade: 1
    };

    const existente = carrinho.find(item => item.nome === nome);

    if (existente) {
        existente.quantidade++;
    } else {
        carrinho.push(produto);
    }

    atualizarCarrinho();

    alert(nome + " adicionado ao carrinho!");
}


// ===================================
// ATUALIZAR CARRINHO
// ===================================

function atualizarCarrinho() {

    const lista = document.getElementById("lista");

    const totalElemento = document.getElementById("total");

    lista.innerHTML = "";

    total = 0;

    carrinho.forEach((produto, index) => {

        total += produto.preco * produto.quantidade;

        const item = document.createElement("li");

        item.innerHTML = `
            <span>
                ${produto.nome}
                - R$ ${produto.preco.toFixed(2)}
                x ${produto.quantidade}
            </span>

            <button onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        lista.appendChild(item);

    });

    totalElemento.innerText = total.toFixed(2);
}


// ===================================
// REMOVER PRODUTOS
// ===================================

function removerProduto(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);

    }

    atualizarCarrinho();

}


// ===================================
// ESVAZIAR CARRINHO
// ===================================

function limparCarrinho() {

    carrinho = [];

    total = 0;

    atualizarCarrinho();

}


// ===================================
// FINALIZAR COMPRA PELO WHATSAPP
// ===================================

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;

    }

    let mensagem = "🎱 *SINuca STORE*%0A";
    mensagem += "Olá! Gostaria de fazer um pedido:%0A%0A";

    carrinho.forEach(produto => {

        mensagem += `Produto: ${produto.nome}%0A`;
        mensagem += `Quantidade: ${produto.quantidade}%0A`;
        mensagem += `Preço: R$ ${(produto.preco * produto.quantidade).toFixed(2)}%0A%0A`;

    });

    mensagem += `*TOTAL: R$ ${total.toFixed(2)}*`;

    const telefone = "5500000000000";

    const link = `https://wa.me/${telefone}?text=${mensagem}`;

    window.open(link, "_blank");

}


// ===================================
// PESQUISAR PRODUTOS
// ===================================

function pesquisarProduto() {

    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {

        const nome = produto
            .querySelector("h3")
            .innerText.toLowerCase();

        if (nome.includes(pesquisa)) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

}


// ===================================
// FILTRAR PRODUTOS POR CATEGORIA
// ===================================

function filtrarCategoria(categoria) {

    const produtos = document.querySelectorAll(".produto");

    produtos.forEach(produto => {

        const tipo = produto.dataset.categoria;

        if (categoria === "todos" || tipo === categoria) {

            produto.style.display = "block";

        } else {

            produto.style.display = "none";

        }

    });

}


// ===================================
// CONTROLE DE QUANTIDADE
// ===================================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();

}

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        removerProduto(index);

        return;

    }

    atualizarCarrinho();

}


// ===================================
// CALCULAR FRETE
// ===================================

function calcularFrete(valor) {

    const cep = document.getElementById("cep").value;

    if (cep.length < 8) {

        alert("Digite um CEP válido!");

        return;

    }

    let frete = valor >= 300 ? 0 : 25;

    document.getElementById("frete").innerText =
        "R$ " + frete.toFixed(2);

}


// ===================================
// ALERTA DE BOAS-VINDAS
// ===================================

window.addEventListener("load", function() {

    console.log("Bem-vindo à Sinuca Store!");

});


// ===================================
// ANO AUTOMÁTICO NO RODAPÉ
// ===================================

const ano = document.getElementById("ano");

if (ano) {

    ano.innerText = new Date().getFullYear();

}