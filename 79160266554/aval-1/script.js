
const carros = [
    {
        nome: "Toyota Corolla 2022",
        marca: "Toyota",
        preco: 125900,
        km: "35.000 km",
        imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=800"
    },
    {
        nome: "Honda Civic 2021",
        marca: "Honda",
        preco: 118900,
        km: "42.000 km",
        imagem: "https://images.unsplash.com/photo-1590362891991-f776e747a588?w=800"
    },
    {
        nome: "Chevrolet Onix 2023",
        marca: "Chevrolet",
        preco: 89900,
        km: "22.000 km",
        imagem: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800"
    },
    {
        nome: "Volkswagen Golf 2020",
        marca: "Volkswagen",
        preco: 105900,
        km: "48.000 km",
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800"
    }
];

const lista = document.getElementById("listaCarros");
const pesquisa = document.getElementById("pesquisa");
const filtroMarca = document.getElementById("marca");

function mostrarCarros() {

    const texto = pesquisa.value.toLowerCase();
    const marcaSelecionada = filtroMarca.value;

    const filtrados = carros.filter(carro => {

        const combinaNome =
            carro.nome.toLowerCase().includes(texto);

        const combinaMarca =
            marcaSelecionada === "" ||
            carro.marca === marcaSelecionada;

        return combinaNome && combinaMarca;
    });

    lista.innerHTML = "";

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum veículo encontrado.</p>";
        return;
    }

    filtrados.forEach(carro => {

        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.nome}">

            <div class="info">
                <h3>${carro.nome}</h3>

                <p>${carro.km}</p>

                <div class="preco">
                    ${carro.preco.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })}
                </div>

                <a class="comprar"
                href="https://wa.me/5500000000000?text=${encodeURIComponent(
                    "Olá! Tenho interesse no " + carro.nome
                )}"
                target="_blank">
                    Comprar pelo WhatsApp
                </a>
            </div>
        `;

        lista.appendChild(card);
    });
}

pesquisa.addEventListener("input", mostrarCarros);
filtroMarca.addEventListener("change", mostrarCarros);

mostrarCarros();

