let contadorCodigo = 0;

function gerarCodigo() {
    return ++contadorCodigo;
}

let pessoas = [
    { id: gerarCodigo(), nome: "Maria Silva", idade: 30, altura: 1.65, peso: 60 },
    { id: gerarCodigo(), nome: "João Souza", idade: 45, altura: 1.80, peso: 95 },
];

let editandoId = null;

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

/* Funções de Negócio */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
    if (imc < 25)   return { texto: "Peso normal", classe: "normal" };
    if (imc < 30)   return { texto: "Sobrepeso", classe: "sobrepeso" };
    if (imc < 35)   return { texto: "Obesidade grau I", classe: "obesidade" };
    if (imc < 40)   return { texto: "Obesidade grau II", classe: "obesidade" };
    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

function validar(nome, idade, altura, peso) {
    if (!nome) return "Informe o nome.";
    if (!Number.isInteger(idade) || idade < 1 || idade > 120) return "A idade deve ser um número inteiro entre 1 e 120.";
    if (!(altura >= 0.5 && altura <= 2.5)) return "A altura deve estar entre 0,5 m e 2,5 m.";
    if (!(peso >= 2 && peso <= 500)) return "O peso deve estar entre 2 kg e 500 kg.";
    return null;
}

/* Fim das Funções de Negócio */

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarBotao(texto, classe, acao) {
    const botao = document.createElement("button");
    botao.type = "button";
    botao.textContent = texto;
    botao.className = "pequeno " + classe;
    botao.dataset.acao = acao;
    return botao;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClasse = criarCelula("");
    const badge = document.createElement("span");
    badge.className = "badge " + classificacao.classe;
    badge.textContent = classificacao.texto;
    tdClasse.appendChild(badge);
    tr.appendChild(tdClasse);

    const tdAcoes = document.createElement("td");
    const acoes = document.createElement("div");
    acoes.className = "acoes";
    acoes.appendChild(criarBotao("Editar", "secundario", "editar"));
    acoes.appendChild(criarBotao("Excluir", "perigo", "excluir"));
    tdAcoes.appendChild(acoes);
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

    pessoas.forEach((pessoa) => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

/* Formulário */

function mostrarErro(mensagem) {
    erro.textContent = mensagem;
    erro.hidden = false;
}

function limparErro() {
    erro.textContent = "";
    erro.hidden = true;
}

function iniciarEdicao(id) {
    const pessoa = pessoas.find((p) => p.id === id);
    if (!pessoa) return;

    editandoId = id;
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

function sairDaEdicao() {
    editandoId = null;
    form.reset();
    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;
}

function excluir(id) {
    const pessoa = pessoas.find((p) => p.id === id);
    if (!pessoa || !confirm(`Excluir ${pessoa.nome}?`)) return;

    pessoas = pessoas.filter((p) => p.id !== id);
    if (editandoId === id) sairDaEdicao();
    render();
}

form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = inputNome.value.trim();
    const idade = Number(inputIdade.value);
    const altura = Number(inputAltura.value);
    const peso = Number(inputPeso.value);

    const mensagem = validar(nome, idade, altura, peso);
    if (mensagem) {
        mostrarErro(mensagem);
        return;
    }
    limparErro();

    if (editandoId !== null) {
        const pessoa = pessoas.find((p) => p.id === editandoId);
        Object.assign(pessoa, { nome, idade, altura, peso });
    } else {
        pessoas.push({ id: gerarCodigo(), nome, idade, altura, peso });
    }

    sairDaEdicao();
    render();
    inputNome.focus();
});

btnCancelar.addEventListener("click", () => {
    sairDaEdicao();
    limparErro();
});

tabelaPessoas.addEventListener("click", (evento) => {
    const botao = evento.target.closest("button[data-acao]");
    if (!botao) return;

    const id = Number(botao.closest("tr").dataset.id);
    if (botao.dataset.acao === "editar") iniciarEdicao(id);
    if (botao.dataset.acao === "excluir") excluir(id);
});

render();