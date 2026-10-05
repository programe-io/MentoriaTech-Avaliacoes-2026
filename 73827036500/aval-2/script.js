// ESTOQUE DOS 10 PERFUMES

let estoque = {
    1: 12,
    2: 8,
    3: 15,
    4: 6,
    5: 10,
    6: 9,
    7: 14,
    8: 11,
    9: 7,
    10: 5
};


// DADOS DOS PRODUTOS

const produtos = {

    1: {
        nome: "Rose Glamour",
        preco: 149.90
    },

    2: {
        nome: "Lavanda Dream",
        preco: 129.90
    },

    3: {
        nome: "Golden Night",
        preco: 189.90
    },

    4: {
        nome: "Pink Crystal",
        preco: 139.90
    },

    5: {
        nome: "Crystal Blue",
        preco: 159.90
    },

    6: {
        nome: "Gold Elegance",
        preco: 199.90
    },

    7: {
        nome: "Sweet Flower",
        preco: 119.90
    },

    8: {
        nome: "Black Night",
        preco: 179.90
    },

    9: {
        nome: "Pink Love",
        preco: 149.90
    },

    10: {
        nome: "Diamond",
        preco: 219.90
    }

};


let carrinho = [];


// ADICIONAR AO CARRINHO

function adicionarCarrinho(id) {

    if (estoque[id] <= 0) {

        alert("Produto sem estoque!");

        return;
    }

    carrinho.push(id);

    estoque[id]--;

    atualizarEstoque(id);

    atualizarCarrinho();

    alert(
        produtos[id].nome +
        " foi adicionado ao carrinho!"
    );
}


// ATUALIZAR ESTOQUE

function atualizarEstoque(id) {

    const elemento =
        document.getElementById("estoque" + id);

    elemento.textContent =
        "Estoque: " + estoque[id] + " unidades";


    if (estoque[id] === 0) {

        elemento.textContent =
            "Produto esgotado";

        elemento.style.color = "red";
    }
}


// ATUALIZAR CARRINHO

function atualizarCarrinho() {

    const lista =
        document.getElementById("listaCarrinho");

    const quantidade =
        document.getElementById("quantidade");

    const totalElemento =
        document.getElementById("total");


    quantidade.textContent =
        carrinho.length;


    if (carrinho.length === 0) {

        lista.innerHTML =
            "Seu carrinho está vazio.";

        totalElemento.textContent =
            "0,00";

        return;
    }


    let total = 0;

    lista.innerHTML = "";


    carrinho.forEach((id, index) => {

        total += produtos[id].preco;


        const item =
            document.createElement("div");

        item.className =
            "item-carrinho";


        item.innerHTML = `

            <div>
                <strong>
                    ${produtos[id].nome}
                </strong>

                <br>

                R$ ${produtos[id].preco.toFixed(2)}
            </div>

            <button
                onclick="removerCarrinho(${index})">
                Remover
            </button>

        `;


        lista.appendChild(item);

    });


    totalElemento.textContent =
        total.toFixed(2).replace(".", ",");
}


// REMOVER DO CARRINHO

function removerCarrinho(index) {

    const id =
        carrinho[index];


    estoque[id]++;

    atualizarEstoque(id);


    carrinho.splice(index, 1);


    atualizarCarrinho();
}


// ABRIR CARRINHO

function abrirCarrinho() {

    document.getElementById("modalCarrinho")
        .style.display = "block";
}


// FECHAR CARRINHO

function fecharCarrinho() {

    document.getElementById("modalCarrinho")
        .style.display = "none";
}


// FINALIZAR COMPRA

function finalizarCompra() {

    if (carrinho.length === 0) {

        alert("Seu carrinho está vazio!");

        return;
    }


    alert(
        "Compra realizada com sucesso! " +
        "Obrigado por comprar na Crystal Perfumaria 💎"
    );


    carrinho = [];

    atualizarCarrinho();

    fecharCarrinho();
}


// FORMULÁRIO DE CONTATO

function enviarMensagem(event) {

    event.preventDefault();

    alert(
        "Mensagem enviada com sucesso! " +
        "Em breve entraremos em contato."
    );

    event.target.reset();
}


// FECHAR CARRINHO AO CLICAR FORA

window.onclick = function(event) {

    const modal =
        document.getElementById("modalCarrinho");

    if (event.target === modal) {

        modal.style.display = "none";
    }
};