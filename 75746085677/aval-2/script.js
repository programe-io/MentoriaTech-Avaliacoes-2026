
// CARREGAR TAREFAS
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const form = document.getElementById("formTarefa");

// SALVAR NO NAVEGADOR
function salvarDados() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// FORMATAR DATA
function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

// ATUALIZAR DASHBOARD E LISTAGEM
function atualizarTela() {

    const lista = document.getElementById("listaTarefas");
    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    const filtro = document.getElementById("filtro").value;

    lista.innerHTML = "";

    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = tarefas.length - concluidas;

    document.getElementById("totalTarefas").textContent = tarefas.length;
    document.getElementById("tarefasPendentes").textContent = pendentes;
    document.getElementById("tarefasConcluidas").textContent = concluidas;

    let encontradas = 0;

    tarefas.forEach((tarefa, index) => {

        if (
            !tarefa.titulo.toLowerCase().includes(pesquisa) &&
            !tarefa.descricao.toLowerCase().includes(pesquisa)
        ) {
            return;
        }

        if (filtro === "Pendente" && tarefa.concluida) return;
        if (filtro === "Concluída" && !tarefa.concluida) return;

        encontradas++;

        const card = document.createElement("div");

        card.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = tarefa.descricao;

        const data = document.createElement("p");
        data.textContent = "📅 Prazo: " + formatarData(tarefa.data);

        const prioridade = document.createElement("span");

        prioridade.className = "prioridade " +
            tarefa.prioridade.toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "");

        prioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("span");
        status.className = "status";
        status.textContent = tarefa.concluida
            ? "Concluída"
            : "Pendente";

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.className = "concluir";
        concluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        concluir.onclick = () => concluirTarefa(index);

        const editar = document.createElement("button");
        editar.className = "editar";
        editar.textContent = "Editar";
        editar.onclick = () => editarTarefa(index);

        const excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";
        excluir.onclick = () => excluirTarefa(index);

        acoes.append(concluir, editar, excluir);

        card.append(
            titulo,
            descricao,
            data,
            prioridade,
            status,
            acoes
        );

        lista.appendChild(card);
    });

    if (encontradas === 0) {
        const vazio = document.createElement("div");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa encontrada.";
        lista.appendChild(vazio);
    }
}

// CADASTRAR OU EDITAR
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const descricao = document.getElementById("descricao").value.trim();
    const data = document.getElementById("data").value;
    const prioridade = document.getElementById("prioridade").value;

    const indice = document.getElementById("indice").value;

    if (!titulo || !descricao || !data) {
        alert("Preencha todos os campos!");
        return;
    }

    const dataEscolhida = new Date(data + "T00:00:00");

    if (isNaN(dataEscolhida.getTime())) {
        alert("Data inválida!");
        return;
    }

    const tarefa = {
        id: indice === "" ? Date.now() : tarefas[Number(indice)].id,
        titulo,
        descricao,
        data,
        prioridade,
        concluida: indice === ""
            ? false
            : tarefas[Number(indice)].concluida
    };

    if (indice === "") {

        tarefas.push(tarefa);
        alert("Tarefa cadastrada com sucesso!");

    } else {

        tarefas[Number(indice)] = tarefa;
        alert("Tarefa atualizada com sucesso!");

    }

    salvarDados();
    atualizarTela();

    form.reset();

    document.getElementById("indice").value = "";

    document.getElementById("btnSalvar").textContent =
        "Cadastrar Tarefa";
});

// EDITAR
function editarTarefa(index) {

    const tarefa = tarefas[index];

    document.getElementById("titulo").value = tarefa.titulo;
    document.getElementById("descricao").value = tarefa.descricao;
    document.getElementById("data").value = tarefa.data;
    document.getElementById("prioridade").value = tarefa.prioridade;

    document.getElementById("indice").value = index;

    document.getElementById("btnSalvar").textContent =
        "Salvar Alterações";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

// CONCLUIR OU REABRIR
function concluirTarefa(index) {

    tarefas[index].concluida = !tarefas[index].concluida;

    salvarDados();
    atualizarTela();
}

// EXCLUIR
function excluirTarefa(index) {

    if (confirm("Deseja realmente excluir esta tarefa?")) {

        tarefas.splice(index, 1);

        salvarDados();
        atualizarTela();

        alert("Tarefa excluída!");
    }
}

// PESQUISA
document.getElementById("pesquisa")
    .addEventListener("input", atualizarTela);

// FILTRO
document.getElementById("filtro")
    .addEventListener("change", atualizarTela);

// INICIALIZAR SISTEMA
atualizarTela();
