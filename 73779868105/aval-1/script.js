
let produtos = [];

let opcao;

do {
    opcao = prompt(
        "===== SISTEMA DE ESTOQUE =====\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor do produto\n" +
        "4 - Alterar quantidade do produto\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    switch (opcao) {

        case "1":
            // Cadastrar produto
            let codigo = prompt("Digite o código do produto:");

            let existe = produtos.find(p => p.codigo === codigo);

            if (existe) {
                alert("Este código já está cadastrado!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor do produto:"));

            if (!descricao || !Number.isInteger(quantidade) ||
                quantidade < 0 || !Number.isFinite(valor) || valor < 0) {
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

        case "2":
            // Listar produtos
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

        case "3":
            // Alterar valor do produto
            let codValor = prompt("Digite o código do produto:");

            let produtoValor = produtos.find(p => p.codigo === codValor);

            if (produtoValor) {
                let novoValor = Number(prompt("Digite o novo valor:"));

                if (!Number.isFinite(novoValor) || novoValor < 0) {
                    alert("Valor inválido!");
                } else {
                    produtoValor.valor = novoValor;
                    alert("Valor alterado com sucesso!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case "4":
            // Alterar quantidade do produto
            let codQuantidade = prompt("Digite o código do produto:");

            let produtoQuantidade = produtos.find(
                p => p.codigo === codQuantidade
            );

            if (produtoQuantidade) {
                let novaQuantidade = Number(
                    prompt("Digite a nova quantidade:")
                );

                if (!Number.isInteger(novaQuantidade) || novaQuantidade < 0) {
                    alert("Quantidade inválida!");
                } else {
                    produtoQuantidade.quantidade = novaQuantidade;
                    alert("Quantidade alterada com sucesso!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case "5":
            alert("Sistema encerrado. Obrigado!");
            break;

        default:
            alert("Opção inválida! Escolha novamente.");
    }

} while (opcao !== "5");
