// =====================================
// MAXIMIZAR E RESTAURAR EDITORES
// =====================================

function maximizar(botao) {
    const editor = botao.closest('.editor');

    editor.classList.toggle('maximizado');

    if (editor.classList.contains('maximizado')) {
        botao.textContent = 'Restaurar';
    \} else {
        botao.textContent = 'Maximizar';
    \}
\}


// =====================================
// PRÉ-VISUALIZAÇÃO DO CÓDIGO
// =====================================

function atualizarPreview() {

    const html = document.getElementById('html').value;
    const css = document.getElementById('css').value;
    const javascript = document.getElementById('javascript').value;

    const preview = document.getElementById('preview');

    const codigoCompleto = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <style>
                \${css\}
            </style>
        </head>

        <body>

            \${html\}

            <script>
                try {
                    \${javascript\}
                \} catch (erro) {
                    console.error("Erro no JavaScript:", erro);
                \}
            <\\/script>

        </body>
        </html>
    `;

    preview.srcdoc = codigoCompleto;
\}


// =====================================
// ATUALIZAÇÃO AUTOMÁTICA
// =====================================

document.addEventListener('DOMContentLoaded', function() {

    const campos = [
        document.getElementById('html'),
        document.getElementById('css'),
        document.getElementById('javascript')
    ];

    campos.forEach(function(campo) {

        campo.addEventListener('input', atualizarPreview);

    \});

    // Carrega a pré-visualização inicial
    atualizarPreview();

\});


// =====================================
// BOTÃO VOLTAR
// =====================================

function voltarInicio() {
    window.history.back();
\}$0