
let tarefas = [];
let geradorDeCodigo = 0;

// Função para validar os dados da tarefa
function validarDadosDaTarefa(titulo, prioridade) {
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("O título deve ter no mínimo 5 caracteres!");
    }

    if (prioridade < 1 || prioridade > 3) {
        throw new Error("A prioridade deve ser 1, 2 ou 3!");
    }

    return true;
}

// Função para cadastrar uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    try {
        validarDadosDaTarefa(titulo, prioridade);

        geradorDeCodigo++;

        let tarefa = {
            codigo: geradorDeCodigo,
            titulo: titulo.trim(),
            prioridade: prioridade,
            status: false
        };

        tarefas.push(tarefa);

        console.log("Tarefa cadastrada com sucesso!");
        return tarefa;

    } catch (erro) {
        console.log(erro.message);
    }
}

// Função para buscar uma tarefa pelo código
function buscarTarefa(codigo) {
    return tarefas.find(tarefa => tarefa.codigo === Number(codigo));
}

// Função para listar todas as tarefas
function listarTarefas() {
    if (tarefas.length === 0) {
        return "Nenhuma tarefa cadastrada.";
    }

    return tarefas;
}

// Função para alterar a prioridade
function alterarPrioridade(codigo, novaPrioridade) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    try {
        validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

        tarefa.prioridade = novaPrioridade;

        console.log("Prioridade alterada com sucesso!");

    } catch (erro) {
        console.log(erro.message);
    }
}

// Função para alterar o título
function alterarTitulo(codigo, novoTitulo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    try {
        validarDadosDaTarefa(novoTitulo, tarefa.prioridade);

        tarefa.titulo = novoTitulo.trim();

        console.log("Título alterado com sucesso!");

    } catch (erro) {
        console.log(erro.message);
    }
}

// Função para concluir uma tarefa
function concluirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.status = true;

    console.log("Tarefa concluída com sucesso!");
}

// Função para reabrir uma tarefa
function reabrirTarefa(codigo) {
    let tarefa = buscarTarefa(codigo);

    if (!tarefa) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefa.status = false;

    console.log("Tarefa reaberta com sucesso!");
}

// Função para excluir uma tarefa
function excluirTarefa(codigo) {
    let indice = tarefas.findIndex(
        tarefa => tarefa.codigo === Number(codigo)
    );

    if (indice === -1) {
        console.log("Tarefa não encontrada!");
        return;
    }

    tarefas.splice(indice, 1);

    console.log("Tarefa excluída com sucesso!");
}

// Função para pesquisar pelo título
function pesquisarTarefa(palavra) {
    return tarefas.filter(tarefa =>
        tarefa.titulo.toLowerCase().includes(
            palavra.toLowerCase()
        )
    );
}

// Função para listar tarefas pendentes
function listarPendentes() {
    return tarefas.filter(tarefa => tarefa.status === false);
}

// Função para listar tarefas concluídas
function listarConcluidas() {
    return tarefas.filter(tarefa => tarefa.status === true);
}

// Função para ordenar tarefas por prioridade
function ordenarPorPrioridade() {
    return [...tarefas].sort(
        (a, b) => a.prioridade - b.prioridade
    );
}

// Função para mostrar estatísticas
function mostrarEstatisticas() {
    let total = tarefas.length;

    let concluidas = tarefas.filter(
        tarefa => tarefa.status === true
    ).length;

    let pendentes = tarefas.filter(
        tarefa => tarefa.status === false
    ).length;

    console.log("===== ESTATÍSTICAS =====");
    console.log("Total de tarefas:", total);
    console.log("Concluídas:", concluidas);
    console.log("Pendentes:", pendentes);
}

// Função para exibir o menu
function exibirMenu() {
    console.log(`
===== GERENCIADOR DE TAREFAS =====

1 - Cadastrar tarefa
2 - Listar tarefas
3 - Buscar tarefa
4 - Alterar título
5 - Alterar prioridade
6 - Concluir tarefa
7 - Reabrir tarefa
8 - Excluir tarefa
9 - Pesquisar por título
10 - Listar pendentes
11 - Listar concluídas
12 - Ordenar por prioridade
13 - Mostrar estatísticas
0 - Sair

==================================
`);
}

// Executar o sistema
function iniciarSistema() {
    let opcao;

    do {
        exibirMenu();

        opcao = Number(prompt("Escolha uma opção:"));

        switch (opcao) {

            case 1: {
                let titulo = prompt("Digite o título:");
                let prioridade = Number(
                    prompt("Prioridade (1-Alta, 2-Média, 3-Baixa):")
                );

                cadastrarTarefa(titulo, prioridade);
                break;
            }

            case 2:
                console.table(listarTarefas());
                break;

            case 3: {
                let codigo = prompt("Digite o código da tarefa:");
                console.table(buscarTarefa(codigo));
                break;
            }

            case 4: {
                let codigo = prompt("Código da tarefa:");
                let titulo = prompt("Novo título:");

                alterarTitulo(codigo, titulo);
                break;
            }

            case 5: {
                let codigo = prompt("Código da tarefa:");
                let prioridade = Number(prompt("Nova prioridade (1 a 3):"));

                alterarPrioridade(codigo, prioridade);
                break;
            }

            case 6: {
                let codigo = prompt("Código da tarefa:");
                concluirTarefa(codigo);
                break;
            }

            case 7: {
                let codigo = prompt("Código da tarefa:");
                reabrirTarefa(codigo);
                break;
            }

            case 8: {
                let codigo = prompt("Código da tarefa:");
                excluirTarefa(codigo);
                break;
            }

            case 9: {
                let palavra = prompt("Digite o título para pesquisar:");
                console.table(pesquisarTarefa(palavra));
                break;
            }

            case 10:
                console.table(listarPendentes());
                break;

            case 11:
                console.table(listarConcluidas());
                break;

            case 12:
                console.table(ordenarPorPrioridade());
                break;

            case 13:
                mostrarEstatisticas();
                break;

            case 0:
                console.log("Sistema encerrado!");
                break;

            default:
                console.log("Opção inválida!");
        }

    } while (opcao !== 0);
}

// Iniciar o programa
iniciarSistema();
