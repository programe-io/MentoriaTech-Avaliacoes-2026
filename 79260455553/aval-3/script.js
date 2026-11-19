
let carrinho = [];
let total = 0;

function adicionar(nome, preco) {
    carrinho.push({
        nome: nome,
        preco: preco
    });

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const lista = document.getElementById("carrinho");

    lista.innerHTML = "";
    total = 0;

    carrinho.forEach((produto, indice) => {
        total += produto.preco;

        let item = document.createElement("li");

        item.textContent =
            produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",") +
            " ";

        let remover = document.createElement("button");

        remover.textContent = "Remover";

        remover.onclick = function() {
            carrinho.splice(indice, 1);
            atualizarCarrinho();
        };

        item.appendChild(remover);
        lista.appendChild(item);
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function limparCarrinho() {
    carrinho = [];
    atualizarCarrinho();
}

document.getElementById("formPedido").addEventListener("submit",
function(event) {

    event.preventDefault();

    if (carrinho.length === 0) {
        alert("Adicione pelo menos um produto ao carrinho!");
        return;
    }

    const nome = document.getElementById("nome").value;
    const telefone = document.getElementById("telefone").value;
    const endereco = document.getElementById("enderecoCliente").value;
    const pagamento = document.getElementById("pagamento").value;
    const observacao = document.getElementById("observacao").value;

    let produtos = carrinho.map(p => p.nome).join(", ");

    let mensagem =
        "NOVO PEDIDO - ROSA CHIC\n\n" +
        "Cliente: " + nome + "\n" +
        "Telefone: " + telefone + "\n" +
        "Endereço: " + endereco + "\n" +
        "Produtos: " + produtos + "\n" +
        "Total: R$ " + total.toFixed(2) + "\n" +
        "Pagamento: " + pagamento + "\n" +
        "Observações: " + observacao;

    alert("Pedido preenchido com sucesso!\n\n" + mensagem);

});
