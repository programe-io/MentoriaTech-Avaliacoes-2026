(() => {
      'use strict';
      const STORAGE_KEY = 'gerenciador-tarefas-v1';
      const form = document.getElementById('task-form');
      const titleInput = document.getElementById('task-title');
      const priorityInput = document.getElementById('task-priority');
      const notice = document.getElementById('form-notice');
      const list = document.getElementById('task-list');
      let tasks = loadTasks();

      function loadTasks() {
        try {
          const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
          return Array.isArray(saved) ? saved.filter(task => task && typeof task.code === 'string' && typeof task.title === 'string' && [1, 2, 3].includes(Number(task.priority))) : [];
        } catch (error) {
          return [];
        }
      }

      function saveTasks() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        } catch (error) {
          showNotice('Não foi possível salvar no navegador. Verifique as configurações de armazenamento.', 'error');
        }
      }

      function showNotice(message, type = '') {
        notice.textContent = message;
        notice.className = `notice ${type}`.trim();
      }

      function priorityName(priority) {
        return ({ 1: 'Alta', 2: 'Média', 3: 'Baixa' })[Number(priority)] || 'Média';
      }

      function createCode() {
        const next = tasks.reduce((max, task) => {
          const match = /^T-(\d+)$/.exec(task.code);
          return match ? Math.max(max, Number(match[1])) : max;
        }, 0) + 1;
        return `T-${String(next).padStart(3, '0')}`;
      }

      function element(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
      }

      function render() {
        list.replaceChildren();
        document.getElementById('total-count').textContent = tasks.length;
        document.getElementById('open-count').textContent = tasks.filter(task => !task.completed).length;
        document.getElementById('done-count').textContent = tasks.filter(task => task.completed).length;

        if (tasks.length === 0) {
          const empty = element('div', 'empty');
          empty.append(element('strong', '', 'Ainda não há tarefas por aqui.'), document.createTextNode('Use o formulário acima para cadastrar a primeira.'));
          list.append(empty);
          return;
        }

        tasks.forEach(task => {
          const card = element('article', `task${task.completed ? ' completed' : ''}`);
          const main = element('div', 'task-main');
          const titleRow = element('div', 'task-title-row');
          titleRow.append(element('h3', 'task-title', task.title));
          titleRow.append(element('span', `badge p${task.priority}`, `Prioridade ${task.priority} · ${priorityName(task.priority)}`));
          titleRow.append(element('span', `badge ${task.completed ? 'status-done' : 'status-open'}`, task.completed ? 'Concluída' : 'Em andamento'));
          main.append(titleRow);
          const meta = element('div', 'task-meta');
          meta.append(element('span', 'code', `Código: ${task.code}`));
          main.append(meta);

          const actions = element('div', 'task-actions');
          const editForm = element('form', 'priority-edit');
          editForm.setAttribute('aria-label', `Alterar prioridade da tarefa ${task.code}`);
          const select = document.createElement('select');
          select.setAttribute('aria-label', `Nova prioridade para ${task.code}`);
          [1, 2, 3].forEach(value => {
            const option = document.createElement('option');
            option.value = String(value);
            option.textContent = `${value} — ${priorityName(value)}`;
            if (Number(task.priority) === value) option.selected = true;
            select.append(option);
          });
          const updateButton = element('button', 'btn btn-secondary', 'Alterar prioridade');
          updateButton.type = 'submit';
          editForm.append(select, updateButton);
          editForm.addEventListener('submit', event => {
            event.preventDefault();
            const newPriority = Number(select.value);
            if (![1, 2, 3].includes(newPriority)) return;
            task.priority = newPriority;
            saveTasks();
            render();
            showNotice(`Prioridade da tarefa ${task.code} atualizada para ${priorityName(newPriority)}.`, 'success');
          });
          actions.append(editForm);

          const completeButton = element('button', 'btn btn-secondary', task.completed ? 'Reabrir tarefa' : 'Marcar concluída');
          completeButton.type = 'button';
          completeButton.setAttribute('aria-label', `${task.completed ? 'Reabrir' : 'Marcar como concluída'} a tarefa ${task.code}`);
          completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            saveTasks();
            render();
            showNotice(task.completed ? `Tarefa ${task.code} marcada como concluída.` : `Tarefa ${task.code} reaberta.`, 'success');
          });
          actions.append(completeButton);
          card.append(main, actions);
          list.append(card);
        });
      }

      form.addEventListener('submit', event => {
        event.preventDefault();
        const title = titleInput.value.trim();
        const priority = Number(priorityInput.value);
        if (title.length < 5) {
          showNotice('O título deve ter no mínimo 5 caracteres.', 'error');
          titleInput.focus();
          return;
        }
        if (![1, 2, 3].includes(priority)) {
          showNotice('Selecione uma prioridade entre 1 (alta) e 3 (baixa).', 'error');
          priorityInput.focus();
          return;
        }
        const task = { code: createCode(), title, priority, completed: false };
        tasks.unshift(task);
        saveTasks();
        render();
        form.reset();
        priorityInput.value = '2';
        titleInput.focus();
        showNotice(`Tarefa ${task.code} cadastrada com sucesso.`, 'success');
      });

      render();
    })();
