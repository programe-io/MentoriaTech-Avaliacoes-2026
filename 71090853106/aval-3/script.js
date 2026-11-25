
// Contador para gerar códigos
let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

// Pessoas cadastradas inicialmente
let pessoas = [
    {
        id: gerarCodigo(),
        nome: "Maria Silva",
        idade: 30,
        altura: 1.65,
        peso: 60
    },
    {
        id: gerarCodigo(),
        nome: "João Souza",
        idade: 45,
        altura: 1.80,
        peso: 95
    }
];

// Elementos da página
const tabelaPessoas = document.getElementById("tabela-pessoas");
const formPessoa = document.getElementById("form-pessoa");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const mensagemErro = document.getElementById("erro");

// Código da pessoa que está sendo editada
let idEmEdicao = null;


// Criar célula da tabela
function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
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

    return {
        texto: "Obesidade",
        classe: "obesidade"
    };
}


// Renderizar tabela
function renderizarTabela() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhuma pessoa cadastrada.");
        
        td.colSpan = 7;
        td.classList.add("vazio");

        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(function(pessoa) {

        const tr = document.createElement("tr");

        if (pessoa.id === idEmEdicao) {
            tr.classList.add("em-edicao");
        }

        const imc = calcularIMC(pessoa.peso, pessoa.altura);
        const classificacao = classificarIMC(imc);

        // Dados da pessoa
        tr.appendChild(criarCelula(pessoa.nome));
        tr.appendChild(criarCelula(pessoa.idade));
        tr.appendChild(criarCelula(pessoa.altura.toFixed(2)));
        tr.appendChild(criarCelula(pessoa.peso.toFixed(1)));
        tr.appendChild(criarCelula(imc.toFixed(2)));

        // Selo de classificação
        const tdClassificacao = document.createElement("td");
        const selo = document.createElement("span");

        selo.textContent = classificacao.texto;
        selo.classList.add("selo", classificacao.classe);

        tdClassificacao.appendChild(selo);
        tr.appendChild(tdClassificacao);

        // Botões de ações
        const tdAcoes = document.createElement("td");
        tdAcoes.classList.add("acoes");

        const btnEditar = document.createElement("button");
        btnEditar.textContent = "Editar";
        btnEditar.type = "button";
        btnEditar.dataset.acao = "editar";
        btnEditar.dataset.id = pessoa.id;

        const btnRemover = document.createElement("button");
        btnRemover.textContent = "Remover";
        btnRemover.type = "button";
        btnRemover.classList.add("remover");
        btnRemover.dataset.acao = "remover";
        btnRemover.dataset.id = pessoa.id;

        tdAcoes.appendChild(btnEditar);
        tdAcoes.appendChild(btnRemover);

        tr.appendChild(tdAcoes);

        tabelaPessoas.appendChild(tr);
    });
}


// Exibir mensagem de erro
function mostrarErro(texto) {
    mensagemErro.textContent = texto;
    mensagemErro.hidden = false;
}


// Limpar mensagem de erro
function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}


// Limpar formulário
function limparFormulario() {
    formPessoa.reset();

    idEmEdicao = null;

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();

    renderizarTabela();
}


// Validar dados do formulário
function validarDados(nome, idade, altura, peso) {

    if (!nome || !nome.trim()) {
        return "Informe o nome da pessoa.";
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 120) {
        return "Informe uma idade válida entre 1 e 120 anos.";
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        return "Informe uma altura válida entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        return "Informe um peso válido entre 2 e 500 kg.";
    }

    return null;
}


// Salvar ou atualizar pessoa
formPessoa.addEventListener("submit", function(event) {

    event.preventDefault();

    limparErro();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    const erro = validarDados(nome, idade, altura, peso);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    if (idEmEdicao !== null) {

        const pessoa = pessoas.find(function(item) {
            return item.id === idEmEdicao;
        });

        if (pessoa) {
            pessoa.nome = nome;
            pessoa.idade = idade;
            pessoa.altura = altura;
            pessoa.peso = peso;
        }

    } else {

        const novaPessoa = {
            id: gerarCodigo(),
            nome: nome,
            idade: idade,
            altura: altura,
            peso: peso
        };

        pessoas.push(novaPessoa);
    }

    limparFormulario();
});


// Identificar cliques nos botões da tabela
tabelaPessoas.addEventListener("click", function(event) {

    const botao = event.target.closest("button[data-acao]");

    if (!botao) {
        return;
    }

    const id = Number(botao.dataset.id);
    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarPessoa(id);
    }

    if (acao === "remover") {
        removerPessoa(id);
    }
});


// Editar pessoa
function editarPessoa(id) {

    const pessoa = pessoas.find(function(item) {
        return item.id === id;
    });

    if (!pessoa) {
        return;
    }

    idEmEdicao = id;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;

    limparErro();

    renderizarTabela();

    inputNome.focus();
}


// Remover pessoa
function removerPessoa(id) {

    const pessoa = pessoas.find(function(item) {
        return item.id === id;
    });

    if (!pessoa) {
        return;
    }

    const confirmar = confirm(
        `Deseja realmente remover ${pessoa.nome}?`
    );

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(item) {
        return item.id !== id;
    });

    if (idEmEdicao === id) {
        limparFormulario();
    } else {
        renderizarTabela();
    }
}


// Cancelar edição
btnCancelar.addEventListener("click", function() {
    limparFormulario();
});


// Exibir os registros iniciais
renderizarTabela();