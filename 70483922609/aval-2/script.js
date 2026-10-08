let tarefas = [];
let codigo = 1;

function adicionar() {

    let titulo = document.getElementById("nomeTarefa").value;
    let prioridade = Number(document.getElementById("nivel").value);

    if (titulo.length < 5) {
        alert("Digite pelo menos 5 caracteres.");
        return;
    }

    tarefas.push({
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    });

    codigo++;

    document.getElementById("nomeTarefa").value = "";

    mostrar();
}

function mostrar() {

    let area = document.getElementById("tarefas");

    area.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        let item = document.createElement("div");

        item.className = "tarefa";

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML = `
            <b>${tarefa.titulo}</b>

            <p>Código: ${tarefa.codigo}</p>

            <p>Prioridade: ${tarefa.prioridade}</p>

            <p>
                Status:
                ${tarefa.concluida ? "Concluída" : "Pendente"}
            </p>

            <button onclick="concluir(${tarefa.codigo})">
                Concluir
            </button>

            <button onclick="mudarPrioridade(${tarefa.codigo})">
                Mudar prioridade
            </button>
        `;

        area.appendChild(item);
    });
}

function concluir(codigoTarefa) {

    let tarefa = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (tarefa) {
        tarefa.concluida = true;
        mostrar();
    }
}

function mudarPrioridade(codigoTarefa) {

    let nova = Number(
        prompt("Digite a prioridade: 1, 2 ou 3")
    );

    if (nova < 1 || nova > 3) {
        alert("Digite somente 1, 2 ou 3.");
        return;
    }

    let tarefa = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (tarefa) {
        tarefa.prioridade = nova;
        mostrar();
    }
}