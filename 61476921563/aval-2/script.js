// Banco de dados de hotéis simulado
const hoteis = [
    {
        id: 1,
        nome: "Copacabana Palace Beach",
        destino: "Rio de Janeiro, Brasil",
        categoria: "Praia",
        preco: 950,
        avaliacao: 4.9,
        imagem: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
        comodidades: ["Wi-Fi Grátis", "Piscina", "Spa", "Frente ao Mar"]
    },
    {
        id: 2,
        nome: "Chalé Suíço Gramado",
        destino: "Gramado, Brasil",
        categoria: "Montanha",
        preco: 620,
        avaliacao: 4.8,
        imagem: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
        comodidades: ["Lareira", "Café Colonial", "Wi-Fi Grátis", "Pet Friendly"]
    },
    {
        id: 3,
        nome: "Grand Urban Hotel Paulista",
        destino: "São Paulo, Brasil",
        categoria: "Urbano",
        preco: 430,
        avaliacao: 4.6,
        imagem: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=800&q=80",
        comodidades: ["Academia 24h", "Estacionamento", "Wi-Fi Grátis", "Café da Manhã"]
    },
    {
        id: 4,
        nome: "Resort Paradisíaco Fernando de Noronha",
        destino: "Fernando de Noronha, Brasil",
        categoria: "Praia",
        preco: 1400,
        avaliacao: 5.0,
        imagem: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=800&q=80",
        comodidades: ["All Inclusive", "Mergulho", "Piscina Infinita", "Frente ao Mar"]
    },
    {
        id: 5,
        nome: "Hotel & Spa Campos do Jordão",
        destino: "Campos do Jordão, Brasil",
        categoria: "Montanha",
        preco: 580,
        avaliacao: 4.7,
        imagem: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&w=800&q=80",
        comodidades: ["Spa", "Hidromassagem", "Wi-Fi Grátis", "Vista Panorâmica"]
    },
    {
        id: 6,
        nome: "Boutique Hotel Jardins",
        destino: "São Paulo, Brasil",
        categoria: "Urbano",
        preco: 510,
        avaliacao: 4.8,
        imagem: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80",
        comodidades: ["Restaurante Gourmet", "Wi-Fi Grátis", "Bar", "Serviço de Quarto"]
    }
];

let categoriaAtual = 'todos';

// Inicializar a aplicação ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
    const hoje = new Date();
    const amanha = new Date();
    amanha.setDate(hoje.getDate() + 3);

    document.getElementById('data-checkin').valueAsDate = hoje;
    document.getElementById('data-checkout').valueAsDate = amanha;

    renderizarHoteis(hoteis);
    atualizarContadorBadge();
});

// Renderizar hotéis no DOM
function renderizarHoteis(lista) {
    const grid = document.getElementById('grid-hoteis');
    const contador = document.getElementById('contador-resultados');
    
    grid.innerHTML = '';
    contador.textContent = `${lista.length} hotéis encontrados`;

    if (lista.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                <i class="fa-solid fa-face-sad-tear text-4xl text-slate-300 mb-3"></i>
                <h3 class="text-lg font-bold text-slate-700">Nenhum hotel encontrado</h3>
                <p class="text-slate-400 text-sm mt-1">Tente buscar por outro destino ou categoria.</p>
            </div>
        `;
        return;
    }

    lista.forEach(hotel => {
        const comodidadesHTML = hotel.comodidades.slice(0, 3).map(c => 
            `<span class="bg-slate-100 text-slate-600 text-xs px-2.5 py-1 rounded-lg font-medium">${c}</span>`
        ).join('');

        const card = document.createElement('div');
        card.className = "bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition border border-slate-100 flex flex-col justify-between group";
        card.innerHTML = `
            <div>
                <div class="relative h-56 overflow-hidden">
                    <img src="${hotel.imagem}" alt="${hotel.nome}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
                    <span class="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-slate-800 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-md">
                        ${hotel.categoria}
                    </span>
                    <div class="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-lg flex items-center space-x-1">
                        <i class="fa-solid fa-star text-amber-400"></i>
                        <span>${hotel.avaliacao}</span>
                    </div>
                </div>
                <div class="p-6">
                    <div class="flex items-center space-x-1 text-xs text-indigo-600 font-bold mb-1">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${hotel.destino}</span>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">${hotel.nome}</h3>
                    <div class="flex flex-wrap gap-1.5 mb-6">
                        ${comodidadesHTML}
                    </div>
                </div>
            </div>
            <div class="p-6 pt-0 flex items-center justify-between border-t border-slate-50 mt-4">
                <div>
                    <span class="text-xs text-slate-400 font-semibold block">A partir de</span>
                    <span class="text-xl font-extrabold text-indigo-600">R$ ${hotel.preco}</span>
                    <span class="text-xs text-slate-400">/noite</span>
                </div>
                <button onclick="abrirModalReserva(${hotel.id})" class="bg-indigo-600 text-white font-bold px-5 py-3 rounded-xl hover:bg-indigo-700 transition shadow-md shadow-indigo-100">
                    Reservar
                </button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Filtrar por categoria de estilo de viagem
function mudarCategoria(cat, event) {
    categoriaAtual = cat;
    
    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.classList.remove('bg-indigo-600', 'text-white');
        btn.classList.add('bg-white', 'text-slate-600');
    });
    event.currentTarget.classList.remove('bg-white', 'text-slate-600');
    event.currentTarget.classList.add('bg-indigo-600', 'text-white');

    aplicarFiltros();
}

