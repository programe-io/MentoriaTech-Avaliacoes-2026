// Base de dados simulada de carros
const carros = [
    {
        id: 1,
        marca: "BMW",
        modelo: "BMW M3 Competition",
        ano: 2023,
        km: "12.000 km",
        cambio: "Automático",
        preco: 589900,
        precoFormatado: "R$ 589.900",
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
        descricao: "Veículo em estado de zero km, IPVA pago, revisões feitas na concessionária, teto em fibra de carbono e escape esportivo."
    },
    {
        id: 2,
        marca: "Porsche",
        modelo: "Porsche 911 Carrera",
        ano: 2022,
        km: "8.500 km",
        cambio: "PDK",
        preco: 890000,
        precoFormatado: "R$ 890.000",
        imagem: "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=800&q=80",
        descricao: "Cor cinza crepúsculo, interior em couro vermelho Bordeaux, pacote Sport Chrono e som Burmester High-End."
    },
    {
        id: 3,
        marca: "Audi",
        modelo: "Audi RS6 Avant",
        ano: 2023,
        km: "15.000 km",
        cambio: "Automático",
        preco: 950000,
        precoFormatado: "R$ 950.000",
        imagem: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?auto=format&fit=crop&w=800&q=80",
        descricao: "A perua mais rápida do mundo. Motor V8 Biturbo de 600cv, tração quattro e suspensão adaptativa esportiva."
    },
    {
        id: 4,
        marca: "Mercedes",
        modelo: "Mercedes-AMG C63",
        ano: 2021,
        km: "28.000 km",
        cambio: "Automático",
        preco: 479900,
        precoFormatado: "R$ 479.900",
        imagem: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=800&q=80",
        descricao: "Brutal motor V8 biturbo, rodas aro 19 forjadas, bancos tipo concha AMG Performance e teto solar panorâmico."
    },
    {
        id: 5,
        marca: "BMW",
        modelo: "BMW X6 M",
        ano: 2022,
        km: "20.000 km",
        cambio: "Automático",
        preco: 749900,
        precoFormatado: "R$ 749.900",
        imagem: "https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80",
        descricao: "SUV esportivo de alto desempenho. Conforto incomparável, tração integral e acabamento em fibra de carbono interna."
    },
    {
        id: 6,
        marca: "Porsche",
        modelo: "Porsche Macan GTS",
        ano: 2023,
        km: "5.000 km",
        cambio: "PDK",
        preco: 620000,
        precoFormatado: "R$ 620.000",
        imagem: "https://images.unsplash.com/photo-1526726538690-5cbf956ae2fd?auto=format&fit=crop&w=800&q=80",
        descricao: "O SUV compacto com alma de esportivo. Rodas de 21 polegadas, escape esportivo original e faróis em LED escurecidos."
    }
];

let favoritos = [];

// Elementos do DOM
const carGrid = document.getElementById('carGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const filterBtns = document.querySelectorAll('.filter-btn');
const modal = document.getElementById('carModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.querySelector('.close-modal');
const countFavoritos = document.getElementById('countFavoritos');

// Função para renderizar os carros na tela
function renderizarCarros(listaCarros) {
    carGrid.innerHTML = "";

    if (listaCarros.length === 0) {
        carGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #77; padding: 40px;">Nenhum veículo encontrado.</p>`;
        return;
    }

    listaCarros.forEach(carro => {
        const isFavorito = favoritos.includes(carro.id);
        const card = document.createElement('div');
        card.classList.add('car-card');
        
        card.innerHTML = `
            <img src="${carro.imagem}" alt="${carro.modelo}" class="car-img">
            <div class="car-info">
                <h3 class="car-title">${carro.modelo}</h3>
                <div class="car-details">
                    <span><i class="fa-solid fa-calendar"></i> ${carro.ano}</span>
                    <span><i class="fa-solid fa-road"></i> ${carro.km}</span>
                    <span><i class="fa-solid fa-gears"></i> ${carro.cambio}</span>
                </div>
                <div class="car-price">${carro.precoFormatado}</div>
                <div class="card-actions">
                    <button class="btn-details" onclick="abrirDetalhes(${carro.id})">Ver Detalhes</button>
                    <button class="btn-fav ${isFavorito ? 'favorited' : ''}" onclick="toggleFavorito(${carro.id})">
                        <i class="fa-solid fa-heart"></i>
                    </button>
                </div>
            </div>
        `;
        carGrid.appendChild(card);
    });
}

// Filtrar por Marca
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const marca = btn.getAttribute('data-filter');
        if (marca === 'todos') {
            renderizarCarros(carros);
        } else {
            const filtrados = carros.filter(c => c.marca === marca);
            renderizarCarros(filtrados);
        }
    });
});

// Buscar por texto
function realizarBusca() {
    const termo = searchInput.value.toLowerCase().trim();
    const filtrados = carros.filter(c => 
        c.modelo.toLowerCase().includes(termo) || 
        c.marca.toLowerCase().includes(termo) ||
        c.ano.toString().includes(termo)
    );
    renderizarCarros(filtrados);
}

searchBtn.addEventListener('click', realizarBusca);
searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') realizarBusca();
});

// Abrir Modal de Detalhes
function abrirDetalhes(id) {
    const carro = carros.find(c => c.id === id);
    if (!carro) return;

    modalBody.innerHTML = `
        <img src="${carro.imagem}" alt="${carro.modelo}">
        <h3>${carro.modelo}</h3>
        <p><strong>Marca:</strong> ${carro.marca} | <strong>Ano:</strong> ${carro.ano} | <strong>Quilometragem:</strong> ${carro.km}</p>
        <p><strong>Câmbio:</strong> ${carro.cambio}</p>
        <p>${carro.descricao}</p>
        <h2 style="color: #e50914; margin-bottom: 20px;">${carro.precoFormatado}</h2>
        <button class="btn-buy" onclick="finalizarCompra('${carro.modelo}')"><i class="fa-solid fa-check"></i> Tenho Interesse / Simular Financiamento</button>
    `;
    modal.style.display = 'flex';
}

// Fechar Modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Sistema de Favoritos
function toggleFavorito(id) {
    const index = favoritos.indexOf(id);
    if (index > -1) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(id);
    }
    countFavoritos.textContent = favoritos.length;
    renderizarCarros(carros);
}

// Ação de Compra simulada
function finalizarCompra(modelo) {
    alert(`Obrigado pelo interesse no ${modelo}! Nossa equipe comercial entrará em contato via WhatsApp em instantes para prosseguir com a simulação.`);
    modal.style.display = 'none';
}

// Inicializar a página carregando todos os carros
renderizarCarros(carros);