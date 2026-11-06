// ===== Lógica do projeto =====

const tarefas = [];
let geradorDeCodigo = 0;

function validarDadosDaTarefa(titulo, prioridade) {
  if (titulo.length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve ser um valor entre 1 e 3.");
  }
}

function buscarTarefa(codigo) {
  const tarefa = tarefas.find((t) => t.codigo === codigo);

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
    status: true
  };

  tarefas.push(tarefa);
}

function listarTarefas() {
  return tarefas;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("A tarefa já estava concluída.");
  }

  tarefa.status = false;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);

  validarDadosDaTarefa(tarefa.titulo, novaPrioridade);

  tarefa.prioridade = novaPrioridade;
}

function excluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  tarefas.splice(tarefas.indexOf(tarefa), 1);
}

// ===== Salvamento no navegador =====

const CHAVE = "gerenciador-de-tarefas";

function salvar() {
  try {
    localStorage.setItem(
      CHAVE,
      JSON.stringify({
        tarefas,
        geradorDeCodigo
      })
    );
  } catch (e) {
    console.error("Não foi possível salvar as tarefas.", e);
  }
}

function carregar() {
  try {
    const dados = JSON.parse(localStorage.getItem(CHAVE));

    if (dados && Array.isArray(dados.tarefas)) {
      tarefas.push(...dados.tarefas);
      geradorDeCodigo = Number(dados.geradorDeCodigo) || 0;
    }
  } catch (e) {
    console.error("Não foi possível carregar as tarefas.", e);
  }
}

// ===== Interface =====

const $ = (id) => document.getElementById(id);

let filtro = "todas";
let prioNova = 2;
let confirmando = null;
let tToast;

function aviso(texto, erro) {
  const t = $("toast");

  t.textContent = texto;
  t.className = "show" + (erro ? " erro-t" : "");

  clearTimeout(tToast);

  tToast = setTimeout(() => {
    t.className = "";
  }, 2200);
}

function executar(acao, sucesso) {
  try {
    acao();

    if (sucesso) {
      aviso(sucesso);
    }

    salvar();

    return true;
  } catch (e) {
    aviso(e.message, true);
    return false;
  } finally {
    renderizar();
  }
}

const rotulo = {
  1: "Alta",
  2: "Média",
  3: "Baixa"
};

function renderizar() {
  const todas = listarTarefas();

  const concluidas = todas.filter((t) => !t.status).length;

  const porcentagem = todas.length
    ? Math.round((concluidas / todas.length) * 100)
    : 0;

  $("sTotal").textContent = todas.length;
  $("sAndamento").textContent = todas.length - concluidas;
  $("sConcluidas").textContent = concluidas;
  $("sPct").textContent = porcentagem + "%";
  $("sBarra").style.width = porcentagem + "%";

  const termo = $("busca").value.trim().toLowerCase();

  let visiveis = todas.filter((t) => {
    const correspondeFiltro =
      filtro === "todas" ||
      (filtro === "andamento" && t.status) ||
      (filtro === "concluidas" && !t.status);

    const correspondeBusca =
      t.titulo.toLowerCase().includes(termo);

    return correspondeFiltro && correspondeBusca;
  });

  const ordem = $("ordem").value;

  visiveis = [...visiveis].sort((a, b) => {
    if (ordem === "prioridade") {
      return a.prioridade - b.prioridade || a.codigo - b.codigo;
    }

    if (ordem === "recentes") {
      return b.codigo - a.codigo;
    }

    return a.codigo - b.codigo;
  });

  const lista = $("lista");
  lista.innerHTML = "";

  if (!visiveis.length) {
    const li = document.createElement("li");
    li.className = "vazio";

    const emoji = document.createElement("span");
    emoji.className = "emoji";
    emoji.textContent = todas.length ? "🔍" : "📝";

    li.append(
      emoji,
      todas.length
        ? "Nenhuma tarefa encontrada."
        : "Nenhuma tarefa ainda. Cadastre a primeira acima!"
    );

    lista.appendChild(li);
    return;
  }

  for (const tarefa of visiveis) {
    const li = document.createElement("li");

    li.className =
      "tarefa p" +
      tarefa.prioridade +
      (tarefa.status ? "" : " concluida");

    const check = document.createElement("button");

    check.className = "check";
    check.textContent = tarefa.status ? "" : "✓";
    check.title = tarefa.status
      ? "Marcar como concluída"
      : "Tarefa concluída";

    check.onclick = () => {
      executar(
        () => concluirTarefa(tarefa.codigo),
        "Tarefa concluída!"
      );
    };

    const corpo = document.createElement("div");
    corpo.className = "corpo";

    const nome = document.createElement("div");
    nome.className = "nome";
    nome.textContent = tarefa.titulo;

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.textContent =
      "#" +
      tarefa.codigo +
      " · Prioridade " +
      tarefa.prioridade +
      " (" +
      rotulo[tarefa.prioridade] +
      ") · " +
      (tarefa.status ? "Em execução" : "Concluída");

    corpo.append(nome, meta);

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const seg = document.createElement("div");
    seg.className = "seg mini";

    [1, 2, 3].forEach((prioridade) => {
      const botao = document.createElement("button");

      botao.innerHTML =
        '<i class="dot d' +
        prioridade +
        '"></i>' +
        prioridade;

      botao.title =
        "Prioridade " +
        prioridade +
        " (" +
        rotulo[prioridade] +
        ")";

      if (prioridade === tarefa.prioridade) {
        botao.className = "on";
      }

      botao.onclick = () => {
        if (prioridade !== tarefa.prioridade) {
          executar(
            () => alterarPrioridade(tarefa.codigo, prioridade),
            "Prioridade alterada."
          );
        }
      };

      seg.appendChild(botao);
    });

    const excluir = document.createElement("button");

    const aguardandoConfirmacao =
      confirmando === tarefa.codigo;

    excluir.className =
      "del" + (aguardandoConfirmacao ? " conf" : "");

    excluir.textContent =
      aguardandoConfirmacao ? "Confirmar?" : "Excluir";

    excluir.onclick = () => {
      if (!aguardandoConfirmacao) {
        confirmando = tarefa.codigo;
        renderizar();

        setTimeout(() => {
          if (confirmando === tarefa.codigo) {
            confirmando = null;
            renderizar();
          }
        }, 3000);
      } else {
        confirmando = null;

        executar(
          () => excluirTarefa(tarefa.codigo),
          "Tarefa excluída."
        );
      }
    };

    acoes.append(seg, excluir);
    li.append(check, corpo, acoes);
    lista.appendChild(li);
  }
}

