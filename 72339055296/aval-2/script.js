let tarefas = [];
let proximoCodigo = 1;

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const tituloInput = document.getElementById("titulo");
    const prioridadeInput = document.getElementById("prioridade");
    const mensagem = document.getElementById("mensagem");

    const titulo = tituloInput.value.trim();
    const prioridade = Number(prioridadeInput.value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3 || !prioridadeInput.value) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );
        return;
    }

    // Criação da tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    tituloInput.value = "";
    prioridadeInput.value = "";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "sucesso");

    listarTarefas();
}

// Listar as tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    if (tarefas.length === 0) {
        lista.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
        return;
    }

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const nomePrioridade = obterNomePrioridade(tarefa.prioridade);

        div.innerHTML = `
            <div class="titulo">
                #${tarefa.codigo} - ${tarefa.titulo}
            </div>

            <div class="info">
                Prioridade: ${nomePrioridade}
                <br>
                Status: ${tarefa.concluida ? "Concluída" : "Pendente"}
            </div>

            <div class="acoes">
                <button 
                    class="concluir"
                    onclick="marcarConcluida(${tarefa.codigo})"
                    ${tarefa.concluida ? "disabled" : ""}
                >
                    ${tarefa.concluida ? "Concluída" : "Marcar como concluída"}
                </button>

                <button 
                    class="prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})"
                >
                    Alterar prioridade
                </button>
            </div>
        `;

        lista.appendChild(div);
    });
}

// Marcar tarefa como concluída
function marcarConcluida(codigo) {
    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;

        mostrarMensagem(
            "Tarefa marcada como concluída!",
            "sucesso"
        );

        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    if (tarefa.prioridade === 1) {
        tarefa.prioridade = 2;
    } else if (tarefa.prioridade === 2) {
        tarefa.prioridade = 3;
    } else {
        tarefa.prioridade = 1;
    }

    mostrarMensagem(
        "Prioridade alterada com sucesso!",
        "sucesso"
    );

    listarTarefas();
}

// Retorna o nome da prioridade
function obterNomePrioridade(prioridade) {
    if (prioridade === 1) {
        return "1 - Alta";
    }

    if (prioridade === 2) {
        return "2 - Média";
    }

    return "3 - Baixa";
}

// Mostrar mensagens na própria página
function mostrarMensagem(texto, tipo) {
    const mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.className = tipo;

    setTimeout(function() {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}