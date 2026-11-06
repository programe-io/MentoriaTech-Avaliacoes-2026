
let tarefas = [];

function cadastrarTarefa() {
    let codigo = Number(document.getElementById("codigo").value);
        let titulo = document.getElementById("titulo").value.trim();
            let prioridade = Number(document.getElementById("prioridade").value);

                if (titulo.length < 5) {
                        alert("O título deve ter no mínimo 5 caracteres!");
                                return;
                                    }

                                        if (prioridade < 1 || prioridade > 3) {
                                                alert("Prioridade inválida!");
                                                        return;
                                                            }

                                                                if (!codigo || tarefas.some(t => t.codigo === codigo)) {
                                                                        alert("Digite um código válido e não repetido!");
                                                                                return;
                                                                                    }

                                                                                        tarefas.push({
                                                                                                codigo,
                                                                                                        titulo,
                                                                                                                prioridade,
                                                                                                                        concluida: false
                                                                                                                            });

                                                                                                                                document.getElementById("codigo").value = "";
                                                                                                                                    document.getElementById("titulo").value = "";

                                                                                                                                        listarTarefas();
                                                                                                                                        }

                                                                                                                                        function listarTarefas() {
                                                                                                                                            let lista = document.getElementById("listaTarefas");
                                                                                                                                                lista.innerHTML = "";

                                                                                                                                                    tarefas.forEach(tarefa => {
                                                                                                                                                            let item = document.createElement("li");

                                                                                                                                                                    if (tarefa.concluida) {
                                                                                                                                                                                item.classList.add("concluida");
                                                                                                                                                                                        }

                                                                                                                                                                                                item.innerHTML = `
                                                                                                                                                                                                            Código: ${tarefa.codigo}<br>
                                                                                                                                                                                                                        Título: ${tarefa.titulo}<br>
                                                                                                                                                                                                                                    Prioridade: ${tarefa.prioridade == 1 ? "Alta" : tarefa.prioridade == 2 ? "Média" : "Baixa"}<br>
                                                                                                                                                                                                                                                Status: ${tarefa.concluida ? "Concluída" : "Pendente"}<br>
                                                                                                                                                                                                                                                            <button onclick="concluirTarefa(${tarefa.codigo})">
                                                                                                                                                                                                                                                                            Concluir
                                                                                                                                                                                                                                                                                        </button>
                                                                                                                                                                                                                                                                                                    <button onclick="alterarPrioridade(${tarefa.codigo})">
                                                                                                                                                                                                                                                                                                                    Alterar prioridade
                                                                                                                                                                                                                                                                                                                                </button>
                                                                                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                                                                                                lista.appendChild(item);
                                                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                    function concluirTarefa(codigo) {
                                                                                                                                                                                                                                                                                                                                                        let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                            if (tarefa) {
                                                                                                                                                                                                                                                                                                                                                                    tarefa.concluida = true;
                                                                                                                                                                                                                                                                                                                                                                            listarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                                                                                                function alterarPrioridade(codigo) {
                                                                                                                                                                                                                                                                                                                                                                                    let novaPrioridade = Number(
                                                                                                                                                                                                                                                                                                                                                                                            prompt("Digite a nova prioridade: 1-Alta, 2-Média, 3-Baixa")
                                                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                                                    if (![1, 2, 3].includes(novaPrioridade)) {
                                                                                                                                                                                                                                                                                                                                                                                                            alert("Prioridade inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                                            let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                                                                                if (tarefa) {
                                                                                                                                                                                                                                                                                                                                                                                                                                        tarefa.prioridade = novaPrioridade;
                                                                                                                                                                                                                                                                                                                                                                                                                                                listarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                                    