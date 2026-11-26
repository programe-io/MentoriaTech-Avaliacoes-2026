
// ==========================================
// VARIÁVEIS GLOBAIS
// ==========================================

let contadorCodigo = Number(localStorage.getItem("contadorCodigo")) || 0;

let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

let pessoaEditando = null;


// ==========================================
// REFERÊNCIAS HTML
// ==========================================

const formPessoa = document.getElementById("form-pessoa");

const tabelaPessoas = document.getElementById("tabela-pessoas");

const erro = document.getElementById("erro");

const btnSalvar = document.getElementById("btn-salvar");

const btnCancelar = document.getElementById("btn-cancelar");


// ==========================================
// GERAÇÃO DE IDENTIFICADOR
// ==========================================

function gerarCodigo() {
    contadorCodigo++;

    localStorage.setItem("contadorCodigo", contadorCodigo);

    return contadorCodigo;
}


// ==========================================
// FUNÇÕES PARA CRIAR LINHAS E CÉLULAS
// ==========================================

function criarCelula(conteudo) {
    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}


function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    // Nome
    tr.appendChild(criarCelula(pessoa.nome));

    // Idade
    tr.appendChild(criarCelula(pessoa.idade + " anos"));

    // Altura
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));

    // Peso
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));

    // IMC
    tr.appendChild(criarCelula(formatar(pessoa.imc, 2)));

    // Classificação
    const tdClassificacao = document.createElement("td");

    const span = document.createElement("span");

    span.textContent = pessoa.classificacao.texto;

    span.className = "classificacao " + pessoa.classificacao.classe;

    tdClassificacao.appendChild(span);

    tr.appendChild(tdClassificacao);

    // Ações
    const tdAcoes = document.createElement("td");

    const divAcoes = document.createElement("div");

    divAcoes.className = "acoes";

    const btnEditar = document.createElement("button");

    btnEditar.textContent = "Editar";

    btnEditar.className = "btn-editar";

    btnEditar.type = "button";

    btnEditar.dataset.action = "editar";

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";

    btnExcluir.className = "btn-excluir";

    btnExcluir.type = "button";

    btnExcluir.dataset.action = "excluir";

    divAcoes.appendChild(btnEditar);

    divAcoes.appendChild(btnExcluir);

    tdAcoes.appendChild(divAcoes);

    tr.appendChild(tdAcoes);

    return tr;
}


// ==========================================
// FUNÇÃO DE RENDERIZAÇÃO
// ==========================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 7;

        td.className = "vazio";

        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function(pessoa) {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ==========================================
// FUNÇÕES DE NEGÓCIO
// ==========================================

// CALCULAR IMC

function calcularIMC(peso, altura) {

    return peso / (altura * altura);

}


// CLASSIFICAR IMC

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

    } else if (imc < 35) {

        return {
            texto: "Obesidade grau I",
            classe: "obesidade"
        };

    } else if (imc < 40) {

        return {
            texto: "Obesidade grau II",
            classe: "obesidade"
        };

    } else {

        return {
            texto: "Obesidade grau III",
            classe: "obesidade"
        };

    }

}


// FORMATAR VALORES NUMÉRICOS

function formatar(valor, casasDecimais) {

    return valor.toLocaleString("pt-BR", {

        minimumFractionDigits: casasDecimais,

        maximumFractionDigits: casasDecimais

    });

}


// ==========================================
// SALVAR DADOS NO NAVEGADOR
// ==========================================

function salvarLocalStorage() {

    localStorage.setItem("pessoas", JSON.stringify(pessoas));

}


// ==========================================
// LIMPAR FORMULÁRIO
// ==========================================

function limparFormulario() {

    formPessoa.reset();

    pessoaEditando = null;

    btnSalvar.textContent = "Salvar paciente";

    erro.textContent = "";

}


// ==========================================
// CADASTRAR OU EDITAR PACIENTE
// ==========================================

formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    erro.textContent = "";

    const nome = document.getElementById("nome").value.trim();

    const idade = Number(document.getElementById("idade").value);

    const altura = Number(document.getElementById("altura").value);

    const peso = Number(document.getElementById("peso").value);


    // VALIDAÇÕES

    if (!nome || nome.length > 50) {

        erro.textContent = "Informe um nome válido.";

        return;

    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {

        erro.textContent = "Informe uma idade entre 1 e 120 anos.";

        return;

    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {

        erro.textContent = "Informe uma altura entre 0,50 e 2,50 metros.";

        return;

    }

    if (!Number.isFinite(peso) || peso < 1 || peso > 500) {

        erro.textContent = "Informe um peso entre 1 e 500 kg.";

        return;

    }


    // CALCULAR IMC

    const imc = calcularIMC(peso, altura);

    const classificacao = classificarIMC(imc);


    // OBJETO DO PACIENTE

    const pessoa = {

        id: pessoaEditando !== null
            ? pessoaEditando
            : gerarCodigo(),

        nome: nome,

        idade: idade,

        altura: altura,

        peso: peso,

        imc: imc,

        classificacao: classificacao

    };


    // VERIFICAR SE É CADASTRO OU EDIÇÃO

    if (pessoaEditando !== null) {

        const indice = pessoas.findIndex(function(item) {

            return item.id === pessoaEditando;

        });

        if (indice !== -1) {

            pessoas[indice] = pessoa;

        }

    } else {

        pessoas.push(pessoa);

    }


    salvarLocalStorage();

    render();

    limparFormulario();

});


// ==========================================
// BOTÃO CANCELAR
// ==========================================

btnCancelar.addEventListener("click", function() {

    limparFormulario();

});


// ==========================================
// EDITAR E EXCLUIR PACIENTES
// ==========================================

tabelaPessoas.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const linha = botao.closest("tr");

    if (!linha) return;

    const id = Number(linha.dataset.id);

    const pessoa = pessoas.find(function(item) {

        return item.id === id;

    });

    if (!pessoa) return;


    // EDITAR

    if (botao.dataset.action === "editar") {

        document.getElementById("nome").value = pessoa.nome;

        document.getElementById("idade").value = pessoa.idade;

        document.getElementById("altura").value = pessoa.altura;

        document.getElementById("peso").value = pessoa.peso;

        pessoaEditando = pessoa.id;

        btnSalvar.textContent = "Atualizar paciente";

        erro.textContent = "";

        document.getElementById("nome").focus();

    }


    // EXCLUIR

    if (botao.dataset.action === "excluir") {

        const confirmar = confirm(
            "Deseja realmente excluir o paciente " + pessoa.nome + "?"
        );

        if (confirmar) {

            pessoas = pessoas.filter(function(item) {

                return item.id !== id;

            });

            if (pessoaEditando === id) {

                limparFormulario();

            }

            salvarLocalStorage();

            render();

        }

    }

});


// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================

// Garante que o próximo ID não seja repetido
// mesmo quando os dados forem carregados.

const maiorId = pessoas.reduce(function(maior, pessoa) {

    return Math.max(maior, pessoa.id);

}, 0);

contadorCodigo = Math.max(contadorCodigo, maiorId);

localStorage.setItem("contadorCodigo", contadorCodigo);

// Exibir pacientes ao abrir a página

render();
