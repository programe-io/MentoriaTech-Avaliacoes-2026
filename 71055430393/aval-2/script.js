// ==========================================================
// GERENCIADOR DE TAREFAS - PROJETO JAVASCRIPT
// ==========================================================

// Criação do terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// ==========================================================
// ARRAY PRINCIPAL
// ==========================================================

// Todas as tarefas serão armazenadas neste array
const tarefas = [];

// Código da próxima tarefa
let proximoCodigo = 1;


// ==========================================================
// FUNÇÃO PARA FAZER PERGUNTAS NO TERMINAL
// ==========================================================

function perguntar(pergunta) {
    return new Promise((resolve) => {
        rl.question(pergunta, (resposta) => {
            resolve(resposta);
        });
    });
}


// ==========================================================
// FUNÇÃO PARA VALIDAR OS DADOS DA TAREFA
// ==========================================================

function validarDadosDaTarefa(titulo, prioridade) {

    // Verifica se o título possui pelo menos 5 caracteres
    if (titulo.trim().length < 5) {
        throw new Error(
            "O título deve possuir no mínimo 5 caracteres."
        );
    }

    // Verifica se a prioridade é um número
    if (!Number.isInteger(prioridade)) {
        throw new Error(
            "A prioridade deve ser um número inteiro."
        );
    }

    // Verifica se a prioridade está entre 1 e 3
    if (prioridade < 1 || prioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }
}


// ==========================================================
// FUNÇÃO PARA CADASTRAR UMA TAREFA
// ==========================================================

function cadastrarTarefa(titulo, prioridade) {

    // Validação dos dados
    validarDadosDaTarefa(titulo, prioridade);

    // Criação do objeto da tarefa
    const tarefa = {
        codigo: proximoCodigo,
        titulo: titulo.trim(),
        prioridade: prioridade,
        status: true
    };

    // Adiciona a tarefa ao array
    tarefas.push(tarefa);

    // Aumenta o código para a próxima tarefa
    proximoCodigo++;

    return tarefa;
}


// ==========================================================
// FUNÇÃO PARA LISTAR TODAS AS TAREFAS
// ==========================================================

function listarTarefas() {

    console.log("\n==========================================");
    console.log("          TODAS AS TAREFAS");
    console.log("==========================================");

    if (tarefas.length === 0) {
        console.log("Nenhuma tarefa cadastrada.");
        return;
    }

    tarefas.forEach((tarefa) => {

        console.log("------------------------------------------");
        console.log("Código: " + tarefa.codigo);
        console.log("Título: " + tarefa.titulo);
        console.log(
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomeDaPrioridade(tarefa.prioridade)
        );

        if (tarefa.status === true) {
            console.log("Status: EM ANDAMENTO");
        } else {
            console.log("Status: CONCLUÍDA");
        }
    });

    console.log("------------------------------------------");
}


// ==========================================================
// FUNÇÃO PARA BUSCAR UMA TAREFA PELO CÓDIGO
// ==========================================================

function buscarTarefa(codigo) {

    const tarefa = tarefas.find(
        (tarefa) => tarefa.codigo === codigo
    );

    // Caso não encontre a tarefa
    if (!tarefa) {
        throw new Error(
            "Nenhuma tarefa foi encontrada com esse código."
        );
    }

    return tarefa;
}


// ==========================================================
// FUNÇÃO PARA CONCLUIR UMA TAREFA
// ==========================================================

function concluirTarefa(codigo) {

    const tarefa = buscarTarefa(codigo);

    // Verifica se a tarefa já está concluída
    if (tarefa.status === false) {
        throw new Error(
            "Essa tarefa já está concluída."
        );
    }

    // Altera o status
    tarefa.status = false;

    console.log("\nTarefa concluída com sucesso!");
    console.log("Tarefa: " + tarefa.titulo);
}


// ==========================================================
// FUNÇÃO PARA ALTERAR A PRIORIDADE
// ==========================================================

