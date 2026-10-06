// Base de dados simulada de veículos
const vehicles = [
    {
        id: 1,
        brand: "Toyota",
        model: "Toyota Corolla Altis",
        year: 2023,
        km: "15.000 km",
        fuel: "Híbrido",
        price: 135900,
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?auto=format&fit=crop&w=600&q=80",
        description: "Carro em estado de novo, revisado na concessionária, único dono e IPVA pago."
    },
    {
        id: 2,
        brand: "Honda",
        model: "Honda Civic Touring",
        year: 2022,
        km: "28.000 km",
        fuel: "Gasolina",
        price: 145000,
        image: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=600&q=80",
        description: "Versão topo de linha, teto solar, bancos em couro e teto panorâmico."
    },
    {
        id: 3,
        brand: "Chevrolet",
        model: "Chevrolet Onix Premier",
        year: 2024,
        km: "5.000 km",
        fuel: "Flex",
        price: 89900,
        image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80",
        description: "Econômico, completo com multimídia MyLink, Wi-Fi embarcado e chave presencial."
    },
    {
        id: 4,
        brand: "Ford",
        model: "Ford Mustang GT",
        year: 2021,
        km: "12.000 km",
        fuel: "Gasolina",
        price: 380000,
        image: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?auto=format&fit=crop&w=600&q=80",
        description: "Motor V8 imponente, som Shaker, rodas esportivas e ronco inconfundível."
    },
    {
        id: 5,
        brand: "BMW",
        model: "BMW Série 3 320i",
        year: 2023,
        km: "20.000 km",
        fuel: "Gasolina",
        price: 279000,
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=600&q=80",
        description: "Luxo, conforto e alta performance. Faróis Full LED e painel digital."
    },
    {
        id: 6,
        brand: "Toyota",
        model: "Toyota Hilux SRX",
        year: 2022,
        km: "35.000 km",
        fuel: "Diesel",
        price: 245000,
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80",
        description: "Tração 4x4, robustez para cidade e campo, bancos ventilados e piloto automático."
    }
];

// Elementos do DOM
const vehicleGrid = document.getElementById('vehicleGrid');
const searchInput = document.getElementById('searchInput');
const brandFilter = document.getElementById('brandFilter');
const vehicleModal = document.getElementById('vehicleModal');
const modalBody = document.getElementById('modalBody');
const closeModal = document.getElementById('closeModal');
const cartCount = document.getElementById('cartCount');

let cartItemsCount = 0;

// Função para formatar preço em Real (BRL)
function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderizar veículos na tela
fnDisplayVehicles = (list) => {
    vehicleGrid.innerHTML = '';
    
    if (list.length === 0) {
        vehicleGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #777;">Nenhum veículo encontrado.</p>`;
        return;
    }

    list.forEach(vehicle => {
        const card = document.createElement('div');
        card.classList.add('vehicle-card');
        
        card.innerHTML = `
            <img src="${vehicle.image}" alt="${vehicle.model}">
            <div class="vehicle-info">
                <h3>${vehicle.model}</h3>
                <div class="price">${formatPrice(vehicle.price)}</div>
                <ul>
                    <li><i class="fa-solid fa-calendar"></i> Ano: ${vehicle.year}</li>
                    <li><i class="fa-solid fa-gauge"></i> Quilometragem: ${vehicle.km}</li>
                    <li><i class="fa-solid fa-gas-pump"></i> Combustível: ${vehicle.fuel}</li>
                </ul>
                <button class="btn-details" onclick="openDetails(${vehicle.id})">Ver Detalhes</button>
            </div>
        `;
        vehicleGrid.appendChild(card);
    });
};

// Filtrar veículos por busca e marca
function filterVehicles() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedBrand = brandFilter.value;

    const filtered = vehicles.filter(v => {
        const matchesSearch = v.model.toLowerCase().includes(searchTerm);
        const matchesBrand = selectedBrand === "" || v.brand === selectedBrand;
        return matchesSearch && matchesBrand;
    });

    fnDisplayVehicles(filtered);
}

// Abrir Modal de Detalhes
window.openDetails = function(id) {
    const vehicle = vehicles.find(v => v.id === id);
    if (!vehicle) return;

    modalBody.innerHTML = `
        <img src="${vehicle.image}" alt="${vehicle.model}" style="width:100%; height:220px; object-fit:cover; border-radius:5px; margin-bottom:15px;">
        <h2>${vehicle.model}</h2>
        <p style="color: #e50914; font-size: 1.4rem; font-weight: bold; margin: 10px 0;">${formatPrice(vehicle.price)}</p>
        <p style="margin-bottom: 10px;"><strong>Ano:</strong> ${vehicle.year} | <strong>KM:</strong> ${vehicle.km} | <strong>Combustível:</strong> ${vehicle.fuel}</p>
        <p style="margin-bottom: 20px; color: #555;">${vehicle.description}</p>
        <button class="btn" style="width: 100%; border: none; cursor: pointer;" onclick="addToCart(${vehicle.id})">Demonstrar Interesse / Reservar</button>
    `;
    vehicleModal.style.display = 'flex';
};

// Adicionar ao carrinho (simulação)
window.addToCart = function(id) {
    cartItemsCount++;
    cartCount.textContent = cartItemsCount;
    vehicleModal.style.display = 'none';
    alert("Interesse registrado com sucesso! Nossa equipe entrará em contato em breve.");
};

// Fechar Modal
closeModal.addEventListener('click', () => {
    vehicleModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === vehicleModal) {
        vehicleModal.style.display = 'none';
    }
});

// Event Listeners para os filtros
searchInput.addEventListener('input', filterVehicles);
brandFilter.addEventListener('change', filterVehicles);

// Inicializar a aplicação exibindo todos os carros
document.addEventListener('DOMContentLoaded', () => {
    fnDisplayVehicles(vehicles);
});