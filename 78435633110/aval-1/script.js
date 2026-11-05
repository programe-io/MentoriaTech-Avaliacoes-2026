
const tarefas = [];
let proximoCodigo = 0;

const formulario = document.getElementById("formTarefa");
const lista = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.trim().length < 5) {
        throw new Error("O título deve ter pelo menos 5 caracteres.");
    }

    if (prioridade < 1 || prioridade > 3 ||
        !Number.isInteger(prioridade)) {
        throw new Error("A prioridade deve ser entre 1 e 3.");
    }
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    proximoCodigo++;

    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);
    return tarefa;
}

function listarTarefas() {
    return tarefas;
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(
        item => item.codigo === Number(codigo)
    );

    if (!tarefa) {
        throw new Error("Tarefa não encontrada.");
    }

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status) {
        throw new Error("Essa tarefa já foi concluída.");
    }

    tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

    tarefa.prioridade = novaPrioridade;
}

function renderizarTarefas() {
    lista.innerHTML = "";

    listarTarefas().forEach(tarefa => {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (!tarefa.status) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("div");
        titulo.className = "titulo";
        titulo.textContent = tarefa.titulo;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `Código: ${tarefa.codigo} | ` +
            `Prioridade: ${tarefa.prioridade} | ` +
            `Status: ${tarefa.status ? "Em andamento" : "Concluída"}`;

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.textContent = "Concluir";

        concluir.disabled = !tarefa.status;

        concluir.addEventListener("click", () => {
            try {
                concluirTarefa(tarefa.codigo);
                mensagem.textContent = "Tarefa concluída!";
                renderizarTarefas();
            } catch (erro) {
                mensagem.textContent = erro.message;
            }
        });

        const alterar = document.createElement("button");
        alterar.textContent = "Alterar prioridade";

        alterar.addEventListener("click", () => {
            const valor = prompt(
                "Digite a nova prioridade: 1 (Alta), 2 (Média), 3 (Baixa)"
            );

            if (valor === null) return;

            try {
                alterarPrioridade(tarefa.codigo, Number(valor));
                mensagem.textContent = "Prioridade alterada!";
                renderizarTarefas();
            } catch (erro) {
                mensagem.textContent = erro.message;
            }
        });

        acoes.append(concluir, alterar);
        div.append(titulo, detalhes, acoes);
        lista.appendChild(div);
    });
}

formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const prioridade = Number(
        document.getElementById("prioridade").value
    );

    try {
        cadastrarTarefa(titulo, prioridade);
        mensagem.textContent = "Tarefa cadastrada com sucesso!";
        formulario.reset();
        renderizarTarefas();
    } catch (erro) {
        mensagem.textContent = erro.message;
    }
});

renderizarTarefas();
