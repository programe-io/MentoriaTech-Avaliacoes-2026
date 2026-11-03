
document.addEventListener("DOMContentLoaded", () => {

    // ELEMENTOS DO HTML
    const formulario = document.querySelector("form");
    const tabela = document.querySelector("tbody");
    const pesquisa = document.querySelector(".barra-pesquisa input");

    const botoesSalvar = document.querySelector(".btn-salvar");
    const botoesLimpar = document.querySelector(".btn-limpar");

    // DADOS DO ESTOQUE
    let produtos = JSON.parse(localStorage.getItem("produtos")) || [];
    let indiceEdicao = null;

    // SALVAR DADOS NO NAVEGADOR
    function salvarDados() {
        localStorage.setItem("produtos", JSON.stringify(produtos));
    }

    // FORMATAR NÚMEROS
    function numero(valor) {
        return Number(valor) || 0;
    }

    // ATUALIZAR INDICADORES
    function atualizarIndicadores() {

        const totalProdutos = produtos.length;

        const totalEstoque = produtos.reduce(
            (total, produto) => total + numero(produto.quantidade),
            0
        );

        const estoqueBaixo = produtos.filter(
            produto => numero(produto.quantidade) <= 5
        ).length;

        const indicadores = document.querySelectorAll(".card-indicador h3");

        if (indicadores.length >= 3) {
            indicadores[0].textContent = totalProdutos;
            indicadores[1].textContent = totalEstoque;
            indicadores[2].textContent = estoqueBaixo;
        }
    }

    // CADASTRAR PRODUTO
    function cadastrarProduto(event) {

        event.preventDefault();

        const campos = formulario.querySelectorAll("input");

        const nome = campos[0].value.trim();
        const codigo = campos[1].value.trim();
        const categoria = campos[2].value.trim();
        const quantidade = numero(campos[3].value);
        const preco = numero(campos[4].value);
        const fornecedor = campos[5].value.trim();

        if (!nome || !codigo || !categoria) {
            alert("Preencha os campos obrigatórios!");
            return;
        }

        if (quantidade < 0 || preco < 0) {
            alert("Quantidade e preço não podem ser negativos!");
            return;
        }

        const codigoDuplicado = produtos.some((produto, index) =>
            produto.codigo === codigo && index !== indiceEdicao
        );

        if (codigoDuplicado) {
            alert("Já existe um produto com esse código!");
            return;
        }

        const produto = {
            nome,
            codigo,
            categoria,
            quantidade,
            preco,
            fornecedor
        };

        if (indiceEdicao !== null) {
            produtos[indiceEdicao] = produto;
            indiceEdicao = null;
            alert("Produto atualizado com sucesso!");
        } else {
            produtos.push(produto);
            alert("Produto cadastrado com sucesso!");
        }

        salvarDados();
        renderizarTabela();
        atualizarIndicadores();
        formulario.reset();
    }

    // MOSTRAR PRODUTOS NA TABELA
    function renderizarTabela(lista = produtos) {

        tabela.innerHTML = "";

        if (lista.length === 0) {
            tabela.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center">
                        Nenhum produto encontrado.
                    </td>
                </tr>
            `;
            return;
        }

        lista.forEach(produto => {

            const indice = produtos.indexOf(produto);

            const status = numero(produto.quantidade) <= 5
                ? '<span class="status-baixo">Estoque baixo</span>'
                : '<span class="status-ok">Disponível</span>';

            const linha = document.createElement("tr");

            const valores = [
                produto.nome,
                produto.codigo,
                produto.categoria,
                produto.quantidade,
                `R$ ${numero(produto.preco).toFixed(2)}`,
                produto.fornecedor || "-",
                status
            ];

            valores.forEach((valor, index) => {
                const celula = document.createElement("td");

                if (index === 6) {
                    celula.innerHTML = valor;
                } else {
                    celula.textContent = valor;
                }

                linha.appendChild(celula);
            });

            const acoes = document.createElement("td");

            acoes.innerHTML = `
                <button class="btn-editar" data-acao="editar">
                    Editar
                </button>

                <button class="btn-excluir" data-acao="excluir">
                    Excluir
                </button>

                <button class="btn-entrada" data-acao="entrada">
                    Entrada
                </button>

                <button class="btn-saida" data-acao="saida">
                    Saída
                </button>
            `;

            acoes.querySelectorAll("button").forEach(botao => {
                botao.dataset.indice = indice;
            });

            linha.appendChild(acoes);
            tabela.appendChild(linha);
        });
    }

    // EDITAR PRODUTO
    function editarProduto(indice) {

        const produto = produtos[indice];

        const campos = formulario.querySelectorAll("input");

        campos[0].value = produto.nome;
        campos[1].value = produto.codigo;
        campos[2].value = produto.categoria;
        campos[3].value = produto.quantidade;
        campos[4].value = produto.preco;
        campos[5].value = produto.fornecedor;

        indiceEdicao = indice;

        formulario.scrollIntoView({
            behavior: "smooth"
        });
    }

    // EXCLUIR PRODUTO
    function excluirProduto(indice) {

        if (confirm("Deseja realmente excluir este produto?")) {

            produtos.splice(indice, 1);

            salvarDados();
            renderizarTabela();
            atualizarIndicadores();

            alert("Produto excluído com sucesso!");
        }
    }

    // REGISTRAR ENTRADA
    function registrarEntrada(indice) {

        const quantidade = Number(
            prompt("Quantas unidades deseja adicionar?")
        );

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            alert("Digite uma quantidade inteira válida!");
            return;
        }

        produtos[indice].quantidade += quantidade;

        salvarDados();
        renderizarTabela();
        atualizarIndicadores();

        alert("Entrada registrada com sucesso!");
    }

    // REGISTRAR SAÍDA
    function registrarSaida(indice) {

        const quantidade = Number(
            prompt("Quantas unidades deseja retirar?")
        );

        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            alert("Digite uma quantidade inteira válida!");
            return;
        }

        if (quantidade > produtos[indice].quantidade) {
            alert("Estoque insuficiente!");
            return;
        }

        produtos[indice].quantidade -= quantidade;

        salvarDados();
        renderizarTabela();
        atualizarIndicadores();

        alert("Saída registrada com sucesso!");
    }

    // AÇÕES DA TABELA
    tabela.addEventListener("click", event => {

        const botao = event.target.closest("button");

        if (!botao) return;

        const indice = Number(botao.dataset.indice);
        const acao = botao.dataset.acao;

        switch (acao) {

            case "editar":
                editarProduto(indice);
                break;

            case "excluir":
                excluirProduto(indice);
                break;

            case "entrada":
                registrarEntrada(indice);
                break;

            case "saida":
                registrarSaida(indice);
                break;
        }
    });

    // PESQUISAR PRODUTOS
    if (pesquisa) {

        pesquisa.addEventListener("input", () => {

            const termo = pesquisa.value.toLowerCase();

            const resultado = produtos.filter(produto =>
                produto.nome.toLowerCase().includes(termo) ||
                produto.codigo.toLowerCase().includes(termo) ||
                produto.categoria.toLowerCase().includes(termo)
            );

            renderizarTabela(resultado);
        });
    }

    // LIMPAR FORMULÁRIO
    if (botoesLimpar) {

        botoesLimpar.addEventListener("click", () => {

            formulario.reset();
            indiceEdicao = null;

        });
    }

    // EVENTO DE CADASTRO
    if (formulario) {
        formulario.addEventListener("submit", cadastrarProduto);
    }

    // INICIALIZAR SISTEMA
    renderizarTabela();
    atualizarIndicadores();

});
