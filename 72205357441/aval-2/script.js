// ==========================================
// LÓGICA DO PROJETO (REGRAS DA AULA)
// ==========================================
const tarefas = [];
let proximoCodigo = 0;

function validarDadosTarefa(titulo, prioridade) {
  if (!titulo || titulo.trim().length < 5) {
    throw new Error("O título deve ter no mínimo cinco caracteres.");
  }

  if (prioridade < 1 || prioridade > 3) {
    throw new Error("A prioridade deve estar entre 1 e 3.");
  }
}

function cadastrarTarefa(titulo, prioridade) {
  validarDadosTarefa(titulo, prioridade);

  proximoCodigo++;

  const novaTarefa = {
    codigo: proximoCodigo,
    titulo: titulo.trim(),
    prioridade: Number(prioridade),
    status: true
  };

  tarefas.push(novaTarefa);
  return novaTarefa;
}

function listarTarefas() {
  return tarefas;
}

function buscarTarefa(codigo) {
  const tarefaEncontrada = tarefas.find((tarefa) => tarefa.codigo === codigo);

  if (!tarefaEncontrada) {
    throw new Error(`Tarefa com código ${codigo} não foi encontrada.`);
  }

  return tarefaEncontrada;
}

function concluirTarefa(codigo) {
  const tarefa = buscarTarefa(codigo);

  if (!tarefa.status) {
    throw new Error("Esta tarefa já estava concluída.");
  }

  tarefa.status = false;
  return tarefa;
}

function alterarPrioridade(codigo, novaPrioridade) {
  const tarefa = buscarTarefa(codigo);
  validarDadosTarefa(tarefa.titulo, Number(novaPrioridade));
  tarefa.prioridade = Number(novaPrioridade);
  return tarefa;
}

// ==========================================
// CONEXÃO COM A TELA (DOM)
// ==========================================
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form-tarefa");
  const inputTitulo = document.getElementById("titulo");
  const selectPrioridade = document.getElementById("prioridade");
  const tbody = document.getElementById("lista-tarefas");
  const divErro = document.getElementById("mensagem-erro");

  function mostrarErro(mensagem) {
    divErro.textContent = mensagem;
    divErro.style.display = "block";
  }

  function limparErro() {
    divErro.textContent = "";
    divErro.style.display = "none";
  }

  function renderizarTabela() {
    tbody.innerHTML = "";
    const lista = listarTarefas();

    lista.forEach((tarefa) => {
      const tr = document.createElement("tr");

      // Coluna Código
      const tdCodigo = document.createElement("td");
      tdCodigo.textContent = `#${tarefa.codigo}`;

      // Coluna Título
      const tdTitulo = document.createElement("td");
      tdTitulo.textContent = tarefa.titulo;
      if (!tarefa.status) {
        tdTitulo.classList.add("concluida");
      }

      // Coluna Prioridade
      const tdPrioridade = document.createElement("td");
      const select = document.createElement("select");
      select.className = "select-prioridade";
      select.disabled = !tarefa.status;

      const opcoes = [
        { valor: 1, texto: "1 - Alta" },
        { valor: 2, texto: "2 - Média" },
        { valor: 3, texto: "3 - Baixa" }
      ];

      opcoes.forEach((op) => {
        const option = document.createElement("option");
        option.value = op.valor;
        option.textContent = op.texto;
        if (tarefa.prioridade === op.valor) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      select.addEventListener("change", function () {
        limparErro();
        try {
          alterarPrioridade(tarefa.codigo, Number(this.value));
          renderizarTabela();
        } catch (erro) {
          mostrarErro(erro.message);
        }
      });

      tdPrioridade.appendChild(select);

      // Coluna Status
      const tdStatus = document.createElement("td");
      tdStatus.textContent = tarefa.status ? "Em execução" : "Concluída";

      // Coluna Ação
      const tdAcao = document.createElement("td");
      const btnConcluir = document.createElement("button");
      btnConcluir.type = "button";
      btnConcluir.className = "btn-concluir";
      btnConcluir.textContent = tarefa.status ? "Concluir" : "Feita";
      btnConcluir.disabled = !tarefa.status;

      btnConcluir.addEventListener("click", function () {
        limparErro();
        try {
          concluirTarefa(tarefa.codigo);
          renderizarTabela();
        } catch (erro) {
          mostrarErro(erro.message);
        }
      });

      tdAcao.appendChild(btnConcluir);

      // Monta a linha na tabela
      tr.appendChild(tdCodigo);
      tr.appendChild(tdTitulo);
      tr.appendChild(tdPrioridade);
      tr.appendChild(tdStatus);
      tr.appendChild(tdAcao);

      tbody.appendChild(tr);
    });
  }

  form.addEventListener("submit", function (evento) {
    evento.preventDefault();
    limparErro();

    try {
      cadastrarTarefa(inputTitulo.value, Number(selectPrioridade.value));
      inputTitulo.value = "";
      selectPrioridade.value = "2";
      inputTitulo.focus();
      renderizarTabela();
    } catch (erro) {
      mostrarErro(erro.message);
    }
  });
});
