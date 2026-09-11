```javascript
// ============================================
// ARRAY PRINCIPAL
// ============================================

let produtos = [];


// ============================================
// VARIÁVEL PARA GERAR CÓDIGOS
// ============================================

let proximoCodigo = 1;


// ============================================
// ELEMENTOS HTML
// ============================================

const formulario = document.getElementById("formProduto");

const descricao = document.getElementById("descricao");

const categoria = document.getElementById("categoria");

const quantidade = document.getElementById("quantidade");

const preco = document.getElementById("preco");

const listaProdutos = document.getElementById("listaProdutos");

const pesquisa = document.getElementById("pesquisa");

const mensagemVazia =
    document.getElementById("mensagemVazia");


// ============================================
// VALIDAR PRODUTO
// ============================================

function validarProduto(descricao, quantidade, preco) {

    // A descrição precisa ter pelo menos 5 caracteres
    if (descricao.length < 5) {

        throw new Error(
            "A descrição deve ter no mínimo 5 caracteres."
        );
    }


    // A quantidade não pode ser negativa
    if (quantidade < 0) {

        throw new Error(
            "A quantidade não pode ser negativa."
        );
    }


    // O preço não pode ser negativo
    if (preco < 0) {

        throw new Error(
            "O preço não pode ser negativo."
        );
    }

}


// ============================================
// CADASTRAR PRODUTO
// ============================================

function cadastrarProduto(descricao, categoria, quantidade, preco) {

    validarProduto(
        descricao,
        quantidade,
        preco
    );


    const novoProduto = {

        codigo: proximoCodigo,

        descricao: descricao,

        categoria: categoria,

        quantidade: quantidade,

        preco: preco
    };


    // Adiciona o produto ao final do array
    produtos.push(novoProduto);


    // Incrementa o código
    proximoCodigo++;


    return novoProduto;
}


// ============================================
// LISTAR PRODUTOS
// ============================================

function listarProdutos(lista) {

    listaProdutos.innerHTML = "";


    if (lista.length === 0) {

        mensagemVazia.style.display = "block";

        return;
    }


    mensagemVazia.style.display = "none";


    lista.forEach(function(produto) {

        let status = "";
        let classe = "";


        if (produto.quantidade === 0) {

            status = "Esgotado";
            classe = "esgotado";

        } else if (produto.quantidade <= 5) {

            status = "Estoque baixo";
            classe = "baixo";

        } else {

            status = "Disponível";
            classe = "disponivel";
        }


        const linha = document.createElement("tr");


        linha.innerHTML = `

            <td>#${produto.codigo}</td>

            <td>${produto.descricao}</td>

            <td>${produto.categoria}</td>

            <td>${produto.quantidade}</td>

            <td>
                R$ ${produto.preco.toFixed(2)}
            </td>

            <td>
                <span class="status ${classe}">
                    ${status}
                </span>
            </td>

            <td>

                <button
                    class="btn-editar"
                    onclick="editarProduto(${produto.codigo})"
                >
                    Editar
                </button>

                <button
                    class="btn-excluir"
                    onclick="excluirProduto(${produto.codigo})"
                >
                    Excluir
                </button>

            </td>
        `;


        listaProdutos.appendChild(linha);

    });


    atualizarResumo();

}


// ============================================
// BUSCAR PRODUTO
// ============================================

function buscarProduto(codigo) {

    return produtos.find(function(produto) {

        return produto.codigo === codigo;

    });

}


// ============================================
// EDITAR PRODUTO
// ============================================

function editarProduto(codigo) {

    const produto = buscarProduto(codigo);


    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }


    const novaDescricao = prompt(
        "Digite a nova descrição:",
        produto.descricao
    );


    if (novaDescricao === null) {
        return;
    }


    const novaCategoria = prompt(
        "Digite a nova categoria:",
        produto.categoria
    );


    if (novaCategoria === null) {
        return;
    }


    const novaQuantidade = Number(
        prompt(
            "Digite a nova quantidade:",
            produto.quantidade
        )
    );


    const novoPreco = Number(
        prompt(
            "Digite o novo preço:",
            produto.preco
        )
    );


    try {

        validarProduto(
            novaDescricao.trim(),
            novaQuantidade,
            novoPreco
        );


        produto.descricao = novaDescricao.trim();

        produto.categoria = novaCategoria.trim();

        produto.quantidade = novaQuantidade;

        produto.preco = novoPreco;


        listarProdutos(produtos);


        alert("Produto alterado com sucesso!");

    } catch (erro) {

        alert(erro.message);

    }

}


// ============================================
// EXCLUIR PRODUTO
// ============================================

function excluirProduto(codigo) {

    const produto = buscarProduto(codigo);


    if (!produto) {

        alert("Produto não encontrado.");

        return;
    }


    const confirmar = confirm(
        `Deseja excluir "${produto.descricao}"?`
    );


    if (!confirmar) {
        return;
    }


    produtos = produtos.filter(function(produto) {

        return produto.codigo !== codigo;

    });


    listarProdutos(produtos);

}


// ============================================
// ATUALIZAR RESUMO
// ============================================

function atualizarResumo() {

    document.getElementById("totalProdutos")
        .textContent = produtos.length;


    let totalItens = 0;

    let estoqueBaixo = 0;


    produtos.forEach(function(produto) {

        totalItens += produto.quantidade;


        if (
            produto.quantidade > 0 &&
            produto.quantidade <= 5
        ) {

            estoqueBaixo++;

        }

    });


    document.getElementById("totalItens")
        .textContent = totalItens;


    document.getElementById("estoqueBaixo")
        .textContent = estoqueBaixo;

}


// ============================================
// CADASTRO PELO FORMULÁRIO
// ============================================

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const descricaoProduto =
            descricao.value.trim();


        const categoriaProduto =
            categoria.value.trim();


        const quantidadeProduto =
            Number(quantidade.value);


        const precoProduto =
            Number(preco.value);


        try {

            cadastrarProduto(

                descricaoProduto,

                categoriaProduto,

                quantidadeProduto,

                precoProduto

            );


            formulario.reset();


            listarProdutos(produtos);


            alert(
                "Produto cadastrado com sucesso!"
            );


        } catch (erro) {

            alert(erro.message);

        }

    }
);


// ============================================
// PESQUISA
// ============================================

pesquisa.addEventListener(
    "input",
    function() {

        const texto =
            pesquisa.value.toLowerCase();


        const resultados =
            produtos.filter(function(produto) {

                return (

                    produto.descricao
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.categoria
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.codigo
                        .toString()
                        .includes(texto)

                );

            });


        listarProdutos(resultados);

    }
);


// ============================================
// INICIAR SISTEMA
// ============================================

listarProdutos(produtos);
```