function alterarPrioridade(codigo, novaPrioridade) {

    const tarefa = buscarTarefa(codigo);

    // Valida a nova prioridade
    if (!Number.isInteger(novaPrioridade)) {
        throw new Error(
            "A prioridade deve ser um número inteiro."
        );
    }

    if (novaPrioridade < 1 || novaPrioridade > 3) {
        throw new Error(
            "A prioridade deve estar entre 1 e 3."
        );
    }

    // Altera a prioridade
    tarefa.prioridade = novaPrioridade;

    console.log("\nPrioridade alterada com sucesso!");
    console.log(
        "Nova prioridade: " +
        novaPrioridade +
        " - " +
        nomeDaPrioridade(novaPrioridade)
    );
}


// ==========================================================
// FUNÇÃO PARA MOSTRAR TAREFAS EM ANDAMENTO
// ==========================================================

function mostrarTarefasEmAndamento() {

    console.log("\n==========================================");
    console.log("          TAREFAS EM ANDAMENTO");
    console.log("==========================================");

    const tarefasEmAndamento = tarefas.filter(
        (tarefa) => tarefa.status === true
    );

    if (tarefasEmAndamento.length === 0) {
        console.log("Nenhuma tarefa está em andamento.");
        return;
    }

    tarefasEmAndamento.forEach((tarefa) => {

        console.log("------------------------------------------");
        console.log("Código: " + tarefa.codigo);
        console.log("Título: " + tarefa.titulo);
        console.log(
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomeDaPrioridade(tarefa.prioridade)
        );
        console.log("Status: EM ANDAMENTO");
    });

    console.log("------------------------------------------");
}


// ==========================================================
// FUNÇÃO PARA MOSTRAR TAREFAS CONCLUÍDAS
// ==========================================================

function mostrarTarefasConcluidas() {

    console.log("\n==========================================");
    console.log("          TAREFAS CONCLUÍDAS");
    console.log("==========================================");

    const tarefasConcluidas = tarefas.filter(
        (tarefa) => tarefa.status === false
    );

    if (tarefasConcluidas.length === 0) {
        console.log("Nenhuma tarefa foi concluída.");
        return;
    }

    tarefasConcluidas.forEach((tarefa) => {

        console.log("------------------------------------------");
        console.log("Código: " + tarefa.codigo);
        console.log("Título: " + tarefa.titulo);
        console.log(
            "Prioridade: " +
            tarefa.prioridade +
            " - " +
            nomeDaPrioridade(tarefa.prioridade)
        );
        console.log("Status: CONCLUÍDA");
    });

    console.log("------------------------------------------");
}


// ==========================================================
// FUNÇÃO PARA MOSTRAR O NOME DA PRIORIDADE
// ==========================================================

function nomeDaPrioridade(prioridade) {

    if (prioridade === 1) {
        return "ALTA";
    }

    if (prioridade === 2) {
        return "MÉDIA";
    }

    if (prioridade === 3) {
        return "BAIXA";
    }

    return "INVÁLIDA";
}


// ==========================================================
// FUNÇÃO PARA MOSTRAR UMA TAREFA ESPECÍFICA
// ==========================================================

function exibirTarefa(tarefa) {

    console.log("\n==========================================");
    console.log("            TAREFA ENCONTRADA");
    console.log("==========================================");

    console.log("Código: " + tarefa.codigo);
    console.log("Título: " + tarefa.titulo);

    console.log(
        "Prioridade: " +
        tarefa.prioridade +
        " - " +
        nomeDaPrioridade(tarefa.prioridade)
    );

    if (tarefa.status === true) {
        console.log("Status: EM ANDAMENTO");
    } else {
        console.log("Status: CONCLUÍDA");
    }

    console.log("==========================================");
}


// ==========================================================
// MENU PRINCIPAL
// ==========================================================

