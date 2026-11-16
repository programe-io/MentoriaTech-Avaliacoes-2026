
const tarefas = [];
let proximoCodigo = 0;

// Validar dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("Digite um título com pelo menos 5 caracteres!");
    }

    prioridade = Number(prioridade);

    if (!Number.isInteger(prioridade) ||
        prioridade < 1 || prioridade > 3) {
        throw new Error("Selecione uma prioridade válida!");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(novaTarefa);

    return novaTarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada!");
    }

    return tarefa;
}

// Concluir tarefa
function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Esta tarefa já foi concluída!");
    }

    tarefa.status = false;
}

// Alterar prioridade
function alterarPrioridade(codigo, prioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, prioridade);

    tarefa.prioridade = Number(prioridade);
}

// Elementos HTML
const formTarefa = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const filtro = document.getElementById("filtroStatus");

// Cadastro
formTarefa.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = document.getElementById("prioridade").value;

    try {
        const tarefa = cadastrarTarefa(titulo, prioridade);

        mensagem.textContent =
            "Tarefa cadastrada! Código: " + tarefa.codigo;

        mensagem.style.color = "green";

        formTarefa.reset();

        exibirTarefas();

    } catch (erro) {
        mensagem.textContent = erro.message;
        mensagem.style.color = "red";
    }
});

// Exibir tarefas
function exibirTarefas() {
    lista.innerHTML = "";

    let resultado = listarTarefas();

    if (filtro.value === "andamento") {
        resultado = resultado.filter(t => t.status);
    }

    if (filtro.value === "concluidas") {
        resultado = resultado.filter(t => !t.status);
    }

    if (resultado.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    resultado.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = tarefa.status
            ? "tarefa"
            : "tarefa concluida";

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            "Código: " + tarefa.codigo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.status ? "Em andamento" : "Concluída");

        const botoes = document.createElement("div");
        botoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.textContent = "Concluir";
        concluir.disabled = !tarefa.status;

        concluir.onclick = function() {
            try {
                concluirTarefa(tarefa.codigo);
                exibirTarefas();
                mensagem.textContent = "Tarefa concluída!";
                mensagem.style.color = "green";
            } catch (erro) {
                mensagem.textContent = erro.message;
            }
        };

        const alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";

        alterar.onclick = function() {
            const nova = prompt(
                "Digite 1 (Alta), 2 (Média) ou 3 (Baixa)"
            );

            if (nova === null) return;

            try {
                alterarPrioridade(tarefa.codigo, nova);
                exibirTarefas();
                mensagem.textContent = "Prioridade alterada!";
                mensagem.style.color = "green";
            } catch (erro) {
                mensagem.textContent = erro.message;
                mensagem.style.color = "red";
            }
        };

        botoes.append(concluir, alterar);
        div.append(titulo, detalhes, botoes);
        lista.appendChild(div);
    });
}

// Filtro
filtro.addEventListener("change", exibirTarefas);

// Busca
document.getElementById("formBusca")
    .addEventListener("submit", function(event) {
        event.preventDefault();

        const codigo =
            document.getElementById("codigoBusca").value;

        const resultado =
            document.getElementById("resultadoBusca");

        try {
            const tarefa = buscarTarefa(codigo);

            resultado.textContent =
                "Código: " + tarefa.codigo +
                " | Tarefa: " + tarefa.titulo +
                " | Prioridade: " + tarefa.prioridade +
                " | Status: " +
                (tarefa.status ? "Em andamento" : "Concluída");

        } catch (erro) {
            resultado.textContent = erro.message;
        }
    });

// Inicializar
exibirTarefas();
