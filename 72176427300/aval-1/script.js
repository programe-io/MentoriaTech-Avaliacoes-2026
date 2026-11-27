// =======================================================
// 1. Armazenamento e Persistência de Dados
// =======================================================
const estoque = JSON.parse(localStorage.getItem('estoque')) || [];
let proximoCodigo = estoque.length > 0 ? Math.max(...estoque.map(p => p.codigo)) + 1 : 1001;

function salvarNoLocalStorage() {
  localStorage.setItem('estoque', JSON.stringify(estoque));
}

// =======================================================
// 2. Validações e Regras de Negócio
// =======================================================
function validarDadosDoProduto(nome, quantidade, preco) {
  if (!nome || nome.trim().length < 3) {
    throw new Error("O nome do produto deve ter no mínimo 3 caracteres.");
  }
  if (isNaN(quantidade) || quantidade < 0) {
    throw new Error("A quantidade não pode ser um valor negativo.");
  }
  if (isNaN(preco) || preco <= 0) {
    throw new Error("O preço unitário deve ser maior do que zero.");
  }
}

function buscarProduto(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) {
    throw new Error(`Produto com o código ${codigo} não foi encontrado.`);
  }
  return produto;
}

// =======================================================
// 3. Operações do Estoque (Mecanismo Lógico)
// =======================================================
function adicionarProduto(nome, quantidade, preco, categoria) {
  validarDadosDoProduto(nome, quantidade, preco);

  const novoProduto = {
    codigo: proximoCodigo,
    nome: nome.trim(),
    quantidade: parseInt(quantidade),
    preco: parseFloat(preco),
    categoria: categoria
  };

  proximoCodigo++;
  estoque.push(novoProduto);
  salvarNoLocalStorage();
  return novoProduto;
}

function alterarQuantidade(codigo, quantidadeMuda) {
  const produto = buscarProduto(codigo);
  const novaQuantidade = produto.quantidade + quantidadeMuda;

  if (novaQuantidade < 0) {
    throw new Error(`Estoque insuficiente! Não é possível remover mais unidades de "${produto.nome}".`);
  }

  produto.quantidade = novaQuantidade;
  salvarNoLocalStorage();
  return produto;
}

function eliminarProduto(codigo) {
  const indice = estoque.findIndex(p => p.codigo === codigo);
  if (indice === -1) {
    throw new Error("Produto não encontrado para eliminação.");
  }
  estoque.splice(indice, 1);
  salvarNoLocalStorage();
}

// =======================================================
// 4. Manipulação do DOM (Interface Gráfica)
// =======================================================
const formProduto = document.getElementById('formProduto');
const listaProdutosContainer = document.getElementById('listaProdutos');
const errorAlert = document.getElementById('errorAlert');
const buscaInput = document.getElementById('buscaProduto');

function mostrarErro(mensagem) {
  errorAlert.textContent = `⚠️ Erro: ${mensagem}`;
  errorAlert.style.display = 'block';
}

function limparErro() {
  errorAlert.style.display = 'none';
}

// Renderiza a tabela aplicando ou não o filtro de pesquisa
function renderizarEstoque(termoBusca = '') {
  listaProdutosContainer.innerHTML = '';
  
  // Filtra os produtos com base no termo de busca (ignora maiúsculas/minúsculas)
  const produtosFiltrados = estoque.filter(produto => 
    produto.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    produto.categoria.toLowerCase().includes(termoBusca.toLowerCase())
  );

  if (produtosFiltrados.length === 0) {
    listaProdutosContainer.innerHTML = `
      <tr>
        <td colspan="7" style="text-align: center; color: var(--text-light); padding: 20px;">
          Nenhum produto encontrado.
        </td>
      </tr>
    `;
    return;
  }

  produtosFiltrados.forEach(produto => {
    const tr = document.createElement('tr');
    
    // Calcula o valor financeiro total daquele item em estoque
    const totalItem = produto.quantidade * produto.preco;

    // Alertas visuais com base no nível do estoque
    let classeQtd = '';
    if (produto.quantidade === 0) {
      classeQtd = 'class="qtd-esgotado"';
    } else if (produto.quantidade <= 5) {
      classeQtd = 'class="qtd-alerta"';
    }

    tr.innerHTML = `
      <td>#${produto.codigo}</td>
      <td><strong>${produto.nome}</strong></td>
      <td><span style="color: var(--text-light); font-size: 0.9em;">${produto.categoria}</span></td>
      <td ${classeQtd}>${produto.quantidade}</td>
      <td>€ ${produto.preco.toFixed(2)}</td>
      <td><strong>€ ${totalItem.toFixed(2)}</strong></td>
      <td>
        <button class="btn-acao btn-adicionar" onclick="handleMudarQtd(${produto.codigo}, 1)" title="Adicionar 1 unidade">+</button>
        <button class="btn-acao btn-remover" onclick="handleMudarQtd(${produto.codigo}, -1)" title="Remover 1 unidade">-</button>
        <button class="btn-acao btn-remover-total" onclick="handleEliminar(${produto.codigo})" title="Apagar produto">🗑️</button>
      </td>
    `;
    listaProdutosContainer.appendChild(tr);
  });
}

// =======================================================
// 5. Eventos e Interações Globais
// =======================================================

// Submissão do formulário de cadastro
formProduto.addEventListener('submit', function(e) {
  e.preventDefault();
  limparErro();

  const nome = document.getElementById('nome').value;
  const quantidade = document.getElementById('quantidade').value;
  const preco = document.getElementById('preco').value;
  const categoria = document.getElementById('categoria').value;

  try {
    adicionarProduto(nome, quantidade, preco, categoria);
    formProduto.reset(); // Limpa todos os campos do formulário
    renderizarEstoque(buscaInput.value);
  } catch (error) {
    mostrarErro(error.message);
  }
});

// Filtro de busca em tempo real (Dispara a cada tecla digitada)
buscaInput.addEventListener('input', function() {
  renderizarEstoque(this.value);
});

// Ações disparadas pelos botões da tabela
window.handleMudarQtd = function(codigo, alteracao) {
  limparErro();
  try {
    alterarQuantidade(codigo, alteracao);
    renderizarEstoque(buscaInput.value);
  } catch (error) {
    mostrarErro(error.message);
  }
};

window.handleEliminar = function(codigo) {
  limparErro();
  if (confirm("Tem a certeza que deseja apagar permanentemente este produto do estoque?")) {
    try {
      eliminarProduto(codigo);
      renderizarEstoque(buscaInput.value);
    } catch (error) {
      mostrarErro(error.message);
    }
  }
};

// Inicialização da página
renderizarEstoque();
