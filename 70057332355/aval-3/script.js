// Array que armazena as tarefas
let tarefas = [];

// Função responsável por atualizar a tela
function render() {
    const lista = document.getElementById("lista");

    // 1. Limpar o container
    lista.innerHTML = "";

    // 2. Percorrer o Array
    tarefas.forEach(function(tarefa) {

        // 3. Criar elementos HTML
        const div = document.createElement("div");
        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent =
            "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.className = "status";
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const botao = document.createElement("button");
        botao.textContent = "Concluir";

        botao.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        const remover = document.createElement("button");
        remover.textContent = "Remover";

        remover.onclick = function() {
            removerTarefa(tarefa.codigo);
        };

        // 4. Inserir os elementos no DOM
        div.append(titulo, codigo, prioridade, status, botao, remover);
        lista.appendChild(div);
    });
}

// Cadastrar uma nova tarefa
function cadastrarTarefa() {
    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (!Number.isInteger(codigo) || codigo <= 0) {
        alert("Digite um código válido.");
        return;
    }

    if (titulo.length < 5) {
        alert("O título precisa ter pelo menos 5 caracteres.");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Esse código já está cadastrado.");
        return;
    }

    // Alterar o Array
    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    // Atualizar a tela
    render();

    document.getElementById("codigo").value = "";
    document.getElementById("titulo").value = "";
}

// Concluir uma tarefa
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        render();
    }
}

// Remover uma tarefa
function removerTarefa(codigo) {
    tarefas = tarefas.filter(t => t.codigo !== codigo);

    // Atualizar a tela
    render();
}

// Renderização inicial
render();