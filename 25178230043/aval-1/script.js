
let produtos = [];

let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor do produto\n" +
        "4 - Alterar quantidade do produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            let codigo = Number(prompt("Digite o código do produto:"));

            let descricao = prompt("Digite a descrição do produto:");

            let quantidade = Number(prompt("Digite a quantidade:"));

            let valor = Number(prompt("Digite o valor do produto:"));

            produtos.push({
                codigo: codigo,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor
            });

            alert("Produto cadastrado com sucesso!");
            break;

        case 2:
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "===== PRODUTOS CADASTRADOS =====\n\n";

                for (let i = 0; i < produtos.length; i++) {
                    lista +=
                        "Código: " + produtos[i].codigo + "\n" +
                        "Descrição: " + produtos[i].descricao + "\n" +
                        "Quantidade: " + produtos[i].quantidade + "\n" +
                        "Valor: R$ " + produtos[i].valor.toFixed(2) + "\n\n";
                }

                alert(lista);
            }
            break;

        case 3:
            let codigoValor = Number(prompt("Digite o código do produto:"));

            let encontradoValor = produtos.find(p => p.codigo === codigoValor);

            if (encontradoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                encontradoValor.valor = novoValor;

                alert("Valor alterado com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            let codigoQuantidade = Number(prompt("Digite o código do produto:"));

            let encontradoQuantidade = produtos.find(p => p.codigo === codigoQuantidade);

            if (encontradoQuantidade) {
                let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

                encontradoQuantidade.quantidade = novaQuantidade;

                alert("Quantidade alterada com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 5:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 5);
