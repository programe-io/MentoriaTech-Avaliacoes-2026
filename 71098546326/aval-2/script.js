
// Array que armazena as tarefas
let tarefas = [];

// Variável para controlar os códigos
let proximoCodigo = 1;


// 1. CADASTRAR UMA NOVA TAREFA
function cadastrarTarefa() {

  const titulo = document.getElementById("titulo").value.trim();
  const prioridade = Number(
    document.getElementById("prioridade").value
  );

  // Validar título
  if (titulo.length < 5) {
    alert("O título deve ter no mínimo 5 caracteres!");
    return;
  }

  // Validar prioridade
  if (![1, 2, 3].includes(prioridade)) {
    alert("A prioridade deve ser entre 1 e 3!");
    return;
  }

  // Criar objeto da tarefa
  const tarefa = {
    codigo: proximoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(tarefa);

  proximoCodigo++;

  alert("Tarefa cadastrada com sucesso!");

  // Limpar campos
  document.getElementById("titulo").value = "";
  document.getElementById("prioridade").value = "";

  listarTarefas();
}


// 2. LISTAR AS TAREFAS CADASTRADAS
function listarTarefas() {

  const areaTarefas = document.getElementById("tarefas");

  areaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    areaTarefas.innerHTML =
      '<p class="vazio">Nenhuma tarefa cadastrada.</p>';
    return;
  }

  tarefas.forEach(function(tarefa) {

    let prioridadeTexto = "";
    let classePrioridade = "";

    if (tarefa.prioridade === 1) {
      prioridadeTexto = "Alta";
      classePrioridade = "alta";
    } else if (tarefa.prioridade === 2) {
      prioridadeTexto = "Média";
      classePrioridade = "media";
    } else {
      prioridadeTexto = "Baixa";
      classePrioridade = "baixa";
    }

    const status = tarefa.concluida
      ? "Concluída"
      : "Pendente";

    const div = document.createElement("div");

    div.className = tarefa.concluida
      ? "tarefa concluida"
      : "tarefa";

    const titulo = document.createElement("p");
    titulo.className = "titulo-tarefa";
    titulo.textContent = "Código: " + tarefa.codigo +
      " - " + tarefa.titulo;

    const prioridade = document.createElement("p");
    prioridade.innerHTML = "Prioridade: ";

    const span = document.createElement("span");
    span.className = classePrioridade;
    span.textContent = prioridadeTexto;
    prioridade.appendChild(span);

    const statusElemento = document.createElement("p");
    statusElemento.textContent = "Status: " + status;

    div.appendChild(titulo);
    div.appendChild(prioridade);
    div.appendChild(statusElemento);

    // Botão para concluir tarefa
    if (!tarefa.concluida) {
      const botaoConcluir = document.createElement("button");

      botaoConcluir.textContent = "Concluir";
      botaoConcluir.className = "btn-concluir";

      botaoConcluir.onclick = function() {
        concluirTarefa(tarefa.codigo);
      };

      div.appendChild(botaoConcluir);
    }

    // Botão para alterar prioridade
    const botaoAlterar = document.createElement("button");

    botaoAlterar.textContent = "Alterar prioridade";
    botaoAlterar.className = "btn-alterar";

    botaoAlterar.onclick = function() {
      alterarPrioridade(tarefa.codigo);
    };

    div.appendChild(botaoAlterar);

    areaTarefas.appendChild(div);
  });
}


// 3. MARCAR UMA TAREFA COMO CONCLUÍDA
function concluirTarefa(codigo) {

  const tarefa = tarefas.find(function(item) {
    return item.codigo === codigo;
  });

  if (!tarefa) {
    alert("Tarefa não encontrada!");
    return;
  }

  tarefa.concluida = true;

  alert("Tarefa concluída com sucesso!");

  listarTarefas();
}


// 4. ALTERAR A PRIORIDADE DE UMA TAREFA
function alterarPrioridade(codigo) {

  const tarefa = tarefas.find(function(item) {
    return item.codigo === codigo;
  });

  if (!tarefa) {
    alert("Tarefa não encontrada!");
    return;
  }

  const novaPrioridade = Number(
    prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa")
  );

  if (![1, 2, 3].includes(novaPrioridade)) {
    alert("Prioridade inválida! Digite 1, 2 ou 3.");
    return;
  }

  tarefa.prioridade = novaPrioridade;

  alert("Prioridade alterada com sucesso!");

  listarTarefas();
}


// Exibir lista inicial
listarTarefas();
