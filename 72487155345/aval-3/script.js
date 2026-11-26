
const chave = "pessoas";
let pessoas = carregarPessoas();
let codigo = 0;

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5)
        return { texto: "Abaixo do peso", classe: "sobrepeso" };
    if (imc < 25)
        return { texto: "Normal", classe: "normal" };
    if (imc < 30)
        return { texto: "Sobrepeso", classe: "sobrepeso" };

    return { texto: "Obesidade", classe: "obesidade" };
}

function formatar(valor, casas) {
    return valor.toFixed(casas);
}

function lerFormulario() {
    return {
        nome: document.getElementById("nome").value.trim(),
        idade: Number(document.getElementById("idade").value),
        altura: Number(document.getElementById("altura").value),
        peso: Number(document.getElementById("peso").value)
    };
}

function validarDados(d) {
    if (d.nome.length < 2) return "Nome muito curto!";
    if (!Number.isInteger(d.idade) || d.idade < 1 || d.idade > 120)
        return "Idade inválida!";
    if (d.altura < 0.5 || d.altura > 2.5)
        return "Altura inválida!";
    if (d.peso < 2 || d.peso > 500)
        return "Peso inválido!";

    return "";
}

function adicionarPessoa(d) {
    pessoas.push({ id: ++codigo, ...d });
}

function salvar() {
    localStorage.setItem(chave, JSON.stringify(pessoas));
}

function carregarPessoas() {
    try {
        return JSON.parse(localStorage.getItem(chave)) || [];
    } catch {
        return [];
    }
}

function ajustarCodigo() {
    pessoas.forEach(p => codigo = Math.max(codigo, p.id));
}

function criarLinha(p) {
    const linha = document.createElement("tr");
    const imc = calcularIMC(p.peso, p.altura);
    const classificacao = classificarIMC(imc);

    [
        p.nome,
        p.idade,
        formatar(p.altura, 2) + " m",
        formatar(p.peso, 1) + " KG",
        formatar(imc, 1)
    ].forEach(valor => {
        const td = document.createElement("td");
        td.textContent = valor;
        linha.appendChild(td);
    });

    const td = document.createElement("td");
    const selo = document.createElement("span");

    selo.classList.add("selo", classificacao.classe);
    selo.textContent = classificacao.texto;

    td.appendChild(selo);
    linha.appendChild(td);

    return linha;
}

function render() {
    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    pessoas.forEach(p => lista.appendChild(criarLinha(p)));
}

function mostrarErro(msg) {
    const erro = document.getElementById("erro");
    erro.textContent = msg;
    erro.hidden = false;
}

function limparErro() {
    document.getElementById("erro").hidden = true;
}

document.getElementById("formPessoa").addEventListener("submit", function(e) {
    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro) {
        mostrarErro(erro);
        return;
    }

    limparErro();
    adicionarPessoa(dados);
    salvar();
    render();

    this.reset();
    document.getElementById("nome").focus();
});

ajustarCodigo();
render();
