
const formulario = document.getElementById("formulario");
const tabela = document.getElementById("tabela");

// Classificar o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            status: "Abaixo do peso",
            classe: "abaixo"
        };
    } else if (imc < 25) {
        return {
            status: "Peso adequado",
            classe: "normal"
        };
    } else if (imc < 30) {
        return {
            status: "Sobrepeso",
            classe: "sobrepeso"
        };
    } else {
        return {
            status: "Obesidade",
            classe: "obesidade"
        };
    }
}

// Remover classes de classificação anteriores
function limparClasses(elemento) {
    elemento.classList.remove(
        "abaixo",
        "normal",
        "sobrepeso",
        "obesidade"
    );
}

// Cadastrar pessoa e calcular IMC
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    // Validar os dados
    if (nome.length === 0) {
        alert("Informe o nome da pessoa.");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Informe um peso válido.");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Informe uma altura válida.");
        return;
    }

    // Calcular IMC
    const imc = peso / (altura * altura);
    const resultado = classificarIMC(imc);

    // Criar linha da tabela
    const linha = document.createElement("tr");

    const valores = [
        nome,
        peso.toFixed(1),
        altura.toFixed(2),
        imc.toFixed(2),
        resultado.status
    ];

    valores.forEach(function(valor) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        linha.appendChild(celula);
    });

    // Aplicar a cor ao status
    const celulaStatus = linha.lastElementChild;

    limparClasses(celulaStatus);

    // classList.add(): adiciona a classe correspondente
    celulaStatus.classList.add(resultado.classe);

    // Adicionar linha à tabela
    tabela.appendChild(linha);

    // Limpar formulário
    formulario.reset();
});

// classList.toggle(): destacar linha ao clicar
tabela.addEventListener("click", function(evento) {
    const linha = evento.target.closest("tr");

    if (!linha || !tabela.contains(linha)) {
        return;
    }

    linha.classList.toggle("selecionada");
});
