const html = document.getElementById("html");
const css = document.getElementById("css");
const javascript = document.getElementById("javascript");
const resultado = document.getElementById("resultado");

function atualizar(){

resultado.srcdoc = `
<!DOCTYPE html>
<html>
<head>
<style>
${css.value}
</style>
</head>
<body>

${html.value}

<script>
${javascript.value}
<\/script>

</body>
</html>
`;

}

html.addEventListener("input", atualizar);
css.addEventListener("input", atualizar);
javascript.addEventListener("input", atualizar);

atualizar();