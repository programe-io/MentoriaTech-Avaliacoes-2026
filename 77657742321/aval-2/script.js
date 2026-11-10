
const eventos = [
    {
        nome: "Show Musical",
        data: "20/12/2026",
        local: "Teresina - PI",
        preco: 80,
        categoria: "show",
        imagem: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600"
    },
    {
        nome: "Festa Neon",
        data: "25/12/2026",
        local: "Teresina - PI",
        preco: 50,
        categoria: "festa",
        imagem: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600"
    },
    {
        nome: "Festival de Música",
        data: "10/01/2027",
        local: "Teresina - PI",
        preco: 120,
        categoria: "festival",
        imagem: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600"
    },
    {
        nome: "Noite de Shows",
        data: "15/01/2027",
        local: "Teresina - PI",
        preco: 65,
        categoria: "show",
        imagem: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=600"
    }
];

let carrinho = [];

function mostrarEventos(lista) {
    const area = document.getElementById("listaEventos");

    area.innerHTML = "";

    lista.forEach((evento, index) => {
        area.innerHTML += `
            <div class="evento">
                <img src="${evento.imagem}" alt="${evento.nome}">
                <div class="evento-info">
                    <h3>${evento.nome}</h3>
                    <p>📅 ${evento.data}</p>
                    <p>📍 ${evento.local}</p>
                    <div class="preco">
                        R$ ${evento.preco.toFixed(2).replace(".", ",")}
                    </div>
                    <button class="adicionar"
                        onclick="adicionar(${eventos.indexOf(evento)})">
                        Comprar ingresso
                    </button>
                </div>
            </div>
        `;
    });
}

function filtrar(categoria) {
    const lista = categoria === "todos"
        ? eventos
        : eventos.filter(e => e.categoria === categoria);

    mostrarEventos(lista);
}

function adicionar(index) {
    carrinho.push(eventos[index]);
    atualizarCarrinho();

    alert("Ingresso adicionado ao carrinho!");
}

function atualizarCarrinho() {
    document.getElementById("contador").textContent =
        carrinho.length;

    const area = document.getElementById("itens");

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach((evento, index) => {
        total += evento.preco;

        area.innerHTML += `
            <div class="item">
                <span>${evento.nome}</span>
                <span>R$ ${evento.preco.toFixed(2).replace(".", ",")}</span>
                <button onclick="remover(${index})">❌</button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        total.toFixed(2).replace(".", ",");
}

function remover(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

function abrirCarrinho() {
    document.getElementById("modal").style.display = "flex";
}

function fecharCarrinho() {
    document.getElementById("modal").style.display = "none";
}

function finalizarCompra() {
    if (carrinho.length === 0) {
        alert("Adicione um ingresso primeiro!");
        return;
    }

    alert("Compra demonstrativa finalizada com sucesso! 🎟️");

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

mostrarEventos(eventos);
