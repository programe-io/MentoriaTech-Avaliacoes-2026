
const carros = [
    {
        nome: "Toyota Corolla XEI",
        categoria: "Sedan",
        ano: "2023",
        km: "25.000 km",
        preco: 135900,
        imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800",
        promocao: true
    },
    {
        nome: "Honda Civic Touring",
        categoria: "Sedan",
        ano: "2022",
        km: "32.000 km",
        preco: 145900,
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800",
        promocao: false
    },
    {
        nome: "Jeep Compass",
        categoria: "SUV",
        ano: "2023",
        km: "18.000 km",
        preco: 159900,
        imagem: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800",
        promocao: true
    },
    {
        nome: "Volkswagen Polo",
        categoria: "Hatch",
        ano: "2024",
        km: "12.000 km",
        preco: 89900,
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800",
        promocao: false
    },
    {
        nome: "BMW Série 3",
        categoria: "Sedan",
        ano: "2022",
        km: "28.000 km",
        preco: 189900,
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800",
        promocao: true
    },
    {
        nome: "Hyundai Creta",
        categoria: "SUV",
        ano: "2023",
        km: "20.000 km",
        preco: 119900,
        imagem: "https://images.unsplash.com/photo-1518987048-93e29699e79a?w=800",
        promocao: false
    }
];

const lista = document.getElementById("lista-carros");
const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

function mostrarCarros() {

    const termo = pesquisa.value.toLowerCase();
    const tipo = categoria.value;

    const filtrados = carros.filter(carro => {
        const combinaNome = carro.nome.toLowerCase().includes(termo);
        const combinaCategoria =
            tipo === "todos" || carro.categoria === tipo;

        return combinaNome && combinaCategoria;
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum veículo encontrado.</p>";
        return;
    }

    filtrados.forEach(carro => {

        const mensagem = encodeURIComponent(
            `Olá! Tenho interesse no veículo ${carro.nome}, ano ${carro.ano}, anunciado por ${formatarPreco(carro.preco)}.`
        );

        lista.innerHTML += `
            <div class="card-carro">

                <img src="${carro.imagem}" alt="${carro.nome}">

                <div class="card-info">

                    ${carro.promocao ? "<p style='color:#ff7b25;font-weight:bold;margin-bottom:10px'>🔥 OFERTA ESPECIAL</p>" : ""}

                    <h3>${carro.nome}</h3>

                    <p class="detalhes">
                        ${carro.ano} | ${carro.km} | ${carro.categoria}
                    </p>

                    <p class="preco">
                        ${formatarPreco(carro.preco)}
                    </p>

                    <a class="btn"
                       href="https://wa.me/5586999999999?text=${mensagem}"
                       target="_blank">
                       Tenho interesse
                    </a>

                </div>
            </div>
        `;
    });
}

pesquisa.addEventListener("input", mostrarCarros);
categoria.addEventListener("change", mostrarCarros);

mostrarCarros();
