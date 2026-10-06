// ==========================================
// 1. INTRODUÇÃO AO DOM (SELEÇÃO DE ELEMENTOS)
// ==========================================
const formProduto = document.getElementById("form-produto");
const inputNome = document.getElementById("input-nome");
const selectCategoria = document.getElementById("select-categoria");
const inputPreco = document.getElementById("input-preco");
const listaProdutos = document.getElementById("lista-produtos");
const estadoVazio = document.getElementById("estado-vazio");
const contadorItens = document.getElementById("contador-itens");
const consoleLog = document.getElementById("console-log");

// Array de dados inicial para testes
let totalProdutos = 0;

// Inicializador de Ícones Lucide e evento de arranque
document.addEventListener("DOMContentLoaded", () => {
  registrarLog("document.addEventListener('DOMContentLoaded')", "Eventos", "Página totalmente carregada.");
  lucide.createIcons();
});

// ==========================================
// FUNÇÃO PARA REGISTAR LOGS DE APRENDIZADO
// ==========================================
function registrarLog(metodo, conceito, descricao) {
  const itemLog = document.createElement("div");
  itemLog.className = "p-2 bg-slate-800/80 rounded-xl border border-slate-700/60 text-[11px] space-y-1 animate-fadeIn";

  const hora = new Date().toLocaleTimeString();

  itemLog.innerHTML = `
    <div class="flex items-center justify-between text-sky-400 font-bold">
      <span class="text-amber-400">${metodo}</span>
      <span class="text-[9px] bg-slate-900 px-1.5 py-0.5 rounded text-slate-400">${hora}</span>
    </div>
    <div class="text-slate-300 font-sans text-[10px]">
      <span class="text-emerald-400 font-semibold">[${conceito}]</span> ${descricao}
    </div>
  `;

  consoleLog.prepend(itemLog);
}

function limparConsoleLog() {
  consoleLog.innerHTML = "";
  registrarLog("consoleLog.innerHTML = ''", "Remoção", "Console limpo com sucesso.");
}

// ==========================================
// 2. EVENTOS & 3. CRIAÇÃO DE ELEMENTOS
// ==========================================
function adicionarProduto(event) {
  // Impede o comportamento padrão de recarregar a página no submit
  event.preventDefault();
  registrarLog("event.preventDefault()", "Eventos", "Evitou o recarregamento do formulário.");

  const nome = inputNome.value.trim();
  const categoria = selectCategoria.value;
  const preco = parseFloat(inputPreco.value).toFixed(2);

  if (!nome || isNaN(preco)) return;

  totalProdutos++;

  // 3. CRIAÇÃO DE ELEMENTO (createElement)
  const li = document.createElement("li");
  registrarLog("document.createElement('li')", "Criação", "Novo elemento <li> criado na memória.");

  // 4. CLASSES E ESTILOS VIA JAVASCRIPT
  li.className = "p-4 bg-white border border-sky-100 rounded-2xl flex items-center justify-between shadow-sm hover:shadow transition-all group";
  li.setAttribute("data-id", totalProdutos);

  // Montagem do HTML interno do item
  li.innerHTML = `
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-sky-50 text-sky-500 flex items-center justify-center font-bold text-xs border border-sky-100">
        ${categoria[0]}
      </div>
      <div>
        <h4 class="font-semibold text-slate-800 text-sm leading-tight">${nome}</h4>
        <span class="text-xs text-slate-400">${categoria} &bull; <strong class="text-sky-600">R$ ${preco}</strong></span>
      </div>
    </div>
    
    <div class="flex items-center gap-2">
      <button onclick="alternarDestaqueItem(this)" title="Alternar Destaque" 
              class="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition-colors">
        <i data-lucide="sparkles" class="w-4 h-4"></i>
      </button>
      <button onclick="removerItem(this)" title="Remover do DOM" 
              class="p-2 rounded-lg bg-rose-50 text-rose-500 hover:bg-rose-100 transition-colors">
        <i data-lucide="trash-2" class="w-4 h-4"></i>
      </button>
    </div>
  `;

  // INSERÇÃO NO DOM (appendChild)
  listaProdutos.appendChild(li);
  registrarLog("listaProdutos.appendChild(li)", "Inserção", `Elemento "${nome}" inserido na <ul>.`);

  // Atualizar Estado Vazio e Contador
  atualizarContador();

  // Limpar inputs e focar novamente
  formProduto.reset();
  inputNome.focus();
  lucide.createIcons();
}

// ==========================================
// 3. REMOÇÃO DE ELEMENTOS DO DOM
// ==========================================
function removerItem(botao) {
  // Encontra o elemento <li> mais próximo do botão clicado
  const li = botao.closest("li");
  const nomeItem = li.querySelector("h4").innerText;

  // Remoção direta com .remove()
  li.remove();
  registrarLog("element.remove()", "Remoção", `O item "${nomeItem}" foi removido do DOM.`);

  atualizarContador();
}

function limparTodoCatalogo() {
  listaProdutos.innerHTML = "";
  registrarLog("listaProdutos.innerHTML = ''", "Remoção em Massa", "Todos os elementos filhos foram removidos.");
  atualizarContador();
}

// ==========================================
// 4. CLASSES E ESTILOS VIA JAVASCRIPT
// ==========================================
function alternarDestaqueItem(botao) {
  const li = botao.closest("li");

  // Alterna a classe personalizada definida no CSS
  li.classList.toggle("destaque-dom");

  const temDestaque = li.classList.contains("destaque-dom");
  registrarLog(
    `classList.toggle('destaque-dom')`, 
    "Estilos", 
    `Classe de destaque ${temDestaque ? 'adicionada ao' : 'removida do'} elemento.`
  );
}

function alternarModoDestaqueGeral() {
  const todosItens = listaProdutos.querySelectorAll("li");

  if (todosItens.length === 0) {
    alert("Adicione pelo menos um item primeiro para aplicar os estilos!");
    return;
  }

  todosItens.forEach((li) => {
    li.classList.toggle("destaque-dom");
  });

  registrarLog("querySelectorAll('li') + classList.toggle", "Estilos em Lote", "Estilos alterados em todos os elementos selecionados.");
}

// Helper para atualizar contadores e aviso de lista vazia
function atualizarContador() {
  const quantidade = listaProdutos.children.length;
  contadorItens.innerText = `${quantidade} ${quantidade === 1 ? 'Item' : 'Itens'}`;

  if (quantidade === 0) {
    estadoVazio.classList.remove("hidden");
  } else {
    estadoVazio.classList.add("hidden");
  }
}