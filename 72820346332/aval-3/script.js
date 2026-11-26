
const form = document.getElementById("formPessoa");
const lista = document.getElementById("lista");
const erro = document.getElementById("erro");

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificar(imc) {
    if (imc < 18.5) return ["Abaixo do peso", "sobrepeso"];
    if (imc < 25) return ["Normal", "normal"];
    if (imc < 30) return ["Sobrepeso", "sobrepeso"];
    return ["Obesidade", "obesidade"];
}

function render() {
    lista.innerHTML = "";

    pessoas.forEach(p => {
        let imc = calcularIMC(p.peso, p.altura);
        let classe = classificar(imc);

        lista.innerHTML += `
        <tr>
            <td>${p.nome}</td>
            <td>${p.idade}</td>
            <td>${p.altura.toFixed(2)} m</td>
            <td>${p.peso.toFixed(1)} kg</td>
            <td>${imc.toFixed(1)}</td>
            <td><span class="selo ${classe[1]}">${classe[0]}</span></td>
        </tr>`;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let pessoa = {
        nome: document.getElementById("nome").value.trim(),
        idade: Number(document.getElementById("idade").value),
        altura: Number(document.getElementById("altura").value),
        peso: Number(document.getElementById("peso").value)
    };

    if (pessoa.nome.length < 2 ||
        pessoa.idade < 1 || pessoa.idade > 120 ||
        !Number.isInteger(pessoa.idade) ||
        pessoa.altura < 0.5 || pessoa.altura > 2.5 ||
        pessoa.peso < 2 || pessoa.peso > 500) {
        erro.textContent = "Verifique os dados informados!";
        erro.hidden = false;
        return;
    }

    erro.hidden = true;
    pessoas.push(pessoa);

    localStorage.setItem("pessoas", JSON.stringify(pessoas));

    form.reset();
    document.getElementById("nome").focus();
    render();
});

render();
