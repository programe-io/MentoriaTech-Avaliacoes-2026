const searchInput = document.getElementById('championSearch');
const championCards = [...document.querySelectorAll('.champion-card')];
const noResults = document.getElementById('noResults');

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR');
    let visibleCount = 0;

      championCards.forEach((card) => {
          const matches = card.textContent.toLocaleLowerCase('pt-BR').includes(query);
              card.hidden = !matches;
                  if (matches) visibleCount++;
                    });

                      noResults.hidden = visibleCount !== 0;
                      });
                      