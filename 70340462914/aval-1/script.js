let produtos = [];


// CADASTRAR PRODUTO
function cadastrarProduto() {

    let codigo = Number(document.getElementById("codigo").value);
    let descricao = document.getElementById("descricao").value;
    let quantidade = Number(document.getElementById("quantidade").value);
    let valor = Number(document.getElementById("valor").value);


    // Verifica se os campos foram preenchidos
    if (!codigo || !descricao || !quantidade || !valor) {

        alert("Preencha todos os campos!");

        return;
    }


    // Verifica se o código já existe
    for (let produto of produtos) {

        if (produto.codigo === codigo) {

            alert("Esse código já está cadastrado!");

            return;
        }
    }


    // Cria o produto
    let produto = {

        codigo: codigo,
        descricao: descricao,
        quantidade: quantidade,
        valor: valor

    };


    // Adiciona o produto à lista
    produtos.push(produto);


    alert("Produto cadastrado com sucesso!");


    // Limpa os campos
    document.getElementById("codigo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("quantidade").value = "";
    document.getElementById("valor").value = "";


    listarProdutos();
}



// LISTAR PRODUTOS
function listarProdutos() {

    let lista = document.getElementById("listaProdutos");

    lista.innerHTML = "";


    for (let produto of produtos) {

        lista.innerHTML += `

            <tr>

                <td>${produto.codigo}</td>

                <td>${produto.descricao}</td>

                <td>${produto.quantidade}</td>

                <td>R$ ${produto.valor.toFixed(2)}</td>

                <td>

                    <button onclick="alterarValor(${produto.codigo})">
                        Alterar valor
                    </button>

                    <button onclick="alterarQuantidade(${produto.codigo})">
                        Alterar quantidade
                    </button>

                </td>

            </tr>

        `;
    }
}



// ALTERAR VALOR
function alterarValor(codigo) {

    for (let produto of produtos) {

        if (produto.codigo === codigo) {

            let novoValor = Number(
                prompt("Digite o novo valor:")
            );


            if (novoValor > 0) {

                produto.valor = novoValor;

                alert("Valor alterado com sucesso!");

                listarProdutos();

            } else {

                alert("Digite um valor válido!");

            }

            return;
        }
    }

    alert("Produto não encontrado!");
}



// ALTERAR QUANTIDADE
function alterarQuantidade(codigo) {

    for (let produto of produtos) {

        if (produto.codigo === codigo) {

            let novaQuantidade = Number(
                prompt("Digite a nova quantidade:")
            );


            if (novaQuantidade >= 0) {

                produto.quantidade = novaQuantidade;

                alert("Quantidade alterada com sucesso!");

                listarProdutos();

            } else {

                alert("Digite uma quantidade válida!");

            }

            return;
        }
    }

    alert("Produto não encontrado!");
}