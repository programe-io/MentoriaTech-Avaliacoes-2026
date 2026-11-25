let tarefas = [];
let contadorCodigo = 0;
const painel = document.getElementById("painel-tarefas");
function exibirNaTela(mensagem) {
 painel.textContent += mensagem + "\n";
 }
 function gerarCodigoTarefa() {
  contadorCodigo++;
   return contadorCodigo;
   }
   function validarDadosDaTarefa(titulo, prioridade) {
    if (titulo.length < 5) {
     throw new Error("Título deve ter, no mínimo, cinco caracteres");
      }
       if (prioridade < 1 || prioridade > 3) {
         }
         }
         throw new Error("Prioridade deve estar entre 1 e 3");
         function cadastrarTarefa(titulo, prioridade) {
          validarDadosDaTarefa(titulo, prioridade);
           const novaTarefa = {
            codigo: gerarCodigoTarefa(),
             titulo: titulo,
              prioridade: prioridade,
               status: true // true = em execução, false = concluída
                };
                 tarefas.push(novaTarefa);
                 }
                 function listarTarefas() {
                  exibirNaTela("--- LISTA DE TAREFAS ---");
                   exibirNaTela(JSON.stringify(tarefas, null, 2));
                   }
                   function buscarTarefa(codigo) {
                    const tarefa = tarefas.find((t) => t.codigo === codigo);
                     if (!tarefa) {
                      throw new Error("Tarefa não encontrada");
                       }
                        return tarefa;
                        }
                        function concluirTarefa(codigo) {
                         const tarefa = buscarTarefa(codigo); if (!tarefa.status) {
                             throw new Error("Tarefa já concluída");
                              }
                               tarefa.status = false;
                               }
                               Projeto 2: Gerenciador de Tarefas
                               function alterarPrioridade(codigo, novaPrioridade) {
                                const tarefa = buscarTarefa(codigo);
                                 validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
                                  tarefa.prioridade = novaPrioridade;
                                  }
                                  // TESTES
                                  try {
                                   exibirNaTela("> Cadastrando tarefas...");
                                    cadastrarTarefa("Estudar JavaScript", 1);
                                     cadastrarTarefa("Fazer exercícios", 2);
                                      exibirNaTela("\n> Concluindo tarefa 1 e alterando prioridade da tarefa 2...");
                                       concluirTarefa(1);
                                        alterarPrioridade(2, 3);
                                         listarTarefas();
                                         } catch (erro) {
                                          exibirNaTela("Erro: " + erro.message);
                                          }
                                          
                         }