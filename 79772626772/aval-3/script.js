// SELEÇÃO DE ELEMENTOS DO DOM
const formCliente = document.getElementById('formCliente');
const listaClientesDiv = document.getElementById('listaClientes');

// Array para armazenar os clientes em memória (pode ser integrado ao LocalStorage)
let clientes = [];

// BLOCO 3A: Função para renderizar os clientes na tela
function renderizarClientes() {
  listaClientesDiv.innerHTML = '';

  if (clientes.length === 0) {
    listaClientesDiv.innerHTML = '<p>Nenhum cliente cadastrado.</p>';
    return;
  }

  clientes.forEach((cliente, index) => {
    const card = document.createElement('div');
    card.classList.add('card-cliente');

    card.innerHTML = `
      <h3>${cliente.nome}</h3>
      <p><strong>E-mail:</strong> ${cliente.email}</p>
      <p><strong>Telefone:</strong> ${cliente.telefone}</p>
      <button class="btn-remover" onclick="removerCliente(${index})">Remover</button>
    `;

    listaClientesDiv.appendChild(card);
  });
}

// BLOCO 2A: Evento de envio do formulário
formCliente.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const telefone = document.getElementById('telefone').value;

  // Adiciona novo cliente ao array
  clientes.push({ nome, email, telefone });

  // Limpa o formulário e atualiza a tela
  formCliente.reset();
  renderizarClientes();
});

// BLOCO 3B: Função para remover cliente
function removerCliente(index) {
  clientes.splice(index, 1);
  renderizarClientes();
}

// Inicializa a lista vazia ao carregar a página
renderizarClientes();
