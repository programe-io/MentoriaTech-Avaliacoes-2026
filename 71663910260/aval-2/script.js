document.addEventListener('DOMContentLoaded', () => {
  const itens = document.querySelectorAll('.lista-cronograma li');

  // Carrega o progresso salvo anteriormente
  itens.forEach((item, index) => {
    const concluido = localStorage.getItem(`topico-${index}`) === 'true';
    if (concluido) {
      item.classList.add('concluido');
    }

    // Adiciona o evento de clique para marcar/desmarcar
    item.addEventListener('click', () => {
      const foiConcluido = item.classList.toggle('concluido');
      // Salva o estado atual no localStorage
      localStorage.setItem(`topico-${index}`, foiConcluido);
    });
  });
});
