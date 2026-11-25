?variant="standard" id="58321" title="Código app.js"}
```javascript
// Lista de pessoas cadastradas
let pessoas = [];
let pessoaEditando = null;

// Elementos do HTML
const formulario = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tabela = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

const tituloForm = document.getElementById("titulo-form");
const botaoSalvar = document.getElementById("btn-salvar");
const botaoCancelar = document.getElementById("btn-cancelar");

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarIMC(imc) {
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

// Mostrar pessoas na tabela
function mostrarPessoas() {
    tabela.innerHTML = "";

    if (pessoas.length === 0) {
        tabela.innerHTML = `
            <tr>
                <td colspan="7" class="vazio">
                    Nenhuma pessoa cadastrada.
                </td>
            </tr>
        `;
        return;
    }

    pessoas.forEach((pessoa, indice) => {
        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${pessoa.nome}</td>
            <td>${pessoa.idade}</td>
            <td>${pessoa.altura.toFixed(2)} m</td>
            <td>${pessoa.peso.toFixed(1)} kg</td>
            <td>${imc.toFixed(2)}</td>
            <td>
                <span class="selo ${classificacao.classe}">
                    ${classificacao.texto}
                </span>
            </td>
            <td class="acoes">
                <button onclick="editarPessoa(${indice})">
                    Editar
                </button>

                <button class="remover" onclick="excluirPessoa(${indice})">
                    Excluir
                </button>
            </td>
        `;

        tabela.appendChild(linha);
    });
}

// Exibir erro
function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

// Limpar erro
function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}

// Limpar formulário
function limparFormulario() {
    formulario.reset();
    pessoaEditando = null;

    tituloForm.textContent = "Nova pessoa";
    botaoSalvar.textContent = "Salvar";
    botaoCancelar.hidden = true;

    limparErro();
}

// Cadastrar ou atualizar pessoa
formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    // Validar informações
    if (!nome || !inputIdade.value || !inputAltura.value || !inputPeso.value) {
        mostrarErro("Preencha todos os campos!");
        return;
    }

    if (idade < 1 || idade > 120 || !Number.isInteger(idade)) {
        mostrarErro("Informe uma idade válida.");
        return;
    }

    if (altura < 0.5 || altura > 2.5) {
        mostrarErro("Informe uma altura válida.");
        return;
    }

    if (peso < 2 || peso > 500) {
        mostrarErro("Informe um peso válido.");
        return;
    }

    const pessoa = {
        nome,
        idade,
        altura,
        peso
    };

    if (pessoaEditando === null) {
        pessoas.push(pessoa);
    } else {
        pessoas[pessoaEditando] = pessoa;
    }

    mostrarPessoas();
    limparFormulario();
});

// Editar pessoa
function editarPessoa(indice) {
    const pessoa = pessoas[indice];

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    pessoaEditando = indice;

    tituloForm.textContent = "Editar pessoa";
    botaoSalvar.textContent = "Atualizar";
    botaoCancelar.hidden = false;

    limparErro();
}

// Excluir pessoa
function excluirPessoa(indice) {
    if (confirm("Deseja realmente excluir esta pessoa?")) {
        pessoas.splice(indice, 1);

        if (pessoaEditando === indice) {
            limparFormulario();
        }

        mostrarPessoas();
    }
}

// Botão cancelar
botaoCancelar.addEventListener("click", function() {
    limparFormulario();
});

// Mostrar tabela inicialmente
mostrarPessoas();
```