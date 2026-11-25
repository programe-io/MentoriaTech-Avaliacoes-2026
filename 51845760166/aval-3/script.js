
const formulario = document.getElementById("formAnamnese");
const resultado = document.getElementById("resultado");
const conteudo = document.getElementById("conteudoResultado");

// Campos que exibem detalhes quando a resposta é positiva
const camposCondicionais = [
    ["doenca", "doencaDetalhe", ["Sim"]],
    ["alergia", "alergiaDetalhe", ["Sim"]],
    ["medicamento", "medicamentoDetalhe", ["Sim"]],
    ["cirurgia", "cirurgiaDetalhe", ["Sim"]],
    ["internacao", "internacaoDetalhe", ["Sim"]],
    ["atividade", "atividadeDetalhe", ["Sim", "Ocasionalmente"]]
];

// Controla a exibição dos campos complementares
camposCondicionais.forEach(([selectId, extraId, valores]) => {
    const select = document.getElementById(selectId);
    const extra = document.getElementById(extraId);

    function atualizarCampo() {
        const mostrar = valores.includes(select.value);
        extra.classList.toggle("visible", mostrar);
    }

    select.addEventListener("change", atualizarCampo);
    atualizarCampo();
});

// Adiciona informações ao resultado de forma segura
function adicionarItem(titulo, valor) {
    const item = document.createElement("div");
    item.className = "result-item";

    const heading = document.createElement("h3");
    heading.textContent = titulo;

    const paragrafo = document.createElement("p");
    paragrafo.textContent = valor || "Não informado";

    item.append(heading, paragrafo);
    conteudo.appendChild(item);
}

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    conteudo.replaceChildren();

    const campos = [
        ["Nome completo", "nome"],
        ["Data de nascimento", "nascimento"],
        ["Idade", "idade"],
        ["Telefone", "telefone"],
        ["E-mail", "email"],

        ["Doença ou condição de saúde", "doenca"],
        ["Detalhes de saúde", "doencaDetalhe"],

        ["Alergias", "alergia"],
        ["Detalhes das alergias", "alergiaDetalhe"],

        ["Medicamentos", "medicamento"],
        ["Detalhes dos medicamentos", "medicamentoDetalhe"],

        ["Cirurgias", "cirurgia"],
        ["Detalhes das cirurgias", "cirurgiaDetalhe"],

        ["Internações", "internacao"],
        ["Detalhes das internações", "internacaoDetalhe"],

        ["Histórico familiar", "historicoFamiliar"],

        ["Atividade física", "atividade"],
        ["Detalhes da atividade física", "atividadeDetalhe"],

        ["Qualidade do sono", "sono"],
        ["Alimentação", "alimentacao"],

        ["Queixa principal", "queixa"],
        ["Objetivo ou expectativa", "objetivo"],
        ["Observações adicionais", "observacoes"]
    ];

    campos.forEach(([titulo, id]) => {
        const campo = document.getElementById(id);

        // Não exibe detalhes condicionais quando estão ocultos
        const condicional = camposCondicionais.find(
            ([, extraId]) => extraId === id
        );

        if (condicional && !campo.classList.contains("visible")) {
            return;
        }

        let valor = campo.value.trim();

        if (id === "nascimento" && valor) {
            const partes = valor.split("-");
            valor = `${partes[2]}/${partes[1]}/${partes[0]}`;
        }

        adicionarItem(titulo, valor);
    });

    resultado.hidden = false;
    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

// Imprimir ou salvar como PDF
document.getElementById("imprimir").addEventListener("click", () => {
    window.print();
});

// Limpa o resultado ao reiniciar a ficha
formulario.addEventListener("reset", () => {
    setTimeout(() => {
        resultado.hidden = true;
        conteudo.replaceChildren();

        camposCondicionais.forEach(([, extraId]) => {
            document.getElementById(extraId).classList.remove("visible");
        });
    }, 0);
});
