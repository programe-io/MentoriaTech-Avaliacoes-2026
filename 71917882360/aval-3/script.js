// 3. Armazenamento das tarefas com arrays
const tarefas = [];
let proximoId = 1;

// 5. Validação dos dados da tarefa
function validarDadosTarefa(descricao, prioridade) {
  if (!descricao || descricao.trim() === "") {
    return { valido: false, erro: "A descrição da tarefa não pode estar vazia." };
  }
  
  const prioridadesValidas = ["baixa", "media", "alta"];
  if (!prioridadesValidas.includes(prioridade.toLowerCase())) {
    return { valido: false, erro: "Prioridade inválida escolhida." };
  }
  
  return { valido: true };
}

// 6 e 7. Cadastro e modelagem com geração automática de ID
function cadastrarTarefa(descricao, prioridade) {
  const validacao = validarDadosTarefa(descricao, prioridade);
  if (!validacao.valido) {
    alert(validacao.erro);
    return false;
  }

  const novaTarefa = {
    id: proximoId++,
    descricao: descricao.trim(),
    prioridade: prioridade.toLowerCase(),
    concluida: false
  };

  tarefas.push(novaTarefa);
  atualizarInterface();
  return true;
}

// 9. Busca de tarefas com find
function buscarTarefaPorId(id) {
  return tarefas.find(tarefa => tarefa.id === parseInt(id));
}

// 10. Conclusão de uma tarefa
function concluirTarefa(id) {
  const tarefa = buscarTarefaPorId(id);
  if (tarefa) {
    tarefa.concluida = true;
    atualizarInterface();
  }
}

// 11. Alteração dinâmica da prioridade via tabela
function mudarPrioridadeInterface(id, novaPrioridade) {
  const tarefa = buscarTarefaPorId(id);
  if (tarefa) {
    tarefa.prioridade = novaPrioridade;
    atualizarInterface();
  }
}

// Interação com o Formulário do HTML
function acaoCadastrar() {
  const inputDesc = document.getElementById("descricao");
  const selectPrio = document.getElementById("prioridade");

  const sucesso = cadastrarTarefa(inputDesc.value, selectPrio.value);
  if (sucesso) {
    inputDesc.value = ""; // Limpa o campo após cadastrar
  }
}

// 8. Listagem das tarefas cadastradas (Renderização no HTML)
function atualizarInterface() {
  const tbody = document.getElementById("lista-tarefas");
  tbody.innerHTML = ""; // Limpa a tabela atual

  tarefas.forEach(t => {
    const tr = document.createElement("tr");
    if (t.concluida) tr.classList.add("concluida-linha");

    tr.innerHTML = `
      <td>${t.id}</td>
      <td>${t.descricao}</td>
      <td>
        <select onchange="mudarPrioridadeInterface(${t.id}, this.value)" ${t.concluida ? 'disabled' : ''}>
          <option value="baixa" ${t.prioridade === 'baixa' ? 'selected' : ''}>Baixa</option>
          <option value="media" ${t.prioridade === 'media' ? 'selected' : ''}>Média</option>
          <option value="alta" ${t.prioridade === 'alta' ? 'selected' : ''}>Alta</option>
        </select>
      </td>
      <td>
        <span class="badge ${t.prioridade}">${t.concluida ? 'Concluída' : 'Pendente'}</span>
      </td>
      <td>
        ${!t.concluida ? `<button class="btn-concluir" onclick="concluirTarefa(\${t.id})">Concluir</button>` : '-'}
      </td>
    `;
    
    tbody.appendChild(tr);
  });
}
