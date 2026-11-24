// Seleciona o formulário e o corpo da tabela pelo ID definido no HTML
const formEstoque = document.getElementById('form-estoque');
const tabelaCorpo = document.getElementById('tabela-corpo');

// Escuta o evento de envio do formulário
formEstoque.addEventListener('submit', function(evento) {
  // Evita que a página recarregue ao clicar no botão
  evento.preventDefault();

  // Captura os valores digitados nos campos
  const codigo = document.getElementById('codigo').value.trim().toUpperCase();
  const nome = document.getElementById('nome').value.trim();
  const material = document.getElementById('material').value;
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const preco = parseFloat(document.getElementById('preco').value);

  // Define o status e a cor automaticamente com base na quantidade
  let statusTexto = '';
  let statusCor = '';

  if (quantidade === 0) {
    statusTexto = 'Esgotado';
    statusCor = '#d9534f'; // Vermelho
  } else if (quantidade <= 5) {
    statusTexto = 'Estoque Baixo';
    statusCor = '#f0ad4e'; // Laranja/Amarelo
  } else {
    statusTexto = 'Disponível';
    statusCor = '#2e7d32'; // Verde
  }

  // Formata o preço para o padrão brasileiro (ex: 89,90)
  const precoFormatado = preco.toFixed(2).replace('.', ',');

  // Cria uma nova linha (<tr>) para a tabela
  const novaLinha = document.createElement('tr');

  novaLinha.innerHTML = `
    <td>${codigo}</td>
    <td>${nome}</td>
    <td>${material}</td>
    <td>${quantidade}</td>
    <td>${precoFormatado}</td>
    <td style="color: ${statusCor};">${statusTexto}</td>
  `;

  // Adiciona a nova linha na tabela
  tabelaCorpo.appendChild(novaLinha);

  // Limpa os campos do formulário para o próximo cadastro
  formEstoque.reset();
});