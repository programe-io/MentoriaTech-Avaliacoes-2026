const html = document.querySelectorAll("textarea")[0];
const css = document.querySelectorAll("textarea")[1];
const js = document.querySelectorAll("textarea")[2];
const preview = document.getElementById("preview");

function atualizar() {

    const codigo = `
    <html>
    <head>
    <style>
    ${css.value}
    </style>
    </head>

    <body>
    ${html.value}

    <script>
    ${js.value}
    <\/script>

    </body>
    </html>
    `;

    preview.srcdoc = codigo;
}

html.addEventListener("input", atualizar);
css.addEventListener("input", atualizar);
js.addEventListener("input", atualizar);