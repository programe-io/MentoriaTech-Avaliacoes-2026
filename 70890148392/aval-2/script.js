let tarefas = [
  {
    codigo: "T001",
    titulo: "Finalizar atividade de JavaScript",
    prioridade: 1,
    concluida: false
  },
  {
    codigo: "T002",
    titulo: "Estudar lógica de programação",
    prioridade: 2,
    concluida: false
  },
  {
    codigo: "T003",
    titulo: "Organizar os arquivos do projeto",
    prioridade: 3,
    concluida: true
  },
  {
    codigo: "T004",
    titulo: "Revisar os exercícios da aula",
    prioridade: 2,
    concluida: false
  }
];

let proximoCodigo = 5;

function nomePrioridade(prioridade) {
  if (prioridade === 1) return "1 - Alta";
  if (prioridade === 2) return "2 - Média";
  return "3 - Baixa";
}

function listarTarefas() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  tarefas.forEach(function(tarefa) {
    const linha = document.createElement("tr");

    const status = tarefa.concluida
      ? "Concluída"
      : "Pendente";

    linha.innerHTML = `
      <td>${tarefa.codigo}</td>
      <td>${tarefa.titulo}</td>
      <td>${nomePrioridade(tarefa.prioridade)}</td>
      <td class="${tarefa.concluida ? "status-concluida" : "status-pendente"}">
        ${status}
      </td>
      <td>
        <div class="acoes">
          <button data-acao="concluir" data-codigo="${tarefa.codigo}">
            ${tarefa.concluida ? "Desfazer" : "Concluir"}
          </button>
          <button data-acao="prioridade" data-codigo="${tarefa.codigo}">
            Alterar prioridade
          </button>
        </div>
      </td>
    `;

    lista.appendChild(linha);
  });

  document.getElementById("total").textContent = tarefas.length;
  document.getElementById("pendentes").textContent =
    tarefas.filter(t => !t.concluida).length;
  document.getElementById("concluidas").textContent =
    tarefas.filter(t => t.concluida).length;
}

document.getElementById("adicionar").addEventListener("click", function() {
  const campoTitulo = document.getElementById("titulo");
  const titulo = campoTitulo.value.trim();
  const prioridade = Number(document.getElementById("prioridade").value);
  const mensagem = document.getElementById("mensagem");

  if (titulo.length < 5) {
    mensagem.textContent = "O título precisa ter pelo menos 5 caracteres.";
    return;
  }

  if (![1, 2, 3].includes(prioridade)) {
    mensagem.textContent = "Escolha uma prioridade de 1 a 3.";
    return;
  }

  const codigo = "T" + String(proximoCodigo).padStart(3, "0");

  tarefas.push({
    codigo: codigo,
    titulo: titulo,
    prioridade: prioridade,
    concluida: false
  });

  proximoCodigo++;
  campoTitulo.value = "";
  mensagem.textContent = "Tarefa cadastrada com sucesso!";

  listarTarefas();
});

document.getElementById("lista").addEventListener("click", function(event) {
  const botao = event.target.closest("button");
  if (!botao) return;

  const codigo = botao.dataset.codigo;
  const tarefa = tarefas.find(t => t.codigo === codigo);

  if (!tarefa) return;

  if (botao.dataset.acao === "concluir") {
    tarefa.concluida = !tarefa.concluida;
  }

  if (botao.dataset.acao === "prioridade") {
    tarefa.prioridade = tarefa.prioridade === 3
      ? 1
      : tarefa.prioridade + 1;
  }

  document.getElementById("mensagem").textContent =
    "Tarefa atualizada com sucesso!";

  listarTarefas();
});

listarTarefas();