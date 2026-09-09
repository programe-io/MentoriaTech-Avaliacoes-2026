// Lista onde vamos guardar as tarefas
let tarefas = [];


// ===============================
// ADICIONAR TAREFA
// ===============================

function adicionarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;
    const mensagem = document.getElementById("mensagem");

    // Validação do título
    if (titulo.trim().length < 5) {
        mensagem.textContent =
            "O título deve ter no mínimo 5 caracteres.";

        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent =
            "A prioridade deve estar entre 1 e 3.";

        return;
    }

    // Criando a tarefa
    const tarefa = {
        id: Date.now(),
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    // Adiciona na lista
    tarefas.push(tarefa);

    // Limpa mensagem
    mensagem.textContent = "";

    // Limpa campo
    document.getElementById("titulo").value = "";

    // Atualiza a tela
    listarTarefas();
}


// ===============================
// LISTAR TAREFAS
// ===============================

function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    // Limpa a lista
    lista.innerHTML = "";

    // Percorre todas as tarefas
    tarefas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.className = "tarefa";

        // Se estiver concluída
        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            
            <div class="tarefa-info">

                <h3>${tarefa.titulo}</h3>

                <p>
                    Prioridade: ${tarefa.prioridade}
                </p>

            </div>

            <div class="acoes">

                <button
                    class="concluir"
                    onclick="concluirTarefa(${tarefa.id})">
                    ${tarefa.concluida ? "Desfazer" : "Concluir"}
                </button>

                <button
                    class="prioridade"
                    onclick="alterarPrioridade(${tarefa.id})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// ===============================
// CONCLUIR TAREFA
// ===============================

function concluirTarefa(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {

        tarefa.concluida = !tarefa.concluida;

        listarTarefas();
    }
}


// ===============================
// ALTERAR PRIORIDADE
// ===============================

function alterarPrioridade(id) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.id === id;
    });

    if (tarefa) {

        let novaPrioridade = prompt(
            "Digite a nova prioridade (1, 2 ou 3):"
        );

        if (
            novaPrioridade >= 1 &&
            novaPrioridade <= 3
        ) {

            tarefa.prioridade = novaPrioridade;

            listarTarefas();

        } else {

            alert(
                "A prioridade deve ser um valor entre 1 e 3."
            );
        }
    }
}
