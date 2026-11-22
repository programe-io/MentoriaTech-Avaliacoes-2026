
(function () {
    "use strict";

    const CHAVE = "gerenciador_tarefas_mentoria";

    let tarefas = [];
    let proximoCodigo = 1;
    let filtroAtual = "todas";

    function carregarDados() {
        try {
            const dados = JSON.parse(localStorage.getItem(CHAVE));

            if (dados && Array.isArray(dados.tarefas)) {
                tarefas = dados.tarefas;
                proximoCodigo = Number(dados.proximoCodigo) || 1;
            }

            const maiorCodigo = tarefas.reduce(function (maior, tarefa) {
                return Math.max(maior, tarefa.codigo);
            }, 0);

            if (proximoCodigo <= maiorCodigo) {
                proximoCodigo = maiorCodigo + 1;
            }
        } catch (erro) {
            console.warn("Armazenamento indisponível:", erro);
        }
    }

    function salvarDados() {
        try {
            localStorage.setItem(CHAVE, JSON.stringify({
                tarefas: tarefas,
                proximoCodigo: proximoCodigo
            }));
        } catch (erro) {
            console.warn("Não foi possível salvar:", erro);
        }
    }

    function validarDadosDaTarefa(titulo, prioridade) {
        if (typeof titulo !== "string" || titulo.trim().length < 5) {
            throw new Error("O título deve ter no mínimo 5 caracteres.");
        }

        if (!Number.isInteger(prioridade) || prioridade < 1 || prioridade > 3) {
            throw new Error("A prioridade deve estar entre 1 e 3.");
        }
    }

    function cadastrarTarefa(titulo, prioridade) {
        validarDadosDaTarefa(titulo, prioridade);

        const tarefa = {
            codigo: proximoCodigo++,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: true
        };

        tarefas.push(tarefa);
        salvarDados();

        return tarefa;
    }

    function listarTarefas() {
        return tarefas;
    }

    function buscarTarefa(codigo) {
        const tarefa = tarefas.find(function (item) {
            return item.codigo === codigo;
        });

        if (!tarefa) {
            throw new Error("Tarefa não encontrada.");
        }

        return tarefa;
    }

    function concluirTarefa(codigo) {
        const tarefa = buscarTarefa(codigo);

        if (tarefa.status === false) {
            throw new Error("Esta tarefa já foi concluída.");
        }

        tarefa.status = false;
        salvarDados();

        return tarefa;
    }

    function alterarPrioridade(codigo, novaPrioridade) {
        const tarefa = buscarTarefa(codigo);

        validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;
        salvarDados();

        return tarefa;
    }

    function iniciarSistema() {
        const formulario = document.getElementById("formTarefa");

        if (!formulario) {
            return false;
        }

        if (formulario.dataset.iniciado === "sim") {
            return true;
        }

        formulario.dataset.iniciado = "sim";

        const campoTitulo = document.getElementById("titulo");
        const campoPrioridade = document.getElementById("prioridade");
        const pesquisa = document.getElementById("pesquisa");
        const lista = document.getElementById("listaTarefas");
        const mensagem = document.getElementById("mensagem");
        const mensagemVazia = document.getElementById("mensagemVazia");

        carregarDados();

        function mostrarMensagem(texto, tipo) {
            mensagem.textContent = texto;
            mensagem.className = tipo;
        }

        function atualizarDashboard() {
            const total = tarefas.length;

            const pendentes = tarefas.filter(function (tarefa) {
                return tarefa.status === true;
            }).length;

            const concluidas = tarefas.filter(function (tarefa) {
                return tarefa.status === false;
            }).length;

            const alta = tarefas.filter(function (tarefa) {
                return tarefa.status === true && tarefa.prioridade === 1;
            }).length;

            document.getElementById("totalTarefas").textContent = total;
            document.getElementById("pendentes").textContent = pendentes;
            document.getElementById("concluidas").textContent = concluidas;
            document.getElementById("altaPrioridade").textContent = alta;
        }

        function criarCelula(texto) {
            const td = document.createElement("td");
            td.textContent = texto;
            return td;
        }

        function criarEtiqueta(texto, classe) {
            const span = document.createElement("span");
            span.className = classe;
            span.textContent = texto;
            return span;
        }

        function renderizarTarefas() {
            lista.innerHTML = "";

            const termo = pesquisa.value.trim().toLowerCase();

            const filtradas = listarTarefas().filter(function (tarefa) {
                const correspondePesquisa =
                    tarefa.titulo.toLowerCase().includes(termo) ||
                    String(tarefa.codigo).includes(termo);

                const correspondeFiltro =
                    filtroAtual === "todas" ||
                    (filtroAtual === "pendentes" && tarefa.status) ||
                    (filtroAtual === "concluidas" && !tarefa.status);

                return correspondePesquisa && correspondeFiltro;
            });

            mensagemVazia.hidden = filtradas.length > 0;
            mensagemVazia.textContent = tarefas.length === 0
                ? "Nenhuma tarefa cadastrada."
                : "Nenhuma tarefa encontrada.";

            filtradas.forEach(function (tarefa) {
                const tr = document.createElement("tr");

                tr.appendChild(criarCelula(tarefa.codigo));
                tr.appendChild(criarCelula(tarefa.titulo));

                const tdPrioridade = document.createElement("td");

                const nomes = {
                    1: "Alta",
                    2: "Média",
                    3: "Baixa"
                };

                const classes = {
                    1: "prioridade-alta",
                    2: "prioridade-media",
                    3: "prioridade-baixa"
                };

                tdPrioridade.appendChild(
                    criarEtiqueta(
                        nomes[tarefa.prioridade],
                        "prioridade " + classes[tarefa.prioridade]
                    )
                );

                tr.appendChild(tdPrioridade);

                const tdStatus = document.createElement("td");

                tdStatus.appendChild(
                    criarEtiqueta(
                        tarefa.status ? "Em andamento" : "Concluída",
                        tarefa.status
                            ? "status status-pendente"
                            : "status status-concluida"
                    )
                );

                tr.appendChild(tdStatus);

                const tdAcoes = document.createElement("td");
                const divAcoes = document.createElement("div");
                divAcoes.className = "acoes";

                const botaoConcluir = document.createElement("button");
                botaoConcluir.type = "button";
                botaoConcluir.className = "btn-concluir";
                botaoConcluir.textContent = tarefa.status
                    ? "Concluir"
                    : "Concluída";

                botaoConcluir.disabled = !tarefa.status;

                botaoConcluir.addEventListener("click", function () {
                    try {
                        concluirTarefa(tarefa.codigo);
                        mostrarMensagem("Tarefa concluída com sucesso!", "sucesso");
                        atualizarTela();
                    } catch (erro) {
                        mostrarMensagem(erro.message, "erro");
                    }
                });

                const botaoPrioridade = document.createElement("button");
                botaoPrioridade.type = "button";
                botaoPrioridade.className = "btn-prioridade";
                botaoPrioridade.textContent = "Prioridade";

                botaoPrioridade.addEventListener("click", function () {
                    const resposta = prompt(
                        "Informe a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
                        String(tarefa.prioridade)
                    );

                    if (resposta === null) {
                        return;
                    }

                    if (!["1", "2", "3"].includes(resposta.trim())) {
                        mostrarMensagem("Escolha uma prioridade entre 1 e 3.", "erro");
                        return;
                    }

                    try {
                        alterarPrioridade(
                            tarefa.codigo,
                            Number(resposta.trim())
                        );

                        mostrarMensagem("Prioridade alterada com sucesso!", "sucesso");
                        atualizarTela();
                    } catch (erro) {
                        mostrarMensagem(erro.message, "erro");
                    }
                });

                divAcoes.appendChild(botaoConcluir);
                divAcoes.appendChild(botaoPrioridade);
                tdAcoes.appendChild(divAcoes);

                tr.appendChild(tdAcoes);
                lista.appendChild(tr);
            });
        }

        function atualizarTela() {
            atualizarDashboard();
            renderizarTarefas();
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            try {
                const titulo = campoTitulo.value.trim();
                const prioridade = Number(campoPrioridade.value);

                cadastrarTarefa(titulo, prioridade);

                formulario.reset();
                mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");
                atualizarTela();

            } catch (erro) {
                mostrarMensagem(erro.message, "erro");
            }
        });

        pesquisa.addEventListener("input", renderizarTarefas);

        document.querySelectorAll(".filtro").forEach(function (botao) {
            botao.addEventListener("click", function () {
                filtroAtual = botao.dataset.filtro;

                document.querySelectorAll(".filtro").forEach(function (item) {
                    item.classList.remove("ativo");
                });

                botao.classList.add("ativo");
                renderizarTarefas();
            });
        });

        atualizarTela();
        console.log("Gerenciador de Tarefas iniciado!");
        return true;
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciarSistema);
    } else {
        iniciarSistema();
    }

})();
