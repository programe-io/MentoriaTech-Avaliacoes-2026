/**
 * PROJETO: GERENCIADOR DE TAREFAS
 * Ficheiro: app.js
 * Conteúdo: Regras de negócio, validações e manipulação da coleção de tarefas.
 */

// 3. Armazenamento das tarefas com arrays
const tarefas = [];

// 7. Geração automática de códigos (independente do tamanho do array)
let proximoCodigo = 1;

// 5. Validação dos dados da tarefa
function validarDados(titulo, prioridade) {
    // Validação do título (mínimo de 5 caracteres)
    if (!titulo || titulo.trim().length < 5) {
        throw new Error("Erro de Validação: O título deve possuir no mínimo 5 caracteres.");
    }
    
    // Validação da prioridade (entre 1 e 3 utilizando operador lógico OU)
    const prioridadeNum = Number(prioridade);
    if (prioridadeNum < 1 || prioridadeNum > 3) {
        throw new Error("Erro de Validação: A prioridade deve estar entre 1 e 3 (1=Alta, 3=Baixa).");
    }
}

// 9. Busca de tarefas com find
function buscarTarefa(codigo) {
    const codigoNum = Number(codigo);
    // O find percorre os objetos e compara a propriedade código com o valor recebido
    const tarefaEncontrada = tarefas.find(tarefa => tarefa.codigo === codigoNum);
    
    // Tratamento de tarefa inexistente com negação lógica
    if (!tarefaEncontrada) {
        throw new Error(`Erro de Busca: O código #${codigo} não foi encontrado.`);
    }
    
    return tarefaEncontrada; // Retorna o objeto localizado
}

// 6. Cadastro e modelagem de uma tarefa
function cadastrarTarefa(titulo, prioridade) {
    // Interrupção com erro caso os dados sejam inválidos
    validarDados(titulo, prioridade);

    // Objeto como representação da tarefa (Modelagem)
    const novaTarefa = {
        codigo: proximoCodigo,          // Definido pelo algoritmo
        titulo: titulo.trim(),          // Informado pelo utilizador
        prioridade: Number(prioridade), // Informado pelo utilizador
        status: true                    // Definido pelo algoritmo (true = em execução/não concluída)
    };

    // Incremento do gerador independente para o próximo registo
    proximoCodigo++;

    // Inserção no array central com o método push
    tarefas.push(novaTarefa);
    
    return novaTarefa;
}

// 8. Listagem das tarefas cadastradas
function listarTarefas() {
    // Retornar não é o mesmo que exibir. Devolvemos a coleção central intacta.
    return tarefas;
}

// 10. Conclusão de uma tarefa
function concluirTarefa(codigo) {
    // Reutiliza a função exclusiva de busca
    const tarefa = buscarTarefa(codigo);

    // Validação de conclusão duplicada
    if (tarefa.status === false) {
        throw new Error(`Erro de Negócio: A tarefa de código #${codigo} já estava concluída.`);
    }

    // Altera o valor de verdadeiro para falso (deixando de estar em execução)
    tarefa.status = false;
    
    return tarefa;
}

// 11 e 12. Alteração da prioridade (Organização e responsabilidade das funções)
function alterarPrioridade(codigo, novaPrioridade) {
    // Primeiro, a tarefa é localizada por meio da função buscarTarefa
    const tarefa = buscarTarefa(codigo);
    
    // Reaproveitamento da validação existente (passando o título atual e a nova prioridade)
    validarDados(tarefa.titulo, novaPrioridade);
    
    // Modifica o atributo do objeto após passar com sucesso nas regras
    tarefa.prioridade = Number(novaPrioridade);
    
    return tarefa;
}

// Exportação das funções (opcional, caso utilize módulos no Node.js ou ES6)
// module.exports = { cadastrarTarefa, listarTarefas, buscarTarefa, concluirTarefa, alterarPrioridade };
