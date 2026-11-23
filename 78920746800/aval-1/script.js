
let carrinho = [];

const contador = document.getElementById("contador");
const modal = document.getElementById("modalCarrinho");

// ADICIONAR PRODUTO AO CARRINHO

function adicionarCarrinho(nome, preco) {

    const produtoExistente = carrinho.find(
        item => item.nome === nome
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

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const quantidade = carrinho.reduce(
        (total, item) => total + item.quantidade, 0
    );

    contador.textContent = quantidade;

    const lista = document.getElementById("listaCarrinho");

    lista.innerHTML = "";

    let valorTotal = 0;

    carrinho.forEach((item, index) => {

        const subtotal = item.preco * item.quantidade;

        valorTotal += subtotal;

        lista.innerHTML += `
            <div class="item-carrinho">

                <div>
                    <strong>${item.nome}</strong>
                    <p>
                        ${item.quantidade}x R$
                        ${item.preco.toFixed(2).replace(".", ",")}
                    </p>
                </div>

                <button onclick="removerProduto(${index})">
                    Remover
                </button>

            </div>
        `;
    });

    document.getElementById("total").textContent =
        "Total: R$ " + valorTotal.toFixed(2).replace(".", ",");
}

// REMOVER PRODUTO

function removerProduto(index) {

    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// ABRIR CARRINHO

function mostrarCarrinho() {

    modal.style.display = "flex";

    atualizarCarrinho();
}

// FECHAR CARRINHO

function fecharCarrinho() {

    modal.style.display = "none";
}

// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }

    alert(
        "Compra preparada com sucesso! " +
        "Esta demonstração ainda não possui integração de pagamento."
    );
}

// MENU MOBILE

function toggleMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("ativo");
}

// FECHAR MODAL AO CLICAR FORA

modal.addEventListener("click", function(event) {

    if (event.target === modal) {
        fecharCarrinho();
    }

});
