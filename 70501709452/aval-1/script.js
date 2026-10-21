const CHAVE = "projectflow_dados_v1";

let projetos = carregarProjetos();
let projetoAtualId = null;

function carregarProjetos() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE) || "[]");
    return Array.isArray(dados) ? dados : [];
  } catch {
    return [];
  }
}

function salvarDados() {
  localStorage.setItem(CHAVE, JSON.stringify(projetos));
}

function criarId() {
  return crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random()}`;
}

// Evita inserir conteúdo digitado como HTML.
function elemento(tag, classe, texto) {
  const el = document.createElement(tag);
  if (classe) el.className = classe;
  if (texto !== undefined) el.textContent = texto;
  return el;
}

function abrirFormulario(projeto = null) {
  document.getElementById("formProjeto").reset();

  document.getElementById("projetoId").value =
    projeto ? projeto.id : "";

  document.getElementById("nome").value =
    projeto ? projeto.nome : "";

  document.getElementById("responsavel").value =
    projeto ? projeto.responsavel : "";

  document.getElementById("descricao").value =
    projeto ? projeto.descricao : "";

  document.getElementById("prazo").value =
    projeto ? projeto.prazo : "";

  document.getElementById("tituloFormulario").textContent =
    projeto ? "Editar projeto" : "Novo projeto";

  document.getElementById("cadastro").classList.remove("hidden");
  document.getElementById("nome").focus();
}

function fecharFormulario() {
  document.getElementById("cadastro").classList.add("hidden");
}

document.getElementById("formProjeto").addEventListener(
  "submit", function (evento) {
    evento.preventDefault();

    const id = document.getElementById("projetoId").value;

    const dados = {
      nome: document.getElementById("nome").value.trim(),
      responsavel: document.getElementById("responsavel").value.trim(),
      descricao: document.getElementById("descricao").value.trim(),
      prazo: document.getElementById("prazo").value
    };

    if (!dados.nome || !dados.responsavel || !dados.prazo) {
      alert("Preencha os campos obrigatórios.");
      return;
    }

    if (id) {
      const projeto = projetos.find(p => p.id === id);
      if (projeto) Object.assign(projeto, dados);
    } else {
      projetos.push({
        id: criarId(),
        ...dados,
        tarefas: []
      });
    }

    salvarDados();
    fecharFormulario();
    renderizar();
  }
);

function excluirProjeto(id) {
  const projeto = projetos.find(p => p.id === id);
  if (!projeto) return;

  if (!confirm(`Excluir o projeto "${projeto.nome}"?`)) return;

  projetos = projetos.filter(p => p.id !== id);
  salvarDados();
  renderizar();
}

function adicionarBotao(container, texto, classe, acao) {
  const botao = elemento("button", classe, texto);
  botao.type = "button";
  botao.addEventListener("click", acao);
  container.appendChild(botao);
  return botao;
}

function renderizar() {
  const busca = document.getElementById("busca")
    .value.trim().toLocaleLowerCase("pt-BR");

  const lista = document.getElementById("listaProjetos");
  lista.replaceChildren();

  const concluidos = projetos.filter(p =>
    p.tarefas.length > 0 &&
    p.tarefas.every(t => t.concluida)
  ).length;

  const emAndamento = projetos.filter(p =>
    p.tarefas.some(t => t.concluida) &&
    !p.tarefas.every(t => t.concluida)
  ).length;

  const pendentes = projetos.reduce((total, p) =>
    total + p.tarefas.filter(t => !t.concluida).length, 0
  );

  document.getElementById("totalProjetos").textContent = projetos.length;
  document.getElementById("emAndamento").textContent = emAndamento;
  document.getElementById("concluidos").textContent = concluidos;
  document.getElementById("pendentes").textContent = pendentes;

  const filtrados = projetos.filter(p =>
    `${p.nome} ${p.responsavel} ${p.descricao}`
      .toLocaleLowerCase("pt-BR").includes(busca)
  );

  if (filtrados.length === 0) {
    lista.appendChild(elemento(
      "p", "empty",
      projetos.length
        ? "Nenhum projeto encontrado."
        : "Nenhum projeto cadastrado. Clique em Novo projeto para começar."
    ));
    return;
  }

  filtrados.forEach(projeto => {
    const card = elemento("article", "project-card");
    const total = projeto.tarefas.length;
    const feitas = projeto.tarefas.filter(t => t.concluida).length;
    const progresso = total ? Math.round(feitas / total * 100) : 0;

    const finalizado = total > 0 && feitas === total;
    const status = elemento(
      "span", "status",
      finalizado ? "Concluído" :
      feitas > 0 ? "Em andamento" : "Pendente"
    );

    card.appendChild(status);
    card.appendChild(elemento("h3", "", projeto.nome));
    card.appendChild(elemento(
      "p", "", `Responsável: ${projeto.responsavel}`
    ));
    card.appendChild(elemento(
      "p", "", projeto.descricao || "Sem descrição."
    ));

    const prazo = projeto.prazo
      ? projeto.prazo.split("-").reverse().join("/")
      : "Não definido";

    card.appendChild(elemento("p", "", `Prazo: ${prazo}`));
    card.appendChild(elemento(
      "p", "", `Progresso: ${progresso}% (${feitas}/${total} tarefas)`
    ));

    const trilho = elemento("div", "progress-track");
    const barra = elemento("div", "progress-bar");
    barra.style.width = `${progresso}%`;
    trilho.appendChild(barra);
    card.appendChild(trilho);

    const acoes = elemento("div", "card-actions");

    adicionarBotao(acoes, "Tarefas", "", () =>
      abrirTarefas(projeto.id)
    );

    adicionarBotao(acoes, "Editar", "secondary", () =>
      abrirFormulario(projeto)
    );

    adicionarBotao(acoes, "Excluir", "danger", () =>
      excluirProjeto(projeto.id)
    );

    card.appendChild(acoes);
    lista.appendChild(card);
  });
}

function abrirTarefas(id) {
  projetoAtualId = id;
  const projeto = projetos.find(p => p.id === id);
  if (!projeto) return;

  document.getElementById("tituloTarefas").textContent =
    `Tarefas: ${projeto.nome}`;

  document.getElementById("formTarefa").reset();
  renderizarTarefas();

  document.getElementById("dialogTarefas").showModal();
}

function fecharTarefas() {
  document.getElementById("dialogTarefas").close();
  projetoAtualId = null;
}

document.getElementById("formTarefa").addEventListener(
  "submit", function (evento) {
    evento.preventDefault();

    const projeto = projetos.find(p => p.id === projetoAtualId);
    const campo = document.getElementById("tarefaNome");
    const nome = campo.value.trim();

    if (!projeto || !nome) return;

    projeto.tarefas.push({
      id: criarId(),
      nome,
      concluida: false
    });

    salvarDados();
    campo.value = "";
    renderizarTarefas();
    renderizar();
    campo.focus();
  }
);

function renderizarTarefas() {
  const lista = document.getElementById("listaTarefas");
  lista.replaceChildren();

  const projeto = projetos.find(p => p.id === projetoAtualId);
  if (!projeto) return;

  if (projeto.tarefas.length === 0) {
    lista.appendChild(elemento(
      "p", "empty", "Nenhuma tarefa cadastrada."
    ));
  }

  projeto.tarefas.forEach(tarefa => {
    const linha = elemento("div", "task-item");
    const checkbox = elemento("input");
    checkbox.type = "checkbox";
    checkbox.checked = tarefa.concluida;
    checkbox.setAttribute(
      "aria-label", `Concluir tarefa ${tarefa.nome}`
    );

    const nome = elemento(
      "span", tarefa.concluida ? "done" : "", tarefa.nome
    );

    checkbox.addEventListener("change", () => {
      tarefa.concluida = checkbox.checked;
      salvarDados();
      renderizarTarefas();
      renderizar();
    });

    adicionarBotao(linha, "Excluir", "danger", () => {
      projeto.tarefas = projeto.tarefas.filter(
        t => t.id !== tarefa.id
      );
      salvarDados();
      renderizarTarefas();
      renderizar();
    });

    linha.prepend(nome);
    linha.prepend(checkbox);
    lista.appendChild(linha);
  });
}

document.getElementById("busca").addEventListener(
  "input", renderizar
);

renderizar();