// Projeto: Gerenciador de Tarefas por Prioridade

let tarefas = [];
let geradorCodigo = 0;

// Cadastra uma nova tarefa.
function cadastrarTarefa() {
  let titulo = prompt("Digite o título da tarefa:");

  if (!titulo || titulo.trim().length < 5) {
    alert("O título deve ter no mínimo 5 caracteres!");
    return;
  }

  let prioridade = Number(prompt(
    "Escolha a prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"
  ));

  if (![1, 2, 3].includes(prioridade)) {
    alert("Informe uma prioridade entre 1 e 3!");
    return;
  }

  const tarefa = {
    codigo: ++geradorCodigo,
    titulo: titulo.trim(),
    prioridade: prioridade,
    status: true
  };

  tarefas.push(tarefa);

  alert("Tarefa cadastrada com sucesso!");
}

// Lista todas as tarefas.
function listarTarefas() {
  if (tarefas.length === 0) {
    alert("Nenhuma tarefa cadastrada!");
    return;
  }

  let resultado = "=== TODAS AS TAREFAS ===\n\n";

  tarefas.forEach(tarefa => {
    resultado +=
      "Código: " + tarefa.codigo +
      "\nTítulo: " + tarefa.titulo +
      "\nPrioridade: " + tarefa.prioridade +
      "\nStatus: " + (tarefa.status ? "Em execução" : "Concluída") +
      "\n-------------------------\n";
  });

  alert(resultado);
}

// Visualiza tarefas por prioridade.
function visualizarPorPrioridade() {
  const tarefasOrdenadas = [...tarefas].sort(
    (a, b) => a.prioridade - b.prioridade
  );

  let resultado = "=== TAREFAS POR PRIORIDADE ===\n\n";

  tarefasOrdenadas.forEach(tarefa => {
    let nivelPrioridade;

    if (tarefa.prioridade === 1) {
      nivelPrioridade = "Alta";
    } else if (tarefa.prioridade === 2) {
      nivelPrioridade = "Média";
    } else {
      nivelPrioridade = "Baixa";
    }

    resultado +=
      "Código: " + tarefa.codigo +
      "\nTítulo: " + tarefa.titulo +
      "\nPrioridade: " + nivelPrioridade +
      "\nStatus: " + (tarefa.status ? "Em execução" : "Concluída") +
      "\n-------------------------\n";
  });

  alert(resultado);
}

// Edita uma tarefa.
function editarTarefa() {
  let codigo = Number(prompt("Digite o código da tarefa que deseja editar:"));

  let tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    alert("Tarefa não encontrada!");
    return;
  }

  let novoTitulo = prompt("Digite o novo título:", tarefa.titulo);

  if (!novoTitulo || novoTitulo.trim().length < 5) {
    alert("Título inválido!");
    return;
  }

  let novaPrioridade = Number(prompt(
    "Nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa",
    tarefa.prioridade
  ));

  if (![1, 2, 3].includes(novaPrioridade)) {
    alert("Prioridade inválida!");
    return;
  }

  tarefa.titulo = novoTitulo.trim();
  tarefa.prioridade = novaPrioridade;

  alert("Tarefa editada com sucesso!");
}

// Exclui uma tarefa.
function excluirTarefa() {
  let codigo = Number(prompt("Digite o código da tarefa que deseja excluir:"));

  let indice = tarefas.findIndex(t => t.codigo === codigo);

  if (indice === -1) {
    alert("Tarefa não encontrada!");
    return;
  }

  tarefas.splice(indice, 1);

  alert("Tarefa excluída com sucesso!");
}

// Altera o status de uma tarefa.
function alterarStatus() {
  let codigo = Number(prompt("Digite o código da tarefa:"));

  let tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) {
    alert("Tarefa não encontrada!");
    return;
  }

  tarefa.status = !tarefa.status;

  alert("Status atualizado: " +
    (tarefa.status ? "Em execução" : "Concluída"));
}

// Menu principal.
function menu() {
  let opcao;

  do {
    opcao = prompt(
      "=== GERENCIADOR DE TAREFAS ===\n\n" +
      "1 - Cadastrar tarefa\n" +
      "2 - Listar tarefas\n" +
      "3 - Visualizar por prioridade\n" +
      "4 - Editar tarefa\n" +
      "5 - Excluir tarefa\n" +
      "6 - Alterar status\n" +
      "0 - Sair\n\n" +
      "Escolha uma opção:"
    );

    switch (opcao) {
      case "1":
        cadastrarTarefa();
        break;

      case "2":
        listarTarefas();
        break;

      case "3":
        visualizarPorPrioridade();
        break;

      case "4":
        editarTarefa();
        break;

      case "5":
        excluirTarefa();
        break;

      case "6":
        alterarStatus();
        break;

      case "0":
        alert("Programa encerrado!");
        break;

      case null:
        opcao = "0";
        break;

      default:
        alert("Opção inválida!");
    }

  } while (opcao !== "0");
}

// Inicia o programa.
menu();