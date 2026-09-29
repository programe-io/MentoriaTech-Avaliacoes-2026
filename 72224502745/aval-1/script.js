```javascript
let carrinho = [];

const contador = document.getElementById("contador");
const listaCarrinho = document.getElementById("listaCarrinho");
const totalElemento = document.getElementById("total");

const modal = document.getElementById("modalCarrinho");
const btnCarrinho = document.getElementById("btnCarrinho");
const fechar = document.getElementById("fechar");


// ADICIONAR PRODUTO

function adicionarCarrinho(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    listaCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach(function(produto, index) {

        total += produto.preco;

        const item = document.createElement("div");

        item.classList.add("item");

        item.innerHTML = `
            <div>
                <strong>${produto.nome}</strong>
                <br>
                R$ ${produto.preco
                    .toFixed(2)
                    .replace(".", ",")}
            </div>

            <button onclick="removerProduto(${index})">
                Remover
            </button>
        `;

        listaCarrinho.appendChild(item);
    });

    contador.textContent = carrinho.length;

    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}


// REMOVER PRODUTO

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}


// ABRIR CARRINHO

btnCarrinho.addEventListener("click", function() {

    modal.style.display = "block";

});


// FECHAR CARRINHO

fechar.addEventListener("click", function() {

    modal.style.display = "none";

});


// FINALIZAR COMPRA

document.getElementById("finalizar")
    .addEventListener("click", function() {

        if (carrinho.length === 0) {

            alert("Seu carrinho está vazio!");

            return;
        }

        alert("Compra realizada com sucesso!");

        carrinho = [];

        atualizarCarrinho();

        modal.style.display = "none";
    });


// FORMULÁRIO

document.getElementById("formulario")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert("Mensagem enviada com sucesso!");

        this.reset();
    });
```
