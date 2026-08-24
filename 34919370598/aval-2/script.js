let tarefas = [];
let proximoCodigo = 1;

function validarTitulo(titulo) {
    return typeof titulo === "string" && titulo.trim().length >= 5;
}

function validarPrioridade(prioridade) {
    return Number.isInteger(prioridade) && prioridade >= 1 && prioridade <= 3;
}

function cadastrarTarefa(titulo, prioridade) {
    if (!validarTitulo(titulo)) {
        console.log("Erro: o título deve ter no mínimo 5 caracteres.");
        return null;
    }
    if (!validarPrioridade(prioridade)) {
        console.log("Erro: a prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return null;
    }

    const tarefa = {
        codigo: proximoCodigo++,
        titulo: titulo.trim(),
        prioridade: prioridade,
        concluida: false
    };

    tarefas.push(tarefa);
    console.log(`Tarefa "${tarefa.titulo}" cadastrada com sucesso! (código ${tarefa.codigo})`);
    return tarefa;
}

function listarTarefas() {
    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    const rotuloPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

    console.log("\n===== TAREFAS CADASTRADAS =====");
    tarefas.forEach((tarefa) => {
        console.log("Código:", tarefa.codigo);
        console.log("Título:", tarefa.titulo);
        console.log("Prioridade:", rotuloPrioridade[tarefa.prioridade]);
        console.log("Status:", tarefa.concluida ? "Concluída" : "Pendente");
        console.log("-----------------------------");
    });
}

function buscarTarefa(codigo) {
    return tarefas.find((tarefa) => tarefa.codigo === codigo);
}

function marcarComoConcluida(codigo) {
    const tarefa = buscarTarefa(codigo);
    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return false;
    }

    tarefa.concluida = true;
    console.log(`Tarefa "${tarefa.titulo}" marcada como concluída!`);
    return true;
}

function alterarPrioridade(codigo, novaPrioridade) {
    const tarefa = buscarTarefa(codigo);
    if (!tarefa) {
        console.log("Tarefa não encontrada.");
        return false;
    }
    if (!validarPrioridade(novaPrioridade)) {
        console.log("Erro: a prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
        return false;
    }

    tarefa.prioridade = novaPrioridade;
    console.log(`Prioridade da tarefa "${tarefa.titulo}" alterada com sucesso!`);
    return true;
}

// ===== menu interativo (via prompt, para rodar no navegador) =====
function iniciarMenu() {
    let opcao;
    do {
        console.log("\n===== GERENCIADOR DE TAREFAS =====");
        console.log("1 - Cadastrar tarefa");
        console.log("2 - Listar tarefas");
        console.log("3 - Marcar tarefa como concluída");
        console.log("4 - Alterar prioridade de uma tarefa");
        console.log("0 - Sair");
        opcao = prompt("Escolha uma opção:");

        switch (opcao) {
            case "1": {
                const titulo = prompt("Digite o título da tarefa (mín. 5 caracteres):");
                const prioridade = Number(prompt("Digite a prioridade (1-alta, 2-média, 3-baixa):"));
                cadastrarTarefa(titulo, prioridade);
                break;
            }
            case "2":
                listarTarefas();
                break;
            case "3": {
                const codigo = Number(prompt("Digite o código da tarefa:"));
                marcarComoConcluida(codigo);
                break;
            }
            case "4": {
                const codigo = Number(prompt("Digite o código da tarefa:"));
                const novaPrioridade = Number(prompt("Digite a nova prioridade (1-alta, 2-média, 3-baixa):"));
                alterarPrioridade(codigo, novaPrioridade);
                break;
            }
            case "0":
                console.log("Sistema encerrado.");
                break;
            default:
                console.log("Opção inválida!");
        }
    } while (opcao !== "0");
}

// Descomente a linha abaixo para rodar o menu num ambiente com prompt() (navegador)
// iniciarMenu();

module.exports = {
    cadastrarTarefa,
    listarTarefas,
    marcarComoConcluida,
    alterarPrioridade,
    validarTitulo,
    validarPrioridade
};