/* ==========================================================================
   TUTORIAL DE RECEITA - SCRIPT JS
      ========================================================================== */

      // Aguarda o carregamento completo do HTML antes de executar o código
      document.addEventListener('DOMContentLoaded', () => {

        /* ------------------------------------------------------------------------
             1. MULTIPLICADOR DE PORÇÕES
                  ------------------------------------------------------------------------ */
                    // Estado inicial
                      let servings = 1;

                        // Seleção dos elementos do DOM
                          const servingsDisplay = document.getElementById('servings-count');
                            const btnPlus = document.getElementById('btn-plus');
                              const btnMinus = document.getElementById('btn-minus');
                                const quantities = document.querySelectorAll('.qty');

                                  /**
                                     * Atualiza os números dos ingredientes com base nas porções
                                        * @param {number} newServings - O novo número de porções selecionado
                                           */
                                             function updateQuantities(newServings) {
                                                 quantities.forEach(qty => {
                                                       // Pega o valor base original armazenado no atributo HTML data-base
                                                             const baseValue = parseFloat(qty.getAttribute('data-base'));
                                                                   
                                                                         // Calcula o novo valor
                                                                               const calculatedValue = baseValue * newServings;

                                                                                     // Exibe o número formatado (removendo decimais desnecessários)
                                                                                           qty.textContent = Number.isInteger(calculatedValue) 
                                                                                                   ? calculatedValue 
                                                                                                           : calculatedValue.toFixed(1);
                                                                                                               });
                                                                                                                 }

                                                                                                                   // Evento para aumentar porções
                                                                                                                     btnPlus.addEventListener('click', () => {
                                                                                                                         servings++;
                                                                                                                             servingsDisplay.textContent = servings;
                                                                                                                                 updateQuantities(servings);
                                                                                                                                   });

                                                                                                                                     // Evento para diminuir porções (com limite mínimo de 1)
                                                                                                                                       btnMinus.addEventListener('click', () => {
                                                                                                                                           if (servings > 1) {
                                                                                                                                                 servings--;
                                                                                                                                                       servingsDisplay.textContent = servings;
                                                                                                                                                             updateQuantities(servings);
                                                                                                                                                                 }
                                                                                                                                                                   });


                                                                                                                                                                     /* ------------------------------------------------------------------------
                                                                                                                                                                          2. CHECKLIST DE INGREDIENTES E BARRA DE PROGRESSO
                                                                                                                                                                               ------------------------------------------------------------------------ */
                                                                                                                                                                                 // Seleção dos elementos
                                                                                                                                                                                   const checkboxes = document.querySelectorAll('.ingredient-check');
                                                                                                                                                                                     const progressBar = document.getElementById('progress-bar');
                                                                                                                                                                                       const progressText = document.getElementById('progress-text');

                                                                                                                                                                                         /**
                                                                                                                                                                                            * Recalcula a percentagem de ingredientes marcados e atualiza a interface
                                                                                                                                                                                               */
                                                                                                                                                                                                 function updateProgress() {
                                                                                                                                                                                                     const total = checkboxes.length;
                                                                                                                                                                                                         let checkedCount = 0;

                                                                                                                                                                                                             checkboxes.forEach(box => {
                                                                                                                                                                                                                   // Encontra a linha (li) pai do checkbox
                                                                                                                                                                                                                         const li = box.closest('li');

                                                                                                                                                                                                                               if (box.checked) {
                                                                                                                                                                                                                                       checkedCount++;
                                                                                                                                                                                                                                               li.classList.add('done'); // Adiciona classe CSS para riscar o texto
                                                                                                                                                                                                                                                     } else {
                                                                                                                                                                                                                                                             li.classList.remove('done'); // Remove a classe se for desmarcado
                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                       });

                                                                                                                                                                                                                                                                           // Cálculo da percentagem
                                                                                                                                                                                                                                                                               const percentage = total > 0 ? Math.round((checkedCount / total) * 100) : 0;

                                                                                                                                                                                                                                                                                   // Atualização visual da barra e do texto
                                                                                                                                                                                                                                                                                       progressBar.style.width = `${percentage}%`;
                                                                                                                                                                                                                                                                                           
                                                                                                                                                                                                                                                                                               if (percentage === 100) {
                                                                                                                                                                                                                                                                                                     progressText.textContent = '🎉 Todos os ingredientes prontos!';
                                                                                                                                                                                                                                                                                                         } else {
                                                                                                                                                                                                                                                                                                               progressText.textContent = `${percentage}% dos ingredientes reunidos`;
                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                     }

                                                                                                                                                                                                                                                                                                                       // Adiciona o ouvinte de evento 'change' em cada caixa de seleção
                                                                                                                                                                                                                                                                                                                         checkboxes.forEach(box => {
                                                                                                                                                                                                                                                                                                                             box.addEventListener('change', updateProgress);
                                                                                                                                                                                                                                                                                                                               });

                                                                                                                                                                                                                                                                                                                                 // Torna a linha inteira (<li>) clicável para marcar o checkbox
                                                                                                                                                                                                                                                                                                                                   const ingredientItems = document.querySelectorAll('.ingredients-list li');
                                                                                                                                                                                                                                                                                                                                     ingredientItems.forEach(item => {
                                                                                                                                                                                                                                                                                                                                         item.addEventListener('click', (event) => {
                                                                                                                                                                                                                                                                                                                                               // Evita o clique duplo se o utilizador clicar diretamente no checkbox
                                                                                                                                                                                                                                                                                                                                                     if (event.target.tagName !== 'INPUT') {
                                                                                                                                                                                                                                                                                                                                                             const checkbox = item.querySelector('.ingredient-check');
                                                                                                                                                                                                                                                                                                                                                                     checkbox.checked = !checkbox.checked;
                                                                                                                                                                                                                                                                                                                                                                             updateProgress(); // Dispara a atualização do progresso manualmente
                                                                                                                                                                                                                                                                                                                                                                                   }
                                                                                                                                                                                                                                                                                                                                                                                       });
                                                                                                                                                                                                                                                                                                                                                                                         });

                                                                                                                                                                                                                                                                                                                                                                                         });