// ===== Eventos =====

$("form").addEventListener("submit", (evento) => {
  evento.preventDefault();

  const campoTitulo = $("titulo");

  try {
    cadastrarTarefa(
      campoTitulo.value.trim(),
      prioNova
    );

    $("erro").textContent = "";
    campoTitulo.value = "";
    $("cont").textContent = "0 / mín. 5";

    salvar();
    aviso("Tarefa cadastrada!");
  } catch (erro) {
    $("erro").textContent = erro.message;
  }

  renderizar();
  campoTitulo.focus();
});

$("titulo").addEventListener("input", (evento) => {
  const quantidade =
    evento.target.value.trim().length;

  $("cont").textContent =
    quantidade + " / mín. 5";

  if (quantidade >= 5) {
    $("erro").textContent = "";
  }
});

$("segNova").addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");

  if (!botao) {
    return;
  }

  prioNova = Number(botao.dataset.p);

  [...$("segNova").children].forEach((item) => {
    item.classList.toggle("on", item === botao);
  });
});

$("chips").addEventListener("click", (evento) => {
  const botao = evento.target.closest("button");

  if (!botao) {
    return;
  }

  filtro = botao.dataset.f;

  [...$("chips").children].forEach((item) => {
    item.classList.toggle("on", item === botao);
  });

  renderizar();
});

$("busca").addEventListener("input", renderizar);
$("ordem").addEventListener("change", renderizar);

$("tema").addEventListener("click", () => {
  const raiz = document.documentElement;

  const escuro =
    raiz.dataset.theme === "dark" ||
    (
      !raiz.dataset.theme &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );

  raiz.dataset.theme = escuro ? "light" : "dark";
});

// ===== Cor do tema =====

const CHAVE_COR = "gerenciador-cor";

const CORES = [
  ["Índigo", "#5b5bf0"],
  ["Azul", "#2f80ed"],
  ["Verde", "#14a05a"],
  ["Teal", "#0d9488"],
  ["Roxo", "#9333ea"],
  ["Rosa", "#e5489a"],
  ["Laranja", "#f2711c"]
];

function aplicarCor(cor, guardar) {
  const raiz = document.documentElement;

  raiz.style.setProperty("--primary", cor);

  raiz.style.setProperty(
    "--primary-soft",
    "color-mix(in srgb, " +
      cor +
      " 16%, var(--card))"
  );

  document.querySelectorAll(".cor").forEach((botao) => {
    botao.classList.toggle(
      "on",
      botao.dataset.cor === cor
    );
  });

  $("corLivre").value = cor;

  if (guardar) {
    try {
      localStorage.setItem(CHAVE_COR, cor);
    } catch (e) {
      console.error("Não foi possível salvar a cor.", e);
    }
  }
}

CORES.forEach(([nome, cor]) => {
  const botao = document.createElement("button");

  botao.type = "button";
  botao.className = "cor";
  botao.dataset.cor = cor;
  botao.style.setProperty("--c", cor);
  botao.title = nome;
  botao.setAttribute("aria-label", nome);

  botao.onclick = () => {
    aplicarCor(cor, true);
  };

  $("cores").appendChild(botao);
});

$("corLivre").addEventListener("input", (evento) => {
  aplicarCor(evento.target.value, true);
});

let corSalva = "#5b5bf0";

try {
  corSalva =
    localStorage.getItem(CHAVE_COR) || corSalva;
} catch (e) {
  console.error("Não foi possível carregar a cor.", e);
}

aplicarCor(corSalva, false);

carregar();
renderizar();
