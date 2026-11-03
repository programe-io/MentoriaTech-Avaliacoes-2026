
let produtos = [];

let opcao;

do {
    opcao = prompt(
        "===== SISTEMA DE ESTOQUE =====\n\n" +
        "1 - Cadastrar novo produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Alterar valor de um produto\n" +
        "4 - Alterar quantidade de um produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {

        // 1 - Cadastrar produto
        case "1": {
            let codigo = prompt("Digite o código do produto:");

            if (produtos.some(p => p.codigo === codigo)) {
                alert("Já existe um produto com esse código!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor do produto:"));

            if (
                !codigo || !descricao ||
                !Number.isInteger(quantidade) || quantidade < 0 ||
                !Number.isFinite(valor) || valor < 0
            ) {
                alert("Dados inválidos! Tente novamente.");
                break;
            }

            let produto = {
                codigo: codigo,
                descricao: descricao,
                quantidade: quantidade,
                valor: valor
            };

            produtos.push(produto);

            alert("Produto cadastrado com sucesso!");
            break;
        }

        // 2 - Listar produtos
        case "2": {
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "===== PRODUTOS CADASTRADOS =====\n\n";

                produtos.forEach(produto => {
                    lista +=
                        "Código: " + produto.codigo + "\n" +
                        "Descrição: " + produto.descricao + "\n" +
                        "Quantidade: " + produto.quantidade + "\n" +
                        "Valor: R$ " + produto.valor.toFixed(2) + "\n\n";
                });

                alert(lista);
            }
            break;
        }

        // 3 - Alterar valor
        case "3": {
            let codigo = prompt("Digite o código do produto:");

            let produto = produtos.find(p => p.codigo === codigo);

            if (produto) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                if (Number.isFinite(novoValor) && novoValor >= 0) {
                    produto.valor = novoValor;
                    alert("Valor alterado com sucesso!");
                } else {
                    alert("Valor inválido!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;
        }

        // 4 - Alterar quantidade
        case "4": {
            let codigo = prompt("Digite o código do produto:");

            let produto = produtos.find(p => p.codigo === codigo);

            if (produto) {
                let novaQuantidade = Number(
                    prompt("Digite a nova quantidade:")
                );

                if (
                    Number.isInteger(novaQuantidade) &&
                    novaQuantidade >= 0
                ) {
                    produto.quantidade = novaQuantidade;
                    alert("Quantidade alterada com sucesso!");
                } else {
                    alert("Quantidade inválida!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;
        }

        // 5 - Sair
        case "5":
            alert("Sistema encerrado!");
            break;

        default:
            if (opcao !== null) {
                alert("Opção inválida! Tente novamente.");
            }
    }

} while (opcao !== "5" && opcao !== null);
