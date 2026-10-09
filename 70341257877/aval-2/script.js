document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-tarefa');
  const codigoInput = document.getElementById('codigo');
  const tituloInput = document.getElementById('titulo');
  const prioridadeSelect = document.getElementById('prioridade');
  
  const listaTarefas = document.getElementById('lista-tarefas');
  const mensagemVazia = document.getElementById('mensagem-vazia');
  const totalTarefasElem = document.getElementById('total-tarefas');

  const tarefas = [];

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const novaTarefa = {
      codigo: codigoInput.value.trim(),
      titulo: tituloInput.value.trim(),
      prioridade: prioridadeSelect.value
    };

    tarefas.push(novaTarefa);
    atualizarLista();
    form.reset();
  });

  function atualizarLista() {
    totalTarefasElem.textContent = tarefas.length;

    if (tarefas.length === 0) {
      mensagemVazia.style.display = 'block';
      listaTarefas.innerHTML = '';
      return;
    }

    mensagemVazia.style.display = 'none';
    listaTarefas.innerHTML = '';

    const textoPrioridade = {
      '1': 'Alta',
      '2': 'Média',
      '3': 'Baixa'
    };

    tarefas.forEach((tarefa) => {
      const li = document.createElement('li');
      li.className = 'item-tarefa';
      
      li.innerHTML = `
        <div>
          <strong>[${tarefa.codigo}]</strong> ${tarefa.titulo}
        </div>
        <span class="badge-prioridade prioridade-${tarefa.prioridade}">
          ${textoPrioridade[tarefa.prioridade]}
        </span>
      `;

      listaTarefas.appendChild(li);
    });
  }
});