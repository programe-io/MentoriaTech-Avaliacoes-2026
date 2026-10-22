// 1. Array principal que armazena as tarefas escolares
let tarefas = [];
// Variável para gerar o código único de cada tarefa
let geradorCodigo = 0;

// Selecionando elementos do HTML
const form = document.getElementById('form-tarefa');
const inputTitulo = document.getElementById('titulo');
const inputPrioridade = document.getElementById('prioridade');
const listaHTML = document.getElementById('lista-tarefas');
const divErro = document.getElementById('mensagem-erro');

// ==========================================
// FUNÇÕES DE LÓGICA (Baseadas no PDF)
// ==========================================

// 1. Validação dos dados
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("A descrição da tarefa deve ter no mínimo 5 caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A urgência deve ser entre 1 (Urgente) e 3 (Tranquila).");
  }
}

// 2. Buscar tarefa pelo código (Método find)
function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find(tarefa => tarefa.codigo === codigo);
  if (!tarefaEncontrada) {
    throw new Error("Tarefa não encontrada na agenda.");
  }
  return tarefaEncontrada;
}

// 3. Cadastrar nova tarefa
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);
  
  geradorCodigo++; // Incrementa o código para garantir que seja único
  
  const novaTarefa = {
    codigo: geradorCodigo,
    titulo: titulo,
    prioridade: parseInt(prioridade),
    concluida: false // Status inicial sempre falso
  };
  
  tarefas.push(novaTarefa);
  return novaTarefa;
}

// 4. Concluir Tarefa
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  
  if (tarefa.concluida) {
    throw new Error("Boa notícia! Você já entregou esta tarefa.");
  }
  
  tarefa.concluida = true;
}

// 5. Alterar Prioridade
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  
  // Reutiliza a validação, passando o título atual (já validado) e a nova prioridade
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  
  tarefa.prioridade = parseInt(novaPrioridade);
}

// ==========================================
// FUNÇÕES DE INTERFACE (Para exibir na tela)
// ==========================================

function exibirMensagemErro(mensagem) {
  divErro.textContent = "⚠️ " + mensagem;
  divErro.classList.remove('oculto');
  setTimeout(() => divErro.classList.add('oculto'), 4000);
}

// Atualiza a lista visual na tela
function renderizarTarefas() {
  listaHTML.innerHTML = ''; // Limpa a lista atual
  
  if (tarefas.length === 0) {
    listaHTML.innerHTML = '<li class="vazio">Nenhum dever cadastrado. Aproveite o tempo livre!</li>';
    return;
  }

  // Percorre o array e cria os elementos HTML
  tarefas.forEach(tarefa => {
    const li = document.createElement('li');
    li.className = `prioridade-${tarefa.prioridade} ${tarefa.concluida ? 'concluida' : ''}`;
    
    // Traduz o número da prioridade para texto escolar
    let urgenciaTexto = '';
    if (tarefa.prioridade === 1) urgenciaTexto = 'Urgente';
    if (tarefa.prioridade === 2) urgenciaTexto = 'Média';
    if (tarefa.prioridade === 3) urgenciaTexto = 'Tranquila';

    const statusTexto = tarefa.concluida ? '✅ Entregue' : '📌 Pendente';

    li.innerHTML = `
      <div class="tarefa-info">
        <span class="tarefa-titulo">[Nº ${tarefa.codigo}] ${tarefa.titulo}</span>
        <span class="tarefa-detalhes">Urgência: <strong>${urgenciaTexto}</strong> | Status: ${statusTexto}</span>
      </div>
      <div class="tarefa-acoes">
        ${!tarefa.concluida ? `<button class="btn-acao btn-concluir" onclick="acaoConcluir(${tarefa.codigo})">Entregar</button>` : ''}
        <button class="btn-acao btn-prioridade" onclick="acaoAlterarPrioridade(${tarefa.codigo})">Mudar Urgência</button>
      </div>
    `;
    
    listaHTML.appendChild(li);
  });
}

// ==========================================
// AÇÕES DO USUÁRIO (Eventos)
// ==========================================

// Evento de envio do formulário
form.addEventListener('submit', (e) => {
  e.preventDefault(); // Evita recarregar a página
  
  try {
    cadastrarTarefa(inputTitulo.value.trim(), inputPrioridade.value);
    form.reset(); // Limpa o formulário
    renderizarTarefas(); // Atualiza a tela
  } catch (erro) {
    exibirMensagemErro(erro.message);
  }
});

// Função acionada pelo botão "Entregar"
window.acaoConcluir = function(codigo) {
  try {
    concluirTarefa(codigo);
    renderizarTarefas();
  } catch (erro) {
    exibirMensagemErro(erro.message);
  }
}

// Função acionada pelo botão "Mudar Urgência"
window.acaoAlterarPrioridade = function(codigo) {
  const novaPrioridade = prompt("Digite o novo nível de urgência:\n1 - Urgente\n2 - Média\n3 - Tranquila");
  
  if (novaPrioridade === null) return; // Se o usuário cancelar
  
  try {
    alterarPrioridade(codigo, novaPrioridade);
    renderizarTarefas();
  } catch (erro) {
    exibirMensagemErro(erro.message);
  }
}

// Inicializa a lista vazia ao carregar a página
renderizarTarefas();