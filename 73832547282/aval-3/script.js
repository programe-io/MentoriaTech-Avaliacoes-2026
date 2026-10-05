// DADOS DAS OBRAS E ESTOQUE DO MUSEU
const galleryData = [
  {
    id: 1,
    title: "A Noite Estrelada",
    year: "1889",
    price: 85.00,
    stock: 8,
    type: "Réplica Impressa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/320px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg"
  },
  {
    id: 2,
    title: "Girassóis",
    year: "1888",
    price: 75.00,
    stock: 5,
    type: "Réplica Impressa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Vincent_Willem_van_Gogh_127.jpg/320px-Vincent_Willem_van_Gogh_127.jpg"
  },
  {
    id: 3,
    title: "O Quarto em Arles",
    year: "1888",
    price: 90.00,
    stock: 3,
    type: "Réplica Impressa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/320px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg"
  },
  {
    id: 4,
    title: "Terraço do Café à Noite",
    year: "1888",
    price: 80.00,
    stock: 12,
    type: "Réplica Impressa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Vincent_Van_Gogh_-_Caf%C3%A9_Terrace_at_Night_%281888%29.jpg/320px-Vincent_Van_Gogh_-_Caf%C3%A9_Terrace_at_Night_%281888%29.jpg"
  },
  {
    id: 5,
    title: "Amendoeira em Flor",
    year: "1890",
    price: 95.00,
    stock: 2,
    type: "Réplica Impressa",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg/320px-Vincent_van_Gogh_-_Almond_blossom_-_Google_Art_Project.jpg"
  },
  {
    id: 6,
    title: "Autorretrato com Chapéu de Feltro",
    year: "1887",
    price: 110.00,
    stock: 0,
    type: "Réplica Especial",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg/320px-Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg"
  }
];

let cart = [];

// INICIALIZAR RENDERIZAÇÃO
document.addEventListener("DOMContentLoaded", () => {
  renderGallery();
  renderInventory();
});

// RENDERIZAR CARDS DAS OBRAS
function renderGallery() {
  const grid = document.getElementById('gallery-grid');
  grid.innerHTML = '';

  galleryData.forEach(item => {
    const isOut = item.stock === 0;
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="card-content">
        <div class="card-title">${item.title}</div>
        <div class="card-subtitle">Ano: ${item.year} | Tipo: ${item.type}</div>
        <div class="card-price">R$ ${item.price.toFixed(2)}</div>
        <button 
          class="btn ${isOut ? 'btn-disabled' : 'btn-gold'}" 
          ${isOut ? 'disabled' : ''} 
          onclick="addToCart('${item.title}', ${item.price}, '${item.image}', ${item.id})">
          ${isOut ? 'Esgotado' : 'Adicionar ao Carrinho'}
        </button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// RENDERIZAR TABELA DE ESTOQUE
function renderInventory() {
  const list = document.getElementById('inventory-list');
  list.innerHTML = '';

  galleryData.forEach(item => {
    let badgeClass = 'stock-high';
    let text = `${item.stock} unidades`;

    if (item.stock === 0) {
      badgeClass = 'stock-out';
      text = 'Esgotado';
    } else if (item.stock <= 3) {
      badgeClass = 'stock-low';
      text = `Baixo: ${item.stock} restantes`;
    }

    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${item.title}</strong></td>
      <td>${item.year}</td>
      <td>${item.type}</td>
      <td>R$ ${item.price.toFixed(2)}</td>
      <td><span class="stock-badge ${badgeClass}">${text}</span></td>
    `;
    list.appendChild(tr);
  });
}

// ADICIONAR ITEM AO CARRINHO
function addToCart(title, price, image, id = null) {
  if (id) {
    const item = galleryData.find(g => g.id === id);
    if (item && item.stock > 0) {
      item.stock -= 1;
    } else if (item && item.stock <= 0) {
      alert("Desculpe, item esgotado!");
      return;
    }
  }

  const existingItem = cart.find(c => c.title === title);
  if (existingItem) {
    existingItem.qty += 1;
  } else {
    cart.push({ id, title, price, image, qty: 1 });
  }

  updateCartUI();
  renderGallery();
  renderInventory();

  // Abrir o carrinho ao adicionar
  document.getElementById('cartModal').classList.add('active');
  document.getElementById('cartOverlay').style.display = 'block';
}

// REMOVER ITEM DO CARRINHO
function removeFromCart(title) {
  const itemIndex = cart.findIndex(c => c.title === title);
  if (itemIndex > -1) {
    const cartItem = cart[itemIndex];
    if (cartItem.id) {
      const galleryItem = galleryData.find(g => g.id === cartItem.id);
      if (galleryItem) galleryItem.stock += cartItem.qty;
    }
    cart.splice(itemIndex, 1);
  }

  updateCartUI();
  renderGallery();
  renderInventory();
}

// ATUALIZAR UI DO CARRINHO
function updateCartUI() {
  const cartContainer = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotal = document.getElementById('cart-total');

  cartContainer.innerHTML = '';
  let total = 0;
  let count = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p style="text-align:center; color:#888;">Seu carrinho está vazio.</p>';
  } else {
    cart.forEach(item => {
      total += item.price * item.qty;
      count += item.qty;

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.image}" alt="${item.title}">
        <div class="cart-item-details">
          <div style="font-weight:bold; color:#f4d03f;">${item.title}</div>
          <div style="font-size:0.85rem;">${item.qty}x R$ ${item.price.toFixed(2)}</div>
        </div>
        <i class="fa-solid fa-trash remove-item" onclick="removeFromCart('${item.title}')"></i>
      `;
      cartContainer.appendChild(itemEl);
    });
  }

  cartCount.innerText = count;
  cartTotal.innerText = `R$ ${total.toFixed(2)}`;
}

// TOGGLE MODAL DO CARRINHO
function toggleCart() {
  const modal = document.getElementById('cartModal');
  const overlay = document.getElementById('cartOverlay');

  if (modal.classList.contains('active')) {
    modal.classList.remove('active');
    overlay.style.display = 'none';
  } else {
    modal.classList.add('active');
    overlay.style.display = 'block';
  }
}

// CHECKOUT SIMULADO
function checkout() {
  if (cart.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }
  alert("Obrigado por sua compra no Museu Onde se Mora a Imaginação! Em breve enviaremos os detalhes para seu e-mail.");
  cart = [];
  updateCartUI();
  toggleCart();
}

// FORMULÁRIO DE CONTATO
function handleContact(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  alert(`Obrigado pelo contato, ${name}! Sua mensagem foi enviada ao museu.`);
  document.getElementById('contactForm').reset();
}