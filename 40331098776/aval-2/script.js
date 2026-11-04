const tarefas = [];
let proximoCodigo = 0;

// Validar os dados
function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(Number(prioridade))) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

// Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, Number(prioridade));

    proximoCodigo++;

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: Number(prioridade),
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

// Listar tarefas
function listarTarefas() {
    return tarefas;
}

// Buscar tarefa pelo código
function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
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

    validarDadosDaTarefa(
        tarefa.titulo,
        Number(novaPrioridade)
    );

    tarefa.prioridade = Number(novaPrioridade);
}

// Mostrar tarefas na tela
function renderizarTarefas() {
    const lista = document.getElementById("listaTarefas");
    const filtro = document.getElementById("filtro").value;

    lista.innerHTML = "";

    const filtradas = tarefas.filter(tarefa => {
        if (filtro === "pendentes") return tarefa.status;
        if (filtro === "concluidas") return !tarefa.status;
        return true;
    });

    if (filtradas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    filtradas.forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        const info = document.createElement("div");

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `Código: ${tarefa.codigo} | Prioridade: ${tarefa.prioridade}`;

        const status = document.createElement("p");
        status.textContent = tarefa.status
            ? "Em andamento"
            : "Concluída";

        info.append(titulo, detalhes, status);

        const acoes = document.createElement("div");

        if (tarefa.status) {
            const concluir = document.createElement("button");
            concluir.textContent = "Concluir";

            concluir.onclick = () => {
                try {
                    concluirTarefa(tarefa.codigo);
                    renderizarTarefas();
                } catch (erro) {
                    alert(erro.message);
                }
            };

            acoes.appendChild(concluir);
        }

        const alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";

        alterar.onclick = () => {
            const nova = prompt("Digite a prioridade: 1, 2 ou 3");

            if (nova === null) return;

            try {
                alterarPrioridade(tarefa.codigo, nova);
                renderizarTarefas();
            } catch (erro) {
                alert(erro.message);
            }
        };

        acoes.appendChild(alterar);

        div.append(info, acoes);
        lista.appendChild(div);
    });
}

// Evento de cadastro
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);

        document.getElementById("mensagem").textContent =
            "Tarefa cadastrada com sucesso!";

        this.reset();
        renderizarTarefas();

    } catch (erro) {
        document.getElementById("mensagem").textContent =
            erro.message;
    }
});

// Evento do filtro
document.getElementById("filtro").addEventListener(
    "change",
    renderizarTarefas
);

renderizarTarefas();