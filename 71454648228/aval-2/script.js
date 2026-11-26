 
document.getElementById("btadd").onclick = cadastrar;

const nome = document.getElementById("nomet");
const prioridade = document.getElementById("prioridade");
const lista = document.getElementById("listatarefas");

let tarefas = [];

// Cadastrar uma nova tarefa
function cadastrar() {
    if (nome.value.trim() === "") {
        alert("Digite o nome da tarefa!");
        return;
    }

    let novatarefa = {
        codigo: tarefas.length + 1,
        descricao: nome.value,
        prioridade: prioridade.value,
        concluida: false
    };

    tarefas.push(novatarefa);

    limparcampos();
    listar();
}

// Limpar os campos
function limparcampos() {
    nome.value = "";
    prioridade.value = "Média";
    nome.focus();
}

// Listar as tarefas cadastradas
function listar() {
    lista.innerHTML = tarefas.map(item => `
        <li class="item-tarefa ${item.concluida ? 'concluida' : ''}">
            <strong>Código:</strong> ${item.codigo}

            <p class="nome-tarefa">
                <strong>Tarefa:</strong> ${escaparHTML(item.descricao)}
            </p>

            <p>
                <strong>Status:</strong>
                ${item.concluida ? 'Concluída' : 'Pendente'}
            </p>

            <label>Prioridade:</label>

            <select class="prioridade-select"
                data-codigo="${item.codigo}">
                <option value="Baixa"
                    ${item.prioridade === "Baixa" ? "selected" : ""}>
                    Baixa
                </option>

                <option value="Média"
                    ${item.prioridade === "Média" ? "selected" : ""}>
                    Média
                </option>

                <option value="Alta"
                    ${item.prioridade === "Alta" ? "selected" : ""}>
                    Alta
                </option>
            </select>

            <button class="btn-concluir"
                data-codigo="${item.codigo}">
                ${item.concluida ? "Desmarcar conclusão" : "Concluir tarefa"}
            </button>
        </li>
    `).join('');
}

// Marcar ou desmarcar uma tarefa como concluída
lista.onclick = function(event) {
    if (event.target.classList.contains("btn-concluir")) {
        let codigo = Number(event.target.dataset.codigo);

        let tarefa = tarefas.find(item => item.codigo === codigo);

        if (tarefa) {
            tarefa.concluida = !tarefa.concluida;
            listar();
        }
    }
};

// Alterar a prioridade da tarefa
lista.onchange = function(event) {
    if (event.target.classList.contains("prioridade-select")) {
        let codigo = Number(event.target.dataset.codigo);

        let tarefa = tarefas.find(item => item.codigo === codigo);

        if (tarefa) {
            tarefa.prioridade = event.target.value;
            listar();
        }
    }
};

// Evita que textos digitados sejam interpretados como HTML
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, function(caractere) {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caractere];
    });
}
