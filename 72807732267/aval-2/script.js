
let tarefas = [];
let proximoCodigo = 1;

function cadastrarTarefa() {
    const titulo = document.getElementById("titulo").value.trim();
        const prioridade = Number(
                document.getElementById("prioridade").value
                    );

                        if (titulo.length < 5) {
                                alert("O título precisa ter pelo menos 5 caracteres!");
                                        return;
                                            }

                                                if (![1, 2, 3].includes(prioridade)) {
                                                        alert("Selecione uma prioridade válida!");
                                                                return;
                                                                    }

                                                                        const tarefa = {
                                                                                codigo: proximoCodigo++,
                                                                                        titulo: titulo,
                                                                                                prioridade: prioridade,
                                                                                                        concluida: false
                                                                                                            };

                                                                                                                tarefas.push(tarefa);

                                                                                                                    document.getElementById("titulo").value = "";
                                                                                                                        document.getElementById("prioridade").value = "";

                                                                                                                            listarTarefas();
                                                                                                                            }

                                                                                                                            function listarTarefas() {
                                                                                                                                const lista = document.getElementById("listaTarefas");

                                                                                                                                    lista.innerHTML = "";

                                                                                                                                        if (tarefas.length === 0) {
                                                                                                                                                lista.innerHTML = "<p>Nenhuma tarefa cadastrada.</p>";
                                                                                                                                                        return;
                                                                                                                                                            }

                                                                                                                                                                tarefas.forEach(tarefa => {
                                                                                                                                                                        const div = document.createElement("div");

                                                                                                                                                                                let classe = "";

                                                                                                                                                                                        if (tarefa.prioridade === 1) classe = "alta";
                                                                                                                                                                                                if (tarefa.prioridade === 2) classe = "media";
                                                                                                                                                                                                        if (tarefa.prioridade === 3) classe = "baixa";

                                                                                                                                                                                                                div.className = "tarefa " + classe;

                                                                                                                                                                                                                        if (tarefa.concluida) {
                                                                                                                                                                                                                                    div.classList.add("concluida");
                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                    div.innerHTML = `
                                                                                                                                                                                                                                                                <strong>Código:</strong> ${tarefa.codigo}<br>
                                                                                                                                                                                                                                                                            <strong>Título:</strong> ${tarefa.titulo}<br>
                                                                                                                                                                                                                                                                                        <strong>Prioridade:</strong> ${tarefa.prioridade === 1 ? "Alta" : tarefa.prioridade === 2 ? "Média" : "Baixa"}<br>
                                                                                                                                                                                                                                                                                                    <strong>Status:</strong> ${tarefa.concluida ? "Concluída" : "Pendente"}<br>

                                                                                                                                                                                                                                                                                                                <button onclick="concluirTarefa(${tarefa.codigo})">
                                                                                                                                                                                                                                                                                                                                Concluir
                                                                                                                                                                                                                                                                                                                                            </button>

                                                                                                                                                                                                                                                                                                                                                        <button onclick="alterarPrioridade(${tarefa.codigo})">
                                                                                                                                                                                                                                                                                                                                                                        Alterar Prioridade
                                                                                                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                                                                                                            `;

                                                                                                                                                                                                                                                                                                                                                                                                    lista.appendChild(div);
                                                                                                                                                                                                                                                                                                                                                                                                        });
                                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                                        function concluirTarefa(codigo) {
                                                                                                                                                                                                                                                                                                                                                                                                            const tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                                                                if (tarefa) {
                                                                                                                                                                                                                                                                                                                                                                                                                        tarefa.concluida = true;
                                                                                                                                                                                                                                                                                                                                                                                                                                listarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                    function alterarPrioridade(codigo) {
                                                                                                                                                                                                                                                                                                                                                                                                                                        const tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                                                                                                                                                                                                                            if (!tarefa) return;

                                                                                                                                                                                                                                                                                                                                                                                                                                                const novaPrioridade = Number(
                                                                                                                                                                                                                                                                                                                                                                                                                                                        prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
                                                                                                                                                                                                                                                                                                                                                                                                                                                            );

                                                                                                                                                                                                                                                                                                                                                                                                                                                                if (![1, 2, 3].includes(novaPrioridade)) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                        alert("Prioridade inválida!");
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                return;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        tarefa.prioridade = novaPrioridade;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            listarTarefas();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            