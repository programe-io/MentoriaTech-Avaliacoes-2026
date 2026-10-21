
function adicionar() {
    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    let imc = peso / (altura * altura);
    let status, classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "baixo";
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

    document.getElementById("tabela").innerHTML += `
        <tr class="${classe}">
            <td>${nome}</td>
            <td>${peso.toFixed(1)} kg</td>
            <td>${altura.toFixed(2)} m</td>
            <td>${imc.toFixed(2)}</td>
            <td>${status}</td>
        </tr>
    `;

    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
}
