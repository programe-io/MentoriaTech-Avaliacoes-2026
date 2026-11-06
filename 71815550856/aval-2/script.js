
let tarefas = [];
let geradorCodigo = 1;

// Validar os dados da tarefa
function validarDadosTarefas(titulo, prioridade) {

    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3."
        );
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefaBuscada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefas(titulo, prioridade);

    let tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já está concluída!");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error("Prioridade inválida.");
    }

    tarefa.prioridade = novaPrioridade;
}

// Excluir tarefa
function excluirTarefa(codigo) {

    buscarTarefa(codigo);

    tarefas = tarefas.filter(
        t => t.codigo !== codigo
    );
}

// Mostrar mensagem
function mostrarMensagem(texto, erro = false) {

    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;

    mensagem.style.color = erro ? "#dc3545" : "#28a745";
}

// Renderizar tarefas na tela
function renderizarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML =
            '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const prioridades = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p>
                <strong>Prioridade:</strong>
                ${prioridades[tarefa.prioridade]}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.status ? "Pendente" : "Concluída"}
            </p>

            <button
                class="btn-concluir"
                data-acao="concluir"
                ${tarefa.status ? "" : "disabled"}
            >
                Concluir
            </button>

            <button
                class="btn-prioridade"
                data-acao="prioridade"
            >
                Alterar prioridade
            </button>

            <button
                class="btn-excluir"
                data-acao="excluir"
            >
                Excluir
            </button>
        `;

        // Associar os botões ao código da tarefa
        div.querySelectorAll("button").forEach(botao => {
            botao.addEventListener("click", () => {

                const codigo = tarefa.codigo;

                try {

                    if (botao.dataset.acao === "concluir") {

                        concluirTarefa(codigo);
                        mostrarMensagem(
                            "Tarefa concluída com sucesso!"
                        );

                    } else if (botao.dataset.acao === "prioridade") {

                        const novaPrioridade = Number(
                            prompt(
                                "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
                            )
                        );

                        if (novaPrioridade === 0) {
                            return;
                        }

                        alterarPrioridade(
                            codigo,
                            novaPrioridade
                        );

                        mostrarMensagem(
                            "Prioridade alterada com sucesso!"
                        );

                    } else if (botao.dataset.acao === "excluir") {

                        excluirTarefa(codigo);

                        mostrarMensagem(
                            "Tarefa excluída com sucesso!"
                        );
                    }

                    renderizarTarefas();

                } catch (erro) {

                    mostrarMensagem(erro.message, true);

                }

            });
        });

        lista.appendChild(div);

    });
}

// Evento de cadastro
document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo = document.getElementById("titulo").value;

        const prioridade = Number(
            document.getElementById("prioridade").value
        );

        try {

            cadastrarTarefa(titulo, prioridade);

            mostrarMensagem(
                "Tarefa cadastrada com sucesso!"
            );

            this.reset();

            renderizarTarefas();

        } catch (erro) {

            mostrarMensagem(erro.message, true);

        }

    });

// Inicializar sistema
renderizarTarefas();
