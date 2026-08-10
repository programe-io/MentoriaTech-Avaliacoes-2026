// Array para armazenar os produtos do estoque
const inventory = [];

// Exibe mensagens de feedback na tela
function exibirMensagem(texto, tipo) {
  const msgDiv = document.getElementById("mensagem");
  msgDiv.textContent = texto;
  msgDiv.className = `mensagem ${tipo}`;
  msgDiv.style.display = "block";
  
  setTimeout(() => {
    msgDiv.style.display = "none";
  }, 3000);
}

// Função para registrar um novo produto
function addProduct(id, description, quantity, price) {
  const existingProduct = inventory.find(p => p.id === id);
  if (existingProduct) {
    exibirMensagem(`Erro: Produto com ID ${id} já está cadastrado.`, 'erro');
    return false;
  }

  const newProduct = {
    id: id,
    description: description,
    quantity: quantity,
    price: price
  };

  inventory.push(newProduct);
  exibirMensagem(`Produto "${description}" cadastrado com sucesso!`, 'sucesso');
  listProducts();
  return true;
}

// Função para listar todos os produtos cadastrados na tabela
function listProducts() {
  const tbody = document.getElementById("tabela-produtos");
  tbody.innerHTML = "";

  if (inventory.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;">Nenhum produto cadastrado.</td></tr>`;
    return;
  }

  inventory.forEach(product => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.description}</td>
      <td>${product.quantity}</td>
      <td>$${product.price.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}

// Função para atualizar o preço de um produto
function updateProductPrice(id, newPrice) {
  const product = inventory.find(p => p.id === id);
  if (product) {
    product.price = newPrice;
    exibirMensagem(`Preço do produto ID ${id} atualizado para $${newPrice.toFixed(2)}.`, 'sucesso');
    listProducts();
  } else {
    exibirMensagem(`Produto com ID ${id} não encontrado.`, 'erro');
  }
}

// Função para atualizar a quantidade de um produto
function updateProductQuantity(id, newQuantity) {
  const product = inventory.find(p => p.id === id);
  if (product) {
    product.quantity = newQuantity;
    exibirMensagem(`Quantidade do produto ID ${id} atualizada para ${newQuantity}.`, 'sucesso');
    listProducts();
  } else {
    exibirMensagem(`Produto com ID ${id} não encontrado.`, 'erro');
  }
}

// Captura de Eventos dos Formulários
document.getElementById("form-cadastrar").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("add-id").value);
  const desc = document.getElementById("add-desc").value;
  const qty = parseInt(document.getElementById("add-qty").value);
  const price = parseFloat(document.getElementById("add-price").value);

  if (addProduct(id, desc, qty, price)) {
    this.reset();
  }
});

document.getElementById("form-preco").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("price-id").value);
  const price = parseFloat(document.getElementById("new-price").value);
  
  updateProductPrice(id, price);
  this.reset();
});

document.getElementById("form-qtd").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = parseInt(document.getElementById("qty-id").value);
  const qty = parseInt(document.getElementById("new-qty").value);
  
  updateProductQuantity(id, qty);
  this.reset();
});

// Carga inicial dos dados de teste ao abrir o site
addProduct(1, "Mechanical Keyboard", 15, 250.00);
addProduct(2, "Gaming Mouse", 30, 120.50);
addProduct(3, '24" Monitor', 8, 899.90);