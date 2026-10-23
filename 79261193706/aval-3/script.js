const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const toast = $('#toast');
let toastTimer;
function notify(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function refreshIcons() {
  if (window.lucide) lucide.createIcons();
}
refreshIcons();

// Data dinâmica da data no cabeçalho.
const dateLabel = $('#currentDate');
const today = new Date();
dateLabel.textContent = new Intl.DateTimeFormat('pt-BR', {weekday:'long', day:'2-digit', month:'long'}).format(today).toUpperCase();

// Alternar tema claro/escuro.
$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  notify(document.body.classList.contains('light-mode') ? 'Tema claro ativado.' : 'Tema escuro ativado.');
});

// Pesquisa global simples: destaca o conteúdo que corresponde ao termo.
const globalSearch = $('#searchInput');
globalSearch.addEventListener('input', () => {
  const term = globalSearch.value.trim().toLocaleLowerCase('pt-BR');
  $$('.project-name, .task-text, .activity-copy').forEach(el => {
    el.closest('tr, .task-item, .activity-item').style.display =
      !term || el.textContent.toLocaleLowerCase('pt-BR').includes(term) ? '' : 'none';
  });
});
document.addEventListener('keydown', e => {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault(); globalSearch.focus();
  }
  if (e.key === 'Escape') { globalSearch.value = ''; globalSearch.dispatchEvent(new Event('input')); }
});

// Gráfico: alterna rótulos e curvas conforme o período.
const chartSets = {
  week: {total:'326', labels:['Seg','Ter','Qua','Qui','Sex','Sáb','Dom'], done:'M0,160 C45,120 60,140 100,105 S165,125 200,90 S265,100 300,70 S365,85 400,55 S465,70 500,45 S565,60 600,30 S665,40 700,22', created:'M0,180 C45,160 60,170 100,145 S165,155 200,130 S265,140 300,115 S365,130 400,100 S465,115 500,90 S565,105 600,80 S665,95 700,70'},
  month: {total:'1.284', labels:['01 Out','05 Out','10 Out','15 Out','20 Out','25 Out','31 Out'], done:'M0,150 C40,130 55,110 100,120 S165,90 200,105 S260,65 300,90 S365,110 400,70 S465,85 500,55 S565,75 600,35 S665,45 700,20', created:'M0,175 C55,165 65,145 100,155 S165,140 200,150 S260,120 300,135 S365,145 400,125 S465,135 500,110 S565,120 600,95 S665,110 700,80'},
  year: {total:'12.840', labels:['Jan','Mar','Mai','Jul','Set','Out','Dez'], done:'M0,165 C45,155 60,115 100,130 S165,95 200,115 S265,80 300,100 S365,65 400,80 S465,55 500,72 S565,38 600,50 S665,22 700,16', created:'M0,185 C45,175 60,155 100,165 S165,140 200,155 S265,120 300,140 S365,110 400,125 S465,95 500,110 S565,82 600,95 S665,72 700,60'}
};
$('#periodSelect').addEventListener('change', e => {
  const data = chartSets[e.target.value];
  $('#chartTotal').innerHTML = `${data.total} <span class="trend positive">+18,4%</span>`;
  $('#lineDone').setAttribute('d', data.done);
  $('#areaPath').setAttribute('d', data.done + ' L700,210 L0,210Z');
  $('#lineCreated').setAttribute('d', data.created);
  $('#chartLabels').innerHTML = data.labels.map(label => `<span>${label}</span>`).join('');
  notify('Gráfico atualizado.');
});

// Novo projeto com formulário modal e inserção na tabela.
const projectDialog = $('#projectDialog');
$('#newProjectButton').addEventListener('click', () => projectDialog.showModal());
$('#projectForm').addEventListener('submit', e => {
  if (e.submitter?.value === 'cancel') return;
  e.preventDefault();
  const name = $('#projectName').value.trim();
  const category = $('#projectCategory').value;
  if (!name) return;
  const row = document.createElement('tr');
  row.innerHTML = `<td><div class="project-name"><span class="project-logo logo-purple"><i data-lucide="folder"></i></span><span><b></b><small></small></span></div></td><td><div class="progress-cell"><div class="progress-track"><div class="progress-fill" style="width:0%"></div></div><span>0%</span></div></td><td><span class="status-pill in-progress">Novo</span></td><td>A definir</td><td><div class="avatar-stack"><span class="stack-a">RC</span></div></td><td><button class="row-menu" aria-label="Mais opções"><i data-lucide="ellipsis"></i></button></td>`;
  row.querySelector('.project-name b').textContent = name;
  row.querySelector('.project-name small').textContent = category;
  $('#projectTable').prepend(row);
  projectDialog.close(); $('#projectForm').reset(); refreshIcons();
  updateProjectCount(); notify(`Projeto "${name}" criado.`);
});
$('#projectForm').addEventListener('click', e => { if (e.target.matches('[value="cancel"]')) projectDialog.close(); });
function updateProjectCount() {
  const visible = $$('#projectTable tr').filter(row => row.style.display !== 'none').length;
  $('#projectCount').textContent = `Mostrando ${visible} projeto(s) nesta lista`;
}
$('#projectSearch').addEventListener('input', e => {
  const term = e.target.value.toLocaleLowerCase('pt-BR');
  $$('#projectTable tr').forEach(row => row.style.display = row.textContent.toLocaleLowerCase('pt-BR').includes(term) ? '' : 'none');
  updateProjectCount();
});

