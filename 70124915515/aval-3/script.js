// 1. Seleciona os elementos que já existem no HTML
const botaoAdicionar = document.getElementById('btn-adicionar');
const container = document.getElementById('container');

botaoAdicionar.addEventListener('click', () => {
  // 2. Cria o elemento na memória (ainda não aparece na tela)
  const novoCard = document.createElement('div');
  novoCard.classList.add('card');
  novoCard.textContent = 'Este é um novo card criado via JS! ';

  // 3. Cria um botão para remover este card específico
  const btnRemover = document.createElement('button');
  btnRemover.textContent = 'Remover';
  btnRemover.addEventListener('click', () => {
    novoCard.remove(); // Remove o card da árvore DOM
  });

  // 4. Anexa o botão dentro do card e o card dentro do contêiner visível
  novoCard.appendChild(btnRemover);
  container.appendChild(novoCard);
});
