

// ======================================
// CONTROLE DE IMC
// ======================================


// Capturando os elementos do HTML

const formulario = document.getElementById("formIMC");

const campoNome = document.getElementById("nome");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");

const resultado = document.getElementById("resultado");

const dadosPaciente = document.getElementById("dadosPaciente");
const valorIMC = document.getElementById("valorIMC");
const classificacaoIMC = document.getElementById("classificacaoIMC");
const mensagem = document.getElementById("mensagem");

const listaHistorico = document.getElementById("listaHistorico");


// Lista para armazenar as avaliações durante o uso

let historico = [];


// ======================================
// FUNÇÃO PARA CALCULAR O IMC
// ======================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// ======================================
// FUNÇÃO PARA CLASSIFICAR O IMC
// ======================================

function classificarIMC(imc) {

    if (imc < 18.5) {

        return {
            classificacao: "Abaixo do peso",
            mensagem: "O resultado está abaixo da faixa de referência para adultos."
        };

    } else if (imc < 25) {

        return {
            classificacao: "Peso normal",
            mensagem: "O resultado está dentro da faixa de referência para adultos."
        };

    } else if (imc < 30) {

        return {
            classificacao: "Sobrepeso",
            mensagem: "O resultado está acima da faixa de referência para adultos."
        };

    } else if (imc < 35) {

        return {
            classificacao: "Obesidade grau I",
            mensagem: "O resultado indica obesidade grau I."
        };

    } else if (imc < 40) {

        return {
            classificacao: "Obesidade grau II",
            mensagem: "O resultado indica obesidade grau II."
        };

    } else {

        return {
            classificacao: "Obesidade grau III",
            mensagem: "O resultado indica obesidade grau III."
        };

    }

}


// ======================================
// FUNÇÃO PARA EXIBIR O RESULTADO
// ======================================

function exibirResultado(nome, peso, altura, imc, dados) {

    resultado.hidden = false;

    dadosPaciente.innerHTML = "";

    const informacoes = [
        ["Paciente: ", nome],
        ["Peso: ", peso.toFixed(1) + " kg"],
        ["Altura: ", altura.toFixed(2) + " m"]
    ];

    informacoes.forEach(([rotulo, valor]) => {

        const paragrafo = document.createElement("p");
        const destaque = document.createElement("strong");

        destaque.textContent = rotulo;

        paragrafo.appendChild(destaque);
        paragrafo.appendChild(document.createTextNode(valor));

        dadosPaciente.appendChild(paragrafo);

    });

    valorIMC.textContent = imc.toFixed(2);

    classificacaoIMC.textContent = dados.classificacao;

    mensagem.textContent = dados.mensagem;

}


// ======================================
// FUNÇÃO PARA ADICIONAR AO HISTÓRICO
// ======================================

function adicionarHistorico(nome, peso, altura, imc, classificacao) {

    const paciente = {
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        classificacao: classificacao
    };

    historico.push(paciente);

    atualizarHistorico();

}


// ======================================
// FUNÇÃO PARA ATUALIZAR O HISTÓRICO
// ======================================

function atualizarHistorico() {

    listaHistorico.innerHTML = "";

    if (historico.length === 0) {

        listaHistorico.textContent = "Nenhuma avaliação realizada.";

        return;

    }

    historico.forEach((paciente, indice) => {

        const item = document.createElement("div");

        item.className = "item-historico";

        const titulo = document.createElement("strong");

        titulo.textContent = `${indice + 1}. ${paciente.nome}`;

        const detalhes = document.createElement("p");

        detalhes.textContent =
            `Peso: ${paciente.peso} kg | ` +
            `Altura: ${paciente.altura} m | ` +
            `IMC: ${paciente.imc.toFixed(2)}`;

        const classificacao = document.createElement("p");

        classificacao.textContent =
            "Classificação: " + paciente.classificacao;

        item.appendChild(titulo);
        item.appendChild(detalhes);
        item.appendChild(classificacao);

        listaHistorico.appendChild(item);

    });

}


// ======================================
// EVENTO DO FORMULÁRIO
// ======================================

formulario.addEventListener("submit", function(event) {

    // Impede que a página seja recarregada

    event.preventDefault();


    // Recebe os dados digitados

    const nome = campoNome.value.trim();

    const peso = Number(campoPeso.value);

    const altura = Number(campoAltura.value);


    // Validação dos dados

    if (nome === "") {

        alert("Digite o nome do paciente!");

        campoNome.focus();

        return;

    }

    if (!Number.isFinite(peso) || peso <= 0 || peso > 500) {

        alert("Digite um peso válido!");

        campoPeso.focus();

        return;

    }

    if (!Number.isFinite(altura) || altura <= 0 || altura > 2.5) {

        alert("Digite uma altura válida!");

        campoAltura.focus();

        return;

    }


    // Realiza o cálculo

    const imc = calcularIMC(peso, altura);


    // Identifica a classificação

    const dados = classificarIMC(imc);


    // Mostra o resultado na tela

    exibirResultado(nome, peso, altura, imc, dados);


    // Salva no histórico

    adicionarHistorico(
        nome,
        peso,
        altura,
        imc,
        dados.classificacao
    );

});


// ======================================
// EVENTO DO BOTÃO LIMPAR
// ======================================

formulario.addEventListener("reset", function() {

    resultado.hidden = true;

});


// ======================================
// FIM DO PROJETO
// ======================================
