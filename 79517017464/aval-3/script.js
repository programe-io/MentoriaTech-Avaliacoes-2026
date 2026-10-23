// Ativa os ícones da biblioteca Lucide
    lucide.createIcons();

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const menuButton = document.getElementById('mobileMenuButton');
    const modal = document.getElementById('modal');
    const form = document.getElementById('studentForm');
    const toast = document.getElementById('toast');a
    let toastTimer;

    function showToast(message) {
      toast.textContent = message;
      toast.classList.remove('hidden');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.add('hidden'), 3000);
    }

    function toggleMenu(open) {
      sidebar.classList.toggle('-translate-x-full', !open);
      overlay.classList.toggle('hidden', !open);
    }
    menuButton.addEventListener('click', () => toggleMenu(sidebar.classList.contains('-translate-x-full')));
    overlay.addEventListener('click', () => toggleMenu(false));

    function openModal(title = 'Novo aluno') {
      document.getElementById('modalTitle').textContent = title;
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      if (title === 'Novo aluno') document.getElementById('studentName').focus();
    }
    function closeModal() {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
    document.getElementById('addStudentButton').addEventListener('click', () => openModal());
    document.getElementById('closeModal').addEventListener('click', closeModal);
    document.getElementById('cancelModal').addEventListener('click', closeModal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const name = document.getElementById('studentName').value.trim();
      const email = document.getElementById('studentEmail').value.trim();
      const course = document.getElementById('studentCourse').value;
      if (!name || !email) return;

      const initials = name.split(/\s+/).slice(0, 2).map(part => part[0]).join('').toUpperCase();
      const row = document.createElement('tr');
      row.className = 'border-b border-slate-50';
      const safe = value => value.replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
      row.innerHTML = `
        <td class="py-4"><div class="flex items-center gap-3"><span class="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-xs font-bold text-violet-700">${safe(initials)}</span><span><span class="block font-semibold text-slate-700">${safe(name)}</span><span class="text-xs text-slate-400">${safe(email)}</span></span></div></td>
        <td class="py-4 text-slate-500">${safe(course)}</td>
        <td class="py-4"><span class="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">Ativo</span></td>
        <td class="py-4 text-right text-slate-500">${new Date().toLocaleDateString('pt-BR')}</td>`;
      document.getElementById('studentTable').prepend(row);
      const count = document.getElementById('studentCount');
      count.textContent = String(Number(count.textContent) + 1);
      form.reset();
      closeModal();
      showToast(`Aluno ${name} cadastrado na demonstração.`);
    });

    function updateTaskCounter() {
      const checks = [...document.querySelectorAll('.task-check')];
      const pending = checks.filter(check => !check.checked).length;
      document.getElementById('taskCounter').textContent = `${pending} ${pending === 1 ? 'tarefa' : 'tarefas'}`;
      checks.forEach(check => {
        const text = check.parentElement.querySelector('span span');
        text.classList.toggle('line-through', check.checked);
        text.classList.toggle('text-slate-400', check.checked);
      });
    }
    document.querySelectorAll('.task-check').forEach(check => check.addEventListener('change', updateTaskCounter));

    document.getElementById('addTaskButton').addEventListener('click', () => {
      const taskName = prompt('Qual tarefa você deseja adicionar?');
      if (!taskName || !taskName.trim()) return;
      const label = document.createElement('label');
      label.className = 'flex cursor-pointer items-start gap-3';
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.className = 'task-check mt-1 h-4 w-4 accent-violet-600';
      checkbox.addEventListener('change', updateTaskCounter);
      const span = document.createElement('span');
      span.className = 'flex-1';
      const title = document.createElement('span');
      title.className = 'block text-sm font-medium text-slate-700';
      title.textContent = taskName.trim();
      const detail = document.createElement('span');
      detail.className = 'mt-1 block text-xs text-slate-400';
      detail.textContent = 'Nova tarefa · Hoje';
      span.append(title, detail);
      label.append(checkbox, span);
      document.getElementById('taskList').append(label);
      updateTaskCounter();
      showToast('Tarefa adicionada.');
    });

    document.getElementById('exportButton').addEventListener('click', () => {
      const rows = [...document.querySelectorAll('#studentTable tr')].map(tr =>
        [...tr.querySelectorAll('td')].map(td => td.innerText.replace(/\n/g, ' ').trim())
      );
      const csv = [['Aluno', 'Curso', 'Status', 'Matrícula'], ...rows]
        .map(row => row.map(cell => '"' + cell.replace(/"/g, '""') + '"').join(';')).join('\n');
      const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url; link.download = 'alunos-educapainel.csv'; link.click();
      URL.revokeObjectURL(url);
      showToast('Relatório CSV exportado.');
    });

    document.getElementById('globalSearch').addEventListener('input', event => {
      const query = event.target.value.toLocaleLowerCase('pt-BR').trim();
      document.querySelectorAll('#studentTable tr').forEach(row => {
        row.classList.toggle('hidden', !row.innerText.toLocaleLowerCase('pt-BR').includes(query));
      });
    });

    document.getElementById('periodSelect').addEventListener('change', event => {
      const heights = event.target.value === 'mes' ? [72, 80, 86, 91, 95] : [78, 88, 83, 94, 90];
      document.querySelectorAll('#relatorios .bar').forEach((bar, index) => {
        if (index < heights.length) bar.style.height = heights[index] + '%';
      });
      showToast(event.target.value === 'mes' ? 'Exibindo dados ilustrativos do mês.' : 'Exibindo dados ilustrativos da semana.');
    });

    document.getElementById('notificationButton').addEventListener('click', () => showToast('Você não tem novas notificações.'));
    document.getElementById('helpButton').addEventListener('click', () => showToast('Projeto demonstrativo: personalize esta área com os contatos da instituição.'));
    document.getElementById('viewStudentsButton').addEventListener('click', () => showToast('A tabela mostra os alunos cadastrados nesta demonstração.'));
    document.getElementById('coursesButton').addEventListener('click', () => showToast('Área de cursos ilustrativa. Você pode expandi-la em outro exercício.'));

    document.querySelectorAll('[data-nav]').forEach(link => link.addEventListener('click', () => {
      document.querySelectorAll('[data-nav]').forEach(item => item.classList.remove('active'));
      link.classList.add('active');
      if (window.innerWidth < 1024) toggleMenu(false);
    }));
