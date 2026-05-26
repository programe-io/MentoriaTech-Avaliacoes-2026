let indiceAtual = Number(prompt("Informe o índice de poluição atual: "));

if (indiceAtual < 35) {
    console.log("Agradável");
} 
else if (indiceAtual >= 35 && indiceAtual <= 60) {
    console.log("Desagradável");
} 
else {
    console.log("Perigoso");
}