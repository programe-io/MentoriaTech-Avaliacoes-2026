
// Lista de tarefas
let tarefas = [];

function adicionarTarefa() {
    let tarefa = prompt("Digite uma nova tarefa:");

        if (tarefa && tarefa.trim() !== "") {
                tarefas.push(tarefa);

                        alert("Tarefa adicionada com sucesso! ✅");
                            } else {
                                    alert("Digite uma tarefa válida!");
                                        }
                                        }

                                        function mostrarTarefas() {
                                            if (tarefas.length === 0) {
                                                    alert("Sua lista está vazia!");
                                                        } else {
                                                                alert("Suas tarefas:\n" + tarefas.join("\n"));
                                                                    }
                                                                    }

                                                                    function removerTarefa() {
                                                                        let numero = Number(
                                                                                prompt("Qual tarefa deseja remover? Digite o número:")
                                                                                    );

                                                                                        if (numero >= 1 && numero <= tarefas.length) {
                                                                                                tarefas.splice(numero - 1, 1);
                                                                                                        alert("Tarefa removida! 🗑️");
                                                                                                            } else {
                                                                                                                    alert("Número inválido!");
                                                                                                                        }
                                                                                                                        }

                                                                                                                        // Menu principal
                                                                                                                        function iniciar() {
                                                                                                                            let opcao = "";

                                                                                                                                while (opcao !== "4") {
                                                                                                                                        opcao = prompt(
                                                                                                                                                    "📋 LISTA DE TAREFAS\n\n" +
                                                                                                                                                                "1 - Adicionar tarefa\n" +
                                                                                                                                                                            "2 - Mostrar tarefas\n" +
                                                                                                                                                                                        "3 - Remover tarefa\n" +
                                                                                                                                                                                                    "4 - Sair"
                                                                                                                                                                                                            );

                                                                                                                                                                                                                    if (opcao === "1") {
                                                                                                                                                                                                                                adicionarTarefa();
                                                                                                                                                                                                                                        } else if (opcao === "2") {
                                                                                                                                                                                                                                                    mostrarTarefas();
                                                                                                                                                                                                                                                            } else if (opcao === "3") {
                                                                                                                                                                                                                                                                        removerTarefa();
                                                                                                                                                                                                                                                                                } else if (opcao !== "4") {
                                                                                                                                                                                                                                                                                            alert("Opção inválida!");
                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                            alert("Até logo! 👋");
                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                            iniciar();
                                                                                                                                                                                                                                                                                                            