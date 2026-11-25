
let tarefas = [];
let geradorDeCodigo = 0;

// Validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
        throw new Error("O título deve ter pelo menos 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    geradorDeCodigo++;

    let novaTarefa = {
        codigo: geradorDeCodigo,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(novaTarefa);

    console.log("Tarefa cadastrada com sucesso!");
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

// Cadastrar pela página
function adicionarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);

        document.getElementById("titulo").value = "";

        mostrarTarefas();

    } catch (erro) {
        alert(erro.message);
    }
}

// Mostrar tarefas na página
function mostrarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(function(tarefa) {
        const caixa = document.createElement("div");
        caixa.className = tarefa.status
            ? "tarefa em-andamento"
            : "tarefa concluida";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        caixa.appendChild(titulo);
        caixa.appendChild(codigo);
        caixa.appendChild(prioridade);
        caixa.appendChild(status);

        if (tarefa.status) {
            const botaoConcluir = document.createElement("button");
            botaoConcluir.textContent = "Concluir tarefa";

            botaoConcluir.onclick = function() {
                try {
                    concluirTarefa(tarefa.codigo);
                    mostrarTarefas();
                } catch (erro) {
                    alert(erro.message);
                }
            };

            caixa.appendChild(botaoConcluir);
        }

        const seletor = document.createElement("select");

        for (let i = 1; i <= 3; i++) {
            const opcao = document.createElement("option");
            opcao.value = i;
            opcao.textContent = "Prioridade " + i;

            if (i === tarefa.prioridade) {
                opcao.selected = true;
            }

            seletor.appendChild(opcao);
        }

        const botaoPrioridade = document.createElement("button");
        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.onclick = function() {
            try {
                alterarPrioridade(
                    tarefa.codigo,
                    Number(seletor.value)
                );

                mostrarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        };

        caixa.appendChild(seletor);
        caixa.appendChild(botaoPrioridade);

        lista.appendChild(caixa);
    });
}
