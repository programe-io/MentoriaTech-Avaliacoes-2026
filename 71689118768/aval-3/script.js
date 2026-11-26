// ==========================================================
// Calculadora de IMC - Ficha de Anamnese (exemplo educativo)
// ==========================================================

const CHAVE_PESSOAS = "pessoas";
let contadorCodigo = 0;
let pessoas = carregarPessoas();
let idEmEdicao = null;

// Referências ao HTML
const formPessoa = document.getElementById("form-pessoa");
const inputNome = document.getElementById("input-nome");
const inputIdade = document.getElementById("input-idade");
const inputAltura = document.getElementById("input-altura");
const inputPeso = document.getElementById("input-peso");
const tabelaPessoas = document.getElementById("tabela-pessoas");
const mensagemDeErro = document.getElementById("erro");
const tituloForm = document.getElementById("titulo-form");
const btnSalvar = document.getElementById("btn-salvar");
const btnCancelar = document.getElementById("btn-cancelar");

// ---------- Persistência ----------
function salvar() {
    try {
        localStorage.setItem(CHAVE_PESSOAS, JSON.stringify(pessoas));
    } catch (erro) {
        mostrarErro("Não foi possível salvar os dados neste navegador.");
        console.error("Falha ao salvar:", erro);
    }
}

function carregarPessoas() {
    try {
        const dados = localStorage.getItem(CHAVE_PESSOAS);
        if (!dados) return [];
        const lista = JSON.parse(dados);
        return Array.isArray(lista) ? lista.filter(p =>
            p && Number.isInteger(Number(p.id)) && typeof p.nome === "string" &&
            Number.isFinite(Number(p.idade)) && Number.isFinite(Number(p.altura)) &&
            Number.isFinite(Number(p.peso))
        ) : [];
    } catch (erro) {
        console.error("Não foi possível carregar os dados:", erro);
        return [];
    }
}

function ajustarContadorCodigo() {
    contadorCodigo = pessoas.reduce((maior, pessoa) => Math.max(maior, Number(pessoa.id) || 0), 0);
}

function gerarCodigo() {
    contadorCodigo += 1;
    return contadorCodigo;
}

// ---------- Regras de negócio ----------
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", classe: "abaixo" };
    if (imc < 25) return { texto: "Peso normal", classe: "normal" };
    if (imc < 30) return { texto: "Sobrepeso", classe: "sobrepeso" };
    if (imc < 35) return { texto: "Obesidade grau I", classe: "obesidade" };
    if (imc < 40) return { texto: "Obesidade grau II", classe: "obesidade" };
    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas = 1) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

// ---------- Formulário e validação ----------
function lerFormulario() {
    return {
        nome: inputNome.value.trim(),
        idade: Number(inputIdade.value),
        altura: Number(inputAltura.value),
        peso: Number(inputPeso.value)
    };
}

function validarDados(dados) {
    if (dados.nome.length < 2) return "Informe o nome com no mínimo duas letras.";
    if (dados.nome.length > 50) return "O nome deve ter no máximo 50 caracteres.";
    if (!Number.isInteger(dados.idade) || dados.idade < 1 || dados.idade > 120)
        return "A idade deve ser um número inteiro entre 1 e 120.";
    if (!Number.isFinite(dados.altura) || dados.altura < 0.5 || dados.altura > 2.5)
        return "A altura deve estar entre 0,50 m e 2,50 m.";
    if (!Number.isFinite(dados.peso) || dados.peso < 2 || dados.peso > 500)
        return "O peso deve estar entre 2 kg e 500 kg.";
    return "";
}

function mostrarErro(mensagem) {
    mensagemDeErro.textContent = mensagem;
    mensagemDeErro.hidden = false;
}

function limparErro() {
    mensagemDeErro.textContent = "";
    mensagemDeErro.hidden = true;
}

function limparMarcasInvalidas() {
    [inputNome, inputIdade, inputAltura, inputPeso].forEach(campo => campo.classList.remove("invalido"));
}

function marcarCampoInvalido(mensagem) {
    limparMarcasInvalidas();
    if (mensagem.startsWith("Informe o nome") || mensagem.startsWith("O nome"))
        inputNome.classList.add("invalido");
    else if (mensagem.startsWith("A idade")) inputIdade.classList.add("invalido");
    else if (mensagem.startsWith("A altura")) inputAltura.classList.add("invalido");
    else if (mensagem.startsWith("O peso")) inputPeso.classList.add("invalido");
}

// ---------- Cadastro e edição ----------
function adicionarPessoa(dados) {
    pessoas.push({ id: gerarCodigo(), ...dados });
}

