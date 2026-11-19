
const htmlEditor = document.getElementById("html-code");
const cssEditor = document.getElementById("css-code");
const jsEditor = document.getElementById("js-code");

const preview = document.getElementById("preview");

// ATUALIZAR PRÉ-VISUALIZAÇÃO

function atualizarPreview() {

    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    const codigoCompleto = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <style>
                ${css}
            </style>
        </head>
        <body>

            ${html}

            <script>
                ${js}
            <\/script>

        </body>
        </html>
    `;

    preview.srcdoc = codigoCompleto;
}

// ATUALIZA AUTOMATICAMENTE AO DIGITAR

htmlEditor.addEventListener("input", atualizarPreview);
cssEditor.addEventListener("input", atualizarPreview);
jsEditor.addEventListener("input", atualizarPreview);

// MAXIMIZAR EDITOR

function maximizar(id) {

    const editor = document.getElementById(id);

    editor.classList.toggle("maximizado");

    const botao = editor.querySelector("button");

    if (editor.classList.contains("maximizado")) {
        botao.textContent = "Restaurar";
    } else {
        botao.textContent = "Maximizar";
    }
}

// LIMPAR CÓDIGOS

function limparCodigo() {

    const confirmar = confirm(
        "Tem certeza que deseja apagar todos os códigos?"
    );

    if (confirmar) {

        htmlEditor.value = "";
        cssEditor.value = "";
        jsEditor.value = "";

        atualizarPreview();

    }
}

// PUBLICAR / EXPORTAR AVALIAÇÃO

function publicarCodigo() {

    const html = htmlEditor.value;
    const css = cssEditor.value;
    const js = jsEditor.value;

    if (
        html.trim() === "" &&
        css.trim() === "" &&
        js.trim() === ""
    ) {
        alert("Digite algum código antes de publicar!");
        return;
    }

    const codigoFinal = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Minha Avaliação</title>
<style>
${css}
</style>
</head>
<body>

${html}

<script>
${js}
<\/script>

</body>
</html>
`;

    const arquivo = new Blob(
        [codigoFinal],
        { type: "text/html" }
    );

    const link = document.createElement("a");

    link.href = URL.createObjectURL(arquivo);
    link.download = "minha-avaliacao.html";

    link.click();

    URL.revokeObjectURL(link.href);

    alert("Avaliação exportada com sucesso!");
}

// PRÉ-VISUALIZAÇÃO INICIAL

atualizarPreview();
