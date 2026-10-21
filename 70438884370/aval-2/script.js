
let tarefas = [];

function cadastrar() {
    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (!codigo || titulo.length < 5 ||
        prioridade < 1 || prioridade > 3) {
        alert("Preencha os dados corretamente!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    tarefas.push({
        codigo,
        titulo,
        prioridade,
        concluida: false
    });

    listar();
}

function listar() {
    document.getElementById("lista").innerHTML = "";

    tarefas.forEach((t, i) => {
        document.getElementById("lista").innerHTML += `
            <div class="tarefa">
                <p>Código: ${t.codigo}</p>
                <p>Título: ${t.titulo}</p>
                <p>Prioridade: ${t.prioridade}</p>
                <p class="${t.concluida ? 'concluida' : ''}">
                    Status: ${t.concluida ? 'Concluída' : 'Pendente'}
                </p>

                <button onclick="concluir(${i})">
                    Concluir
                </button>

                <button onclick="alterarPrioridade(${i})">
                    Alterar prioridade
                </button>
            </div>`;
    });
}

function concluir(i) {
    tarefas[i].concluida = true;
    listar();
}

function alterarPrioridade(i) {
    let nova = Number(prompt("Nova prioridade (1-Alta, 2-Média, 3-Baixa):"));

    if ([1, 2, 3].includes(nova)) {
        tarefas[i].prioridade = nova;
        listar();
    } else {
        alert("Prioridade inválida!");
    }
}
