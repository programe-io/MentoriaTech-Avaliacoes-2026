
let tarefas = [];
let proximoId = 1;

// Cadastrar tarefa
function cadastrarTarefa() {
    const nome = document.getElementById("nomeTarefa").value;
    const prioridade = document.getElementById("prioridade").value;

    if (nome.trim() === "") {
        alert("Digite o nome da tarefa!");
        return;
    }

    const tarefa = {
        id: proximoId++,
        nome: nome,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    document.getElementById("nomeTarefa").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const nome = document.createElement("span");
        nome.textContent = tarefa.nome +
            " | Prioridade: " + tarefa.prioridade;

        item.appendChild(nome);

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        // Botão concluir
        const concluir = document.createElement("button");
        concluir.textContent = tarefa.concluida
            ? "Concluída"
            : "Concluir";

        concluir.disabled = tarefa.concluida;

        concluir.onclick = function() {
            concluirTarefa(tarefa.id);
        };

        // Botão alterar prioridade
        const alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";

        alterar.onclick = function() {
            alterarPrioridade(tarefa.id);
        };

        // Botão excluir
        const excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");

        excluir.onclick = function() {
            excluirTarefa(tarefa.id);
        };

        acoes.appendChild(concluir);
        acoes.appendChild(alterar);
        acoes.appendChild(excluir);

        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

// Concluir tarefa
function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        let novaPrioridade = prompt(
            "Digite a nova prioridade: Alta, Média ou Baixa"
        );

        if (novaPrioridade === null) return;

        novaPrioridade = novaPrioridade.trim().toLowerCase();

        const prioridades = {
            "alta": "Alta",
            "média": "Média",
            "media": "Média",
            "baixa": "Baixa"
        };

        if (prioridades[novaPrioridade]) {
            tarefa.prioridade = prioridades[novaPrioridade];
            listarTarefas();
        } else {
            alert("Prioridade inválida!");
        }
    }
}

// Excluir tarefa
function excluirTarefa(id) {
    tarefas = tarefas.filter(t => t.id !== id);
    listarTarefas();
}
