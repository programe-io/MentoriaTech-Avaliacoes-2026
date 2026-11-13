
// Recupera as tarefas salvas no navegador
let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

// Gera códigos automáticos
let proximoCodigo = tarefas.length > 0
    ? Math.max(...tarefas.map(t => t.codigo)) + 1
    : 1;

// Elementos da página
const formulario = document.getElementById("formTarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const mensagem = document.getElementById("mensagem");

// Salvar tarefas no navegador
function salvarTarefas() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

// Cadastrar uma nova tarefa
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const titulo = campoTitulo.value.trim();
    const prioridade = Number(campoPrioridade.value);

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem("O título deve ter no mínimo 5 caracteres!", "red");
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem("A prioridade deve ser 1, 2 ou 3!", "red");
        return;
    }

    const novaTarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(novaTarefa);
    proximoCodigo++;

    salvarTarefas();
    listarTarefas();

    formulario.reset();
    campoPrioridade.value = "2";

    mostrarMensagem("Tarefa cadastrada com sucesso!", "green");
});

// Exibir mensagens
function mostrarMensagem(texto, cor) {
    mensagem.textContent = texto;
    mensagem.style.color = cor;
}

// Listar tarefas na tela
function listarTarefas() {
    const lista = document.getElementById("listaTarefas");

    lista.replaceChildren();

    if (tarefas.length === 0) {
        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhuma tarefa cadastrada.";
        lista.appendChild(vazio);
    }

    tarefas.forEach(function(tarefa) {
        const div = document.createElement("div");
        div.className = "tarefa";

        if (tarefa.concluida) {
            div.classList.add("concluida");
        }

        const titulo = document.createElement("h3");
        titulo.textContent = tarefa.titulo;

        const codigo = document.createElement("p");
        codigo.textContent = "Código: " + tarefa.codigo;

        const prioridadeTexto = document.createElement("p");
        prioridadeTexto.textContent =
            "Prioridade: " + nomePrioridade(tarefa.prioridade);

        const status = document.createElement("p");
        status.textContent = tarefa.concluida
            ? "Status: Concluída"
            : "Status: Pendente";

        // Seleção para alterar prioridade
        const seletor = document.createElement("select");

        for (let i = 1; i <= 3; i++) {
            const opcao = document.createElement("option");
            opcao.value = i;
            opcao.textContent = nomePrioridade(i);
            seletor.appendChild(opcao);
        }

        seletor.value = tarefa.prioridade;

        const botaoAlterar = document.createElement("button");
        botaoAlterar.textContent = "Alterar prioridade";

        botaoAlterar.addEventListener("click", function() {
            alterarPrioridade(tarefa.codigo, seletor.value);
        });

        // Botão para concluir
        const botaoConcluir = document.createElement("button");

        botaoConcluir.className = "botao-concluir";
        botaoConcluir.textContent = tarefa.concluida
            ? "Tarefa concluída"
            : "Marcar como concluída";

        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.addEventListener("click", function() {
            concluirTarefa(tarefa.codigo);
        });

        const acoes = document.createElement("div");
        acoes.className = "acoes";

        acoes.append(seletor, botaoAlterar, botaoConcluir);

        div.append(
            titulo,
            codigo,
            prioridadeTexto,
            status,
            acoes
        );

        lista.appendChild(div);
    });

    atualizarResumo();
}

// Traduzir número da prioridade
function nomePrioridade(valor) {
    const prioridades = {
        1: "1 - Alta",
        2: "2 - Média",
        3: "3 - Baixa"
    };

    return prioridades[valor];
}

// Marcar tarefa como concluída
function concluirTarefa(codigo) {
    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.concluida = true;
        salvarTarefas();
        listarTarefas();
    }
}

// Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    novaPrioridade = Number(novaPrioridade);

    if (![1, 2, 3].includes(novaPrioridade)) {
        mostrarMensagem("Prioridade inválida!", "red");
        return;
    }

    const tarefa = tarefas.find(t => t.codigo === codigo);

    if (tarefa) {
        tarefa.prioridade = novaPrioridade;
        salvarTarefas();
        listarTarefas();

        mostrarMensagem("Prioridade alterada com sucesso!", "green");
    }
}

// Atualizar os números do resumo
function atualizarResumo() {
    document.getElementById("total").textContent = tarefas.length;

    document.getElementById("pendentes").textContent =
        tarefas.filter(t => !t.concluida).length;

    document.getElementById("concluidas").textContent =
        tarefas.filter(t => t.concluida).length;
}

// Mostrar tarefas ao abrir a página
listarTarefas();
