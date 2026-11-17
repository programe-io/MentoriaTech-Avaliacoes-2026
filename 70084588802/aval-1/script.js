
// ==========================================
// PROJETO CRUD E CONTROLE DE ESTOQUE
// ==========================================

// 1. CRIAÇÃO DA LISTA DE PRODUTOS

let produtos = JSON.parse(localStorage.getItem("produtosEstoque")) || [];

let proximoCodigo = Number(
    localStorage.getItem("proximoCodigoEstoque")
) || 1;

let codigoEmEdicao = null;


// 2. SELEÇÃO DOS ELEMENTOS HTML

const form = document.getElementById("formProduto");

const descricaoInput = document.getElementById("descricao");

const quantidadeInput = document.getElementById("quantidade");

const valorInput = document.getElementById("valor");

const listaProdutos = document.getElementById("listaProdutos");

const buscaInput = document.getElementById("busca");

const mensagem = document.getElementById("mensagem");

const botaoCancelar = document.getElementById("cancelarEdicao");


// 3. FORMATAÇÃO DE VALORES

function moeda(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// 4. SALVAR DADOS NO NAVEGADOR

function salvarDados() {

    localStorage.setItem(
        "produtosEstoque",
        JSON.stringify(produtos)
    );

    localStorage.setItem(
        "proximoCodigoEstoque",
        String(proximoCodigo)
    );

}


// 5. FUNÇÃO PARA VALIDAR PRODUTO

function validarProduto(descricao, quantidade, valor) {

    if (!descricao.trim()) {
        return "Informe a descrição do produto.";
    }

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        return "A quantidade deve ser um número inteiro positivo.";
    }

    if (!Number.isFinite(valor) || valor <= 0) {
        return "O valor deve ser maior que zero.";
    }

    return null;

}


// 6. MOSTRAR MENSAGENS

function mostrarMensagem(texto, tipo = "sucesso") {

    mensagem.textContent = texto;

    mensagem.className = `mensagem ${tipo}`;

}


// 7. FUNÇÃO PARA CADASTRAR PRODUTO

function cadastrarProduto(descricao, quantidade, valor) {

    const erro = validarProduto(
        descricao,
        quantidade,
        valor
    );

    if (erro) {
        mostrarMensagem(erro, "erro");
        return;
    }

    // Criando objeto do produto

    const produto = {

        codigo: proximoCodigo++,

        descricao: descricao.trim(),

        quantidade: quantidade,

        valor: valor

    };

    // Adicionando produto ao array

    produtos.push(produto);

    salvarDados();

    renderizarProdutos();

    form.reset();

    mostrarMensagem("Produto cadastrado com sucesso!");

}


// 8. FUNÇÃO PARA BUSCAR PRODUTOS

function listarProdutos(filtro = "") {

    const termo = filtro.trim().toLowerCase();

    return produtos.filter(produto =>

        produto.descricao.toLowerCase().includes(termo) ||

        String(produto.codigo).includes(termo)

    );

}


// 9. FUNÇÃO PARA EXIBIR PRODUTOS NA TABELA

function renderizarProdutos() {

    const encontrados = listarProdutos(buscaInput.value);

    listaProdutos.innerHTML = "";

    document.getElementById("vazio").style.display =
        encontrados.length === 0 ? "block" : "none";

    encontrados.forEach(produto => {

        const linha = document.createElement("tr");

        const valores = [

            produto.codigo,

            produto.descricao,

            produto.quantidade,

            moeda(produto.valor),

            moeda(produto.quantidade * produto.valor)

        ];

        valores.forEach((valor, indice) => {

            const celula = document.createElement("td");

            celula.textContent = valor;

            if (indice === 0) {
                celula.className = "codigo";
            }

            if (indice === 1) {
                celula.className = "produto-nome";
            }

            if (indice === 2) {

                celula.innerHTML =
                    `<span class="quantidade-tag">${produto.quantidade} un.</span>`;

            }

            linha.appendChild(celula);

        });


        // Botões de ações

        const celulaAcoes = document.createElement("td");

        const acoes = document.createElement("div");

        acoes.className = "acoes";


        // Botão editar

        const editar = document.createElement("button");

        editar.className = "acao";

        editar.textContent = "Editar";

        editar.addEventListener("click", () => {

            iniciarEdicao(produto.codigo);

        });


        // Botão adicionar estoque

        const entrada = document.createElement("button");

        entrada.className = "acao";

        entrada.textContent = "+ Estoque";

        entrada.addEventListener("click", () => {

            adicionarEstoque(produto.codigo);

        });


        // Botão excluir

        const excluir = document.createElement("button");

        excluir.className = "acao excluir";

        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {

            excluirProduto(produto.codigo);

        });


        acoes.append(editar, entrada, excluir);

        celulaAcoes.appendChild(acoes);

        linha.appendChild(celulaAcoes);

        listaProdutos.appendChild(linha);

    });

    atualizarResumo();

}


// 10. ATUALIZAR RESUMO DO ESTOQUE

