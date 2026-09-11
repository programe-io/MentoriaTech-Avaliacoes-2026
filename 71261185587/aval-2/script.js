```javascript
// ========================================
// ARRAY DE TAREFAS
// ========================================

let tarefas = [];


// ========================================
// GERADOR DE CÓDIGO
// ========================================

let proximoCodigo = 0;


// ========================================
// VALIDAR DADOS DA TAREFA
// ========================================

function validarDadosDaTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// ========================================
// CADASTRAR TAREFA
// ========================================

function cadastrarTarefa(titulo, prioridade) {

    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    listarTarefas();
}


// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa cadastrada.
            </div>
        `;

        atualizarContador();

        return;
    }

    tarefas.forEach(function(tarefa) {

        const elemento = document.createElement("div");

        elemento.classList.add("tarefa");

        if (!tarefa.status) {
            elemento.classList.add("concluida");
        }

        const nomePrioridade =
            tarefa.prioridade === 1
                ? "Alta"
                : tarefa.prioridade === 2
                    ? "Média"
                    : "Baixa";

        elemento.innerHTML = `
            <div class="info">

                <div class="titulo">
                    ${tarefa.titulo}
                </div>

                <div class="detalhes">

                    Código: ${tarefa.codigo}
                    |
                    Prioridade:

                    <span class="prioridade-${tarefa.prioridade}">
                        ${nomePrioridade}
                    </span>

                    |
                    Status:
                    ${tarefa.status ? "Em andamento" : "Concluída"}

                </div>

            </div>

            <div class="acoes">

                ${
                    tarefa.status
                        ? `
                            <button
                                class="btn-concluir"
                                onclick="concluirTarefa(${tarefa.codigo})"
                            >
                                Concluir
                            </button>
                        `
                        : ""
                }

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(elemento);
    });

    atualizarContador();
}


// ========================================
// BUSCAR TAREFA
// ========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        (tarefa) => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error(
            "Código da tarefa não encontrado."
        );
    }

    return tarefa;
}


// ========================================
// CONCLUIR TAREFA
// ========================================

function concluirTarefa(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        if (!tarefa.status) {

            throw new Error(
                "Essa tarefa já está concluída."
            );
        }

        tarefa.status = false;

        listarTarefas();

        alert("Tarefa concluída com sucesso!");

    } catch (erro) {

        alert(erro.message);
    }
}


// ========================================
// ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade(codigo) {

    try {

        const tarefa = buscarTarefa(codigo);

        const novaPrioridade = Number(
            prompt(
                "Digite a nova prioridade (1, 2 ou 3):"
            )
        );

        validarDadosDaTarefa(
            tarefa.titulo,
            novaPrioridade
        );

        tarefa.prioridade = novaPrioridade;

        listarTarefas();

        alert(
            "Prioridade alterada com sucesso!"
        );

    } catch (erro) {

        alert(erro.message);
    }
}


// ========================================
// CONTADOR
// ========================================

function atualizarContador() {

    const contador =
        document.getElementById("contador");

    const quantidade = tarefas.length;

    contador.textContent =
        quantidade === 1
            ? "1 tarefa"
            : `${quantidade} tarefas`;
}


// ========================================
// FORMULÁRIO
// ========================================

document
    .getElementById("formTarefa")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const titulo =
            document
                .getElementById("titulo")
                .value
                .trim();

        const prioridade =
            Number(
                document
                    .getElementById("prioridade")
                    .value
            );

        try {

            cadastrarTarefa(
                titulo,
                prioridade
            );

            alert(
                "Tarefa cadastrada com sucesso!"
            );

            document
                .getElementById("formTarefa")
                .reset();

        } catch (erro) {

            alert(erro.message);
        }
    });


// ========================================
// INICIALIZAÇÃO
// ========================================

listarTarefas();
```
