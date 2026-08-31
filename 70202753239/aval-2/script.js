// Array com produtos já cadastrados
let estoque = [
  {
    codigo: "001",
    descricao: "Notebook Dell Inspiron 15",
    quantidade: 12,
    valor: 3499.90
  },
  {
    codigo: "002",
    descricao: "Mouse Gamer Logitech G203",
    quantidade: 45,
    valor: 129.90
  },
  {
    codigo: "003",
    descricao: "Teclado Mecânico Redragon Kumara",
    quantidade: 28,
    valor: 249.00
  },
  {
    codigo: "004",
    descricao: "Monitor LG 24\" Full HD",
    quantidade: 15,
    valor: 899.00
  },
  {
    codigo: "005",
    descricao: "Headset HyperX Cloud Stinger",
    quantidade: 32,
    valor: 299.90
  }
];

// Elementos do DOM
const form = document.getElementById("form-produto");
const corpoTabela = document.getElementById("corpo-tabela");
const totalProdutos = document.getElementById("total-produtos");

// Formatar valor em Real
function formatarValor(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

// Atualiza a tabela e o contador
function atualizarTabela() {
  corpoTabela.innerHTML = "";

  estoque.forEach((produto) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td><strong>${produto.codigo}</strong></td>
      <td>${produto.descricao}</td>
      <td>${produto.quantidade}</td>
      <td>${formatarValor(produto.valor)}</td>
      <td>
        <div class="acoes">
          <button class="btn-acao btn-valor" onclick="alterarValor('${produto.codigo}')">
            Alterar Valor
          </button>
          <button class="btn-acao btn-qtd" onclick="alterarQuantidade('${produto.codigo}')">
            Alterar Qtd
          </button>
        </div>
      </td>
    `;

    corpoTabela.appendChild(tr);
  });

  totalProdutos.textContent = `${estoque.length} produto${estoque.length !== 1 ? "s" : ""}`;
}

// Cadastrar novo produto
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const codigo = document.getElementById("codigo").value.trim();
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = parseInt(document.getElementById("quantidade").value);
  const valor = parseFloat(document.getElementById("valor").value);

  // Validações
  if (!codigo || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  if (estoque.some(p => p.codigo === codigo)) {
    alert("Já existe um produto com este código!");
    return;
  }

  if (isNaN(quantidade) || quantidade < 0) {
    alert("Quantidade inválida!");
    return;
  }

  if (isNaN(valor) || valor < 0) {
    alert("Valor inválido!");
    return;
  }

  // Adiciona o produto
  estoque.push({ codigo, descricao, quantidade, valor });

  // Limpa o formulário
  form.reset();

  // Atualiza a tabela
  atualizarTabela();
  alert("Produto cadastrado com sucesso!");
});

// Alterar valor de um produto
function alterarValor(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) return;

  const novoValor = parseFloat(
    prompt(`Valor atual: ${formatarValor(produto.valor)}\nDigite o novo valor:`)
  );

  if (isNaN(novoValor) || novoValor < 0) {
    alert("Valor inválido!");
    return;
  }

  produto.valor = novoValor;
  atualizarTabela();
  alert("Valor alterado com sucesso!");
}

// Alterar quantidade de um produto
function alterarQuantidade(codigo) {
  const produto = estoque.find(p => p.codigo === codigo);
  if (!produto) return;

  const novaQuantidade = parseInt(
    prompt(`Quantidade atual: ${produto.quantidade}\nDigite a nova quantidade:`)
  );

  if (isNaN(novaQuantidade) || novaQuantidade < 0) {
    alert("Quantidade inválida!");
    return;
  }

  produto.quantidade = novaQuantidade;
  atualizarTabela();
  alert("Quantidade alterada com sucesso!");
}

// Inicializa a tabela ao carregar a página
atualizarTabela();