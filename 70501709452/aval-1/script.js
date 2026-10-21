
const STORAGE_KEY = "gestorpro_projetos_v2";

const $ = id => document.getElementById(id);

let projetos = carregar();
let editandoId = null;

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvar() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projetos));
}

function novoId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : String(Date.now()) + Math.random();
}

function criarElemento(tag, texto = "", classe = "") {
  const el = document.createElement(tag);
  el.textContent = texto;
  el.className = classe;
  return el;
}

function atrasado(p) {
  return p.status !== "Concluído" &&
    p.prazo < new Date().toLocaleDateString("sv-SE");
}

function abrirModal(projeto = null) {
  editandoId = projeto ? projeto.id : null;
  $("formProjeto").reset();

  $("tituloModal").textContent =
    projeto ? "Editar projeto" : "Cadastrar projeto";

  $("id").value = projeto ? projeto.id : "";
  $("nome").value = projeto ? projeto.nome : "";
  $("responsavel").value = projeto ? projeto.responsavel : "";
  $("prazo").value = projeto ? projeto.prazo : "";
  $("prioridade").value = projeto ? projeto.prioridade : "Média";
  $("status").value = projeto ? projeto.status : "Planejamento";
  $("descricao").value = projeto ? projeto.descricao : "";

  $("modal").showModal();
}

$("novoProjeto").addEventListener("click", () => abrirModal());

$("cancelar").addEventListener("click", () => {
  $("modal").close();
});

$("formProjeto").addEventListener("submit", evento => {
  evento.preventDefault();

  const dados = {
    nome: $("nome").value.trim(),
    responsavel: $("responsavel").value.trim(),
    prazo: $("prazo").value,
    prioridade: $("prioridade").value,
    status: $("status").value,
    descricao: $("descricao").value.trim()
  };

  if (!dados.nome || !dados.responsavel || !dados.prazo) {
    alert("Preencha os campos obrigatórios.");
    return;
  }

  if (editandoId) {
    const projeto = projetos.find(p => p.id === editandoId);
    if (projeto) Object.assign(projeto, dados);
  } else {
    projetos.push({ id: novoId(), ...dados });
  }

  salvar();
  $("modal").close();
  renderizar();
});

function excluirProjeto(id) {
  const projeto = projetos.find(p => p.id === id);
  if (!projeto) return;

  if (!confirm(`Deseja excluir "${projeto.nome}"?`)) return;

  projetos = projetos.filter(p => p.id !== id);
  salvar();
  renderizar();
}

function botao(texto, classe, acao) {
  const el = criarElemento("button", texto, classe);
  el.type = "button";
  el.addEventListener("click", acao);
  return el;
}

function renderizar() {
  const busca = $("pesquisa").value.trim().toLowerCase();
  const filtro = $("filtroStatus").value;
  const tabela = $("tabelaProjetos");

  tabela.replaceChildren();

  $("total").textContent = projetos.length;
  $("andamento").textContent =
    projetos.filter(p => p.status === "Em andamento").length;
  $("concluidos").textContent =
    projetos.filter(p => p.status === "Concluído").length;
  $("atrasados").textContent = projetos.filter(atrasado).length;

  const filtrados = projetos.filter(p => {
    const correspondeBusca =
      `${p.nome} ${p.responsavel} ${p.descricao || ""}`
        .toLowerCase().includes(busca);

    const correspondeStatus =
      filtro === "todos" || p.status === filtro;

    return correspondeBusca && correspondeStatus;
  });

  $("mensagem").textContent = filtrados.length
    ? `${filtrados.length} projeto(s) encontrado(s).`
    : "Nenhum projeto encontrado.";

  filtrados.forEach(p => {
    const linha = document.createElement("tr");

    const nome = criarElemento("td", p.nome, "project-name");
    nome.title = p.descricao || p.nome;

    const responsavel = criarElemento("td", p.responsavel);
    const prazo = criarElemento(
      "td", p.prazo.split("-").reverse().join("/")
    );

    const prioridade = criarElemento(
      "td", p.prioridade, `priority-${p.prioridade}`
    );

    const status = criarElemento(
      "span", p.status, `badge ${p.status.replace(" ", "-")}`
    );

    const celulaStatus = document.createElement("td");
    celulaStatus.appendChild(status);

    const acoes = criarElemento("td", "", "actions");

    acoes.appendChild(botao("Editar", "btn-light", () => {
      abrirModal(p);
    }));

    acoes.appendChild(botao("Excluir", "btn-delete", () => {
      excluirProjeto(p.id);
    }));

    [nome, responsavel, prazo, prioridade, celulaStatus, acoes]
      .forEach(celula => linha.appendChild(celula));

    tabela.appendChild(linha);
  });

  renderizarEquipe();
}

function renderizarEquipe() {
  const lista = $("equipeLista");
  lista.replaceChildren();

  const equipe = {};

  projetos.forEach(p => {
    equipe[p.responsavel] = (equipe[p.responsavel] || 0) + 1;
  });

  const nomes = Object.keys(equipe);

  if (!nomes.length) {
    lista.appendChild(criarElemento(
      "p", "Cadastre projetos para visualizar a equipe."
    ));
    return;
  }

  nomes.forEach(nome => {
    const card = criarElemento("div", "", "team-card");
    card.appendChild(criarElemento("strong", nome));

    const quantidade = equipe[nome];
    card.appendChild(criarElemento(
      "span",
      `${quantidade} projeto(s) atribuído(s)`
    ));

    lista.appendChild(card);
  });
}

$("pesquisa").addEventListener("input", renderizar);
$("filtroStatus").addEventListener("change", renderizar);

renderizar();
