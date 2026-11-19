
// ======================================
// FUNÇÃO PARA MAXIMIZAR OS EDITORES
// ======================================

function maximizar(id) {
    const editor = document.getElementById(id);

    editor.classList.toggle("ativo");

    const botao = editor.querySelector(".maximizar");

    if (editor.classList.contains("ativo")) {
        botao.textContent = "Restaurar";
    \} else {
        botao.textContent = "Maximizar";
    \}
\}


// ======================================
// EXECUTAR E MOSTRAR O CÓDIGO
// ======================================

function executarCodigo() {

    const html = document.getElementById("htmlCode").value;
    const css = document.getElementById("cssCode").value;
    const js = document.getElementById("jsCode").value;

    const resultado = document.getElementById("resultado");

    const documento = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            \${css\}
        </style>
    </head>

    <body>

        \${html\}

        <script>
            \${js\}
        <\\/script>

    </body>
    </html>
    `;

    resultado.srcdoc = documento;
\}


// ======================================
// PUBLICAR E BAIXAR A AVALIAÇÃO
// ======================================

function publicarCodigo() {

    const html = document.getElementById("htmlCode").value;
    const css = document.getElementById("cssCode").value;
    const js = document.getElementById("jsCode").value;

    if (!html.trim() && !css.trim() && !js.trim()) {
        alert("Digite algum código antes de publicar!");
        return;
    \}

    const codigo = {
        html: html,
        css: css,
        javascript: js,
        data: new Date().toLocaleString("pt-BR")
    \};

    const arquivo = new Blob(
        [JSON.stringify(codigo, null, 2)],
        { type: "application/json" \}
    );

    const url = URL.createObjectURL(arquivo);

    const link = document.createElement("a");

    link.href = url;
    link.download = "minha-avaliacao.json";

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);

    alert("Sua avaliação foi exportada com sucesso!");
\}


// ======================================
// LIMPAR TODOS OS EDITORES
// ======================================

function limparCodigo() {

    const confirmar = confirm(
        "Tem certeza que deseja apagar todos os códigos?"
    );

    if (confirmar) {

        document.getElementById("htmlCode").value = "";
        document.getElementById("cssCode").value = "";
        document.getElementById("jsCode").value = "";

        document.getElementById("resultado").srcdoc = "";

        alert("Todos os códigos foram apagados!");
    \}
\}


// ======================================
// EXECUTAR AUTOMATICAMENTE AO DIGITAR
// ======================================

const campos = [
    "htmlCode",
    "cssCode",
    "jsCode"
];

campos.forEach(function(id) {

    const campo = document.getElementById(id);

    campo.addEventListener("input", function() {
        executarCodigo();
    \});

\});


// ======================================
// MENSAGEM DE INICIALIZAÇÃO
// ======================================

window.addEventListener("load", function() {

    console.log("Área de Entrega carregada com sucesso!");

\});$0