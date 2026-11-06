
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
function adicionarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);
    const mensagem = document.getElementById("mensagem");

    if (titulo.length < 5) {
        mensagem.textContent = "O título precisa ter pelo menos 5 caracteres!";
        mensagem.style.color = "red";
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent = "Selecione uma prioridade válida!";
        mensagem.style.color = "red";
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        const titulo = document.createElement("strong");
        titulo.className = "titulo-tarefa";
        titulo.textContent = tarefa.titulo;

        const informacoes = document.createElement("p");
        informacoes.textContent =
            "Código: " + tarefa.codigo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.className = "btn-concluir";
        concluir.textContent = tarefa.concluida ? "Concluída" : "Concluir";
        concluir.disabled = tarefa.concluida;
        concluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        const seletor = document.createElement("select");

        seletor.innerHTML = `
            <option value="">Nova prioridade</option>
            <option value="1">Alta</option>
            <option value="2">Média</option>
            <option value="3">Baixa</option>
        `;

        const alterar = document.createElement("button");
        alterar.className = "btn-alterar";
        alterar.textContent = "Alterar prioridade";

        alterar.onclick = function() {
            alterarPrioridade(
                tarefa.codigo,
                Number(seletor.value)
            );
        };

        acoes.appendChild(concluir);
        acoes.appendChild(seletor);
        acoes.appendChild(alterar);

        item.appendChild(titulo);
        item.appendChild(informacoes);
        item.appendChild(acoes);

        lista.appendChild(item);
    });
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}
