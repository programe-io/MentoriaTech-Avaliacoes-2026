// Array que armazenará as tarefas
let tarefas = [];

// Elementos do HTML
const form = document.getElementById("taskForm");
const listaTarefas = document.getElementById("listaTarefas");
const mensagem = document.getElementById("mensagem");
const contador = document.getElementById("contador");

// Cadastrar nova tarefa
form.addEventListener("submit", function (event) {
    event.preventDefault();

    const codigo = document.getElementById("codigo").value.trim();
    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    // Validação do título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres.",
            "erro"
        );
        return;
    }

    // Validação da prioridade
    if (prioridade < 1 || prioridade > 3 || isNaN(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser um valor entre 1 e 3.",
            "erro"
        );
        return;
    }

    // Verificar código duplicado
    const codigoExiste = tarefas.some(
        tarefa => tarefa.codigo.toLowerCase() === codigo.toLowerCase()
    );

    if (codigoExiste) {
        mostrarMensagem(
            "Já existe uma tarefa com esse código.",
            "erro"
        );
        return;
    }

    // Criar tarefa
    const novaTarefa = {
        codigo: codigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);

    mostrarMensagem(
        "Tarefa cadastrada com sucesso!",
        "sucesso"
    );

    form.reset();

    renderizarTarefas();
});

// Mostrar mensagem
function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = tipo;

    setTimeout(() => {
        mensagem.textContent = "";
        mensagem.className = "";
    }, 3000);
}

// Retornar texto da prioridade
function nomePrioridade(prioridade) {
    switch (prioridade) {
        case 1:
            return "Alta";
        case 2:
            return "Média";
        case 3:
            return "Baixa";
        default:
            return "Desconhecida";
    }
}

// Retornar classe da prioridade
function classePrioridade(prioridade) {
    switch (prioridade) {
        case 1:
            return "alta";
        case 2:
            return "media";
        case 3:
            return "baixa";
        default:
            return "";
    }
}

// Listar tarefas
function renderizarTarefas() {
    listaTarefas.innerHTML = "";

    if (tarefas.length === 0) {
        listaTarefas.innerHTML = `
            <div class="vazia">
                Nenhuma tarefa cadastrada.
            </div>
        `;

        contador.textContent = "0 tarefas";
        return;
    }

    tarefas.forEach((tarefa, index) => {

        const div = document.createElement("div");

        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        div.innerHTML = `
            <div class="tarefa-topo">

                <div>
                    <div class="titulo">
                        ${tarefa.titulo}
                    </div>

                    <div class="codigo">
                        Código: ${tarefa.codigo}
                    </div>
                </div>

                <div class="info">
                    <span class="prioridade ${classePrioridade(tarefa.prioridade)}">
                        Prioridade ${tarefa.prioridade} - 
                        ${nomePrioridade(tarefa.prioridade)}
                    </span>

                    <span>
                        ${tarefa.concluida ? "✅ Concluída" : "⏳ Pendente"}
                    </span>
                </div>

            </div>

            <div class="acoes">

                <button 
                    class="btn-concluir"
                    onclick="alternarConclusao(${index})">
                    ${tarefa.concluida ? "Reabrir tarefa" : "Marcar como concluída"}
                </button>

                <button 
                    class="btn-prioridade"
                    onclick="alterarPrioridade(${index})">
                    Alterar prioridade
                </button>

            </div>
        `;

        listaTarefas.appendChild(div);
    });

    contador.textContent =
        tarefas.length === 1
            ? "1 tarefa"
            : `${tarefas.length} tarefas`;
}

// Marcar/desmarcar tarefa como concluída
function alternarConclusao(index) {
    tarefas[index].concluida = !tarefas[index].concluida;

    renderizarTarefas();
}

// Alterar prioridade
function alterarPrioridade(index) {
    let novaPrioridade = prompt(
        "Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
    );

    if (novaPrioridade === null) {
        return;
    }

    novaPrioridade = Number(novaPrioridade);

    if (
        isNaN(novaPrioridade) ||
        novaPrioridade < 1 ||
        novaPrioridade > 3 ||
        !Number.isInteger(novaPrioridade)
    ) {
        alert("A prioridade deve ser um valor inteiro entre 1 e 3.");
        return;
    }

    tarefas[index].prioridade = novaPrioridade;

    renderizarTarefas();
}

// Renderização inicial
renderizarTarefas();