function atualizarPessoa(dados) {
    const pessoa = pessoas.find(p => Number(p.id) === Number(idEmEdicao));
    if (pessoa) Object.assign(pessoa, dados);
}

function iniciarEdicao(id) {
    const pessoa = pessoas.find(p => Number(p.id) === Number(id));
    if (!pessoa) return;
    idEmEdicao = pessoa.id;
    inputNome.value = pessoa.nome;
    inputIdade.value = pessoa.idade;
    inputAltura.value = pessoa.altura;
    inputPeso.value = pessoa.peso;
    tituloForm.textContent = "Editar pessoa";
    btnSalvar.textContent = "Atualizar";
    btnCancelar.hidden = false;
    limparErro();
    render();
    inputNome.focus();
}

function cancelarEdicao() {
    idEmEdicao = null;
    formPessoa.reset();
    tituloForm.textContent = "Nova pessoa";
    btnSalvar.textContent = "Salvar";
    btnCancelar.hidden = true;
    limparErro();
    limparMarcasInvalidas();
    render();
    inputNome.focus();
}

function removerPessoa(id) {
    const pessoa = pessoas.find(p => Number(p.id) === Number(id));
    if (!pessoa) return;
    if (!confirm(`Deseja realmente excluir o cadastro de ${pessoa.nome}?`)) return;
    pessoas = pessoas.filter(p => Number(p.id) !== Number(id));
    if (Number(idEmEdicao) === Number(id)) cancelarEdicao();
    salvar();
    render();
}

// ---------- Construção da tabela ----------
function criarCelula(conteudo, classe = "") {
    const td = document.createElement("td");
    td.textContent = conteudo;
    if (classe) td.className = classe;
    return td;
}

function criarLinha(pessoa) {
    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;
    if (Number(idEmEdicao) === Number(pessoa.id)) tr.classList.add("em-edicao");

    const imc = calcularIMC(Number(pessoa.peso), Number(pessoa.altura));
    const classificacao = classificarIMC(imc);

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(String(pessoa.idade)));
    tr.appendChild(criarCelula(`${formatar(pessoa.altura, 2)} m`));
    tr.appendChild(criarCelula(`${formatar(pessoa.peso, 1)} kg`));
    tr.appendChild(criarCelula(formatar(imc, 1)));

    const tdClassificacao = document.createElement("td");
    const selo = document.createElement("span");
    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;
    tdClassificacao.appendChild(selo);
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    tdAcoes.className = "acoes";

    const btnEditar = document.createElement("button");
    btnEditar.type = "button";
    btnEditar.textContent = "Editar";
    btnEditar.setAttribute("aria-label", `Editar cadastro de ${pessoa.nome}`);
    btnEditar.addEventListener("click", () => iniciarEdicao(pessoa.id));

    const btnRemover = document.createElement("button");
    btnRemover.type = "button";
    btnRemover.textContent = "Excluir";
    btnRemover.classList.add("remover");
    btnRemover.setAttribute("aria-label", `Excluir cadastro de ${pessoa.nome}`);
    btnRemover.addEventListener("click", () => removerPessoa(pessoa.id));

    tdAcoes.append(btnEditar, btnRemover);
    tr.appendChild(tdAcoes);
    return tr;
}

function render() {
    tabelaPessoas.replaceChildren();
    if (pessoas.length === 0) {
        const tr = document.createElement("tr");
        const td = criarCelula("Nenhuma pessoa cadastrada ainda", "vazio");
        td.colSpan = 7;
        tr.appendChild(td);
        tabelaPessoas.appendChild(tr);
        return;
    }
    pessoas.forEach(pessoa => tabelaPessoas.appendChild(criarLinha(pessoa)));
}

// ---------- Eventos ----------
formPessoa.addEventListener("submit", event => {
    event.preventDefault();
    limparErro();
    limparMarcasInvalidas();

    const dados = lerFormulario();
    const erro = validarDados(dados);
    if (erro) {
        mostrarErro(erro);
        marcarCampoInvalido(erro);
        return;
    }

    if (idEmEdicao === null) adicionarPessoa(dados);
    else atualizarPessoa(dados);

    salvar();
    cancelarEdicao();
});

btnCancelar.addEventListener("click", cancelarEdicao);

[inputNome, inputIdade, inputAltura, inputPeso].forEach(campo => {
    campo.addEventListener("input", () => {
        campo.classList.remove("invalido");
        limparErro();
    });
});

// Inicialização
ajustarContadorCodigo();
render();

