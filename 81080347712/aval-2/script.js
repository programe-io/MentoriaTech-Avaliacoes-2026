let contador = 0;
 const caixa = document.getElementById('caixaPrincipal');
  const numero = document.getElementById('numero');
   const cores = [
        '#f0e6ff',
             '#ffd6e0',
                  '#d7fcd4',
                       '#fff3cd',
                            '#caf0f8',
                                 '#ffe5d9'
                                  ];
                                   const frases = [
                                        'Clique abaixo ↓',
                                             'Que legal! ✨',
                                                  'Estou mudando! 🎨',
                                                       'Tudo funciona! 💜',
                                                            'Você é incrível! 🌟',
                                                                 'Muito obrigada! ❤️'
                                                                  ];
                                                                   let indiceCor = 0;
                                                                    let indiceFrase = 0;
                                                                     function mudarCor() {
                                                                          indiceCor = (indiceCor + 1) % cores.length;
                                                                               caixa.style.background = cores[indiceCor];
                                                                                }
                                                                                 function mudarTexto() {
                                                                                      indiceFrase = (indiceFrase + 1) % frases.length;
                                                                                           caixa.textContent = frases[indiceFrase];
                                                                                            }
                                                                                             function contarClique() {
                                                                                                  contador++;
                                                                                                       numero.textContent = contador;
                                                                                                        }
                                                                                                         function reiniciar() {
                                                                                                              contador = 0;
                                                                                                                   numero.textContent = 0;
                                                                                                                        caixa.style.background = cores[0];
                                                                                                                             caixa.textContent = frases[0];
                                                                                                                                  indiceCor = 0;
                                                                                                                                       indiceFrase = 0;