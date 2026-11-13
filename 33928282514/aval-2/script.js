// Seleção flexível para o HTML nativo da plataforma
const input = document.querySelector('input');
const select = document.querySelector('select');
const alertMsg = document.querySelector('[role="alert"]');
const ul = document.querySelector('ul');
const counterMsg = document.querySelector('main header p');
const emptyMsg = document.querySelector('main > p');
const button = document.querySelector('button');

let tasks = [];

function updateUI() {
  ul.innerHTML = '';
  
  if (tasks.length === 0) {
    if (emptyMsg) emptyMsg.style.display = 'block';
  } else {
    if (emptyMsg) emptyMsg.style.display = 'none';
    
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.justifyContent = 'space-between';
      li.style.alignItems = 'center';
      li.style.padding = '10px';
      li.style.marginBottom = '8px';
      li.style.borderRadius = '8px';
      li.style.backgroundColor = task.completed ? '#f3f4f6' : '#faf5ff';
      li.style.border = '1px solid #e9d5ff';

      const priorityText = task.priority === '1' ? 'Alta' : task.priority === '2' ? 'Média' : 'Baixa';

      li.innerHTML = `
        <label style="display: flex; align-items: center; gap: 8px; cursor: pointer; ${task.completed ? 'text-decoration: line-through; color: #6b7280;' : 'color: #4c1d95; font-weight: 500;'}">
          <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
          <span>${task.title} — <strong>Prioridade: ${priorityText}</strong></span>
        </label>
        <button data-delete="${index}" style="background: #ef4444; color: white; border: none; padding: 4px 10px; border-radius: 6px; cursor: pointer;">Excluir</button>
      `;
      ul.appendChild(li);
    });
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;

  if (counterMsg) {
    counterMsg.textContent = `Total: ${total} | Pendentes: ${pending} | Concluídas: ${completed}`;
  }
}

function handleAddTask() {
  const title = input ? input.value.trim() : '';
  const priority = select ? select.value : '2';

  if (title.length < 5) {
    if (alertMsg) alertMsg.textContent = 'A descrição deve ter no mínimo 5 caracteres.';
    return;
  }

  if (alertMsg) alertMsg.textContent = '';

  tasks.push({
    title,
    priority,
    completed: false
  });

  if (input) input.value = '';
  if (select) select.value = '2';
  updateUI();
}

// Evento de clique no botão cadastrar
if (button) {
  button.addEventListener('click', (e) => {
    e.preventDefault();
    handleAddTask();
  });
}

// Suporte a pressionar Enter no campo de texto
if (input) {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTask();
    }
  });
}

// Evento de concluir ou excluir tarefa
if (ul) {
  ul.addEventListener('click', (e) => {
    const index = e.target.dataset.index || e.target.dataset.delete;
    if (index === undefined) return;

    if (e.target.type === 'checkbox') {
      tasks[index].completed = e.target.checked;
      updateUI();
    } else if (e.target.dataset.delete !== undefined) {
      tasks.splice(index, 1);
      updateUI();
    }
  });
}

updateUI();