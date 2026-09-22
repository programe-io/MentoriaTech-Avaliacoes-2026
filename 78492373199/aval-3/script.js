```javascript
// ===============================
// CARRINHO DA PIZZARIA
// ===============================

let carrinho = [];


// ===============================
// ADICIONAR PRODUTO
// ===============================

function adicionarCarrinho(nome, preco) {

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

    alert(nome + " foi adicionado ao carrinho!");
}


// ===============================
// ATUALIZAR CARRINHO
// ===============================

function atualizarCarrinho() {

    const lista = document.getElementById("lista-carrinho");
    const total = document.getElementById("total");
    const contador = document.getElementById("contador-carrinho");

    if (!lista) return;

    lista.innerHTML = "";

    let valorTotal = 0;
    let quantidadeTotal = 0;

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;

        valorTotal += subtotal;
        quantidadeTotal += item.quantidade;

        const div = document.createElement("div");

        div.className = "item-carrinho";

        div.innerHTML = `
            <strong>${item.nome}</strong>

            <p>
                R$ ${item.preco.toFixed(2).replace(".", ",")}
                × ${item.quantidade}
            </p>

            <button onclick="diminuirQuantidade(${index})">
                −
            </button>

            <button onclick="aumentarQuantidade(${index})">
                +
            </button>

            <button onclick="removerProduto(${index})">
                🗑️
            </button>

            <p>
                Subtotal:
                R$ ${subtotal.toFixed(2).replace(".", ",")}
            </p>
        `;

        lista.appendChild(div);
    });

    if (carrinho.length === 0) {

        lista.innerHTML = `
            <p>
                Seu carrinho está vazio.
            </p>
        `;
    }

    if (total) {
        total.textContent =
            "R$ " + valorTotal.toFixed(2).replace(".", ",");
    }

    if (contador) {
        contador.textContent = quantidadeTotal;
    }
}


// ===============================
// AUMENTAR QUANTIDADE
// ===============================

function aumentarQuantidade(index) {

    carrinho[index].quantidade++;

    atualizarCarrinho();
}


// ===============================
// DIMINUIR QUANTIDADE
// ===============================

function diminuirQuantidade(index) {

    if (carrinho[index].quantidade > 1) {

        carrinho[index].quantidade--;

    } else {

        carrinho.splice(index, 1);
    }

    atualizarCarrinho();
}


// ===============================
// REMOVER PRODUTO
// ===============================

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ===============================
// LIMPAR CARRINHO
// ================
```
