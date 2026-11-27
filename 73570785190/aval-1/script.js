
const form = document.querySelector("#form-tarefa");
const inputTitulo = document.querySelector("#titulo");
const lista = document.querySelector("#lista-tarefas");

const total = document.querySelector("#total");
const pendentes = document.querySelector("#pendentes");
const concluidas = document.querySelector("#concluidas");

const botoesFiltro = document.querySelectorAll("[data-filtro]");
const limparConcluidas = document.querySelector("#limpar-concluidas");

let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

// Salvar tarefas
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Gerar ID
function gerarId() {
    return Date.now() + Math.floor(Math.random() * 1000);
}

// Adicionar tarefa
form.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = inputTitulo.value.trim();

    if (titulo === "") {
        alert("Digite uma tarefa!");
        return;
    }

    const tarefa = {
        id: gerarId(),
        titulo: titulo,
        concluida: false
    };

    tarefas.push(tarefa);

    salvarTarefas();

    inputTitulo.value = "";

    render();
});

// Alternar conclusão
function alternarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    tarefa.concluida = !tarefa.concluida;

    salvarTarefas();
    render();
}

// Editar tarefa
function editarTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (!tarefa) return;

    const novoTitulo = prompt("Digite o novo título:", tarefa.titulo);

    if (novoTitulo === null) return;

    if (novoTitulo.trim() === "") {
        alert("O título não pode ficar vazio!");
        return;
    }

    tarefa.titulo = novoTitulo.trim();

    salvarTarefas();
    render();
}

// Excluir tarefa
function excluirTarefa(id) {
    if (!confirm("Deseja excluir esta tarefa?")) return;

    tarefas = tarefas.filter(t => t.id !== id);

    salvarTarefas();
    render();
}

// Atualizar contadores
function atualizarResumo() {
    total.textContent = tarefas.length;

    pendentes.textContent =
        tarefas.filter(t => !t.concluida).length;

    concluidas.textContent =
        tarefas.filter(t => t.concluida).length;
}

// Filtrar tarefas
function filtrarTarefas() {
    if (filtroAtual === "pendentes") {
        return tarefas.filter(t => !t.concluida);
    }

    if (filtroAtual === "concluidas") {
        return tarefas.filter(t => t.concluida);
    }

    return tarefas;
}

// Renderizar tarefas
function render() {
    lista.innerHTML = "";

    const tarefasFiltradas = filtrarTarefas();

    if (tarefasFiltradas.length === 0) {
        const mensagem = document.createElement("li");
        mensagem.classList.add("vazio");
        mensagem.textContent = "Nenhuma tarefa encontrada.";
        lista.appendChild(mensagem);
    }

    tarefasFiltradas.forEach(tarefa => {
        const li = document.createElement("li");
        li.classList.add("item-tarefa");

        if (tarefa.concluida) {
            li.classList.add("concluida");
        }

        const texto = document.createElement("span");
        texto.textContent = tarefa.titulo;

        const acoes = document.createElement("div");
        acoes.classList.add("acoes");

        const btnConcluir = document.createElement("button");
        btnConcluir.classList.add("btn-concluir");
        btnConcluir.textContent = tarefa.concluida ? "Retomar" : "Concluir";

        btnConcluir.addEventListener("click", () => {
            alternarTarefa(tarefa.id);
        });

        const btnEditar = document.createElement("button");
        btnEditar.classList.add("btn-editar");
        btnEditar.textContent = "Editar";

        btnEditar.addEventListener("click", () => {
            editarTarefa(tarefa.id);
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.classList.add("btn-excluir");
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", () => {
            excluirTarefa(tarefa.id);
        });

        acoes.append(
            btnConcluir,
            btnEditar,
            btnExcluir
        );

        li.append(texto, acoes);

        lista.appendChild(li);
    });

    atualizarResumo();
}

// Filtros
botoesFiltro.forEach(botao => {
    botao.addEventListener("click", function() {
        filtroAtual = this.dataset.filtro;

        botoesFiltro.forEach(b => {
            b.classList.remove("ativo");
        });

        this.classList.add("ativo");

        render();
    });
});

// Limpar tarefas concluídas
limparConcluidas.addEventListener("click", function() {
    tarefas = tarefas.filter(t => !t.concluida);

    salvarTarefas();
    render();
});

// Exibição inicial
render();
