
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("active");
}

function abrirModal(id = null) {
    const form = document.getElementById("formTarefa");
    form.reset();

    document.getElementById("tarefaId").value = "";

    if (id !== null) {
        const tarefa = tarefas.find(t => t.id === id);

        if (!tarefa) return;

        document.getElementById("tituloModal").textContent = "Editar tarefa";
        document.getElementById("tarefaId").value = tarefa.id;
        document.getElementById("titulo").value = tarefa.titulo;
        document.getElementById("descricao").value = tarefa.descricao;
        document.getElementById("prioridade").value = tarefa.prioridade;
        document.getElementById("dataEntrega").value = tarefa.dataEntrega;
    } else {
        document.getElementById("tituloModal").textContent = "Nova tarefa";
    }

    document.getElementById("modal").style.display = "flex";
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

document.getElementById("formTarefa").addEventListener("submit", function(e) {
    e.preventDefault();

    const id = document.getElementById("tarefaId").value;

    const dados = {
        titulo: document.getElementById("titulo").value.trim(),
        descricao: document.getElementById("descricao").value.trim(),
        prioridade: document.getElementById("prioridade").value,
        dataEntrega: document.getElementById("dataEntrega").value
    };

    if (!dados.titulo) {
        alert("Digite o nome da tarefa.");
        return;
    }

    if (id) {
        const tarefa = tarefas.find(t => t.id === Number(id));

        if (tarefa) {
            Object.assign(tarefa, dados);
        }
    } else {
        tarefas.push({
            id: Date.now(),
            ...dados,
            concluida: false,
            criadaEm: new Date().toISOString()
        });
    }

    salvar();
    fecharModal();
    atualizar();
});

function excluirTarefa(id) {
    if (confirm("Deseja realmente excluir esta tarefa?")) {
        tarefas = tarefas.filter(t => t.id !== id);
        salvar();
        atualizar();
    }
}

function concluirTarefa(id) {
    const tarefa = tarefas.find(t => t.id === id);

    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvar();
        atualizar();
    }
}

function formatarData(data) {
    if (!data) return "Sem prazo";

    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function renderizar() {
    const lista = document.getElementById("listaTarefas");
    const pesquisa = document.getElementById("pesquisa").value.toLowerCase();
    const filtro = document.getElementById("filtro").value;
    const prioridade = document.getElementById("filtroPrioridade").value;

    lista.innerHTML = "";

    const filtradas = tarefas.filter(t => {
        const combina = t.titulo.toLowerCase().includes(pesquisa) ||
            t.descricao.toLowerCase().includes(pesquisa);

        const status = filtro === "todas" ||
            (filtro === "pendentes" && !t.concluida) ||
            (filtro === "concluidas" && t.concluida);

        const prioridadeOk = prioridade === "todas" ||
            t.prioridade === prioridade;

        return combina && status && prioridadeOk;
    });

    document.getElementById("vazio").style.display =
        filtradas.length ? "none" : "block";

    filtradas.sort((a, b) => {
        if (a.concluida !== b.concluida) {
            return Number(a.concluida) - Number(b.concluida);
        }

        return (a.dataEntrega || "9999-99-99")
            .localeCompare(b.dataEntrega || "9999-99-99");
    });

    filtradas.forEach(t => {
        const article = document.createElement("article");
        article.className = `task ${t.prioridade} ${t.concluida ? "done" : ""}`;

        const info = document.createElement("div");
        info.className = "task-info";

        const titulo = document.createElement("h3");
        titulo.textContent = t.titulo;

        const descricao = document.createElement("p");
        descricao.textContent = t.descricao || "Sem descrição";

        const meta = document.createElement("div");
        meta.className = "task-meta";

        const etiqueta = document.createElement("span");
        etiqueta.className = `priority ${t.prioridade}`;
        etiqueta.textContent = `Prioridade ${t.prioridade}`;

        const prazo = document.createElement("span");
        prazo.className = "priority baixa";
        prazo.textContent = `📅 ${formatarData(t.dataEntrega)}`;

        meta.append(etiqueta, prazo);
        info.append(titulo, descricao, meta);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const concluir = document.createElement("button");
        concluir.className = "action-btn complete";
        concluir.textContent = t.concluida ? "↩️" : "✓";
        concluir.title = t.concluida ? "Reabrir tarefa" : "Concluir tarefa";
        concluir.onclick = () => concluirTarefa(t.id);

        const editar = document.createElement("button");
        editar.className = "action-btn edit";
        editar.textContent = "✏️";
        editar.title = "Editar tarefa";
        editar.onclick = () => abrirModal(t.id);

        const excluir = document.createElement("button");
        excluir.className = "action-btn delete";
        excluir.textContent = "🗑️";
        excluir.title = "Excluir tarefa";
        excluir.onclick = () => excluirTarefa(t.id);

        actions.append(concluir, editar, excluir);
        article.append(info, actions);
        lista.appendChild(article);
    });
}

function atualizarDashboard() {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;

    const prioritarias = tarefas.filter(
        t => t.prioridade === "alta" && !t.concluida
    ).length;

    const porcentagem = total
        ? Math.round((concluidas / total) * 100)
        : 0;

    document.getElementById("total").textContent = total;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("prioritarias").textContent = prioritarias;

    document.getElementById("porcentagem").textContent =
        porcentagem + "%";

    document.getElementById("barraProgresso").style.width =
        porcentagem + "%";
}

function atualizar() {
    renderizar();
    atualizarDashboard();
}

document.getElementById("dataAtual").textContent =
    new Date().toLocaleDateString("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

atualizar();
