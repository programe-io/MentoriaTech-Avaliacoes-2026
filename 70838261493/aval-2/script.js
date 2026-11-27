const form = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("listaTarefas");
const mensagemVazia = document.getElementById("mensagemVazia");
const contador = document.getElementById("contador");
const btnSalvar = document.getElementById("btnSalvar");
const botoesFiltro = document.querySelectorAll(".filtro");

// Carrega as tarefas salvas
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";
let tarefaEditando = null;

// Salva as tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastra ou atualiza uma tarefa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = campoPrioridade.value;

    if (titulo === "") {
        alert("Digite o nome da tarefa!");
        return;
    }

    if (tarefaEditando !== null) {
        const tarefa = tarefas.find(t => t.id === tarefaEditando);

        tarefa.titulo = titulo;
        tarefa.prioridade = prioridade;

        tarefaEditando = null;
        btnSalvar.textContent = "Adicionar tarefa";
    } else {
        const novaTarefa = {
            id: Date.now(),
            titulo: titulo,
            prioridade: prioridade,
            concluida: false
        };

        tarefas.push(novaTarefa);
    }

    salvarTarefas();
    renderizarTarefas();

    form.reset();
    campoPrioridade.value = "baixa";
});

// Renderiza as tarefas na tela
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    let tarefasFiltradas = tarefas.filter(function(tarefa) {
        if (filtroAtual === "pendentes") {
            return !tarefa.concluida;
        }

        if (filtroAtual === "concluidas") {
            return tarefa.concluida;
        }

        return true;
    });

    mensagemVazia.style.display =
        tarefasFiltradas.length === 0 ? "block" : "none";

    tarefasFiltradas.forEach(function(tarefa) {
        const li = document.createElement("li");
        li.className = "tarefa";

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        const divInfo = document.createElement("div");
        divInfo.className = "tarefa-info";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const badge = document.createElement("span");
        badge.className = "badge-prioridade " + tarefa.prioridade;

        const nomesPrioridade = {
            baixa: "Baixa",
            media: "Média",
            alta: "Alta"
        };

        badge.textContent = "Prioridade: " +
            nomesPrioridade[tarefa.prioridade];

        divInfo.appendChild(titulo);
        divInfo.appendChild(badge);

        const divAcoes = document.createElement("div");
        divAcoes.className = "acoes";

        // Botão concluir
        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btnConcluir";
        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.id);
        });

        // Botão editar
        const btnEditar = document.createElement("button");
        btnEditar.className = "btnEditar";
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", function() {
            editarTarefa(tarefa.id);
        });

        // Botão excluir
        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btnExcluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", function() {
            excluirTarefa(tarefa.id);
        });

        divAcoes.appendChild(btnConcluir);
        divAcoes.appendChild(btnEditar);
        divAcoes.appendChild(btnExcluir);

        li.appendChild(divInfo);
        li.appendChild(divAcoes);

        listaTarefas.appendChild(li);
    });

    atualizarContador();
}

// Conclui ou reabre uma tarefa
function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        renderizarTarefas();
    }
}

// Edita uma tarefa
function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    campoTitulo.value = tarefa.titulo;
    campoPrioridade.value = tarefa.prioridade;

    tarefaEditando = id;
    btnSalvar.textContent = "Salvar alterações";

    campoTitulo.focus();
}

// Exclui uma tarefa
function excluirTarefa(id) {
    const confirmar = confirm("Deseja realmente excluir esta tarefa?");

    if (!confirmar) return;

    tarefas = tarefas.filter(t => t.id !== id);

    if (tarefaEditando === id) {
        tarefaEditando = null;
        form.reset();
        btnSalvar.textContent = "Adicionar tarefa";
    }

    salvarTarefas();
    renderizarTarefas();
}

// Atualiza o contador
function atualizarContador() {
    const total = tarefas.length;
    const pendentes = tarefas.filter(t => !t.concluida).length;
    const concluidas = tarefas.filter(t => t.concluida).length;

    contador.textContent =
        `${total} tarefas cadastradas | ` +
        ${pendentes} pendentes | ${concluidas} concluídas;
}

// Configura os filtros
botoesFiltro.forEach(function(botao) {
    botao.addEventListener("click", function() {
        filtroAtual = botao.dataset.filtro;

        botoesFiltro.forEach(function(b) {
            b.classList.remove("ativo");
        });

        botao.classList.add("ativo");

        renderizarTarefas();
    });
});

// Inicializa o sistema
renderizarTarefas();