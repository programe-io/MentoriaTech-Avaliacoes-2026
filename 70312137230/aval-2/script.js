// Apenas memória temporária (sem localStorage)
let tarefas = [];
let dataSelecionada = new Date().toISOString().split('T')[0];

function atualizarSistema() {
  atualizarKPIs();
  renderizarCalendario();
  renderizarBoletimEDados();
}

function mostrarToast(mensagem) {
  const toast = document.getElementById('toast');
  const msg = document.getElementById('toast-msg');
  if (!toast || !msg) return;
  msg.textContent = mensagem;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => {
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2800);
}

function atualizarKPIs() {
  document.getElementById('kpi-total').textContent = tarefas.length;
  document.getElementById('kpi-concluidas').textContent = tarefas.filter(t => t.concluida).length;
}

window.cadastrarTarefa = function() {
  const codigoInput = document.getElementById('codigo');
  const tituloInput = document.getElementById('titulo');
  const dataInput = document.getElementById('data-tarefa');
  const prioridadeInput = document.getElementById('prioridade');

  const titulo = tituloInput.value.trim();
  const dataTarefa = dataInput.value || dataSelecionada;
  const prioridade = parseInt(prioridadeInput.value);

  if (titulo.length < 5) {
    alert('Validação: O título deve ter no mínimo 5 caracteres.');
    tituloInput.focus();
    return;
  }

  if (isNaN(prioridade) || prioridade < 1 || prioridade > 3) {
    alert('Validação: A prioridade deve ser um valor entre 1 e 3.');
    return;
  }

  const novaTarefa = {
    id: Date.now(),
    codigo: codigoInput.value.trim() || `TSK-${Math.floor(100 + Math.random() * 900)}`,
    titulo: titulo,
    data: dataTarefa,
    prioridade: prioridade,
    concluida: false
  };

  tarefas.unshift(novaTarefa);
  dataSelecionada = dataTarefa;
  atualizarSistema();

  codigoInput.value = '';
  tituloInput.value = '';
  mostrarToast('Tarefa agendada com sucesso!');
};

window.toggleConcluida = function(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.concluida = !tarefa.concluida;
    atualizarSistema();
    mostrarToast(tarefa.concluida ? 'Tarefa concluída!' : 'Tarefa reaberta!');
  }
};

window.mudarPrioridadeDireto = function(id, novoValor) {
  const tarefa = tarefas.find(t => t.id === id);
  if (tarefa) {
    tarefa.prioridade = parseInt(novoValor);
    atualizarSistema();
    mostrarToast('Prioridade atualizada!');
  }
};

window.excluirTarefa = function(id) {
  tarefas = tarefas.filter(t => t.id !== id);
  atualizarSistema();
  mostrarToast('Tarefa excluída.');
};

window.selecionarDia = function(dataStr) {
  dataSelecionada = dataStr;
  renderizarCalendario();
  renderizarBoletimEDados();
};

