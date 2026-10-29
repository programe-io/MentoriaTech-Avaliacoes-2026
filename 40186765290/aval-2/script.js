// ===== Persistência LocalStorage =====
const CHAVE_STORAGE_TAREFAS = "gerenciador_tarefas_dados";
const CHAVE_STORAGE_CODIGO = "gerenciador_tarefas_ultimo_codigo";

function carregarDados() {
  try {
    const dadosSalvos = localStorage.getItem(CHAVE_STORAGE_TAREFAS);
    const codigoSalvo = localStorage.getItem(CHAVE_STORAGE_CODIGO);
    
    return {
      tarefas: dadosSalvos ? JSON.parse(dadosSalvos) : [],
      ultimoCodigo: codigoSalvo ? Number(codigoSalvo) : 0
    };
  } catch (e) {
    console.error("Erro ao carregar dados do localStorage:", e);
    return { tarefas: [], ultimoCodigo: 0 };
  }
}

function salvarDados() {
  try {
    localStorage.setItem(CHAVE_STORAGE_TAREFAS, JSON.stringify(tarefas));
    localStorage.setItem(CHAVE_STORAGE_CODIGO, ultimoCodigo.toString());
  } catch (e) {
    console.error("Erro ao salvar dados no localStorage:", e);
  }
}

// ===== Dados =====
// Carrega os dados ou inicia do zero caso seja a primeira execução.
const dadosIniciais = carregarDados();
const tarefas = dadosIniciais.tarefas;
let ultimoCodigo = dadosIniciais.ultimoCodigo;

const NOMES_PRIORIDADE = { 1: "Alta", 2: "Média", 3: "Baixa" };

// ===== Regras de negócio (uma responsabilidade por função) =====

// Valida título e prioridade; interrompe com erro se algum for inválido.
function validarDadosDaTarefa(titulo, prioridade) {
  const tituloFormatado = titulo ? titulo.trim() : "";

  if (tituloFormatado.length < 5) {
    throw new Error("O título deve ter no mínimo 5 caracteres.");
  }

  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    throw new Error("Informe uma prioridade válida entre 1 e 3.");
  }
}

// Localiza uma tarefa pelo código; erro se não existir.
function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

  if (!tarefa) {
    throw new Error(`Tarefa com código ${codigo} não encontrada.`);
  }

  return tarefa;
}

// Cria a tarefa (código e status definidos pelo algoritmo) e adiciona ao array.
function cadastrarTarefa(titulo, prioridade) {
  const tituloLimpo = titulo.trim();
  validarDadosDaTarefa(tituloLimpo, prioridade);

  ultimoCodigo++;

  const tarefa = {
    codigo: ultimoCodigo,
    titulo: tituloLimpo,
    prioridade: prioridade,
    status: true, // true = em execução, false = concluída
  };

  tarefas.push(tarefa);
  salvarDados();
  return tarefa;
}

// Retorna as tarefas (exibir é responsabilidade de quem chama).
function listarTarefas() {
  return tarefas;
}

// Marca a tarefa como concluída, impedindo conclusão duplicada.
function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error(`A tarefa #${codigo} já estava concluída.`);
  }

  tarefa.status = false;
  salvarDados();
  return tarefa;
}

// Altera a prioridade reaproveitando a validação existente.
function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Não é possível alterar a prioridade de uma tarefa concluída.");
  }

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
  salvarDados();
  return tarefa;
}

// ===== Interface =====
const formulario = document.getElementById("form-tarefa");
const campoTitulo = document.getElementById("titulo");
const campoPrioridade = document.getElementById("prioridade");
const elMensagem = document.getElementById("mensagem");
const elLista = document.getElementById("lista-tarefas");
const elResumo = document.getElementById("resumo");

let temporizadorMensagem = null;

