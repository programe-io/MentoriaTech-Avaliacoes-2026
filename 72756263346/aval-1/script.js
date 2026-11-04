
const themeToggle = document.querySelector('#themeToggle');
const menuToggle = document.querySelector('#menuToggle');
const nav = document.querySelector('#nav');
const searchInput = document.querySelector('#searchInput');
const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.article-card');
const emptyState = document.querySelector('#emptyState');
const newsletterForm = document.querySelector('#newsletterForm');
const formMessage = document.querySelector('#formMessage');
const dialog = document.querySelector('#articleDialog');
const dialogTitle = document.querySelector('#dialogTitle');
const dialogClose = document.querySelector('#dialogClose');

// Ano automático no rodapé
document.querySelector('#year').textContent = new Date().getFullYear();

// TEMA ESCURO
const savedTheme = localStorage.getItem('nexttech-theme');

if (savedTheme === 'dark') {
  document.body.classList.add('dark');
  }

  themeToggle.textContent =
    document.body.classList.contains('dark') ? '☀' : '☾';

    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');

          themeToggle.textContent = isDark ? '☀' : '☾';

            localStorage.setItem(
                'nexttech-theme',
                    isDark ? 'dark' : 'light'
                      );
                      });

                      // MENU PARA CELULAR
                      menuToggle.addEventListener('click', () => {
                        const isOpen = nav.classList.toggle('open');

                          menuToggle.setAttribute(
                              'aria-expanded',
                                  String(isOpen)
                                    );
                                    });

                                    // Fechar menu ao clicar em um link
                                    nav.querySelectorAll('a').forEach(link => {
                                      link.addEventListener('click', () => {
                                          nav.classList.remove('open');

                                              menuToggle.setAttribute(
                                                    'aria-expanded',
                                                          'false'
                                                              );
                                                                });
                                                                });

                                                                // PESQUISA E FILTROS
                                                                let activeCategory = 'Todos';

                                                                function filterArticles() {
                                                                  const query = searchInput.value.trim().toLowerCase();

                                                                    let visibleCount = 0;

                                                                      cards.forEach(card => {
                                                                          const matchesCategory =
                                                                                activeCategory === 'Todos' ||
                                                                                      card.dataset.category === activeCategory;

                                                                                          const matchesQuery =
                                                                                                card.textContent.toLowerCase().includes(query);

                                                                                                    const visible = matchesCategory && matchesQuery;

                                                                                                        card.hidden = !visible;

                                                                                                            if (visible) {
                                                                                                                  visibleCount++;
                                                                                                                      }
                                                                                                                        });

                                                                                                                          emptyState.hidden = visibleCount > 0;
                                                                                                                          }

                                                                                                                          // Pesquisa em tempo real
                                                                                                                          searchInput.addEventListener('input', filterArticles);

                                                                                                                          // Filtros por categoria
                                                                                                                          filters.forEach(button => {
                                                                                                                            button.addEventListener('click', () => {

                                                                                                                                filters.forEach(item => {
                                                                                                                                      item.classList.remove('active');
                                                                                                                                          });

                                                                                                                                              button.classList.add('active');

                                                                                                                                                  activeCategory = button.dataset.category;

                                                                                                                                                      filterArticles();
                                                                                                                                                        });
                                                                                                                                                        });

                                                                                                                                                        // JANELA DE LEITURA DOS ARTIGOS
                                                                                                                                                        document.querySelectorAll('.read-more').forEach(link => {

                                                                                                                                                          link.addEventListener('click', event => {

                                                                                                                                                              event.preventDefault();

                                                                                                                                                                  dialogTitle.textContent = link.dataset.title;

                                                                                                                                                                      dialog.showModal();

                                                                                                                                                                        });

                                                                                                                                                                        });

                                                                                                                                                                        // Fechar janela
                                                                                                                                                                        dialogClose.addEventListener('click', () => {
                                                                                                                                                                          dialog.close();
                                                                                                                                                                          });

                                                                                                                                                                          // Fechar ao clicar fora da janela
                                                                                                                                                                          dialog.addEventListener('click', event => {

                                                                                                                                                                            if (event.target === dialog) {
                                                                                                                                                                                dialog.close();
                                                                                                                                                                                  }

                                                                                                                                                                                  });

                                                                                                                                                                                  // FORMULÁRIO DE NEWSLETTER
                                                                                                                                                                                  // Demonstração: não envia dados para um servidor

                                                                                                                                                                                  newsletterForm.addEventListener('submit', event => {

                                                                                                                                                                                    event.preventDefault();

                                                                                                                                                                                      const email = document
                                                                                                                                                                                          .querySelector('#email')
                                                                                                                                                                                              .value
                                                                                                                                                                                                  .trim();

                                                                                                                                                                                                    if (!email) return;

                                                                                                                                                                                                      formMessage.textContent =
                                                                                                                                                                                                          'Inscrição de demonstração concluída! ' +
                                                                                                                                                                                                              'Para receber e-mails de verdade, ' +
                                                                                                                                                                                                                  'conecte um serviço de newsletter.';

                                                                                                                                                                                                                    newsletterForm.reset();

                                                                                                                                                                                                                    });
                                                                                                                                                                                                                    