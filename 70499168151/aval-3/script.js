
function cadastrar() {
    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (nome === "" || peso <= 0 || altura <= 0 ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);
    let status;
    let classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "abaixo";
    } else if (imc < 25) {
        status = "Peso normal";
        classe = "normal";
    } else if (imc < 30) {
        status = "Sobrepeso";
        classe = "sobrepeso";
    } else {
        status = "Obesidade";
        classe = "obesidade";
    }

    let linha = document.createElement("tr");

    let dados = [
        nome,
        peso.toFixed(1) + " kg",
        altura.toFixed(2) + " m",
        imc.toFixed(2),
        status
    ];

    dados.forEach((dado, indice) => {
        let celula = document.createElement("td");
        celula.textContent = dado;

        if (indice === 4) {
            celula.classList.add("status", classe);
        }

        linha.appendChild(celula);
    });

    document.getElementById("lista").appendChild(linha);

    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    alert("IMC calculado com sucesso!");
}
