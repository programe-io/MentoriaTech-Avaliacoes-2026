// Lista que armazena os pacientes
let pessoas = [];

// Identificador automático
let proximoId = 1;

// Elementos HTML
const formulario = document.getElementById("form-pessoa");
const tabela = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

// Evento de cadastro
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    // Captura dos dados
    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    // Validação
    if (
        !nome ||
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 1 || peso > 500
    ) {
        mensagemErro.textContent =
            "Preencha todos os campos com valores válidos!";
        return;
    }

    // Cálculo do IMC
    const imc = peso / (altura * altura);

    // Classificação do IMC
    const classificacao = classificarIMC(imc);

    // Criação do objeto paciente
    const pessoa = {
        id: proximoId++,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    };

    // Armazenamento do paciente
    pessoas.push(pessoa);

    // Atualização da tabela
    montarTabela();

    // Limpar formulário
    formulario.reset();

    // Limpar mensagem
    mensagemErro.textContent = "";
});

// Função para classificar o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau I";
    } else if (imc < 40) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }

}

// Função para montar a tabela
function montarTabela() {

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escaparHTML(pessoa.nome)}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.altura.toFixed(2)} m</td>
            <td>${pessoa.peso.toFixed(1)} kg</td>
            <td>${pessoa.imc.toFixed(2)}</td>
            <td class="status">
                ${pessoa.classificacao}
            </td>
            <td>
                <button
                    class="btn-excluir"
                    data-id="${pessoa.id}"
                >
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);

    });

}

// Protege o conteúdo textual inserido na tabela
function escaparHTML(texto) {

    return texto.replace(/[&<>"']/g, function(caractere) {

        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return caracteres[caractere];

    });

}

// Exclusão de pacientes
tabela.addEventListener("click", function(event) {

    if (event.target.classList.contains("btn-excluir")) {

        const id = Number(event.target.dataset.id);

        pessoas = pessoas.filter(function(pessoa) {
            return pessoa.id !== id;
        });

        montarTabela();

    }

});

// Limpar formulário e mensagens ao cancelar
formulario.addEventListener("reset", function() {
    mensagemErro.textContent = "";
});