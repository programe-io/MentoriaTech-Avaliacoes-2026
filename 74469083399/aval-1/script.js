let produtos = [];

let opcao;

while (opcao !== "5") {
    opcao = prompt(
        "SISTEMA DE ESTOQUE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos\n" +
        "3 - Alterar valor\n" +
        "4 - Alterar quantidade\n" +
        "5 - Sair\n\n" +
        "Escolha uma opção:"
    );

    if (opcao === "1") {
        let codigo = prompt("Digite o código do produto:");
        let descricao = prompt("Digite a descrição:");
        let quantidade = Number(prompt("Digite a quantidade:"));
        let valor = Number(prompt("Digite o valor:"));

        produtos.push({
            codigo: codigo,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        });

        alert("Produto cadastrado com sucesso!");

    } else if (opcao === "2") {

        let lista = "";

        for (let produto of produtos) {
            lista +=
                "Código: " + produto.codigo +
                "\nDescrição: " + produto.descricao +
                "\nQuantidade: " + produto.quantidade +
                "\nValor: R$ " + produto.valor.toFixed(2) +
                "\n-------------------\n";
        }

        alert(lista || "Nenhum produto cadastrado.");

    } else if (opcao === "3") {

        let codigo = prompt("Digite o código do produto:");
        let produto = produtos.find(p => p.codigo === codigo);

        if (produto) {
            produto.valor = Number(prompt("Digite o novo valor:"));
            alert("Valor alterado com sucesso!");
        } else {
            alert("Produto não encontrado!");
        }

    } else if (opcao === "4") {

        let codigo = prompt("Digite o código do produto:");
        let produto = produtos.find(p => p.codigo === codigo);

        if (produto) {
            produto.quantidade = Number(prompt("Digite a nova quantidade:"));
            alert("Quantidade alterada com sucesso!");
        } else {
            alert("Produto não encontrado!");
        }

    } else if (opcao === "5") {
        alert("Sistema encerrado!");

    } else {
        alert("Opção inválida!");
    }
}