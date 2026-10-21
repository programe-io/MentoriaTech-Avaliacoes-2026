
const form = document.getElementById("formPessoa");
const listaPessoas = document.getElementById("listaPessoas");
const mensagem = document.getElementById("mensagem");

const pessoas = [];

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function obterStatus(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
        };
    } else if (imc < 25) {
        return {
            texto: "Peso normal",
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

function listarPessoas() {
    listaPessoas.replaceChildren();

    pessoas.forEach(pessoa => {
        const linha = document.createElement("tr");

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const resultado = obterStatus(imc);

        const dados = [
            pessoa.nome,
            pessoa.peso.toFixed(1),
            pessoa.altura.toFixed(2),
            imc.toFixed(2)
        ];

        dados.forEach(dado => {
            const celula = document.createElement("td");
            celula.textContent = dado;
            linha.appendChild(celula);
        });

        const celulaStatus = document.createElement("td");
        celulaStatus.textContent = resultado.texto;

        // Remove classes antigas, se existirem.
        celulaStatus.classList.remove(
            "abaixo",
            "normal",
            "sobrepeso",
            "obesidade"
        );

        // Adiciona a classe correspondente ao resultado.
        celulaStatus.classList.add(resultado.classe);

        // Demonstra o uso do toggle.
        // A classe temporaria será adicionada e removida.
        celulaStatus.classList.toggle("destaque");
        celulaStatus.classList.toggle("destaque");

        linha.appendChild(celulaStatus);
        listaPessoas.appendChild(linha);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (
        nome === "" ||
        !Number.isFinite(peso) || peso <= 0 ||
        !Number.isFinite(altura) || altura <= 0
    ) {
        mensagem.textContent = "Preencha os dados corretamente.";
        return;
    }

    pessoas.push({
        nome: nome,
        peso: peso,
        altura: altura
    });

    listarPessoas();
    form.reset();

    mensagem.textContent = "Pessoa adicionada com sucesso!";
});
