const inputHtml = document.getElementById('code-html');
const inputCss = document.getElementById('code-css');
const inputJs = document.getElementById('code-js');
const frame = document.getElementById('preview-frame');

// Atualiza a pré-visualização automaticamente ao digitar
function atualizarPreview() {
  const html = inputHtml.value;
  const css = `<style>\${inputCss.value\}</style>`;
  const js = `<script>\${inputJs.value\}<\\/script>`;

  const documento = frame.contentDocument || frame.contentWindow.document;
  documento.open();
  documento.write(html + css + js);
  documento.close();
\}

// Alterna o modo tela cheia dos editores
function alternarMaximizar(idBox) {
  const box = document.getElementById(idBox);
  const botao = box.querySelector('.btn-max');
  
  box.classList.toggle('maximizado');
  
  if (box.classList.contains('maximizado')) {
    botao.textContent = 'Minimizar';
  \} else {
    botao.textContent = 'Maximizar';
  \}
\}

// Simula o envio do trabalho
function enviarAvaliacao() {
  if (!inputHtml.value.trim()) {
    alert('Por favor, escreva algum código HTML antes de publicar!');
    return;
  \}
  alert('Avaliação publicada com sucesso! Seu código foi enviado para correção.');
\}

// Eventos para atualização em tempo real
inputHtml.addEventListener('input', atualizarPreview);
inputCss.addEventListener('input', atualizarPreview);
inputJs.addEventListener('input', atualizarPreview);

// Carrega o exemplo inicial ao abrir
atualizarPreview();
$0