
const pessoas = [];

function adicionarPessoa() {
    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);
    const mensagem = document.getElementById("mensagem");

    if (
        nome === "" ||
        document.getElementById("peso").value === "" ||
        document.getElementById("altura").value === ""
    ) {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    if (
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        peso <= 0 ||
        altura <= 0
    ) {
        mensagem.textContent = "Informe peso e altura válidos!";
        return;
    }

    // Fórmula do IMC: peso dividido pela altura ao quadrado
    const imc = peso / (altura * altura);

    let status;
    let classe;

    if (imc < 18.5) {
        status = "Abaixo do peso";
        classe = "abaixo";
    } else if (imc < 25) {
        status = "Peso normal";
        classe = "normal";
    } else if (imc < 30) {
        status = "Sobrepeso";
        classe = "sobrepeso";
    } else {
        status = "Obesidade";
        classe = "obesidade";
    }

    pessoas.push({
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc,
        status: status,
        classe: classe
    });

    mensagem.textContent = "IMC calculado com sucesso! 💗";

    document.getElementById("nome").value = "";
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    listarPessoas();
}

function listarPessoas() {
    const tabela = document.getElementById("tabela");
    tabela.replaceChildren();

    for (const pessoa of pessoas) {
        const linha = document.createElement("tr");

        const dados = [
            pessoa.nome,
            pessoa.peso.toFixed(1),
            pessoa.altura.toFixed(2),
            pessoa.imc.toFixed(2),
            pessoa.status
        ];

        for (let i = 0; i < dados.length; i++) {
            const celula = document.createElement("td");
            celula.textContent = dados[i];

            if (i === 4) {
                celula.classList.add(pessoa.classe);
            }

            linha.appendChild(celula);
        }

        tabela.appendChild(linha);
    }
}
