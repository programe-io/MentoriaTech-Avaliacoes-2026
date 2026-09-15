// Função para validar as respostas do Quiz no site
let acertos = 0;
let respondidas = 0;

function checarResposta(botao, ehCorreta) {
  const containerPergunta = botao.parentElement;
  const botoes = containerPergunta.querySelectorAll('.quiz-btn');
  const feedback = document.getElementById('quizResult');

  // Desabilita os botões dessa pergunta após o clique
  botoes.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = 'default';
  });

  // Pinta o botão selecionado de acordo com a resposta
  if (ehCorreta) {
    botao.style.backgroundColor = '#dcfce7';
    botao.style.borderColor = '#16a34a';
    botao.style.color = '#15803d';
    acertos++;
  } else {
    botao.style.backgroundColor = '#ffe4e6';
    botao.style.borderColor = '#e11d48';
    botao.style.color = '#be123c';
  }

  respondidas++;

  // Mostra o resultado final após responder as 2 perguntas
  if (respondidas === 2) {
    feedback.style.display = 'block';
    if (acertos === 2) {
      feedback.style.backgroundColor = '#dcfce7';
      feedback.style.color = '#15803d';
      feedback.textContent = 'Excelente! Você acertou todas as perguntas e compreende os pilares da prevenção consciente.';
    } else {
      feedback.style.backgroundColor = '#fef3c7';
      feedback.style.color = '#b45309';
      feedback.textContent = 'Você concluiu o quiz. Lembre-se: informação clara e preservativo sempre são os melhores caminhos!';
    }
  }
}