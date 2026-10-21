const dateLabel = document.getElementById('todayDate');
if (dateLabel) {
  dateLabel.textContent = new Intl.DateTimeFormat('pt-BR', {
      weekday: 'long',
          day: 'numeric',
              month: 'long'
                }).format(new Date()).toLocaleUpperCase('pt-BR');
                }

                document.querySelectorAll('.like').forEach((button) => {
                  button.addEventListener('click', () => {
                      const liked = button.classList.toggle('is-liked');
                          button.firstChild.textContent = liked ? '♥ ' : '♡ ';

                              const label = button.querySelector('span');
                                  const count = Number(label.dataset.count || label.textContent.match(/\d+/)?.[0] || 0);
                                      const nextCount = count + (liked ? 1 : -1);
                                          label.dataset.count = nextCount;
                                              label.textContent = `${nextCount} curtidas`;
                                                });
                                                });
                                                