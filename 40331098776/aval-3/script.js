const formulario = document.getElementById("formulario");
const listaPessoas = document.getElementById("listaPessoas");

let pessoas = [];

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
        nome,
        idade,
        altura,
        peso,
        imc,
        classificacao
    \};

    pessoas.push(pessoa);

    atualizarLista();

    formulario.reset();
\});

function atualizarLista() {
    listaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        listaPessoas.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhuma pessoa cadastrada ainda.
                </td>
            </tr>
        `;
        return;
    \}

    pessoas.forEach(function(pessoa, index) {

        const linha = document.createElement("tr");

        const valores = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso + " kg",
            pessoa.imc.toFixed(2),
            pessoa.classificacao
        ];

        valores.forEach(function(valor) {
            const coluna = document.createElement("td");
            coluna.textContent = valor;
            linha.appendChild(coluna);
        \});

        const colunaAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");

        botaoExcluir.addEventListener("click", function() {
            pessoas.splice(index, 1);
            atualizarLista();
        \});

        colunaAcao.appendChild(botaoExcluir);
        linha.appendChild(colunaAcao);

        listaPessoas.appendChild(linha);
    \});
\}$0