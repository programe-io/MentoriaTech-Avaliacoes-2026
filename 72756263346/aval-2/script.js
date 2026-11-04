
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

// Atualizar o ano automaticamente
document.querySelector('#year').textContent =
  new Date().getFullYear();

  // Alternar tema e guardar preferência
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

                        // Menu mobile
                        menuToggle.addEventListener('click', () => {
                          const isOpen = nav.classList.toggle('open');

                            menuToggle.setAttribute('aria-expanded', String(isOpen));
                            });

                            nav.querySelectorAll('a').forEach(link => {
                              link.addEventListener('click', () => {
                                  nav.classList.remove('open');
                                      menuToggle.setAttribute('aria-expanded', 'false');
                                        });
                                        });

                                        // Busca e filtros
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

                                                                                                  searchInput.addEventListener('input', filterArticles);

                                                                                                  filters.forEach(button => {
                                                                                                    button.addEventListener('click', () => {
                                                                                                        filters.forEach(item => item.classList.remove('active'));

                                                                                                            button.classList.add('active');

                                                                                                                activeCategory = button.dataset.category;

                                                                                                                    filterArticles();
                                                                                                                      });
                                                                                                                      });

                                                                                                                      // Modal de leitura
                                                                                                                      document.querySelectorAll('.read-more').forEach(link => {
                                                                                                                        link.addEventListener('click', event => {
                                                                                                                            event.preventDefault();

                                                                                                                                dialogTitle.textContent = link.dataset.title;

                                                                                                                                    dialog.showModal();
                                                                                                                                      });
                                                                                                                                      });

                                                                                                                                      dialogClose.addEventListener('click', () => {
                                                                                                                                        dialog.close();
                                                                                                                                        });

                                                                                                                                        dialog.addEventListener('click', event => {
                                                                                                                                          if (event.target === dialog) {
                                                                                                                                              dialog.close();
                                                                                                                                                }
                                                                                                                                                });

                                                                                                                                                // Formulário demonstrativo
                                                                                                                                                newsletterForm.addEventListener('submit', event => {
                                                                                                                                                  event.preventDefault();

                                                                                                                                                    const email = document.querySelector('#email').value.trim();

                                                                                                                                                      if (!email) return;

                                                                                                                                                        formMessage.textContent =
                                                                                                                                                            'Inscrição de demonstração concluída! Para receber e-mails de verdade, conecte um serviço de newsletter.';

                                                                                                                                                              newsletterForm.reset();
                                                                                                                                                              });
                                                                                                                                                              i