// PRODUTOS INICIAIS (PERFUMES ÁRABES)
const defaultProducts = [
    {
        name: "Lattafa Asad Eau de Parfum 100ml",
        family: "Oud & Especiarias",
        price: 249.90,
        stock: 8,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Club de Nuit Intense Man - Armaf 105ml",
        family: "Amadeirado Oriental",
        price: 310.00,
        stock: 5,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Khamrah Qahwa - Lattafa 100ml",
        family: "Doce & Baunilha",
        price: 289.00,
        stock: 12,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Bade'e Al Oud Honor & Glory 100ml",
        family: "Oud & Especiarias",
        price: 275.00,
        stock: 6,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Hawas for Him - Rasasi 100ml",
        family: "Floral Frutal Intenso",
        price: 330.00,
        stock: 4,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?auto=format&fit=crop&w=500&q=80"
    }
];

// Carregar inventário do LocalStorage ou usar padrões
let products = JSON.parse(localStorage.getItem('arb_perfumes_products')) || defaultProducts;

document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    setupSearch();
});

// Salvar no LocalStorage
function saveData() {
    localStorage.setItem('arb_perfumes_products', JSON.stringify(products));
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
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 30px;">Nenhum perfume encontrado.</p>`;
        return;
    }

    container.innerHTML = list.map((prod) => {
        const imageUrl = prod.image && prod.image.trim() !== '' 
            ? prod.image 
            : 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=500&q=80';

        return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${prod.name}" onerror="this.src='https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=500&q=80'">
                    ${prod.promo === 'sim' ? '<span class="promo-tag">Promoção</span>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.family}</span>
                    <h4 class="product-name">${prod.name}</h4>
                    <p style="font-size: 0.8rem; color: ${prod.stock > 0 ? 'var(--accent-light)' : '#8b0000'}; margin-bottom: 10px;">
                        <i class="fa-solid fa-boxes-stacked"></i> Estoque: ${prod.stock} un.
                    </p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${Number(prod.price).toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="requestQuoteWhatsApp('${prod.name.replace(/'/g, "")}', ${prod.price})">
                            <i class="fa-brands fa-whatsapp"></i> Comprar
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
    const family = document.getElementById('prodFamily').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const promo = document.getElementById('prodPromo').value;
    const image = document.getElementById('prodImage').value;

    const newProd = { name, family, price, stock, promo, image };

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
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum perfume cadastrado.</td></tr>`;
        return;
    }

    tbody.innerHTML = products.map((prod, index) => `
        <tr>
            <td><strong>${prod.name}</strong></td>
            <td>${prod.family}</td>
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
    document.getElementById('prodFamily').value = prod.family;
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
    if (confirm("Deseja realmente remover este perfume do estoque?")) {
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

// PEDIDOS E CONTATO VIA WHATSAPP
function requestQuoteWhatsApp(productName, price) {
    const message = `Olá, *ARB Perfumes*! Tenho interesse em adquirir o seguinte perfume:\n\n• *${productName}* (R$ ${price.toFixed(2)})\n\nPoderia me confirmar a disponibilidade para envio?`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5589991112233?text=${encoded}`, '_blank');
}

function openWhatsAppContact() {
    const message = `Olá, *ARB Perfumes*! Gostaria de tirar dúvidas com o consultor sobre fragrâncias orientais.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/5589991112233?text=${encoded}`, '_blank');
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

        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.family.toLowerCase().includes(query));
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
    alert("Mensagem enviada com sucesso! Nosso consultor ARB entrará em contato em breve.");
    event.target.reset();
}