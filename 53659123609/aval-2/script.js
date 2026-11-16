const htmlInput = document.getElementById('code-html');
const cssInput = document.getElementById('code-css');
const jsInput = document.getElementById('code-js');
const previewFrame = document.getElementById('preview-frame');

function atualizarPreview() {
  const html = htmlInput.value;
  const css = `<style>\${cssInput.value\}</style>`;
  const js = `<script>\${jsInput.value\}<\\/script>`;

  const documento = previewFrame.contentDocument || previewFrame.contentWindow.document;
  documento.open();
  documento.write(html + css + js);
  documento.close();
\}

// Atualiza em tempo real conforme o aluno digita
htmlInput.addEventListener('input', atualizarPreview);
cssInput.addEventListener('input', atualizarPreview);
jsInput.addEventListener('input', atualizarPreview);

// Função para maximizar ou restaurar cada editor
function alternarMaximizar(boxId, botao) {
  const box = document.getElementById(boxId);
  box.classList.toggle('maximizado');
  
  if (box.classList.contains('maximizado')) {
    botao.textContent = 'Restaurar';
  \} else {
    botao.textContent = 'Maximizar';
  \}
\}

// Ações dos botões de navegação e entrega
document.getElementById('btn-publicar').addEventListener('click', () => {
  if (!htmlInput.value.trim()) {
    alert('Por favor, insira algum código HTML antes de publicar sua avaliação!');
    return;
  \}
  alert('Código publicado com sucesso! Link gerado e pronto para enviar ao professor.');
\});

document.getElementById('btn-voltar').addEventListener('click', () => {
  alert('Voltando para a página inicial da plataforma...');
\});

// Carrega o exemplo inicial na pré-visualização assim que abrir
atualizarPreview();$0