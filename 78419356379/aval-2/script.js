// 1. Alternar Modo Claro / Escuro
const toggleThemeBtn = document.getElementById('toggleTheme');
toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
      toggleThemeBtn.textContent = isDark ? '☀️ Modo Claro' : '🌙 Modo Escuro';
      });

      // 2. Barra de progresso e destaque do Sumário ativo ao rolar
      const sections = document.querySelectorAll('.card');
      const navLinks = document.querySelectorAll('#toc a');
      const progressBar = document.getElementById('progressBar');

      window.addEventListener('scroll', () => {
        // Atualiza barra de progresso
          const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
              const scrollPercent = (scrollTop / docHeight) * 100;
                progressBar.style.width = scrollPercent + '%';

                  // Destaca seção atual no sumário
                    let currentId = '';
                      sections.forEach(section => {
                          const sectionTop = section.offsetTop - 120;
                              if (scrollTop >= sectionTop) {
                                    currentId = section.getAttribute('id');
                                        }
                                          });

                                            navLinks.forEach(link => {
                                                link.classList.remove('active');
                                                    if (link.getAttribute('href') === `#${currentId}`) {
                                                          link.classList.add('active');
                                                              }
                                                                });
                                                                });

                                                                // 3. Copiar código dos blocos de exemplo
                                                                function copyCode(button) {
                                                                  const codeBlock = button.nextElementSibling.innerText;
                                                                    navigator.clipboard.writeText(codeBlock).then(() => {
                                                                        const originalText = button.textContent;
                                                                            button.textContent = 'Copiado!';
                                                                                setTimeout(() => {
                                                                                      button.textContent = originalText;
                                                                                          }, 2000);
                                                                                            });
                                                                                            }

                                                                                            // 4. Lógica do Mini Quiz
                                                                                            function checkAnswer(button, isCorrect) {
                                                                                              const feedback = document.getElementById('quizFeedback');
                                                                                                const allButtons = document.querySelectorAll('.quiz-options button');

                                                                                                  allButtons.forEach(btn => {
                                                                                                      btn.style.opacity = '0.7';
                                                                                                        });
                                                                                                          button.style.opacity = '1';

                                                                                                            if (isCorrect) {
                                                                                                                button.style.borderColor = '#16a34a';
                                                                                                                    button.style.backgroundColor = 'rgba(22, 163, 74, 0.15)';
                                                                                                                        feedback.style.color = '#16a34a';
                                                                                                                            feedback.textContent = '✅ Correto! HTML significa HyperText Markup Language.';
                                                                                                                              } else {
                                                                                                                                  button.style.borderColor = '#dc2626';
                                                                                                                                      button.style.backgroundColor = 'rgba(220, 38, 38, 0.15)';
                                                                                                                                          feedback.style.color = '#dc2626';
                                                                                                                                              feedback.textContent = '❌ Ops! Tente novamente. Lembre-se que HTML estrutura o conteúdo.';
                                                                                                                                                }
                                                                                                                                                }
                                                                                                                                                