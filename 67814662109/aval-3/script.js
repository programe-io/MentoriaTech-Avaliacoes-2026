
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ficha de Anamnese</title>

    <style>
        * {
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f1f5f9;
            margin: 0;
            padding: 30px;
            color: #1e293b;
        }

        .container {
            max-width: 1100px;
            margin: auto;
            background: white;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 15px #00000015;
        }

        h1, h2 {
            text-align: center;
            color: #2563eb;
        }

        form {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
        }

        label {
            font-weight: bold;
            display: block;
            margin-bottom: 6px;
        }

        input {
            width: 100%;
            padding: 12px;
            border: 1px solid #cbd5e1;
            border-radius: 6px;
            font-size: 16px;
        }

        button {
            padding: 12px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            color: white;
        }

        .salvar {
            background: #2563eb;
            grid-column: span 2;
        }

        .salvar:hover {
            background: #1d4ed8;
        }

        .apagar {
            background: #dc2626;
            padding: 7px 10px;
        }

        #erro {
            color: #dc2626;
            background: #fee2e2;
            padding: 12px;
            border-radius: 6px;
            margin-top: 15px;
        }

        .tabela-container {
            overflow-x: auto;
            margin-top: 30px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            min-width: 750px;
        }

        th, td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
            text-align: center;
        }

        th {
            background: #2563eb;
            color: white;
        }

        tr:hover {
            background: #f8fafc;
        }

        .selo {
            padding: 6px 10px;
            border-radius: 15px;
            font-size: 12px;
            font-weight: bold;
        }

        .normal {
            background: #dcfce7;
            color: #166534;
        }

        .sobrepeso {
            background: #fef3c7;
            color: #92400e;
        }

        .obesidade {
            background: #fee2e2;
            color: #991b1b;
        }

        .abaixo {
            background: #dbeafe;
            color: #1e40af;
        }

        @media (max-width: 600px) {
            body {
                padding: 10px;
            }

            .container {
                padding: 15px;
            }

            form {
                grid-template-columns: 1fr;
            }

            .salvar {
                grid-column: span 1;
            }
        }
    </style>
</head>

<body>

<div class="container">

    <h1>Ficha de Anamnese</h1>

    <h2>Cadastro de Pacientes</h2>

    <form id="formPessoa">

        <div>
            <label for="nome">Nome:</label>
            <input type="text" id="nome" placeholder="Digite o nome">
        </div>

        <div>
            <label for="idade">Idade:</label>
            <input type="number" id="idade" placeholder="Digite a idade">
        </div>

        <div>
            <label for="altura">Altura (m):</label>
            <input type="number" id="altura" step="0.01"
                placeholder="Ex: 1.70">
        </div>

        <div>
            <label for="peso">Peso (kg):</label>
            <input type="number" id="peso" step="0.1"
                placeholder="Ex: 65">
        </div>

        <button type="submit" class="salvar">
            Salvar Paciente
        </button>

    </form>

    <p id="erro" hidden></p>

    <h2>Pacientes Cadastrados</h2>

    <div class="tabela-container">

        <table>

            <thead>
                <tr>
                    <th>Código</th>
                    <th>Nome</th>
                    <th>Idade</th>
                    <th>Altura</th>
                    <th>Peso</th>
                    <th>IMC</th>
                    <th>Classificação</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody id="tabelaPessoas">
            </tbody>

        </table>

    </div>

</div>

<script>

// =====================================
// 1. REFERÊNCIAS DO HTML
// =====================================

const formPessoa = document.getElementById("formPessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabelaPessoas");
const mensagemDeErro = document.getElementById("erro");


// =====================================
// 2. VARIÁVEIS DO SISTEMA
// =====================================

const chavePessoas = "pessoas";

let proximoId = 1;


// =====================================
// 3. FUNÇÃO PARA CALCULAR IMC
// =====================================

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// =====================================
// 4. FUNÇÃO PARA CLASSIFICAR IMC
// =====================================

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


// =====================================
// 5. FUNÇÃO PARA FORMATAR VALORES
// =====================================

function formatar(valor, casas) {

    return Number(valor).toFixed(casas);

}


// =====================================
// 6. FUNÇÃO PARA CRIAR LINHA
// =====================================

