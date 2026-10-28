
let tarefas = [];
let geradorCodigo = 0;

// Valida os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve ter no mínimo cinco caracteres."
        );
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "Informe uma prioridade entre 1 e 3."
        );
    }
}

// Busca uma tarefa pelo código
function buscarTarefa(codigo) {
    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefaBuscada) {
        throw new Error("Código de tarefa não encontrado.");
    }

    return tarefaBuscada;
}

// Cadastra uma tarefa
function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        validarDadosTarefa(titulo, prioridade);

        const novaTarefa = {
            codigo: ++geradorCodigo,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: true
        };

        tarefas.push(novaTarefa);

        document.getElementById("titulo").value = "";
        document.getElementById("mensagem").textContent = "";

        listarTarefas();
    } catch (erro) {
        document.getElementById("mensagem").textContent =
            erro.message;
    }
}

// Lista as tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        const nomes = {
            1: "Baixa",
            2: "Média",
            3: "Alta"
        };

        prioridade.textContent =
            "Prioridade: " + nomes[tarefa.prioridade];

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Status: Pendente"
            : "Status: Concluída";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.textContent = "Concluir";
        btnConcluir.className = "concluir";
        btnConcluir.disabled = !tarefa.status;
        btnConcluir.onclick = () => concluirTarefa(tarefa.codigo);

        const btnAlterar = document.createElement("button");
        btnAlterar.textContent = "Alterar prioridade";
        btnAlterar.className = "alterar";
        btnAlterar.onclick = () => alterarPrioridade(tarefa.codigo);

        acoes.append(btnConcluir, btnAlterar);
        div.append(titulo, codigo, prioridade, status, acoes);
        lista.appendChild(div);
    });
}

// Conclui uma tarefa
function concluirTarefa(codigo) {
    try {
        const tarefa = buscarTarefa(codigo);

        if (tarefa.status === false) {
            throw new Error("A tarefa já está concluída.");
        }

        tarefa.status = false;
        document.getElementById("mensagem").textContent = "";

        listarTarefas();
    } catch (erro) {
        document.getElementById("mensagem").textContent =
            erro.message;
    }
}

// Altera a prioridade
function alterarPrioridade(codigo) {
    try {
        const tarefa = buscarTarefa(codigo);

        const resposta = prompt(
            "Digite 1 para Baixa, 2 para Média ou 3 para Alta:"
        );

        if (resposta === null) return;

        const novaPrioridade = Number(resposta);

        validarDadosTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;

        document.getElementById("mensagem").textContent = "";

        listarTarefas();
    } catch (erro) {
        document.getElementById("mensagem").textContent =
            erro.message;
    }
}

// Configura o botão e mostra a lista inicial
document.getElementById("btnCadastrar").addEventListener(
    "click",
    cadastrarTarefa
);

listarTarefas();
