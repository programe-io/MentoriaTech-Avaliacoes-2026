// ===== Armazenamento: array de objetos =====
let tarefas = [];

// Gerador de código independente do tamanho do array
// (evita códigos repetidos se um dia houver remoção)
let geradorDeCodigo = 0;

// ===== Validação (título e prioridade) =====
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres");
  }
  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3");
  }
}

// ===== Busca por código (reutilizada por outras funções) =====
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);
  if (!tarefa) {
    throw new Error("Código " + codigo + " não encontrado");
  }
  return tarefa;
}

// ===== Cadastro =====
function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;

  const novaTarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true // true = em execução | false = concluída
  };

  tarefas.push(novaTarefa);
}

// ===== Listagem: RETORNA os dados (a exibição é feita em outro lugar) =====
function listarTarefas() {
  return tarefas;
}

// ===== Concluir tarefa =====
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);
  if (!tarefa.status) {
    throw new Error("A tarefa " + codigo + " já estava concluída");
  }
  tarefa.status = false;
}

// ===== Alterar prioridade (reaproveita a validação) =====
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
}

// ===== Interface =====
const msg = document.getElementById("msg");

function mostrar(texto, tipo) {
  msg.textContent = texto;
  msg.className = "msg " + tipo;
}

function exibirTarefas() {
  const corpo = document.getElementById("lista");
  const dados = listarTarefas();

  corpo.innerHTML = "";
  document.getElementById("vazio").style.display = dados.length ? "none" : "block";

  // Estrutura de repetição para percorrer o array
  for (const t of dados) {
    const tr = document.createElement("tr");
    if (!t.status) tr.className = "concluida";

    tr.innerHTML =
      '<td><span class="cod">' + t.codigo + "</span></td>" +
      "<td></td>" +
      '<td><span class="prio">' + t.prioridade + "</span></td>" +
      "<td>" + (t.status ? "Em execução" : '<span class="status-ok">Concluída</span>') + "</td>" +
      '<td class="acoes">' +
        '<button class="ghost" data-acao="concluir" data-cod="' + t.codigo + '">Concluir</button> ' +
        '<button class="ghost" data-acao="prioridade" data-cod="' + t.codigo + '">Alterar prioridade</button>' +
      "</td>";

    tr.children[1].textContent = t.titulo; // evita injeção de HTML
    corpo.appendChild(tr);
  }
}

// Botão "Cadastrar tarefa"
document.getElementById("btn-cadastrar").addEventListener("click", () => {
  const campoTitulo = document.getElementById("titulo");
  const campoPrioridade = document.getElementById("prioridade");

  try {
    cadastrarTarefa(campoTitulo.value.trim(), parseInt(campoPrioridade.value, 10));
    mostrar("Tarefa cadastrada com código " + geradorDeCodigo + ".", "ok");
    campoTitulo.value = "";
    exibirTarefas();
  } catch (e) {
    mostrar(e.message, "erro");
  }
});

// Botões de cada linha
document.getElementById("lista").addEventListener("click", (ev) => {
  const btn = ev.target.closest("button[data-acao]");
  if (!btn) return;
  const codigo = Number(btn.dataset.cod);

  try {
    if (btn.dataset.acao === "concluir") {
      concluirTarefa(codigo);
      mostrar("Tarefa " + codigo + " concluída.", "ok");
    } else {
      const r = prompt("Nova prioridade (1 a 3) para a tarefa " + codigo + ":");
      if (r === null) return;
      alterarPrioridade(codigo, parseInt(r, 10));
      mostrar("Prioridade da tarefa " + codigo + " alterada.", "ok");
    }
    exibirTarefas();
  } catch (e) {
    mostrar(e.message, "erro");
  }
});

exibirTarefas();