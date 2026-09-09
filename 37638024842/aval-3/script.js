// Array para armazenar as pessoas
let pessoas = [];


// =====================================
// ADICIONAR PESSOA
// =====================================

function adicionarPessoa() {

    // Pegar os valores dos campos
    let nome =
        document.getElementById("nome").value;

    let peso =
        Number(
            document.getElementById("peso").value
        );

    let altura =
        Number(
            document.getElementById("altura").value
        );


    // Verificar se os campos estão preenchidos

    if (
        nome === "" ||
        peso <= 0 ||
        altura <= 0
    ) {

        alert("Preencha todos os campos corretamente!");

        return;
    }


    // Criar objeto pessoa

    let pessoa = {

        nome: nome,

        peso: peso,

        altura: altura

    };


    // Adicionar no array

    pessoas.push(pessoa);


    // Atualizar tabela

    mostrarPessoas();


    // Limpar campos

    document.getElementById("nome").value = "";

    document.getElementById("peso").value = "";

    document.getElementById("altura").value = "";
}



// =====================================
// CALCULAR IMC
// =====================================

function calcularIMC(peso, altura) {

    let imc =
        peso / (altura * altura);

    return imc;
}



// =====================================
// VERIFICAR SITUAÇÃO
// =====================================

function verificarSituacao(imc) {

    if (imc < 18.5) {

        return "Abaixo do peso";

    }

    else if (imc < 25) {

        return "Normal";

    }

    else {

        return "Sobrepeso";

    }
}



// =====================================
// MOSTRAR PESSOAS NA TABELA
// =====================================

function mostrarPessoas() {

    let tabela =
        document.getElementById(
            "tabelaPessoas"
        );


    // Limpar tabela

    tabela.innerHTML = "";


    // Percorrer as pessoas

    pessoas.forEach(
        function(pessoa) {

            // Calcular IMC

            let imc =
                calcularIMC(
                    pessoa.peso,
                    pessoa.altura
                );


            // Descobrir situação

            let situacao =
                verificarSituacao(imc);


            // Definir classe da situação

            let classe = "";


            if (situacao === "Normal") {

                classe = "normal";

            }

            else if (
                situacao === "Sobrepeso"
            ) {

                classe = "sobrepeso";

            }

            else {

                classe = "abaixo";

            }


            // Criar linha

            let linha =
                document.createElement("tr");


            linha.innerHTML = `

                <td>
                    ${pessoa.nome}
                </td>

                <td>
                    ${pessoa.peso.toFixed(1)} kg
                </td>

                <td>
                    ${pessoa.altura.toFixed(2)} m
                </td>

                <td>
                    ${imc.toFixed(1)}
                </td>

                <td class="${classe}">
                    ${situacao}
                </td>

            `;


            // Adicionar na tabela

            tabela.appendChild(linha);

        }
    );
}