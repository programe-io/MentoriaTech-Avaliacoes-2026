function executar() {

    let numero = Number(document.getElementById("numero").value);

    let resultado = "";

    // 🔁 FOR (estrutura de repetição com contador)
    resultado += "<h3>FOR</h3>";
    for (let i = 1; i <= numero; i++) {
        resultado += i + " ";
    }

    // 🔁 WHILE (estrutura de repetição com condição)
    resultado += "<h3>WHILE</h3>";

    let j = 1;
    while (j <= numero) {
        resultado += j + " ";
        j++;
    }

    document.getElementById("resultado").innerHTML = resultado;
}