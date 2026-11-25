
let pessoas = JSON.parse(
    localStorage.getItem("pessoasIMC")
) || [];

const formulario = document.getElementById("formulario");
const lista = document.getElementById("listaPessoas");

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "magreza"
        };
    }

    if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}

// Salva os dados
function salvarDados() {
    localStorage.setItem(
        "pessoasIMC",
        JSON.stringify(pessoas)
    );
}

// Mostra as pessoas cadastradas
function mostrarPessoas() {

    lista.innerHTML = "";

    if (pessoas.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhuma pessoa cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    pessoas.forEach((pessoa, index) => {

        const classificacao = classificarIMC(pessoa.imc);

        const linha = document.createElement("tr");

        const dados = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            pessoa.imc.toFixed(1)
        ];

        dados.forEach(valor => {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaClassificacao = document.createElement("td");

        const etiqueta = document.createElement("span");
        etiqueta.className = `classificacao ${classificacao.classe}`;
        etiqueta.textContent = classificacao.texto;

        celulaClassificacao.appendChild(etiqueta);
        linha.appendChild(celulaClassificacao);

        const celulaAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "excluir";

        botaoExcluir.addEventListener("click", () => {
            excluirPessoa(index);
        });

        celulaAcao.appendChild(botaoExcluir);
        linha.appendChild(celulaAcao);

        lista.appendChild(linha);

    });
}

// Cadastra uma nova pessoa
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade <= 0 || altura <= 0 || peso <= 0) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const imc = calcularIMC(peso, altura);

    const novaPessoa = {
        nome,
        idade,
        altura,
        peso,
        imc
    };

    pessoas.push(novaPessoa);

    salvarDados();
    mostrarPessoas();

    formulario.reset();

    alert("Pessoa cadastrada com sucesso!");

});

// Exclui uma pessoa
function excluirPessoa(index) {

    if (confirm("Deseja realmente excluir esta pessoa?")) {

        pessoas.splice(index, 1);

        salvarDados();
        mostrarPessoas();

    }
}

// Carrega os cadastros ao abrir a página
mostrarPessoas();
