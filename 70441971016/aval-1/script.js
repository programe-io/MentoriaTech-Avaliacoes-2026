let produtos = [];


// ELEMENTOS DO HTML

const formProduto = document.getElementById("formProduto");

const listaProdutos = document.getElementById("listaProdutos");

const semProdutos = document.getElementById("semProdutos");

const totalProdutos = document.getElementById("totalProdutos");

const totalQuantidade = document.getElementById("totalQuantidade");

const valorEstoque = document.getElementById("valorEstoque");

const mensagem = document.getElementById("mensagem");


// MODAL

const modal = document.getElementById("modal");

const fecharModal = document.getElementById("fecharModal");

const cancelarModal = document.getElementById("cancelarModal");

const salvarAlteracoes =
    document.getElementById("salvarAlteracoes");

const codigoEdicao =
    document.getElementById("codigoEdicao");

const novoValor =
    document.getElementById("novoValor");

const novaQuantidade =
    document.getElementById("novaQuantidade");


// ================================
// CADASTRAR PRODUTO
// ================================

formProduto.addEventListener("submit", function(event) {

    event.preventDefault();


    const codigo =
        Number(document.getElementById("codigo").value);

    const descricao =
        document.getElementById("descricao").value;

    const quantidade =
        Number(document.getElementById("quantidade").value);

    const valor =
        Number(document.getElementById("valor").value);


    // VERIFICAR CÓDIGO

    const existe = produtos.some(function(produto) {

        return produto.codigo === codigo;

    });


    if (existe) {

        mostrarMensagem(
            "Já existe um produto com esse código!"
        );

        return;
    }


    // CRIAR PRODUTO

    const produto = {

        codigo: codigo,

        descricao: descricao,

        quantidade: quantidade,

        valor: valor

    };


    // ADICIONAR AO ARRAY

    produtos.push(produto);


    // LIMPAR FORMULÁRIO

    formProduto.reset();


    // ATUALIZAR TELA

    atualizarTela();


    mostrarMensagem(
        "Produto cadastrado com sucesso!"
    );

});


// ================================
// ATUALIZAR TELA
// ================================

function atualizarTela() {

    listaProdutos.innerHTML = "";


    if (produtos.length === 0) {

        semProdutos.style.display = "block";

    } else {

        semProdutos.style.display = "none";


        produtos.forEach(function(produto) {

            const tr = document.createElement("tr");


            tr.innerHTML = `

                <td>
                    <span class="codigo">
                        #${produto.codigo}
                    </span>
                </td>

                <td>
                    <strong>
                        ${produto.descricao}
                    </strong>
                </td>

                <td>
                    <span class="quantidade">
                        ${produto.quantidade}
                    </span>
                </td>

                <td>
                    <span class="valor">
                        ${formatarMoeda(produto.valor)}
                    </span>
                </td>

                <td>

                    <div class="acoes">

                        <button
                            class="btn-editar"
                            onclick="abrirEdicao(${produto.codigo})"
                        >
                            Editar
                        </button>

                        <button
                            class="btn-excluir"
                            onclick="excluirProduto(${produto.codigo})"
                        >
                            Excluir
                        </button>

                    </div>

                </td>

            `;


            listaProdutos.appendChild(tr);

        });

    }


    atualizarDashboard();

}


// ================================
// DASHBOARD
// ================================

function atualizarDashboard() {


    // TOTAL DE PRODUTOS

    totalProdutos.textContent =
        produtos.length;


    // QUANTIDADE TOTAL

    let quantidade = 0;


    produtos.forEach(function(produto) {

        quantidade += produto.quantidade;

    });


    totalQuantidade.textContent =
        quantidade;


    // VALOR TOTAL DO ESTOQUE

    let total = 0;


    produtos.forEach(function(produto) {

        total +=
            produto.quantidade * produto.valor;

    });


    valorEstoque.textContent =
        formatarMoeda(total);

}


// ================================
// ABRIR EDIÇÃO
// ================================

function abrirEdicao(codigo) {


    const produto = produtos.find(function(produto) {

        return produto.codigo === codigo;

    });


    if (!produto) {

        return;

    }


    codigoEdicao.value =
        produto.codigo;


    novoValor.value =
        produto.valor;


    novaQuantidade.value =
        produto.quantidade;


    modal.classList.add("ativo");

}


// ================================
// SALVAR ALTERAÇÕES
// ================================

salvarAlteracoes.addEventListener(
    "click",
    function() {


        const codigo =
            Number(codigoEdicao.value);


        const produto =
            produtos.find(function(produto) {

                return produto.codigo === codigo;

            });


        if (!produto) {

            return;

        }


        const valor =
            Number(novoValor.value);


        const quantidade =
            Number(novaQuantidade.value);


        produto.valor = valor;

        produto.quantidade = quantidade;


        fecharModalFuncao();


        atualizarTela();


        mostrarMensagem(
            "Produto alterado com sucesso!"
        );

    }
);


// ================================
// EXCLUIR PRODUTO
// ================================

function excluirProduto(codigo) {


    const confirmar =
        confirm(
            "Deseja realmente excluir este produto?"
        );


    if (!confirmar) {

        return;

    }


    produtos =
        produtos.filter(function(produto) {

            return produto.codigo !== codigo;

        });


    atualizarTela();


    mostrarMensagem(
        "Produto excluído com sucesso!"
    );

}


// ================================
// FECHAR MODAL
// ================================

function fecharModalFuncao() {

    modal.classList.remove("ativo");

}


fecharModal.addEventListener(
    "click",
    fecharModalFuncao
);


cancelarModal.addEventListener(
    "click",
    fecharModalFuncao
);


// Fechar clicando fora do modal

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            fecharModalFuncao();

        }

    }
);


// ================================
// FORMATAR MOEDA
// ================================

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


// ================================
// MENSAGEM
// ================================

function mostrarMensagem(texto) {


    mensagem.textContent =
        texto;


    mensagem.classList.add("exibir");


    setTimeout(function() {

        mensagem.classList.remove("exibir");

    }, 3000);

}


// INICIAR SISTEMA

atualizarTela();