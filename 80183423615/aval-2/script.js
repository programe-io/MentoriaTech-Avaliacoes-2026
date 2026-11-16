const form = document.getElementById('form-entrega');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const aluno = document.getElementById('aluno').value.trim();
  const atividade = document.getElementById('atividade').value;
  const link = document.getElementById('link-repositorio').value.trim();
  const observacoes = document.getElementById('observacoes').value.trim();
  const dataHora = new Date().toLocaleString('pt-BR');

  resultado.innerHTML = `
    <strong>Entrega confirmada com sucesso!</strong><br><br>
    <b>Aluno:</b> \${aluno\}<br>
    <b>Avaliação:</b> \${atividade\}<br>
    <b>Link enviado:</b> \${link\}<br>
    <b>Observações:</b> \${observacoes || 'Nenhuma observação informada.'\}<br>
    <b>Data de envio:</b> \${dataHora\}
  `;

  resultado.classList.remove('oculto');
  form.reset();
\});$0