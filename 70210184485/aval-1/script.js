
// SISTEMA DE CONTROLE DE ESTOQUE

(function () {
    "use strict";

    function iniciarSistema() {

        const formulario = document.getElementById("formProduto");

        // Aguarda o HTML existir
        if (!formulario) {
            console.error("Formulário não encontrado.");
            return;
        }

        // Evita cadastrar o mesmo evento duas vezes
        if (formulario.dataset.iniciado === "sim") {
            return;
        }

        formulario.dataset.iniciado = "sim";

        const descricaoInput = document.getElementById("descricao");
        const quantidadeInput = document.getElementById("quantidade");
        const valorInput = document.getElementById("valor");
        const pesquisaInput = document.getElementById("pesquisa");
        const lista = document.getElementById("listaProdutos");
        const mensagemVazia = document.getElementById("mensagemVazia");
        const titulo = document.getElementById("tituloFormulario");
        const cancelar = document.getElementById("btnCancelar");

        const chave = "mentoria_theck_estoque";

        let produtos = [];
        let proximoCodigo = 1;
        let codigoEditando = null;

        // CARREGAR PRODUTOS

        try {
            const dados = JSON.parse(localStorage.getItem(chave));

            if (Array.isArray(dados)) {
                produtos = dados;
            }

            const maiorCodigo = produtos.reduce(function (maior, produto) {
                return Math.max(maior, Number(produto.codigo) || 0);
            }, 0);

            proximoCodigo = maiorCodigo + 1;

            const codigoSalvo = Number(
                localStorage.getItem(chave + "_codigo")
            );

            if (codigoSalvo > proximoCodigo) {
                proximoCodigo = codigoSalvo;
            }

        } catch (erro) {
            console.warn("Não foi possível carregar o estoque.", erro);
        }

        // SALVAR DADOS

        function salvar() {
            try {
                localStorage.setItem(chave, JSON.stringify(produtos));

                localStorage.setItem(
                    chave + "_codigo",
                    String(proximoCodigo)
                );

                return true;

            } catch (erro) {
                console.error(erro);
                alert("Não foi possível salvar no navegador.");
                return false;
            }
        }

        // FORMATAR VALORES

        function moeda(valor) {
            return Number(valor).toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL"
            });
        }

        // VALIDAR PRODUTO

        function validarProduto(nome, quantidade, valor) {

            if (nome.trim() === "") {
                alert("Digite o nome do produto.");
                return false;
            }

            if (!Number.isInteger(quantidade) || quantidade < 0) {
                alert("Digite uma quantidade inteira válida.");
                return false;
            }

            if (!Number.isFinite(valor) || valor < 0) {
                alert("Digite um preço válido.");
                return false;
            }

            return true;
        }

        // LIMPAR FORMULÁRIO

        function limparFormulario() {
            formulario.reset();
            codigoEditando = null;
            titulo.textContent = "Cadastrar produto";
            cancelar.hidden = true;

            formulario.querySelector(".btn-salvar").textContent =
                "Salvar produto";
        }

        // CADASTRAR E ATUALIZAR

        formulario.addEventListener("submit", function (evento) {

            evento.preventDefault();

            const nome = descricaoInput.value.trim();
            const quantidade = Number(quantidadeInput.value);
            const valor = Number(valorInput.value);

            if (
                quantidadeInput.value === "" ||
                valorInput.value === ""
            ) {
                alert("Preencha todos os campos.");
                return;
            }

            if (!validarProduto(nome, quantidade, valor)) {
                return;
            }

            if (codigoEditando === null) {

                const produto = {
                    codigo: proximoCodigo,
                    descricao: nome,
                    quantidade: quantidade,
                    valor: valor
                };

                produtos.push(produto);
                proximoCodigo++;

                salvar();

                alert("Produto cadastrado com sucesso!");

            } else {

                const produto = produtos.find(function (item) {
                    return item.codigo === codigoEditando;
                });

                if (produto) {
                    produto.descricao = nome;
                    produto.quantidade = quantidade;
                    produto.valor = valor;

                    salvar();

                    alert("Produto atualizado com sucesso!");
                }
            }

            limparFormulario();
            atualizarTela();
        });

        // EDITAR PRODUTO

        function editarProduto(codigo) {

            const produto = produtos.find(function (item) {
                return item.codigo === codigo;
            });

            if (!produto) {
                alert("Produto não encontrado.");
                return;
            }

            descricaoInput.value = produto.descricao;
            quantidadeInput.value = produto.quantidade;
            valorInput.value = produto.valor;

            codigoEditando = codigo;

            titulo.textContent = "Editar produto";
            cancelar.hidden = false;

            formulario.querySelector(".btn-salvar").textContent =
                "Salvar alterações";

            formulario.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }

        // EXCLUIR PRODUTO

        function excluirProduto(codigo) {

            const produto = produtos.find(function (item) {
                return item.codigo === codigo;
            });

            if (!produto) {
                return;
            }

            const resposta = confirm(
                "Deseja excluir o produto " + produto.descricao + "?"
            );

            if (!resposta) {
                return;
            }

            produtos = produtos.filter(function (item) {
                return item.codigo !== codigo;
            });

            salvar();

            if (codigoEditando === codigo) {
                limparFormulario();
            }

            atualizarTela();
        }

        // VERIFICAR SITUAÇÃO

        function situacaoProduto(quantidade) {

            if (quantidade === 0) {
                return {
                    texto: "Esgotado",
                    classe: "status-esgotado"
                };
            }

            if (quantidade <= 5) {
                return {
                    texto: "Estoque baixo",
                    classe: "status-baixo"
                };
            }

            return {
                texto: "Disponível",
                classe: "status-normal"
            };
        }

        // CRIAR CÉLULA DA TABELA

        function criarCelula(texto) {

            const td = document.createElement("td");
            td.textContent = texto;

            return td;
        }

        // LISTAR PRODUTOS

        function listarProdutos() {

            lista.innerHTML = "";

            const pesquisa = pesquisaInput.value
                .trim()
                .toLowerCase();

            const filtrados = produtos.filter(function (produto) {

                const nome = produto.descricao.toLowerCase();
                const codigo = String(produto.codigo);

                return (
                    nome.includes(pesquisa) ||
                    codigo.includes(pesquisa)
                );
            });

            mensagemVazia.hidden = filtrados.length > 0;

            mensagemVazia.textContent = pesquisa
                ? "Nenhum produto encontrado."
                : "Nenhum produto cadastrado.";

            filtrados.forEach(function (produto) {

                const linha = document.createElement("tr");

                linha.appendChild(criarCelula(produto.codigo));
                linha.appendChild(criarCelula(produto.descricao));
                linha.appendChild(criarCelula(produto.quantidade));
                linha.appendChild(criarCelula(moeda(produto.valor)));

                const total = produto.quantidade * produto.valor;

                linha.appendChild(criarCelula(moeda(total)));

                // SITUAÇÃO

                const tdSituacao = document.createElement("td");
                const status = document.createElement("span");

                const situacao = situacaoProduto(produto.quantidade);

                status.className = "status " + situacao.classe;
                status.textContent = situacao.texto;

                tdSituacao.appendChild(status);
                linha.appendChild(tdSituacao);

                // BOTÕES

                const tdAcoes = document.createElement("td");
                const divAcoes = document.createElement("div");

                divAcoes.className = "acoes";

                const botaoEditar = document.createElement("button");
                botaoEditar.type = "button";
                botaoEditar.className = "btn-editar";
                botaoEditar.textContent = "Editar";

                botaoEditar.addEventListener("click", function () {
                    editarProduto(produto.codigo);
                });

                const botaoExcluir = document.createElement("button");
                botaoExcluir.type = "button";
                botaoExcluir.className = "btn-excluir";
                botaoExcluir.textContent = "Excluir";

                botaoExcluir.addEventListener("click", function () {
                    excluirProduto(produto.codigo);
                });

                divAcoes.appendChild(botaoEditar);
                divAcoes.appendChild(botaoExcluir);

                tdAcoes.appendChild(divAcoes);
                linha.appendChild(tdAcoes);

                lista.appendChild(linha);
            });
        }

        // ATUALIZAR INFORMAÇÕES

        function atualizarDashboard() {

            let unidades = 0;
            let valorTotal = 0;
            let estoqueBaixo = 0;

            for (const produto of produtos) {

                unidades += produto.quantidade;

                valorTotal += produto.quantidade * produto.valor;

                if (produto.quantidade <= 5) {
                    estoqueBaixo++;
                }
            }

            document.getElementById("totalProdutos").textContent =
                produtos.length;

            document.getElementById("totalUnidades").textContent =
                unidades;

            document.getElementById("valorEstoque").textContent =
                moeda(valorTotal);

            document.getElementById("estoqueBaixo").textContent =
                estoqueBaixo;
        }

        // ATUALIZAR SISTEMA

        function atualizarTela() {
            listarProdutos();
            atualizarDashboard();
        }

        // PESQUISAR

        pesquisaInput.addEventListener("input", function () {
            listarProdutos();
        });

        // CANCELAR EDIÇÃO

        cancelar.addEventListener("click", function () {
            limparFormulario();
        });

        // INICIAR

        atualizarTela();

        console.log("Controle de Estoque iniciado com sucesso!");
    }

    // COMPATIBILIDADE COM EDITORES ONLINE

    if (document.readyState === "loading") {

        document.addEventListener("DOMContentLoaded", iniciarSistema);

    } else {

        iniciarSistema();
    }

})();
