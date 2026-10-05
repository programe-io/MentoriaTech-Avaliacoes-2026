// PRODUTOS INICIAIS DA LOJA
const defaultProducts = [
    {
        name: "Vaso de Cerâmica Rústica",
        category: "objetos",
        price: 89.90,
        stock: 5,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Bolsa de Palha de Carnaúba",
        category: "acessorios",
        price: 145.00,
        stock: 3,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Boneca de Pano Tradicional",
        category: "objetos",
        price: 65.00,
        stock: 8,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Colar Orgânico Biojoia",
        category: "acessorios",
        price: 49.90,
        stock: 12,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Tapete de Crochê Geométrico",
        category: "objetos",
        price: 120.00,
        stock: 4,
        promo: "sim",
        image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=500&q=80"
    },
    {
        name: "Cesto Organizador em Fibra",
        category: "objetos",
        price: 75.00,
        stock: 6,
        promo: "nao",
        image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=500&q=80"
    }
];

// Carregar produtos e carrinho do LocalStorage ou usar padrões
let products = JSON.parse(localStorage.getItem('elainy_products')) || defaultProducts;
let cart = JSON.parse(localStorage.getItem('elainy_cart')) || [];

// Executado ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    renderAll();
    setupSearch();
});

// Salvar dados no LocalStorage
function saveData() {
    localStorage.setItem('elainy_products', JSON.stringify(products));
    localStorage.setItem('elainy_cart', JSON.stringify(cart));
}

// Alternar abas do menu
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

// Renderizar todas as seções e catálogos
function renderAll() {
    renderCatalog('productGrid', products);
    renderCatalog('gridObjetos', products.filter(p => p.category === 'objetos'));
    renderCatalog('gridAcessorios', products.filter(p => p.category === 'acessorios'));
    renderCatalog('gridPromocoes', products.filter(p => p.promo === 'sim'));
    renderStockTable();
    renderCart();
    updateCartBadge();
}

