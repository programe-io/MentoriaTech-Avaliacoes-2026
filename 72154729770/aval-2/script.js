// Array para armazenar as tarefas
const tarefas = [];
let proximoCodigo = 1;

// Seleção dos elementos do DOM
const form = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const selectPrioridade = document.getElementById('prioridade');
const listaTarefasElement = document.getElementById('lista-tarefas');

// Evento para Cadastrar nova tarefa
form.addEventListener('submit', function(e) {
e.preventDefault(); // Impede recarregamento da página

const titulo = inputTitulo.value.trim();
const prioridade = parseInt(selectPrioridade.value, 10);

// Validação: Mínimo de 5 caracteres
if (titulo.length < 5) {
alert("🌸 Atenção: O título deve ter no mínimo 5 caracteres!");
return;
}

// Validação: Prioridade entre 1 e 3
if (![1, 2, 3].includes(prioridade)) {
alert("🌸 Atenção: A prioridade deve ser um valor entre 1 (alta) e 3 (baixa).");
return;
}

// Criação da nova tarefa
const novaTarefa = {
codigo: proximoCodigo++,
titulo: titulo,
prioridade: prioridade,
concluida: false
};

tarefas.push(novaTarefa);
inputTitulo.value = '';
renderizarTarefas();
});

// Marcar tarefa como concluída
function marcarComoConcluida(codigo) {
const tarefa = tarefas.find(t => t.codigo === codigo);
if (tarefa) {
tarefa.concluida = true;
renderizarTarefas();
}
}

// Alterar a prioridade da tarefa
function alterarPrioridade(codigo, novaPrioridade) {
const tarefa = tarefas.find(t => t.codigo === codigo);
if (tarefa) {
tarefa.prioridade = parseInt(novaPrioridade, 10);
renderizarTarefas();
}
}

// Renderizar/Listar tarefas no HTML
function renderizarTarefas() {
listaTarefasElement.innerHTML = '';

if (tarefas.length === 0) {
listaTarefasElement.innerHTML = '<li style="text-align:center; color:#ad1457; padding: 12px; list-style: none;">Nenhuma tarefa cadastrada ainda... 🌸</li>';
return;
}

tarefas.forEach(tarefa => {
const li = document.createElement('li');
li.className = task-item ${tarefa.concluida ? 'completed' : ''};

let textoPrioridade = 'Baixa';  
if (tarefa.prioridade === 1) textoPrioridade = 'Alta';  
if (tarefa.prioridade === 2) textoPrioridade = 'Média';  

li.innerHTML = `  
  <div class="task-info">  
      <span class="task-title">  
            #${tarefa.codigo} - ${tarefa.titulo}  
                  <span class="priority-tag priority-${tarefa.prioridade}">${textoPrioridade}</span>  
                      </span>  
                          <span class="task-meta">Status: ${tarefa.concluida ? 'Concluída ✨' : 'Pendente ⏳'}</span>  
                            </div>  
                              <div class="task-actions">  
                                  <select class="select-priority" onchange="alterarPrioridade(${tarefa.codigo}, this.value)">  
                                        <option value="1" ${tarefa.prioridade === 1 ? 'selected' : ''}>Prio 1</option>  
                                              <option value="2" ${tarefa.prioridade === 2 ? 'selected' : ''}>Prio 2</option>  
                                                    <option value="3" ${tarefa.prioridade === 3 ? 'selected' : ''}>Prio 3</option>  
                                                        </select>  
                                                            ${!tarefa.concluida ? `<button type="button" class="btn btn-success" onclick="marcarComoConcluida(${tarefa.codigo})">Concluir</button>` : ''}  
                                                              </div>  
                                                              `;  

                                                              listaTarefasElement.appendChild(li);

                                                              });
                                                              }

                                                              // Inicializa a exibição da lista
                                                              renderizarTarefas();