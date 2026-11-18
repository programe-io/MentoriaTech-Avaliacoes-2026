
// ========================================
// 1. VARIÁVEIS E REFERÊNCIAS
// ========================================

const chavePessoas = "pessoas";

let codigo = 0;

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");


// ========================================
// 2. GERAÇÃO DE IDENTIFICADORES
// ========================================

function gerarCodigo() {
    codigo++;
    return codigo;
}


// ========================================
// 3. FUNÇÕES DE CÁLCULO DO IMC
// ========================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}


// ========================================
// 4. CLASSIFICAÇÃO DO IMC
// ========================================

function classificarIMC(imc, idade) {

    // Para menores de 18 anos, a avaliação
    // depende de idade e sexo, não apenas
    // das faixas adultas de IMC.

    if (idade < 18) {
        return {
            texto: "Avaliação por idade",
            classe: "info"
        };
    }

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


// ========================================
// 5. FORMATAÇÃO NUMÉRICA
// ========================================

function formatar(valor, casas = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}


// ========================================
// 6. LEITURA DO FORMULÁRIO
// ========================================

function lerFormulario() {

    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}


// ========================================
// 7. VALIDAÇÃO DOS DADOS
// ========================================

function validarDados(dados) {

    if (dados.nome.length < 2) {
        return "Informe um nome com pelo menos duas letras.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120) {

        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5) {

        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500) {

        return "O peso deve estar entre 2 kg e 500 kg.";
    }

    return "";
}


// ========================================
// 8. MENSAGENS DE ERRO
// ========================================

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}


// ========================================
// 9. ADICIONAR PESSOA
// ========================================

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


// ========================================
// 10. CRIAR CÉLULA DA TABELA
// ========================================

function criarCelula(conteudo) {

    const td = document.createElement("td");

    td.textContent = conteudo;

    return td;
}


// ========================================
// 11. CRIAR LINHA DA TABELA
// ========================================

function criarLinha(pessoa) {

    const tr = document.createElement("tr");

    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(
        pessoa.peso,
        pessoa.altura
    );

    const classificacao = classificarIMC(
        imc,
        pessoa.idade
    );

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna de classificação

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);

    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);

    tr.appendChild(tdClassificacao);

    // Botão de excluir

    const tdAcoes = document.createElement("td");

    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";

    botaoExcluir.classList.add("btn-excluir");

    botaoExcluir.addEventListener("click", function() {
        excluirPessoa(pessoa.id);
    });

    tdAcoes.appendChild(botaoExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ========================================
// 12. RENDERIZAÇÃO DA TABELA
// ========================================

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

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ========================================
// 13. EXCLUIR PESSOA
// ========================================

function excluirPessoa(id) {

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    salvar();

    render();
}


// ========================================
// 14. SALVAR NO LOCALSTORAGE
// ========================================

function salvar() {

    localStorage.setItem(
        chavePessoas,
        JSON.stringify(pessoas)
    );

}


// ========================================
// 15. CARREGAR PESSOAS SALVAS
// ========================================

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


// ========================================
// 16. AJUSTAR CONTADOR DE CÓDIGO
// ========================================

function ajustarContador() {

    let maior = 0;

    pessoas.forEach(function(pessoa) {

        if (Number.isInteger(pessoa.id) && pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigo = maior;
}


// ========================================
// 17. EVENTO DE ENVIO DO FORMULÁRIO
// ========================================

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

    render();

    formPessoa.reset();

    inputNome.focus();

});


// ========================================
// 18. EVENTO DE CANCELAMENTO
// ========================================

formPessoa.addEventListener("reset", function() {
    limparErro();
});


// ========================================
// 19. INICIALIZAÇÃO DO SISTEMA
// ========================================

let pessoas = carregarPessoas();

ajustarContador();

render();
