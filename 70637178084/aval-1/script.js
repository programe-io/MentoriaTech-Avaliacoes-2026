
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor do produto\n" +
        "4 - Alterar quantidade do produto\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            // Cadastrar novo produto
            let codigo = Number(prompt("Digite o código do produto:"));

            let existe = produtos.find(p => p.codigo === codigo);

            if (existe) {
                alert("Já existe um produto com esse código!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor do produto:"));

            if (!descricao || quantidade < 0 || valor < 0 ||
                !Number.isFinite(quantidade) ||
                !Number.isFinite(valor)) {
                alert("Dados inválidos!");
                break;
            }

            produtos.push({
                codigo: codigo,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor
            });

            alert("Produto cadastrado com sucesso!");
            break;

        case 2:
            // Listar produtos cadastrados
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "===== PRODUTOS CADASTRADOS =====\n";

                produtos.forEach(produto => {
                    lista +=
                        "\nCódigo: " + produto.codigo +
                        "\nDescrição: " + produto.descricao +
                        "\nQuantidade: " + produto.quantidade +
                        "\nValor: R$ " + produto.valor.toFixed(2) +
                        "\n-----------------------------";
                });

                alert(lista);
            }
            break;

        case 3:
            // Alterar valor do produto
            let codigoValor = Number(prompt(
                "Digite o código do produto que deseja alterar:"
            ));

            let produtoValor = produtos.find(
                p => p.codigo === codigoValor
            );

            if (produtoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                if (Number.isFinite(novoValor) && novoValor >= 0) {
                    produtoValor.valor = novoValor;
                    alert("Valor atualizado com sucesso!");
                } else {
                    alert("Valor inválido!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            // Alterar quantidade do produto
            let codigoQuantidade = Number(prompt(
                "Digite o código do produto que deseja alterar:"
            ));

            let produtoQuantidade = produtos.find(
                p => p.codigo === codigoQuantidade
            );

            if (produtoQuantidade) {
                let novaQuantidade = Number(prompt(
                    "Digite a nova quantidade:"
                ));

                if (Number.isFinite(novaQuantidade) &&
                    novaQuantidade >= 0) {
                    produtoQuantidade.quantidade = novaQuantidade;
                    alert("Quantidade atualizada com sucesso!");
                } else {
                    alert("Quantidade inválida!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 0:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 0);
