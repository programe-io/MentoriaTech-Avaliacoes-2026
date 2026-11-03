let tarefas = [];
let proximoCodigo = 1;

function nomePrioridade(prioridade) {
  return ["", "Baixa", "Média", "Alta"][prioridade];
}

function buscarTarefa(codigo) {
  return tarefas.find(tarefa => tarefa.codigo === codigo);
}

function cadastrarTarefa() {
  const titulo = prompt("Digite o título da tarefa:");

  if (titulo === null) return;

  if (titulo.trim().length < 5) {
    alert("O título deve ter pelo menos 5 caracteres.");
    return;
  }

  const entrada = prompt(
    "Escolha a prioridade:\n1 - Baixa\n2 - Média\n3 - Alta"
  );

  if (entrada === null) return;

  const prioridade = Number(entrada);

  if (!Number.isInteger(prioridade) ||
      prioridade < 1 || prioridade > 3) {
    alert("Prioridade inválida!");
    return;
  }

  tarefas.push({
    codigo: proximoCodigo++,
    titulo: titulo.trim(),
    prioridade,
    status: "Em andamento"
  });

  alert("Tarefa cadastrada com sucesso!");
}

function listarTarefas() {
  if (tarefas.length === 0) {
    alert("Nenhuma tarefa cadastrada.");
    return;
  }

  const lista = tarefas.map(tarefa =>
    `Código: ${tarefa.codigo}\n` +
    `Título: ${tarefa.titulo}\n` +
    `Prioridade: ${nomePrioridade(tarefa.prioridade)}\n` +
    `Status: ${tarefa.status}`
  ).join("\n\n--------------------\n\n");

  alert("===== LISTA DE TAREFAS =====\n\n" + lista);
}

function consultarTarefa() {
  const entrada = prompt("Digite o código da tarefa:");
  if (entrada === null) return;

  const codigo = Number(entrada);
  const tarefa = buscarTarefa(codigo);

  if (!tarefa) {
    alert("Tarefa não encontrada.");
    return;
  }

  alert(
    `Código: ${tarefa.codigo}\n` +
    `Título: ${tarefa.titulo}\n` +
    `Prioridade: ${nomePrioridade(tarefa.prioridade)}\n` +
    `Status: ${tarefa.status}`
  );
}

function concluirTarefa() {
  const entrada = prompt("Código da tarefa que deseja concluir:");
  if (entrada === null) return;

  const tarefa = buscarTarefa(Number(entrada));

  if (!tarefa) {
    alert("Tarefa não encontrada.");
    return;
  }

  if (tarefa.status === "Concluída") {
    alert("Essa tarefa já foi concluída.");
    return;
  }

  tarefa.status = "Concluída";
  alert("Tarefa concluída com sucesso!");
}

function alterarPrioridade() {
  const entrada = prompt("Código da tarefa:");
  if (entrada === null) return;

  const tarefa = buscarTarefa(Number(entrada));

  if (!tarefa) {
    alert("Tarefa não encontrada.");
    return;
  }

  const nova = prompt(
    "Nova prioridade:\n1 - Baixa\n2 - Média\n3 - Alta"
  );

  if (nova === null) return;

  const prioridade = Number(nova);

  if (!Number.isInteger(prioridade) ||
      prioridade < 1 || prioridade > 3) {
    alert("Prioridade inválida!");
    return;
  }

  tarefa.prioridade = prioridade;
  alert("Prioridade alterada com sucesso!");
}

function removerTarefa() {
  const entrada = prompt("Código da tarefa que deseja remover:");
  if (entrada === null) return;

  const codigo = Number(entrada);
  const indice = tarefas.findIndex(t => t.codigo === codigo);

  if (indice === -1) {
    alert("Tarefa não encontrada.");
    return;
  }

  const confirmacao = confirm(
    `Deseja remover "${tarefas[indice].titulo}"?`
  );

  if (!confirmacao) {
    alert("Remoção cancelada.");
    return;
  }

  tarefas.splice(indice, 1);
  alert("Tarefa removida com sucesso!");
}

function mostrarResumo() {
  const concluidas = tarefas.filter(
    t => t.status === "Concluída"
  ).length;

  const andamento = tarefas.length - concluidas;

  alert(
    "===== RESUMO =====\n\n" +
    `Total de tarefas: ${tarefas.length}\n` +
    `Em andamento: ${andamento}\n` +
    `Concluídas: ${concluidas}`
  );
}

function mostrarMenu() {
  return prompt(
    "===== GERENCIADOR DE TAREFAS =====\n\n" +
    "1 - Cadastrar tarefa\n" +
    "2 - Listar tarefas\n" +
    "3 - Consultar tarefa\n" +
    "4 - Concluir tarefa\n" +
    "5 - Alterar prioridade\n" +
    "6 - Remover tarefa\n" +
    "7 - Mostrar resumo\n" +
    "0 - Sair\n\n" +
    "Digite o número da opção:"
  );
}

function iniciarSistema() {
  let executando = true;

  while (executando) {
    const opcao = mostrarMenu();

    if (opcao === null || opcao === "0") {
      executando = false;
      alert("Sistema encerrado. Até logo!");
      continue;
    }

    switch (opcao) {
      case "1":
        cadastrarTarefa();
        break;
      case "2":
        listarTarefas();
        break;
      case "3":
        consultarTarefa();
        break;
      case "4":
        concluirTarefa();
        break;
      case "5":
        alterarPrioridade();
        break;
      case "6":
        removerTarefa();
        break;
      case "7":
        mostrarResumo();
        break;
      default:
        alert("Opção inválida! Escolha de 0 a 7.");
    }
  }
}

// Inicia o programa
iniciarSistema();