function atualizarResumo() {

    const unidades = produtos.reduce(
        (soma, produto) => soma + produto.quantidade,
        0
    );

    const total = produtos.reduce(
        (soma, produto) =>
            soma + (produto.quantidade * produto.valor),
        0
    );

    document.getElementById("totalProdutos").textContent =
        produtos.length;

    document.getElementById("totalUnidades").textContent =
        unidades;

    document.getElementById("valorEstoque").textContent =
        moeda(total);

}


// 11. BUSCAR PRODUTO PELO CÓDIGO

function buscarProduto(codigo) {

    return produtos.find(
        produto => produto.codigo === codigo
    );

}


// 12. ATUALIZAR VALOR DO PRODUTO

function atualizarValor(codigo, novoValor) {

    const produto = buscarProduto(codigo);

    if (!produto) {

        mostrarMensagem("Produto não encontrado.", "erro");

        return;

    }

    if (!Number.isFinite(novoValor) || novoValor <= 0) {

        mostrarMensagem("Informe um valor válido.", "erro");

        return;

    }

    produto.valor = novoValor;

    salvarDados();

    renderizarProdutos();

    mostrarMensagem("Valor atualizado com sucesso!");

}


// 13. ATUALIZAR QUANTIDADE DO PRODUTO

function atualizarQuantidade(codigo, quantidadeAdicional) {

    const produto = buscarProduto(codigo);

    if (!produto) {

        mostrarMensagem("Produto não encontrado.", "erro");

        return;

    }

    if (!Number.isInteger(quantidadeAdicional) ||
        quantidadeAdicional <= 0) {

        mostrarMensagem("Quantidade inválida.", "erro");

        return;

    }

    produto.quantidade += quantidadeAdicional;

    salvarDados();

    renderizarProdutos();

    mostrarMensagem("Estoque atualizado com sucesso!");

}


// 14. INICIAR EDIÇÃO DO PRODUTO

function iniciarEdicao(codigo) {

    const produto = buscarProduto(codigo);

    if (!produto) {

        mostrarMensagem("Produto não encontrado.", "erro");

        return;

    }

    codigoEmEdicao = codigo;

    descricaoInput.value = produto.descricao;

    quantidadeInput.value = produto.quantidade;

    valorInput.value = produto.valor;

    document.querySelector("#formProduto .primario")
        .textContent = "Salvar alterações";

    botaoCancelar.classList.remove("esconder");

    descricaoInput.focus();

    mostrarMensagem("Editando produto. Altere os campos e salve.");

}


// 15. CANCELAR EDIÇÃO

function cancelarEdicao() {

    codigoEmEdicao = null;

    form.reset();

    document.querySelector("#formProduto .primario")
        .textContent = "＋ Cadastrar produto";

    botaoCancelar.classList.add("esconder");

    mostrarMensagem("");

}


// 16. EXCLUIR PRODUTO

function excluirProduto(codigo) {

    const produto = buscarProduto(codigo);

    if (!produto) {

        mostrarMensagem("Produto não encontrado.", "erro");

        return;

    }

    const confirmar = confirm(
        `Deseja excluir ${produto.descricao}?`
    );

    if (!confirmar) return;

    produtos = produtos.filter(
        p => p.codigo !== codigo
    );

    salvarDados();

    renderizarProdutos();

    mostrarMensagem("Produto excluído com sucesso!");

}


// 17. ADICIONAR PRODUTOS AO ESTOQUE

function adicionarEstoque(codigo) {

    const entrada = prompt(
        "Quantas unidades deseja adicionar ao estoque?"
    );

    if (entrada === null) return;

    const quantidade = Number(entrada);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {

        mostrarMensagem("Digite uma quantidade válida.", "erro");

        return;

    }

    atualizarQuantidade(codigo, quantidade);

}


// 18. EVENTO DE CADASTRO E ATUALIZAÇÃO

form.addEventListener("submit", evento => {

    evento.preventDefault();

    const descricao = descricaoInput.value;

    const quantidade = Number(quantidadeInput.value);

    const valor = Number(valorInput.value);


    // Se estiver editando um produto

    if (codigoEmEdicao !== null) {

        const erro = validarProduto(
            descricao,
            quantidade,
            valor
        );

        if (erro) {

            mostrarMensagem(erro, "erro");

            return;

        }

        const produto = buscarProduto(codigoEmEdicao);

        if (!produto) {

            mostrarMensagem("Produto não encontrado.", "erro");

            return;

        }

        produto.descricao = descricao.trim();

        produto.quantidade = quantidade;

        produto.valor = valor;

        salvarDados();

        renderizarProdutos();

        cancelarEdicao();

        mostrarMensagem("Produto atualizado com sucesso!");

    } else {

        cadastrarProduto(
            descricao,
            quantidade,
            valor
        );

    }

});


// 19. EVENTO DO BOTÃO CANCELAR

botaoCancelar.addEventListener("click", cancelarEdicao);


// 20. EVENTO DE PESQUISA

buscaInput.addEventListener("input", renderizarProdutos);


// 21. MOSTRAR DATA ATUAL

document.getElementById("dataAtual").textContent =

    new Date().toLocaleDateString("pt-BR", {

        weekday: "long",

        day: "2-digit",

        month: "long",

        year: "numeric"

    });


// 22. INICIAR SISTEMA

renderizarProdutos();

console.log("Sistema de estoque iniciado com sucesso!");
