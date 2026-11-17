
// Lista (Array) de Produtos
let produtos = [];

// Função para validar produto
function validarProduto(descricao, quantidade, valor) {

    if (descricao.length < 5) {
        throw new Error(
            "Descrição deve ter no mínimo 5 caracteres"
        );
    }

    if (quantidade < 1) {
        throw new Error(
            "Quantidade deve ser maior que zero"
        );
    }

    if (valor < 0) {
        throw new Error(
            "Valor deve ser maior ou igual a zero"
        );
    }
}

// Função para cadastrar produto
function cadastrarProduto() {

    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(
        document.getElementById("quantidade").value
    );
    let valor = Number(
        document.getElementById("valor").value
    );

    try {

        // Validar os dados
        validarProduto(descricao, quantidade, valor);

        // Criar novo produto
        let novoProduto = {
            codigo: produtos.length + 1,
            descricao: descricao,
            quantidade: quantidade,
            valor: valor
        };

        // Adicionar produto ao Array
        produtos.push(novoProduto);

        // Atualizar tabela
        atualizarLista();

        // Exibir mensagem
        document.getElementById("mensagem").innerHTML =
            "Produto cadastrado com sucesso!";

        // Limpar campos
        document.getElementById("descricao").value = "";
        document.getElementById("quantidade").value = "";
        document.getElementById("valor").value = "";

    } catch (erro) {

        document.getElementById("mensagem").innerHTML =
            erro.message;

    }
}

// Função para atualizar a lista de produtos
function atualizarLista() {

    let tabela = document.getElementById("listaProdutos");

    tabela.innerHTML = "";

    produtos.forEach(function(produto) {

        tabela.innerHTML += `
            <tr>
                <td>${produto.codigo}</td>
                <td>${produto.descricao}</td>
                <td>${produto.quantidade}</td>
                <td>R$ ${produto.valor.toFixed(2)}</td>
            </tr>
        `;

    });
}
