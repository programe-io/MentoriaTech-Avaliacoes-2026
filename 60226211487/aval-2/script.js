
let tarefas = [];
let proximoCodigo = 1;

// Cadastrar tarefa
document.getElementById("formTarefa").addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = document.getElementById("titulo").value.trim();
    const prioridade = Number(document.getElementById("prioridade").value);

    if (titulo.length < 5) {
        alert("O título deve ter no mínimo 5 caracteres!");
        return;
    }

    if (![1, 2, 3].includes(prioridade)) {
        alert("A prioridade deve ser 1, 2 ou 3!");
        return;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    this.reset();
    document.getElementById("prioridade").value = "2";

    listarTarefas();
});

// Listar tarefas
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");
    const contador = document.getElementById("contador");

    lista.replaceChildren();
    contador.textContent = "Total de tarefas: " + tarefas.length;

    if (tarefas.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.className = "vazio";
        mensagem.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(mensagem);
        return;
    }

    tarefas.forEach(function(tarefa) {
        const card = document.createElement("div");
        card.className = "tarefa";

        if (tarefa.concluida) {
            card.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridadeTexto = document.createElement("p");
        prioridadeTexto.textContent =
            "Prioridade: " +
            (tarefa.prioridade === 1 ? "Alta" :
             tarefa.prioridade === 2 ? "Média" : "Baixa");

        const status = document.createElement("p");
        status.textContent =
            "Status: " + (tarefa.concluida ? "Concluída" : "Pendente");

        card.append(titulo, codigo, prioridadeTexto, status);

        // Botão para concluir
        const botaoConcluir = document.createElement("button");
        botaoConcluir.type = "button";
        botaoConcluir.className = "btn-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";
        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        card.appendChild(botaoConcluir);

        // Campo para alterar prioridade
        const seletor = document.createElement("select");
        seletor.setAttribute("aria-label", "Nova prioridade");

        [
            { valor: 1, texto: "1 - Alta" },
            { valor: 2, texto: "2 - Média" },
            { valor: 3, texto: "3 - Baixa" }
        ].forEach(function(opcao) {
            const item = document.createElement("option");
            item.value = opcao.valor;
            item.textContent = opcao.texto;
            seletor.appendChild(item);
        });

        seletor.value = String(tarefa.prioridade);

        const botaoAlterar = document.createElement("button");
        botaoAlterar.type = "button";
        botaoAlterar.className = "btn-alterar";
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo, Number(seletor.value));
        });

        card.append(seletor, botaoAlterar);
        lista.appendChild(card);
    });
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;
    listarTarefas();
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = tarefas.find(function(item) {
        return item.codigo === codigo;
    });

    if (!tarefa) {
        alert("Tarefa não encontrada!");
        return;
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        alert("Escolha uma prioridade válida: 1, 2 ou 3.");
        return;
    }

    tarefa.prioridade = novaPrioridade;
    listarTarefas();
}

// Exibir a lista inicial
listarTarefas();
