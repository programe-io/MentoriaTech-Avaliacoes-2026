// Seleciona os elementos do HTML
const contadorTexto = document.getElementById('contador');
const btnDiminuir = document.getElementById('diminuir');
const btnResetar = document.getElementById('resetar');
const btnAumentar = document.getElementById('aumentar');

// Variável que guarda o valor do contador
let valor = 0;

// Função para atualizar o número na tela
function atualizarTela() {
  contadorTexto.textContent = valor;
  }

  // Eventos de clique nos botões
  btnAumentar.addEventListener('click', () => {
    valor++;
      atualizarTela();
      });

      btnDiminuir.addEventListener('click', () => {
        valor--;
          atualizarTela();
          });

          btnResetar.addEventListener('click', () => {
            valor = 0;
              atualizarTela();
              });
              
        
}