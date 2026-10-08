let tarefas = [];
let proximoCodigo = 1;

// Adicionar tarefa
function adicionarTarefa() {

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = document.getElementById("prioridade").value;

    if (titulo.length < 3) {
        alert("Digite uma tarefa com pelo menos 3 caracteres.");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    document.getElementById("titulo").value = "";

    salvarDados();
    listarTarefas();
}


// Listar tarefas
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");
    const pesquisa = document
        .getElementById("pesquisa")
        .value
        .toLowerCase();

    lista.innerHTML = "";

    const tarefasFiltradas = tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(pesquisa)
    );

    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.classList.add(
            `prioridade-${tarefa.prioridade}`
        );

        div.innerHTML = `
            <div>
                <h3>${tarefa.titulo}</h3>

                <p>
                    Código: ${tarefa.codigo}
                    |
                    Prioridade: ${tarefa.prioridade}
                </p>
            </div>

            <div class="acoes">

                <button
                    class="concluir"
                    onclick="concluirTarefa(${tarefa.codigo})">
                    ${tarefa.concluida ? "Reabrir" : "Concluir"}
                </button>

                <button
                    class="excluir"
                    onclick="excluirTarefa(${tarefa.codigo})">
                    Excluir
                </button>

            </div>
        `;

        lista.appendChild(div);
    });

    atualizarEstatisticas();
}


// Concluir tarefa
function concluirTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        return;
    }

    tarefa.concluida = !tarefa.concluida;

    salvarDados();
    listarTarefas();
}


// Excluir tarefa
function excluirTarefa(codigo) {

    const confirmar = confirm(
        "Deseja realmente excluir esta tarefa?"
    );

    if (!confirmar) {
        return;
    }

    tarefas = tarefas.filter(
        tarefa => tarefa.codigo !== codigo
    );

    salvarDados();
    listarTarefas();
}


// Atualizar estatísticas
function atualizarEstatisticas() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
}


// Salvar no navegador
function salvarDados() {

    localStorage.setItem(
        "tarefas",
        JSON.stringify(tarefas)
    );

    localStorage.setItem(
        "proximoCodigo",
        proximoCodigo
    );
}


// Carregar dados
function carregarDados() {

    const dados = localStorage.getItem("tarefas");
    const codigo = localStorage.getItem("proximoCodigo");

    if (dados) {
        tarefas = JSON.parse(dados);
    }

    if (codigo) {
        proximoCodigo = Number(codigo);
    }

    listarTarefas();
}


// Iniciar sistema
carregarDados();