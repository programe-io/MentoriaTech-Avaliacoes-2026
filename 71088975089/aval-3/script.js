// ==========================================
// CONSTANTES E CONTROLE DE IDENTIFICADOR
// ==========================================
const CHAVE_PESSOAS = 'pessoas';
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

function ajustarContadorCodigo() {
    let maior = 0;

    pessoas.forEach((pessoa) => {
        if (pessoa.id > maior) {
            maior = pessoa.id;
        }
    });

    contadorCodigo = maior;
}

// ==========================================
// REFERÊNCIAS DO DOM
// ==========================================
const formPessoa = document.getElementById('form-pessoa');
const inputNome = document.getElementById('nome');
const inputIdade = document.getElementById('idade');
const inputAltura = document.getElementById('altura');
const inputPeso = document.getElementById('peso');
const mensagemDeErro = document.getElementById('erro');
const tabelaPessoas = document.getElementById('tabela-pessoas');

// ==========================================
// PERSISTÊNCIA NO LOCALSTORAGE
// ==========================================
function salvar() {
    localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
}

function carregarPessoas() {
    const dadosSalvos = localStorage.getItem(CHAVE_PESSOAS);

    if (dadosSalvos === null) {
        return [];
    }

    try {
        const lista = JSON.parse(dadosSalvos);
        if (Array.isArray(lista)) {
            return lista;
        }
        return [];
    } catch (erro) {
        console.error('Erro ao carregar dados do localStorage:', erro);
        return [];
    }
}

// Lista carregada do localStorage (substitui os dados fixos da Parte 1)
let pessoas = carregarPessoas();
ajustarContadorCodigo();

// ==========================================
// INÍCIO DAS FUNÇÕES DE REGRA DE NEGÓCIO
// ==========================================
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'baixo-peso' };
    }
    if (imc < 25) {
        return { texto: 'Peso normal', classe: 'normal' };
    }
    if (imc < 30) {
        return { texto: 'Sobrepeso', classe: 'atencao' };
    }
    if (imc < 35) {
        return { texto: 'Obesidade grau I', classe: 'obesidade' };
    }
    if (imc < 40) {
        return { texto: 'Obesidade grau II', classe: 'obesidade' };
    }
    return { texto: 'Obesidade grau III', classe: 'obesidade' };
}

function formatar(valor, casasDecimais = 2) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}
// ==========================================
// FIM DAS FUNÇÕES DE REGRA DE NEGÓCIO
// ==========================================

// ==========================================
// FORMULÁRIO: LEITURA, VALIDAÇÃO E ERROS
// ==========================================
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
        return 'Informe o nome com no mínimo de duas letras.';
    }

    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        return 'A idade deve ser um número inteiro entre 1 e 120.';
    }

    if (Number.isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
        return 'A altura deve estar entre 0,50 m e 2,50 m.';
    }

    if (Number.isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
        return 'O peso deve estar entre 2 kg e 500 kg.';
    }

    return '';
}

function mostrarErro(texto) {
    mensagemDeErro.textContent = texto;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = '';
    mensagemDeErro.hidden = true;
}

function adicionarPessoa(dados) {
    pessoas.push({
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });
}

// ==========================================
// CRIAÇÃO DE ELEMENTOS E RENDERIZAÇÃO
// ==========================================
function criarCelula(texto, classe = '') {
    const td = document.createElement('td');
    td.textContent = texto;
    if (classe) {
        td.classList.add(classe);
    }
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement('tr');
    tr.dataset.id = pessoa.id;

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(`${formatar(pessoa.altura, 2)} m`));
    tr.appendChild(criarCelula(`${formatar(pessoa.peso, 1)} KG`));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    // Coluna de classificação com selo colorido
    const tdClassificacao = document.createElement('td');
    const selo = document.createElement('span');
    selo.classList.add('selo', classificacao.classe);
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    // Coluna de ações (reservada para o desafio do botão apagar)
    tr.appendChild(criarCelula('—'));

    return tr;
}

function render() {
    tabelaPessoas.innerHTML = '';

    if (pessoas.length === 0) {
        const tr = document.createElement('tr');
        const td = document.createElement('td');

        td.colSpan = 7;
        td.classList.add('vazio');
        td.textContent = 'Nenhuma pessoa cadastrada ainda';

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }

    pessoas.forEach((pessoa) => {
        const linha = criarLinha(pessoa);
        tabelaPessoas.appendChild(linha);
    });
}

// ==========================================
// EVENTOS E INICIALIZAÇÃO
// ==========================================
formPessoa.addEventListener('submit', (e) => {
    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== '') {
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

formPessoa.addEventListener('reset', () => {
    limparErro();
});

// Renderização inicial
render();