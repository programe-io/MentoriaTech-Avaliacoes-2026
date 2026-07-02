// Lista com as notas do aluno
let notas = [8, 6, 9, 7];

// Variável que vai guardar a soma
let soma = 0;

// Percorre todas as notas
for(let i = 0; i < notas.length; i++){

    soma = soma + notas[i];

    }

    // Calcula a média
    let media = soma / notas.length;

    // Mostra a média
    console.log("A média foi: " + media);

    // Verifica a situação do aluno
    if(media >= 7){

        console.log("Aluno aprovado.");

        }else if(media >= 5){

            console.log("Aluno em recuperação.");

            }else{

                console.log("Aluno reprovado.");

                }

                // Mostra todas as notas
                console.log("Notas do aluno:");

                for(let i = 0; i < notas.length; i++){

                    console.log(notas[i]);

                    }