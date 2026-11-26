
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Consultar produto\n" +
        "4 - Adicionar estoque\n" +
        "5 - Retirar estoque\n" +
        "6 - Excluir produto\n" +
        "7 - Relatório do estoque\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            let nome = prompt("Digite o nome do produto:");
            let codigo = Number(prompt("Digite o código do produto:"));
            let quantidade = Number(prompt("Digite a quantidade inicial:"));
            let preco = Number(prompt("Digite o preço do produto:"));

            if (!nome || !Number.isInteger(codigo) || codigo <= 0 ||
                !Number.isInteger(quantidade) || quantidade < 0 ||
                isNaN(preco) || preco < 0) {
                alert("Dados inválidos! Verifique as informações.");
                break;
            }

            let existe = produtos.find(p => p.codigo === codigo);

            if (existe) {
                alert("Já existe um produto com esse código!");
            } else {
                produtos.push({
                    nome: nome,
                    codigo: codigo,
                    quantidade: quantidade,
                    preco: preco
                });

                alert("Produto cadastrado com sucesso!");
            }
            break;

        case 2:
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado!");
            } else {
                let lista = "===== LISTA DE PRODUTOS =====\n\n";

                produtos.forEach(produto => {
                    lista +=
                        "Nome: " + produto.nome + "\n" +
                        "Código: " + produto.codigo + "\n" +
                        "Quantidade: " + produto.quantidade + "\n" +
                        "Preço: R$ " + produto.preco.toFixed(2) + "\n\n";
                });

                alert(lista);
            }
            break;

        case 3:
            let busca = Number(prompt("Digite o código do produto:"));

            let encontrado = produtos.find(p => p.codigo === busca);

            if (encontrado) {
                alert(
                    "Produto encontrado!\n\n" +
                    "Nome: " + encontrado.nome + "\n" +
                    "Código: " + encontrado.codigo + "\n" +
                    "Quantidade: " + encontrado.quantidade + "\n" +
                    "Preço: R$ " + encontrado.preco.toFixed(2)
                );
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            let codigoEntrada = Number(prompt("Código do produto:"));

            let produtoEntrada = produtos.find(p => p.codigo === codigoEntrada);

            if (produtoEntrada) {
                let entrada = Number(prompt("Quantidade para adicionar:"));

                if (Number.isInteger(entrada) && entrada > 0) {
                    produtoEntrada.quantidade += entrada;
                    alert("Estoque atualizado com sucesso!");
                } else {
                    alert("Quantidade inválida!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 5:
            let codigoSaida = Number(prompt("Código do produto:"));

            let produtoSaida = produtos.find(p => p.codigo === codigoSaida);

            if (produtoSaida) {
                let saida = Number(prompt("Quantidade para retirar:"));

                if (Number.isInteger(saida) && saida > 0) {
                    if (saida <= produtoSaida.quantidade) {
                        produtoSaida.quantidade -= saida;
                        alert("Saída realizada com sucesso!");
                    } else {
                        alert("Estoque insuficiente!");
                    }
                } else {
                    alert("Quantidade inválida!");
                }
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 6:
            let codigoExcluir = Number(prompt("Código do produto para excluir:"));

            let indice = produtos.findIndex(p => p.codigo === codigoExcluir);

            if (indice !== -1) {
                produtos.splice(indice, 1);
                alert("Produto excluído com sucesso!");
            } else {
                alert("Produto não encontrado!");
            }
            break;

        case 7:
            let totalProdutos = produtos.length;
            let totalUnidades = 0;
            let valorTotal = 0;

            produtos.forEach(produto => {
                totalUnidades += produto.quantidade;
                valorTotal += produto.quantidade * produto.preco;
            });

            alert(
                "===== RELATÓRIO DO ESTOQUE =====\n\n" +
                "Tipos de produtos: " + totalProdutos + "\n" +
                "Total de unidades: " + totalUnidades + "\n" +
                "Valor total do estoque: R$ " + valorTotal.toFixed(2)
            );
            break;

        case 0:
            alert("Sistema encerrado. Obrigado!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 0);
