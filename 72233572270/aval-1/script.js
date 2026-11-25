
const $ = (id) => document.getElementById(id);

const nome = $("nome");
const peso = $("peso");
const altura = $("altura");
const idade = $("idade");
const sexo = $("sexo");

const resultado = $("resultado");
const historico = $("listaHistorico");

let registros = [];

try {
    registros = JSON.parse(
        localStorage.getItem("historicoIMC") || "[]"
    );

    if (!Array.isArray(registros)) registros = [];
} catch {
    registros = [];
}

// Classificação de adultos
function classificarIMC(imc) {

    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso adequado";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau I";
    if (imc < 40) return "Obesidade grau II";

    return "Obesidade grau III";
}

// Calcular IMC
function calcularIMC() {

    const n = nome.value.trim();
    const p = Number(peso.value);
    const a = Number(altura.value);
    const i = Number(idade.value);
    const s = sexo.value;

    if (
        !n || !peso.value || !altura.value ||
        !idade.value || !s ||
        !Number.isFinite(p) ||
        !Number.isFinite(a) ||
        !Number.isFinite(i) ||
        p <= 0 || a <= 0 || i <= 0 ||
        p > 500 || a > 3 || i > 120
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    const imc = p / (a * a);

    $("saudacao").textContent = "Olá, " + n + "!";

    $("valor").textContent = imc.toFixed(2);

    if (i < 20) {

        $("classificacao").textContent = "Avaliação por idade";

        $("mensagem").textContent =
            "Para menores de 20 anos, a interpretação deve considerar idade e sexo nas curvas de crescimento.";

        $("aviso").textContent =
            "A classificação adulta não se aplica a este resultado.";

        $("progresso").style.width = "0%";

    } else {

        const categoria = classificarIMC(imc);

        $("classificacao").textContent = categoria;

        $("mensagem").textContent =
            "Classificação de referência para adultos.";

        $("aviso").textContent =
            "O IMC não avalia sozinho a saúde de uma pessoa.";

        $("progresso").style.width =
            Math.min((imc / 50) * 100, 100) + "%";
    }

    resultado.hidden = false;

    // Guardar histórico
    const registro = {
        nome: n,
        imc: imc.toFixed(2),
        categoria: i < 20 ? "Avaliação por idade" : classificarIMC(imc),
        data: new Date().toLocaleDateString("pt-BR")
    };

    registros.unshift(registro);

    // Limitar a 10 registros
    registros = registros.slice(0, 10);

    salvarHistorico();
    mostrarHistorico();

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });
}

// Salvar histórico
function salvarHistorico() {

    try {
        localStorage.setItem(
            "historicoIMC",
            JSON.stringify(registros)
        );
    } catch {
        alert("Não foi possível salvar o histórico neste navegador.");
    }
}

// Mostrar histórico
function mostrarHistorico() {

    historico.replaceChildren();

    if (registros.length === 0) {

        const vazio = document.createElement("p");
        vazio.className = "vazio";
        vazio.textContent = "Nenhum cálculo realizado.";

        historico.appendChild(vazio);
        return;
    }

    registros.forEach((item) => {

        const div = document.createElement("div");
        div.className = "item-historico";

        const informacoes = document.createElement("div");

        const nomeItem = document.createElement("strong");
        nomeItem.textContent = item.nome;

        const detalhes = document.createElement("p");
        detalhes.textContent =
            `${item.data} • ${item.categoria}`;

        informacoes.append(nomeItem, detalhes);

        const valorItem = document.createElement("strong");
        valorItem.textContent = item.imc;

        div.append(informacoes, valorItem);

        historico.appendChild(div);
    });
}

// Limpar campos
function limparCampos() {

    nome.value = "";
    peso.value = "";
    altura.value = "";
    idade.value = "";
    sexo.value = "";

    resultado.hidden = true;

    $("valor").textContent = "0.00";
    $("classificacao").textContent = "";
    $("mensagem").textContent = "";
    $("aviso").textContent = "";
    $("progresso").style.width = "0%";

    nome.focus();
}

// Apagar histórico
function limparHistorico() {

    if (!confirm("Deseja apagar todo o histórico?")) {
        return;
    }

    registros = [];

    salvarHistorico();
    mostrarHistorico();
}

// Eventos
$("calcular").addEventListener("click", calcularIMC);
$("limpar").addEventListener("click", limparCampos);

$("limparHistorico").addEventListener(
    "click",
    limparHistorico
);

// Carregar histórico ao abrir
mostrarHistorico();