
// ==========================================
// GERENCIADOR DE TAREFAS
// ==========================================

// Lista de tarefas
const tarefas = [];

// Contador de códigos
let proximoCodigo = 1;

// ==========================================
// 1. CADASTRAR TAREFA
// ==========================================

function cadastrarTarefa(titulo, prioridade) {

    if (!titulo || titulo.trim() === "") {
        throw new Error("O título da tarefa é obrigatório");
    }

    if (![1, 2, 3].includes(prioridade)) {
        throw new Error("Prioridade inválida. Use 1, 2 ou 3");
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo,
        prioridade: prioridade,
        status: true
    };

    tarefas.push(tarefa);

    console.log("Tarefa cadastrada com sucesso!");

    return tarefa;
}

// ==========================================
// 2. BUSCAR TAREFA
// ==========================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        tarefa => tarefa.codigo === codigo
    );

    if (!tarefa) {
        console.log("Tarefa não encontrada");
        return null;
    }

    return tarefa;
}

// ==========================================
// 3. LISTAR TAREFAS
// ==========================================

function listarTarefas() {

    return tarefas;
}

// ==========================================
// 4. CONCLUIR TAREFA
// ==========================================

function concluirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    if (tarefa.status === false) {
        console.log("Esta tarefa já foi concluída");
        return;
    }

    tarefa.status = false;

    console.log("Tarefa concluída com sucesso!");
}

// ==========================================
// 5. REABRIR TAREFA
// ==========================================

function reabrirTarefa(codigo) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    tarefa.status = true;

    console.log("Tarefa reaberta com sucesso!");
}

// ==========================================
// 6. EDITAR TAREFA
// ==========================================

function editarTarefa(codigo, novoTitulo, novaPrioridade) {

    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        throw new Error("Tarefa não encontrada");
    }

    if (!novoTitulo || novoTitulo.trim() === "") {
        throw new Error("O título não pode ficar vazio");
    }

    if (![1, 2, 3].includes(novaPrioridade)) {
        throw new Error("Prioridade inválida");
    }

    tarefa.titulo = novoTitulo;
    tarefa.prioridade = novaPrioridade;

    console.log("Tarefa atualizada com sucesso!");
}

// ==========================================
// 7. EXCLUIR TAREFA
// ==========================================

function excluirTarefa(codigo) {

    const indice = tarefas.findIndex(
        tarefa => tarefa.codigo === codigo
    );

    if (indice === -1) {
        throw new Error("Tarefa não encontrada");
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// ==========================================
// 8. FILTRAR TAREFAS PENDENTES
// ==========================================

function listarPendentes() {

    return tarefas.filter(
        tarefa => tarefa.status === true
    );
}

// ==========================================
// 9. FILTRAR TAREFAS CONCLUÍDAS
// ==========================================

function listarConcluidas() {

    return tarefas.filter(
        tarefa => tarefa.status === false
    );
}

// ==========================================
// 10. FILTRAR POR PRIORIDADE
// ==========================================

function filtrarPorPrioridade(prioridade) {

    return tarefas.filter(
        tarefa => tarefa.prioridade === prioridade
    );
}

// ==========================================
// 11. PESQUISAR POR TÍTULO
// ==========================================

function pesquisarTarefa(palavra) {

    return tarefas.filter(
        tarefa => tarefa.titulo
            .toLowerCase()
            .includes(palavra.toLowerCase())
    );
}

// ==========================================
// 12. CONTAR TAREFAS
// ==========================================

function contarTarefas() {

    const total = tarefas.length;

    const pendentes = listarPendentes().length;

    const concluidas = listarConcluidas().length;

    console.log("===== RESUMO DAS TAREFAS =====");
    console.log("Total:", total);
    console.log("Pendentes:", pendentes);
    console.log("Concluídas:", concluidas);

    return {
        total,
        pendentes,
        concluidas
    };
}

// ==========================================
// 13. EXIBIR RELATÓRIO COMPLETO
// ==========================================

function gerarRelatorio() {

    console.log("================================");
    console.log("     GERENCIADOR DE TAREFAS");
    console.log("================================");

    tarefas.forEach(tarefa => {

        console.log("-------------------------------");

        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);

        console.log(
            "Prioridade:",
            tarefa.prioridade === 1 ? "Baixa" :
            tarefa.prioridade === 2 ? "Média" : "Alta"
        );

        console.log(
            "Status:",
            tarefa.status ? "Pendente" : "Concluída"
        );
    });

    console.log("-------------------------------");

    contarTarefas();

    console.log("================================");
}

// ==========================================
// 14. TESTES DO SISTEMA
// ==========================================

// Cadastrar tarefas
cadastrarTarefa("Cadastrar Clientes", 1);
cadastrarTarefa("Limpar banco de dados", 3);
cadastrarTarefa("Desenvolver sistema", 2);
cadastrarTarefa("Enviar relatório", 1);

// Concluir tarefa
concluirTarefa(2);

// Editar tarefa
editarTarefa(3, "Desenvolver sistema web", 3);

// Listar todas as tarefas
console.log("TODAS AS TAREFAS:");
console.log(listarTarefas());

// Listar pendentes
console.log("TAREFAS PENDENTES:");
console.log(listarPendentes());

// Listar concluídas
console.log("TAREFAS CONCLUÍDAS:");
console.log(listarConcluidas());

// Buscar tarefa
console.log("BUSCAR TAREFA:");
console.log(buscarTarefa(1));

// Pesquisar pelo título
console.log("PESQUISA:");
console.log(pesquisarTarefa("relatório"));

// Gerar relatório
gerarRelatorio();
