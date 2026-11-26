
// ========================================
// 1. VARIÁVEIS E REFERÊNCIAS DO HTML
// ========================================

const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("nome");
const inputIdade = document.getElementById("idade");
const inputAltura = document.getElementById("altura");
const inputPeso = document.getElementById("peso");

const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");

const btnCancelar = document.getElementById("btn-cancelar");
const btnSalvar = document.getElementById("btn-salvar");

const CHAVE_PESSOAS = "pessoas";

let codigo = 0;
let pessoaEmEdicao = null;


// ========================================
// 2. GERAÇÃO AUTOMÁTICA DE IDENTIFICADOR
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


// ========================================
// 5. FORMATAÇÃO DOS VALORES NUMÉRICOS
// ========================================

function formatar(valor, casas = 1) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}


// ========================================
// 6. LEITURA DOS DADOS DO FORMULÁRIO
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
        return "Informe um nome com no mínimo duas letras.";
    }

    if (
        !Number.isInteger(dados.idade) ||
        dados.idade < 1 ||
        dados.idade > 120
    ) {
        return "A idade deve ser um número inteiro entre 1 e 120.";
    }

    if (
        !Number.isFinite(dados.altura) ||
        dados.altura < 0.5 ||
        dados.altura > 2.5
    ) {
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    }

    if (
        !Number.isFinite(dados.peso) ||
        dados.peso < 2 ||
        dados.peso > 500
    ) {
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
// 9. ADICIONAR OU ATUALIZAR PESSOA
// ========================================

function adicionarPessoa(dados) {

    if (pessoaEmEdicao !== null) {

        const pessoa = pessoas.find(
            pessoa => pessoa.id === pessoaEmEdicao
        );

        if (pessoa) {
            pessoa.nome = dados.nome;
            pessoa.idade = dados.idade;
            pessoa.altura = dados.altura;
            pessoa.peso = dados.peso;
        }

        pessoaEmEdicao = null;
        btnSalvar.textContent = "Salvar paciente";

    } else {

        const novaPessoa = {
            id: gerarCodigo(),
            nome: dados.nome,
            idade: dados.idade,
            altura: dados.altura,
            peso: dados.peso
        };

        pessoas.push(novaPessoa);
    }

    salvar();
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

    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.id));
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

    // Coluna de ações

    const tdAcoes = document.createElement("td");

    const btnEditar = document.createElement("button");

    btnEditar.textContent = "Editar";
    btnEditar.classList.add("btn-editar");
    btnEditar.dataset.acao = "editar";

    const btnExcluir = document.createElement("button");

    btnExcluir.textContent = "Excluir";
    btnExcluir.classList.add("btn-excluir");
    btnExcluir.dataset.acao = "excluir";

    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);

    tr.appendChild(tdAcoes);

    return tr;
}


// ========================================
// 12. FUNÇÃO DE RENDERIZAÇÃO
// ========================================

function render() {

    tabelaPessoas.innerHTML = "";

    if (pessoas.length === 0) {

        const tr = document.createElement("tr");

        const td = document.createElement("td");

        td.colSpan = 8;
        td.classList.add("vazio");
        td.textContent = "Nenhuma pessoa cadastrada ainda.";

        tr.appendChild(td);

        tabelaPessoas.appendChild(tr);

        return;
    }

    pessoas.forEach(pessoa => {

        const linha = criarLinha(pessoa);

        tabelaPessoas.appendChild(linha);

    });
}


// ========================================
// 13. ARMAZENAMENTO NO LOCALSTORAGE
// ========================================

function salvar() {

    try {
        localStorage.setItem(
            CHAVE_PESSOAS,
            JSON.stringify(pessoas)
        );
    } catch (erro) {
        mostrarErro("Não foi possível salvar os dados no navegador.");
    }
}


// ========================================
// 14. CARREGAR PESSOAS SALVAS
// ========================================

function carregarPessoas() {

    try {

        const dados = localStorage.getItem(CHAVE_PESSOAS);

        if (dados === null) {
            return [];
        }

        const resultado = JSON.parse(dados);

        if (!Array.isArray(resultado)) {
            return [];
        }

        return resultado.filter(pessoa =>
            Number.isInteger(pessoa.id) &&
            typeof pessoa.nome === "string" &&
            Number.isInteger(pessoa.idade) &&
            Number.isFinite(pessoa.altura) &&
            Number.isFinite(pessoa.peso)
        );

    } catch (erro) {

        console.error("Erro ao carregar pacientes:", erro);

        return [];
    }
}


// ========================================
// 15. AJUSTAR CONTADOR DE CÓDIGO
// ========================================

function ajustarContadorCodigo() {

    let maior = 0;

    pessoas.forEach(pessoa => {

        if (pessoa.id > maior) {
            maior = pessoa.id;
        }

    });

    codigo = maior;
}


// ========================================
// 16. EDITAR PESSOA
// ========================================

function editarPessoa(id) {

    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) return;

    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;

    pessoaEmEdicao = id;

    btnSalvar.textContent = "Atualizar paciente";

    limparErro();

    inputNome.focus();

    formPessoa.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}


// ========================================
// 17. EXCLUIR PESSOA
// ========================================

function excluirPessoa(id) {

    const pessoa = pessoas.find(
        pessoa => pessoa.id === id
    );

    if (!pessoa) return;

    const confirmar = confirm(
        `Deseja excluir o cadastro de ${pessoa.nome}?`
    );

    if (!confirmar) return;

    pessoas = pessoas.filter(
        pessoa => pessoa.id !== id
    );

    if (pessoaEmEdicao === id) {
        cancelarFormulario();
    }

    salvar();
    render();
}


// ========================================
// 18. CANCELAR FORMULÁRIO
// ========================================

function cancelarFormulario() {

    formPessoa.reset();

    pessoaEmEdicao = null;

    btnSalvar.textContent = "Salvar paciente";

    limparErro();

    inputNome.focus();
}


// ========================================
// 19. EVENTO DE ENVIO DO FORMULÁRIO
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

    formPessoa.reset();

    render();

    inputNome.focus();

});


// ========================================
// 20. EVENTOS DOS BOTÕES DA TABELA
// ========================================

tabelaPessoas.addEventListener("click", function(event) {

    const botao = event.target.closest("button");

    if (!botao) return;

    const linha = botao.closest("tr");

    if (!linha) return;

    const id = Number(linha.dataset.id);

    const acao = botao.dataset.acao;

    if (acao === "editar") {
        editarPessoa(id);
    }

    if (acao === "excluir") {
        excluirPessoa(id);
    }

});


// ========================================
// 21. EVENTO DO BOTÃO CANCELAR
// ========================================

btnCancelar.addEventListener("click", cancelarFormulario);


// ========================================
// 22. INICIALIZAÇÃO DA APLICAÇÃO
// ========================================

let pessoas = carregarPessoas();

ajustarContadorCodigo();

render();
