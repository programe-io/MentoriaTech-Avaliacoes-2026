// Base de dados de veículos (Estoque e Promoções)
const carros = [
    {
        id: 1,
        nome: "Porsche Macan GTS",
        categoria: "suv",
        ano: "2023/2024",
        km: "12.000 km",
        preco: 589900,
        precoAntigo: 619900,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=600&auto=format&fit=crop",
        descricao: "Motor V6 Bi-turbo, teto panorâmico, bancos em couro desportivo."
    },
    {
        id: 2,
        nome: "BMW 330i M Sport",
        categoria: "sedan",
        ano: "2023/2023",
        km: "18.500 km",
        preco: 299900,
        precoAntigo: 325000,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600&auto=format&fit=crop",
        descricao: "Pacote M completo, teto solar, painel digital Live Cockpit Professional."
    },
    {
        id: 3,
        nome: "Audi RS5 Coupe",
        categoria: "esportivo",
        ano: "2022/2023",
        km: "24.000 km",
        preco: 549900,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=600&auto=format&fit=crop",
        descricao: "450 cv de pura potência, tração Quattro, escape esportivo dinâmico."
    },
    {
        id: 4,
        nome: "Jeep Compass Overland",
        categoria: "suv",
        ano: "2024/2024",
        km: "Zero KM",
        preco: 229900,
        precoAntigo: 245900,
        promocao: true,
        imagem: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=600&auto=format&fit=crop",
        descricao: "Motor Hurricane 2.0 Turbo Gasolina, tração 4x4 e som Beats."
    },
    {
        id: 5,
        nome: "Mercedes-Benz C300 AMG",
        categoria: "sedan",
        ano: "2023/2024",
        km: "8.000 km",
        preco: 369900,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=600&auto=format&fit=crop",
        descricao: "Híbrido leve, som Burmester, iluminação ambiente 64 cores."
    },
    {
        id: 6,
        nome: "Ford Mustang GT",
        categoria: "esportivo",
        ano: "2021/2022",
        km: "29.000 km",
        preco: 419900,
        precoAntigo: null,
        promocao: false,
        imagem: "https://images.unsplash.com/photo-1584345604476-8ec5e12e42dd?q=80&w=600&auto=format&fit=crop",
        descricao: "Motor V8 5.0L Coyote, rodas aro 19 pretas, escapamento com válvula."
    }
];

// Carrinho / Veículos de Interesse
let carrinho = [];

// Elementos do DOM
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const openCartBtn = document.getElementById('open-cart');
const closeCartBtn = document.getElementById('close-cart');
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');

const promoGrid = document.getElementById('promo-cars-grid');
const stockGrid = document.getElementById('stock-cars-grid');
const searchInput = document.getElementById('search-input');
const filterBtns = document.querySelectorAll('.filter-btn');

const cartCountEl = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalEl = document.getElementById('cart-subtotal-price');
const checkoutBtn = document.getElementById('checkout-btn');
const contactForm = document.getElementById('contact-form');

// Inicialização da Página
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarros();
    iniciarContadorRegressivo();
    configurarEventos();
});

// Sistema de Notificações Toast
function mostrarToast(mensagem) {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #f59e0b; margin-right: 8px;"></i> ${mensagem}`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Formatar valor em Reais
function formatarMoeda(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Renderização dos Carros na Tela
function renderizarCarros(filtroCategoria = 'todos', termoBusca = '') {
    // 1. Renderizar Promoções
    const carrosPromo = carros.filter(c => c.promocao);
    promoGrid.innerHTML = carrosPromo.map(carroCardHTML).join('');

    // 2. Renderizar Estoque com Filtros e Busca
    let carrosFiltrados = carros.filter(c => {
        const matchCategoria = filtroCategoria === 'todos' || c.categoria === filtroCategoria;
        const matchBusca = c.nome.toLowerCase().includes(termoBusca.toLowerCase()) || 
                           c.descricao.toLowerCase().includes(termoBusca.toLowerCase()) ||
                           c.ano.toLowerCase().includes(termoBusca.toLowerCase());
        return matchCategoria && matchBusca;
    });

    if (carrosFiltrados.length === 0) {
        stockGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #64748b; padding: 30px;">Nenhum veículo encontrado em nosso estoque.</p>`;
    } else {
        stockGrid.innerHTML = carrosFiltrados.map(carroCardHTML).join('');
    }
}

// Template HTML para Card de Carro
function carroCardHTML(carro) {
    const tagHTML = carro.promocao 
        ? `<span class="car-tag sale">Promoção</span>` 
        : `<span class="car-tag">Disponível</span>`;