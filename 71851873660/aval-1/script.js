// Seleciona os elementos principais do HTML
const formProduto = document.getElementById('form-produto');
const listaProdutos = document.getElementById('lista-produtos');
const inputBusca = document.getElementById('busca');

const elTotalProdutos = document.getElementById('total-produtos');
const elTotalItens = document.getElementById('total-itens');
const elValorTotal = document.getElementById('valor-total');

// Formata valores numéricos para Real (R$ 1.250,00)
function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// Converte texto "R$ 80,00" de volta para número (80.00)
function lerMoeda(texto) {
  return parseFloat(
    texto.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
  ) || 0;
}

// Define o texto e a cor do status conforme a quantidade
function obterStatus(quantidade) {
  if (quantidade === 0) {
    return { texto: 'Esgotado', cor: '#dc2626' };
  } else if (quantidade <= 5) {
    return { texto: 'Estoque Baixo', cor: '#d97706' };
  } else {
    return { texto: 'Em Estoque', cor: '#16a34a' };
  }
}

// Recalcula e atualiza os 3 cards de resumo no topo
function atualizarResumo() {
  const linhas = listaProdutos.querySelectorAll('tr');
  let totalProdutos = linhas.length;
  let totalItens = 0;
  let valorTotal = 0;

  linhas.forEach(linha => {
    const colunas = linha.querySelectorAll('td');
    const qtd = parseInt(colunas[3].textContent, 10) || 0;
    const preco = lerMoeda(colunas[4].textContent);

    totalItens += qtd;
    valorTotal += qtd * preco;

    // Atualiza o status visual da linha
    const status = obterStatus(qtd);
    colunas[5].textContent = status.texto;
    colunas[5].style.color = status.cor;
    colunas[5].style.fontWeight = '600';
  });

  elTotalProdutos.textContent = totalProdutos;
  elTotalItens.textContent = totalItens;
  elValorTotal.textContent = formatarMoeda(valorTotal);
}

// Cadastra um novo produto na tabela
formProduto.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const sku = document.getElementById('sku').value.trim().toUpperCase();
  const produto = document.getElementById('produto').value.trim();
  const categoria = document.getElementById('categoria').value;
  const quantidade = parseInt(document.getElementById('quantidade').value, 10);
  const preco = parseFloat(document.getElementById('preco').value);

  const novaLinha = document.createElement('tr');
  novaLinha.innerHTML =