function criarLinha(pessoa) {

    const linha = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);

    const classificacao = classificarIMC(imc);

    function criarCelula(conteudo) {

        const td = document.createElement("td");

        td.textContent = conteudo;

        linha.appendChild(td);

        return td;
    }

    criarCelula(pessoa.id);
    criarCelula(pessoa.nome);
    criarCelula(pessoa.idade);
    criarCelula(formatar(pessoa.altura, 2) + " m");
    criarCelula(formatar(pessoa.peso, 1) + " kg");
    criarCelula(formatar(imc, 1));

    // Coluna de classificação

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    linha.appendChild(tdClassificacao);

    // Botão para apagar paciente

    const tdAcao = document.createElement("td");

    const botaoApagar = document.createElement("button");

    botaoApagar.textContent = "Apagar";

    botaoApagar.classList.add("apagar");

    botaoApagar.addEventListener("click", function() {

        apagarPessoa(pessoa.id);

    });

    tdAcao.appendChild(botaoApagar);

    linha.appendChild(tdAcao);

    return linha;

}


// =====================================
// 7. FUNÇÃO RENDER
// =====================================

function render() {

    tabelaPessoas.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });

}


// =====================================
// 8. CAPTURAR DADOS DO FORMULÁRIO
// =====================================

function lerFormulario() {

    return {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

}


// =====================================
// 9. VALIDAR DADOS
// =====================================

function validarDados(dados) {

    if (dados.nome.length < 2) {

        return "Informe o nome com no mínimo duas letras.";

    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120) {

        return "A idade deve ser um número inteiro entre 1 e 120.";

    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5) {

        return "A altura deve estar entre 0,5 e 2,5 metros.";

    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500) {

        return "O peso deve estar entre 2 e 500 kg.";

    }

    return "";

}


// =====================================
// 10. MOSTRAR MENSAGEM DE ERRO
// =====================================

function mostrarErro(mensagem) {

    mensagemDeErro.textContent = mensagem;

    mensagemDeErro.hidden = false;

}


// =====================================
// 11. LIMPAR MENSAGEM DE ERRO
// =====================================

function limparErro() {

    mensagemDeErro.textContent = "";

    mensagemDeErro.hidden = true;

}


// =====================================
// 12. ADICIONAR PESSOA
// =====================================

function adicionarPessoa(dados) {

    const novaPessoa = {

        id: proximoId++,

        nome: dados.nome,

        idade: dados.idade,

        altura: dados.altura,

        peso: dados.peso

    };

    pessoas.push(novaPessoa);

}


// =====================================
// 13. SALVAR NO LOCALSTORAGE
// =====================================

function salvar() {

    localStorage.setItem(

        chavePessoas,

        JSON.stringify(pessoas)

    );

}


// =====================================
// 14. CARREGAR PESSOAS SALVAS
// =====================================

function carregarPessoas() {

    const dadosSalvos = localStorage.getItem(chavePessoas);

    if (dadosSalvos === null) {

        return [];

    }

    try {

        const dados = JSON.parse(dadosSalvos);

        if (Array.isArray(dados)) {

            return dados.filter(function(pessoa) {

                return pessoa &&
                    Number.isInteger(pessoa.id) &&
                    typeof pessoa.nome === "string" &&
                    Number.isInteger(pessoa.idade) &&
                    Number.isFinite(pessoa.altura) &&
                    Number.isFinite(pessoa.peso) &&
                    pessoa.altura > 0 &&
                    pessoa.peso > 0;

            });

        }

        return [];

    } catch (erro) {

        console.error("Erro ao carregar os dados:", erro);

        return [];

    }

}


// =====================================
// 15. AJUSTAR CONTADOR DE CÓDIGO
// =====================================

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (pessoa.id > maior) {

            maior = pessoa.id;

        }

    });

    proximoId = maior + 1;

}


// =====================================
// 16. APAGAR PESSOA
// =====================================

function apagarPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {

        return pessoa.id !== id;

    });

    salvar();

    render();

}


// =====================================
// 17. EVENTO DE ENVIO DO FORMULÁRIO
// =====================================

formPessoa.addEventListener("submit", function(e) {

    e.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;

    }

    limparErro();

    adicionarPessoa(dados);

    salvar();

    render();

    formPessoa.reset();

    inputNome.focus();

});


// =====================================
// 18. INICIALIZAÇÃO DA APLICAÇÃO
// =====================================

let pessoas = carregarPessoas();

ajustarContador();

render();

</script>

</body>
</html>
