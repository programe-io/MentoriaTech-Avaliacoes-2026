
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            // Cadastrar produto
            let codigo = Number(prompt("Digite o código:"));
            let descricao = prompt("Digite a descrição:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor:"));

            if (produtos.some(p => p.codigo === codigo)) {
                alert("Código já cadastrado!");
                break;
            }

            if (!codigo || !descricao || quantidade < 0 ||
                !Number.isFinite(quantidade) ||
                valor < 0 || !Number.isFinite(valor)) {
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
            // Listar produtos
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "===== LISTA DE PRODUTOS =====\n";

                produtos.forEach(p => {
                    lista +=
                        "\nCódigo: " + p.codigo +
                        "\nDescrição: " + p.descricao +
                        "\nQuantidade: " + p.quantidade +
                        "\nValor: R$ " + p.valor.toFixed(2) +
                        "\n----------------------";
                });

                alert(lista);
            }
            break;

        case 3:
            // Alterar valor
            let codValor = Number(prompt("Digite o código do produto:"));

            let produtoValor = produtos.find(
                p => p.codigo === codValor
            );

            if (produtoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                if (novoValor >= 0 &&
                    Number.isFinite(novoValor)) {
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
            // Alterar quantidade
            let codQuantidade = Number(prompt("Digite o código do produto:"));

            let produtoQuantidade = produtos.find(
                p => p.codigo === codQuantidade
            );

            if (produtoQuantidade) {
                let novaQuantidade = Number(prompt("Digite a nova quantidade:"));

                if (novaQuantidade >= 0 &&
                    Number.isInteger(novaQuantidade)) {
                    produtoQuantidade.quantidade = novaQuantidade;
                    alert("Quantidade alterada com sucesso!");
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
            alert("Opção inválida!");
    }

} while (opcao !== 0);
