// Array global para armazenar os produtos
let produtos = [];

// ================================================
// FUNÇÕES LÓGICAS (Baseadas no material da aula)
// ================================================

// 1. Validar Produto
function validarProduto(descricao, quantidade, valor) {
  if (descricao.length < 5) {
    throw new Error("Descrição deve ter, no mínimo, cinco caracteres.");
  }
  if (quantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero.");
  }
  if (valor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero.");
  }
}

// 2. Cadastrar Produto
function cadastrarProduto(descricao, quantidade, valor) {
  // Executa validações
  validarProduto(descricao, quantidade, valor);

  // Cria o objeto produto com código gerado automaticamente
  let novoProduto = {
    codigo: produtos.length + 1,
    descricao: descricao,
    quantidade: quantidade,
    valor: valor
  };

  // Adiciona ao array de produtos
  produtos.push(novoProduto);
}

// 3. Buscar Produto por Código (Melhoria sugerida na aula)
function buscarProdutoPorCodigo(codigoProduto) {
  return produtos.find((prod) => prod.codigo === codigoProduto);
}

// 4. Atualizar Valor do Produto
function atualizarValor(codigoProduto, novoValor) {
  if (novoValor < 0) {
    throw new Error("Valor deve ser maior ou igual a zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.valor = novoValor;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// 5. Atualizar Quantidade do Produto (Somar ao estoque existente)
function atualizarQuantidade(codigoProduto, novaQuantidade) {
  if (novaQuantidade < 1) {
    throw new Error("Quantidade deve ser maior que zero.");
  }

  const produto = buscarProdutoPorCodigo(codigoProduto);

  if (produto) {
    produto.quantidade = produto.quantidade + novaQuantidade;
  } else {
    throw new Error("Produto não encontrado.");
  }
}

// ================================================
// INTERAÇÃO COM A INTERFACE (DOM)
// ================================================

const formCadastro = document.getElementById('form-cadastro');
const formAtualizarValor = document.getElementById('form-atualizar-valor');
const formAtualizarQtd = document.getElementById('form-atualizar-qtd');
const tabelaProdutos = document.getElementById('tabela-produtos');
const divMensagem = document.getElementById('mensagem');

// Função para exibir mensagens na tela
function exibirMensagem(texto, tipo) {
  divMensagem.textContent = texto;
  divMensagem.className = `mensagem ${tipo}`;
  
  // Oculta a mensagem automaticamente após 4 segundos
  setTimeout(() => {
    divMensagem.className = "mensagem hidden";
  }, 4000);
}

// Função para atualizar a tabela na tela
function renderizarTabela() {
  tabelaProdutos.innerHTML = '';

  if (produtos.length === 0) {
    tabelaProdutos.innerHTML = `
      <tr>
        <td colspan="4" class="text-center">Nenhum produto cadastrado.</td>
      </tr>
    `;
    return;
  }

  produtos.forEach((prod) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${prod.codigo}</td>
      <td>${prod.descricao}</td>
      <td>${prod.quantidade}</td>
      <td>R$ ${prod.valor.toFixed(2)}</td>
    `;
    tabelaProdutos.appendChild(tr);
  });
}

// Evento: Cadastrar Produto
formCadastro.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const descricao = document.getElementById('descricao').value;
  const quantidade = parseInt(document.getElementById('quantidade').value);
  const valor = parseFloat(document.getElementById('valor').value);

  try {
    cadastrarProduto(descricao, quantidade, valor);
    renderizarTabela();
    exibirMensagem("Produto cadastrado com sucesso!", "sucesso");
    formCadastro.reset();
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
});

// Evento: Atualizar Valor
formAtualizarValor.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = parseInt(document.getElementById('codigo-valor').value);
  const novoValor = parseFloat(document.getElementById('novo-valor').value);

  try {
    atualizarValor(codigo, novoValor);
    renderizarTabela();
    exibirMensagem(`Valor do produto #${codigo} atualizado com sucesso!`, "sucesso");
    formAtualizarValor.reset();
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
});

// Evento: Somar Quantidade
formAtualizarQtd.addEventListener('submit', (e) => {
  e.preventDefault();

  const codigo = parseInt(document.getElementById('codigo-qtd').value);
  const novaQtd = parseInt(document.getElementById('nova-qtd').value);

  try {
    atualizarQuantidade(codigo, novaQtd);
    renderizarTabela();
    exibirMensagem(`Estoque do produto #${codigo} atualizado com sucesso!`, "sucesso");
    formAtualizarQtd.reset();
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
});