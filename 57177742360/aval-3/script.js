
const taxas = {
    "Centro": 5,
    "Zona Norte": 7,
    "Zona Sul": 8,
    "Zona Leste": 10
};

function consultarBairro() {
    const campo = document.getElementById("bairro");
    const resultado = document.getElementById("resultado");

    const bairroDigitado = campo.value.trim().toLowerCase();

    const bairroEncontrado = Object.keys(taxas).find(
        bairro => bairro.toLowerCase() === bairroDigitado
    );

    if (!bairroDigitado) {
        resultado.textContent = "Digite o nome de um bairro.";
        resultado.style.color = "#b45309";
        return;
    }

    if (bairroEncontrado) {
        resultado.textContent =
            `Entregamos em ${bairroEncontrado}! Taxa: R$ ${
                taxas[bairroEncontrado].toFixed(2).replace(".", ",")
            }.`;

        resultado.style.color = "#15803d";
    } else {
        resultado.textContent =
            "Bairro não encontrado. Consulte nossa equipe.";

        resultado.style.color = "#b91c1c";
    }
}

document.getElementById("formPedido").addEventListener(
    "submit",
    function(event) {
        event.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const endereco = document.getElementById("endereco").value.trim();
        const bairro = document.getElementById("bairroPedido").value;
        const produto = document.getElementById("produto").value.trim();

        const resumo = document.getElementById("resumo");

        if (!taxas[bairro]) {
            resumo.hidden = false;
            resumo.textContent = "Selecione um bairro válido.";
            return;
        }

        const taxa = taxas[bairro];

        resumo.replaceChildren();

        const titulo = document.createElement("h3");
        titulo.textContent = "Resumo do pedido";

        const dados = [
            `Cliente: ${nome}`,
            `Endereço: ${endereco}`,
            `Bairro: ${bairro}`,
            `Pedido: ${produto}`,
            `Taxa de entrega: R$ ${taxa.toFixed(2).replace(".", ",")}`,
            "Total: valor do produto + taxa de entrega"
        ];

        resumo.appendChild(titulo);

        dados.forEach(texto => {
            const paragrafo = document.createElement("p");
            paragrafo.textContent = texto;
            resumo.appendChild(paragrafo);
        });

        const aviso = document.createElement("small");
        aviso.textContent =
            "Este é apenas um cálculo demonstrativo. O pedido não foi enviado.";
        resumo.appendChild(aviso);

        resumo.hidden = false;
        resumo.scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }
);
