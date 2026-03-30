
const products = [
    {
        id: 1,
        name: "Fone de Ouvido Alpha Pro",
        price: 199.90,
        description: "Cancelamento de ruído ativo • 40h de bateria",
        image: "🎧"
    },
    {
        id: 2,
        name: "Smartphone Alpha 5G",
        price: 1499.90,
        description: "Tela 6.8\" AMOLED 120Hz • Câmera 108MP",
        image: "📱"
    },
    {
        id: 3,
        name: "Notebook Alpha Ultra",
        price: 3499.90,
        description: "Intel i9 • 32GB RAM • RTX 4060 • 1TB SSD",
        image: "💻"
    },
    {
        id: 4,
        name: "Smartwatch Alpha Fit",
        price: 299.90,
        description: "Monitoramento cardíaco • GPS • 15 dias de bateria",
        image: "⌚"
    },
    {
        id: 5,
        name: "Caixa de Som Alpha Boom",
        price: 449.90,
        description: "Potência 80W • À prova d'água • Bluetooth 5.3",
        image: "🔊"
    },
    {
        id: 6,
        name: "Tablet Alpha Vision",
        price: 899.90,
        description: "11\" 2.5K • 128GB • Caneta incluída",
        image: "📟"
    }
]


let cart = []


function loadCart() {
    const savedCart = localStorage.getItem('alphaCart')
    if (savedCart) {
        cart = JSON.parse(savedCart)
        updateCartCount()
    }
}

function saveCart() {
    localStorage.setItem('alphaCart', JSON.stringify(cart))
}


function addToCart(id) {
    const product = products.find(p => p.id === id)
    if (!product) return

    const existingItem = cart.find(item => item.id === id)

    if (existingItem) {
        existingItem.quantity++
    } else {
        cart.push({ ...product, quantity: 1 })
    }

    saveCart()
    updateCartCount()
    showToast(`✅ ${product.name} adicionado ao carrinho!`)
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id)
    saveCart()
    updateCartCount()
    showCart()
}

function changeQuantity(id, change) {
    const item = cart.find(item => item.id === id)
    if (!item) return
    
    item.quantity += change
    
    if (item.quantity < 1) {
        removeFromCart(id)
    } else {
        saveCart()
        showCart()
    }
}

function updateCartCount() {
    const countElement = document.getElementById('cart-count')
    if (countElement) {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)
        countElement.textContent = totalItems
    }
}

function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
}


function showCart() {
    const modal = document.getElementById('cart-modal')
    const container = document.getElementById('cart-items-container')
    const totalElement = document.getElementById('cart-total-value')
    
    if (!modal || !container) return

    container.innerHTML = ''

    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Seu carrinho está vazio</p>
                <p style="font-size: 3rem; margin: 20px 0;">🛒</p>
                <button onclick="closeCart()" class="btn">Ver produtos</button>
            </div>
        `
        totalElement.textContent = '0,00'
        modal.style.display = 'flex'
        return
    }

    let html = ''

    cart.forEach(item => {
        const subtotal = item.price * item.quantity
        html += `
            <div class="cart-item">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <span style="font-size: 2.5rem;">${item.image}</span>
                    <div>
                        <h4>${item.name}</h4>
                        <p style="color: #00ff88; margin-top: 4px;">R$ ${item.price.toFixed(2)}</p>
                    </div>
                </div>
                
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button onclick="changeQuantity(${item.id}, -1)" style="background: #222; color: #fff; width: 32px; height: 32px; border-radius: 50%; border: none; font-size: 1.3rem;">–</button>
                    <span style="font-size: 1.4rem; min-width: 30px; text-align: center;">${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)" style="background: #222; color: #fff; width: 32px; height: 32px; border-radius: 50%; border: none; font-size: 1.3rem;">+</button>
                    
                    <span style="margin-left: 20px; font-size: 1.4rem; color: #00ff88; font-weight: bold;">
                        R$ ${subtotal.toFixed(2)}
                    </span>
                    
                    <button onclick="removeFromCart(${item.id})" style="background: #ff0044; color: #fff; border: none; padding: 6px 12px; border-radius: 8px; margin-left: 15px;">🗑</button>
                </div>
            </div>
        `
    })

    container.innerHTML = html
    totalElement.textContent = calculateTotal().toFixed(2)
    modal.style.display = 'flex'
}

function closeCart() {
    const modal = document.getElementById('cart-modal')
    if (modal) modal.style.display = 'none'
}


function checkout() {
    if (cart.length === 0) return
    
    closeCart()
    
    setTimeout(() => {
        const total = calculateTotal().toFixed(2)
        alert(`🎉 COMPRA REALIZADA COM SUCESSO!\n\nTotal: R$ ${total}\n\nObrigado por comprar na Alpha Store!`)
        
        cart = []
        saveCart()
        updateCartCount()
    }, 600)
}


function renderProducts() {
    const grid = document.getElementById('product-grid')
    if (!grid) return
    
    grid.innerHTML = products.map(product => `
        <div class="product-card">
            <div style="font-size: 6rem; text-align: center; padding: 20px 0; background: #1a1a1a;">
                ${product.image}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <div class="price">R$ ${product.price.toFixed(2)}</div>
                <button onclick="addToCart(${product.id})" class="btn">
                    Adicionar ao Carrinho
                </button>
            </div>
        </div>
    `).join('')
}


function showSection(section) {
    if (section === 'home') {
        document.getElementById('about').style.display = 'none'
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' })
    } else if (section === 'about') {
        document.getElementById('about').style.display = 'block'
        document.getElementById('about').scrollIntoView({ behavior: 'smooth' })
    }
}


function showToast(message) {
    const toast = document.createElement('div')
    toast.style.cssText = `
        position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%);
        background: #00ff88; color: #000; padding: 16px 30px; border-radius: 50px;
        font-weight: bold; box-shadow: 0 10px 20px rgba(0,255,136,0.4);
        z-index: 2000; animation: slideUp 0.4s ease forwards;
    `
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
        toast.style.animation = 'slideDown 0.4s ease forwards'
        setTimeout(() => toast.remove(), 400)
    }, 3000)
}


function init() {
    loadCart()
    renderProducts()
    updateCartCount()
    

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('cart-modal')
            if (modal && modal.style.display === 'flex') closeCart()
        }
    })
    
    console.log('%c🚀 Alpha Store JavaScript carregado com sucesso!', 'color:#00ff88; font-size:16px')
}


window.onload = init