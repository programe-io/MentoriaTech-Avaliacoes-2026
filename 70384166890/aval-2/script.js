let tarefas = [];
let numero = 1;

function criarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    if (titulo.trim().length < 5) {
        alert("A tarefa precisa ter pelo menos 5 caracteres.");
        return;
    }

    const novaTarefa = {
        codigo: numero,
        titulo: titulo,
        prioridade: prioridade,
        status: "Pendente"
    };

    tarefas.push(novaTarefa);

    numero++;

    document.getElementById("titulo").value = "";

    atualizarTela();
}

function atualizarTela() {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        const card = document.createElement("div");

        card.className = "card";

        if (tarefa.status === "Concluída") {
            card.classList.add("finalizada");
        }

        card.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p><strong>Código:</strong> ${tarefa.codigo}</p>

            <p><strong>Prioridade:</strong> ${tarefa.prioridade}</p>

            <p><strong>Status:</strong> ${tarefa.status}</p>

            <div class="botoes">

                <button onclick="finalizar(${tarefa.codigo})">
                    Concluir
                </button>

                <button onclick="trocarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        resultado.appendChild(card);
    });
}

function finalizar(codigo) {

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.status = "Concluída";
        atualizarTela();
    }
}

function trocarPrioridade(codigo) {

    const novaPrioridade = Number(
        prompt("Digite a nova prioridade: 1, 2 ou 3")
    );

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        alert("A prioridade deve ser 1, 2 ou 3.");
        return;
    }

    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        atualizarTela();
    }
}