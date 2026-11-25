
function executarCodigo() {
    const html = document.getElementById("htmlCode").value;
    const css = document.getElementById("cssCode").value;
    const js = document.getElementById("jsCode").value;

    const resultado = document.getElementById("resultado");

    const codigoCompleto = `
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <style>${css}</style>
        </head>
        <body>
            ${html}
            <script>
                ${js}
            <\/script>
        </body>
        </html>
    `;

    resultado.srcdoc = codigoCompleto;
}

function publicarCodigo() {
    const html = document.getElementById("htmlCode").value;
    const css = document.getElementById("cssCode").value;
    const js = document.getElementById("jsCode").value;

    if (!html.trim() || !css.trim() || !js.trim()) {
        document.getElementById("mensagem").textContent =
            "Preencha os três campos antes de publicar!";
        document.getElementById("mensagem").style.color = "red";
        return;
    }

    const projeto = {
        html: html,
        css: css,
        javascript: js
    };

    localStorage.setItem("atividade", JSON.stringify(projeto));

    document.getElementById("mensagem").textContent =
        "Atividade salva com sucesso!";
    document.getElementById("mensagem").style.color = "green";
}