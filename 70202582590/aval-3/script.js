
let codigo = 0;

const chavePessoas = "pessoas";

const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const mensagemDeErro = document.getElementById("erro");
const botaoCancelar = document.getElementById("cancelar");

function gerarCodigo() {
    codigo++;
    return codigo;
}

function carregarPessoas() {
    const dados = localStorage.getItem(chavePessoas);

    if (!dados) {
        return [];
    }

    try {
        const pessoasSalvas = JSON.parse(dados);

        if (Array.isArray(pessoasSalvas)) {
            return pessoasSalvas;
        }

        return [];
    } catch (erro) {
        return [];
    }
}

let pessoas = carregarPessoas();

function salvar() {
    localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function ajustarCodigo() {
    let maior = 0;

    pessoas.forEach(function(pessoa) {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    codigo = maior;
}

function criarCelula(conteudo) {
    const td = document.createElement("td");
    td.textContent = conteudo;

    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

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

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.classList.add("btn-excluir");
    botaoExcluir.type = "button";
    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

function render() {
    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = document.createElement("td");

        td.colSpan = 7;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
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

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

function validarDados(dados) {
    if (dados.nome.length < 2) {
        return "Informe um nome com no mínimo duas letras.";
    }

    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (!Number.isFinite(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
        return "A altura deve estar entre 0,5 m e 2,5 m.";
    }

    if (!Number.isFinite(dados.peso) || dados.peso < 2 || dados.peso > 500) {
        return "O peso deve estar entre 2 kg e 500 kg.";
    }

    return "";
}

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

function adicionarPessoa(dados) {
    const pessoa = {
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };

    pessoas.push(pessoa);
}

function excluirPessoa(id) {
    const confirmar = window.confirm("Deseja realmente excluir este paciente?");

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvar();
    render();
}

formPessoa.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = lerFormulario();

    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    limparErro();

    adicionarPessoa(dados);

    salvar();

    formPessoa.reset();

    inputNome.focus();

    render();
});

botaoCancelar.addEventListener("click", function() {
    formPessoa.reset();
    limparErro();
    inputNome.focus();
});

ajustarCodigo();

render();
