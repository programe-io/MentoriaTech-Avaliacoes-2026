let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar novo produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Alterar valor de um produto\n" +
        "4 - Alterar quantidade de um produto\n" +
        "0 - Sair"
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
                let lista = "===== PRODUTOS CADASTRADOS =====\n";

                for (let i = 0; i < produtos.length; i++) {
                    lista +=
                        "\nCódigo: " + produtos[i].codigo +
                        "\nDescrição: " + produtos[i].descricao +
                        "\nQuantidade: " + produtos[i].quantidade +
                        "\nValor: R$ " + produtos[i].valor +
                        "\n-------------------------";
                }

                alert(lista);
            }
            break;

        case 3:
            let codValor = Number(prompt("Digite o código do produto:"));
            let encontradoValor = false;

            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].codigo === codValor) {
                    let novoValor = Number(prompt("Digite o novo valor:"));
                    produtos[i].valor = novoValor;

                    alert("Valor alterado com sucesso!");
                    encontradoValor = true;
                    break;
                }
            }

            if (!encontradoValor) {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            let codQuantidade = Number(prompt("Digite o código do produto:"));
            let encontradoQuantidade = false;

            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].codigo === codQuantidade) {
                    let novaQuantidade = Number(prompt("Digite a nova quantidade:"));
                    produtos[i].quantidade = novaQuantidade;

                    alert("Quantidade alterada com sucesso!");
                    encontradoQuantidade = true;
                    break;
                }
            }

            if (!encontradoQuantidade) {
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