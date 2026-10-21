const filterButtons = document.querySelectorAll('.filter-button');
const articleCards = document.querySelectorAll('.article-card');
const searchInput = document.getElementById('searchInput');
const emptyMessage = document.getElementById('emptyMessage');
let selectedCategory = 'Todas';

function updateArticles() {
  const searchTerm = searchInput.value.trim().toLocaleLowerCase('pt-BR');
    let visibleCount = 0;

      articleCards.forEach((card) => {
          const matchesCategory = selectedCategory === 'Todas' || card.dataset.category === selectedCategory;
              const matchesSearch = card.dataset.title.toLocaleLowerCase('pt-BR').includes(searchTerm);
                  const isVisible = matchesCategory && matchesSearch;
                      card.hidden = !isVisible;
                          if (isVisible) visibleCount += 1;
                            });

                              emptyMessage.hidden = visibleCount > 0;
                              }

                              filterButtons.forEach((button) => {
                                button.addEventListener('click', () => {
                                    selectedCategory = button.dataset.category;
                                        filterButtons.forEach((filter) => {
                                              const isActive = filter === button;
                                                    filter.classList.toggle('active', isActive);
                                                          filter.setAttribute('aria-pressed', String(isActive));
                                                              });
                                                                  updateArticles();
                                                                    });
                                                                    });

                                                                    searchInput.addEventListener('input', updateArticles);
                                                                    document.getElementById('year').textContent = new Date().getFullYear();

                                                                    document.getElementById('newsletterForm').addEventListener('submit', (event) => {
                                                                      event.preventDefault();
                                                                        const emailInput = document.getElementById('emailInput');
                                                                          document.getElementById('formMessage').textContent = `Obrigado! Seu e-mail ${emailInput.value} foi registrado.`;
                                                                            emailInput.value = '';
                                                                            });
                                                                            