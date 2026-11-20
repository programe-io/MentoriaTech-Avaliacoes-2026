const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");
const listaPessoas = document.getElementById("listaPessoas");

let pessoas = [];

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (altura <= 0 || peso <= 0 || idade <= 0) {
        alert("Informe valores válidos!");
        return;
    \}

    const alturaMetros = altura / 100;

    const imc = peso / (alturaMetros * alturaMetros);

    let classificacao;

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    \} else if (imc < 25) {
        classificacao = "Peso normal";
    \} else if (imc < 30) {
        classificacao = "Sobrepeso";
    \} else if (imc < 35) {
        classificacao = "Obesidade grau I";
    \} else if (imc < 40) {
        classificacao = "Obesidade grau II";
    \} else {
        classificacao = "Obesidade grau III";
    \}

    const pessoa = {
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    \};

    pessoas.push(pessoa);

    resultado.innerHTML = `
        <strong>\${nome\}</strong><br>
        Seu IMC é: <strong>\${imc.toFixed(2)\}</strong><br>
        Classificação: <strong>\${classificacao\}</strong>
    `;

    atualizarLista();

    formulario.reset();
\});

function atualizarLista() {
    listaPessoas.innerHTML = "";

    pessoas.forEach(function(pessoa) {
        const linha = document.createElement("div");

        linha.classList.add("linha");

        const dados = [
            pessoa.nome,
            pessoa.idade + " anos",
            pessoa.peso + " kg",
            pessoa.altura + " cm",
            pessoa.imc.toFixed(2)
        ];

        dados.forEach(function(dado) {
            const coluna = document.createElement("span");
            coluna.textContent = dado;
            linha.appendChild(coluna);
        \});

        listaPessoas.appendChild(linha);
    \});
\}$0