
let tarefas = [];
let codigo = 1;

// Cadastrar tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();
    let prioridade = Number(document.getElementById("prioridade").value);
    let mensagem = document.getElementById("mensagem");

    if (titulo.length < 5) {
        mensagem.textContent = "O título precisa ter pelo menos 5 caracteres!";
        mensagem.style.color = "red";
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        mensagem.textContent = "Escolha uma prioridade entre 1 e 3!";
        mensagem.style.color = "red";
        return;
    }

    let tarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    codigo++;

    mensagem.textContent = "Tarefa cadastrada com sucesso!";
    mensagem.style.color = "green";

    document.getElementById("titulo").value = "";
    document.getElementById("prioridade").value = "";

    listarTarefas();
}

// Listar tarefas
function listarTarefas() {

    let lista = document.getElementById("lista");
    lista.innerHTML = "";

    tarefas.forEach(function(tarefa) {

        let item = document.createElement("li");

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.innerHTML =
            "<strong>Código:</strong> " + tarefa.codigo +
            "<br><strong>Título:</strong> " + tarefa.titulo +
            "<br><strong>Prioridade:</strong> " + tarefa.prioridade +
            "<br><strong>Status:</strong> " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        let botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.className = "concluir";

        botaoConcluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        let seletor = document.createElement("select");

        seletor.innerHTML =
            '<option value="">Nova prioridade</option>' +
            '<option value="1">Alta</option>' +
            '<option value="2">Média</option>' +
            '<option value="3">Baixa</option>';

        let botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "alterar";

        botaoAlterar.onclick = function() {
            alterarPrioridade(tarefa.codigo, Number(seletor.value));
        };

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(seletor);
        acoes.appendChild(botaoAlterar);

        item.appendChild(acoes);
        lista.appendChild(item);
    });
}

// Concluir tarefa
function concluirTarefa(codigoTarefa) {

    let tarefa = tarefas.find(function(t) {
        return t.codigo === codigoTarefa;
    });

    if (tarefa) {
        tarefa.concluida = true;
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigoTarefa, novaPrioridade) {

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Selecione uma prioridade válida!");
        return;
    }

    let tarefa = tarefas.find(function(t) {
        return t.codigo === codigoTarefa;
    });

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        listarTarefas();
    }
}
