
const motos = [
    {
        nome: "Honda CG 160 Titan",
        marca: "Honda",
        ano: 2025,
        preco: 19500,
        categoria: "street",
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600"
    },
    {
        nome: "Yamaha Fazer 250",
        marca: "Yamaha",
        ano: 2025,
        preco: 23000,
        categoria: "street",
        imagem: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600"
    },
    {
        nome: "Kawasaki Ninja 400",
        marca: "Kawasaki",
        ano: 2024,
        preco: 35000,
        categoria: "esportiva",
        imagem: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600"
    },
    {
        nome: "BMW G 310 GS",
        marca: "BMW",
        ano: 2025,
        preco: 39000,
        categoria: "trail",
        imagem: "https://images.unsplash.com/photo-1558980394-0c9b3b6e6f0d?w=600"
    },
    {
        nome: "Honda Biz 125",
        marca: "Honda",
        ano: 2025,
        preco: 15000,
        categoria: "street",
        imagem: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600"
    },
    {
        nome: "Yamaha MT-07",
        marca: "Yamaha",
        ano: 2024,
        preco: 47000,
        categoria: "esportiva",
        imagem: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=600"
    }
];

let carrinho = [];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function mostrarMotos(lista) {
    const area = document.getElementById("listaMotos");

    area.innerHTML = "";

    if (lista.length === 0) {
        area.innerHTML = "<p>Nenhuma moto encontrada.</p>";
        return;
    }

    lista.forEach(moto => {
        const indice = motos.indexOf(moto);

        area.innerHTML += `
            <div class="moto">
                <img src="${moto.imagem}" alt="${moto.nome}">
                <div class="moto-info">
                    <h3>${moto.nome}</h3>
                    <p>🏷️ Marca: ${moto.marca}</p>
                    <p>📅 Ano: ${moto.ano}</p>
                    <p>🏍️ Categoria: ${moto.categoria}</p>

                    <div class="preco">
                        R$ ${formatarPreco(moto.preco)}
                    </div>

                    <button class="adicionar"
                        onclick="adicionarCarrinho(${indice})">
                        Adicionar ao carrinho
                    </button>
                </div>
            </div>
        `;
    });
}

function filtrar(categoria) {
    document.getElementById("pesquisa").value = "";

    const resultado = categoria === "todas"
        ? motos
        : motos.filter(moto => moto.categoria === categoria);

    mostrarMotos(resultado);
}

function pesquisarMotos() {
    const pesquisa = document
        .getElementById("pesquisa")
        .value.toLowerCase();

    const resultado = motos.filter(moto =>
        moto.nome.toLowerCase().includes(pesquisa) ||
        moto.marca.toLowerCase().includes(pesquisa)
    );

    mostrarMotos(resultado);
}

function adicionarCarrinho(indice) {
    carrinho.push(motos[indice]);

    atualizarCarrinho();

    alert("Moto adicionada ao carrinho!");
}

function atualizarCarrinho() {
    document.getElementById("contador").textContent =
        carrinho.length;

    const area = document.getElementById("itensCarrinho");

    area.innerHTML = "";

    let total = 0;

    carrinho.forEach((moto, indice) => {
        total += moto.preco;

        area.innerHTML += `
            <div class="item-carrinho">
                <span>${moto.nome}</span>
                <span>R$ ${formatarPreco(moto.preco)}</span>
                <button onclick="removerCarrinho(${indice})">
                    ❌
                </button>
            </div>
        `;
    });

    document.getElementById("total").textContent =
        formatarPreco(total);
}

function removerCarrinho(indice) {
    carrinho.splice(indice, 1);
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
        alert("Seu carrinho está vazio!");
        return;
    }

    alert(
        "Pedido realizado com sucesso! 🏍️\n" +
        "Esta é uma demonstração, sem pagamento real."
    );

    carrinho = [];
    atualizarCarrinho();
    fecharCarrinho();
}

mostrarMotos(motos);