function filtrarHoteis() {
    aplicarFiltros();
}

// Lógica combinada de filtros (categoria + texto de busca)
function aplicarFiltros() {
    const termo = document.getElementById('filtro-destino').value.toLowerCase();
    
    const filtrados = hoteis.filter(hotel => {
        const matchCategoria = categoriaAtual === 'todos' || hotel.categoria === categoriaAtual;
        const matchDestino = hotel.destino.toLowerCase().includes(termo) || hotel.nome.toLowerCase().includes(termo);
        return matchCategoria && matchDestino;
    });

    renderizarHoteis(filtrados);
}

// Abrir Modal de Reserva
function abrirModalReserva(hotelId) {
    const hotel = hoteis.find(h => h.id === hotelId);
    if (!hotel) return;

    document.getElementById('reserva-hotel-id').value = hotel.id;
    document.getElementById('modal-hotel-nome').textContent = hotel.nome;
    document.getElementById('modal-categoria').textContent = hotel.categoria;

    const checkinHero = document.getElementById('data-checkin').value;
    const checkoutHero = document.getElementById('data-checkout').value;

    if (checkinHero) document.getElementById('reserva-checkin').value = checkinHero;
    if (checkoutHero) document.getElementById('reserva-checkout').value = checkoutHero;

    calcularPrecoTotal(hotel.preco);

    document.getElementById('reserva-checkin').onchange = () => calcularPrecoTotal(hotel.preco);
    document.getElementById('reserva-checkout').onchange = () => calcularPrecoTotal(hotel.preco);

    document.getElementById('modal-reserva').classList.remove('hidden');
}

function fecharModal() {
    document.getElementById('modal-reserva').classList.add('hidden');
}

