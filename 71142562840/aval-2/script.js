
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");

// SALVAR TAREFAS
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// CADASTRAR NOVA TAREFA
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // VALIDAÇÃO DO TÍTULO
    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    // VALIDAÇÃO DA PRIORIDADE
    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    // VALIDAR CÓDIGO
    if (codigo === "") {
        alert("Informe o código da tarefa!");
        return;
    }

    // VERIFICAR CÓDIGO REPETIDO
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
    listarTarefas();

    formulario.reset();

    alert("Tarefa cadastrada com sucesso!");
});

// LISTAR TAREFAS
function listarTarefas() {
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhuma tarefa cadastrada.
                </td>
            </tr>
        `;
    }

    tarefas.forEach((tarefa, index) => {

        let nomePrioridade = "";
        let classePrioridade = "";

        if (tarefa.prioridade === 1) {
            nomePrioridade = "Alta";
            classePrioridade = "prioridade-alta";
        } else if (tarefa.prioridade === 2) {
            nomePrioridade = "Média";
            classePrioridade = "prioridade-media";
        } else {
            nomePrioridade = "Baixa";
            classePrioridade = "prioridade-baixa";
        }

        const status = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const classeStatus = tarefa.concluida
            ? "concluida"
            : "pendente";

        const linha = document.createElement("tr");

        const dados = [
            tarefa.codigo,
            tarefa.titulo,
            nomePrioridade,
            status
        ];

        dados.forEach((dado, i) => {
            const coluna = document.createElement("td");
            coluna.textContent = dado;

            if (i === 2) coluna.className = classePrioridade;
            if (i === 3) coluna.className = classeStatus;

            linha.appendChild(coluna);
        });

        const colunaAcoes = document.createElement("td");
        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = tarefa.concluida
            ? "Desfazer"
            : "Concluir";

        botaoConcluir.className = "btn-concluir";
        botaoConcluir.onclick = () => concluirTarefa(index);

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Prioridade";
        botaoPrioridade.className = "btn-prioridade";
        botaoPrioridade.onclick = () => alterarPrioridade(index);

        acoes.append(botaoConcluir, botaoPrioridade);
        colunaAcoes.appendChild(acoes);
        linha.appendChild(colunaAcoes);

        lista.appendChild(linha);
    });

    atualizarResumo();
}

// MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(index) {
    tarefas[index].concluida = !tarefas[index].concluida;

    salvarTarefas();
    listarTarefas();
}

// ALTERAR PRIORIDADE
function alterarPrioridade(index) {
    const novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
        tarefas[index].prioridade
    );

    if (novaPrioridade === null || novaPrioridade.trim() === "") {
        return;
    }

    const prioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade inválida! Digite 1, 2 ou 3.");
        return;
    }

    tarefas[index].prioridade = prioridade;

    salvarTarefas();
    listarTarefas();

    alert("Prioridade alterada com sucesso!");
}

// ATUALIZAR RESUMO
function atualizarResumo() {
    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("totalTarefas").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
}

// INICIAR SISTEMA
listarTarefas();
