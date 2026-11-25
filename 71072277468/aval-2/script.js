document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('avaliacaoForm');

  // Cria dinamicamente uma área para exibir o resumo e o histórico
  const resultadoBox = document.createElement('div');
  resultadoBox.id = 'resultado';
  resultadoBox.style.display = 'none';
  resultadoBox.style.marginTop = '24px';
  resultadoBox.style.padding = '16px';
  resultadoBox.style.borderRadius = '8px';
  resultadoBox.style.backgroundColor = '#eef2ff';
  resultadoBox.style.border = '1px solid #c7d2fe';
  resultadoBox.style.fontSize = '0.9rem';
  resultadoBox.style.lineHeight = '1.5';
  form.insertAdjacentElement('afterend', resultadoBox);

  // Mapa para exibir o texto completo do foco escolhido
  const nomesFoco = {
    codigo: 'Revisão de Código / Arquitetura',
    carreira: 'Plano de Carreira / Transição',
    entrevista: 'Preparação para Entrevistas',
    projeto: 'Destravamento de Projeto'
  };

  form.addEventListener('submit', (evento) => {
    evento.preventDefault();

    const mentor = document.getElementById('mentor').value.trim();
    const foco = document.getElementById('foco').value;
    const notaSelecionada = document.querySelector('input[name="nota"]:checked');
    const feedback = document.getElementById('feedback').value.trim();

    // Validação extra
    if (!mentor || !foco || !notaSelecionada) {
      alert('Por favor, preencha o mentor, o foco e a nota de satisfação.');
      return;
    }

    const avaliacao = {
      mentor,
      foco: nomesFoco[foco] || foco,
      nota: Number(notaSelecionada.value),
      feedback: feedback || 'Sem comentários adicionais.',
      data: new Date().toLocaleDateString('pt-BR')
    };

    // Salva no localStorage do navegador
    const historico = JSON.parse(localStorage.getItem('avaliacoesMentoria')) || [];
    historico.push(avaliacao);
    localStorage.setItem('avaliacoesMentoria', JSON.stringify(historico));

    // Exibe a confirmação na tela
    exibirConfirmacao(avaliacao, historico.length);

    // Limpa o formulário para uma nova avaliação
    form.reset();
  });

  function exibirConfirmacao(dados, totalSalvo) {
    resultadoBox.style.display = 'block';
    resultadoBox.innerHTML = `
      <strong style="color: #4338ca; font-size: 1rem;">✔ Avaliação enviada com sucesso!</strong>
      <p style="margin-top: 8px;"><strong>Mentor(a):</strong> ${dados.mentor}</p>
      <p><strong>Foco:</strong> ${dados.foco}</p>
      <p><strong>Satisfação:</strong> ${dados.nota} / 5</p>
      <p><strong>Comentário:</strong> ${dados.feedback}</p>
      <hr style="margin: 12px 0; border: none; border-top: 1px solid #c7d2fe;">
      <small style="color: #475569;">Total de avaliações salvas neste navegador: <strong>${totalSalvo}</strong></small>
    `;
  }
});
