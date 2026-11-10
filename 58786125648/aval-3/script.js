
let pessoas = [];

// Cadastrar pessoa e calcular IMC
function cadastrarPessoa() {

    let nome = document.getElementById("nome").value.trim();

    let pesoCampo = document.getElementById("peso").value;
    let alturaCampo = document.getElementById("altura").value;

    let peso = Number(pesoCampo);
    let altura = Number(alturaCampo);

    // Validar os campos
    if (nome.length < 2) {
        alert("Digite um nome válido!");
        return;
    }

    if (pesoCampo === "" || peso <= 0) {
        alert("Digite um peso válido!");
        return;
    }

    if (alturaCampo === "" || altura <= 0) {
        alert("Digite uma altura válida!");
        return;
    }

    // Calcular IMC
    let imc = peso / (altura * altura);

    let status = "";
    let classe = "";

    // Verificar classificação
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

    // Criar objeto da pessoa
    let pessoa = {
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        status: status,
        classe: classe
    };

    pessoas.push(pessoa);

    alert("IMC calculado com sucesso!");

    limparCampos();

    listarPessoas();

}


// Listar pessoas cadastradas
function listarPessoas() {

    let tabela = document.getElementById("listaPessoas");

    tabela.innerHTML = "";

    pessoas.forEach((pessoa) => {

        tabela.innerHTML += `
            <tr>

                <td>${pessoa.nome}</td>

                <td>${pessoa.peso.toFixed(1)} kg</td>

                <td>${pessoa.altura.toFixed(2)} m</td>

                <td>${pessoa.imc.toFixed(2)}</td>

                <td class="${pessoa.classe}">
                    ${pessoa.status}
                </td>

            </tr>
        `;

    });

}


// Limpar os campos
function limparCampos() {

    document.getElementById("nome").value = "";

    document.getElementById("peso").value = "";

    document.getElementById("altura").value = "";

}
