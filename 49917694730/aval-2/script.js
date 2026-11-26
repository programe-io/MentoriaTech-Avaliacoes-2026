html{scroll-behavior:smooth;scroll-padding-top:90px}button,a,summary{touch-action:manipulation}button{cursor:pointer}a:focus-visible,button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid #2563eb;outline-offset:4px}[aria-pressed=true]{color:#be185d}.bx{vertical-align:middle}
#perfil:target{display:block;position:fixed;inset:75px 15px auto;z-index:55;width:auto;background:white;padding:20px;border:1px solid #ddd;border-radius:12px}
@media(min-width:768px){#perfil:target{position:static;width:16rem;padding:0;border:0}}
/* Tema exclusivo de Heitor de Carvalho Souza. */
body{background:#f8f4f8;color:#351d33}.text-blue-600,.text-blue-700{color:#6d1d67}.from-pink-500{--tw-gradient-from:#6d1d67 var(--tw-gradient-from-position);--tw-gradient-to:transparent var(--tw-gradient-to-position);--tw-gradient-stops:var(--tw-gradient-from),var(--tw-gradient-to)}.via-red-500{--tw-gradient-stops:var(--tw-gradient-from),#962c41 var(--tw-gradient-via-position),var(--tw-gradient-to)}

/* Nomes longos também se ajustam a telas estreitas. */
strong,h1,h2,h3,p,a{overflow-wrap:anywhere} .user,.post-header{min-width:0} .user>div,.post-header>div{min-width:0}// Identificação local do projeto; não envia dados.
const aluno = "Heitor de Carvalho Souza";
let quantidade = 0;
const botao = document.querySelector('#objetivo-btn');

botao.addEventListener('click', () => {
  const aberto = botao.getAttribute('aria-expanded') === 'true';
    botao.setAttribute('aria-expanded', String(!aberto));
      document.querySelector('#plano').hidden = aberto;
        botao.textContent = aberto ? 'Ver plano de estudos' : 'Ocultar plano de estudos';
        });

        document.querySelector('#adicionar-habilidade').addEventListener('click', () => {
          const input = document.querySelector('#habilidade');

            if (!input.value.trim()) {
                input.focus();
                    return;
                      }

                        const item = document.createElement('li');
                          item.textContent = input.value.trim();
                            document.querySelector('#habilidades').append(item);

                              quantidade++;
                                document.querySelector('#contagem').textContent = quantidade + ' habilidade(s) adicionada(s).';

                                  input.value = '';
                                    input.focus();
                                    });// Identificação local do projeto; não envia dados.
                                    const aluno = "Heitor de Carvalho Souza";
                                    const filtro = document.querySelector('#filtro');

                                    filtro.addEventListener('input', () => {
                                      const termo = filtro.value.toLocaleLowerCase('pt-BR').trim();
                                        let total = 0;

                                          document.querySelectorAll('#artigos article').forEach(artigo => {
                                              artigo.hidden = !artigo.textContent.toLocaleLowerCase('pt-BR').includes(termo);

                                                  if (!artigo.hidden) total++;
                                                    });

                                                      document.querySelector('#resultado').textContent = total
                                                          ? total + ' artigo(s) encontrado(s).'
                                                              : 'Nenhum artigo encontrado. Tente outro tema.';
                                                              });// Interações extras, locais e sem servidor. textContent evita interpretar HTML digitado.
                                                              const posts = document.querySelector('#posts');

                                                              document.querySelector('#publish').addEventListener('submit', event => {
                                                                event.preventDefault();

                                                                  const input = document.querySelector('#post-text');
                                                                    const text = input.value.trim();

                                                                      if (!text) {
                                                                          input.setCustomValidity('Escreva uma ideia antes de publicar.');
                                                                              input.reportValidity();
                                                                                  return;
                                                                                    }

                                                                                      input.setCustomValidity('');

                                                                                        const article = document.createElement('article');
                                                                                          article.className = 'card post';

                                                                                            article.innerHTML = '<header class="post-header"><div class="avatar">C</div><div><strong>Heitor de Carvalho Souza</strong><span>Agora · publicação local</span></div></header><p class="post-text"></p><div class="post-actions"><button type="button" data-like aria-pressed="false">Curtir <span>0</span></button><button type="button" data-comment>Comentar</button></div><div class="comments" aria-live="polite"></div><form class="comment-form" hidden><label>Seu comentário<input required maxlength="280"></label><button>Adicionar comentário</button></form>';

                                                                                              article.querySelector('.post-text').textContent = text;
                                                                                                posts.prepend(article);

                                                                                                  input.value = '';
                                                                                                    document.querySelector('#status').textContent = 'Publicação adicionada ao feed local.';
                                                                                                    });

                                                                                                    document.querySelector('#post-text').addEventListener('input', event =>
                                                                                                      event.target.setCustomValidity('')
                                                                                                      );

                                                                                                      posts.addEventListener('click', event => {
                                                                                                        const like = event.target.closest('[data-like]');

                                                                                                          if (like) {
                                                                                                              const active = like.getAttribute('aria-pressed') === 'true';
                                                                                                                  like.setAttribute('aria-pressed', String(!active));
                                                                                                                      like.querySelector('span').textContent = active ? '0' : '1';
                                                                                                                        }

                                                                                                                          const comment = event.target.closest('[data-comment]');

                                                                                                                            if (comment) {
                                                                                                                                const form = comment.closest('article').querySelector('form');
                                                                                                                                    form.hidden = !form.hidden;

                                                                                                                                        if (!form.hidden) form.querySelector('input').focus();
                                                                                                                                          }
                                                                                                                                          });

                                                                                                                                          posts.addEventListener('submit', event => {
                                                                                                                                            event.preventDefault();

                                                                                                                                              const form = event.target;
                                                                                                                                                const input = form.querySelector('input');

                                                                                                                                                  if (!input.value.trim()) return;

                                                                                                                                                    const p = document.createElement('p');
                                                                                                                                                      p.textContent = 'Você: ' + input.value.trim();

                                                                                                                                                        form.closest('article').querySelector('.comments').append(p);
                                                                                                                                                          input.value = '';
                                                                                                                                                          });

                                                                                                                                                          // Identificação local do projeto; não envia dados.
                                                                                                                                                          const aluno = "Heitor de Carvalho Souza";// Extensão didática opcional: todas as ações permanecem locais à página.
                                                                                                                                                          const status = document.querySelector('#status');

                                                                                                                                                          document.addEventListener('click', async event => {
                                                                                                                                                            const button = event.target.closest('button');

                                                                                                                                                              if (!button) return;

                                                                                                                                                                const article = button.closest('article');

                                                                                                                                                                  if (button.hasAttribute('data-like')) {
                                                                                                                                                                      const active = button.getAttribute('aria-pressed') === 'true';

                                                                                                                                                                          button.setAttribute('aria-pressed', String(!active));

                                                                                                                                                                              article.querySelector('.likes').textContent =
                                                                                                                                                                                    (Number(button.dataset.count) + (active ? 0 : 1)) + ' curtidas';

                                                                                                                                                                                        button.querySelector('i').className =
                                                                                                                                                                                              active ? 'bx bx-heart' : 'bx bxs-heart';
                                                                                                                                                                                                }

                                                                                                                                                                                                  if (button.hasAttribute('data-save')) {
                                                                                                                                                                                                      const active = button.getAttribute('aria-pressed') === 'true';

                                                                                                                                                                                                          button.setAttribute('aria-pressed', String(!active));

                                                                                                                                                                                                              button.querySelector('i').className =
                                                                                                                                                                                                                    active ? 'bx bx-bookmark' : 'bx bxs-bookmark';

                                                                                                                                                                                                                        status.textContent = active
                                                                                                                                                                                                                              ? 'Publicação removida dos salvos locais.'
                                                                                                                                                                                                                                    : 'Publicação marcada nesta sessão.';
                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                        if (button.hasAttribute('data-comment')) {
                                                                                                                                                                                                                                            const form = article.querySelector('form');

                                                                                                                                                                                                                                                form.hidden = !form.hidden;

                                                                                                                                                                                                                                                    if (!form.hidden) form.querySelector('input').focus();
                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                        if (button.hasAttribute('data-follow')) {
                                                                                                                                                                                                                                                            const active = button.getAttribute('aria-pressed') === 'true';

                                                                                                                                                                                                                                                                button.setAttribute('aria-pressed', String(!active));

                                                                                                                                                                                                                                                                    button.textContent = active ? 'Seguir' : 'Seguindo';
                                                                                                                                                                                                                                                                      }

                                                                                                                                                                                                                                                                        if (button.hasAttribute('data-share')) {
                                                                                                                                                                                                                                                                            try {
                                                                                                                                                                                                                                                                                  await navigator.clipboard.writeText(
                                                                                                                                                                                                                                                                                          article.querySelector('.caption').textContent
                                                                                                                                                                                                                                                                                                );

                                                                                                                                                                                                                                                                                                      status.textContent = 'Texto da publicação copiado.';
                                                                                                                                                                                                                                                                                                          } catch {
                                                                                                                                                                                                                                                                                                                status.textContent =
                                                                                                                                                                                                                                                                                                                        'Seu navegador não permitiu copiar automaticamente. Selecione e copie a legenda.';
                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                              document.querySelectorAll('.comment-form').forEach(form =>
                                                                                                                                                                                                                                                                                                                                form.addEventListener('submit', event => {
                                                                                                                                                                                                                                                                                                                                    event.preventDefault();

                                                                                                                                                                                                                                                                                                                                        const input = form.querySelector('input');

                                                                                                                                                                                                                                                                                                                                            if (!input.value.trim()) return;

                                                                                                                                                                                                                                                                                                                                                const p = document.createElement('p');
                                                                                                                                                                                                                                                                                                                                                    p.textContent = 'Você: ' + input.value.trim();

                                                                                                                                                                                                                                                                                                                                                        form.closest('article').querySelector('.comments').append(p);
                                                                                                                                                                                                                                                                                                                                                            input.value = '';
                                                                                                                                                                                                                                                                                                                                                              })
                                                                                                                                                                                                                                                                                                                                                              );

                                                                                                                                                                                                                                                                                                                                                              document.querySelector('#pesquisa').addEventListener('input', event => {
                                                                                                                                                                                                                                                                                                                                                                const query = event.target.value.toLocaleLowerCase('pt-BR').trim();
                                                                                                                                                                                                                                                                                                                                                                  let found = 0;

                                                                                                                                                                                                                                                                                                                                                                    document.querySelectorAll('#posts article').forEach(article => {
                                                                                                                                                                                                                                                                                                                                                                        article.hidden = !article.textContent.toLocaleLowerCase('pt-BR').includes(query);

                                                                                                                                                                                                                                                                                                                                                                            if (!article.hidden) found++;
                                                                                                                                                                                                                                                                                                                                                                              });

                                                                                                                                                                                                                                                                                                                                                                                document.querySelector('#empty').hidden = found > 0;
                                                                                                                                                                                                                                                                                                                                                                                });

                                                                                                                                                                                                                                                                                                                                                                                // Identificação local do projeto; não envia dados.
                                                                                                                                                                                                                                                                                                                                                                                const aluno = "Heitor de Carvalho Souza";