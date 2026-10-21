
let produtos = [];
let opcao;

do {
    console.log("\n===== SISTEMA DE ESTOQUE =====");
    console.log("1 - Cadastrar novo produto");
    console.log("2 - Listar produtos");
    console.log("3 - Alterar valor de um produto");
    console.log("4 - Alterar quantidade de um produto");
    console.log("0 - Sair");

    opcao = Number(prompt("Escolha uma opção:"));

    switch (opcao) {
        case 1: {
            let codigo = prompt("Digite o código do produto:");

            // Verifica se o código já existe
            if (produtos.some(p => p.codigo === codigo)) {
                alert("Já existe um produto com esse código!");
                break;
            }

            let descricao = prompt("Digite a descrição do produto:");
            let quantidade = Number(prompt("Digite a quantidade:"));
            let valor = Number(prompt("Digite o valor unitário:"));

            if (
                !descricao.trim() ||
                !Number.isInteger(quantidade) ||
                quantidade < 0 ||
                !Number.isFinite(valor) ||
                valor < 0
            ) {
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
        }

        case 2: {
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado.");
                break;
            }

            let lista = "===== PRODUTOS CADASTRADOS =====\n";

            produtos.forEach(produto => {
                lista +=
                    "\nCódigo: " + produto.codigo +
                    "\nDescrição: " + produto.descricao +
                    "\nQuantidade: " + produto.quantidade +
                    "\nValor unitário: R$ " +
                    produto.valor.toFixed(2) +
                    "\n-------------------------";
            });

            alert(lista);
            break;
        }

        case 3: {
            let codigo = prompt(
                "Digite o código do produto que deseja alterar o valor:"
            );

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                break;
            }

            let novoValor = Number(
                prompt("Digite o novo valor unitário:")
            );

            if (!Number.isFinite(novoValor) || novoValor < 0) {
                alert("Valor inválido!");
                break;
            }

            produto.valor = novoValor;
            alert("Valor alterado com sucesso!");
            break;
        }

        case 4: {
            let codigo = prompt(
                "Digite o código do produto que deseja alterar a quantidade:"
            );

            let produto = produtos.find(p => p.codigo === codigo);

            if (!produto) {
                alert("Produto não encontrado!");
                break;
            }

            let novaQuantidade = Number(
                prompt("Digite a nova quantidade:")
            );

            if (
                !Number.isInteger(novaQuantidade) ||
                novaQuantidade < 0
            ) {
                alert("Quantidade inválida!");
                break;
            }

            produto.quantidade = novaQuantidade;
            alert("Quantidade alterada com sucesso!");
            break;
        }

        case 0:
            alert("Encerrando o sistema de estoque...");
            break;

        default:
            alert("Opção inválida! Escolha uma opção do menu.");
    }

} while (opcao !== 0);
