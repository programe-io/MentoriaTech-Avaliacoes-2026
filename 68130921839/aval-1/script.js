
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "=== SISTEMA DE ESTOQUE ===\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor do produto\n" +
        "4 - Alterar quantidade do produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            // Cadastrar produto
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
            // Listar produtos
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "=== PRODUTOS CADASTRADOS ===\n\n";

                produtos.forEach(function(produto) {
                    lista +=
                        "Código: " + produto.codigo + "\n" +
                        "Descrição: " + produto.descricao + "\n" +
                        "Quantidade: " + produto.quantidade + "\n" +
                        "Valor: R$ " + produto.valor.toFixed(2) + "\n" +
                        "--------------------------\n";
                });

                alert(lista);
            }
            break;

        case 3:
            // Alterar valor do produto
            let codValor = Number(prompt("Digite o código do produto:"));

            let produtoValor = produtos.find(
                p => p.codigo === codValor
            );

            if (produtoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                produtoValor.valor = novoValor;

                alert("Valor alterado com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            // Alterar quantidade do produto
            let codQuantidade = Number(prompt("Digite o código do produto:"));

            let produtoQuantidade = produtos.find(
                p => p.codigo === codQuantidade
            );

            if (produtoQuantidade) {
                let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

                produtoQuantidade.quantidade = novaQuantidade;

                alert("Quantidade alterada com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 5:
            alert("Sistema encerrado. Até logo!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 5);
