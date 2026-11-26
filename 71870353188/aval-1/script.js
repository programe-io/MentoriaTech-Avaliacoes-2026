
// CONFIGURAÇÕES
let carrinho = [];

// COMPRAR PELO WHATSAPP
function comprar(moto) {
    let telefone = "5511999999999";

    let mensagem = `Olá! Tenho interesse na moto ${moto}. Gostaria de mais informações!`;

    let link = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

    window.open(link, "_blank");
}

// PESQUISAR MOTOS
function pesquisarMoto() {
    let pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    let motos = document.querySelectorAll(".card");

    motos.forEach(moto => {
        let nome = moto.querySelector("h3")
            .textContent.toLowerCase();

        if (nome.includes(pesquisa)) {
            moto.style.display = "block";
        } else {
            moto.style.display = "none";
        }
    });
}

// ADICIONAR AO CARRINHO
function adicionarCarrinho(nome, preco) {
    let produto = {
        nome: nome,
        preco: preco
    };

    carrinho.push(produto);

    atualizarCarrinho();

    alert(nome + " foi adicionado ao carrinho!");
}

// ATUALIZAR CARRINHO
function atualizarCarrinho() {
    let quantidade = document.getElementById("quantidade");

    let total = document.getElementById("total");

    let lista = document.getElementById("listaCarrinho");

    if (quantidade) {
        quantidade.textContent = carrinho.length;
    }

    if (total) {
        let valorTotal = carrinho.reduce(
            (soma, item) => soma + item.preco, 0
        );

        total.textContent = valorTotal.toLocaleString(
            "pt-BR",
            {
                style: "currency",
                currency: "BRL"
            }
        );
    }

    if (lista) {
        lista.innerHTML = "";

        carrinho.forEach((item, index) => {
            let produto = document.createElement("p");

            produto.textContent =
                `${item.nome} - ${item.preco.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                })}`;

            let remover = document.createElement("button");

            remover.textContent = "Remover";

            remover.onclick = () => removerCarrinho(index);

            lista.appendChild(produto);
            lista.appendChild(remover);
        });
    }
}

// REMOVER DO CARRINHO
function removerCarrinho(index) {
    carrinho.splice(index, 1);

    atualizarCarrinho();
}

// FINALIZAR COMPRA
function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "Olá! Quero comprar:\n";

    carrinho.forEach(item => {
        mensagem += `- ${item.nome}\n`;
    });

    let total = carrinho.reduce(
        (soma, item) => soma + item.preco, 0
    );

    mensagem += `\nTotal: ${total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    })}`;

    let telefone = "5511999999999";

    window.open(
        `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`,
        "_blank"
    );
}
