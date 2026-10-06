let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').innerText = cart.length;
  document.getElementById('cart-total').innerText = total.toFixed(2);
  
  const list = document.getElementById('cart-items');
  list.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.innerText = `${item.name} - R$ ${item.price.toFixed(2)}`;
    list.appendChild(li);
  });
}

function toggleCart() {
  document.getElementById('cart-sidebar').classList.toggle('open');
}