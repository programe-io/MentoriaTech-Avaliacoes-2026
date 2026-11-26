// 1. Estado inicial da aplicação
let estoque = [];
let proximoId = 1;

// 2. Cadastrar novo produto
function cadastrarProduto(nome, quantidade, preco) {
  if (!nome || nome.trim().length < 2) {
    console.log("Erro: Nome do produto inválido.");
    return;
  }
  if (quantidade < 0 || preco < 0) {
    console.log("Erro: Quantidade e preço não podem ser negativos.");
    return;
  }

  const novoProduto = {
    id: proximoId++,
    nome: nome.trim(),
    quantidade: Number(quantidade),
    preco: Number(preco)
  };

  estoque.push(novoProduto);
  console.log(`Produto "${novoProduto.nome}" cadastrado com sucesso!`);
}

// 3. Dar entrada no estoque (adicionar unidades)
function entradaEstoque(id, qtdAdicionar) {
  const produto = estoque.find(item => item.id === id);

  if (!produto) {
    console.log("Erro: Produto não encontrado.");
    return;
  }
  if (qtdAdicionar <= 0) {
    console.log("Erro: A quantidade de entrada deve ser maior que zero.");
    return;
  }

  produto.quantidade += qtdAdicionar;
  console.log(`Entrada registrada. Novo saldo de ${produto.nome}: ${produto.quantidade}`);
}

// 4. Dar baixa no estoque (saída/venda)
function baixaEstoque(id, qtdRemover) {
  const produto = estoque.find(item => item.id === id);

  if (!produto) {
    console.log("Erro: Produto não encontrado.");
    return;
  }
  if (qtdRemover <= 0) {
    console.log("Erro: A quantidade de saída deve ser maior que zero.");
    return;
  }
  if (produto.quantidade < qtdRemover) {
    console.log(`Erro: Estoque insuficiente para "${produto.nome}". Disponível: ${produto.quantidade}`);
    return;
  }

  produto.quantidade -= qtdRemover;
  console.log(`Saída registrada. Novo saldo de ${produto.nome}: ${produto.quantidade}`);
}

// 5. Listar estoque e calcular valor total
function listarEstoque() {
  console.log("=== RELATÓRIO DE ESTOQUE ===");
  
  if (estoque.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }

  let valorTotalGeral = 0;

  estoque.forEach(item => {
    const subtotal = item.quantidade * item.preco;
    valorTotalGeral += subtotal;
    const alerta = item.quantidade <= 5 ? " [ESTOQUE BAIXO]" : "";

    console.log(
      `ID: ${item.id} | ${item.nome} | Qtd: ${item.quantidade} | Unit: R$ ${item.preco.toFixed(2)} | Total: R$ ${subtotal.toFixed(2)}${alerta}`
    );
  });

  console.log(`Valor total em estoque: R$ ${valorTotalGeral.toFixed(2)}`);
}

// --- Exemplo de uso ---
cadastrarProduto("Teclado Mecânico", 10, 250.00);
cadastrarProduto("Mouse Sem Fio", 4, 120.00);
baixaEstoque(1, 3);
entradaEstoque(2, 5);
listarEstoque();
