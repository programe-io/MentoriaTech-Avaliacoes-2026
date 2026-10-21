
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabela");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) || !Number.isFinite(altura)) {
        alert("Informe um nome, peso e altura válidos!");
        return;
    }

    const imc = peso / (altura * altura);

    let status;
    let classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "baixo";
    } else if (imc < 25) {
        status = "Peso normal";
        classe = "normal";
    } else if (imc < 30) {
        status = "Sobrepeso";
        classe = "sobrepeso";
    } else if (imc < 35) {
        status = "Obesidade grau I";
        classe = "obesidade1";
    } else if (imc < 40) {
        status = "Obesidade grau II";
        classe = "obesidade2";
    } else {
        status = "Obesidade grau III";
        classe = "obesidade3";
    }

    const linha = document.createElement("tr");

    [nome, peso.toFixed(1), altura.toFixed(2), imc.toFixed(2)]
        .forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

    const celulaStatus = document.createElement("td");
    celulaStatus.textContent = status;
    celulaStatus.classList.add("status", classe);

    linha.appendChild(celulaStatus);
    tabela.appendChild(linha);

    formulario.reset();
});
