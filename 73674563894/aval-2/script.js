// PRODUTOS INICIAIS (JANELAS DE MADEIRA)
const defaultProducts = [
    {
        name: "Janela Veneziana de Correr 1,20x1,00m",
        wood: "Itaúba",
        price: 780.00,
        stock: 6,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Janela Basculante Banheiro 0,60x0,60m",
        wood: "Cedro",
        price: 290.00,
        stock: 12,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Janela de Abrir 2 Folhas 1,00x1,00m",
        wood: "Angelim",
        price: 640.00,
        stock: 4,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Janela com Grade Colonial 1,20x1,20m",
        wood: "Itaúba",
        price: 950.00,
        stock: 3,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Janela Pivotante Moderna 1,00x0,80m",
        wood: "Eucalipto Tratado",
        price: 520.00,
        stock: 8,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80"
    }
];

// Carregar inventário do LocalStorage ou usar padrões
let products = JSON.parse(localStorage.getItem('mata_madeira_products')) || defaultProducts;

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    setupSearch();
});

// Salvar no LocalStorage
function saveData() {
    localStorage.setItem('mata_madeira_products', JSON.stringify(products));
}

// Alternar abas do menu solicitado
function switchSection(sectionId) {
    document.querySelectorAll('.section-content').forEach(sec => {
        sec.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    const targetSection = document.getElementById(`section-${sectionId}`);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (targetLink) {
        targetLink.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Renderização geral das abas
function renderAll() {
    renderCatalog('productGrid', products);
    renderCatalog('gridPromocoes', products.filter(p => p.promo === 'sim'));
    renderStockTable();
}

// Renderizar catálogos
function renderCatalog(containerId, list) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 30px;">Nenhuma janela encontrada.</p>`;
        return;
    }

    container.innerHTML = list.map((prod) => {
        const realIndex = products.indexOf(prod);
        const imageUrl = prod.image && prod.image.trim() !== '' 
            ? prod.image 
            : 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80';

        return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${prod.name}" onerror="this.src='https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=500&q=80'">
                    ${prod.promo === 'sim' ? '<span class="promo-tag">Promoção</span>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">Madeira: ${prod.wood}</span>
                    <h4 class="product-name">${prod.name}</h4>
                    <p style="font-size: 0.8rem; color: ${prod.stock > 0 ? '#4a3525' : '#a4243b'}; margin-bottom: 10px;">
                        <i class="fa-solid fa-boxes-stacked"></i> Estoque: ${prod.stock} un.
                    </p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${Number(prod.price).toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="requestQuoteWhatsApp('${prod.name.replace(/'/g, "")}', ${prod.price})">
                            <i class="fa-brands fa-whatsapp"></i> Orçamento
                        </button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// GERENCIAMENTO DE ESTOQUE
function handleAddProduct(event) {
    event.preventDefault();
    const editIndex = parseInt(document.getElementById('editIndex').value);
    
    const name = document.getElementById('prodName').value;
    const wood = document.getElementById('prodWood').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const promo = document.getElementById('prodPromo').value;
    const image = document.getElementById('prodImage').value;

    const newProd = { name, wood, price, stock, promo, image };

    if (editIndex === -1) {
        products.push(newProd);
    } else {
        products[editIndex] = newProd;
        document.getElementById('editIndex').value = -1;
        document.getElementById('cancelEditBtn').style.display = 'none';
    }

    saveData();
    renderAll();
    document.getElementById('productForm').reset();
    alert("Estoque atualizado com sucesso!");
}

function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhuma janela cadastrada.</td></tr>`;
        return;
    }

    tbody.innerHTML = products.map((prod, index) => `
        <tr>
            <td><strong>${prod.name}</strong></td>
            <td>${prod.wood}</td>
            <td>R$ ${Number(prod.price).toFixed(2)}</td>
            <td>${prod.stock} un.</td>
            <td>${prod.promo === 'sim' ? '<span style="color:var(--accent); font-weight:600;">Sim</span>' : 'Não'}</td>
            <td>
                <button class="btn btn-warning" onclick="editProduct(${index})"><i class="fa-solid fa-pen"></i></button>
                <button class="btn btn-danger" onclick="deleteProduct(${index})"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function editProduct(index) {
    const prod = products[index];
    document.getElementById('editIndex').value = index;
    document.getElementById('prodName').value = prod.name;
    document.getElementById('prodWood').value = prod.wood;
    document.getElementById('prodPrice').value = prod.price;
    document.getElementById('prodStock').value = prod.stock;
    document.getElementById('prodPromo').value = prod.promo;
    document.getElementById('prodImage').value = prod.image || '';
    document.getElementById('cancelEditBtn').style.display = 'inline-flex';
    
    switchSection('estoque');
    window.scrollTo({ top: 200, behavior: 'smooth' });
}

function cancelEdit() {
    document.getElementById('editIndex').value = -1;
    document.getElementById('productForm').reset();
    document.getElementById('cancelEditBtn').style.display = 'none';
}

function deleteProduct(index) {
    if (confirm("Deseja realmente remover esta janela do estoque?")) {
        products.splice(index, 1);
        saveData();
        renderAll();
    }
}

// CUPONS
function copyCoupon(code) {
    navigator.clipboard.writeText(code);
    alert(`Cupom "${code}" copiado com sucesso! Informe-o ao vendedor.`);
}

// ORÇAMENTOS E CONTATO VIA WHATSAPP
function requestQuoteWhatsApp(productName, price) {
    const message = `Olá, *Mata & Madeira*! Gostaria de solicitar um orçamento para o modelo:\n\n• *${productName}* (R$ ${price.toFixed(2)})\n\nPoderia me informar prazos de entrega e disponibilidade?`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5589988776655?text=${encoded}`, '_blank');
}

function openWhatsAppContact() {
    const message = `Olá, *Mata & Madeira*! Preciso de ajuda de um vendedor com um projeto de janelas em madeira.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5589988776655?text=${encoded}`, '_blank');
}

// BUSCA
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');

    const executeSearch = () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            renderAll();
            switchSection('todos');
            return;
        }

        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.wood.toLowerCase().includes(query));
        switchSection('todos');
        renderCatalog('productGrid', filtered);
    };

    if (searchBtn) searchBtn.addEventListener('click', executeSearch);
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') executeSearch();
        });
    }
}

// FORMULÁRIO DE CONTATO
function handleContact(event) {
    event.preventDefault();
    alert("Solicitação enviada com sucesso! Um de nossos vendedores especialistas entrará em contato em breve.");
    event.target.reset();
}