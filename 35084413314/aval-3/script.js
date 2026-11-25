const formImc = document.getElementById("formImc");
const tabelaPacientes = document.getElementById("tabelaPacientes");

const pacientes = [];

function classificarImc(imc) {
    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso normal";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau I";
    if (imc < 40) return "Obesidade grau II";
    return "Obesidade grau III";
}

function criarLinha(paciente) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${paciente.nome}</td>
        <td>${paciente.peso.toFixed(1)}</td>
        <td>${paciente.altura.toFixed(2)}</td>
        <td><strong>${paciente.imc.toFixed(2)}</strong></td>
        <td>${paciente.classificacao}</td>
    `;

    return tr;
}

function render() {
    tabelaPacientes.innerHTML = "";

    if (pacientes.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 5;
        td.classList.add("vazio");
        td.textContent = "Nenhum paciente cadastrado ainda.";
        tr.appendChild(td);
        tabelaPacientes.appendChild(tr);
        return;
    }

    pacientes.forEach((paciente) => {
        tabelaPacientes.appendChild(criarLinha(paciente));
    });
}

formImc.addEventListener("submit", (event) => {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0) {
        alert("Preencha todos os campos com valores válidos!");
        return;
    }

    const imc = peso / (altura * altura);
    const classificacao = classificarImc(imc);

    pacientes.push({
        nome,
        peso,
        altura,
        imc,
        classificacao
    });

    formImc.reset();
    render();
});

render();
