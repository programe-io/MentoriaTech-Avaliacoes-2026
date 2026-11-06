let tarefas = [];

// 1 - CADASTRAR UMA NOVA TAREFA
function cadastrarTarefa() {
  let codigo = document.getElementById("codigo").value.trim();
  let titulo = document.getElementById("titulo").value.trim();
  let prioridade = Number(document.getElementById("prioridade").value);
  let erroTitulo = document.getElementById("erroTitulo");

  // VALIDAÇÃO: Título mínimo 5 caracteres
  if (titulo.length < 5) {
    erroTitulo.style.display = "block";
    return;
  } else {
    erroTitulo.style.display = "none";
  }

  // VALIDAÇÃO: Prioridade entre 1 e 3
  if (prioridade < 1 || prioridade > 3) {
    alert("Prioridade inválida! Use 1 (Alta), 2 (Média) ou 3 (Baixa).");
    return;
  }

  if (codigo == "") {
    alert("Digite o código da tarefa!");
    return;
  }

  let tarefa = {
    codigo: codigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(tarefa);
  listarTarefas();

  document.getElementById("codigo").value = "";
  document.getElementById("titulo").value = "";
  document.getElementById("prioridade").value = "1";

  alert("Tarefa cadastrada com sucesso!");
}

// 2 - LISTAR AS TAREFAS CADASTRADAS
function listarTarefas() {
  let lista = document.getElementById("lista");
  lista.innerHTML = "";

  if (tarefas.length == 0) {
    lista.innerHTML = '<div class="vazio">Nenhuma tarefa cadastrada.</div>';
    return;
  }

  for (let i = 0; i < tarefas.length; i++) {
    let nomePrioridade = "";
    if (tarefas[i].prioridade == 1) nomePrioridade = "Alta (1)";
    else if (tarefas[i].prioridade == 2) nomePrioridade = "Média (2)";
    else nomePrioridade = "Baixa (3)";

    let status = tarefas[i].concluida ? "Concluída ✅" : "Pendente ⏳";
    let classe = tarefas[i].concluida ? "tarefa concluida" : "tarefa";

    lista.innerHTML += `
      <div class="${classe}">
        <div class="titulo">${tarefas[i].titulo}</div>
        <div class="info">Código: ${tarefas[i].codigo}</div>
        <div class="info">Prioridade: ${nomePrioridade}</div>
        <div class="info">Status: ${status}</div>
        <div class="botoes">
          <button class="btn-concluir" onclick="marcarConcluida(${i})">Concluir</button>
          <button class="btn-prioridade" onclick="alterarPrioridade(${i})">Alterar Prioridade</button>
          <button class="btn-excluir" onclick="excluirTarefa(${i})">Excluir</button>
        </div>
      </div>
    `;
  }
}

// 3 - MARCAR UMA TAREFA COMO CONCLUÍDA
function marcarConcluida(indice) {
  tarefas[indice].concluida = true;
  listarTarefas();
  alert("Tarefa marcada como concluída!");
}

// 4 - ALTERAR A PRIORIDADE DE UMA TAREFA
function alterarPrioridade(indice) {
  let nova = Number(prompt("Digite a nova prioridade:\n1 - Alta\n2 - Média\n3 - Baixa"));

  while (nova < 1 || nova > 3 || isNaN(nova)) {
    nova = Number(prompt("Prioridade inválida! Digite 1, 2 ou 3:"));
  }

  tarefas[indice].prioridade = nova;
  listarTarefas();
  alert("Prioridade alterada com sucesso!");
}

function excluirTarefa(indice) {
  if (confirm("Deseja excluir esta tarefa?")) {
    tarefas.splice(indice, 1);
    listarTarefas();
  }
}

listarTarefas();