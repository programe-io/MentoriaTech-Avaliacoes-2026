
let contadorCodigo = 0;

const CHAVE_PESSOAS = "pessoas";

let pessoas = [];

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");
const mensagemErro = document.getElementById("erro");

// Verificar elementos HTML
if (
    !tabelaPessoas ||
    !formPessoa ||
    !inputNome ||
    !inputIdade ||
    !inputAltura ||
    !inputPeso ||
    !mensagemErro
) {
    throw new Error("Verifique os IDs dos elementos no HTML.");
}

// Gerar código
function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
}

// Ler formulário
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

// Validar dados
function validarDados(dados) {

    if (!dados.nome || dados.nome.length < 2) {
        return "Informe um nome com no mínimo 2 letras.";
    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {
        return "A idade deve ser entre 1 e 120 anos.";
    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}

// Adicionar pessoa
function adicionarPessoa(dados) {

    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });
}

// Mostrar erro
function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

// Limpar erro
function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}

// Calcular IMC
function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarImc(imc) {

    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "abaixo"
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

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "obesidade"
    };
}

// Formatar números
function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Criar célula
function criarCelula(texto) {

    const td = document.createElement("td");

    td.textContent = texto;

    return td;
}

// Criar linha da tabela
function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularImc(pessoa.peso, pessoa.altura);

    const classificacao = classificarImc(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    return tr;
}

// Salvar pessoas
function salvarPessoas() {

    try {

        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );

        return true;

    } catch (erro) {

        console.error("Erro ao salvar pessoas:", erro);

        mostrarErro("Não foi possível salvar os dados.");

        return false;
    }
}

// Validar pessoa carregada
function pessoaValida(pessoa) {

    return (
        pessoa !== null &&
        typeof pessoa === "object" &&
        Number.isInteger(pessoa.id) &&
        pessoa.id > 0 &&
        typeof pessoa.nome === "string" &&
        pessoa.nome.trim().length >= 2 &&
        Number.isInteger(pessoa.idade) &&
        pessoa.idade >= 1 &&
        pessoa.idade <= 120 &&
        Number.isFinite(pessoa.altura) &&
        pessoa.altura >= 0.5 &&
        pessoa.altura <= 2.5 &&
        Number.isFinite(pessoa.peso) &&
        pessoa.peso >= 2 &&
        pessoa.peso <= 500
    );
}

// Carregar pessoas
function carregarPessoas() {

    try {

        const texto = localStorage.getItem(CHAVE_PESSOAS);

        if (texto === null) {
            return [];
        }

        const dados = JSON.parse(texto);

        if (!Array.isArray(dados)) {
            return [];
        }

        return dados.filter(pessoaValida);

    } catch (erro) {

        console.error("Erro ao carregar pessoas:", erro);

        return [];
    }
}

// Ajustar contador
function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach((pessoa) => {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    contadorCodigo = maior;
}

// Renderizar tabela
function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 6;

        td.classList.add("vazio");

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach((pessoa) => {

        tabelaPessoas.appendChild(criarLinha(pessoa));

    });
}

// Evento do formulário
formPessoa.addEventListener("submit", (e) => {

    e.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {

        mostrarErro(erro);

        return;
    }

    limparErro();

    adicionarPessoa(dados);

    const salvo = salvarPessoas();

    if (!salvo) {

        pessoas.pop();

        contadorCodigo--;

        render();

        return;
    }

    formPessoa.reset();

    inputNome.focus();

    render();
});

// Inicialização
pessoas = carregarPessoas();

ajustarContadorCodigo();

render();
