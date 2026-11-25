// Aguarda todo o conteúdo HTML carregar antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
  // Seleciona os elementos da página
    const botao = document.querySelector('button');
      const tituloPrincipal = document.querySelector('header h1');
        const subtitulo = document.querySelector('main h2');
          const paragrafo = document.querySelector('main p');

            // Variável para contar quantas vezes o botão foi clicado
              let contadorCliques = 0;

                // Adiciona o evento de clique ao botão
                  botao.addEventListener('click', () => {
                      contadorCliques++;

                          // Altera o texto do botão e do subtítulo dinamicamente
                              botao.textContent = `Clicado ${contadorCliques}x`;
                                  subtitulo.textContent = 'JavaScript Ativado!';
                                      paragrafo.textContent = `Você já interagiu com esta página ${contadorCliques} vez(es).`;

                                          // Alterna uma cor de destaque no título a cada clique
                                              if (contadorCliques % 2 === 1) {
                                                    tituloPrincipal.style.color = '#28a745'; // Verde
                                                        } else {
                                                              tituloPrincipal.style.color = '#007bff'; // Azul original
                                                                  }
                                                                    });
                                                                    });