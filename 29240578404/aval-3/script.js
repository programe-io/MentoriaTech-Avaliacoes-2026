// Lista de pessoas

let pessoas = [
    {
        nome: "João",
        peso: 72.0,
        altura: 1.65
    \},

    {
        nome: "João 2",
        peso: 65.0,
        altura: 1.68
    \}
];


// Pega a tabela pelo ID

let tabela = document.getElementById("tabela");


// Percorre todas as pessoas

pessoas.forEach(function(pessoa) {

    // Calcula o IMC
    let imc = pessoa.peso / (pessoa.altura * pessoa.altura);

    // Arredonda para duas casas
    imc = imc.toFixed(1);


    // Descobre a situação

    let situacao;
    let classe;


    if (imc < 18.5) {

        situacao = "Abaixo do peso";
        classe = "normal";

    \} else if (imc < 25) {

        situacao = "Normal";
        classe = "normal";

    \} else if (imc < 30) {

        situacao = "Sobrepeso";
        classe = "sobrepeso";

    \} else {

        situacao = "Obesidade";
        classe = "obesidade";
    \}


    // Cria uma linha da tabela

    let linha = document.createElement("tr");


    linha.innerHTML = `
        <td>\${pessoa.nome\}</td>

        <td>\${pessoa.peso.toFixed(1)\} kg</td>

        <td>\${pessoa.altura.toFixed(2)\} m</td>

        <td>\${imc\}</td>

        <td class="\${classe\}">
            \${situacao\}
        </td>
    `;


    // Adiciona a linha na tabela

    tabela.appendChild(linha);

\});$0