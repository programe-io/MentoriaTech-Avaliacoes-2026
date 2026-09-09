// Selecionando os elementos do HTML

const nomeInput = document.getElementById("nome");
const pesoInput = document.getElementById("peso");
const alturaInput = document.getElementById("altura");

const btnAdicionar = document.getElementById("btnAdicionar");

const tabelaCorpo = document.getElementById("tabelaCorpo");
const mensagemVazia = document.getElementById("mensagemVazia");


// Array que armazenará as pessoas

let pessoas = [];


// Função para calcular o IMC

function calcularIMC(peso, altura) {

    const imc = peso / (altura * altura);

    return imc;
}


// Função para descobrir a situação da pessoa

function verificarSituacao(imc) {

    if (imc < 18.5) {

        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };

    } else if (imc < 25) {

        return {
            texto: "Normal",
            classe: "normal"
        };

    } else if (imc < 30) {

        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };

    } else {

        return {
            texto: "Obesidade",
            classe: "obesidade"
        };

    }
}


// Função para mostrar as pessoas na tabela

function mostrarTabela() {

    tabelaCorpo.innerHTML = "";

    if (pessoas.length === 0) {

        mensagemVazia.style.display = "block";

        return;

    }

    mensagemVazia.style.display = "none";


    pessoas.forEach(function(pessoa, index) {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pessoa.nome}</td>

            <td>${pessoa.peso.toFixed(1)} kg</td>

            <td>${pessoa.altura.toFixed(2)} m</td>

            <td>${pessoa.imc.toFixed(1)}</td>

            <td>
                <span class="status ${pessoa.classe}">
                    ${pessoa.situacao}
                </span>
            </td>

            <td>
                <button
                    class="btn-excluir"
                    onclick="excluirPessoa(${index})"
                >
                    Excluir
                </button>
            </td>
        `;

        tabelaCorpo.appendChild(linha);

    });

}


// Função para adicionar uma pessoa

function adicionarPessoa() {

    const nome = nomeInput.value.trim();

    const peso = Number(pesoInput.value);

    const altura = Number(alturaInput.value);


    // Verificando os dados

    if (nome === "") {

        alert("Digite o nome da pessoa.");

        nomeInput.focus();

        return;
    }


    if (peso <= 0 || altura <= 0) {

        alert("Digite um peso e uma altura válidos.");

        return;
    }


    // Calculando o IMC

    const imc = calcularIMC(peso, altura);


    // Descobrindo a situação

    const resultado = verificarSituacao(imc);


    // Criando o objeto da pessoa

    const pessoa = {

        nome: nome,

        peso: peso,

        altura: altura,

        imc: imc,

        situacao: resultado.texto,

        classe: resultado.classe

    };


    // Adicionando ao array

    pessoas.push(pessoa);


    // Atualizando a tabela

    mostrarTabela();


    // Limpando os campos

    nomeInput.value = "";
    pesoInput.value = "";
    alturaInput.value = "";

    nomeInput.focus();

}


// Função para excluir uma pessoa

function excluirPessoa(index) {

    pessoas.splice(index, 1);

    mostrarTabela();

}


// Evento do botão

btnAdicionar.addEventListener("click", adicionarPessoa);


// Permitir adicionar pressionando Enter

nomeInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});

pesoInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});

alturaInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        adicionarPessoa();
    }

});


// Dados de exemplo iguais à ideia da imagem

pessoas.push({
    nome: "João",
    peso: 72,
    altura: 1.65,
    imc: calcularIMC(72, 1.65),
    situacao: verificarSituacao(calcularIMC(72, 1.65)).texto,
    classe: verificarSituacao(calcularIMC(72, 1.65)).classe
});

pessoas.push({
    nome: "João 2",
    peso: 65,
    altura: 1.68,
    imc: calcularIMC(65, 1.68),
    situacao: verificarSituacao(calcularIMC(65, 1.68)).texto,
    classe: verificarSituacao(calcularIMC(65, 1.68)).classe
});


// Exibir os dados iniciais

mostrarTabela();
