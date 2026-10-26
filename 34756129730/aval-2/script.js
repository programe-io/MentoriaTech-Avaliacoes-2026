
// Lista onde as tarefas serão armazenadas
let tarefas = [];

// Código automático das tarefas
let proximoCodigo = 1;


// FUNÇÃO 1 - CADASTRAR TAREFA
function cadastrarTarefa() {

  let titulo = document.getElementById("titulo").value.trim();

  let prioridade = Number(
    document.getElementById("prioridade").value
  );

  // Validar título
  if (titulo.length < 5) {
    alert("O título deve ter no mínimo 5 caracteres!");
    return;
  }

  // Validar prioridade
  if (prioridade < 1 || prioridade > 3 ||
      !Number.isInteger(prioridade)) {
    alert("A prioridade deve ser entre 1 e 3!");
    return;
  }

  // Criar objeto da tarefa
  let tarefa = {
    codigo: proximoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  // Adicionar tarefa na lista
  tarefas.push(tarefa);

  // Incrementar o código
  proximoCodigo++;

  alert("Tarefa cadastrada com sucesso!");

  // Limpar campo
  document.getElementById("titulo").value = "";

  // Atualizar a tabela
  listarTarefas();
}


// FUNÇÃO 2 - LISTAR TAREFAS
function listarTarefas() {

  let tabela = document.getElementById("tabelaTarefas");

  // Limpar a tabela antes de atualizar
  tabela.innerHTML = "";

  tarefas.forEach(function(tarefa) {

    let linha = document.createElement("tr");

    // Código
    let colunaCodigo = document.createElement("td");
    colunaCodigo.textContent = tarefa.codigo;

    // Título
    let colunaTitulo = document.createElement("td");
    colunaTitulo.textContent = tarefa.titulo;

    // Prioridade
    let colunaPrioridade = document.createElement("td");

    if (tarefa.prioridade === 1) {
      colunaPrioridade.textContent = "Alta";
      colunaPrioridade.className = "alta";
    } else if (tarefa.prioridade === 2) {
      colunaPrioridade.textContent = "Média";
      colunaPrioridade.className = "media";
    } else {
      colunaPrioridade.textContent = "Baixa";
      colunaPrioridade.className = "baixa";
    }

    // Status
    let colunaStatus = document.createElement("td");

    if (tarefa.concluida) {
      colunaStatus.textContent = "Concluída";
      colunaStatus.className = "concluida";
    } else {
      colunaStatus.textContent = "Pendente";
      colunaStatus.className = "pendente";
    }

    // Ações
    let colunaAcoes = document.createElement("td");

    // Botão concluir
    let botaoConcluir = document.createElement("button");
    botaoConcluir.textContent = "Concluir";
    botaoConcluir.className = "btn-concluir";
    botaoConcluir.disabled = tarefa.concluida;

    botaoConcluir.onclick = function() {
      concluirTarefa(tarefa.codigo);
    };

    // Botão alterar prioridade
    let botaoPrioridade = document.createElement("button");
    botaoPrioridade.textContent = "Alterar Prioridade";
    botaoPrioridade.className = "btn-prioridade";

    botaoPrioridade.onclick = function() {
      alterarPrioridade(tarefa.codigo);
    };

    colunaAcoes.appendChild(botaoConcluir);
    colunaAcoes.appendChild(botaoPrioridade);

    // Adicionar colunas à linha
    linha.appendChild(colunaCodigo);
    linha.appendChild(colunaTitulo);
    linha.appendChild(colunaPrioridade);
    linha.appendChild(colunaStatus);
    linha.appendChild(colunaAcoes);

    // Adicionar linha à tabela
    tabela.appendChild(linha);
  });
}


// FUNÇÃO 3 - MARCAR TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

  let tarefa = tarefas.find(function(t) {
    return t.codigo === codigo;
  });

  if (tarefa) {
    tarefa.concluida = true;

    alert("Tarefa marcada como concluída!");

    listarTarefas();
  }
}


// FUNÇÃO 4 - ALTERAR PRIORIDADE
function alterarPrioridade(codigo) {

  let tarefa = tarefas.find(function(t) {
    return t.codigo === codigo;
  });

  if (!tarefa) {
    alert("Tarefa não encontrada!");
    return;
  }

  let novaPrioridade = Number(
    prompt(
      "Digite a nova prioridade:\n" +
      "1 - Alta\n" +
      "2 - Média\n" +
      "3 - Baixa"
    )
  );

  // Validar prioridade
  if (!Number.isInteger(novaPrioridade) ||
      novaPrioridade < 1 ||
      novaPrioridade > 3) {

    alert("Prioridade inválida! Digite 1, 2 ou 3.");
    return;
  }

  tarefa.prioridade = novaPrioridade;

  alert("Prioridade alterada com sucesso!");

  listarTarefas();
}
