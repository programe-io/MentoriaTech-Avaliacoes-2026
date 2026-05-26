let indiceAtual = Number(prompt('Informe o índice de poluição atual: '));

if (indiceAtual < 35) {
    console.log('Agradável');
}
else if (indiceAtual >= 35 && indiceAtual <= 50) {
    console.log('Desagradável');
}
else {
    console.log('Perigoso');
}