// Renderizar grade de produtos
function renderCatalog(containerId, list) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (list.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-light); padding: 30px;">Nenhuma peça encontrada nesta categoria.</p>`;
        return;
    }

    container.innerHTML = list.map((prod, index) => {
        const realIndex = products.indexOf(prod);
        const imageUrl = prod.image && prod.image.trim() !== '' 
            ? prod.image 
            : 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80';

        return `
            <div class="product-card">
                <div class="product-image-container">
                    <img src="${imageUrl}" alt="${prod.name}" onerror="this.src='https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80'">
                    ${prod.promo === 'sim' ? '<span class="promo-tag">Promoção</span>' : ''}
                </div>
                <div class="product-info">
                    <span class="product-category">${prod.category.toUpperCase()}</span>
                    <h4 class="product-name">${prod.name}</h4>
                    <p style="font-size: 0.8rem; color: ${prod.stock > 0 ? 'var(--primary)' : '#bc4749'}; margin-bottom: 10px;">
                        <i class="fa-solid fa-box"></i> Estoque: ${prod.stock} un.
                    </p>
                    <div class="product-footer">
                        <span class="product-price">R$ ${Number(prod.price).toFixed(2)}</span>
                        <button class="btn btn-primary" onclick="addToCart(${realIndex})" ${prod.stock <= 0 ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                            <i class="fa-solid fa-cart-plus"></i> Comprar
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
    const category = document.getElementById('prodCategory').value;
    const price = parseFloat(document.getElementById('prodPrice').value);
    const stock = parseInt(document.getElementById('prodStock').value);
    const promo = document.getElementById('prodPromo').value;
    const image = document.getElementById('prodImage').value;

    const newProd = { name, category, price, stock, promo, image };

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
}

function renderStockTable() {
    const tbody = document.getElementById('stockTableBody');
    if (!tbody) return;

    if (products.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align: center;">Nenhum produto cadastrado no estoque.</td></tr>`;
        return;
    }

    tbody.innerHTML = products.map((prod, index) => `
        <tr>
            <td><strong>${prod.name}</strong></td>
            <td>${prod.category.toUpperCase()}</td>
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
    document.getElementById('prodCategory').value = prod.category;
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
    if (confirm("Tem certeza que deseja excluir este produto do estoque?")) {
        products.splice(index, 1);
        saveData();
        renderAll();
    }
}

// CARRINHO DE COMPRAS
function addToCart(productIndex) {
    const prod = products[productIndex];
    if (prod.stock <= 0) {
        alert("Produto esgotado!");
        return;
    }

    const existingCartItem = cart.find(item => item.productIndex === productIndex);
    if (existingCartItem) {
        if (existingCartItem.quantity < prod.stock) {
            existingCartItem.quantity++;
        } else {
            alert("Quantidade máxima disponível em estoque atingida!");
            return;
        }
    } else {
        cart.push({ productIndex, quantity: 1 });
    }

    saveData();
    renderCart();
    updateCartBadge();
    alert(`"${prod.name}" foi adicionado ao carrinho!`);
}

function updateCartQuantity(cartIndex, delta) {
    const item = cart[cartIndex];
    const prod = products[item.productIndex];

    const newQty = item.quantity + delta;
    if (newQty > 0) {
        if (newQty <= prod.stock) {
            item.quantity = newQty;
        } else {
            alert("Estoque insuficiente para esta quantidade.");
            return;
        }
    } else {
        cart.splice(cartIndex, 1);
    }

    saveData();
    renderCart();
    updateCartBadge();
}

function removeFromCart(cartIndex) {
    cart.splice(cartIndex, 1);
    saveData();
    renderCart();
    updateCartBadge();
}

function renderCart() {
    const listContainer = document.getElementById('cartItemsList');
    const subtotalEl = document.getElementById('cartSubtotal');
    const totalEl = document.getElementById('cartTotal');
    if (!listContainer) return;

    if (cart.length === 0) {
        listContainer.innerHTML = `<div class="card" style="text-align: center; padding: 40px;"><p style="color: var(--text-light); margin-bottom: 15px;">Seu carrinho está vazio.</p><button class="btn btn-primary" onclick="switchSection('todos')">Ver Peças Artesanais</button></div>`;
        subtotalEl.innerText = "R$ 0,00";
        totalEl.innerText = "R$ 0,00";
        return;
    }

    let subtotal = 0;
    listContainer.innerHTML = cart.map((item, cartIdx) => {
        const prod = products[item.productIndex];
        const itemTotal = prod.price * item.quantity;
        subtotal += itemTotal;
        const imageUrl = prod.image || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=500&q=80';

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <img src="${imageUrl}" alt="${prod.name}">
                    <div>
                        <h5>${prod.name}</h5>
                        <span>R$ ${Number(prod.price).toFixed(2)} cada</span>
                    </div>
                </div>
                <div class="cart-quantity-controls">
                    <button onclick="updateCartQuantity(${cartIdx}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateCartQuantity(${cartIdx}, 1)">+</button>
                </div>
                <strong>R$ ${itemTotal.toFixed(2)}</strong>
                <button class="btn btn-danger" onclick="removeFromCart(${cartIdx})"><i class="fa-solid fa-trash"></i></button>
            </div>
        `;
    }).join('');

    subtotalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
    totalEl.innerText = `R$ ${subtotal.toFixed(2)}`;
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (!badge) return;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
}

// FINALIZAR PEDIDO NO WHATSAPP
function checkoutWhatsApp() {
    if (cart.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let message = "Olá, *Elainy Artesanato*! Gostaria de encomendar os seguintes produtos:\n\n";
    let total = 0;

    cart.forEach(item => {
        const prod = products[item.productIndex];
        const itemTotal = prod.price * item.quantity;
        total += itemTotal;
        message += `• ${item.quantity}x ${prod.name} - R$ ${itemTotal.toFixed(2)}\n`;
    });

    message += `\n*Total do Pedido: R$ ${total.toFixed(2)}*\n\nComo procedemos com o pagamento e frete?`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5589999887766?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
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

        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));
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
    alert("Mensagem enviada com sucesso! A artesã Elainy entrará em contato em breve.");
    event.target.reset();
}