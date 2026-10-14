```javascript
// PROJETO ECO TECH+
// Reciclagem Inteligente

function orientarDescarte() {
    // Captura o material digitado pelo usuário
    const campo = document.getElementById("material");
    const resultado = document.getElementById("resultado");

    const material = campo.value.trim().toLowerCase();

    // Verifica se o usuário digitou alguma coisa
    if (material === "") {
        resultado.style.display = "block";
        resultado.textContent =
            "Por favor, digite o nome de um material!";
        campo.focus();
        return;
    }

    let mensagem = "";

    // Identifica o tipo de material
    if (
        material.includes("papel") ||
        material.includes("papelão") ||
        material.includes("jornal")
    ) {
        mensagem =
            "PAPEL: encaminhe para a coleta seletiva de papel. " +
            "O material deve estar limpo e seco.";

    } else if (
        material.includes("plástico") ||
        material.includes("garrafa pet") ||
        material.includes("embalagem")
    ) {
        mensagem =
            "PLÁSTICO: esvazie a embalagem e encaminhe para " +
            "a coleta seletiva, conforme as regras da sua cidade.";

    } else if (
        material.includes("vidro") ||
        material.includes("garrafa de vidro")
    ) {
        mensagem =
            "VIDRO: procure um ponto de coleta que aceite esse " +
            "material. Se estiver quebrado, embale com segurança.";

    } else if (
        material.includes("lata") ||
        material.includes("metal") ||
        material.includes("alumínio")
    ) {
        mensagem =
            "METAL: latas vazias podem ser encaminhadas para " +
            "a coleta seletiva de metais.";

    } else if (
        material.includes("pilha") ||
        material.includes("bateria")
    ) {
        mensagem =
            "PILHAS E BATERIAS: não descarte no lixo comum. " +
            "Procure um ponto de coleta específico.";

    } else if (
        material.includes("celular") ||
        material.includes("computador") ||
        material.includes("eletrônico")
    ) {
        mensagem =
            "LIXO ELETRÔNICO: leve o equipamento a um ponto " +
            "de coleta de eletrônicos ou logística reversa.";

    } else if (
        material.includes("óleo")
    ) {
        mensagem =
            "ÓLEO DE COZINHA: armazene em uma garrafa fechada " +
            "e procure um ponto de coleta. Nunca despeje na pia.";

    } else if (
        material.includes("orgânico") ||
        material.includes("casca") ||
        material.includes("comida")
    ) {
        mensagem =
            "RESÍDUO ORGÂNICO: verifique a coleta local ou " +
            "considere a compostagem, quando possível.";

    } else {
        mensagem =
            "Não encontramos uma orientação específica para esse " +
            "material. Consulte a coleta seletiva ou um ecoponto " +
            "da sua cidade.";
    }

    // Exibe a orientação na página
    resultado.style.display = "block";
    resultado.textContent = mensagem;
}

// Permite pesquisar pressionando Enter
document.addEventListener("DOMContentLoaded", function () {
    const campo = document.getElementById("material");

    if (campo) {
        campo.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter") {
                orientarDescarte();
            }
        });
    }
});
```