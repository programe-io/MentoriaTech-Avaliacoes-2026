const btnCalcular = document.getElementById('btnCalcular');
const resultadoBox = document.getElementById('resultado');

btnCalcular.addEventListener('click', function () {
  const n1 = parseFloat(document.getElementById('nota1').value);
  const n2 = parseFloat(document.getElementById('nota2').value);

  if (isNaN(n1) || isNaN(n2) || n1 < 0 || n1 > 10 || n2 < 0 || n2 > 10) {
    alert('Por favor, insira duas notas válidas entre 0 e 10.');
    return;
  \}

  const media = (n1 + n2) / 2;
  resultadoBox.classList.remove('oculto', 'aprovado', 'reprovado');

  if (media >= 7) {
    resultadoBox.classList.add('aprovado');
    resultadoBox.textContent = `Média: \${media.toFixed(1)\} — Parabéns, você foi Aprovado!`;
  \} else {
    resultadoBox.classList.add('reprovado');
    resultadoBox.textContent = `Média: \${media.toFixed(1)\} — Você ficou em Recuperação.`;
  \}
\});
$0