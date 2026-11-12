let tarefas = [];
let proximoCodigo = 1;

const btnCadastrar = document.getElementById("btn-cadastrar");
const inputTitulo = document.getElementById("titulo");
const inputPrioridade = document.getElementById("prioridade");
const listaTarefas = document.getElementById("lista-tarefas");
const mensagemEl = document.getElementById("mensagem");

function exibirMensagem(texto, tipo) {
  mensagemEl.textContent = texto;
  mensagemEl.className = `mensagem ${tipo}`;
}

// 1. Cadastrar uma nova tarefa ao clicar no botão
btnCadastrar.addEventListener("click", function () {
  const titulo = inputTitulo.value.trim();
  const prioridade = Number(inputPrioridade.value);

  // Regra 1: Título deve ter no mínimo 5 caracteres
  if (titulo.length < 5) {
    exibirMensagem("Erro: O título deve ter no mínimo 5 caracteres.", "erro");
    return;
  }

  // Regra 2: Prioridade deve ser entre 1 (alta) e 3 (baixa)
  if (prioridade !== 1 && prioridade !== 2 && prioridade !== 3) {
    exibirMensagem("Erro: A prioridade deve ser um valor entre 1 e 3.", "erro");
    return;
  }

  const novaTarefa = {
    codigo: proximoCodigo++,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.push(novaTarefa);
  exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");

  inputTitulo.value = "";
  inputPrioridade.value = "1";
  listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
  listaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    listaTarefas.innerHTML = "<li>Nenhuma tarefa cadastrada.</li>";
    return;
  }

  const textosPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

  tarefas.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `item-tarefa ${tarefa.concluida ? "concluida" : ""}`;

    li.innerHTML = `
      <div>
        <strong class="info-titulo">[#${tarefa.codigo}] ${tarefa.titulo}</strong><br>
        <small>Prioridade: ${tarefa.prioridade} (${textosPrioridade[tarefa.prioridade]}) | Status: ${tarefa.concluida ? "Concluída" : "Pendente"}</small>
      </div>
      <div class="acoes">
        <button type="button" class="btn-acao btn-concluir" onclick="concluirTarefa(${tarefa.codigo})">
          ${tarefa.concluida ? "Concluída" : "Concluir"}
        </button>
        <button type="button" class="btn-acao btn-prioridade" onclick="alterarPrioridade(${tarefa.codigo})">
          Alterar Prioridade
        </button>
      </div>
    `;

    listaTarefas.appendChild(li);
  });
}

// 3. Marcar uma tarefa como concluída
function concluirTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (tarefa) {
    tarefa.concluida = true;
    exibirMensagem(`Tarefa #${codigo} marcada como concluída.`, "sucesso");
    listarTarefas();
  }
}

// 4. Alterar a prioridade de uma tarefa
function alterarPrioridade(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) return;

  const entrada = prompt("Digite a nova prioridade: 1 (Alta), 2 (Média) ou 3 (Baixa):");
  if (entrada === null) return;

  const novaPrioridade = Number(entrada);

  if (novaPrioridade !== 1 && novaPrioridade !== 2 && novaPrioridade !== 3) {
    exibirMensagem("Erro: A prioridade deve ser 1, 2 ou 3.", "erro");
    return;
  }

  tarefa.prioridade = novaPrioridade;
  exibirMensagem(`Prioridade da tarefa #${codigo} atualizada!`, "sucesso");
  listarTarefas();
}

listarTarefas();
