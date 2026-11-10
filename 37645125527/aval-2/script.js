// --- 3. Armazenamento com Array & 7. Gerador de Códigos ---
const tarefas = [];[cite: 2]
let proximoCodigo = 1;[cite: 3]

// --- 5. Validação dos Dados da Tarefa ---
function validarDadosDaTarefa(titulo, prioridade) {
  // Validação do título (mínimo de 5 caracteres)
  if (!titulo || titulo.trim().length < 5) {
    throw new Error("O título da tarefa deve ter no mínimo 5 caracteres.");[cite: 2]
  }

  // Validação da prioridade (entre 1 e 3)
  const prioNum = Number(prioridade);
  if (isNaN(prioNum) || prioNum < 1 || prioNum > 3) {
    throw new Error("A prioridade deve estar entre 1 (Alta) e 3 (Baixa).");[cite: 2, 3]
  }
}

// --- 9. Busca de Tarefas com find ---
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === Number(codigo));[cite: 4]
  
  if (!tarefa) {
    throw new Error(`Tarefa com o código ${codigo} não foi encontrada.`);[cite: 4]
  }
  
  return tarefa;[cite: 4]
}

// --- 6. Cadastro e Modelagem de Tarefa ---
function cadastrarTarefa(titulo, prioridade) {
  // Executa validação
  validarDadosDaTarefa(titulo, prioridade);[cite: 3]

  // Cria objeto com status inicial true (em execução / não concluída)
  const novaTarefa = {
    codigo: proximoCodigo++,[cite: 3]
    titulo: titulo.trim(),[cite: 3]
    prioridade: Number(prioridade),[cite: 3]
    status: true // true = Em execução, false = Concluída
  };[cite: 1, 3]

  tarefas.push(novaTarefa);[cite: 3]
  return novaTarefa;
}

// --- 8. Listagem das Tarefas ---
function listarTarefas() {
  return tarefas;[cite: 3]
}

// --- 10. Conclusão de uma Tarefa ---
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);[cite: 4]

  if (tarefa.status === false) {
    throw new Error("Esta tarefa já estava concluída.");[cite: 4]
  }

  tarefa.status = false; // Altera status para concluído[cite: 4]
  return tarefa;
}

// --- 11. Alteração da Prioridade ---
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);[cite: 4]
  
  // Reutiliza a validação passando o título existente
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);[cite: 4]

  tarefa.prioridade = Number(novaPrioridade);[cite: 5]
  return tarefa;
}

// ============================================================================
// COMPONENTES DE INTERAÇÃO COM A TELA (DOM)
// ============================================================================

const formTarefa = document.getElementById("form-tarefa");
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const containerLista = document.getElementById("lista-tarefas");
const divMensagem = document.getElementById("mensagem");

// Exibe mensagens na interface (Sucesso ou Erro)
function exibirMensagem(texto, tipo = "sucesso") {
  divMensagem.textContent = texto;
  divMensagem.className = `mensagem ${tipo}`;
  
  setTimeout(() => {
    divMensagem.className = "mensagem hidden";
  }, 4000);
}

// Renderiza a lista na tela (Conforme sugerido na seção 13 de evolução)
function renderizarLista() {
  const lista = listarTarefas();[cite: 3]
  containerLista.innerHTML = "";

  if (lista.length === 0) {
    containerLista.innerHTML = "<p>Nenhuma tarefa cadastrada no momento.</p>";
    return;
  }

  lista.forEach((tarefa) => {
    const item = document.createElement("div");
    item.className = `tarefa-item ${!tarefa.status ? "concluida" : ""}`;

    const textoPrioridade = 
      tarefa.prioridade === 1 ? "Alta" : 
      tarefa.prioridade === 2 ? "Média" : "Baixa";

    item.innerHTML = `
      <div class="tarefa-info">
        <p class="tarefa-titulo"><strong>[#${tarefa.codigo}]</strong> ${tarefa.titulo}</p>
        <p>
          Prioridade: <span class="badge p-${tarefa.prioridade}">${textoPrioridade}</span> | 
          Status: <strong>${tarefa.status ? "Em Execução" : "Concluída"}</strong>
        </p>
      </div>
      <div class="tarefa-acoes">
        ${tarefa.status ? `
          <select onchange="handleAlterarPrioridade(${tarefa.codigo}, this.value)" class="select-prioridade">
            <option value="" disabled selected>Alterar Prio</option>
            <option value="1">1 - Alta</option>
            <option value="2">2 - Média</option>
            <option value="3">3 - Baixa</option>
          </select>
          <button class="btn btn-success" onclick="handleConcluir(${tarefa.codigo})">Concluir</button>
        ` : '<span>✔ Feito</span>'}
      </div>
    `;

    containerLista.appendChild(item);
  });
}

// Submissão do formulário
formTarefa.addEventListener("submit", (e) => {
  e.preventDefault();

  try {
    cadastrarTarefa(inputTitulo.value, selectPrioridade.value);[cite: 3]
    renderizarLista();
    exibirMensagem("Tarefa cadastrada com sucesso!", "sucesso");
    
    // Limpa os campos
    inputTitulo.value = "";
    selectPrioridade.value = "";
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
});

// Handler para alterar prioridade via tela
function handleAlterarPrioridade(codigo, novaPrioridade) {
  try {
    alterarPrioridade(codigo, novaPrioridade);[cite: 4]
    renderizarLista();
    exibirMensagem(`Prioridade da tarefa #${codigo} alterada com sucesso!`, "sucesso");
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
}

// Handler para concluir tarefa via tela
function handleConcluir(codigo) {
  try {
    concluirTarefa(codigo);[cite: 4]
    renderizarLista();
    exibirMensagem(`Tarefa #${codigo} marcada como concluída!`, "sucesso");
  } catch (erro) {
    exibirMensagem(erro.message, "erro");
  }
}

// Inicializa com a lista vazia
renderizarLista();