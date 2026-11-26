
let tarefas = [];
let codigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5)
        throw new Error("Título deve ter 5 caracteres!");

    if (prioridade < 1 || prioridade > 3)
        throw new Error("Prioridade deve ser de 1 a 3!");
}

function cadastrarTarefa(titulo, prioridade) {
    validarDadosDaTarefa(titulo, prioridade);

    tarefas.push({
        codigo: ++codigo,
        titulo,
        prioridade,
        status: true
    });

    listarTarefas();
}

function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    lista.innerHTML = "";

    tarefas.forEach(tarefa => {
        const item = document.createElement("li");

        const texto = document.createElement("span");
        texto.textContent = `${tarefa.codigo} - ${tarefa.titulo} | Prioridade: ${tarefa.prioridade} | ${tarefa.status ? "Pendente" : "Concluída"}`;

        if (!tarefa.status) texto.classList.add("concluida");

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        const concluir = document.createElement("button");
        concluir.textContent = "Concluir";
        concluir.onclick = () => {
            try {
                concluirTarefa(tarefa.codigo);
            } catch (erro) {
                alert(erro.message);
            }
        };

        const alterar = document.createElement("button");
        alterar.textContent = "Prioridade";
        alterar.onclick = () => {
            try {
                const nova = Number(prompt("Nova prioridade (1 a 3):"));
                alterarPrioridade(tarefa.codigo, nova);
            } catch (erro) {
                alert(erro.message);
            }
        };

        acoes.append(concluir, alterar);
        item.append(texto, acoes);
        lista.appendChild(item);
    });
}

function buscarTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (!tarefa)
        throw new Error("Tarefa não encontrada!");

    return tarefa;
}

function concluirTarefa(codigo) {
    const tarefa = buscarTarefa(codigo);

    if (!tarefa.status)
        throw new Error("Tarefa já concluída!");

    tarefa.status = false;
    listarTarefas();
}

function alterarPrioridade(codigo, prioridade) {
    const tarefa = buscarTarefa(codigo);

    validarDadosDaTarefa(tarefa.titulo, prioridade);

    tarefa.prioridade = prioridade;
    listarTarefas();
}

document.getElementById("formTarefa").addEventListener("submit", function(e) {
    e.preventDefault();

    try {
        cadastrarTarefa(
            document.getElementById("titulo").value.trim(),
            Number(document.getElementById("prioridade").value)
        );

        this.reset();
    } catch (erro) {
        alert(erro.message);
    }
});
