
/* CONTROLE DE PESSOAS */

// Corrigido: contador começa em zero
let contadorCodigo = 0;

function gerarCodigo() {
    contadorCodigo++;
    return contadorCodigo;
}

// Carregar dados salvos
let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];

// Recuperar o maior código existente
contadorCodigo = pessoas.reduce((maior, pessoa) => {
    return Math.max(maior, pessoa.id);
}, 0);

let idEmEdicao = null;

/* ELEMENTOS */

const tabelaPessoas = document.getElementById("tabela-pessoas");
const form = document.getElementById("form-pessoa");
const tituloForm = document.getElementById("titulo-form");

const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");

const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");
const erro = document.getElementById("erro");

/* SALVAR NO LOCALSTORAGE */

function salvarDados() {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

/* FUNÇÕES DE NEGÓCIO */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {

    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo" };
    }

    if (imc < 25) {
        return { texto: "Peso normal", classe: "normal" };
    }

    if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    }

    if (imc < 35) {
        return { texto: "Obesidade grau I", classe: "obesidade" };
    }

    if (imc < 40) {
        return { texto: "Obesidade grau II", classe: "obesidade" };
    }

    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

/* VALIDAÇÃO */

function validar(dados) {

    if (!dados.nome) {
        return "Informe o nome.";
    }

    if (!Number.isInteger(dados.idade) ||
        dados.idade < 1 || dados.idade > 120) {
        return "Idade deve ser entre 1 e 120 anos.";
    }

    if (!Number.isFinite(dados.altura) ||
        dados.altura < 0.5 || dados.altura > 2.5) {
        return "Altura deve estar entre 0,5 e 2,5 metros.";
    }

    if (!Number.isFinite(dados.peso) ||
        dados.peso < 2 || dados.peso > 500) {
        return "Peso deve estar entre 2 e 500 kg.";
    }

    return null;
}

/* MENSAGENS */

function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

function limparErro() {
    erro.textContent = "";
    erro.hidden = true;
}

/* CRIAR BOTÕES */

function criarBotao(texto, acao, classe) {

    const btn = document.createElement("button");

    btn.type = "button";
    btn.textContent = texto;
    btn.dataset.acao = acao;

    if (classe) {
        btn.classList.add(classe);
    }

    return btn;
}

/* CRIAR LINHAS DA TABELA */

function criarLinha(pessoa) {

    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

    const valores = [
        pessoa.nome,
        pessoa.idade,
        formatar(pessoa.altura, 2),
        formatar(pessoa.peso, 1),
        formatar(imc, 1)
    ];

    valores.forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        tr.appendChild(td);
    });

    const tdClassificacao = document.createElement("td");

    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    tdAcoes.classList.add("acoes");

    tdAcoes.appendChild(
        criarBotao("Editar", "editar", "secundario")
    );

    tdAcoes.appendChild(
        criarBotao("Excluir", "excluir", "perigo")
    );

    tr.appendChild(tdAcoes);

    return tr;
}

/* MOSTRAR PESSOAS */

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

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

/* MODO DE EDIÇÃO */

function sairDoModoEdicao() {

    idEmEdicao = null;

    form.reset();

    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;

    limparErro();
}

function entrarNoModoEdicao(pessoa) {

    idEmEdicao = pessoa.id;

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

/* CADASTRAR E ATUALIZAR */

form.addEventListener("submit", function(e) {

    e.preventDefault();

    const dados = {

        nome: inputNome.value.trim(),

        idade: Number(inputIdade.value),

        altura: Number(inputAltura.value),

        peso: Number(inputPeso.value)

    };

    const mensagem = validar(dados);

    if (mensagem) {
        mostrarErro(mensagem);
        return;
    }

    if (idEmEdicao === null) {

        // NOVO CADASTRO
        pessoas.push({
            id: gerarCodigo(),
            ...dados
        });

    } else {

        // ATUALIZAR CADASTRO
        const pessoa = pessoas.find(p => p.id === idEmEdicao);

        if (pessoa) {
            Object.assign(pessoa, dados);
        }
    }

    salvarDados();

    sairDoModoEdicao();

    render();

});

/* CANCELAR EDIÇÃO */

btnCancelar.addEventListener("click", function() {
    sairDoModoEdicao();
});

/* EDITAR E EXCLUIR */

tabelaPessoas.addEventListener("click", function(e) {

    const btn = e.target.closest("button[data-acao]");

    if (!btn) return;

    const linha = btn.closest("tr");
    const id = Number(linha.dataset.id);

    const pessoa = pessoas.find(p => p.id === id);

    if (!pessoa) return;

    if (btn.dataset.acao === "editar") {

        entrarNoModoEdicao(pessoa);

    }

    else if (btn.dataset.acao === "excluir") {

        const confirmar = confirm(
            "Deseja realmente excluir esta pessoa?"
        );

        if (!confirmar) return;

        pessoas = pessoas.filter(p => p.id !== id);

        if (idEmEdicao === id) {
            sairDoModoEdicao();
        }

        salvarDados();

        render();
    }

});

/* INICIAR SISTEMA */

render();

