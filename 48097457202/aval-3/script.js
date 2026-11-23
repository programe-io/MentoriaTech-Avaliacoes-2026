
const formPessoa = document.getElementById('formPessoa');
const tabelaPessoas = document.getElementById('tabelaPessoas');
const mensagemDeErro = document.getElementById('erro');

let pessoas = [];
let contador = 1;
const chavePessoas = 'pessoas';


function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: 'Abaixo do peso', classe: 'normal' };
    } else if (imc >= 18.5 && imc < 25) {
        return { texto: 'Peso normal', classe: 'normal' };
    } else if (imc >= 25 && imc < 30) {
        return { texto: 'Sobrepeso', classe: 'sobrepeso' };
    } else if (imc >= 30 && imc < 35) {
        return { texto: 'Obesidade grau I', classe: 'obesidade' };
    } else if (imc >= 35 && imc < 40) {
        return { texto: 'Obesidade grau II', classe: 'obesidade' };
    } else {
        return { texto: 'Obesidade grau III', classe: 'obesidade' };
    }
}

function formatar(valor, casasDecimais) {
    return valor.toLocaleString('pt-BR', {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

function gerarCodigo() {
    return contador++;
}


function criarCelula(texto) {
    const td = document.createElement('td');
    td.textContent = texto;
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement('tr');
    tr.dataset.id = pessoa.id; 

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + 'm'));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + 'kg'));

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement('td');
    const selo = document.createElement('span');
    selo.className = classificacao.classe;
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement('td');
    const btnApagar = document.createElement('button');
    btnApagar.textContent = 'Apagar';
    btnApagar.className = 'btn-apagar';
    
    btnApagar.addEventListener('click', () => {
        apagarPessoa(pessoa.id);
    });

    tdAcoes.appendChild(btnApagar);
    tr.appendChild(tdAcoes);

    return tr;
}

function render() {
    tabelaPessoas.innerHTML = ''; 

    if (pessoas.length === 0) {
        const trVazia = document.createElement('tr');
        const tdVazia = document.createElement('td');
        tdVazia.colSpan = 7;
        tdVazia.textContent = 'Nenhuma pessoa cadastrada ainda.';
        tdVazia.style.textAlign = 'center';
        trVazia.appendChild(tdVazia);
        tabelaPessoas.appendChild(trVazia);
        return;
    }

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}


function lerFormulario() {
    const nome = document.getElementById('nome').value.trim();
    const idade = Number(document.getElementById('idade').value);
    const altura = Number(document.getElementById('altura').value);
    const peso = Number(document.getElementById('peso').value);

    return { nome, idade, altura, peso };
}

function validarDados(dados) {
    if (dados.nome.length < 2) {
        return 'O nome deve ter no mínimo 2 letras.';
    }
    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120) {
        return 'A idade deve ser um número inteiro entre 1 e 120.';
    }
    if (isNaN(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5) {
        return 'A altura deve ser entre 0.5 e 2.5 metros.';
    }
    if (isNaN(dados.peso) || dados.peso < 2 || dados.peso > 500) {
        return 'O peso deve ser entre 2 e 500 kg.';
    }
    return '';
}

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.classList.remove('hidden');
}

function limparErro() {
    mensagemDeErro.textContent = '';
    mensagemDeErro.classList.add('hidden');
}

function adicionarPessoa(dados) {
    const novaPessoa = {
        id: gerarCodigo(),
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    };
    pessoas.push(novaPessoa);
    salvarPessoa();
    render();
}

function apagarPessoa(id) {

    pessoas = pessoas.filter(pessoa => pessoa.id !== id);
    salvarPessoa();
    render();
}


function salvarPessoa() {
    localStorage.setItem(chavePessoas, JSON.stringify(pessoas));
}

function carregarPessoas() {
    const dadosStorage = localStorage.getItem(chavePessoas);

    if (dadosStorage) {
        try {
            const dadosArray = JSON.parse(dadosStorage);
            if (Array.isArray(dadosArray)) {
                pessoas = dadosArray;
                
                // Ajusta o contador de ID para não gerar IDs duplicados
                let maiorId = 0;
                pessoas.forEach(pessoa => {
                    if (pessoa.id > maiorId) {
                        maiorId = pessoa.id;
                    }
                });
                contador = maiorId + 1;
            }
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
            pessoas = [];
        }
    }
}


formPessoa.addEventListener('submit', (evento) => {
    evento.preventDefault(); 

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== '') {
        mostrarErro(erro);
        return; 
    }

    limparErro();
    adicionarPessoa(dados);
    
    formPessoa.reset();
    document.getElementById('nome').focus();
});

carregarPessoas();
render();