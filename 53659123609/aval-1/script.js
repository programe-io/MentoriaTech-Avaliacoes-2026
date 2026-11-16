const htmlInput = document.getElementById('code-html');
const cssInput = document.getElementById('code-css');
const jsInput = document.getElementById('code-js');
const previewFrame = document.getElementById('preview-frame');

// Atualiza a pré-visualização em tempo real
function atualizarPreview() {
  const html = htmlInput.value;
  const css = `<style>\${cssInput.value\}</style>`;
  const js = `<script>\${jsInput.value\}<\\/script>`;

  const documento = previewFrame.contentDocument || previewFrame.contentWindow.document;
  documento.open();
  documento.write(html + css + js);
  documento.close();
\}

// Escuta qualquer digitação nos três campos
htmlInput.addEventListener('input', atualizarPreview);
cssInput.addEventListener('input', atualizarPreview);
jsInput.addEventListener('input', atualizarPreview);

// Função para os botões "Maximizar" / "Restaurar"
function alternarMaximizar(boxId, botao) {
  const box = document.getElementById(boxId);
  box.classList.toggle('maximizado');

  if (box.classList.contains('maximizado')) {
    botao.textContent = 'Restaurar';
  \} else {
    botao.textContent = 'Maximizar';
  \}
\}

// Simula o envio do projeto
function publicarProjeto() {
  if (!htmlInput.value.trim()) {
    alert('Por favor, escreva algum código HTML antes de publicar.');
    return;
  \}
  alert('Avaliação publicada com sucesso! Seu link está pronto para ser enviado ao professor.');
\}

// Carrega o código inici$0