
const chavePessoas = "pessoas";

let contadorCodigo = 0;

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");
const mensagemDeErro = document.getElementById("erro");
const tabelaPessoas = document.getElementById("tabela-pessoas");

// Carregar pessoas salvas
function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (dados === null) {
        return [];
    }

    try {
        const lista = JSON.parse(dados);

        if (Array.isArray(lista)) {
            return lista;
        }

        return [];
    } catch (erro) {
        console.error("Erro ao carregar os dados:", erro);
        return [];
    }
}

const pessoas = carregarPessoas();

// Salvar no localStorage
function salvar() {
    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );
}

// Gerar código
function gerarCodigo() {
    return ++contadorCodigo;
}

// Ajustar contador
function ajustarContador() {
    let maior = 0;

    pessoas.forEach(function (pessoa) {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    contadorCodigo = maior;
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
    if (dados.nome.length < 2) {
        return "Informe o nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 e 500 kg.";
    }

    return "";
}

// Mostrar erro
function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

// Limpar erro
function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
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

    salvar();
}

// Calcular IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classificar IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "perigo"
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
            classe: "alerta"
        };
    }

    if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "perigo"
        };
    }

    if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "perigo"
        };
    }

    return {
        texto: "Obesidade grau III",
        classe: "perigo"
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
function criarCelula(valor) {
    const td = document.createElement("td");
    td.textContent = valor;
    return td;
}

// Criar linha
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna classificação
    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Coluna ações
    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");
    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("excluir");

    botaoExcluir.addEventListener("click", function () {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// Renderizar tabela
function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.className = "vazio";
        td.textContent = "Nenhuma pessoa cadastrada ainda";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function (pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

// Excluir pessoa
function excluirPessoa(id) {
    const indice = pessoas.findIndex(function (pessoa) {
        return pessoa.id === id;
    });

    if (indice !== -1) {
        pessoas.splice(indice, 1);
        salvar();
        render();
    }
}

// Enviar formulário
formPessoa.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    adicionarPessoa(dados);

    formPessoa.reset();
    inputNome.focus();

    render();
});

// Limpar mensagens ao cancelar
formPessoa.addEventListener("reset", function () {
    limparErro();
});

// Inicialização
ajustarContador();
render();
