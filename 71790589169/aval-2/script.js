
// Lista de tarefas
let tarefas = [];

// Código automático
let proximoCodigo = 1;


// 1. Cadastrar uma nova tarefa
function cadastrarTarefa() {

    let titulo = document.getElementById("titulo").value.trim();

    let prioridade = Number(
        document.getElementById("prioridade").value
    );

    // Validar título
    if (titulo.length < 5) {
        mostrarMensagem(
            "O título deve ter no mínimo 5 caracteres!"
        );
        return;
    }

    // Validar prioridade
    if (![1, 2, 3].includes(prioridade)) {
        mostrarMensagem(
            "A prioridade deve ser 1, 2 ou 3!"
        );
        return;
    }

    // Criar tarefa
    let tarefa = {
        codigo: proximoCodigo,
        titulo: titulo,
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);

    proximoCodigo++;

    document.getElementById("titulo").value = "";

    mostrarMensagem("Tarefa cadastrada com sucesso!");

    listarTarefas();
}


// 2. Listar todas as tarefas
function listarTarefas() {

    let lista = document.getElementById("listaTarefas");

    lista.innerHTML = "";

    if (tarefas.length === 0) {
        lista.textContent = "Nenhuma tarefa cadastrada.";
        return;
    }

    tarefas.forEach(tarefa => {

        let div = document.createElement("div");

        div.className = tarefa.concluida
            ? "tarefa concluida"
            : "tarefa";

        // Título
        let titulo = document.createElement("strong");

        titulo.textContent = tarefa.titulo;

        // Informações
        let informacoes = document.createElement("p");

        informacoes.textContent =
            "Código: " + tarefa.codigo +
            " | Prioridade: " + tarefa.prioridade +
            " | Status: " +
            (tarefa.concluida ? "Concluída" : "Pendente");

        div.appendChild(titulo);
        div.appendChild(informacoes);

        // Área dos botões
        let acoes = document.createElement("div");

        acoes.className = "acoes";

        // Botão concluir
        let botaoConcluir = document.createElement("button");

        botaoConcluir.textContent = "Concluir";

        botaoConcluir.disabled = tarefa.concluida;

        botaoConcluir.onclick = function() {
            concluirTarefa(tarefa.codigo);
        };

        // Botão alterar prioridade
        let botaoPrioridade = document.createElement("button");

        botaoPrioridade.textContent = "Alterar prioridade";

        botaoPrioridade.onclick = function() {
            alterarPrioridade(tarefa.codigo);
        };

        acoes.appendChild(botaoConcluir);
        acoes.appendChild(botaoPrioridade);

        div.appendChild(acoes);

        lista.appendChild(div);

    });
}


// 3. Marcar tarefa como concluída
function concluirTarefa(codigo) {

    let tarefa = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada!");
        return;
    }

    tarefa.concluida = true;

    mostrarMensagem("Tarefa concluída com sucesso!");

    listarTarefas();
}


// 4. Alterar prioridade de uma tarefa
function alterarPrioridade(codigo) {

    let tarefa = tarefas.find(
        t => t.codigo === codigo
    );

    if (!tarefa) {
        mostrarMensagem("Tarefa não encontrada!");
        return;
    }

    let novaPrioridade = Number(
        prompt(
            "Digite a nova prioridade:\n" +
            "1 - Alta\n" +
            "2 - Média\n" +
            "3 - Baixa"
        )
    );

    // Validar prioridade
    if (![1, 2, 3].includes(novaPrioridade)) {
        mostrarMensagem("Prioridade inválida!");
        return;
    }

    tarefa.prioridade = novaPrioridade;

    mostrarMensagem("Prioridade alterada com sucesso!");

    listarTarefas();
}


// Exibir mensagens na tela
function mostrarMensagem(texto) {

    document.getElementById("mensagem").textContent = texto;

}


// Inicializar a lista
listarTarefas();
