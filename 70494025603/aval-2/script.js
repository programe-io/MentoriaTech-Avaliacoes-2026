// Lista de tarefas
let tarefas = [];

// Filtro atual
let filtroAtual = "todas";


// Adicionar uma nova tarefa
function adicionarTarefa() {

    const input = document.getElementById("tarefaInput");
        const texto = input.value.trim();

            // Verifica se o campo está vazio
                if (texto === "") {
                        alert("Digite uma tarefa!");
                                return;
                                    }

                                        // Cria a tarefa
                                            const novaTarefa = {
                                                    id: Date.now(),
                                                            texto: texto,
                                                                    concluida: false
                                                                        };

                                                                            // Adiciona a tarefa à lista
                                                                                tarefas.push(novaTarefa);

                                                                                    // Limpa o campo
                                                                                        input.value = "";

                                                                                            // Atualiza a tela
                                                                                                mostrarTarefas();
                                                                                                }


                                                                                                // Marcar ou desmarcar uma tarefa
                                                                                                function concluirTarefa(id) {

                                                                                                    tarefas = tarefas.map(function(tarefa) {

                                                                                                            if (tarefa.id === id) {
                                                                                                                        tarefa.concluida = !tarefa.concluida;
                                                                                                                                }

                                                                                                                                        return tarefa;
                                                                                                                                            });

                                                                                                                                                mostrarTarefas();
                                                                                                                                                }


                                                                                                                                                // Excluir uma tarefa
                                                                                                                                                function excluirTarefa(id) {

                                                                                                                                                    tarefas = tarefas.filter(function(tarefa) {
                                                                                                                                                            return tarefa.id !== id;
                                                                                                                                                                });

                                                                                                                                                                    mostrarTarefas();
                                                                                                                                                                    }


                                                                                                                                                                    // Escolher o filtro
                                                                                                                                                                    function filtrar(filtro) {

                                                                                                                                                                        filtroAtual = filtro;

                                                                                                                                                                            mostrarTarefas();
                                                                                                                                                                            }


                                                                                                                                                                            // Mostrar as tarefas na tela
                                                                                                                                                                            function mostrarTarefas() {

                                                                                                                                                                                const lista = document.getElementById("listaTarefas");

                                                                                                                                                                                    // Limpa a lista
                                                                                                                                                                                        lista.innerHTML = "";

                                                                                                                                                                                            let tarefasFiltradas = tarefas;


                                                                                                                                                                                                // Filtro de tarefas pendentes
                                                                                                                                                                                                    if (filtroAtual === "pendentes") {

                                                                                                                                                                                                            tarefasFiltradas = tarefas.filter(function(tarefa) {
                                                                                                                                                                                                                        return !tarefa.concluida;
                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                        // Filtro de tarefas concluídas
                                                                                                                                                                                                                                            else if (filtroAtual === "concluidas") {

                                                                                                                                                                                                                                                    tarefasFiltradas = tarefas.filter(function(tarefa) {
                                                                                                                                                                                                                                                                return tarefa.concluida;
                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                // Cria cada tarefa na tela
                                                                                                                                                                                                                                                                                    tarefasFiltradas.forEach(function(tarefa) {

                                                                                                                                                                                                                                                                                            const li = document.createElement("li");

                                                                                                                                                                                                                                                                                                    li.innerHTML = `
                                                                                                                                                                                                                                                                                                                <div class="tarefa">

                                                                                                                                                                                                                                                                                                                                <input
                                                                                                                                                                                                                                                                                                                                                    type="checkbox"
                                                                                                                                                                                                                                                                                                                                                                        ${tarefa.concluida ? "checked" : ""}
                                                                                                                                                                                                                                                                                                                                                                                            onchange="concluirTarefa(${tarefa.id})"
                                                                                                                                                                                                                                                                                                                                                                                                            >

                                                                                                                                                                                                                                                                                                                                                                                                                            <span class="${tarefa.concluida ? "concluida" : ""}">
                                                                                                                                                                                                                                                                                                                                                                                                                                                ${tarefa.texto}
                                                                                                                                                                                                                                                                                                                                                                                                                                                                </span>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                            </div>

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        <button
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        class="excluir"
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        onclick="excluirTarefa(${tarefa.id})">
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        Excluir
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    </button>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            `;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    lista.appendChild(li);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        });

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            atualizarContador();
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            // Atualizar quantidade de tarefas pendentes
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            function atualizarContador() {

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                const contador = document.getElementById("contador");

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    const pendentes = tarefas.filter(function(tarefa) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            return !tarefa.concluida;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                }).length;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    if (pendentes === 1) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            contador.textContent = "1 tarefa pendente";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                } else {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        contador.textContent = pendentes + " tarefas pendentes";
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            }