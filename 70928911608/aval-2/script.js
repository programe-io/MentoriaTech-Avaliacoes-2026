function executar() {

    let nome = document.getElementById("nome").value;
    let idade = Number(document.getElementById("idade").value);
    let nota = Number(document.getElementById("nota").value);
    let opcao = document.getElementById("opcao").value;

    let resultado = document.getElementById("resultado");

    switch (opcao) {

        case "1":
            // IF + OPERADORES RELACIONAIS + LÓGICOS

            if (nota >= 7 && idade >= 18) {
                resultado.innerHTML = nome + " está APROVADO e é maior de idade.";

            } else if (nota >= 7 && idade < 18) {
                resultado.innerHTML = nome + " está APROVADO e é menor de idade.";

            } else if (nota >= 5 || idade >= 18) {
                resultado.innerHTML = nome + " está em RECUPERAÇÃO.";

            } else {
                resultado.innerHTML = nome + " está REPROVADO.";
            }

        break;

        case "2":
            // CONDICIONAIS ENCADEADAS

            if (idade < 12) {
                resultado.innerHTML = "Categoria: Criança";

            } else if (idade >= 12 && idade <= 17) {
                resultado.innerHTML = "Categoria: Adolescente";

            } else if (idade >= 18 && idade <= 59) {
                resultado.innerHTML = "Categoria: Adulto";

            } else {
                resultado.innerHTML = "Categoria: Idoso";
            }

        break;

        default:
            resultado.innerHTML = "Opção inválida!";
    }
}