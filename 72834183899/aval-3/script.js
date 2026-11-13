
let tarefas = [];
let proximoCodigo = 1;

// FUNÇÃO RENDER: atualiza a tela
function render() {

    const lista = document.getElementById("listaTarefas");

    // 1. Limpar o container
    lista.innerHTML = "";

    // Verificar se existem tarefas
    if (tarefas.length === 0) {
        lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
        return;
    }

    // 2. Percorrer o Array
    tarefas.forEach(tarefa => {

        // 3. Gerar o HTML
        const item = document.createElement("div");

        item.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const prioridades = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        item.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p>Prioridade:
                ${prioridades[tarefa.prioridade]}
            </p>

            <p>Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluirTarefa(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="alterarPrioridade(${tarefa.codigo})">
                Alterar prioridade
            </button>

            <button class="excluir"
                onclick="excluirTarefa(${tarefa.codigo})">
                Excluir
            </button>
        `;

        // 4. Inserir no DOM
        lista.appendChild(item);
    });
}

// CADASTRAR TAREFA
function cadastrarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    const mensagem = document.getElementById("mensagem");

    // Validar título
    if (titulo.length < 5) {
        mensagem.style.color = "red";
        mensagem.textContent =
            "O título precisa ter pelo menos 5 caracteres!";
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mensagem.style.color = "red";
        mensagem.textContent = "Prioridade inválida!";
        return;
    }

    // Inserir objeto no Array
    tarefas.push({
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    mensagem.style.color = "green";
    mensagem.textContent = "Tarefa cadastrada com sucesso!";

    document.getElementById("titulo").value = "";

    // Atualizar a tela
    render();
}

// CONCLUIR TAREFA
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    tarefa.concluida = true;

    // Atualizar a tela
    render();
}

// ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    const novaPrioridade = Number(
        prompt("Digite a prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    // Atualizar a tela
    render();
}

// EXCLUIR TAREFA
function excluirTarefa(codigo) {

    tarefas = tarefas.filter(t => t.codigo !== codigo);

    // Atualizar a tela
    render();
}

// Renderização inicial
render();
