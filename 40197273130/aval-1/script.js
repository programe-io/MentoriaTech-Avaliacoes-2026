
let produtos = [];

// Formatar valores em reais
function formatarDinheiro(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Ler texto e validar
function lerTexto(mensagem) {
    let texto;

    do {
        texto = prompt(mensagem);

        if (texto === null) return null;

        texto = texto.trim();

        if (texto === "") {
            alert("Digite uma informação válida!");
        }
    } while (texto === "");

    return texto;
}

// Ler números e validar
function lerNumero(mensagem, inteiro = false) {
    let numero;

    do {
        let entrada = prompt(mensagem);

        if (entrada === null) return null;

        numero = Number(entrada.replace(",", "."));

        if (
            entrada.trim() === "" ||
            !Number.isFinite(numero) ||
            numero < 0 ||
            (inteiro && !Number.isInteger(numero))
        ) {
            alert("Digite um número válido e não negativo!");
        } else {
            return numero;
        }

    } while (true);
}

// Procurar produto pelo código
function buscarProduto(codigo) {
    return produtos.find(p => p.codigo === codigo);
}

// 1 - Cadastrar produto
function cadastrarProduto() {
    alert("CADASTRO DE PRODUTO");

    let codigo = lerTexto("Digite o código do produto:");
    if (codigo === null) return;

    if (buscarProduto(codigo)) {
        alert("Já existe um produto com esse código!");
        return;
    }

    let descricao = lerTexto("Digite a descrição do produto:");
    if (descricao === null) return;

    let quantidade = lerNumero("Digite a quantidade:", true);
    if (quantidade === null) return;

    let valor = lerNumero("Digite o valor do produto:");
    if (valor === null) return;

    produtos.push({
        codigo,
        descricao,
        quantidade,
        valor
    });

    alert("Produto cadastrado com sucesso!");
}

// 2 - Alterar valor
function alterarValor() {
    let codigo = lerTexto("Digite o código do produto:");
    if (codigo === null) return;

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novoValor = lerNumero("Digite o novo valor:");
    if (novoValor === null) return;

    produto.valor = novoValor;

    alert("Preço atualizado com sucesso!");
}

// 3 - Listar produtos
function listarProdutos() {
    if (produtos.length === 0) {
        alert("Não existem produtos cadastrados!");
        return;
    }

    let lista = "===== ESTOQUE DE PRODUTOS =====\n\n";

    produtos.forEach(p => {
        lista +=
            "Código: " + p.codigo +
            "\nDescrição: " + p.descricao +
            "\nQuantidade: " + p.quantidade +
            "\nValor: " + formatarDinheiro(p.valor) +
            "\nTotal: " + formatarDinheiro(p.quantidade * p.valor) +
            "\n-----------------------------\n";
    });

    alert(lista);
}

// 4 - Alterar quantidade
function alterarQuantidade() {
    let codigo = lerTexto("Digite o código do produto:");
    if (codigo === null) return;

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    let novaQuantidade = lerNumero(
        "Quantidade atual: " + produto.quantidade +
        "\nDigite a nova quantidade:",
        true
    );

    if (novaQuantidade === null) return;

    produto.quantidade = novaQuantidade;

    alert("Quantidade atualizada com sucesso!");
}

// 5 - Pesquisar produto
function pesquisarProduto() {
    let codigo = lerTexto("Digite o código do produto:");
    if (codigo === null) return;

    let produto = buscarProduto(codigo);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    alert(
        "PRODUTO ENCONTRADO\n\n" +
        "Código: " + produto.codigo +
        "\nDescrição: " + produto.descricao +
        "\nQuantidade: " + produto.quantidade +
        "\nValor: " + formatarDinheiro(produto.valor)
    );
}

// 6 - Excluir produto
function excluirProduto() {
    let codigo = lerTexto("Digite o código do produto:");
    if (codigo === null) return;

    let indice = produtos.findIndex(p => p.codigo === codigo);

    if (indice === -1) {
        alert("Produto não encontrado!");
        return;
    }

    let confirmar = confirm(
        "Deseja realmente excluir " +
        produtos[indice].descricao + "?"
    );

    if (confirmar) {
        produtos.splice(indice, 1);
        alert("Produto excluído com sucesso!");
    }
}

// 7 - Valor total do estoque
function valorTotalEstoque() {
    let total = produtos.reduce(
        (soma, p) => soma + (p.quantidade * p.valor),
        0
    );

    alert(
        "VALOR TOTAL DO ESTOQUE\n\n" +
        formatarDinheiro(total)
    );
}

// 8 - Verificar estoque baixo
function verificarEstoqueBaixo() {
    let baixo = produtos.filter(p => p.quantidade <= 5);

    if (baixo.length === 0) {
        alert("Nenhum produto com estoque baixo!");
        return;
    }

    let mensagem = "ATENÇÃO! ESTOQUE BAIXO\n\n";

    baixo.forEach(p => {
        mensagem +=
            p.descricao +
            "\nQuantidade disponível: " + p.quantidade +
            "\n----------------------\n";
    });

    alert(mensagem);
}

// MENU PRINCIPAL
function menu() {
    let opcao;

    do {
        opcao = prompt(
            "===== SISTEMA DE ESTOQUE =====\n\n" +
            "1 - Cadastrar produto\n" +
            "2 - Alterar valor do produto\n" +
            "3 - Listar produtos\n" +
            "4 - Alterar quantidade\n" +
            "5 - Pesquisar produto\n" +
            "6 - Excluir produto\n" +
            "7 - Valor total do estoque\n" +
            "8 - Verificar estoque baixo\n" +
            "0 - Sair\n\n" +
            "Escolha uma opção:"
        );

        if (opcao === null) break;

        switch (opcao) {
            case "1":
                cadastrarProduto();
                break;

            case "2":
                alterarValor();
                break;

            case "3":
                listarProdutos();
                break;

            case "4":
                alterarQuantidade();
                break;

            case "5":
                pesquisarProduto();
                break;

            case "6":
                excluirProduto();
                break;

            case "7":
                valorTotalEstoque();
                break;

            case "8":
                verificarEstoqueBaixo();
                break;

            case "0":
                alert("Sistema encerrado. Obrigado!");
                break;

            default:
                alert("Opção inválida! Tente novamente.");
        }

    } while (opcao !== "0");
}

// Iniciar sistema
menu();
