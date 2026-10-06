let tarefas = [
    {
        codigo: 1,
        titulo: "Estudar JavaScript",
        prioridade: 1,
        concluida: false
    },
    {
        codigo: 2,
        titulo: "Fazer atividade de HTML",
        prioridade: 2,
        concluida: false
    },
    {
        codigo: 3,
        titulo: "Criar página com CSS",
        prioridade: 3,
        concluida: true
    },
    {
        codigo: 4,
        titulo: "Praticar programação",
        prioridade: 1,
        concluida: false
    }
];

let proximoCodigo = 5;


// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    const mensagem = document.getElementById("mensagem");

    // Validar título
    if (titulo.length < 5) {
        mensagem.textContent =
            "Erro: o título deve ter no mínimo 5 caracteres.";
        mensagem.style.color = "red";
        return;
    }

    // Validar prioridade
    if (prioridade < 1 || prioridade > 3) {
        mensagem.textContent =
            "Erro: a prioridade deve estar entre 1 e 3.";
        mensagem.style.color = "red";
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    proximoCodigo++;

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    document.getElementById("titulo").value = "";

    listarTarefas();
}


// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        let prioridadeTexto;

        if (tarefa.prioridade === 1) {
            prioridadeTexto = "Alta";
        } else if (tarefa.prioridade === 2) {
            prioridadeTexto = "Média";
        } else {
            prioridadeTexto = "Baixa";
        }

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>
                <strong>Código:</strong> ${tarefa.codigo}
            </p>

            <p>
                <strong>Prioridade:</strong> ${prioridadeTexto}
            </p>

            <p>
                <strong>Status:</strong>
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <div class="acoes">

                <button
                    class="btn-concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);
    });
}


// Marcar tarefa como concluída
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    listarTarefas();
}


// Alterar prioridade
function alterarPrioridade(codigo) {

    const novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    listarTarefas();
}


// Exibir as tarefas quando a página abrir
listarTarefas();