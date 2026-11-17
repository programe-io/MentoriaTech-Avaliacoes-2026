
let carrinho = [];

const botoesAdicionar = document.querySelectorAll(".adicionar");

const quantidade = document.getElementById("quantidade");
const modal = document.getElementById("modalCarrinho");
const abrirCarrinho = document.getElementById("abrirCarrinho");
const fecharCarrinho = document.getElementById("fecharCarrinho");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalElemento = document.getElementById("total");
const finalizar = document.getElementById("finalizar");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

botoesAdicionar.forEach(botao => {
    botao.addEventListener("click", () => {
        const nome = botao.dataset.nome;
        const preco = Number(botao.dataset.preco);

        carrinho.push({ nome, preco });

        atualizarCarrinho();

        alert(nome + " foi adicionado ao carrinho!");
    });
});

function atualizarCarrinho() {
    itensCarrinho.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, indice) => {
        total += item.preco;

        const linha = document.createElement("div");
        linha.className = "item-carrinho";

        linha.innerHTML = `
            <span>${item.nome} - ${formatarPreco(item.preco)}</span>
            <button data-indice="${indice}">Remover</button>
        `;

        itensCarrinho.appendChild(linha);
    });

    totalElemento.textContent = formatarPreco(total);
    quantidade.textContent = carrinho.length;

    itensCarrinho.querySelectorAll("button").forEach(botao => {
        botao.addEventListener("click", () => {
            const indice = Number(botao.dataset.indice);
            carrinho.splice(indice, 1);
            atualizarCarrinho();
        });
    });

    if (carrinho.length === 0) {
        itensCarrinho.textContent = "Seu carrinho está vazio. 🌷";
    }
}

abrirCarrinho.addEventListener("click", () => {
    modal.style.display = "flex";
});

fecharCarrinho.addEventListener("click", () => {
    modal.style.display = "none";
});

modal.addEventListener("click", evento => {
    if (evento.target === modal) {
        modal.style.display = "none";
    }
});

finalizar.addEventListener("click", () => {
    if (carrinho.length === 0) {
        alert("Adicione algum buquê antes de finalizar!");
        return;
    }

    let mensagem = "Olá! Gostaria de fazer este pedido:%0A%0A";

    carrinho.forEach(item => {
        mensagem += `🌷 ${item.nome} - ${formatarPreco(item.preco)}%0A`;
    });

    const total = carrinho.reduce((soma, item) => soma + item.preco, 0);

    mensagem += `%0ATotal: ${formatarPreco(total)}`;

    // Substitua pelo número da loja com código do país e DDD.
    const telefone = "5500000000000";

    window.open(
        `https://wa.me/${telefone}?text=${mensagem}`,
        "_blank"
    );
});
