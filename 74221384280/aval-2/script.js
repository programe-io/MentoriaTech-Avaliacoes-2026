// ==========================================
// BOTÕES DOS PERFIS
// ==========================================

function mostrarPerfil(politico) {

    if (politico === "Lula") {

        alert(
            "Luiz Inácio Lula da Silva\n\n" +
            "Nascido em Garanhuns (PE), em 27 de outubro de 1945.\n\n" +
            "Sua trajetória política começou ligada ao movimento sindical. " +
            "Participou da fundação do Partido dos Trabalhadores e foi " +
            "presidente da República em diferentes períodos."
        );

    } else if (politico === "Bolsonaro") {

        alert(
            "Jair Messias Bolsonaro\n\n" +
            "Nascido em Glicério (SP), em 21 de março de 1955.\n\n" +
            "Foi militar, vereador no Rio de Janeiro e deputado federal. " +
            "Foi eleito presidente da República em 2018 e exerceu o cargo " +
            "de 2019 a 2022."
        );
    }
}


// ==========================================
// PESQUISA
// ==========================================

const campoPesquisa = document.getElementById("pesquisa");
const resultado = document.getElementById("resultado-pesquisa");

campoPesquisa.addEventListener("input", function () {

    const texto = campoPesquisa.value.toLowerCase().trim();

    if (texto === "") {

        resultado.innerHTML = "";

        return;
    }

    const palavras = {

        "lula":
            "Lula: trajetória sindical, fundação do PT, eleições presidenciais e mandatos.",

        "bolsonaro":
            "Bolsonaro: trajetória militar, atuação como deputado federal e Presidência entre 2019 e 2022.",

        "pt":
            "PT: Partido dos Trabalhadores, fundado em 1980.",

        "presidente":
            "O site apresenta informações sobre diferentes períodos presidenciais.",

        "política":
            "Política envolve instituições, decisões públicas, partidos, eleições e participação cidadã."

    };

    let encontrado = false;

    for (const palavra in palavras) {

        if (palavra.includes(texto) || texto.includes(palavra)) {

            resultado.innerHTML =
                `<p>🔎 ${palavras[palavra]}</p>`;

            encontrado = true;

            break;
        }
    }

    if (!encontrado) {

        resultado.innerHTML =
            `<p>Nenhuma informação encontrada para "${texto}".</p>`;

    }

});


// ==========================================
// ANO ATUAL NO CONSOLE
// ==========================================

const anoAtual = new Date().getFullYear();

console.log(
    `Política Brasil - ${anoAtual}`
);
