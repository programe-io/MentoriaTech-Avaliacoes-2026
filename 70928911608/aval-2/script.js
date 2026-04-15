function executar() {
    let nome = document.getElementById("nome").value;
    let idade = Number(document.getElementById("idade").value);
    let nota = Number(document.getElementById("nota").value);
    let opcao = document.getElementById("opcao").value;

    let resultado = document.getElementById("resultado");

    // SWITCH (menu)
    switch(opcao) {

        case "1": // Situação do aluno

            // IF + operadores relacionais + lógicos
            if (nota >= 7 && idade >= 18) {
                resultado.innerHTML = nome + " está aprovado e é maior de idade.";
            
            } else if (nota >= 7 && idade < 18) {
                resultado.innerHTML = nome + " está aprovado, mas é menor de idade.";
            
            } else if (nota >= 5 || idade >= 18) {
                resultado.innerHTML = nome + " está em recuperação.";
            
            } else {
                resultado.innerHTML = nome + " está reprovado.";
            }

        break;

        case "2": // Categoria por idade

            // IF encadeado (condicional)
            if (idade < 12) {
                resultado.innerHTML = "Categoria: Criança";
            
            } else if (idade >= 12 && idade < 18) {
                resultado.innerHTML = "Categoria: Adolescente";
            
            } else if (idade >= 18 && idade < 60) {
                resultado.innerHTML = "Categoria: Adulto";
            
            } else {
                resultado.innerHTML = "Categoria: Idoso";
            }

        break;

        default:
            resultado.innerHTML = "Opção inválida!";
    }
}