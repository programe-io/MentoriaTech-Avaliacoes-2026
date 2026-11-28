const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');

let tarefas = [];

function atualizarTela() {
  lista.innerHTML = '';

    tarefas.forEach((tarefa, index) => {
        const li = document.createElement('li');
            li.className = `item-tarefa ${tarefa.concluida ? 'concluida' : ''}`;

                const span = document.createElement('span');
                    span.className = 'texto-tarefa';
                        span.textContent = tarefa.texto;
                            span.onclick = () => alternarStatus(index);

                                const btnRemover = document.createElement('button');
                                    btnRemover.className = 'btn-remover';
                                        btnRemover.textContent = 'Excluir';
                                            btnRemover.onclick = () => removerTarefa(index);

                                                li.appendChild(span);
                                                    li.appendChild(btnRemover);
                                                        lista.appendChild(li);
                                                          });

                                                            const total = tarefas.length;
                                                              contador.textContent = `${total} ${total === 1 ? 'tarefa' : 'tarefas'}`;
                                                              }

                                                              function adicionarTarefa(evento) {
                                                                evento.preventDefault();
                                                                  const texto = input.value.trim();

                                                                    if (texto !== '') {
                                                                        tarefas.push({ texto: texto, concluida: false });
                                                                            input.value = '';
                                                                                atualizarTela();
                                                                                  }
                                                                                  }

                                                                                  function alternarStatus(index) {
                                                                                    tarefas[index].concluida = !tarefas[index].concluida;
                                                                                      atualizarTela();
                                                                                      }

                                                                                      function removerTarefa(index) {
                                                                                        tarefas.splice(index, 1);
                                                                                          atualizarTela();
                                                                                          }

                                                                                          form.addEventListener('submit', adicionarTarefa);
                                                                                          