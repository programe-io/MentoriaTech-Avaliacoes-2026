// GET: Lê um atributo
function lerAtributo() {
    let link = document.getElementById("link");

    alert(link.getAttribute("href"));
\}

// SET: Cria ou altera um atributo
function alterarAtributo() {
    let link = document.getElementById("link");

    link.setAttribute("href", "https://www.youtube.com");

    alert("Atributo alterado!");
\}

// REMOVE: Remove um atributo
function removerAtributo() {
    let imagem = document.getElementById("imagem");

    imagem.removeAttribute("alt");

    alert("Atributo removido!");
\}$0