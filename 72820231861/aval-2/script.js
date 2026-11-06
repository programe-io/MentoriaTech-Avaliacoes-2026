let tarefas = [];
let contador = 1;

function cadastrar() {
    let titulo = document.getElementById("titulo").value;
        let prioridade = Number(document.getElementById("prioridade").value);

            if (titulo.trim().length < 5) {
                    alert("O título deve ter no mínimo 5 caracteres!");
                            return;
                                }

                                    let tarefa = {
                                            codigo: contador++,
                                                    titulo: titulo,
                                                            prioridade: prioridade,
                                                                    concluida: false
                                                                        };

                                                                            tarefas.push(tarefa);

                                                                                alert("Tarefa cadastrada com sucesso!");

                                                                                    document.getElementById("titulo").value = "";

                                                                                        listar();
                                                                                        }

                                                                                        function listar() {
                                                                                            let lista = document.getElementById("lista");

                                                                                                lista.innerHTML = "";

                                                                                                    tarefas.forEach(t => {
                                                                                                            lista.innerHTML += `
                                                                                                                    <div class="tarefa">
                                                                                                                                <strong>Código:</strong> ${t.codigo}<br>
                                                                                                                                            <strong>Título:</strong> ${t.titulo}<br>
                                                                                                                                                        <strong>Prioridade:</strong> ${t.prioridade}<br>
                                                                                                                                                                    <strong>Status:</strong> ${t.concluida ? "Concluída" : "Pendente"}<br>

                                                                                                                                                                                <button onclick="concluir(${t.codigo})">
                                                                                                                                                                                                Marcar como Concluída
                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                    </div>`;
                                                                                                                                                                                                                        });
                                                                                                                                                                                                                        }

                                                                                                                                                                                                                        function concluir(codigo) {
                                                                                                                                                                                                                            let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                if (tarefa) {
                                                                                                                                                                                                                                        tarefa.concluida = true;
                                                                                                                                                                                                                                                alert("Tarefa concluída!");
                                                                                                                                                                                                                                                        listar();
                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                            function alterarPrioridade() {
                                                                                                                                                                                                                                                                let codigo = Number(document.getElementById("codigo").value);
                                                                                                                                                                                                                                                                    let prioridade = Number(document.getElementById("novaPrioridade").value);

                                                                                                                                                                                                                                                                        let tarefa = tarefas.find(t => t.codigo === codigo);

                                                                                                                                                                                                                                                                            if (!tarefa) {
                                                                                                                                                                                                                                                                                    alert("Tarefa não encontrada!");
                                                                                                                                                                                                                                                                                            return;
                                                                                                                                                                                                                                                                                                }

                                                                                                                                                                                                                                                                                                    if (prioridade < 1 || prioridade > 3) {
                                                                                                                                                                                                                                                                                                            alert("Prioridade inválida!");
                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                            tarefa.prioridade = prioridade;

                                                                                                                                                                                                                                                                                                                                alert("Prioridade alterada!");

                                                                                                                                                                                                                                                                                                                                    listar();
                                                                                                                                                                                                                                                                                                                                    }