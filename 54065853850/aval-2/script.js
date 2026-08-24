document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // ELEMENTOS DO HTML
    // ==========================================

    const abas = document.querySelectorAll(".aba");
    const paineis = document.querySelectorAll(".painel");

    const formTarefa = document.getElementById("formTarefa");
    const tituloInput = document.getElementById("titulo");

    const chipsPrioridade = document.getElementById("chipsPrioridade");
    const chips = document.querySelectorAll(".chip");

    const listaTarefas = document.getElementById("listaTarefas");
    const vazio = document.getElementById("vazio");

    const contador = document.getElementById("contador");
    const aviso = document.getElementById("aviso");


    // ==========================================
    // DADOS
    // ==========================================

    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    let proximoCodigo =
        Number(localStorage.getItem("proximoCodigo")) || 1;

    let prioridadeSelecionada = null;


    // ==========================================
    // CONFIGURAÇÃO DAS PRIORIDADES
    // ==========================================

    const prioridades = {
        1: {
            nome: "Alta",
            classe: "prioridade-alta"
        },

        2: {
            nome: "Média",
            classe: "prioridade-media"
        },

        3: {
            nome: "Baixa",
            classe: "prioridade-baixa"
        }
    };


    // ==========================================
    // SALVAR NO LOCALSTORAGE
    // ==========================================

    function salvarDados() {

        localStorage.setItem(
            "tarefas",
            JSON.stringify(tarefas)
        );

        localStorage.setItem(
            "proximoCodigo",
            proximoCodigo
        );
    }


    // ==========================================
    // VALIDAR TÍTULO
    // ==========================================

    function validarTitulo(titulo) {

        return (
            typeof titulo === "string" &&
            titulo.trim().length >= 5
        );
    }


    // ==========================================
    // VALIDAR PRIORIDADE
    // ==========================================

    function validarPrioridade(prioridade) {

        return (
            Number.isInteger(prioridade) &&
            prioridade >= 1 &&
            prioridade <= 3
        );
    }


    // ==========================================
    // MOSTRAR AVISO
    // ==========================================

    function mostrarAviso(mensagem, erro = false) {

        aviso.textContent = mensagem;

        aviso.classList.toggle("erro", erro);

        setTimeout(() => {

            aviso.textContent = "";
            aviso.classList.remove("erro");

        }, 3500);
    }


    // ==========================================
    // SELECIONAR PRIORIDADE
    // ==========================================

    chips.forEach((chip) => {

        chip.addEventListener("click", () => {

            chips.forEach((item) => {
                item.classList.remove("selecionado");
            });

            chip.classList.add("selecionado");

            prioridadeSelecionada =
                Number(chip.dataset.valor);

        });

    });


    // ==========================================
    // CADASTRAR TAREFA
    // ==========================================

    formTarefa.addEventListener("submit", (evento) => {

        evento.preventDefault();

        const titulo = tituloInput.value.trim();


        // Validação do título

        if (!validarTitulo(titulo)) {

            mostrarAviso(
                "Erro: o título deve ter pelo menos 5 caracteres.",
                true
            );

            tituloInput.focus();

            return;
        }


        // Validação da prioridade

        if (!validarPrioridade(prioridadeSelecionada)) {

            mostrarAviso(
                "Erro: selecione uma prioridade.",
                true
            );

            return;
        }


        // Criar tarefa

        const tarefa = {

            codigo: proximoCodigo,

            titulo: titulo,

            prioridade: prioridadeSelecionada,

            concluida: false

        };


        // Adicionar ao array

        tarefas.push(tarefa);

        proximoCodigo++;


        // Salvar

        salvarDados();


        // Atualizar interface

        renderizarTarefas();

        atualizarContador();


        // Limpar formulário

        formTarefa.reset();

        prioridadeSelecionada = null;

        chips.forEach((chip) => {
            chip.classList.remove("selecionado");
        });


        // Mensagem

        mostrarAviso(
            `Tarefa "${titulo}" cadastrada com sucesso!`
        );


        // Ir para a lista

        setTimeout(() => {

            trocarAba("lista");

        }, 500);

    });


    // ==========================================
    // TROCAR ABAS
    // ==========================================

    abas.forEach((aba) => {

        aba.addEventListener("click", () => {

            const nomeAba = aba.dataset.aba;

            trocarAba(nomeAba);

        });

    });


    function trocarAba(nomeAba) {

        abas.forEach((aba) => {

            aba.classList.toggle(
                "ativa",
                aba.dataset.aba === nomeAba
            );

        });


        paineis.forEach((painel) => {

            painel.classList.toggle(
                "ativa",
                painel.id === `painel-${nomeAba}`
            );

        });


        if (nomeAba === "lista") {

            renderizarTarefas();

        }

    }


    // ==========================================
    // RENDERIZAR TAREFAS
    // ==========================================

    function renderizarTarefas() {

        listaTarefas.innerHTML = "";


        if (tarefas.length === 0) {

            vazio.style.display = "block";

            return;

        }


        vazio.style.display = "none";


        tarefas.forEach((tarefa) => {

            const item = criarElementoTarefa(tarefa);

            listaTarefas.appendChild(item);

        });

    }


    // ==========================================
    // CRIAR ELEMENTO DA TAREFA
    // ==========================================

    function criarElementoTarefa(tarefa) {

        const li = document.createElement("li");

        const prioridade =
            prioridades[tarefa.prioridade];


        li.innerHTML = `

            <div class="tarefa-info">

                <div class="titulo-tarefa">
                    ${escaparHTML(tarefa.titulo)}
                </div>

                <div class="codigo-tarefa">
                    CÓDIGO #${tarefa.codigo}
                </div>

            </div>


            <div class="tarefa-detalhes">

                <span class="prioridade ${prioridade.classe}">
                    ${prioridade.nome}
                </span>

                <span class="status ${
                    tarefa.concluida
                        ? "status-concluida"
                        : "status-pendente"
                }">

                    ${
                        tarefa.concluida
                            ? "Concluída"
                            : "Pendente"
                    }

                </span>

            </div>


            <div class="tarefa-acoes">

                ${
                    !tarefa.concluida
                        ? `
                            <button
                                class="acao concluir"
                                data-codigo="${tarefa.codigo}"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                }


                <button
                    class="acao alterar"
                    data-codigo="${tarefa.codigo}"
                >
                    Prioridade
                </button>


                <button
                    class="acao remover"
                    data-codigo="${tarefa.codigo}"
                >
                    Remover
                </button>

            </div>

        `;


        // Botão concluir

        const botaoConcluir =
            li.querySelector(".concluir");

        if (botaoConcluir) {

            botaoConcluir.addEventListener(
                "click",
                () => {

                    marcarComoConcluida(
                        tarefa.codigo
                    );

                }
            );

        }


        // Botão alterar prioridade

        const botaoAlterar =
            li.querySelector(".alterar");

        botaoAlterar.addEventListener(
            "click",
            () => {

                alterarPrioridade(
                    tarefa.codigo
                );

            }
        );


        // Botão remover

        const botaoRemover =
            li.querySelector(".remover");

        botaoRemover.addEventListener(
            "click",
            () => {

                removerTarefa(
                    tarefa.codigo
                );

            }
        );


        return li;

    }


    // ==========================================
    // MARCAR COMO CONCLUÍDA
    // ==========================================

    function marcarComoConcluida(codigo) {

        const tarefa =
            tarefas.find(
                (item) => item.codigo === codigo
            );


        if (!tarefa) {

            mostrarAviso(
                "Tarefa não encontrada.",
                true
            );

            return;

        }


        tarefa.concluida = true;


        salvarDados();

        renderizarTarefas();

        mostrarAviso(
            `Tarefa "${tarefa.titulo}" concluída!`
        );

    }


    // ==========================================
    // ALTERAR PRIORIDADE
    // ==========================================

    function alterarPrioridade(codigo) {

        const tarefa =
            tarefas.find(
                (item) => item.codigo === codigo
            );


        if (!tarefa) {

            mostrarAviso(
                "Tarefa não encontrada.",
                true
            );

            return;

        }


        let novaPrioridade;


        if (tarefa.prioridade === 1) {

            novaPrioridade = 2;

        } else if (tarefa.prioridade === 2) {

            novaPrioridade = 3;

        } else {

            novaPrioridade = 1;

        }


        tarefa.prioridade = novaPrioridade;


        salvarDados();

        renderizarTarefas();


        mostrarAviso(
            `Prioridade alterada para ${prioridades[novaPrioridade].nome}.`
        );

    }


    // ==========================================
    // REMOVER TAREFA
    // ==========================================

    function removerTarefa(codigo) {

        const tarefa =
            tarefas.find(
                (item) => item.codigo === codigo
            );


        if (!tarefa) {

            mostrarAviso(
                "Tarefa não encontrada.",
                true
            );

            return;

        }


        const confirmar = confirm(
            `Deseja remover a tarefa "${tarefa.titulo}"?`
        );


        if (!confirmar) {
            return;
        }


        tarefas =
            tarefas.filter(
                (item) => item.codigo !== codigo
            );


        salvarDados();

        renderizarTarefas();

        atualizarContador();


        mostrarAviso(
            "Tarefa removida com sucesso."
        );

    }


    // ==========================================
    // CONTADOR
    // ==========================================

    function atualizarContador() {

        contador.textContent = tarefas.length;

    }


    // ==========================================
    // EVITAR HTML INJETADO
    // ==========================================

    function escaparHTML(texto) {

        const div =
            document.createElement("div");

        div.textContent = texto;

        return div.innerHTML;

    }


    // ==========================================
    // INICIALIZAÇÃO
    // ==========================================

    renderizarTarefas();

    atualizarContador();

});