
let produtos = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ESTOQUE =====\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Consultar produto\n" +
        "4 - Atualizar estoque\n" +
        "5 - Remover produto\n" +
        "6 - Valor total do estoque\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            let nome = prompt("Nome do produto:");
            let preco = Number(prompt("Preço do produto:"));
            let quantidade = Number(prompt("Quantidade:"));

            if (nome && preco >= 0 && quantidade >= 0) {
                produtos.push({
                    nome: nome,
                    preco: preco,
                    quantidade: quantidade
                });

                alert("Produto cadastrado com sucesso!");
            } else {
                alert("Dados inválidos!");
            }
            break;

        case 2:
            if (produtos.length === 0) {
                alert("Nenhum produto cadastrado.");
            } else {
                let lista = "===== PRODUTOS =====\n";

                for (let i = 0; i < produtos.length; i++) {
                    lista +=
                        "\nNome: " + produtos[i].nome +
                        "\nPreço: R$ " + produtos[i].preco.toFixed(2) +
                        "\nQuantidade: " + produtos[i].quantidade +
                        "\n-------------------";
                }

                alert(lista);
            }
            break;

        case 3:
            let busca = prompt("Digite o nome do produto:");
            let encontrado = false;

            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].nome.toLowerCase() === busca.toLowerCase()) {
                    alert(
                        "Produto: " + produtos[i].nome +
                        "\nPreço: R$ " + produtos[i].preco.toFixed(2) +
                        "\nQuantidade: " + produtos[i].quantidade
                    );
                    encontrado = true;
                    break;
                }
            }

            if (!encontrado) {
                alert("Produto não encontrado!");
            }
            break;

        case 4:
            let atualizar = prompt("Qual produto deseja atualizar?");
            let atualizado = false;

            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].nome.toLowerCase() === atualizar.toLowerCase()) {
                    produtos[i].quantidade = Number(
                        prompt("Digite a nova quantidade:")
                    );

                    alert("Estoque atualizado!");
                    atualizado = true;
                    break;
                }
            }

            if (!atualizado) {
                alert("Produto não encontrado!");
            }
            break;

        case 5:
            let remover = prompt("Qual produto deseja remover?");
            let removido = false;

            for (let i = 0; i < produtos.length; i++) {
                if (produtos[i].nome.toLowerCase() === remover.toLowerCase()) {
                    produtos.splice(i, 1);
                    alert("Produto removido com sucesso!");
                    removido = true;
                    break;
                }
            }

            if (!removido) {
                alert("Produto não encontrado!");
            }
            break;

        case 6:
            let total = 0;

            for (let i = 0; i < produtos.length; i++) {
                total += produtos[i].preco * produtos[i].quantidade;
            }

            alert("Valor total do estoque: R$ " + total.toFixed(2));
            break;

        case 0:
            alert("Sistema encerrado. Até mais!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 0);
