// Lista de tarefas já cadastradas
let tarefas = [
    {
        codigo: 1,
        titulo: "Fazer atividade de JavaScript",
        prioridade: 1,
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Estudar HTML e CSS",
        prioridade: 2,
        concluida: true
    },
    {
        codigo: 3,
        titulo: "Organizar projeto final",
        prioridade: 3,
        concluida: false
    }
];

// Próximo código disponível
let proximoCodigo = 4;


// CADASTRAR UMA NOVA TAREFA
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);
    const mensagem = document.getElementById("mensagem");

    // Validação do título
    if (titulo.length < 5) {
        mensagem.textContent = "O título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent = "A prioridade deve estar entre 1 e 3.";
        mensagem.style.color = "red";
        return;
    }

    // Criação da tarefa
    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    // Limpa o campo
    document.getElementById("titulo").value = "";

    listarTarefas();
}


// LISTAR AS TAREFAS
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        let textoPrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            textoPrioridade = "1 - Alta";
            classePrioridade = "prioridade-alta";
        } else if (tarefa.prioridade === 2) {
            textoPrioridade = "2 - Média";
            classePrioridade = "prioridade-media";
        } else {
            textoPrioridade = "3 - Baixa";
            classePrioridade = "prioridade-baixa";
        }

        const status = tarefa.concluida
            ? '<span class="concluida-texto">Concluída</span>'
            : "Pendente";

        const classeConcluida = tarefa.concluida
            ? "concluida"
            : "";

        lista.innerHTML += `
            <div class="tarefa ${classeConcluida}">
                <h3>${tarefa.titulo}</h3>

                <p><strong>Código:</strong> ${tarefa.codigo}</p>

                <p>
                    <strong>Prioridade:</strong>
                    <span class="${classePrioridade}">
                        ${textoPrioridade}
                    </span>
                </p>

                <p>
                    <strong>Status:</strong> ${status}
                </p>

                <div class="acoes">

                    ${
                        !tarefa.concluida
                        ? `<button 
                            class="btn-concluir"
                            onclick="marcarComoConcluida(${tarefa.codigo})">
                            Marcar como concluída
                           </button>`
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


// MARCAR TAREFA COMO CONCLUÍDA
function marcarComoConcluida(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}


// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(function(tarefa) {
        return tarefa.codigo === codigo;
    });

    if (!tarefa) {
        return;
    }

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
        )
    );

    // Validação da prioridade
    if (
        Number.isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3
    ) {
        alert("A prioridade deve ser um valor entre 1 e 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibe as tarefas cadastradas ao abrir a página
listarTarefas();
