const form = document.getElementById('form-entrega');
const resultado = document.getElementById('resultado');

form.addEventListener('submit', function(evento) {
  evento.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const link = document.getElementById('link').value.trim();
  const checkboxes = document.querySelectorAll('.req:checked');

  if (checkboxes.length < 3) {
    alert('Atenção: Marque todos os itens do checklist de revisão antes de gerar o comprovante!');
    return;
  \}

  const dataAtual = new Date().toLocaleString('pt-BR');

  resultado.innerHTML = `
    <strong>✅ Avaliação Pronta para Envio!</strong><br>
    <strong>Aluno:</strong> \${nome\}<br>
    <strong>Link:</strong> <a href="\${link\}" target="_blank" style="color: #34d399;">\${link\}</a><br>
    <strong>Data da validação:</strong> \${dataAtual\}
  `;
$0