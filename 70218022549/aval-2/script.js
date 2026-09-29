// =====================================
// 1. FUNCTION DECLARATION
// =====================================

function calcularMedia(nota1, nota2, nota3) {

    let media = (nota1 + nota2 + nota3) / 3;

    return media;
}


// =====================================
// 2. FUNCTION EXPRESSION
// =====================================

const verificarMedia = function(media) {

    if (media >= 7) {

        return "Aprovado";

    } else if (media >= 5) {

        return "Recuperação";

    } else {

        return "Reprovado";
    }
};


// =====================================
// 3. ARROW FUNCTION
// =====================================

const dobrarNota = (nota) => {

    return nota * 2;
};


// =====================================
// FUNÇÃO PRINCIPAL
// =====================================

function avaliar() {

    let nota1 = Number(
        document.getElementById("nota1").value
    );

    let nota2 = Number(
        document.getElementById("nota2").value
    );

    let nota3 = Number(
        document.getElementById("nota3").value
    );


    // Verificação das notas

    if (
        nota1 < 0 || nota1 > 10 ||
        nota2 < 0 || nota2 > 10 ||
        nota3 < 0 || nota3 > 10
    ) {

        document.getElementById("resultado").innerHTML =
            "❌ Digite notas entre 0 e 10.";

        return;
    }


    // Calcula a média

    let media = calcularMedia(
        nota1,
        nota2,
        nota3
    );


    // Verifica a situação

    let situacao = verificarMedia(media);


    // Calcula o dobro da média

    let dobro = dobrarNota(media);


    // Mostra o resultado

    document.getElementById("resultado").innerHTML =

        "<strong>📊 Resultado</strong><br><br>" +

        "Nota 1: " + nota1.toFixed(1) + "<br>" +

        "Nota 2: " + nota2.toFixed(1) + "<br>" +

        "Nota 3: " + nota3.toFixed(1) + "<br><br>" +

        "<strong>Média: " +
        media.toFixed(1) +
        "</strong><br>" +

        "Situação: " +
        situacao +
        "<br>" +

        "Dobro da média: " +
        dobro.toFixed(1);


    // =================================
    // 4. ANONYMOUS FUNCTION
    // =================================

    setTimeout(function() {

        console.log(
            "Avaliação finalizada!"
        );

    }, 1000);
}