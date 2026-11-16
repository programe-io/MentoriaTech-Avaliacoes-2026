const htmlInput = document.getElementById("code-html");
const cssInput = document.getElementById("code-css");
const jsInput = document.getElementById("code-js");
const previewFrame = document.getElementById("preview-frame");

function atualizarPreview() {
  const html = htmlInput.value;
  const css = `<style>\${cssInput.value\}</style>`;
  const js = `<script>\${jsInput.value\}<\\/script>`;

  const documento = previewFrame.contentDocument || previewFrame.contentWindow.document;
  documento.open();
  documento.write(html + css + js);
  documento.close();
\}

htmlInput.addEventListener("input", atualizarPreview);
cssInput.addEventListener("input", atualizarPreview);
jsInput.addEventListener("input", atualizarPreview);

function alternarMaximizar(boxId, botao) {
  const box = document.getElementById(boxId);
  box.classList.toggle("maximizado");

  if (box.classList.contains("maximizado")) {
    botao.textContent = "Minimizar";
  \} else {
    botao.textContent = "Maximizar";
  \}
\}

function publicarCodigo() {
  if (!htmlInput.value.trim() && !cssInput.value.trim() && !jsInput.value.trim()) {
    alert("Escreva algum código antes de publicar.");$0