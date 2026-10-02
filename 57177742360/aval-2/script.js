let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function adicionarTarefa() {

    const titulo = document.getElementById("titulo").value;
    const data = document.getElementById("data").value;
    const prioridade = document.getElementById("prioridade").value;

    if (titulo === "" || data === "") {
        alert("Preencha o título e a data!");
        return;
    }

    const novaTarefa = {
        id: Date.now(),
        titulo: titulo,
        data: data,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    salvar();
    mostrarTarefas();

    document.getElementById("titulo").value = "";
    document.getElementById("data").value = "";
}

function mostrarTarefas() {

    const lista = document.getElementById("listaTarefas");
    const filtro = document.getElementById("filtro").value;

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtro === "pendentes") {
        tarefasFiltradas = tarefas.filter(tarefa => !tarefa.concluida);
    }

    if (filtro === "concluidas") {
        tarefasFiltradas = tarefas.filter(tarefa => tarefa.concluida);
    }

    if (tarefasFiltradas.length === 0) {
        lista.innerHTML = `
            <div class="vazio">
                Nenhuma tarefa encontrada.
            </div>
        `;
    }

    tarefasFiltradas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = `tarefa ${tarefa.concluida ? "concluida" : ""}`;

        div.innerHTML = `

            <div class="tarefa-info">

                <h3>${tarefa.titulo}</h3>

                <p>
                    📅 Entrega: ${formatarData(tarefa.data)}
                </p>

                <span class="prioridade ${tarefa.prioridade}">
                    ${tarefa.prioridade.toUpperCase()}
                </span>

            </div>

            <div class="acoes">

                <button 
                    class="concluir"
                    onclick="concluirTarefa(${tarefa.id})"
                >
                    ${tarefa.concluida ? "↩" : "✓"}
                </button>

                <button 
                    class="excluir"
                    onclick="excluirTarefa(${tarefa.id})"
                >
                    🗑
                </button>

            </div>
        `;

        lista.appendChild(div);
    });

    atualizarResumo();
}

function concluirTarefa(id) {

    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
    }

    salvar();
    mostrarTarefas();
}

function excluirTarefa(id) {

    tarefas = tarefas.filter(tarefa => tarefa.id !== id);

    salvar();
    mostrarTarefas();
}

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function atualizarResumo() {

    const total = tarefas.length;

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    const pendentes = total - concluidas;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
}

mostrarTarefas();