
// ==========================================
// 1. ELEMENTOS DO HTML
// ==========================================

const form = document.getElementById("form-pessoa");
const tituloForm = document.getElementById("titulo-form");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

const tabela = document.getElementById("tabela-pessoas");
const mensagemErro = document.getElementById("erro");

// ==========================================
// 2. VARIÁVEIS
// ==========================================

let pessoas = [];
let proximoId = 1;
let idEmEdicao = null;

// ==========================================
// 3. VALIDAR DADOS
// ==========================================

function validarDados(nome, idade, altura, peso) {

    if (!nome || !idade || !altura || !peso) {
        return "Preencha todos os campos!";
    }

    if (!Number.isInteger(idade) || idade < 1 || idade > 100) {
        return "Informe uma idade válida entre 1 e 100 anos.";
    }

    if (!Number.isFinite(altura) || altura < 0.5 || altura > 2.5) {
        return "Informe uma altura entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(peso) || peso < 2 || peso > 500) {
        return "Informe um peso válido entre 2 e 500 kg.";
    }

    return null;
}

// ==========================================
// 4. CALCULAR IMC
// ==========================================

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// ==========================================
// 5. CLASSIFICAR IMC
// ==========================================

function classificarIMC(imc) {

    if (imc < 18.5) {
        return "Abaixo do peso";
    }

    if (imc < 25) {
        return "Peso normal";
    }

    if (imc < 30) {
        return "Sobrepeso";
    }

    if (imc < 35) {
        return "Obesidade grau I";
    }

    if (imc < 40) {
        return "Obesidade grau II";
    }

    return "Obesidade grau III";
}

// ==========================================
// 6. MOSTRAR ERRO
// ==========================================

function mostrarErro(mensagem) {
    mensagemErro.textContent = mensagem;
    mensagemErro.hidden = false;
}

// ==========================================
// 7. LIMPAR ERRO
// ==========================================

function limparErro() {
    mensagemErro.textContent = "";
    mensagemErro.hidden = true;
}

// ==========================================
// 8. CADASTRAR PESSOA
// ==========================================

function cadastrarPessoa(nome, idade, altura, peso) {

    const novaPessoa = {
        id: proximoId++,
        nome,
        idade,
        altura,
        peso,
        imc: calcularIMC(peso, altura)
    };

    pessoas.push(novaPessoa);

    renderizarTabela();
}

// ==========================================
// 9. RENDERIZAR TABELA
// ==========================================

function renderizarTabela() {

    tabela.innerHTML = "";

    pessoas.forEach(function(pessoa) {

        const linha = document.createElement("tr");

        const dados = [
            pessoa.nome,
            pessoa.idade,
            pessoa.altura.toFixed(2) + " m",
            pessoa.peso.toFixed(1) + " kg",
            pessoa.imc.toFixed(2),
            classificarIMC(pessoa.imc)
        ];

        dados.forEach(function(valor) {

            const celula = document.createElement("td");

            celula.textContent = valor;

            linha.appendChild(celula);

        });

        // Botões de ações

        const celulaAcoes = document.createElement("td");

        const btnEditar = document.createElement("button");

        btnEditar.textContent = "Editar";
        btnEditar.type = "button";

        btnEditar.style.marginRight = "5px";
        btnEditar.style.padding = "8px 12px";

        btnEditar.addEventListener("click", function() {
            editarPessoa(pessoa.id);
        });

        const btnExcluir = document.createElement("button");

        btnExcluir.textContent = "Excluir";
        btnExcluir.type = "button";

        btnExcluir.style.background = "#555";
        btnExcluir.style.padding = "8px 12px";

        btnExcluir.addEventListener("click", function() {
            excluirPessoa(pessoa.id);
        });

        celulaAcoes.appendChild(btnEditar);
        celulaAcoes.appendChild(btnExcluir);

        linha.appendChild(celulaAcoes);

        tabela.appendChild(linha);

    });
}

// ==========================================
// 10. EDITAR PESSOA
// ==========================================

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

    inputNome.focus();
}

// ==========================================
// 11. ATUALIZAR PESSOA
// ==========================================

function atualizarPessoa(id, nome, idade, altura, peso) {

    const indice = pessoas.findIndex(function(pessoa) {
        return pessoa.id === id;
    });

    if (indice === -1) {
        return;
    }

    pessoas[indice] = {
        ...pessoas[indice],
        nome,
        idade,
        altura,
        peso,
        imc: calcularIMC(peso, altura)
    };

    renderizarTabela();

    resetarFormulario();
}

// ==========================================
// 12. EXCLUIR PESSOA
// ==========================================

function excluirPessoa(id) {

    const confirmar = confirm("Deseja realmente excluir esta pessoa?");

    if (!confirmar) {
        return;
    }

    pessoas = pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });

    if (idEmEdicao === id) {
        resetarFormulario();
    }

    renderizarTabela();
}

// ==========================================
// 13. RESETAR FORMULÁRIO
// ==========================================

function resetarFormulario() {

    form.reset();

    idEmEdicao = null;

    tituloForm.textContent = "Nova pessoa";

    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
}

// ==========================================
// 14. EVENTO DE SUBMISSÃO
// ==========================================

form.addEventListener("submit", function(event) {

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

    if (idEmEdicao === null) {

        cadastrarPessoa(nome, idade, altura, peso);

    } else {

        atualizarPessoa(idEmEdicao, nome, idade, altura, peso);

        return;
    }

    resetarFormulario();

});

// ==========================================
// 15. EVENTO DE CANCELAR
// ==========================================

btnCancelar.addEventListener("click", function() {
    resetarFormulario();
});

// ==========================================
// 16. LIMPAR ERRO AO DIGITAR
// ==========================================

form.addEventListener("input", function() {
    limparErro();
});
