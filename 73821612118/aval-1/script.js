const produtos = [];
let opcao;

do {
  opcao = prompt(
    "ESTOQUE DE PRODUTOS\n" +
    "1 - Cadastrar produto\n" +
    "2 - Listar produtos\n" +
    "3 - Alterar valor\n" +
    "4 - Alterar quantidade\n" +
    "0 - Sair"
  );

  switch (opcao) {
    case "1": {
      const codigo = prompt("Código do produto:");
      const descricao = prompt("Descrição do produto:");
      const quantidade = Number(prompt("Quantidade:"));
      const valor = Number(prompt("Valor:"));

      produtos.push({ codigo, descricao, quantidade, valor });
      alert("Produto cadastrado!");
      break;
    }

    case "2": {
      if (produtos.length === 0) {
        alert("Nenhum produto cadastrado.");
      } else {
        let lista = "PRODUTOS CADASTRADOS:\n\n";

        for (const produto of produtos) {
          lista +=
            `Código: ${produto.codigo}\n` +
            `Descrição: ${produto.descricao}\n` +
            `Quantidade: ${produto.quantidade}\n` +
            `Valor: R$ ${produto.valor.toFixed(2)}\n\n`;
        }

        alert(lista);
      }
      break;
    }

    case "3": {
      const codigo = prompt("Digite o código do produto:");
      const produto = produtos.find(item => item.codigo === codigo);

      if (produto) {
        produto.valor = Number(prompt("Digite o novo valor:"));
        alert("Valor alterado!");
      } else {
        alert("Produto não encontrado.");
      }
      break;
    }

    case "4": {
      const codigo = prompt("Digite o código do produto:");
      const produto = produtos.find(item => item.codigo === codigo);

      if (produto) {
        produto.quantidade = Number(prompt("Digite a nova quantidade:"));
        alert("Quantidade alterada!");
      } else {
        alert("Produto não encontrado.");
      }
      break;
    }

    case "0":
      alert("Programa encerrado.");
      break;

    default:
      alert("Opção inválida.");
  }
} while (opcao !== "0");
