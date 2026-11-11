const inputHtml = document.getElementById("codigo-html");
const inputCss = document.getElementById("codigo-css");
const inputJs = document.getElementById("codigo-js");
const telaPreview = document.getElementById("tela-preview");
const btnPublicar = document.getElementById("btn-publicar");
const mensagemStatus = document.getElementById("mensagem-status");

function atualizarPreview() {
  const html = inputHtml.value;
  const css = `<style>\${inputCss.value\}</style>`;
  const js = `<script>\${inputJs.value\}<\\/script>`;

  const documento = telaPreview.contentDocument || telaPreview.contentWindow.document;
  documento.open();
  documento.write(html + css + js);
  documento.close();
\}

inputHtml.addEventListener("input", atualizarPreview);
inputCss.addEventListener("input", atualizarPreview);
inputJs.addEventListener("input", atualizarPreview);

btnPublicar.addEventListener("click", () => {
  if (inputHtml.value.trim() === "") {
    mensagemStatus.style.color = "#ef4444";
    mensagemStatus.textContent = "Erro: Escreva algum código HTML antes de publicar.";
    return;
  \}

  mensagemStatus.style.color = "#10b981";
  mensagemStatus.textContent = "Avaliação publicada com sucesso para o professor!";
\});
$0