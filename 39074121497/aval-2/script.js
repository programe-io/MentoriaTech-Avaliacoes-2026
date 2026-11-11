// PROJETO - Gerenciador de Tarefas - Aula 17
// Funções: validar, cadastrar, listar, buscar, concluir, alterarPrioridade

let tarefas = [];
let geradorCodigo = 0;

// 1. Validar dados
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser entre 1 e 3.");
  }
}

// 2. Buscar tarefa com find
function buscarTarefa(codigo) {
  let tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }
  return tarefa;
}

// 3. Cadastrar tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorCodigo++;

  let tarefa = {
    codigo: geradorCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
  return tarefa;
}

// 4. Listar tarefas
function listarTarefas() {
  return tarefas;
}

// 5. Concluir tarefa
function concluirTarefa(codigo) {
  let tarefa = buscarTarefa(codigo);

  if (tarefa.status === false) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

// 6. Alterar prioridade
function alterarPrioridade(codigo, novaPrioridade) {
  let tarefa = buscarTarefa(codigo);

  // Reaproveita a validação usando o próprio título já cadastrado
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// ===== TESTES IGUAIS AOS DA AULA =====
try {
  cadastrarTarefa("Estudar JavaScript", 1);
  cadastrarTarefa("Fazer exercícios", 2);
  cadastrarTarefa("Revisar projeto", 3);

  console.log("--- LISTA INICIAL ---");
  console.log(listarTarefas());

  concluirTarefa(1);
  console.log("\n--- APÓS CONCLUIR CÓDIGO 1 ---");
  console.log(listarTarefas());

  alterarPrioridade(2, 1);
  console.log("\n--- APÓS ALTERAR PRIORIDADE DO CÓDIGO 2 PARA 1 ---");
  console.log(listarTarefas());

  // Testes de erro:
  // cadastrarTarefa("Teste", 5); // Erro: prioridade
  // cadastrarTarefa("Oi", 1); // Erro: título curto
  // concluirTarefa(99); // Erro: código não encontrado
  // concluirTarefa(1); // Erro: já concluída

} catch (erro) {
  console.log("ERRO: " + erro.message);
}const readline = require("readline");
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
function perguntar(p) { return new Promise((res) => rl.question(p, res)); }

async function menu() {
  let opcao;
  do {
    console.log("\n=== GERENCIADOR DE TAREFAS ===");
    console.log("1 - Cadastrar");
    console.log("2 - Listar");
    console.log("3 - Concluir tarefa");
    console.log("4 - Alterar prioridade");
    console.log("5 - Sair");
    opcao = await perguntar("Escolha: ");

    try {
      if (opcao == "1") {
        let titulo = await perguntar("Título (mín. 5 letras): ");
        let prioridade = Number(await perguntar("Prioridade 1 a 3: "));
        console.log(cadastrarTarefa(titulo, prioridade));
      } else if (opcao == "2") {
        console.log(listarTarefas());
      } else if (opcao == "3") {
        let codigo = Number(await perguntar("Código para concluir: "));
        console.log(concluirTarefa(codigo));
      } else if (opcao == "4") {
        let codigo = Number(await perguntar("Código: "));
        let nova = Number(await perguntar("Nova prioridade 1 a 3: "));
        console.log(alterarPrioridade(codigo, nova));
      }
    } catch (erro) {
      console.log("ERRO: " + erro.message);
    }
  } while (opcao != "5");
  rl.close();
}
menu();