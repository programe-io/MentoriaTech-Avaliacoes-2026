const form = document.getElementById('productForm');
const inventoryList = document.getElementById('inventoryList');

// Carrega os produtos salvos no localStorage
let products = JSON.parse(localStorage.getItem('products')) || [];

function saveAndRender() {
  localStorage.setItem('products', JSON.stringify(products));
  renderProducts();
}

function renderProducts() {
  inventoryList.innerHTML = '';
  products.forEach((product, index) => {
    const row = document.createElement('tr');
    const totalValue = (product.quantity * product.price).toFixed(2);

    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.quantity}</td>
      <td>R$ ${parseFloat(product.price).toFixed(2)}</td>
      <td>R$ ${totalValue}</td>
      <td>
        <button class="btn-delete" onclick="deleteProduct(${index})">Excluir</button>
      </td>
    `;
    inventoryList.appendChild(row);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const quantity = parseInt(document.getElementById('quantity').value);
  const price = parseFloat(document.getElementById('price').value);

  products.push({ name, quantity, price });
  saveAndRender();

  form.reset();
});

function deleteProduct(index) {
  products.splice(index, 1);
  saveAndRender();
}

// Inicializa a tabela ao carregar a página
renderProducts();