// Tarefas: marcar como concluída e criar novas.
function updateTaskCount() {
  const tasks = $$('.task-item', $('#taskList'));
  const done = tasks.filter(task => $('input', task).checked).length;
  $('#taskCount').textContent = `${done} de ${tasks.length} tarefas concluídas`;
}
$('#taskList').addEventListener('change', e => { if (e.target.matches('input[type="checkbox"]')) updateTaskCount(); });
const taskDialog = $('#taskDialog');
$('#addTaskButton').addEventListener('click', () => taskDialog.showModal());
$('#taskForm').addEventListener('submit', e => {
  if (e.submitter?.value === 'cancel') return;
  e.preventDefault();
  const name = $('#taskName').value.trim();
  const priority = $('#taskPriority').value;
  if (!name) return;
  const labels = {high:'Alta', medium:'Média', low:'Baixa'};
  const task = document.createElement('label');
  task.className = 'task-item';
  task.innerHTML = `<input type="checkbox"><span class="custom-check"></span><span class="task-text"><b></b><small><i data-lucide="calendar"></i> Sem prazo definido</small></span><span class="priority ${priority}">${labels[priority]}</span>`;
  $('.task-text b', task).textContent = name;
  $('#taskList').append(task);
  taskDialog.close(); $('#taskForm').reset(); refreshIcons(); updateTaskCount();
  notify('Tarefa adicionada à sua lista.');
});
$('#taskForm').addEventListener('click', e => { if (e.target.matches('[value="cancel"]')) taskDialog.close(); });

// Ações auxiliares da interface.
$('#exportButton').addEventListener('click', () => {
  const projects = $$('#projectTable tr').map(row => [...row.querySelectorAll('td')].slice(0,4).map(td => td.innerText.replace(/\n/g,' - ')));
  const tasks = $$('.task-item', $('#taskList')).map(task => ({tarefa:$('.task-text b',task).textContent, concluida:$('input',task).checked, prioridade:$('.priority',task).textContent}));
  const data = {exportadoEm:new Date().toISOString(), projetos:projects, tarefas:tasks};
  const blob = new Blob([JSON.stringify(data,null,2)], {type:'application/json'});
  const url = URL.createObjectURL(blob); const a = document.createElement('a');
  a.href=url; a.download='pulse-workspace.json'; a.click(); URL.revokeObjectURL(url);
  notify('Dados exportados em JSON.');
});
$('#notificationButton').addEventListener('click', () => notify('Você está em dia! Não há novas notificações.'));
$('#profileMenu').addEventListener('click', () => notify('Menu de perfil demonstrativo.'));
$('#viewActivity').addEventListener('click', () => notify('Você está vendo as atividades mais recentes.'));
$('#loadActivity').addEventListener('click', () => {
  const list = $('#activityList');
  const item = document.createElement('div'); item.className='activity-item';
  item.innerHTML='<div class="activity-avatar avatar-violet">RC</div><div class="activity-copy"><p><b>Rafael Costa</b> abriu o workspace</p><span>Visão geral do projeto</span><small>Agora mesmo</small></div><span class="activity-status done"></span>';
  list.append(item); notify('Mais uma atividade foi carregada.');
});
$('#allProjectsButton').addEventListener('click', () => { $('#projectSearch').value=''; $('#projectSearch').dispatchEvent(new Event('input')); notify('Todos os projetos desta lista estão visíveis.'); });
$('#pageTwo').addEventListener('click', () => notify('Esta demonstração contém a primeira página de projetos.'));
$('#nextPage').addEventListener('click', () => notify('Não há mais páginas nesta demonstração.'));
$$('[data-quick]').forEach(button => button.addEventListener('click', () => {
  const action = button.dataset.quick;
  if (action === 'Criar tarefa') taskDialog.showModal();
  else notify(`${action}: recurso demonstrativo pronto para conectar.`);
}));
$$('.row-menu').forEach(button => button.addEventListener('click', () => notify('Opções do projeto: recurso demonstrativo.')));
