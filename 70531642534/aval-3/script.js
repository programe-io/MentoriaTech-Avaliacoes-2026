
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabelaPessoas");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (
        nome.length === 0 ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        alert("Informe um nome, peso e altura válidos!");
        return;
    }

    // Fórmula: IMC = peso / (altura * altura)
    const imc = peso / (altura * altura);

    let status;
    let classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "status-baixo";
    } else if (imc < 25) {
        status = "Peso normal";
        classe = "status-normal";
    } else if (imc < 30) {
        status = "Sobrepeso";
        classe = "status-sobrepeso";
    } else {
        status = "Obesidade";
        classe = "status-obesidade";
    }

    // Remove a mensagem inicial da tabela
    if (
        tabela.rows.length === 1 &&
        tabela.rows[0].cells.length === 1
    ) {
        tabela.innerHTML = "";
    }

    const linha = tabela.insertRow();

    const celulaNome = linha.insertCell();
    const celulaPeso = linha.insertCell();
    const celulaAltura = linha.insertCell();
    const celulaIMC = linha.insertCell();
    const celulaStatus = linha.insertCell();

    celulaNome.textContent = nome;
    celulaPeso.textContent = peso.toFixed(1);
    celulaAltura.textContent = altura.toFixed(2);
    celulaIMC.textContent = imc.toFixed(2);

    celulaStatus.textContent = status;
    celulaStatus.classList.add(classe);

    formulario.reset();
});
