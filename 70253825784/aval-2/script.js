
let tarefas = JSON.parse(
    localStorage.getItem("tarefas") || "[]"
    );

    function salvar() {
        localStorage.setItem(
                "tarefas",
                        JSON.stringify(tarefas)
                            );
                            }

                            function adicionarTarefa() {

                                let nome = document.getElementById("tarefa").value;
                                    let data = document.getElementById("data").value;
                                        let prioridade = document.getElementById("prioridade").value;

                                            if (nome === "" || data === "" || prioridade === "") {
                                                    alert("Preencha todos os campos!");
                                                            return;
                                                                }

                                                                    let novaTarefa = {
                                                                            nome: nome,
                                                                                    data: data,
                                                                                            prioridade: prioridade,
                                                                                                    concluida: false
                                                                                                        };

                                                                                                            tarefas.push(novaTarefa);

                                                                                                                salvar();
                                                                                                                    mostrarTarefas();

                                                                                                                        document.getElementById("tarefa").value = "";
                                                                                                                            document.getElementById("data").value = "";
                                                                                                                                document.getElementById("prioridade").value = "";
                                                                                                                                }

                                                                                                                                function mostrarTarefas() {

                                                                                                                                    let lista = document.getElementById("listaTarefas");

                                                                                                                                        lista.innerHTML = "";

                                                                                                                                            tarefas.forEach((tarefa, index) => {

                                                                                                                                                    let item = document.createElement("li");

                                                                                                                                                            let texto = document.createElement("span");

                                                                                                                                                                    texto.textContent =
                                                                                                                                                                                tarefa.nome + " | Data: " + tarefa.data +
                                                                                                                                                                                            " | Prioridade: " + tarefa.prioridade;

                                                                                                                                                                                                    if (tarefa.concluida) {
                                                                                                                                                                                                                texto.classList.add("finalizada");
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                let concluir = document.createElement("button");

                                                                                                                                                                                                                                        concluir.textContent = tarefa.concluida
                                                                                                                                                                                                                                                    ? "Desmarcar"
                                                                                                                                                                                                                                                                : "Concluir";

                                                                                                                                                                                                                                                                        concluir.className = "concluir";

                                                                                                                                                                                                                                                                                concluir.onclick = function() {
                                                                                                                                                                                                                                                                                            tarefas[index].concluida =
                                                                                                                                                                                                                                                                                                            !tarefas[index].concluida;

                                                                                                                                                                                                                                                                                                                        salvar();
                                                                                                                                                                                                                                                                                                                                    mostrarTarefas();
                                                                                                                                                                                                                                                                                                                                            };

                                                                                                                                                                                                                                                                                                                                                    let excluir = document.createElement("button");

                                                                                                                                                                                                                                                                                                                                                            excluir.textContent = "Excluir";
                                                                                                                                                                                                                                                                                                                                                                    excluir.className = "excluir";

                                                                                                                                                                                                                                                                                                                                                                            excluir.onclick = function() {
                                                                                                                                                                                                                                                                                                                                                                                        excluirTarefa(index);
                                                                                                                                                                                                                                                                                                                                                                                                };

                                                                                                                                                                                                                                                                                                                                                                                                        item.appendChild(texto);
                                                                                                                                                                                                                                                                                                                                                                                                                item.appendChild(document.createElement("br"));
                                                                                                                                                                                                                                                                                                                                                                                                                        item.appendChild(concluir);
                                                                                                                                                                                                                                                                                                                                                                                                                                item.appendChild(excluir);

                                                                                                                                                                                                                                                                                                                                                                                                                                        lista.appendChild(item);
                                                                                                                                                                                                                                                                                                                                                                                                                                            });
                                                                                                                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                                                                                                                            function excluirTarefa(index) {

                                                                                                                                                                                                                                                                                                                                                                                                                                                tarefas.splice(index, 1);

                                                                                                                                                                                                                                                                                                                                                                                                                                                    salvar();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        mostrarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                                                        mostrarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                                                                                        