// 1. Geração sequencial de identificadores
let ultimoId = 0;

function gerarId() {
    return ++ultimoId;
}

// 2. Regras de negócio
function calcularIMC(peso, altura) {
    return peso / (altura ** 2);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo-peso" };
    } else if (imc < 25) {
        return { texto: "Peso normal", classe: "peso-normal" };
    } else if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso" };
    } else if (imc < 35) {
        return { texto: "Obesidade grau I", classe: "obesidade-1" };
    } else if (imc < 40) {
        return { texto: "Obesidade grau II", classe: "obesidade-2" };
    }
    return { texto: "Obesidade grau III", classe: "obesidade-3" };
}

function formatarNumero(valor, casasDecimais = 2) {
    return valor.toLocaleString("pt-BR", {
        minimumFractionDigits: casasDecimais,
        maximumFractionDigits: casasDecimais
    });
}

function mensagemObjetivo(objetivo) {
    switch (objetivo) {
        case "cutting":
            return "Foco em défice calórico controlado e manutenção de massa magra.";
        case "bulking":
            return "Foco em excedente calórico gradual e progressão de carga.";
        default:
            return "Foco em manutenção e consistência.";
    }
}

// 3. Dados e processamento
const registros = [
    { id: gerarId(), nome: "Beatriz", idade: 24, peso: 62.4, altura: 1.68, objetivo: "manutencao", ativo: true },
    { id: gerarId(), nome: "Tiago", idade: 31, peso: 84.0, altura: 1.76, objetivo: "cutting", ativo: true }
];

for (const pessoa of registros) {
    const imc = calcularIMC(pessoa.peso, pessoa.altura);
    const classificacao = classificarIMC(imc);
    const resumoStatus = pessoa.ativo && imc > 0 ? "Cadastro válido" : "Revisar cadastro";

    console.log(
        `#${pessoa.id} | ${pessoa.nome} (${pessoa.idade} anos) | ` +
        `IMC: ${formatarNumero(imc, 2)} (${classificacao.texto}) | ` +
        `${resumoStatus} | ${mensagemObjetivo(pessoa.objetivo)}`
    );
}