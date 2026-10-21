
let tarefas = [];

document.getElementById("form").onsubmit = function(e) {
    e.preventDefault();

    let codigo = document.getElementById("codigo").value.trim();
    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter pelo menos 5 caracteres!");
        return;
    }

    if (tarefas.some(t => t.codigo === codigo)) {
        alert("Código já cadastrado!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("Prioridade deve ser de 1 a 3!");
        return;
    }

    tarefas.push({
        codigo, titulo, prioridade, concluida: false
    });

    this.reset();
    listar();
};

function listar() {
    document.getElementById("lista").innerHTML = tarefas.map((t, i) => `
        <tr>
            <td>${t.codigo}</td>
            <td>${t.titulo}</td>
            <td>${t.prioridade} - ${
                ["", "Alta", "Média", "Baixa"][t.prioridade]
            }</td>
            <td class="${t.concluida ? 'concluida' : ''}">
                ${t.concluida ? "Concluída" : "Pendente"}
            </td>
            <td>
                <button onclick="concluir(${i})">Concluir</button>
                <button onclick="alterar(${i})">Prioridade</button>
            </td>
        </tr>
    `).join("");
}

function concluir(i) {
    tarefas[i].concluida = true;
    listar();
}

function alterar(i) {
    let p = Number(prompt("Nova prioridade (1-Alta, 2-Média, 3-Baixa):"));

    if ([1, 2, 3].includes(p)) {
        tarefas[i].prioridade = p;
        listar();
    } else {
        alert("Prioridade inválida!");
    }
}
