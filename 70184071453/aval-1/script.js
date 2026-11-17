/* ==========================================
   ÁREA DE ENTREGA - AVALIAÇÕES
   CONFIGURAÇÕES INICIAIS
========================================== */

// Capturando os elementos HTML
const campoHTML = document.getElementById("html");
const campoCSS = document.getElementById("css");
const campoJS = document.getElementById("js");

const resultado = document.getElementById("resultado");

const editorHTML = document.getElementById("editor-html");
const editorCSS = document.getElementById("editor-css");
const editorJS = document.getElementById("editor-js");

// Tempo para atualizar a pré-visualização
let temporizador = null;


/* ==========================================
   ATUALIZAÇÃO DA PRÉ-VISUALIZAÇÃO
========================================== */

function atualizarPreview() {

    if (!resultado) return;

    const codigoHTML = campoHTML.value;
    const codigoCSS = campoCSS.value;
    const codigoJS = campoJS.value;

    const documento = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport"
            content="width=device-width, initial-scale=1.0">

            <style>
                \${codigoCSS\}
            </style>
        </head>

        <body>

            \${codigoHTML\}

            <script>
                \${codigoJS\}
            <\\/script>

        </body>
        </html>
    `;

    resultado.srcdoc = documento;

    console.log("Pré-visualização atualizada!");
\}


/* ==========================================
   ATUALIZAÇÃO AUTOMÁTICA
========================================== */

function programarAtualizacao() {

    clearTimeout(temporizador);

    temporizador = setTimeout(() => {
        atualizarPreview();
    \}, 300);
\}

campoHTML.addEventListener("input", programarAtualizacao);
campoCSS.addEventListener("input", programarAtualizacao);
campoJS.addEventListener("input", programarAtualizacao);


/* ==========================================
   MAXIMIZAR E RESTAURAR EDITORES
========================================== */

function maximizar(id) {

    const editor = document.getElementById(id);

    if (!editor) return;

    editor.classList.toggle("maximizado");

    const botao = editor.querySelector("button");

    if (editor.classList.contains("maximizado")) {

        botao.textContent = "Restaurar";

    \} else {

        botao.textContent = "Maximizar";

    \}
\}


/* ==========================================
   CONTADOR DE CARACTERES
========================================== */

function contarCaracteres() {

    const totalHTML = campoHTML.value.length;
    const totalCSS = campoCSS.value.length;
    const totalJS = campoJS.value.length;

    const total = totalHTML + totalCSS + totalJS;

    console.log("Caracteres HTML:", totalHTML);
    console.log("Caracteres CSS:", totalCSS);
    console.log("Caracteres JavaScript:", totalJS);
    console.log("Total de caracteres:", total);

    return total;
\}

campoHTML.addEventListener("input", contarCaracteres);
campoCSS.addEventListener("input", contarCaracteres);
campoJS.addEventListener("input", contarCaracteres);


/* ==========================================
   LIMPAR EDITORES
========================================== */

function limparEditor(id) {

    const campo = document.getElementById(id);

    if (!campo) return;

    const confirmar = confirm(
        "Tem certeza que deseja apagar este código?"
    );

    if (confirmar) {

        campo.value = "";

        programarAtualizacao();

        salvarAutomaticamente();

        alert("Código apagado com sucesso!");

    \}
\}


/* ==========================================
   LIMPAR TODOS OS EDITORES
========================================== */

function limparTudo() {

    const confirmar = confirm(
        "Deseja apagar todos os códigos?"
    );

    if (confirmar) {

        campoHTML.value = "";
        campoCSS.value = "";
        campoJS.value = "";

        atualizarPreview();

        salvarAutomaticamente();

        alert("Todos os campos foram limpos!");

    \}
\}


/* ==========================================
   SALVAMENTO AUTOMÁTICO
========================================== */

function salvarAutomaticamente() {

    const projeto = {

        html: campoHTML.value,
        css: campoCSS.value,
        javascript: campoJS.value

    \};

    try {

        localStorage.setItem(
            "meuProjeto",
            JSON.stringify(projeto)
        );

        console.log("Projeto salvo automaticamente!");

    \} catch (erro) {

        console.error("Não foi possível salvar:", erro);

    \}
\}


/* ==========================================
   CARREGAR PROJETO SALVO
========================================== */

function carregarProjeto() {

    try {

        const projetoSalvo =
            localStorage.getItem("meuProjeto");

        if (!projetoSalvo) return;

        const projeto = JSON.parse(projetoSalvo);

        campoHTML.value = projeto.html || "";
        campoCSS.value = projeto.css || "";
        campoJS.value = projeto.javascript || "";

        atualizarPreview();

        console.log("Projeto carregado!");

    \} catch (erro) {

        console.error("Erro ao carregar projeto:", erro);

    \}
\}


/* ==========================================
   EVENTOS DE SALVAMENTO
========================================== */

campoHTML.addEventListener(
    "input",
    salvarAutomaticamente
);

campoCSS.addEventListener(
    "input",
    salvarAutomaticamente
);

campoJS.addEventListener(
    "input",
    salvarAutomaticamente
);


/* ==========================================
   VALIDAR CAMPOS
========================================== */

function validarCampos() {

    if (
        campoHTML.value.trim() === "" &&
        campoCSS.value.trim() === "" &&
        campoJS.value.trim() === ""
    ) {

        alert("Digite algum código antes de continuar!");

        return false;

    \}

    return true;
\}


/* ==========================================
   PUBLICAR PROJETO
========================================== */

function publicarProjeto() {

    if (!validarCampos()) return;

    salvarAutomaticamente();

    alert(
        "Seu projeto está salvo! Agora você pode compartilhar seu código com o professor."
    );

\}


/* ==========================================
   COPIAR CÓDIGO
========================================== */

function copiarCodigo(id) {

    const campo = document.getElementById(id);

    if (!campo) return;

    navigator.clipboard.writeText(campo.value)
        .then(() => {

            alert("Código copiado com sucesso!");

        \})
        .catch(() => {

            alert("Não foi possível copiar o código.");

        \});

\}


/* ==========================================
   BAIXAR PROJETO
========================================== */

function baixarProjeto() {

    const conteudo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">

<style>
\${campoCSS.value\}
</style>

</head>

<body>

\${campoHTML.value\}

<script>
\${campoJS.value\}
<\\/script>

</body>
</html>
`;

    const arquivo = new Blob(
        [conteudo],
        { type: "text/html" \}
    );

    const endereco = URL.createObjectURL(arquivo);

    const link = document.createElement("a");

    link.href = endereco;
    link.download = "meu-projeto.html";

    document.body.appendChild(link);

    link.click();

    link.remove();

    URL.revokeObjectURL(endereco);

\}


/* ==========================================
   DETECTAR ALTERAÇÕES
========================================== */

function detectarAlteracoes() {

    console.log("O código foi modificado!");

\}


/* ==========================================
   INICIALIZAÇÃO DO SISTEMA
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    carregarProjeto();

    atualizarPreview();

    console.log(
        "Área de Entrega iniciada com sucesso!"
    );

\});


/* ==========================================
   ATALHOS DO TECLADO
========================================== */

document.addEventListener("keydown", (evento) => {

    // Ctrl + S para salvar
    if (
        evento.ctrlKey &&
        evento.key.toLowerCase() === "s"
    ) {

        evento.preventDefault();

        salvarAutomaticamente();

        alert("Projeto salvo!");

    \}

    // F5 para atualizar a pré-visualização
    if (evento.key === "F5") {

        evento.preventDefault();

        atualizarPreview();

    \}

\});$0