// Extensão didática opcional: todas as ações permanecem locais à página.
const status = document.querySelector('#status');
document.addEventListener('click', async event => {
 const button = event.target.closest('button'); if (!button) return;
 const article = button.closest('article');
 if (button.hasAttribute('data-like')) {
   const active = button.getAttribute('aria-pressed') === 'true';
   button.setAttribute('aria-pressed', String(!active));
   article.querySelector('.likes').textContent = (Number(button.dataset.count) + (active ? 0 : 1)) + ' curtidas';
   button.querySelector('i').className = active ? 'bx bx-heart' : 'bx bxs-heart';
 }
 if (button.hasAttribute('data-save')) { const active = button.getAttribute('aria-pressed') === 'true'; button.setAttribute('aria-pressed', String(!active)); button.querySelector('i').className = active ? 'bx bx-bookmark' : 'bx bxs-bookmark'; status.textContent = active ? 'Publicação removida dos salvos locais.' : 'Publicação marcada nesta sessão.'; }
 if (button.hasAttribute('data-comment')) { const form = article.querySelector('form'); form.hidden = !form.hidden; if (!form.hidden) form.querySelector('input').focus(); }
 if (button.hasAttribute('data-follow')) { const active = button.getAttribute('aria-pressed') === 'true'; button.setAttribute('aria-pressed', String(!active)); button.textContent = active ? 'Seguir' : 'Seguindo'; }
 if (button.hasAttribute('data-share')) { try { await navigator.clipboard.writeText(article.querySelector('.caption').textContent); status.textContent = 'Texto da publicação copiado.'; } catch { status.textContent = 'Seu navegador não permitiu copiar automaticamente. Selecione e copie a legenda.'; } }
});
document.querySelectorAll('.comment-form').forEach(form => form.addEventListener('submit', event => { event.preventDefault(); const input = form.querySelector('input'); if (!input.value.trim()) return; const p = document.createElement('p'); p.textContent = 'Você: ' + input.value.trim(); form.closest('article').querySelector('.comments').append(p); input.value = ''; }));
document.querySelector('#pesquisa').addEventListener('input', event => { const query = event.target.value.toLocaleLowerCase('pt-BR').trim(); let found = 0; document.querySelectorAll('#posts article').forEach(article => { article.hidden = !article.textContent.toLocaleLowerCase('pt-BR').includes(query); if (!article.hidden) found++; }); document.querySelector('#empty').hidden = found > 0; });
 
// Identificação local do projeto; não envia dados.
const aluno = "Anita Cristina Franco da Cruz";