
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function cadastrarTarefa(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (!codigo || !titulo || prioridade < 1 || prioridade > 3) {
        alert("Preencha os campos corretamente!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Este código já está cadastrado!");
        return;
    }

    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvarTarefas();
    mostrarTarefas();

    formulario.reset();

    alert("Tarefa cadastrada com sucesso!");
}

function mostrarTarefas(filtro = "") {
    lista.innerHTML = "";

    const filtradas = tarefas.filter(t =>
        t.codigo.toLowerCase().includes(filtro.toLowerCase()) ||
        t.titulo.toLowerCase().includes(filtro.toLowerCase())
    );

    filtradas.forEach(tarefa => {

        const linha = document.createElement("tr");

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const prioridadeTexto = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        const dados = [
            tarefa.codigo,
            tarefa.titulo,
            prioridadeTexto[tarefa.prioridade],
            status
        ];

        dados.forEach((dado, indice) => {
            const coluna = document.createElement("td");
            coluna.textContent = dado;

            if (indice === 3) {
                coluna.className = tarefa.concluida
                    ? "status-concluida"
                    : "status-pendente";
            }

            linha.appendChild(coluna);
        });

        const acoes = document.createElement("td");

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        botaoConcluir.className = "concluir";
        botaoConcluir.onclick = () =>
            concluirTarefa(tarefa.codigo);

        const botaoEditar = document.createElement("button");
        botaoEditar.textContent = "Prioridade";
        botaoEditar.className = "editar";
        botaoEditar.onclick = () =>
            alterarPrioridade(tarefa.codigo);

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoEditar);

        linha.appendChild(acoes);
        lista.appendChild(linha);
    });

    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.concluida).length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.concluida).length;
}

function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
    mostrarTarefas(
        document.getElementById("pesquisa").value
    );
}

function alterarPrioridade(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        tarefa.prioridade
    );

    if (novaPrioridade === null) return;

    const prioridade = Number(novaPrioridade);

    if (
        !["1", "2", "3"].includes(novaPrioridade.trim())
    ) {
        alert("Escolha uma prioridade entre 1 e 3!");
        return;
    }

    tarefa.prioridade = prioridade;

    salvarTarefas();
    mostrarTarefas(
        document.getElementById("pesquisa").value
    );

    alert("Prioridade alterada com sucesso!");
}

document.getElementById("pesquisa").addEventListener(
    "input",
    function() {
        mostrarTarefas(this.value);
    }
);

formulario.addEventListener("submit", cadastrarTarefa);

mostrarTarefas();
