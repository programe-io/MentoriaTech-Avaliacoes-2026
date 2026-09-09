// ========================================
// SISTEMA DE ESTOQUE
// ========================================


// Pegando os elementos do HTML

const formProduto = document.getElementById("formProduto");

const codigoInput = document.getElementById("codigo");
const nomeInput = document.getElementById("nome");
const categoriaInput = document.getElementById("categoria");
const quantidadeInput = document.getElementById("quantidade");
const precoInput = document.getElementById("preco");

const tabelaProdutos =
    document.getElementById("tabelaProdutos");

const mensagemVazia =
    document.getElementById("mensagemVazia");

const pesquisaInput =
    document.getElementById("pesquisa");


// ========================================
// CARREGAR PRODUTOS
// ========================================

// Tenta pegar os produtos salvos no navegador

let produtos =
    JSON.parse(localStorage.getItem("produtosEstoque")) || [];


// Se não existir nenhum produto,
// adicionamos alguns exemplos

if (produtos.length === 0) {

    produtos = [

        {
            codigo: "P001",
            nome: "Teclado USB",
            categoria: "Informática",
            quantidade: 15,
            preco: 59.90
        },

        {
            codigo: "P002",
            nome: "Mouse sem fio",
            categoria: "Acessórios",
            quantidade: 8,
            preco: 45.50
        },

        {
            codigo: "P003",
            nome: "Monitor 24 polegadas",
            categoria: "Informática",
            quantidade: 3,
            preco: 799.90
        },

        {
            codigo: "P004",
            nome: "Caderno",
            categoria: "Escritório",
            quantidade: 0,
            preco: 19.90
        }

    ];

    salvarProdutos();
}


// ========================================
// SALVAR NO LOCALSTORAGE
// ========================================

function salvarProdutos() {

    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );

}


// ========================================
// FORMATAR DINHEIRO
// ========================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ========================================
// DESCOBRIR STATUS
// ========================================

function descobrirStatus(quantidade) {

    if (quantidade === 0) {

        return {
            texto: "Sem estoque",
            classe: "status-sem"
        };

    }


    if (quantidade <= 5) {

        return {
            texto: "Estoque baixo",
            classe: "status-baixo"
        };

    }


    return {
        texto: "Em estoque",
        classe: "status-normal"
    };

}


// ========================================
// MOSTRAR PRODUTOS
// ========================================

function mostrarProdutos(lista = produtos) {

    tabelaProdutos.innerHTML = "";


    // Verifica se não existem produtos

    if (lista.length === 0) {

        mensagemVazia.style.display = "block";

        atualizarResumo();

        return;

    }


    mensagemVazia.style.display = "none";


    // Percorre todos os produtos

    lista.forEach((produto) => {

        const index =
            produtos.indexOf(produto);


        const linha =
            document.createElement("tr");


        const status =
            descobrirStatus(produto.quantidade);


        const valorTotal =
            produto.quantidade * produto.preco;


        linha.innerHTML = `

            <td>
                <strong>${produto.codigo}</strong>
            </td>


            <td>
                ${produto.nome}
            </td>


            <td>
                ${produto.categoria}
            </td>


            <td>
                <strong>
                    ${produto.quantidade}
                </strong>
            </td>


            <td>
                ${formatarMoeda(produto.preco)}
            </td>


            <td>
                ${formatarMoeda(valorTotal)}
            </td>


            <td>

                <span class="status ${status.classe}">
                    ${status.texto}
                </span>

            </td>


            <td>

                <div class="acoes">

                    <button
                        class="btn btn-entrada"
                        onclick="entradaEstoque(${index})"
                        title="Adicionar estoque"
                    >
                        +1
                    </button>


                    <button
                        class="btn btn-saida"
                        onclick="saidaEstoque(${index})"
                        title="Retirar estoque"
                    >
                        -1
                    </button>


                    <button
                        class="btn btn-excluir"
                        onclick="excluirProduto(${index})"
                        title="Excluir produto"
                    >
                        🗑️
                    </button>

                </div>

            </td>

        `;


        tabelaProdutos.appendChild(linha);

    });


    atualizarResumo();

}


// ========================================
// ADICIONAR PRODUTO
// ========================================

