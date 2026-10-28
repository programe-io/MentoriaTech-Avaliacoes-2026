
let tarefas = [];
let proximoCodigo = 1;

function cadastrarTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        return {
            sucesso: false,
            mensagem: "O título deve ter no mínimo 5 caracteres."
        };
    }

    const p = Number(prioridade);

    if (!Number.isInteger(p) || p < 1 || p > 3) {
        return {
            sucesso: false,
            mensagem: "A prioridade deve ser 1, 2 ou 3."
        };
    }

    const novaTarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: p,
        concluida: false
    };

    tarefas.push(novaTarefa);

    return {
        sucesso: true,
        mensagem: "Tarefa cadastrada com sucesso!"
    };
}

function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    if (tarefas.length === 0) {
        const item = document.createElement("li");
        item.className = "vazio";
        item.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(item);
    }

    const ordenadas = [...tarefas].sort(
        (a, b) => a.prioridade - b.prioridade
    );

    const nomesPrioridade = {
        1: "Alta",
        2: "Média",
        3: "Baixa"
    };

    ordenadas.forEach(tarefa => {
        const item = document.createElement("li");
        item.className = "tarefa";

        const classesPrioridade = {
            1: "alta",
            2: "media",
            3: "baixa"
        };

        item.classList.add(
            classesPrioridade[tarefa.prioridade]
        );

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const detalhes = document.createElement("div");
        detalhes.className = "detalhes";

        const titulo = document.createElement("strong");
        titulo.textContent = tarefa.titulo;

        const descricao = document.createElement("p");
        descricao.textContent =
            `Código: ${tarefa.codigo} | ` +
            `Prioridade: ${nomesPrioridade[tarefa.prioridade]} | ` +
            `${tarefa.concluida ? "Concluída" : "Pendente"}`;

        detalhes.append(titulo, descricao);

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const btnConcluir = document.createElement("button");
        btnConcluir.className = "btn-concluir";
        btnConcluir.textContent = tarefa.concluida
            ? "Reabrir"
            : "Concluir";

        btnConcluir.addEventListener("click", () => {
            tarefa.concluida = !tarefa.concluida;
            renderizarTarefas();
        });

        const btnExcluir = document.createElement("button");
        btnExcluir.className = "btn-excluir";
        btnExcluir.textContent = "Excluir";

        btnExcluir.addEventListener("click", () => {
            tarefas = tarefas.filter(
                t => t.codigo !== tarefa.codigo
            );
            renderizarTarefas();
        });

        acoes.append(btnConcluir, btnExcluir);
        item.append(detalhes, acoes);
        lista.appendChild(item);
    });

    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    document.getElementById("resumo").textContent =
        `Total: ${tarefas.length} | ` +
        `Pendentes: ${tarefas.length - concluidas} | ` +
        `Concluídas: ${concluidas}`;
}

document.getElementById("formTarefa")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const titulo = document.getElementById("titulo").value;
        const prioridade =
            document.getElementById("prioridade").value;

        const resultado = cadastrarTarefa(titulo, prioridade);
        const mensagem = document.getElementById("mensagem");

        mensagem.textContent = resultado.mensagem;
        mensagem.className = resultado.sucesso
            ? "sucesso"
            : "erro";

        if (resultado.sucesso) {
            this.reset();

            document.getElementById("prioridade").value = "2";

            renderizarTarefas();
            document.getElementById("titulo").focus();
        }
    });

renderizarTarefas();
