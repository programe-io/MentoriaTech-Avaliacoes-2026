function calcularMedia() {
    // Obtendo os valores dos inputs e convertendo para número
    const n1 = parseFloat(document.getElementById('nota1').value);
    const n2 = parseFloat(document.getElementById('nota2').value);
    const n3 = parseFloat(document.getElementById('nota3').value);
    const n4 = parseFloat(document.getElementById('nota4').value);

    // Validação simples
    if (isNaN(n1) || isNaN(n2) || isNaN(n3) || isNaN(n4)) {
        document.getElementById('resultado').innerText = "Por favor, preencha todas as notas.";
        return;
    }

    // Cálculo da média
    const media = (n1 + n2 + n3 + n4) / 4;

    // Exibindo o resultado formatado
    document.getElementById('resultado').innerText = `A média final é: ${media.toFixed(2)}`;
}