async function menu() {

    let executando = true;

    while (executando) {

        console.log("\n");
        console.log("==========================================");
        console.log("       GERENCIADOR DE TAREFAS");
        console.log("==========================================");
        console.log("1 - Cadastrar nova tarefa");
        console.log("2 - Listar todas as tarefas");
        console.log("3 - Buscar tarefa pelo código");
        console.log("4 - Marcar tarefa como concluída");
        console.log("5 - Alterar prioridade da tarefa");
        console.log("6 - Mostrar tarefas em andamento");
        console.log("7 - Mostrar tarefas concluídas");
        console.log("0 - Sair");
        console.log("==========================================");

        const opcao = (
            await perguntar("Digite uma opção: ")
        ).trim();

        try {

            // ==================================================
            // OPÇÃO 1 - CADASTRAR
            // ==================================================

            if (opcao === "1") {

                console.log("\n==========================================");
                console.log("           CADASTRAR TAREFA");
                console.log("==========================================");

                const titulo = await perguntar(
                    "Digite o título da tarefa: "
                );

                const prioridadeTexto = await perguntar(
                    "Digite a prioridade (1 = alta, 2 = média, 3 = baixa): "
                );

                const prioridade = Number(
                    prioridadeTexto.trim()
                );

                const tarefa = cadastrarTarefa(
                    titulo,
                    prioridade
                );

                console.log("\nTarefa cadastrada com sucesso!");
                console.log("Código gerado: " + tarefa.codigo);
                console.log("Título: " + tarefa.titulo);
                console.log(
                    "Prioridade: " +
                    tarefa.prioridade +
                    " - " +
                    nomeDaPrioridade(tarefa.prioridade)
                );
                console.log("Status: EM ANDAMENTO");
            }


            // ==================================================
            // OPÇÃO 2 - LISTAR
            // ==================================================

            else if (opcao === "2") {

                listarTarefas();
            }


            // ==================================================
            // OPÇÃO 3 - BUSCAR
            // ==================================================

            else if (opcao === "3") {

                const codigoTexto = await perguntar(
                    "\nDigite o código da tarefa: "
                );

                const codigo = Number(
                    codigoTexto.trim()
                );

                if (!Number.isInteger(codigo)) {
                    throw new Error(
                        "O código deve ser um número inteiro."
                    );
                }

                const tarefa = buscarTarefa(codigo);

                exibirTarefa(tarefa);
            }


            // ==================================================
            // OPÇÃO 4 - CONCLUIR
            // ==================================================

            else if (opcao === "4") {

                const codigoTexto = await perguntar(
                    "\nDigite o código da tarefa que deseja concluir: "
                );

                const codigo = Number(
                    codigoTexto.trim()
                );

                if (!Number.isInteger(codigo)) {
                    throw new Error(
                        "O código deve ser um número inteiro."
                    );
                }

                concluirTarefa(codigo);
            }


            // ==================================================
            // OPÇÃO 5 - ALTERAR PRIORIDADE
            // ==================================================

            else if (opcao === "5") {

                const codigoTexto = await perguntar(
                    "\nDigite o código da tarefa: "
                );

                const codigo = Number(
                    codigoTexto.trim()
                );

                if (!Number.isInteger(codigo)) {
                    throw new Error(
                        "O código deve ser um número inteiro."
                    );
                }

                const prioridadeTexto = await perguntar(
                    "Digite a nova prioridade (1 = alta, 2 = média, 3 = baixa): "
                );

                const novaPrioridade = Number(
                    prioridadeTexto.trim()
                );

                alterarPrioridade(
                    codigo,
                    novaPrioridade
                );
            }


            // ==================================================
            // OPÇÃO 6 - TAREFAS EM ANDAMENTO
            // ==================================================

            else if (opcao === "6") {

                mostrarTarefasEmAndamento();
            }


            // ==================================================
            // OPÇÃO 7 - TAREFAS CONCLUÍDAS
            // ==================================================

            else if (opcao === "7") {

                mostrarTarefasConcluidas();
            }


            // ==================================================
            // OPÇÃO 0 - SAIR
            // ==================================================

            else if (opcao === "0") {

                console.log("\n==========================================");
                console.log("Programa encerrado.");
                console.log("==========================================");

                executando = false;
            }


            // ==================================================
            // OPÇÃO INVÁLIDA
            // ==================================================

            else {

                console.log(
                    "\nOpção inválida. Escolha uma opção do menu."
                );
            }

        } catch (erro) {

            console.log("\nERRO: " + erro.message);
        }
    }

    rl.close();
}


// ==========================================================
// INÍCIO DO PROGRAMA
// ==========================================================
