// Array que vai armazenar as tarefas
let tarefas = [];


// ========================================
// CADASTRAR TAREFA
// ========================================

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;

    let titulo = document.getElementById("titulo").value;

    let prioridade = Number(
        document.getElementById("prioridade").value
    );


    // Verificar campos
    if (
        codigo === "" ||
        titulo === "" ||
        prioridade === 0
    ) {

        alert("Preencha todos os campos!");

        return;
    }


    // REGRA:
    // O título deve ter no mínimo 5 caracteres

    if (titulo.length < 5) {

        alert(
            "O título deve ter no mínimo 5 caracteres!"
        );

        return;
    }


    // REGRA:
    // A prioridade deve ser entre 1 e 3

    if (
        prioridade < 1 ||
        prioridade > 3
    ) {

        alert(
            "A prioridade deve ser entre 1 e 3!"
        );

        return;
    }


    // Verificar se o código já existe

    let tarefaExistente = tarefas.find(
        function(tarefa) {

            return tarefa.codigo === codigo;

        }
    );


    if (tarefaExistente) {

        alert(
            "Já existe uma tarefa com esse código!"
        );

        return;
    }


    // Criar objeto tarefa

    let tarefa = {

        codigo: codigo,

        titulo: titulo,

        prioridade: prioridade,

        concluida: false

    };


    // Adicionar ao array

    tarefas.push(tarefa);


    alert(
        "Tarefa cadastrada com sucesso!"
    );


    // Limpar campos

    document.getElementById("codigo").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("prioridade").value = "";


    // Atualizar lista

    listarTarefas();
}



// ========================================
// LISTAR TAREFAS
// ========================================

function listarTarefas() {

    let lista =
        document.getElementById("listaTarefas");


    // Limpa a lista

    lista.innerHTML = "";


    // Se não tiver tarefas

    if (tarefas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa cadastrada.
            </p>
        `;

        return;
    }


    // Percorrer as tarefas

    tarefas.forEach(
        function(tarefa) {

            let div =
                document.createElement("div");


            div.classList.add("tarefa");


            // Se estiver concluída

            if (tarefa.concluida) {

                div.classList.add("concluida");

            }


            // Nome da prioridade

            let nomePrioridade = "";


            let classePrioridade = "";


            if (tarefa.prioridade === 1) {

                nomePrioridade = "Alta";

                classePrioridade =
                    "prioridade-alta";

            }

            else if (tarefa.prioridade === 2) {

                nomePrioridade = "Média";

                classePrioridade =
                    "prioridade-media";

            }

            else {

                nomePrioridade = "Baixa";

                classePrioridade =
                    "prioridade-baixa";

            }


            // Status

            let status =
                tarefa.concluida
                    ? "Concluída"
                    : "Pendente";


            // Montar HTML

            div.innerHTML = `

                <h3>
                    ${tarefa.titulo}
                </h3>

                <p>
                    <strong>Código:</strong>
                    ${tarefa.codigo}
                </p>

                <p class="${classePrioridade}">
                    <strong>Prioridade:</strong>
                    ${nomePrioridade}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${status}
                </p>

                ${
                    !tarefa.concluida
                    ?
                    `
                    <button
                        class="btn-concluir"
                        onclick="concluirTarefa('${tarefa.codigo}')"
                    >
                        Marcar como concluída
                    </button>
                    `
                    :
                    ""
                }

            `;


            lista.appendChild(div);

        }
    );
}



// ========================================
// MARCAR TAREFA COMO CONCLUÍDA
// ========================================

function concluirTarefa(codigo) {

    let tarefa = tarefas.find(
        function(tarefa) {

            return tarefa.codigo === codigo;

        }
    );


    // Verificar se encontrou

    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    // Alterar status

    tarefa.concluida = true;


    alert(
        "Tarefa marcada como concluída!"
    );


    // Atualizar lista

    listarTarefas();
}



// ========================================
// ALTERAR PRIORIDADE
// ========================================

function alterarPrioridade() {

    let codigo =
        document.getElementById(
            "codigoAlterar"
        ).value;


    let novaPrioridade =
        Number(
            document.getElementById(
                "novaPrioridade"
            ).value
        );


    // Verificar código

    if (codigo === "") {

        alert(
            "Digite o código da tarefa!"
        );

        return;
    }


    // Verificar prioridade

    if (
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {

        alert(
            "Escolha uma prioridade entre 1 e 3!"
        );

        return;
    }


    // Procurar tarefa

    let tarefa = tarefas.find(
        function(tarefa) {

            return tarefa.codigo === codigo;

        }
    );


    // Se não encontrar

    if (!tarefa) {

        alert(
            "Tarefa não encontrada!"
        );

        return;
    }


    // Alterar prioridade

    tarefa.prioridade =
        novaPrioridade;


    alert(
        "Prioridade alterada com sucesso!"
    );


    // Limpar campos

    document.getElementById(
        "codigoAlterar"
    ).value = "";


    document.getElementById(
        "novaPrioridade"
    ).value = "";


    // Atualizar lista

    listarTarefas();
}