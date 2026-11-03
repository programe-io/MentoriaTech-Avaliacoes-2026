const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let tarefas = [];
let codigo = 1;

function perguntar(texto) {
    return new Promise(resolve => {
        rl.question(texto, resposta => resolve(resposta));
    });
}

async function menu() {
    while (true) {
        console.log("\n===== SISTEMA DE TAREFAS =====");
        console.log("1 - Cadastrar tarefa");
        console.log("2 - Listar tarefas");
        console.log("3 - Concluir tarefa");
        console.log("4 - Alterar prioridade");
        console.log("5 - Sair");

        let opcao = await perguntar("Escolha: ");

        if (opcao === "1") {
            let titulo = await perguntar("Título: ");

            if (titulo.length < 5) {
                console.log("Título deve ter no mínimo 5 caracteres!");
                continue;
            }

            let prioridade = Number(await perguntar("Prioridade (1-Alta, 2-Média, 3-Baixa): "));

            if (prioridade < 1 || prioridade > 3 || !Number.isInteger(prioridade)) {
                console.log("Prioridade inválida!");
                continue;
            }

            tarefas.push({
                codigo: codigo++,
                titulo: titulo,
                prioridade: prioridade,
                status: "Pendente"
            });

            console.log("Tarefa cadastrada!");

        } else if (opcao === "2") {

            if (tarefas.length === 0) {
                console.log("Nenhuma tarefa cadastrada.");
            }

            tarefas.forEach(t => {
                console.log(
                    `Código: ${t.codigo} | Título: ${t.titulo} | Prioridade: ${t.prioridade} | Status: ${t.status}`
                );
            });

        } else if (opcao === "3") {

            let id = Number(await perguntar("Código da tarefa: "));
            let tarefa = tarefas.find(t => t.codigo === id);

            if (tarefa) {
                tarefa.status = "Concluída";
                console.log("Tarefa concluída!");
            } else {
                console.log("Tarefa não encontrada!");
            }

        } else if (opcao === "4") {

            let id = Number(await perguntar("Código da tarefa: "));
            let tarefa = tarefas.find(t => t.codigo === id);

            if (tarefa) {
                let nova = Number(await perguntar("Nova prioridade (1 a 3): "));

                if (nova >= 1 && nova <= 3 && Number.isInteger(nova)) {
                    tarefa.prioridade = nova;
                    console.log("Prioridade alterada!");
                } else {
                    console.log("Prioridade inválida!");
                }
            } else {
                console.log("Tarefa não encontrada!");
            }

        } else if (opcao === "5") {
            console.log("Sistema encerrado!");
            break;

        } else {
            console.log("Opção inválida!");
        }
    }

    rl.close();
}

menu();