
const formPessoa = document.getElementById("formPessoa");
const tabelaPessoas = document.getElementById("tabelaPessoas");
const mensagemErro = document.getElementById("mensagemErro");

let pessoas = [];
let proximoId = 1;

/* Funções auxiliares */

function lerFormulario() {
    return {
        nome: document.getElementById("nome").value.trim(),
        idade: Number(document.getElementById("idade").value),
        altura: Number(document.getElementById("altura").value),
        peso: Number(document.getElementById("peso").value)
    };
}

function validarDados(dados) {
    if (!dados.nome) return "Informe o nome do paciente.";
    if (dados.idade <= 0) return "Informe uma idade válida.";
    if (dados.altura <= 0) return "Informe uma altura válida.";
    if (dados.peso <= 0) return "Informe um peso válido.";

    return "";
}

function mostrarErro(erro) {
    mensagemErro.textContent = erro;
}

/* Funções de Negócio */

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function classificarImc(imc) {
    if (imc < 18.5)
        return { texto: "Abaixo do peso", classe: "abaixo" };

    if (imc < 25)
        return { texto: "Peso normal", classe: "normal" };

    if (imc < 30)
        return { texto: "Sobrepeso", classe: "sobrepeso" };

    if (imc < 35)
        return { texto: "Obesidade grau I", classe: "obesidade" };

    if (imc < 40)
        return { texto: "Obesidade grau II", classe: "obesidade" };

    return { texto: "Obesidade grau III", classe: "obesidade" };
}

function formatar(valor, casas) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casas,
        maximumFractionDigits: casas
    });
}

/* Criação da tabela */

function criarCelula(texto) {
    const td = document.createElement("td");
    td.textContent = texto;
    return td;
}

function criarLinha(pessoa) {
    const imc = calcularImc(pessoa.peso, pessoa.altura);
    const classificacao = classificarImc(imc);

    const tr = document.createElement("tr");
    tr.dataset.id = pessoa.id;

    tr.appendChild(criarCelula(pessoa.nome));
    tr.appendChild(criarCelula(pessoa.idade));
    tr.appendChild(criarCelula(formatar(pessoa.altura, 2) + " m"));
    tr.appendChild(criarCelula(formatar(pessoa.peso, 1) + " kg"));
    tr.appendChild(criarCelula(formatar(imc, 2)));

    const tdClassificacao = criarCelula(classificacao.texto);
    tdClassificacao.className = classificacao.classe;
    tr.appendChild(tdClassificacao);

    const tdAcoes = document.createElement("td");
    const botaoExcluir = document.createElement("button");

    botaoExcluir.textContent = "Excluir";
    botaoExcluir.className = "btn-excluir";

    botaoExcluir.addEventListener("click", () => {
        pessoas = pessoas.filter(p => p.id !== pessoa.id);
        render();
    });

    tdAcoes.appendChild(botaoExcluir);
    tr.appendChild(tdAcoes);

    return tr;
}

/* Atualização da tela */

function render() {
    tabelaPessoas.innerHTML = "";

    pessoas.forEach(pessoa => {
        tabelaPessoas.appendChild(criarLinha(pessoa));
    });
}

/* Cadastro do formulário */

formPessoa.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();
    const erro = validarDados(dados);

    if (erro !== "") {
        mostrarErro(erro);
        return;
    }

    pessoas.push({
        id: proximoId++,
        nome: dados.nome,
        idade: dados.idade,
        altura: dados.altura,
        peso: dados.peso
    });

    mensagemErro.textContent = "";

    formPessoa.reset();

    document.getElementById("nome").focus();

    render();
});
