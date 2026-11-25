// ---------- Dados ----------
const tarefas = [];
let ultimoCodigo = 0;

// ---------- Lógica do projeto ----------
function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }
  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  ultimoCodigo++;

  const tarefa = {
    codigo: ultimoCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true, // true = em execução | false = concluída
  };

  tarefas.push(tarefa);
  return tarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error(`Tarefa com código ${codigo} não encontrada.`);
  }
  return tarefa;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error(`A tarefa ${codigo} já estava concluída.`);
  }
  tarefa.status = false;
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);
  tarefa.prioridade = novaPrioridade;
  return tarefa;
}

// ---------- Interface ----------
const inputTitulo = document.getElementById("titulo");
const selectPrioridade = document.getElementById("prioridade");
const btnCadastrar = document.getElementById("btn-cadastrar");
const mensagem = document.getElementById("mensagem");
const lista = document.getElementById("lista");

const nomesPrioridade = { 1: "Alta", 2: "Média", 3: "Baixa" };

function mostrarMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
}

function executar(acao, textoSucesso) {
  try {
    acao();
    mostrarMensagem(textoSucesso, "sucesso");
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  }
  renderizar();
}

function renderizar() {
  lista.innerHTML = "";
  const itens = listarTarefas();

  if (itens.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa cadastrada.";
    lista.appendChild(vazio);
    return;
  }

  itens.forEach((tarefa) => {
    const li = document.createElement("li");
    li.className = `tarefa prioridade-${tarefa.prioridade}`;
    if (!tarefa.status) li.classList.add("concluida");

    const titulo = document.createElement("div");
    titulo.className = "titulo";
    titulo.textContent = tarefa.titulo;

    const info = document.createElement("div");
    info.className = "info";
    info.textContent =
      `Código ${tarefa.codigo} • Prioridade ${tarefa.prioridade} (${nomesPrioridade[tarefa.prioridade]}) • ` +
      (tarefa.status ? "Em execução" : "Concluída");

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const btnConcluir = document.createElement("button");
    btnConcluir.className = "btn-concluir";
    btnConcluir.textContent = tarefa.status ? "Concluir" : "Concluída";
    btnConcluir.disabled = !tarefa.status;
    btnConcluir.addEventListener("click", () => {
      executar(() => concluirTarefa(tarefa.codigo), "Tarefa concluída!");
    });

    const selectNova = document.createElement("select");
    [1, 2, 3].forEach((p) => {
      const opcao = document.createElement("option");
      opcao.value = p;
      opcao.textContent = `${p} - ${nomesPrioridade[p]}`;
      if (p === tarefa.prioridade) opcao.selected = true;
      selectNova.appendChild(opcao);
    });
    selectNova.addEventListener("change", () => {
      executar(
        () => alterarPrioridade(tarefa.codigo, Number(selectNova.value)),
        "Prioridade alterada!"
      );
    });

    acoes.append(btnConcluir, selectNova);
    li.append(titulo, info, acoes);
    lista.appendChild(li);
  });
}

btnCadastrar.addEventListener("click", () => {
  executar(() => {
    cadastrarTarefa(inputTitulo.value.trim(), Number(selectPrioridade.value));
    inputTitulo.value = "";
  }, "Tarefa cadastrada!");
});

inputTitulo.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") btnCadastrar.click();
});

renderizar();
