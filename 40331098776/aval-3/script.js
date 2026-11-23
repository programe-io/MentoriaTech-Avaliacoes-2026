const formulario = document.getElementById("formPessoa");
const lista = document.getElementById("listaPessoas");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    \}

    const imc = peso / (altura * altura);

    let classificacao;

    if (idade < 20) {
        classificacao = "Avaliação por idade";
    \} else if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    \} else if (imc < 25) {
        classificacao = "Peso normal";
    \} else if (imc < 30) {
        classificacao = "Sobrepeso";
    \} else if (imc < 35) {
        classificacao = "Obesidade I";
    \} else if (imc < 40) {
        classificacao = "Obesidade II";
    \} else {
        classificacao = "Obesidade III";
    \}

    const mensagem = document.getElementById("mensagemVazia");

    if (mensagem) {
        mensagem.remove();
    \}

    const linha = document.createElement("tr");

    const valores = [
        nome,
        idade,
        altura.toFixed(2) + " m",
        peso.toFixed(1) + " kg",
        imc.toFixed(2),
        classificacao
    ];

    valores.forEach(function(valor) {
        const coluna = document.createElement("td");
        coluna.textContent = valor;
        linha.appendChild(coluna);
    \});

    const colunaAcao = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function() {
        linha.remove();
        verificarLista();
    \});

    colunaAcao.appendChild(botaoExcluir);
    linha.appendChild(colunaAcao);

    lista.appendChild(linha);

    formulario.reset();
\});

function verificarLista() {
    if (lista.children.length === 0) {
        const linha = document.createElement("tr");
        linha.id = "mensagemVazia";

        const coluna = document.createElement("td");
        coluna.colSpan = 7;
        coluna.textContent = "Nenhuma pessoa cadastrada ainda";

        linha.appendChild(coluna);
        lista.appendChild(linha);
    \}
\}$0