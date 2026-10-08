// Array que vai guardar o conjunto de todas as tarefas
let tarefas = [];

let geradorCodigo = 0;


// Validar dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error(
            "O título deve ter no mínimo 5 caracteres"
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3"
        );
    }
}


// Buscar uma tarefa pelo código
function buscarTarefa(codigo) {

    const tarefaBuscada = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefaBuscada) {
        throw new Error(
            "Tarefa não encontrada"
        );
    }

    return tarefaBuscada;
}


// Cadastrar tarefa
function cadastrarTarefa() {

    const titulo =
        document.getElementById("titulo").value.trim();

    const prioridade =
        Number(
            document.getElementById("prioridade").value
        );

    try {

        validarDadosTarefa(
            titulo,
            prioridade
        );

        let tarefa = {

            codigo: ++geradorCodigo,

            titulo: titulo,

            prioridade: prioridade,

            status: true
        };

        tarefas.push(tarefa);

        listarTarefas();

        document.getElementById("titulo").value = "";

    } catch (erro) {

        alert(erro.message);

    }
}


// Listar tarefas
function listarTarefas() {

    const lista =
        document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const elemento =
            document.createElement("div");

        elemento.className = "tarefa";

        elemento.innerHTML = `

            <div>

                <h3>
                    ${tarefa.titulo}
                </h3>

                <p>
                    Código:
                    <strong>
                        ${tarefa.codigo}
                    </strong>
                </p>

                <p class="prioridade prioridade-${tarefa.prioridade}">
                    Prioridade:
                    ${tarefa.prioridade}
                </p>

                <p class="status">
                    Status:
                    ${tarefa.status ? "Ativa" : "Inativa"}
                </p>

            </div>

            <button
                class="btn-alterar"
                onclick="alterarPrioridade(${tarefa.codigo})"
            >
                Alterar prioridade
            </button>

        `;

        lista.appendChild(elemento);

    });
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const novaPrioridade =
        Number(
            prompt(
                "Digite a nova prioridade (1, 2 ou 3):"
            )
        );

    try {

        const tarefa =
            buscarTarefa(codigo);

        validarDadosTarefa(
            tarefa.titulo,
            novaPrioridade
        );

        tarefa.prioridade =
            novaPrioridade;

        listarTarefas();

    } catch (erro) {

        alert(erro.message);

    }
}