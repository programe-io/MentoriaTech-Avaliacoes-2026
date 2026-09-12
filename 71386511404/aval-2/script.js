// ===== ESTADO =====
let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

// ===== ELEMENTOS =====
const form = document.getElementById('form-tarefa');
const input = document.getElementById('input-tarefa');
const lista = document.getElementById('lista-tarefas');
const contador = document.getElementById('contador');
const btnLimpar = document.getElementById('btn-limpar');

// ===== FUNÇÕES =====

// Salva no localStorage
function salvar() {
  localStorage.setItem('tarefas', JSON.stringify(tarefas));
  }

  // Renderiza a lista na tela
  function renderizar() {
    lista.innerHTML = '';

      tarefas.forEach((tarefa, index) => {
          const li = document.createElement('li');
              if (tarefa.concluida) li.classList.add('concluida');

                  // Checkbox
                      const checkbox = document.createElement('input');
                          checkbox.type = 'checkbox';
                              checkbox.checked = tarefa.concluida;
                                  checkbox.addEventListener('change', () => toggleConcluida(index));

                                      // Texto
                                          const span = document.createElement('span');
                                              span.textContent = tarefa.texto;

                                                  // Botão remover
                                                      const btnRemover = document.createElement('button');
                                                          btnRemover.textContent = '🗑️';
                                                              btnRemover.classList.add('btn-remover');
                                                                  btnRemover.addEventListener('click', () => removerTarefa(index));

                                                                      li.appendChild(checkbox);
                                                                          li.appendChild(span);
                                                                              li.appendChild(btnRemover);
                                                                                  lista.appendChild(li);
                                                                                    });

                                                                                      atualizarContador();
                                                                                      }

                                                                                      // Atualiza contador
                                                                                      function atualizarContador() {
                                                                                        const total = tarefas.length;
                                                                                          const concluidas = tarefas.filter(t => t.concluida).length;
                                                                                            contador.textContent = `${total} tarefa(s) • ${concluidas} concluída(s)`;
                                                                                            }

                                                                                            // Adiciona tarefa
                                                                                            function adicionarTarefa(texto) {
                                                                                              tarefas.push({ texto, concluida: false });
                                                                                                salvar();
                                                                                                  renderizar();
                                                                                                  }

                                                                                                  // Alterna concluída
                                                                                                  function toggleConcluida(index) {
                                                                                                    tarefas[index].concluida = !tarefas[index].concluida;
                                                                                                      salvar();
                                                                                                        renderizar();
                                                                                                        }

                                                                                                        // Remove tarefa
                                                                                                        function removerTarefa(index) {
                                                                                                          tarefas.splice(index, 1);
                                                                                                            salvar();
                                                                                                              renderizar();
                                                                                                              }

                                                                                                              // Limpa concluídas
                                                                                                              function limparConcluidas() {
                                                                                                                tarefas = tarefas.filter(t => !t.concluida);
                                                                                                                  salvar();
                                                                                                                    renderizar();
                                                                                                                    }

                                                                                                                    // ===== EVENTOS =====
                                                                                                                    form.addEventListener('submit', (e) => {
                                                                                                                      e.preventDefault();
                                                                                                                        const texto = input.value.trim();
                                                                                                                          if (texto === '') return;
                                                                                                                            adicionarTarefa(texto);
                                                                                                                              input.value = '';
                                                                                                                                input.focus();
                                                                                                                                });

                                                                                                                                btnLimpar.addEventListener('click', limparConcluidas);

                                                                                                                                // ===== INICIALIZAÇÃO =====
                                                                                                                                renderizar();