window.renderizarCalendario = function() {
  const grid = document.getElementById('grid-calendario');
  const labelMes = document.getElementById('mes-atual-label');
  if (!grid) return;

  const agora = new Date();
  const ano = agora.getFullYear();
  const mes = agora.getMonth();

  const primeiroDiaDoMes = new Date(ano, mes, 1).getDay();
  const ultimoDiaDoMes = new Date(ano, mes + 1, 0).getDate();

  labelMes.textContent = agora.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });

  let html = '';
  for (let i = 0; i < primeiroDiaDoMes; i++) {
    html += `<div></div>`;
  }

  for (let dia = 1; dia <= ultimoDiaDoMes; dia++) {
    const diaStr = String(dia).padStart(2, '0');
    const mesStr = String(mes + 1).padStart(2, '0');
    const dataStr = `${ano}-${mesStr}-${diaStr}`;

    const temTarefas = tarefas.filter(t => t.data === dataStr);
    const temConcluidas = temTarefas.length > 0 && temTarefas.every(t => t.concluida);
    const isSelecionado = dataSelecionada === dataStr;

    let indicadorCor = '';
    if (temTarefas.length > 0) {
      indicadorCor = temConcluidas ? 'bg-emerald-500' : 'bg-amber-500';
    }

    html += `
      <div onclick="selecionarDia('${dataStr}')"
        class="dia-calendario h-9 rounded-xl flex flex-col items-center justify-center cursor-pointer text-xs font-medium relative ${
          isSelecionado ? 'dia-selecionado font-bold shadow-sm' : 'bg-stone-50 text-stone-700 border border-stone-200/60'
        }">
        <span>${dia}</span>
        ${indicadorCor ? `<span class="w-1.5 h-1.5 rounded-full ${indicadorCor} absolute bottom-1"></span>` : ''}
      </div>
    `;
  }

  grid.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.renderizarBoletimEDados = function() {
  const labelData = document.getElementById('data-selecionada-label');
  const contador = document.getElementById('contador-tarefas-data');
  const lista = document.getElementById('lista-tarefas-data');
  const boletimDiv = document.getElementById('conteudo-boletim');
  const boletimStatus = document.getElementById('boletim-status');

  if (!lista) return;

  const dataFormatada = new Date(dataSelecionada + 'T00:00:00').toLocaleDateString('pt-BR', { dateStyle: 'long' });
  labelData.textContent = dataFormatada;

  const tarefasDoDia = tarefas.filter(t => t.data === dataSelecionada);
  contador.textContent = tarefasDoDia.length;

  const totalDia = tarefasDoDia.length;
  const concluidasDia = tarefasDoDia.filter(t => t.concluida).length;
  const pendentesDia = totalDia - concluidasDia;

  if (totalDia === 0) {
    boletimStatus.textContent = 'Livre';
    boletimStatus.className = 'text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-stone-200 text-stone-700';
    boletimDiv.innerHTML = `<p class="text-stone-500">Nenhuma tarefa agendada para este dia. Aproveite o tempo livre!</p>`;
  } else if (pendentesDia === 0) {
    boletimStatus.textContent = '100% Concluído';
    boletimStatus.className = 'text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800';
    boletimDiv.innerHTML = `<p class="text-emerald-800 font-medium">Parabéns! Todas as ${totalDia} tarefas deste dia foram concluídas com sucesso.</p>`;
  } else {
    boletimStatus.textContent = 'Em Andamento';
    boletimStatus.className = 'text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800';
    boletimDiv.innerHTML = `<p class="text-stone-700">Você tem <strong>${pendentesDia}</strong> tarefa(s) pendente(s) e <strong>${concluidasDia}</strong> concluída(s) para hoje. Foco no objetivo!</p>`;
  }

  lista.innerHTML = tarefasDoDia.length === 0
    ? `<div class="text-center py-8 text-stone-400 text-xs border border-dashed border-stone-200 rounded-xl">Sem registros para esta data.</div>`
    : tarefasDoDia.map(t => `
      <div class="bg-white border border-stone-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
        <div class="flex items-center gap-3">
          <button type="button" onclick="toggleConcluida(${t.id})"
            class="w-5 h-5 rounded-md border flex items-center justify-center transition ${
              t.concluida ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-stone-300 hover:border-stone-800 bg-white'
            }">
            ${t.concluida ? '<i data-lucide="check" class="w-3.5 h-3.5"></i>' : ''}
          </button>
          <div>
            <span class="text-[10px] font-mono text-stone-400">${t.codigo}</span>
            <h4 class="text-xs font-semibold text-stone-800 ${t.concluida ? 'line-through text-stone-400' : ''}">${t.titulo}</h4>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <select onchange="mudarPrioridadeDireto(${t.id}, this.value)"
            class="text-[11px] font-semibold px-2 py-0.5 rounded-md border cursor-pointer ${
              t.prioridade === 1 ? 'bg-rose-50 text-rose-700 border-rose-200' :
              t.prioridade === 2 ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-sky-50 text-sky-700 border-sky-200'
            }">
            <option value="1" ${t.prioridade === 1 ? 'selected' : ''}>1 - Alta</option>
            <option value="2" ${t.prioridade === 2 ? 'selected' : ''}>2 - Média</option>
            <option value="3" ${t.prioridade === 3 ? 'selected' : ''}>3 - Baixa</option>
          </select>
          <button type="button" onclick="excluirTarefa(${t.id})" class="text-stone-400 hover:text-rose-600 p-1 cursor-pointer">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
          </button>
        </div>
      </div>
    `).join('');

  if (typeof lucide !== 'undefined') lucide.createIcons();
};

window.limparTudo = function() {
  tarefas = [];
  atualizarSistema();
  mostrarToast('Agenda zerada!');
};

setTimeout(() => {
  const inputData = document.getElementById('data-tarefa');
  if (inputData) inputData.value = dataSelecionada;
  atualizarSistema();
}, 200);