// JS do Gerenciador de tarefas

const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((tarefaAtual) => tarefaAtual.codigo === codigo);

  if (!tarefa) {
    throw new Error("Código não encontrado.");
  }

  return tarefa;
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosDaTarefa(titulo, prioridade);

  geradorDeCodigo++;

  const tarefa = {
    codigo: geradorDeCodigo,
    titulo: titulo,
    prioridade: prioridade,
    status: true, // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Esta tarefa já estava concluída.");
  }

  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

//  Interface (só inicia depois que a página carregou) 
function iniciar() {

  const botaoCadastrar = document.getElementById("cadastrar");
  const campoTitulo = document.getElementById("titulo");
  const campoPrioridade = document.getElementById("prioridade");
  const mensagem = document.getElementById("mensagem");
  const lista = document.getElementById("lista");
  const vazio = document.getElementById("vazio");
  const contador = document.getElementById("contador");

  const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

  function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mensagem " + tipo;
  }

  // Executa uma ação da lógica e mostra o erro (se houver) na tela
  function executar(acao, textoSucesso) {
    try {
      acao();
      mostrarMensagem(textoSucesso, "ok");
      return true;
    } catch (erro) {
      mostrarMensagem(erro.message, "erro");
      return false;
    }
  }

  function criarItem(tarefa) {
    const item = document.createElement("li");
    item.className = "tarefa p" + tarefa.prioridade + (tarefa.status ? "" : " concluida");

    const codigo = document.createElement("span");
    codigo.className = "codigo";
    codigo.textContent = "#" + tarefa.codigo;

    const info = document.createElement("div");
    info.className = "info";

    const titulo = document.createElement("div");
    titulo.className = "titulo";
    titulo.textContent = tarefa.titulo;

    const estado = document.createElement("span");
    estado.className = "estado";
    estado.textContent = tarefa.status ? "Em execução" : "Concluída";

    info.append(titulo, estado);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const select = document.createElement("select");
    select.setAttribute("aria-label", "Prioridade da tarefa " + tarefa.codigo);
    select.disabled = !tarefa.status;
    [1, 2, 3].forEach((valor) => {
      const opcao = document.createElement("option");
      opcao.value = valor;
      opcao.textContent = valor + " – " + NOMES_PRIORIDADE[valor];
      opcao.selected = valor === tarefa.prioridade;
      select.append(opcao);
    });
    select.addEventListener("change", () => {
      executar(
        () => alterarPrioridade(tarefa.codigo, Number(select.value)),
        "Prioridade da tarefa " + tarefa.codigo + " alterada."
      );
      renderizar();
    });

    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = tarefa.status ? "Concluir" : "Concluída";
    botao.disabled = !tarefa.status;
    botao.addEventListener("click", () => {
      executar(() => concluirTarefa(tarefa.codigo), "Tarefa " + tarefa.codigo + " concluída.");
      renderizar();
    });

    acoes.append(select, botao);
    item.append(codigo, info, acoes);
    return item;
  }

  function renderizar() {
    const dados = listarTarefas();

    lista.replaceChildren();
    // Alta (1) primeiro, depois média (2) e baixa (3); na mesma prioridade, a mais antiga fica na frente
    const ordenadas = [...dados].sort(
      (a, b) => a.prioridade - b.prioridade || a.codigo - b.codigo
    );
    ordenadas.forEach((tarefa) => lista.append(criarItem(tarefa)));

    vazio.hidden = dados.length > 0;

    const abertas = dados.filter((tarefa) => tarefa.status).length;
    contador.textContent = dados.length === 0
      ? ""
      : abertas + " em execução de " + dados.length;
  }

  function enviarFormulario() {
    const cadastrou = executar(
      () => cadastrarTarefa(campoTitulo.value.trim(), Number(campoPrioridade.value)),
      "Tarefa cadastrada."
    );

    if (cadastrou) {
      campoTitulo.value = "";
      campoPrioridade.value = "2";
    }

    renderizar();
    campoTitulo.focus();
  }

  botaoCadastrar.addEventListener("click", enviarFormulario);

  campoTitulo.addEventListener("keydown", (evento) => {
    if (evento.key === "Enter") {
      evento.preventDefault();
      enviarFormulario();
    }
  });

  renderizar();

  //  Tema claro / escuro 

  const botaoTema = document.getElementById("alternar-tema");
  const raiz = document.documentElement;

  function temaAtual() {
    if (raiz.dataset.theme) return raiz.dataset.theme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }

  function atualizarBotaoTema() {
    const escuro = temaAtual() === "dark";
    const texto = escuro ? "Mudar para o tema claro" : "Mudar para o tema escuro";
    botaoTema.dataset.modo = escuro ? "dark" : "light";
    botaoTema.setAttribute("aria-label", texto);
    botaoTema.title = texto;
  }

  botaoTema.addEventListener("click", () => {
    const novo = temaAtual() === "dark" ? "light" : "dark";
    raiz.dataset.theme = novo;
    try { localStorage.setItem("tema", novo); } catch (e) {}
    atualizarBotaoTema();
  });

  atualizarBotaoTema();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", iniciar);
} else {
  iniciar();
}