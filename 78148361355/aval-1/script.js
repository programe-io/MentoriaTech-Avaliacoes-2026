function abrirLink() {
      window.open('https://www.google.com', '_blank');
      }

      document.addEventListener('DOMContentLoaded', function () {
        const botao = document.createElement('button');
          botao.textContent = 'Abrir Google';
            botao.onclick = abrirLink;

              botao.style.padding = '12px 24px';
                botao.style.fontSize = '16px';
                  botao.style.cursor = 'pointer';
                    botao.style.borderRadius = '8px';
                      botao.style.border = 'none';

                        document.body.appendChild(botao);
                        });
}