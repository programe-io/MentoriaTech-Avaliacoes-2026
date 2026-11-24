function validarDados(nome, peso, altura) {
    if (nome.trim().length < 3) {
        throw new Error("Informe um nome válido!");
    }

    if (peso <= 0 || isNaN(peso)) {
        throw new Error("O peso deve ser maior que zero!");
    }

    if (altura <= 0 || isNaN(altura)) {
        throw new Error("A altura deve ser maior que zero!");
    }
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function obterInformacoesIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo de 18,5: faixa de baixo peso para adultos.";
    } else if (imc < 25) {
        return "Entre 18,5 e 24,9: faixa de peso adequado para adultos.";
    } else if (imc < 30) {
        return "Entre 25 e 29,9: faixa de sobrepeso para adultos.";
    } else if (imc < 35) {
        return "Entre 30 e 34,9: obesidade grau I para adultos.";
    } else if (imc < 40) {
        return "Entre 35 e 39,9: obesidade grau II para adultos.";
    } else {
        return "40 ou mais: obesidade grau III para adultos.";
    }
}

function cadastrarPaciente() {
    try {
        // Receber os dados do paciente
        let nome = prompt("Digite o nome do paciente:");

        let peso = Number(
            prompt("Digite o peso do paciente em kg:").replace(",", ".")
        );

        let altura = Number(
            prompt("Digite a altura do paciente em metros:").replace(",", ".")
        );

        // Validar os dados
        validarDados(nome, peso, altura);

        // Calcular o IMC
        let imc = calcularIMC(peso, altura);

        // Obter informações
        let informacoes = obterInformacoesIMC(imc);

        // Exibir os resultados
        alert(
            "CONTROLE DE IMC\n\n" +
            "Paciente: " + nome +
            "\nPeso: " + peso + " kg" +
            "\nAltura: " + altura + " m" +
            "\nIMC: " + imc.toFixed(2) +
            "\n\nInformações: " + informacoes
        );

        console.log("===== RESULTADO DO PACIENTE =====");
        console.log("Nome:", nome);
        console.log("Peso:", peso, "kg");
        console.log("Altura:", altura, "m");
        console.log("IMC:", imc.toFixed(2));
        console.log("Informações:", informacoes);

    } catch (erro) {
        alert("Erro: " + erro.message);
        console.log("Erro:", erro.message);
    }
}

// Iniciar o programa
cadastrarPaciente();u