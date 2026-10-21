
let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (
        !Number.isInteger(prioridade) ||
        prioridade < 1 ||
        prioridade > 3
    ) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3."
        );
    }
}

function buscarTarefa(codigoTarefa) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado.");
    }

    return tarefaBuscada;
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosTarefa(titulo, prioridade);

    const tarefa = {
        codigo: ++geradorCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    renderizarTarefas();
}

function listarTarefas() {
    return tarefas;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;
    renderizarTarefas();
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
    renderizarTarefas();
}

// Elementos HTML
const form = document.getElementById("formTarefa");
const tituloInput = document.getElementById("titulo");
const prioridadeInput = document.getElementById("prioridade");
const lista = document.getElementById("listaTarefas");
const filtro = document.getElementById("filtro");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, erro = false) {
    mensagem.textContent = texto;
    mensagem.classList.toggle("erro", erro);
    mensagem.style.display = "block";

    setTimeout(() => {
        mensagem.style.display = "none";
    }, 3000);
}

function executarComSeguranca(acao) {
    try {
        acao();
        return true;
    } catch (erro) {
        mostrarMensagem(erro.message, true);
        return false;
    }
}

function renderizarTarefas() {
    const tarefasFiltradas = listarTarefas().filter(tarefa => {
        if (filtro.value === "pendentes") {
            return tarefa.status === true;
        }

        if (filtro.value === "concluidas") {
            return tarefa.status === false;
        }

        return true;
    });

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa encontrada.
            </p>
        `;
    } else {
        lista.innerHTML = tarefasFiltradas.map(tarefa => {
            const prioridadeTexto = {
                1: "Baixa",
                2: "Média",
                3: "Alta"
            }[tarefa.prioridade];

            const statusTexto = tarefa.status
                ? "Pendente"
                : "Concluída";

            return `
                <article class="tarefa ${
                    tarefa.status ? "" : "concluida"
                }">
                    <div class="info-tarefa ${
                        tarefa.status ? "" : "concluida"
                    }">
                        <h3>${escaparHTML(tarefa.titulo)}</h3>

                        <div class="detalhes">
                            <span>Código: ${tarefa.codigo}</span>

                            <span class="etiqueta prioridade-${
                                tarefa.prioridade
                            }">
                                Prioridade ${tarefa.prioridade} - ${
                                    prioridadeTexto
                                }
                            </span>

                            <span class="etiqueta ${
                                tarefa.status
                                    ? "status-pendente"
                                    : "status-concluida"
                            }">
                                ${statusTexto}
                            </span>
                        </div>
                    </div>

                    <div class="acoes">
                        <button
                            class="btn-prioridade"
                            data-acao="prioridade"
                            data-codigo="${tarefa.codigo}">
                            Alterar prioridade
                        </button>

                        ${
                            tarefa.status
                                ? `
                                    <button
                                        class="btn-concluir"
                                        data-acao="concluir"
                                        data-codigo="${tarefa.codigo}">
                                        Concluir
                                    </button>
                                `
                                : `
                                    <button
                                        class="btn-concluir btn-desativado"
                                        disabled>
                                        Concluída
                                    </button>
                                `
                        }
                    </div>
                </article>
            `;
        }).join("");
    }

    document.getElementById("totalTarefas").textContent =
        tarefas.length;

    document.getElementById("tarefasPendentes").textContent =
        tarefas.filter(t => t.status).length;

    document.getElementById("tarefasConcluidas").textContent =
        tarefas.filter(t => !t.status).length;
}

function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Cadastro de tarefas
form.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const titulo = tituloInput.value;
    const prioridade = Number(prioridadeInput.value);

    const sucesso = executarComSeguranca(() => {
        cadastrarTarefa(titulo, prioridade);
    });

    if (sucesso) {
        form.reset();
        prioridadeInput.value = "1";
        tituloInput.focus();
        mostrarMensagem("Tarefa cadastrada com sucesso!");
    }
});

// Botões de concluir e alterar prioridade
lista.addEventListener("click", function(evento) {
    const botao = evento.target.closest("button[data-acao]");

    if (!botao) return;

    const codigo = Number(botao.dataset.codigo);
    const acao = botao.dataset.acao;

    if (acao === "concluir") {
        const sucesso = executarComSeguranca(() => {
            concluirTarefa(codigo);
        });

        if (sucesso) {
            mostrarMensagem("Tarefa concluída!");
        }
    }

    if (acao === "prioridade") {
        const tarefa = buscarTarefa(codigo);

        const resposta = prompt(
            "Digite a nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta",
            String(tarefa.prioridade)
        );

        if (resposta === null || resposta.trim() === "") {
            return;
        }

        const novaPrioridade = Number(resposta);

        const sucesso = executarComSeguranca(() => {
            alterarPrioridade(codigo, novaPrioridade);
        });

        if (sucesso) {
            mostrarMensagem("Prioridade alterada!");
        }
    }
});

// Filtro
filtro.addEventListener("change", renderizarTarefas);

// Exemplo do código original
cadastrarTarefa("Cadastrar Clientes", 1);
alterarPrioridade(1, 2);

renderizarTarefas();
