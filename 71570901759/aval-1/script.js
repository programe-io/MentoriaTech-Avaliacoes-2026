
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "SISTEMA DE ESTOQUE\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "0 - Sair"
    ));

    switch (opcao) {

        case 1:
            let codigo = Number(prompt("Digite o código:"));
            let descricao = prompt("Digite a descrição:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor:"));

            produtos.push({
                codigo,
                descricao,
                quantidade,
                valor
            });

            alert("Produto cadastrado com sucesso!");
            break;

        case 2:
            let lista = "";

            produtos.forEach(p => {
                lista +=
                    "Código: " + p.codigo +
                    "\nDescrição: " + p.descricao +
                    "\nQuantidade: " + p.quantidade +
                    "\nValor: R$ " + p.valor.toFixed(2) +
                    "\n-------------------\n";
            });

            alert(lista || "Nenhum produto cadastrado.");
            break;

        case 3:
            let codValor = Number(prompt("Digite o código do produto:"));
            let produtoValor = produtos.find(p => p.codigo === codValor);

            if (produtoValor) {
                produtoValor.valor = Number(prompt("Digite o novo valor:"));
                alert("Valor alterado com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            let codQtd = Number(prompt("Digite o código do produto:"));
            let produtoQtd = produtos.find(p => p.codigo === codQtd);

            if (produtoQtd) {
                produtoQtd.quantidade = Number(prompt("Digite a nova quantidade:"));
                alert("Quantidade alterada com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 0:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida!");
    }

} while (opcao !== 0);
