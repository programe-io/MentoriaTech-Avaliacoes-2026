// Lista de motos
let motos = [
    {
        nome: "Honda CG 160",
        preco: 18000
    },
    {
        nome: "Yamaha MT-03",
        preco: 32000
    },
    {
        nome: "BMW S 1000 RR",
        preco: 120000
    }
];

// Carrinho
let carrinho = [];
let total = 0;


// Função para comprar uma moto
function comprarMoto(nome, preco) {

    carrinho.push({
        nome: nome,
        preco: preco
    });

    total += preco;

    atualizarCarrinho();

    alert(nome + " foi adicionada ao carrinho!");
}


// Mostrar carrinho
function atualizarCarrinho() {

    let lista = document.getElementById("carrinho");
    let valor = document.getElementById("total");

    lista.innerHTML = "";

    carrinho.forEach(function(moto, index){

        let item = document.createElement("li");

        item.innerHTML = 
        moto.nome + 
        " - R$ " + moto.preco.toLocaleString("pt-BR") +
        " <button onclick='removerMoto(" + index + ")'>Remover</button>";

        lista.appendChild(item);

    });

    valor.innerHTML = 
    "Total: R$ " + total.toLocaleString("pt-BR");
}


// Remover moto do carrinho
function removerMoto(index){

    total -= carrinho[index].preco;

    carrinho.splice(index,1);

    atualizarCarrinho();
}


// Finalizar compra
function finalizarCompra(){

    if(carrinho.length == 0){

        alert("O carrinho está vazio!");

    } else {

        alert(
        "Compra realizada com sucesso!\nValor: R$ " 
        + total.toLocaleString("pt-BR")
        );

        carrinho = [];
        total = 0;

        atualizarCarrinho();
    }
}


// Gerar dicas de moto
function mostrarDica(){

    let dicas = [
        "Use sempre capacete e equipamentos de proteção.",
        "Faça revisão da moto regularmente.",
        "Verifique os pneus antes de viajar.",
        "Respeite os limites de velocidade.",
        "Mantenha o óleo do motor em dia."
    ];

    let aleatoria = 
    Math.floor(Math.random() * dicas.length);

    document.getElementById("dica").innerHTML =
    dicas[aleatoria];
}