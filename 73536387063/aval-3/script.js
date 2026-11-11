
// Lista de tarefas
let tarefas = [];

let codigo = 1;


// Cadastrar tarefa
document.getElementById("formulario")
.addEventListener("submit", function(event) {

    event.preventDefault();

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        alert("O título precisa ter no mínimo 5 caracteres!");
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    codigo++;

    this.reset();

    atualizarTela();

});


// Listar tarefas
function atualizarTela() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    if (tarefas.length === 0) {

        lista.innerHTML =
        '<p class="mensagem">Você ainda não possui tarefas cadastradas.</p>';

    }

    tarefas.forEach(function(tarefa) {

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        let nomes = {
            1: "Alta",
            2: "Média",
            3: "Baixa"
        };

        div.innerHTML = `
            <h3>${tarefa.titulo}</h3>

            <p>Código: ${tarefa.codigo}</p>

            <p>Prioridade: ${nomes[tarefa.prioridade]}</p>

            <p>Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

            <div class="acoes">

                <button onclick="concluirTarefa(${tarefa.codigo})">
                    Concluir
                </button>

                <button class="alterar"
                onclick="alterarPrioridade(${tarefa.codigo})">
                    Alterar prioridade
                </button>

            </div>
        `;

        lista.appendChild(div);

    });

    atualizarResumo();

}


// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {

        tarefa.concluida = true;

        atualizarTela();

    }

}


// Alterar prioridade
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) return;

    let novaPrioridade = Number(
        prompt("Digite a prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
    );

    if (![1, 2, 3].includes(novaPrioridade)) {

        alert("Prioridade inválida!");

        return;
    }

    tarefa.prioridade = novaPrioridade;

    atualizarTela();

}


// Atualizar resumo
function atualizarResumo() {

    let total = tarefas.length;

    let concluidas = tarefas.filter(
        t => t.concluida
    ).length;

    let pendentes = total - concluidas;

    document.getElementById("total").textContent = total;

    document.getElementById("pendentes").textContent = pendentes;

    document.getElementById("concluidas").textContent = concluidas;

}


// Iniciar sistema
atualizarTela();
