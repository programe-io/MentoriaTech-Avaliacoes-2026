
// CARRINHO DE COMPRAS

let carrinho = [];


// FORMATAR PREÇO

function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ATUALIZAR CONTADOR

function atualizarContador() {

    let quantidade = carrinho.reduce(
        (total, produto) => total + produto.quantidade,
        0
    );

    document.getElementById("contador").innerText = quantidade;

}


// ADICIONAR AO CARRINHO

document.querySelectorAll(".btn-comprar").forEach(botao => {

    botao.addEventListener("click", function () {

        let nome = this.dataset.nome;
        let preco = Number(this.dataset.preco);

        let produtoExistente = carrinho.find(
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

        atualizarContador();

        Swal.fire({
            title: "Produto adicionado!",
            text: nome + " foi adicionado ao carrinho.",
            icon: "success",
            confirmButtonText: "Continuar comprando",
            confirmButtonColor: "#0284c7"
        });

    });

});


// ABRIR CARRINHO

document.getElementById("abrirCarrinho")
    .addEventListener("click", mostrarCarrinho);


function mostrarCarrinho() {

    if (carrinho.length === 0) {

        Swal.fire({
            title: "Seu carrinho está vazio!",
            text: "Adicione um celular para começar sua compra.",
            icon: "info",
            confirmButtonColor: "#0284c7"
        });

        return;

    }

    let lista = carrinho.map((produto, indice) => {

        return `
            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:10px;
                padding:12px 0;
                border-bottom:1px solid #ddd;
                text-align:left;
            ">

                <div>
                    <strong>${produto.nome}</strong>

                    <div style="font-size:13px;color:#777;">
                        ${produto.quantidade} x ${formatarPreco(produto.preco)}
                    </div>
                </div>

                <button
                    class="remover-produto"
                    data-indice="${indice}"
                    style="
                        border:0;
                        background:#fee2e2;
                        color:#dc2626;
                        padding:8px 12px;
                        border-radius:7px;
                    "
                >
                    <i class="bi bi-trash"></i>
                </button>

            </div>
        `;

    }).join("");

    let total = carrinho.reduce(
        (soma, produto) =>
            soma + produto.preco * produto.quantidade,
        0
    );

    Swal.fire({

        title: "Meu carrinho",

        html: `
            <div>${lista}</div>

            <h3 style="margin-top:20px;font-weight:bold;">
                Total: ${formatarPreco(total)}
            </h3>
        `,

        showCancelButton: true,
        confirmButtonText: "Finalizar compra",
        cancelButtonText: "Continuar comprando",
        confirmButtonColor: "#0284c7",
        cancelButtonColor: "#777",

        didOpen: () => {

            document.querySelectorAll(".remover-produto")
                .forEach(botao => {

                    botao.addEventListener("click", function () {

                        let indice = Number(this.dataset.indice);

                        carrinho.splice(indice, 1);

                        atualizarContador();

                        Swal.close();

                        mostrarCarrinho();

                    });

                });

        }

    }).then(resultado => {

        if (resultado.isConfirmed) {

            Swal.fire({
                title: "Compra demonstrativa!",
                text: "O carrinho está funcionando, mas o pagamento ainda não está conectado.",
                icon: "info",
                confirmButtonColor: "#0284c7"
            });

        }

    });

}


// PESQUISAR CELULARES

document.getElementById("pesquisaProduto")
    .addEventListener("input", function () {

        let pesquisa = this.value.toLowerCase();

        let produtos = document.querySelectorAll(".produto-item");

        let encontrados = 0;

        produtos.forEach(produto => {

            let nome = produto.dataset.nome.toLowerCase();

            if (nome.includes(pesquisa)) {

                produto.style.display = "";

                encontrados++;

            } else {

                produto.style.display = "none";

            }

        });

        document.getElementById("semResultados").hidden =
            encontrados > 0;

    });


// INICIAR CONTADOR

atualizarContador();
