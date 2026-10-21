
let pessoas = [];

document.getElementById("form").onsubmit = function(e) {
    e.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let peso = Number(document.getElementById("peso").value);
    let altura = Number(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0) {
        alert("Informe dados válidos!");
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

    pessoas.push({ nome, peso, altura, imc, status, classe });
    listar();
    this.reset();
};

function listar() {
    document.getElementById("lista").innerHTML =
        pessoas.map(p => `
            <tr class="${p.classe}">
                <td>${p.nome}</td>
                <td>${p.peso} kg</td>
                <td>${p.altura} m</td>
                <td>${p.imc.toFixed(2)}</td>
                <td>${p.status}</td>
            </tr>
        `).join("");
}
