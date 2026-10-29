// 1. Seleciona os elementos do HTML usando o DOM
const valorElemento = document.getElementById('valor');
const botaoIncrementar = document.getElementById('btn-somar');
const botaoDecrementar = document.getElementById('btn-subtrair');

// 2. Estado da aplicação (variável que guarda o número atual)
let contador = 0;

// 3. Função que atualiza a interface de usuário (UI)
function atualizarTela() {
  valorElemento.textContent = contador;
  
  // Muda a cor dinamicamente com base no valor
  if (contador > 0) {
    valorElemento.style.color = '#28a745'; // Verde
  } else if (contador < 0) {
    valorElemento.style.color = '#dc3545'; // Vermelho
  } else {
    valorElemento.style.color = '#333333'; // Cinza/Preto
  }
}

// 4. Adiciona os "escutadores de eventos" (Event Listeners) nos botões
botaoIncrementar.addEventListener('click', () => {
  contador++;
  atualizarTela();
});

botaoDecrementar.addEventListener('click', () => {
  contador--;
  atualizarTela();
});