// Cálculo automático de diárias e preço total
function calcularPrecoTotal(precoDiaria) {
    const checkin = new Date(document.getElementById('reserva-checkin').value);
    const checkout = new Date(document.getElementById('reserva-checkout').value);
    
    const diffTime = checkout - checkin;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const diarias = diffDays > 0 ? diffDays : 1;
    const total = diarias * precoDiaria;

    document.getElementById('modal-preco-total').textContent = `R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
    document.getElementById('modal-diarias-calc').textContent = `${diarias} ${diarias === 1 ? 'diária' : 'diárias'}`;
}

// Salvar a reserva no localStorage do navegador
function confirmarReserva(e) {
    e.preventDefault();

    const hotelId = document.getElementById('reserva-hotel-id').value;
    const hotel = hoteis.find(h => h.id == hotelId);
    
    const checkin = document.getElementById('reserva-checkin').value;
    const checkout = document.getElementById('reserva-checkout').value;
    const nome = document.getElementById('reserva-nome').value;
    const email = document.getElementById('reserva-email').value;
    const hospedes = document.getElementById('reserva-hospedes').value;
    const pagamento = document.getElementById('reserva-pagamento').value;
    
    const diffTime = new Date(checkout) - new Date(checkin);
    const diarias = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const valorTotal = diarias * hotel.preco;

    const novaReserva = {
        id: 'WTL-' + Math.floor(100000 + Math.random() * 900000),
        hotelNome: hotel.nome,
        hotelDestino: hotel.destino,
        hotelImagem: hotel.imagem,
        checkin,
        checkout,
        nome,
        email,
        hospedes,
        pagamento,
        valorTotal: valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        dataCriacao: new Date().toLocaleDateString('pt-BR')
    };

    let reservas = JSON.parse(localStorage.getItem('wanderlust_reservas')) || [];
    reservas.push(novaReserva);
    localStorage.setItem('wanderlust_reservas', JSON.stringify(reservas));

    fecharModal();
    atualizarContadorBadge();
    
    alert(`Reserva realizada com sucesso! Voucher ID: ${novaReserva.id}`);
    document.getElementById('form-reserva').reset();
}

// Atualizar indicador de quantidade de reservas
function atualizarContadorBadge() {
    const reservas = JSON.parse(localStorage.getItem('wanderlust_reservas')) || [];
    const badge = document.getElementById('badge-reservas');
    
    if (reservas.length > 0) {
        badge.textContent = reservas.length;
        badge.classList.remove('hidden');
    } else {
        badge.classList.add('hidden');
    }
}

// Visualizar reservas salvas
function abrirMinhasReservas() {
    const listaContainer = document.getElementById('lista-minhas-reservas');
    const reservas = JSON.parse(localStorage.getItem('wanderlust_reservas')) || [];

    listaContainer.innerHTML = '';

    if (reservas.length === 0) {
        listaContainer.innerHTML = `
            <div class="text-center py-12 bg-white rounded-2xl shadow-sm border border-slate-100">
                <i class="fa-solid fa-ticket-simple text-4xl text-slate-300 mb-3"></i>
                <h3 class="text-lg font-bold text-slate-700">Nenhuma reserva encontrada</h3>
                <p class="text-slate-400 text-sm mt-1">Suas viagens confirmadas aparecerão aqui.</p>
            </div>
        `;
    } else {
        reservas.forEach((res, index) => {
            const card = document.createElement('div');
            card.className = "bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4";
            card.innerHTML = `
                <div class="flex items-center space-x-4 w-full sm:w-auto">
                    <img src="${res.hotelImagem}" class="w-16 h-16 rounded-xl object-cover shrink-0">
                    <div>
                        <span class="text-xs font-bold bg-indigo-50 text-indigo-600 px-2.5 py-0.5 rounded-md">${res.id}</span>
                        <h4 class="font-bold text-slate-900 mt-1">${res.hotelNome}</h4>
                        <p class="text-xs text-slate-500"><i class="fa-solid fa-calendar mr-1"></i> ${res.checkin} até ${res.checkout}</p>
                        <p class="text-xs font-semibold text-slate-700 mt-1">Hóspede: ${res.nome} (${res.hospedes} pessoa/s)</p>
                    </div>
                </div>
                <div class="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-100">
                    <span class="text-indigo-600 font-extrabold text-lg">${res.valorTotal}</span>
                    <button onclick="cancelarReserva(${index})" class="text-rose-500 hover:text-rose-700 text-xs font-bold mt-2 flex items-center space-x-1 bg-rose-50 px-3 py-1.5 rounded-lg transition">
                        <i class="fa-solid fa-trash"></i> <span>Cancelar</span>
                    </button>
                </div>
            `;
            listaContainer.appendChild(card);
        });
    }

    document.getElementById('modal-minhas-reservas').classList.remove('hidden');
}

function fecharMinhasReservas() {
    document.getElementById('modal-minhas-reservas').classList.add('hidden');
}

// Cancelar reserva e atualizar listagem e localStorage
function cancelarReserva(index) {
    if (confirm("Deseja realmente cancelar esta reserva?")) {
        let reservas = JSON.parse(localStorage.getItem('wanderlust_reservas')) || [];
        reservas.splice(index, 1);
        localStorage.setItem('wanderlust_reservas', JSON.stringify(reservas));
        atualizarContadorBadge();
        abrirMinhasReservas();
    }
}