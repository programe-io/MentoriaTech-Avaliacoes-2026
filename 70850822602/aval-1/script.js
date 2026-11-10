
let produtos = [];
let opcao;

do {
    console.log("\n===== SISTEMA DE ESTOQUE =====");
    console.log("1 - Cadastrar novo produto");
    console.log("2 - Listar produtos");
    console.log("3 - Alterar valor do produto");
    console.log("4 - Alterar quantidade do produto");
    console.log("0 - Sair");

    opcao = Number(prompt("Escolha uma opção:"));

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
                let lista = "===== PRODUTOS CADASTRADOS =====\n";

                produtos.forEach(produto => {
                    lista += "\nCódigo: " + produto.codigo;
                    lista += "\nDescrição: " + produto.descricao;
                    lista += "\nQuantidade: " + produto.quantidade;
                    lista += "\nValor: R$ " + produto.valor.toFixed(2);
                    lista += "\n--------------------------";
                });

                alert(lista);
            }
            break;

        case 3:
            // Alterar valor do produto
            let codValor = Number(prompt("Digite o código do produto:"));

            let produtoValor = produtos.find(
                produto => produto.codigo === codValor
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
                produto => produto.codigo === codQuantidade
            );

            if (produtoQuantidade) {
                let novaQuantidade = Number(prompt("Digite a nova quantidade:"));
                produtoQuantidade.quantidade = novaQuantidade;

                alert("Quantidade alterada com sucesso!");
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
