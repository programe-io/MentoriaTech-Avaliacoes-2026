const estrelas = document.querySelectorAll('.estrela');
const btnEnviar = document.getElementById('btnEnviar');
const campoComentario = document.getElementById('comentario');
let notaSelecionada = 0;

// Lógica para selecionar as estrelas
estrelas.forEach(estrela => {
  estrela.addEventListener('click', () => {
    notaSelecionada = estrela.getAttribute('data-valor');
    
    // Atualiza o visual das estrelas
    estrelas.forEach(e => {
      if (e.getAttribute('data-valor') <= notaSelecionada) {
        e.classList.add('ativa');
      } else {
        e.classList.remove('ativa');
      }
    });
  });
});

// Lógica de envio ao clicar no botão
btnEnviar.addEventListener('click', () => {
  if (notaSelecionada === 0) {
    alert('Por favor, selecione pelo menos uma estrela antes de enviar!');
    return;
  }

  const comentario = campoComentario.value;

  // Exibe o resultado na tela (simulação de envio)
  alert(`Avaliação enviada com sucesso!\nNota: ${notaSelecionada} estrelas\nComentário: ${comentario || "Nenhum"}`);

  // Limpa o formulário após enviar
  notaSelecionada = 0;
  campoComentario.value = '';
  estrelas.forEach(e => e.classList.remove('ativa'));
});