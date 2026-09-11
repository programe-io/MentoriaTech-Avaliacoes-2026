// ==========================================
// 1. ARMAZENAMENTO E GERADOR DE CÓDIGO
// ==========================================
let tarefas = [];
let proximoCodigo = 1; // Gerador de código independente

// ==========================================
// 2. FUNÇÕES AUXILIARES E VALIDAÇÕES
// ==========================================

/**
 * Valida o título e a prioridade da tarefa.
 * Lança um erro (throw) se qualquer validação falhar.
 */
function validarDadosDaTarefa(titulo, prioridade) {
  if (!titulo || titulo.trim().length < 5) {
    throw new Error("O título da tarefa deve ter, no mínimo, 5 caracteres.");
  }

  // Converte explicitamente para número antes de comparar
  const prioridadeNum = Number(prioridade);

  if (isNaN(prioridadeNum) || prioridadeNum < 1 || prioridadeNum > 3) {
    throw new Error("A prioridade deve ser um número entre 1 (Alta) e 3 (Baixa).");
  }
}

/**
 * Busca uma tarefa pelo código utilizando o método .find()
 * Lança um erro caso o código não seja encontrado.
 */
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find((t) => t.codigo === Number(codigo));

  if (!tarefaEncontrada) {
    throw new Error(`Tarefa com o código #${codigo} não foi encontrada.`);
  }

  return tarefaEncontrada;
}

// ==========================================
// 3. OPERAÇÕES PRINCIPAIS DO SISTEMA
// ==========================================

/**
 * Cadastra uma nova tarefa no array.
 * Status inicial: true (em execução/não concluída).
 */
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  const novaTarefa = {
    codigo: proximoCodigo++, // Garante código único e sequencial
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true // true = Em execução, false = Concluída
  };

  tarefas.push(novaTarefa);
  renderizarTarefas();
}

/**
 * Retorna a lista de tarefas cadastradas.
 */
function listarTarefas() {
  return tarefas;
}

/**
 * Altera o status da tarefa para concluída (false).
 * Impede conclusão duplicada.
 */
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Esta tarefa já está concluída.");
  }

  tarefa.status = false; // Altera para concluída
  renderizarTarefas();
}

/**
 * Altera a prioridade de uma tarefa existente.
 * Reutiliza a validação existente.
 */
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  // Reutiliza a validação usando o título atual e a nova prioridade
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = Number(novaPrioridade);
  renderizarTarefas();
}

// ==========================================
// 4. INTERAÇÃO COM A TELA (DOM)
// ==========================================

function renderizarTarefas() {
  const containerLista = document.getElementById("lista-tarefas");
  if (!containerLista) return;

  containerLista.innerHTML = "";

  const listaAtual = listarTarefas();

  if (listaAtual.length === 0) {
    containerLista.innerHTML = "<p style='text-align: center; color: #7f8c8d;'>Nenhuma tarefa cadastrada até o momento.</p>";
    return;
  }

  // Percorre as tarefas e constrói a exibição na página
  listaAtual.forEach((tarefa) => {
    const div = document.createElement("div");
    div.className = `tarefa-item ${!tarefa.status ? "concluida" : ""}`;

    const textoPrioridade = tarefa.prioridade === 1 ? "Alta" : tarefa.prioridade === 2 ? "Média" : "Baixa";

    div.innerHTML = `
      <div class="tarefa-info">
        <span class="tarefa-codigo">#${tarefa.codigo}</span>
        <span class="tarefa-titulo">${tarefa.titulo}</span>
        <div class="badges">
          <span class="badge badge-p${tarefa.prioridade}">Prioridade: ${textoPrioridade}</span>
          <span class="badge ${tarefa.status ? "badge-status-execucao" : "badge-status-concluida"}">
            ${tarefa.status ? "Em Execução" : "Concluída"}
          </span>
        </div>
      </div>
      <div class="tarefa-acoes">
        ${tarefa.status ? `<button type="button" class="btn btn-concluir" onclick="handleConcluir(${tarefa.codigo})">Concluir</button>` : ""}
        <button type="button" class="btn btn-prioridade" onclick="handleAlterarPrioridade(${tarefa.codigo})">Mudar Prioridade</button>
      </div>
    `;

    containerLista.appendChild(div);
  });
}

function exibirMensagem(texto, tipo) {
  const divMsg = document.getElementById("mensagem");
  if (!divMsg) return;

  divMsg.textContent = texto;
  divMsg.className = `mensagem ${tipo}`;

  setTimeout(() => {
    divMsg.className = "mensagem hidden";
  }, 4000);
}

// Handlers chamados pela interface do usuário
function handleConcluir(codigo) {
  try {
    concluirTarefa(codigo);
    exibirMensagem(`Tarefa #${codigo} concluída com sucesso!`, "sucesso");
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
}

function handleAlterarPrioridade(codigo) {
  const novaPrioridadeStr = prompt("Informe a nova prioridade (1 = Alta, 2 = Média, 3 = Baixa):");
  if (novaPrioridadeStr === null) return; // Cancelado pelo usuário

  try {
    alterarPrioridade(codigo, novaPrioridadeStr);
    exibirMensagem(`Prioridade da tarefa #${codigo} alterada com sucesso!`, "sucesso");
  } catch (error) {
    exibirMensagem(error.message, "erro");
  }
}

// Escuta o envio do formulário de cadastro
document.addEventListener("DOMContentLoaded", () => {
  const formTarefa = document.getElementById("form-tarefa");
  
  if (formTarefa) {
    formTarefa.addEventListener("submit", (e) => {
      e.preventDefault();

      const titulo = document.getElementById("titulo").value;
      const prioridade = Number(document.getElementById("prioridade").value);

      try {
        cadastrarTarefa(titulo, prioridade);
        exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");

        // Limpa os campos do formulário
        formTarefa.reset();
      } catch (error) {
        exibirMensagem(error.message, "erro");
      }
    });
  }

  // Inicialização da interface
  renderizarTarefas();
});