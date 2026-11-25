let tarefas = [];
let codigo = 1;

function cadastrar() {
    let titulo = document.getElementById("titulo").value;
    let prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.trim().length < 5) {
        alert("Título deve ter no mínimo 5 caracteres!");
        return;
    }

    tarefas.push({
        codigo: codigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    listar();
}

function listar() {
    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach((t, i) => {
        lista.innerHTML += `
            <li>
                ${t.codigo} - ${t.titulo}
                Prioridade: ${t.prioridade}
                Status: ${t.concluida ? "Concluída" : "Pendente"}
                <button onclick="concluir(${i})">Concluir</button>
                <button onclick="alterar(${i})">Alterar prioridade</button>
            </li>
        `;
    });
}

function concluir(i) {
    tarefas[i].concluida = true;
    listar();
}

function alterar(i) {
    let nova = Number(prompt("Nova prioridade (1 a 3):"));

    if (nova >= 1 && nova <= 3) {
        tarefas[i].prioridade = nova;
        listar();
    } else {
        alert("Prioridade inválida!");
    }
}