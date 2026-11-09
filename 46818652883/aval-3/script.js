
let carrinho = [];

const quantidade = document.getElementById("quantidade");
const itens = document.getElementById("itens");
const total = document.getElementById("total");

document.querySelectorAll(".adicionar").forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.nome;
        const preco = Number(botao.dataset.preco);

        carrinho.push({ nome, preco });

        atualizarCarrinho();
        alert(nome + " foi adicionado ao carrinho!");
    });
});

function atualizarCarrinho() {
    itens.innerHTML = "";

    let soma = 0;

    carrinho.forEach((produto, index) => {
        soma += produto.preco;

        const linha = document.createElement("p");
        linha.textContent = produto.nome + " - R$ " +
            produto.preco.toFixed(2).replace(".", ",");

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.addEventListener("click", () => {
            carrinho.splice(index, 1);
            atualizarCarrinho();
        });

        linha.appendChild(remover);
        itens.appendChild(linha);
    });

    quantidade.textContent = carrinho.length;
    total.textContent = soma.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

document.getElementById("abrirCarrinho").onclick = () => {
    document.getElementById("carrinho").classList.add("aberto");
};

document.getElementById("fecharCarrinho").onclick = () => {
    document.getElementById("carrinho").classList.remove("aberto");
};

document.getElementById("finalizar").onclick = () => {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    alert("Compra simulada com sucesso!");

    carrinho = [];
    atualizarCarrinho();

    document.getElementById("carrinho").classList.remove("aberto");
};
