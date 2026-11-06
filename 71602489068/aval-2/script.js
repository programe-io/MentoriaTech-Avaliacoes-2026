
let tarefas = [];
let geradorCodigo = 1;

// Validar os dados da tarefa
function validarDadosTarefa(titulo, prioridade) {

    if (titulo.length < 5) {
        throw new Error("O título deve ter pelo menos 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("Informe uma prioridade entre 1 e 3.");
    }
}

// Buscar tarefa pelo código
function buscarTarefa(codigoTarefa) {

    const tarefaBuscada = tarefas.find(
        t => t.codigo === codigoTarefa
    );

    if (!tarefaBuscada) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefaBuscada;
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {

    validarDadosTarefa(titulo, prioridade);

    let tarefa = {
        codigo: geradorCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    listarTarefas();

    return tarefa;
}

// Listar tarefas na tela
function listarTarefas() {

    const lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    tarefas.forEach(tarefa => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("p");
        titulo.className = "titulo-tarefa";
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridade = document.createElement("p");
        prioridade.textContent = "Prioridade: " + tarefa.prioridade;

        const status = document.createElement("p");
        status.textContent = tarefa.status ? "Pendente" : "Concluída";

        const botaoConcluir = document.createElement("button");
        botaoConcluir.textContent = "Concluir";
        botaoConcluir.className = "btn-concluir";

        botaoConcluir.addEventListener("click", function() {
            try {
                concluirTarefa(tarefa.codigo);
            } catch (erro) {
                alert(erro.message);
            }
        });

        const botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";
        botaoAlterar.className = "btn-alterar";

        botaoAlterar.addEventListener("click", function() {

            let novaPrioridade = Number(
                prompt("Digite a nova prioridade (1, 2 ou 3):")
            );

            try {
                alterarPrioridade(tarefa.codigo, novaPrioridade);
            } catch (erro) {
                alert(erro.message);
            }
        });

        div.appendChild(titulo);
        div.appendChild(codigo);
        div.appendChild(prioridade);
        div.appendChild(status);

        if (tarefa.status) {
            div.appendChild(botaoConcluir);
        }

        div.appendChild(botaoAlterar);

        lista.appendChild(div);

    });
}

// Concluir tarefa
function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (tarefa.status === false) {
        throw new Error("A tarefa já estava concluída!");
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");

    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (!Number.isInteger(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3) {

        throw new Error("Informe uma prioridade entre 1 e 3.");
    }

    tarefa.prioridade = novaPrioridade;

    console.log("Prioridade alterada com sucesso!");

    listarTarefas();
}

// Evento do formulário
document.getElementById("formTarefa").addEventListener("submit", function(event) {

    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();

    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {

        cadastrarTarefa(titulo, prioridade);

        document.getElementById("formTarefa").reset();

    } catch (erro) {

        alert(erro.message);

    }

});
