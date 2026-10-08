
// Array que armazenará as tarefas
let tarefas = [];


// ==========================================
// CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa() {

    let codigo = document.getElementById("codigo").value;
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = document.getElementById("prioridade").value;

    // Validação do código
    if (codigo === "") {
        mostrarMensagem("Digite o código da tarefa.", "red");
        return;
    }

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "red"
        );
        return;
    }

    // Validação da prioridade
    if (prioridade === "" || prioridade < 1 || prioridade > 3) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "red"
        );
        return;
    }

    // Verificar se o código já existe
    let codigoExiste = tarefas.some(function(tarefa) {
        return tarefa.codigo == codigo;
    });

    if (codigoExiste) {
        mostrarMensagem(
            "Já existe uma tarefa com esse código.",
            "red"
        );
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: Number(prioridade),
        concluida: false
    };

    // Adicionar ao array
    tarefas.push(tarefa);

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "green"
    );

    // Limpar campos
    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    // Atualizar lista
    listarTarefas();
}


// ==========================================
// LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    tarefas.forEach(function(tarefa) {

        let prioridadeTexto;

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        let status = tarefa.concluida
            ? "Concluída ✅"
            : "Pendente ⏳";

        let classe = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        lista.innerHTML += `
            <div class="${classe}">

                <h3>${tarefa.titulo}</h3>

                <p>
                    <strong>Código:</strong>
                    ${tarefa.codigo}
                </p>

                <p>
                    <strong>Prioridade:</strong>
                    ${prioridadeTexto}
                </p>

                <p>
                    <strong>Status:</strong>
                    ${status}
                </p>

                <div class="acoes">

                    ${
                        !tarefa.concluida
                        ? `
                        <button
                            class="btn-concluir"
                            onclick="concluirTarefa(${tarefa.codigo})">
                            Concluir
                        </button>
                        `
                        : ""
                    }

                    <button
                        class="btn-prioridade"
                        onclick="alterarPrioridade(${tarefa.codigo})">
                        Alterar prioridade
                    </button>

                </div>

            </div>
        `;
    });
}


// ==========================================
// CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo == codigo;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem(
        "Tarefa marcada como concluída!",
        "green"
    );

    listarTarefas();
}


// ==========================================
// ALTERAR PRIORIDADE
// ==========================================

function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo == codigo;
    });

    if (!tarefa) {
        mostrarMensagem(
            "Tarefa não encontrada.",
            "red"
        );
        return;
    }

    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n\n" +
        "1 - Alta\n" +
        "2 - Média\n" +
        "3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    // Validação da prioridade
    if (
        novaPrioridade < 1 ||
        novaPrioridade > 3 ||
        !Number.isInteger(novaPrioridade)
    ) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3.",
            "red"
        );
        return;
    }

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "green"
    );

    listarTarefas();
}


// ==========================================
// MENSAGEM
// ==========================================

function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

    setTimeout(function() {
        mensagem.textContent = "";
    }, 3000);
}


// ==========================================
// INICIAR SISTEMA
// ==========================================

listarTarefas();
