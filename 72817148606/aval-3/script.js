
const campoHTML = document.getElementById("html");
const campoCSS = document.getElementById("css");
const campoJS = document.getElementById("js");

const preview = document.getElementById("preview");
const status = document.getElementById("status");

let temporizador;
let ultimaExecucao = 0;

// Carregar códigos salvos
function carregar() {
  campoHTML.value = localStorage.getItem("autoHTML") || "";
  campoCSS.value = localStorage.getItem("autoCSS") || "";
  campoJS.value = localStorage.getItem("autoJS") || "";

  executar();
}

// Salvar códigos automaticamente
function salvar() {
  localStorage.setItem("autoHTML", campoHTML.value);
  localStorage.setItem("autoCSS", campoCSS.value);
  localStorage.setItem("autoJS", campoJS.value);
}

// Executar os códigos
function executar() {
  const html = campoHTML.value;
  const css = campoCSS.value;
  const js = campoJS.value;

  salvar();

  const codigo = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <style>${css.replace(/<\/style/gi, "<\\/style")}</style>
    </head>
    <body>

      ${html}

      <script>
        window.onerror = function(message) {
          document.getElementById("erro-preview").textContent =
            "Erro: " + message;
        };

        try {
          ${js.replace(/<\/script/gi, "<\\/script")}
        } catch (erro) {
          document.getElementById("erro-preview").textContent =
            erro.message;
        }
      <\/script>

      <div id="erro-preview" style="
        color:red;
        font-family:Arial;
        padding:8px;
      "></div>

    </body>
    </html>
  `;

  preview.srcdoc = codigo;

  status.textContent = "● Código executado";
}

// Executar automaticamente enquanto digita
function programarExecucao() {
  status.textContent = "● Atualizando...";

  clearTimeout(temporizador);

  temporizador = setTimeout(() => {
    executar();
  }, 400);
}

[campoHTML, campoCSS, campoJS].forEach(campo => {
  campo.addEventListener("input", programarExecucao);
  campo.addEventListener("paste", programarExecucao);
});

// Limpar códigos
document.getElementById("limpar").addEventListener("click", () => {
  if (!confirm("Deseja apagar todos os códigos?")) return;

  campoHTML.value = "";
  campoCSS.value = "";
  campoJS.value = "";

  salvar();
  executar();
});

// Copiar códigos
document.getElementById("copiar").addEventListener("click", async () => {
  const codigo =
    "HTML:\n" + campoHTML.value +
    "\n\nCSS:\n" + campoCSS.value +
    "\n\nJAVASCRIPT:\n" + campoJS.value;

  try {
    await navigator.clipboard.writeText(codigo);
    alert("Códigos copiados!");
  } catch {
    alert("Não foi possível copiar. Verifique a permissão da área de transferência.");
  }
});

// Baixar projeto
document.getElementById("baixar").addEventListener("click", () => {
  const html = campoHTML.value;
  const css = campoCSS.value;
  const js = campoJS.value;

  const projeto = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<style>${css.replace(/<\/style/gi, "<\\/style")}</style>
</head>
<body>
${html}
<script>
${js.replace(/<\/script/gi, "<\\/script")}
<\/script>
</body>
</html>`;

  const arquivo = new Blob([projeto], {
    type: "text/html"
  });

  const url = URL.createObjectURL(arquivo);
  const link = document.createElement("a");

  link.href = url;
  link.download = "meu-projeto.html";
  link.click();

  URL.revokeObjectURL(url);
});

// Iniciar editor
carregar();
