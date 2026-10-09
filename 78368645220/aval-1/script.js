
const telefoneWhatsApp = "5500000000000";
// Troque pelo número da loja: 55 + DDD + número.

const carros = [
    {
        marca: "Toyota",
        modelo: "Corolla XEi",
        categoria: "Sedan",
        ano: 2023,
        km: "28.000 km",
        cambio: "Automático",
        preco: 142900,
        promocao: 134900,
        estoque: 3,
        imagem: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Honda",
        modelo: "Civic Touring",
        categoria: "Sedan",
        ano: 2022,
        km: "35.000 km",
        cambio: "Automático",
        preco: 155900,
        promocao: 149900,
        estoque: 2,
        imagem: "https://images.unsplash.com/photo-1594070319944-7c0cbebb6f58?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Jeep",
        modelo: "Compass Longitude",
        categoria: "SUV",
        ano: 2023,
        km: "22.000 km",
        cambio: "Automático",
        preco: 169900,
        promocao: 159900,
        estoque: 4,
        imagem: "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Hyundai",
        modelo: "HB20 Comfort",
        categoria: "Hatch",
        ano: 2024,
        km: "15.000 km",
        cambio: "Manual",
        preco: 82900,
        promocao: 76900,
        estoque: 5,
        imagem: "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Volkswagen",
        modelo: "T-Cross Highline",
        categoria: "SUV",
        ano: 2023,
        km: "30.000 km",
        cambio: "Automático",
        preco: 149900,
        promocao: 142900,
        estoque: 2,
        imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Chevrolet",
        modelo: "Onix LT",
        categoria: "Hatch",
        ano: 2022,
        km: "42.000 km",
        cambio: "Manual",
        preco: 74900,
        promocao: 69900,
        estoque: 3,
        imagem: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Fiat",
        modelo: "Toro Freedom",
        categoria: "Picape",
        ano: 2023,
        km: "26.000 km",
        cambio: "Automático",
        preco: 139900,
        promocao: 132900,
        estoque: 2,
        imagem: "https://images.unsplash.com/photo-1551830820-330a71b99659?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "BMW",
        modelo: "Série 3",
        categoria: "Sedan",
        ano: 2022,
        km: "32.000 km",
        cambio: "Automático",
        preco: 239900,
        promocao: 229900,
        estoque: 1,
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    },
    {
        marca: "Jeep",
        modelo: "Renegade Sport",
        categoria: "SUV",
        ano: 2022,
        km: "40.000 km",
        cambio: "Automático",
        preco: 105900,
        promocao: 99900,
        estoque: 3,
        imagem: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80"
    }
];

const listaCarros = document.getElementById("lista-carros");
const pesquisa = document.getElementById("pesquisa");
const categoria = document.getElementById("categoria");
const semResultados = document.getElementById("sem-resultados");

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
        maximumFractionDigits: 0
    });
}

function renderizarCarros() {
    const termo = pesquisa.value.toLowerCase().trim();
    const categoriaSelecionada = categoria.value;

    const encontrados = carros.filter(carro => {
        const nome = `${carro.marca} ${carro.modelo}`.toLowerCase();

        const correspondeNome = nome.includes(termo);
        const correspondeCategoria =
            categoriaSelecionada === "todos" ||
            carro.categoria === categoriaSelecionada;

        return correspondeNome && correspondeCategoria;
    });

    listaCarros.innerHTML = encontrados.map(carro => {
        const temPromocao = carro.promocao < carro.preco;

        const mensagem = encodeURIComponent(
            `Olá! Tenho interesse no ${carro.marca} ${carro.modelo}, ano ${carro.ano}, anunciado por ${formatarPreco(carro.promocao)}. Ele ainda está disponível?`
        );

        const linkWhatsApp =
            `https://wa.me/${telefoneWhatsApp}?text=${mensagem}`;

        return `
            <article class="carro-card">
                <div class="imagem-carro">
                    <img
                        src="${carro.imagem}"
                        alt="${carro.marca} ${carro.modelo}"
                        loading="lazy"
                        onerror="this.onerror=null;this.src='https://placehold.co/800x450/e9ebef/333333?text=Imagem+do+veiculo';"
                    >

                    ${temPromocao
                        ? '<span class="selo">OFERTA ESPECIAL</span>'
                        : ''
                    }

                    <span class="selo estoque">
                        ${carro.estoque > 0
                            ? `Estoque: ${carro.estoque}`
                            : "Indisponível"
                        }
                    </span>
                </div>

                <div class="carro-info">
                    <h3>${carro.marca} ${carro.modelo}</h3>

                    <p class="detalhes">
                        ${carro.ano} • ${carro.km}<br>
                        ${carro.categoria} • ${carro.cambio}
                    </p>

                    ${temPromocao
                        ? `<p class="preco-antigo">${formatarPreco(carro.preco)}</p>`
                        : ''
                    }

                    <p class="preco">${formatarPreco(carro.promocao)}</p>

                    <a
                        class="botao-carro"
                        href="${linkWhatsApp}"
                        target="_blank"
                        rel="noopener"
                        ${carro.estoque === 0 ? 'aria-disabled="true"' : ''}
                    >
                        ${carro.estoque > 0
                            ? "Tenho interesse"
                            : "Consultar disponibilidade"
                        }
                    </a>
                </div>
            </article>
        `;
    }).join("");

    semResultados.hidden = encontrados.length !== 0;
}

pesquisa.addEventListener("input", renderizarCarros);
categoria.addEventListener("change", renderizarCarros);

document.getElementById("link-whatsapp").href =
    `https://wa.me/${telefoneWhatsApp}?text=${encodeURIComponent(
        "Olá! Gostaria de conhecer os veículos da AutoMax."
    )}`;

renderizarCarros();