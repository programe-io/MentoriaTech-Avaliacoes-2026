
const htmlInput = document.getElementById("htmlCode");
const cssInput = document.getElementById("cssCode");
const jsInput = document.getElementById("jsCode");
const preview = document.getElementById("preview");

function updatePreview() {

    const source = `
    <!DOCTYPE html>
    <html>
    <head>
        <style>${cssInput.value}</style>
    </head>
    <body>
        ${htmlInput.value}

        <script>
            ${jsInput.value}
        <\/script>
    </body>
    </html>
    `;

    preview.srcdoc = source;
}

function toggleMax(id) {

    const panel = document.getElementById(id);

    panel.classList.toggle("fullscreen");

    const button = panel.querySelector("button");

    if (panel.classList.contains("fullscreen")) {
        button.textContent = "Restaurar";
    } else {
        button.textContent = "Maximizar";
    }
}

htmlInput.addEventListener("input", updatePreview);
cssInput.addEventListener("input", updatePreview);
jsInput.addEventListener("input", updatePreview);

updatePreview();
