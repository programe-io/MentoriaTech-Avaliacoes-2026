let pessoas = [];


function cadastrarPessoa() {

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validação
    if (nome === "") {
        alert("Digite o nome!");
        return;
    \}

    if (peso <= 0 || altura <= 0) {
        alert("Digite um peso e uma altura válidos!");
        return;
    \}

    // Calculando o IMC
    const imc = peso / (altura * altura);

    let situacao;

    if (imc < 18.5) {
        situacao = "Abaixo do peso";
    \}
    else if (imc < 25) {
        situacao = "Normal";
    \}
    else if (imc < 30) {
        situacao = "Sobrepeso";
    \}
    else {
        situacao = "Obesidade";
    \}

    const pessoa = {
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        situacao: situacao
    \};

    pessoas.push(pessoa);

    mostrarTabela();

    // Limpar campos
    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";
\}


function mostrarTabela() {

    const tabela = document.getElementById("tabelaPessoas");

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        let classe = "";

        if (pessoa.imc < 18.5) {
            classe = "baixo";
        \}
        else if (pessoa.imc < 25) {
            classe = "normal";
        \}
        else if (pessoa.imc < 30) {
            classe = "sobrepeso";
        \}
        else {
            classe = "obesidade";
        \}

        tabela.innerHTML += `
            <tr>
                <td>\${pessoa.nome\}</td>
                <td>\${pessoa.peso.toFixed(1)\} kg</td>
                <td>\${pessoa.altura.toFixed(2)\} m</td>
                <td>\${pessoa.imc.toFixed(1)\}</td>
                <td class="\${classe\}">
                    \${pessoa.situacao\}
                </td>
            </tr>
        `;
    \});
\}$0