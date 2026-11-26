// Array para armazenar as tarefas let tarefas = [];

// Código inicial das tarefas let proximoCodigo = 1;

// Elementos HTML const formulario = document.getElementById("formTarefa"); const campoTitulo = document.getElementById("titulo"); const campoPrioridade = document.getElementById("prioridade"); const listaTarefas = document.getElementById("listaTarefas");

// Cadastrar nova tarefa formulario.addEventListener("submit", function(event) {

event.preventDefault();

const titulo = campoTitulo.value.trim();
const prioridade = Number(campoPrioridade.value);

// Validar título
if (titulo.length < 5) {
    alert("O título deve ter no mínimo 5 caracteres!");
        return;
        }

        // Validar prioridade
        if (![1, 2, 3].includes(prioridade)) {
            alert("A prioridade deve ser 1, 2 ou 3!");
                return;
                }

                // Criar objeto da tarefa
                const tarefa = {
                    codigo: proximoCodigo,
                        titulo: titulo,
                            prioridade: prioridade,
                                concluida: false
                                };

                                // Adicionar tarefa ao array
                                tarefas.push(tarefa);

                                proximoCodigo++;

                                // Limpar formulário
                                formulario.reset();

                                // Atualizar lista
                                listarTarefas();

                                alert("Tarefa cadastrada com sucesso!");


                                });

                                // Listar tarefas cadastradas function listarTarefas() {

                                listaTarefas.innerHTML = "";

                                if (tarefas.length === 0) {
                                    listaTarefas.innerHTML = '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
                                        return;
                                        }

                                        tarefas.forEach(function(tarefa) {

                                            const div = document.createElement("div");

                                                div.className = tarefa.concluida
                                                        ? "tarefa concluida"
                                                                : "tarefa";

                                                                    div.innerHTML = `
                                                                            <p><strong>Código:</strong> ${tarefa.codigo}</p>

                                                                                    <p><strong>Título:</strong> ${tarefa.titulo}</p>

                                                                                            <p><strong>Prioridade:</strong> ${tarefa.prioridade}
                                                                                                    (${obterPrioridade(tarefa.prioridade)})</p>

                                                                                                            <p><strong>Status:</strong>
                                                                                                                    ${tarefa.concluida ? "Concluída" : "Pendente"}</p>

                                                                                                                            <div class="acoes">
                                                                                                                                        <button class="concluir"
                                                                                                                                                        onclick="concluirTarefa(${tarefa.codigo})"
                                                                                                                                                                        ${tarefa.concluida ? "disabled" : ""}>
                                                                                                                                                                                        Concluir
                                                                                                                                                                                                    </button>

                                                                                                                                                                                                                <button class="alterar"
                                                                                                                                                                                                                                onclick="alterarPrioridade(${tarefa.codigo})">
                                                                                                                                                                                                                                                Alterar prioridade
                                                                                                                                                                                                                                                            </button>
                                                                                                                                                                                                                                                                    </div>
                                                                                                                                                                                                                                                                        `;

                                                                                                                                                                                                                                                                            listaTarefas.appendChild(div);
                                                                                                                                                                                                                                                                            });


                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                            // Retornar descrição da prioridade function obterPrioridade(prioridade) {

                                                                                                                                                                                                                                                                            switch (prioridade) {
                                                                                                                                                                                                                                                                                case 1:
                                                                                                                                                                                                                                                                                        return "Alta";

                                                                                                                                                                                                                                                                                            case 2:
                                                                                                                                                                                                                                                                                                    return "Média";

                                                                                                                                                                                                                                                                                                        case 3:
                                                                                                                                                                                                                                                                                                                return "Baixa";

                                                                                                                                                                                                                                                                                                                    default:
                                                                                                                                                                                                                                                                                                                            return "Inválida";
                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                            // Marcar tarefa como concluída function concluirTarefa(codigo) {

                                                                                                                                                                                                                                                                                                                            const tarefa = tarefas.find(function(item) {
                                                                                                                                                                                                                                                                                                                                return item.codigo === codigo;
                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                if (tarefa) {
                                                                                                                                                                                                                                                                                                                                    tarefa.concluida = true;

                                                                                                                                                                                                                                                                                                                                        listarTarefas();

                                                                                                                                                                                                                                                                                                                                            alert("Tarefa concluída com sucesso!");
                                                                                                                                                                                                                                                                                                                                            }


                                                                                                                                                                                                                                                                                                                                            }

                                                                                                                                                                                                                                                                                                                                            // Alterar prioridade da tarefa function alterarPrioridade(codigo) {

                                                                                                                                                                                                                                                                                                                                            const tarefa = tarefas.find(function(item) {
                                                                                                                                                                                                                                                                                                                                                return item.codigo === codigo;
                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                if (tarefa) {

                                                                                                                                                                                                                                                                                                                                                    const novaPrioridade = Number(
                                                                                                                                                                                                                                                                                                                                                            prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
                                                                                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                                                                                    if (![1, 2, 3].includes(novaPrioridade)) {
                                                                                                                                                                                                                                                                                                                                                                            alert("Prioridade inválida! Digite 1, 2 ou 3.");
                                                                                                                                                                                                                                                                                                                                                                                    return;
                                                                                                                                                                                                                                                                                                                                                                                        }

                                                                                                                                                                                                                                                                                                                                                                                            tarefa.prioridade = novaPrioridade;

                                                                                                                                                                                                                                                                                                                                                                                                listarTarefas();

                                                                                                                                                                                                                                                                                                                                                                                                    alert("Prioridade alterada com sucesso!");
                                                                                                                                                                                                                                                                                                                                                                                                    }


                                                                                                                                                                                                                                                                                                                                                                                                    }

                                                                                                                                                                                                                                                                                                                                                                                                    // Exibir lista inicial listarTarefas()