
// Lista de pacientes
let pessoas = [];

// Contador de identificadores
let contador = 0;

// Referências do HTML
const tabelaPessoas = document.getElementById("tabela-pessoas");
const formulario = document.getElementById("form-pessoa");
const mensagemErro = document.getElementById("erro");

// Gera identificador automático
function gerarCodigo() {
    contador++;
    return contador;
}

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return {
            texto: "Abaixo do peso",
            classe: "alerta"
        };
    } else if (imc < 25) {
        return {
            texto: "Peso normal",
            classe: "normal"
        };
    } else if (imc < 30) {
        return {
            texto: "Sobrepeso",
            classe: "alerta"
        };
    } else if (imc < 35) {
        return {
            texto: "Obesidade grau I",
            classe: "alerta"
        };
    } else if (imc < 40) {
        return {
            texto: "Obesidade grau II",
            classe: "alerta"
        };
    } else {
        return {
            texto: "Obesidade grau III",
            classe: "alerta"
        };
    }
}

// Formata valores numéricos
function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// Cria uma célula da tabela
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

// Cria uma linha da tabela
function criarLinha(pessoa) {
    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura)));
    tr.appendChild(criarCelula(formatar(pessoa.peso)));
    tr.appendChild(criarCelula(formatar(pessoa.imc)));

    const classificacao = document.createElement("td");
    classificacao.textContent = pessoa.classificacao.texto;
    classificacao.className = pessoa.classificacao.classe;

    tr.appendChild(classificacao);

    // Botão excluir
    const tdAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "excluir";

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

// Atualiza a tabela
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

    pessoas.forEach(function(pessoa) {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

// Exclui um paciente
function excluirPessoa(id) {
    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    render();
}

// Salva os dados do formulário
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    mensagemErro.textContent = "";

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    // Validação
    if (!nome || !idade || !altura || !peso ||
        idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 1 || peso > 500) {

        mensagemErro.textContent =
            "Preencha todos os campos com valores válidos.";

        return;
    }

    // Cálculos
    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    // Criação do paciente
    const pessoa = {
        id: gerarCodigo(),
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso,
        imc: imc,
        classificacao: classificacao
    };

    // Adiciona à lista
    pessoas.push(pessoa);

    // Atualiza a tela
    render();

    // Limpa o formulário
    formulario.reset();
});

// Limpa mensagem ao cancelar
formulario.addEventListener("reset", function() {
    mensagemErro.textContent = "";
});

// Exibe a tabela inicialmente
render();
