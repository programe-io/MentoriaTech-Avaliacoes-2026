let tarefas = [];
let geradorCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
      throw new Error('O título deve ter no mínimo 5 caracteres');
        }
          if (prioridade < 1 || prioridade > 3) {
              throw new Error('Informe uma prioridade entre 1 e 3');
                }
                }

                function buscarTarefa(codigoTarefa) {
                  const tarefaBuscada = tarefas.find(t => t.codigo === codigoTarefa);
                    if (!tarefaBuscada) {
                        throw new Error('Código de tarefa não encontrado');
                          }
                            return tarefaBuscada;
                            }

                            function cadastrarTarefa(titulo, prioridade) {
                              validarDadosTarefa(titulo, prioridade);
                                let tarefa = {
                                    codigo: ++geradorCodigo,
                                        titulo: titulo,
                                            prioridade: prioridade,
                                                status: true
                                                  };
                                                    tarefas.push(tarefa);
                                                    }

                                                    function listarTarefas() {
                                                      return tarefas;
                                                      }

                                                      function concluirTarefa(codigo) {
                                                        let tarefa = buscarTarefa(codigo);
                                                          if (tarefa.status === false) {
                                                              throw new Error('Tarefa já estava como concluída');
                                                                }
                                                                  tarefa.status = false;
                                                                  }

                                                                  function alterarPrioridade(codigo, novaPrioridade) {
                                                                    let tarefa = buscarTarefa(codigo);
                                                                      validarDadosTarefa(tarefa.titulo, novaPrioridade);
                                                                        tarefa.prioridade = novaPrioridade;
                                                                        }

                                                                        // Liga com a tela
                                                                        const form = document.getElementById('form-tarefa');
                                                                        const lista = document.getElementById('lista-tarefas');
                                                                        const msgVazia = document.getElementById('mensagem-vazia');

                                                                        function renderizar() {
                                                                          lista.innerHTML = '';
                                                                            if (tarefas.length === 0) {
                                                                                msgVazia.style.display = 'block';
                                                                                    return;
                                                                                      }
                                                                                        msgVazia.style.display = 'none';
                                                                                          tarefas.forEach(t => {
                                                                                              const li = document.createElement('li');
                                                                                                  if (!t.status) li.classList.add('concluida');
                                                                                                      li.innerHTML = '<div><span class="titulo">' + t.titulo + '</span><br><span class="prioridade">Prioridade: ' + t.prioridade + '</span></div>';
                                                                                                          const divAcoes = document.createElement('div');
                                                                                                              divAcoes.className = 'acoes';
                                                                                                                  const btn = document.createElement('button');
                                                                                                                      btn.textContent = t.status ? 'Concluir' : 'Concluída';
                                                                                                                          btn.className = 'concluir';
                                                                                                                              btn.onclick = () => { try { concluirTarefa(t.codigo); renderizar(); } catch(e){ alert(e.message); } };
                                                                                                                                  divAcoes.appendChild(btn);
                                                                                                                                      li.appendChild(divAcoes);
                                                                                                                                          lista.appendChild(li);
                                                                                                                                            });
                                                                                                                                            }

                                                                                                                                            form.addEventListener('submit', (e) => {
                                                                                                                                              e.preventDefault();
                                                                                                                                                const titulo = document.getElementById('titulo').value.trim();
                                                                                                                                                  const prioridade = Number(document.getElementById('prioridade').value);
                                                                                                                                                    try {
                                                                                                                                                        cadastrarTarefa(titulo, prioridade);
                                                                                                                                                            document.getElementById('titulo').value = '';
                                                                                                                                                                renderizar();
                                                                                                                                                                  } catch (erro) {
                                                                                                                                                                      alert(erro.message);
                                                                                                                                                                        }
                                                                                                                                                                        });

                                                                                                                                                                        renderizar();