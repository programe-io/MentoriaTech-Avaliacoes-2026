
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar novo produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Alterar valor de um produto\n" +
        "4 - Alterar quantidade de um produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            // Cadastrar produto
            let codigo = Number(prompt("Digite o código do produto:"));

            let existe = produtos.find(p => p.codigo === codigo);

            if (existe) {
                alert("Já existe um produto com esse código!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor do produto:"));

            if (!descricao || !Number.isFinite(quantidade) ||
                !Number.isFinite(valor) || quantidade < 0 ||
                valor < 0 || !Number.isInteger(codigo)) {
                alert("Dados inválidos! Tente novamente.");
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
            // Listar produtos
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
            let codValor = Number(prompt("Digite o código do produto:"));

            let produtoValor = produtos.find(p => p.codigo === codValor);

            if (produtoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                if (Number.isFinite(novoValor) && novoValor >= 0) {
                    produtoValor.valor = novoValor;
                    alert("Valor alterado com sucesso!");
                } else {
                    alert("Valor inválido!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            // Alterar quantidade do produto
            let codQuantidade = Number(prompt("Digite o código do produto:"));

            let produtoQuantidade = produtos.find(p => p.codigo === codQuantidade);

            if (produtoQuantidade) {
                let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

                if (Number.isInteger(novaQuantidade) && novaQuantidade >= 0) {
                    produtoQuantidade.quantidade = novaQuantidade;
                    alert("Quantidade alterada com sucesso!");
                } else {
                    alert("Quantidade inválida!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 5:
            alert("Sistema encerrado. Até logo!");
            break;

        default:
            alert("Opção inválida! Escolha uma opção de 1 a 5.");
    }

} while (opcao !== 5);
