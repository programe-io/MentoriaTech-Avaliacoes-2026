document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-tarefa');
  const inputTitulo = document.getElementById('titulo-tarefa');
  const selectPrioridade = document.getElementById('prioridade-tarefa');
  const inputData = document.getElementById('data-tarefa');
  const listaTarefas = document.querySelector('ul');
  const radiosFiltro = document.querySelectorAll('input[name="filtro"]');
  const contadorTexto = document.querySelector('footer p');
  const btnLimparConcluidas = document.querySelector('footer button');

  let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [
    { id: 1, titulo: 'Revisar estrutura do projeto', prioridade: 'alta', data: '2026-11-25', concluida: false },
    { id: 2, titulo: 'Enviar relatório semanal', prioridade: 'media', data: '2026-11-24', concluida: true },
    { id: 3, titulo: 'Organizar arquivos da pasta downloads', prioridade: 'baixa', data: '', concluida: false }
  ];

  let filtroAtual = 'todas';

  const salvarLocalStorage = () => {
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
  };

  const formatarPrioridade = (prioridade) => {
    const mapa = { alta: 'Alta', media: 'Média', baixa: 'Baixa' };
    return mapa[prioridade] || prioridade;
  };

  const formatarData = (dataISO) => {
    if (!dataISO) return '';
    const [ano, mes, dia] = dataISO.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  const atualizarContador = () => {
    const total = tarefas.length;
    const concluidas = tarefas.filter(t => t.concluida).length;
    const pendentes = total - concluidas;
    contadorTexto.textContent = `Total: ${total} tarefas | Concluídas: ${concluidas} | Pendentes: ${pendentes}`;
  };

  const renderizarTarefas = () => {
    listaTarefas.innerHTML = '';

    const tarefasFiltradas = tarefas.filter(tarefa => {
      if (filtroAtual === 'pendentes') return !tarefa.concluida;
      if (filtroAtual === 'concluidas') return tarefa.concluida;
      return true;
    });

    tarefasFiltradas.forEach(tarefa => {
      const li = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = `tarefa-${tarefa.id}`;
      checkbox.checked = tarefa.concluida;
      checkbox.addEventListener('change', () => alternarConclusao(tarefa.id));

      const label = document.createElement('label');
      label.htmlFor = `tarefa-${tarefa.id}`;

      const strong = document.createElement('strong');
      strong.textContent = `[${formatarPrioridade(tarefa.prioridade)}] `;

      const textoTarefa = document.createTextNode(tarefa.titulo);

      if (tarefa.concluida) {
        const del = document.createElement('del');
        del.appendChild(strong);
        del.appendChild(textoTarefa);
        if (tarefa.data) {
          del.appendChild(document.createTextNode(' — '));
          const time = document.createElement('time');
          time.dateTime = tarefa.data;
          time.textContent = formatarData(tarefa.data);
          del.appendChild(time);
        }
        label.appendChild(del);
      } else {
        label.appendChild(strong);
        label.appendChild(textoTarefa);
        if (tarefa.data) {
          label.appendChild(document.createTextNode(' — '));
          const time = document.createElement('time');
          time.dateTime = tarefa.data;
          time.textContent = formatarData(tarefa.data);
          label.appendChild(time);
        }
      }

      const btnExcluir = document.