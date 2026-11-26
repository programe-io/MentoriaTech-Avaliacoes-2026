
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

const formulario = document.getElementById("formulario");

const lista = document.getElementById("listaTarefas");

const filtro = document.getElementById("filtro");

// Salvar tarefas
function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar tarefa
formulario.addEventListener("submit", function(e) {

    e.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();

    const descricao = document.getElementById("descricao").value.trim();

    const data = document.getElementById("data").value;

    const prioridade = document.getElementById("prioridade").value;

    const tarefa = {
        id: Date.now().toString() + Math.random().toString(36).slice(2),
        titulo,
        descricao,
        data,
        prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    salvar();

    formulario.reset();

    atualizar();
});

// Atualizar lista
function atualizar() {

    lista.innerHTML = "";

    const tipo = filtro.value;

    const filtradas = tarefas.filter(t => {

        if (tipo === "Pendente") {
            return !t.concluida;
        }

        if (tipo === "Concluída") {
            return t.concluida;
        }

        return true;
    });

    if (filtradas.length === 0) {

        lista.innerHTML = `
            <p class="vazio">
                Nenhuma tarefa encontrada.
            </p>
        `;
    }

    filtradas.forEach(t => {

        const classe = t.prioridade.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const elemento = document.createElement("div");

        elemento.className = "tarefa";

        if (t.concluida) {
            elemento.classList.add("concluida");
        }

        const info = document.createElement("div");
        info.className = "info-tarefa";

        const titulo = document.createElement("h3");
        titulo.textContent = t.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = t.descricao || "Sem descrição";

        const prazo = document.createElement("p");
        prazo.textContent = "Prazo: " + t.data.split("-").reverse().join("/");

        const prioridade = document.createElement("span");
        prioridade.className = "prioridade " + classe;
        prioridade.textContent = "Prioridade: " + t.prioridade;

        info.append(titulo, descricao, prazo, prioridade);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.className = "btn-concluir";
        concluir.textContent = t.concluida
            ? "Reabrir"
            : "Concluir";

        concluir.addEventListener("click", () => {
            concluirTarefa(t.id);
        });

        const excluir = document.createElement("button");
        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {
            removerTarefa(t.id);
        });

        acoes.append(concluir, excluir);

        elemento.append(info, acoes);

        lista.appendChild(elemento);
    });

    atualizarIndicadores();
}

// Concluir ou reabrir tarefa
function concluirTarefa(id) {

    tarefas = tarefas.map(t => {

        if (t.id === id) {
            return {
                ...t,
                concluida: !t.concluida
            };
        }

        return t;
    });

    salvar();
    atualizar();
}

// Excluir tarefa
function removerTarefa(id) {

    if (confirm("Deseja excluir esta tarefa?")) {

        tarefas = tarefas.filter(t => t.id !== id);

        salvar();
        atualizar();
    }
}

// Atualizar indicadores
function atualizarIndicadores() {

    document.getElementById("total").textContent =
        tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.concluida).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.concluida).length;
}

// Filtrar tarefas
filtro.addEventListener("change", atualizar);

// Carregar tarefas ao abrir
atualizar();
