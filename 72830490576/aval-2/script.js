function calcularMedia() {

    const nome = document.getElementById("nome").value.trim();
    const nota1 = parseFloat(document.getElementById("nota1").value);
    const nota2 = parseFloat(document.getElementById("nota2").value);
    const nota3 = parseFloat(document.getElementById("nota3").value);
    const resultado = document.getElementById("resultado");

    if (nome === "") {
        resultado.innerHTML = "Digite o nome do aluno.";
        resultado.className = "erro";
        return;
    \}

    if (isNaN(nota1) || isNaN(nota2) || isNaN(nota3)) {
        resultado.innerHTML = "Digite as três notas.";
        resultado.className = "erro";
        return;
    \}

    if (
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10
    ) {
        resultado.innerHTML = "As notas devem estar entre 0 e 10.";
        resultado.className = "erro";
        return;
    \}

    const media = (nota1 + nota2 + nota3) / 3;

    if (media >= 7) {
        resultado.innerHTML =
            "Aluno: " + nome +
            "<br>Média: " + media.toFixed(1) +
            "<br>Resultado: APROVADO!";

        resultado.className = "aprovado";

    \} else {
        resultado.innerHTML =
            "Aluno: " + nome +
            "<br>Média: " + media.toFixed(1) +
            "<br>Resultado: REPROVADO!";

        resultado.className = "reprovado";
    \}
\}$0