function mostrarMensagem(texto, tipo) {
  if (temporizadorMensagem) {
    clearTimeout(temporizadorMensagem);
  }

  elMensagem.textContent = texto;
  elMensagem.className = `mensagem ${tipo}`;

  // Limpa a mensagem automaticamente após 4 segundos
  temporizadorMensagem = setTimeout(() => {
    elMensagem.textContent = "";
    elMensagem.className = "mensagem";
  }, 4000);
}

// Executa uma ação de negócio e mostra o erro (se houver) na tela.
function executar(acao, mensagemSucesso) {
  try {
    const resultado = acao();
    if (mensagemSucesso) {
      mostrarMensagem(mensagemSucesso, "sucesso");
    }
    return resultado;
  } catch (erro) {
    mostrarMensagem(erro.message, "erro");
  } finally {
    renderizar();
  }
}

function criarSeletorPrioridade(tarefa) {
  const seletor = document.createElement("select");
  seletor.setAttribute("aria-label", `Prioridade da tarefa ${tarefa.codigo}`);
  seletor.disabled = !tarefa.status;

  for (const [valor, nome] of Object.entries(NOMES_PRIORIDADE)) {
    const opcao = document.createElement("option");
    opcao.value = valor;
    opcao.textContent = `${valor} - ${nome}`;
    opcao.selected = Number(valor) === tarefa.prioridade;
    seletor.appendChild(opcao);
  }

  seletor.addEventListener("change", () => {
    executar(
      () => alterarPrioridade(tarefa.codigo, Number(seletor.value)),
      `Prioridade da tarefa #${tarefa.codigo} alterada para ${NOMES_PRIORIDADE[seletor.value]}.`
    );
  });

  return seletor;
}

function criarItem(tarefa) {
  const item = document.createElement("li");
  item.className = "tarefa" + (tarefa.status ? "" : " concluida");
  item.dataset.prioridade = tarefa.prioridade;

  const codigo = document.createElement("span");
  codigo.className = "codigo";
  codigo.textContent = `#${tarefa.codigo}`;

  const titulo = document.createElement("p");
  titulo.className = "titulo-tarefa";
  titulo.textContent = tarefa.titulo;

  const acoes = document.createElement("div");
  acoes.className = "acoes";
  acoes.appendChild(criarSeletorPrioridade(tarefa));

  if (tarefa.status) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.className = "botao-concluir";
    botao.textContent = "Concluir";
    botao.addEventListener("click", () => {
      executar(
        () => concluirTarefa(tarefa.codigo),
        `Tarefa #${tarefa.codigo} concluída!`
      );
    });
    acoes.appendChild(botao);
  } else {
    const selo = document.createElement("span");
    selo.className = "selo-concluida";
    selo.textContent = "Concluída";
    acoes.appendChild(selo);
  }

  item.append(codigo, titulo, acoes);
  return item;
}

// Percorre o array com uma estrutura de repetição para exibir os dados.
function renderizar() {
  const lista = listarTarefas();
  elLista.replaceChildren();

  if (lista.length === 0) {
    const vazio = document.createElement("li");
    vazio.className = "vazio";
    vazio.textContent = "Nenhuma tarefa cadastrada. Preencha o formulário para criar a primeira.";
    elLista.appendChild(vazio);
  } else {
    for (const tarefa of lista) {
      elLista.appendChild(criarItem(tarefa));
    }
  }

  const emExecucao = lista.filter((t) => t.status).length;
  const concluidas = lista.length - emExecucao;
  elResumo.textContent = `${emExecucao} em execução, ${concluidas} concluída(s)`;
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const titulo = campoTitulo.value;
  const prioridade = Number(campoPrioridade.value);

  const criada = executar(
    () => cadastrarTarefa(titulo, prioridade),
    null // Mensagem gerenciada abaixo para incluir o número do código
  );

  if (criada) {
    mostrarMensagem(`Tarefa #${criada.codigo} cadastrada com sucesso!`, "sucesso");
    formulario.reset();
  }
  campoTitulo.focus();
});

// Renderização inicial
renderizar();