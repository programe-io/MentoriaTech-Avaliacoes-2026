
const readline = require("readline");
const fs = require("fs");

const arquivo = "estoque.json";

let estoque = fs.existsSync(arquivo)
  ? JSON.parse(fs.readFileSync(arquivo, "utf8"))
  : [];

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function salvar() {
  fs.writeFileSync(arquivo, JSON.stringify(estoque, null, 2));
}

function perguntar(texto) {
  return new Promise(resolve => rl.question(texto, resolve));
}

async function cadastrarProduto() {
  console.log("\n=== CADASTRAR PRODUTO ===");

  const nome = await perguntar("Nome: ");
  const codigo = await perguntar("Código: ");
  const preco = Number(await perguntar("Preço: "));
  const quantidade = Number(await perguntar("Quantidade: "));
  const minimo = Number(await perguntar("Estoque mínimo: "));

  if (!nome || !codigo || !Number.isFinite(preco) ||
      !Number.isInteger(quantidade) || !Number.isInteger(minimo) ||
      preco < 0 || quantidade < 0 || minimo < 0) {
    console.log("Dados inválidos!");
    return;
  }

  if (estoque.some(p => p.codigo === codigo)) {
    console.log("Código já cadastrado!");
    return;
  }

  estoque.push({
    id: Date.now(),
    codigo,
    nome,
    preco,
    quantidade,
    minimo
  });

  salvar();
  console.log("Produto cadastrado com sucesso!");
}

function listarProdutos() {
  console.log("\n=== LISTA DE PRODUTOS ===");

  if (estoque.length === 0) {
    console.log("Nenhum produto cadastrado.");
    return;
  }

  estoque.forEach(p => {
    console.log(`
Código: ${p.codigo}
Nome: ${p.nome}
Preço: R$ ${p.preco.toFixed(2)}
Quantidade: ${p.quantidade}
Estoque mínimo: ${p.minimo}
Status: ${p.quantidade <= p.minimo ? "ESTOQUE BAIXO" : "NORMAL"}
-------------------------`);
  });
}

async function movimentarEstoque(tipo) {
  const codigo = await perguntar("Código do produto: ");
  const produto = estoque.find(p => p.codigo === codigo);

  if (!produto) {
    console.log("Produto não encontrado!");
    return;
  }

  const quantidade = Number(await perguntar("Quantidade: "));

  if (!Number.isInteger(quantidade) || quantidade <= 0) {
    console.log("Quantidade inválida!");
    return;
  }

  if (tipo === "entrada") {
    produto.quantidade += quantidade;
  } else {
    if (produto.quantidade < quantidade) {
      console.log("Estoque insuficiente!");
      return;
    }

    produto.quantidade -= quantidade;
  }

  salvar();
  console.log("Movimentação realizada com sucesso!");
}

async function buscarProduto() {
  const busca = (await perguntar("Digite nome ou código: "))
    .toLowerCase();

  const resultados = estoque.filter(p =>
    p.nome.toLowerCase().includes(busca) ||
    p.codigo.toLowerCase().includes(busca)
  );

  console.log("\n=== RESULTADOS ===");

  if (!resultados.length) {
    console.log("Nenhum produto encontrado.");
    return;
  }

  resultados.forEach(p => {
    console.log(`${p.codigo} | ${p.nome} | Quantidade: ${p.quantidade}`);
  });
}

async function editarProduto() {
  const codigo = await perguntar("Código do produto: ");
  const produto = estoque.find(p => p.codigo === codigo);

  if (!produto) {
    console.log("Produto não encontrado!");
    return;
  }

  const nome = await perguntar(`Novo nome (${produto.nome}): `);
  const preco = await perguntar(`Novo preço (${produto.preco}): `);
  const minimo = await perguntar(`Novo mínimo (${produto.minimo}): `);

  if (nome.trim()) produto.nome = nome.trim();

  if (preco.trim()) {
    const valor = Number(preco);
    if (!Number.isFinite(valor) || valor < 0) {
      console.log("Preço inválido!");
      return;
    }
    produto.preco = valor;
  }

  if (minimo.trim()) {
    const valor = Number(minimo);
    if (!Number.isInteger(valor) || valor < 0) {
      console.log("Mínimo inválido!");
      return;
    }
    produto.minimo = valor;
  }

  salvar();
  console.log("Produto atualizado!");
}

async function excluirProduto() {
  const codigo = await perguntar("Código do produto: ");
  const indice = estoque.findIndex(p => p.codigo === codigo);

  if (indice === -1) {
    console.log("Produto não encontrado!");
    return;
  }

  const confirmar = await perguntar("Confirmar exclusão? (s/n): ");

  if (confirmar.toLowerCase() === "s") {
    estoque.splice(indice, 1);
    salvar();
    console.log("Produto excluído!");
  }
}

function relatorio() {
  const totalProdutos = estoque.length;

  const totalUnidades = estoque.reduce(
    (total, p) => total + p.quantidade, 0
  );

  const valorTotal = estoque.reduce(
    (total, p) => total + p.preco * p.quantidade, 0
  );

  const estoqueBaixo = estoque.filter(
    p => p.quantidade <= p.minimo
  );

  console.log("\n=== RELATÓRIO DE ESTOQUE ===");
  console.log("Total de produtos:", totalProdutos);
  console.log("Total de unidades:", totalUnidades);
  console.log("Valor total: R$", valorTotal.toFixed(2));
  console.log("Produtos com estoque baixo:", estoqueBaixo.length);
}

async function menu() {
  while (true) {
    console.log(`
================================
       SISTEMA DE ESTOQUE
================================
1 - Cadastrar produto
2 - Listar produtos
3 - Entrada de estoque
4 - Saída de estoque
5 - Buscar produto
6 - Editar produto
7 - Excluir produto
8 - Relatório
0 - Sair
================================`);

    const opcao = await perguntar("Escolha uma opção: ");

    try {
      switch (opcao) {
        case "1":
          await cadastrarProduto();
          break;
        case "2":
          listarProdutos();
          break;
        case "3":
          await movimentarEstoque("entrada");
          break;
        case "4":
          await movimentarEstoque("saida");
          break;
        case "5":
          await buscarProduto();
          break;
        case "6":
          await editarProduto();
          break;
        case "7":
          await excluirProduto();
          break;
        case "8":
          relatorio();
          break;
        case "0":
          console.log("Sistema encerrado!");
          rl.close();
          return;
        default:
          console.log("Opção inválida!");
      }
    } catch (erro) {
      console.log("Erro:", erro.message);
    }
  }
}

menu();