formProduto.addEventListener(
    "submit",
    function(event) {

        // Impede o formulário de recarregar a página

        event.preventDefault();


        const codigo =
            codigoInput.value.trim();

        const nome =
            nomeInput.value.trim();

        const categoria =
            categoriaInput.value;

        const quantidade =
            Number(quantidadeInput.value);

        const preco =
            Number(precoInput.value);


        // ========================================
        // VALIDAÇÕES
        // ========================================

        if (codigo === "") {

            alert("Digite o código do produto.");

            codigoInput.focus();

            return;
        }


        if (nome === "") {

            alert("Digite o nome do produto.");

            nomeInput.focus();

            return;
        }


        if (categoria === "") {

            alert("Selecione uma categoria.");

            categoriaInput.focus();

            return;
        }


        if (quantidade < 0 || isNaN(quantidade)) {

            alert("Digite uma quantidade válida.");

            quantidadeInput.focus();

            return;
        }


        if (preco <= 0 || isNaN(preco)) {

            alert("Digite um preço válido.");

            precoInput.focus();

            return;
        }


        // ========================================
        // VERIFICAR CÓDIGO DUPLICADO
        // ========================================

        const codigoExiste =
            produtos.some(
                produto =>
                    produto.codigo.toLowerCase() ===
                    codigo.toLowerCase()
            );


        if (codigoExiste) {

            alert(
                "Já existe um produto com esse código."
            );

            codigoInput.focus();

            return;
        }


        // ========================================
        // CRIAR PRODUTO
        // ========================================

        const novoProduto = {

            codigo: codigo,

            nome: nome,

            categoria: categoria,

            quantidade: quantidade,

            preco: preco

        };


        // Adiciona o produto ao array

        produtos.push(novoProduto);


        // Salva no navegador

        salvarProdutos();


        // Atualiza a tabela

        mostrarProdutos();


        // Limpa o formulário

        formProduto.reset();


        // Mensagem

        alert(
            "Produto cadastrado com sucesso!"
        );

    }
);


// ========================================
// ENTRADA DE ESTOQUE
// ========================================

function entradaEstoque(index) {

    produtos[index].quantidade++;

    salvarProdutos();

    mostrarProdutos();

}


// ========================================
// SAÍDA DE ESTOQUE
// ========================================

function saidaEstoque(index) {

    // Verifica se existe estoque

    if (produtos[index].quantidade <= 0) {

        alert(
            "Esse produto está sem estoque."
        );

        return;

    }


    produtos[index].quantidade--;


    salvarProdutos();

    mostrarProdutos();

}


// ========================================
// EXCLUIR PRODUTO
// ========================================

function excluirProduto(index) {

    const produto =
        produtos[index];


    const confirmar =
        confirm(
            `Deseja excluir o produto "${produto.nome}"?`
        );


    if (!confirmar) {

        return;

    }


    produtos.splice(index, 1);


    salvarProdutos();

    mostrarProdutos();

}


// ========================================
// PESQUISA
// ========================================

pesquisaInput.addEventListener(
    "input",
    function() {

        const texto =
            pesquisaInput.value
                .toLowerCase()
                .trim();


        const produtosFiltrados =
            produtos.filter(
                produto =>

                    produto.nome
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.codigo
                        .toLowerCase()
                        .includes(texto)

                    ||

                    produto.categoria
                        .toLowerCase()
                        .includes(texto)
            );


        mostrarProdutos(produtosFiltrados);

    }
);


// ========================================
// ATUALIZAR RESUMO
// ========================================

function atualizarResumo() {

    // Total de produtos cadastrados

    const totalProdutos =
        produtos.length;


    // Quantidade total de itens

    const totalItens =
        produtos.reduce(
            (total, produto) =>
                total + produto.quantidade,
            0
        );


    // Produtos com estoque baixo

    const estoqueBaixo =
        produtos.filter(
            produto =>
                produto.quantidade > 0 &&
                produto.quantidade <= 5
        ).length;


    // Produtos sem estoque

    const semEstoque =
        produtos.filter(
            produto =>
                produto.quantidade === 0
        ).length;


    // Mostrar na tela

    document.getElementById(
        "totalProdutos"
    ).textContent = totalProdutos;


    document.getElementById(
        "totalItens"
    ).textContent = totalItens;


    document.getElementById(
        "estoqueBaixo"
    ).textContent = estoqueBaixo;


    document.getElementById(
        "semEstoque"
    ).textContent = semEstoque;

}


// ========================================
// INICIAR SISTEMA
// ========================================

mostrarProdutos();
