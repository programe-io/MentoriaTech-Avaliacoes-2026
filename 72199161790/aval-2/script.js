// Array que armazena as tarefas cadastradas
let tarefas = [];

// Referências aos elementos do DOM
const formTarefa = document.getElementById("form-tarefa");
const tabelaTarefas = document.getElementById("tabela-tarefas");
const listaVazia = document.getElementById("lista-vazia");
const resumoTarefasEl = document.getElementById("resumo-tarefas");
const mensagemEl = document.getElementById("mensagem");

// Exibe feedback visual para o usuário
function exibirMensagem(texto, erro = false) {
  mensagemEl.textContent = texto;
  mensagemEl.style.color = erro ? "#dc2626" : "#059669";
  setTimeout(() => {
    mensagemEl.textContent = "";
  }, 4000);
}

// Converte o número da prioridade para texto descritivo
function formatarPrioridade(prioridade) {
  if (prioridade === 1) return "1 - Alta";
  if (prioridade === 2) return "2 - Média";
  return "3 - Baixa";
}

// 1. Cadastrar uma nova tarefa (com validações)
formTarefa.addEventListener("submit", function (evento) {
  evento.preventDefault();

  const codigo = Number(document.getElementById("codigo").value);
  const titulo = document.getElementById("titulo").value.trim();
  const prioridade = Number(document.getElementById("prioridade").value);

  // Validação: código duplicado
  const codigoExiste = tarefas.some((t) => t.codigo === codigo);
  if (codigoExiste) {
    exibirMensagem("Erro: Já existe uma tarefa com este código!", true);
    return;
  }

  // Validação: título com no mínimo 5 caracteres
  if (titulo.length < 5) {
    exibirMensagem("Erro: O título deve ter no mínimo 5 caracteres!", true);
    return;
  }

  // Validação: prioridade entre 1 e 3
  if (![1, 2, 3].includes(prioridade)) {
    exibirMensagem("Erro: A prioridade deve ser 1 (Alta), 2 (Média) ou 3 (Baixa)!", true);
    return;
  }

  const novaTarefa = {
    codigo: codigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false, // Status de conclusão inicial
  };

  tarefas.push(novaTarefa);
  formTarefa.reset();
  document.getElementById("prioridade").value = "2";
  exibirMensagem(`Tarefa "${titulo}" cadastrada com sucesso!`);
  listarTarefas();
});

// 2. Listar as tarefas cadastradas
function listarTarefas() {
  tabelaTarefas.innerHTML = "";

  if (tarefas.length === 0) {
    listaVazia.style.display = "block";
    resumoTarefasEl.textContent = "0 tarefas | 0 concluídas";
    return;
  }

  listaVazia.style.display = "none";

  let totalConcluidas = 0;

  tarefas.forEach((tarefa) => {
    if (tarefa.concluida) totalConcluidas++;

    const linha = document.createElement("tr");
    const classeTitulo = tarefa.concluida ? "texto-riscado" : "";
    const statusTexto = tarefa.concluida ? "Concluída" : "Pendente";
    const statusClasse = tarefa.concluida ? "status-concluida" : "status-pendente";

    linha.innerHTML = `
      <td>${tarefa.codigo}</td>
      <td class="${classeTitulo}">${tarefa.titulo}</td>
      <td><span class="tag prio-${tarefa.prioridade}">${formatarPrioridade(tarefa.prioridade)}</span></td>
      <td><span class="tag ${statusClasse}">${statusTexto}</span></td>
      <td>
        ${
          !tarefa.concluida
            ? `<button class="btn-acao btn-concluir" onclick="marcarComoConcluida(${tarefa.codigo})">Concluir</button>`
            : ""
        }
        <button class="btn-acao btn-prioridade" onclick="alterarPrioridade(${tarefa.codigo})">Prioridade</button>
      </td>
    `;

    tabelaTarefas.appendChild(linha);
  });

  resumoTarefasEl.textContent = `${tarefas.length} tarefa(s) | ${totalConcluidas} concluída(s)`;
}

// 3. Marcar uma tarefa como concluída
function marcarComoConcluida(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) return;

  tarefa.concluida = true;
  exibirMensagem(`Tarefa "${tarefa.titulo}" marcada como concluída!`);
  listarTarefas();
}

// 4. Alterar a prioridade de uma tarefa (com validação entre 1 e 3)
function alterarPrioridade(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) return;

  const entrada = prompt(
    `Prioridade atual de "${tarefa.titulo}": ${formatarPrioridade(tarefa.prioridade)}\n` +
    "Digite a nova prioridade (1 = Alta, 2 = Média, 3 = Baixa):"
  );

  if (entrada === null) return;
  const novaPrioridade = Number(entrada);

  if (![1, 2, 3].includes(novaPrioridade)) {
    alert("Prioridade inválida! Digite apenas 1 (Alta), 2 (Média) ou 3 (Baixa).");
    return;
  }

  tarefa.prioridade = novaPrioridade;
  exibirMensagem(`Prioridade de "${tarefa.titulo}" atualizada para ${formatarPrioridade(novaPrioridade)}!`);
  listarTarefas();
}

// Inicializa a visualização
listarTarefas();