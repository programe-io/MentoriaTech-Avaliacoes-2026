
const formulario = document.getElementById("formulario");
const resultado = document.getElementById("resultado");

const catalogo = [
    {
        nome: "Penalty Max 100",
        campo: "futsal",
        estilos: ["controle", "conforto"],
        pe: ["normal", "naosei"],
        cores: ["preta", "branca"],
        preco: 100,
        resumo: "Uma opção econômica para quem joga futsal recreativo e procura uma chuteira para passes, domínio e partidas do dia a dia."
    },
    {
        nome: "Penalty Max 500",
        campo: "futsal",
        estilos: ["controle", "forca"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca", "azul"],
        preco: 200,
        resumo: "Uma opção para jogadores de futsal que procuram uma chuteira versátil para controlar a bola, passar e finalizar."
    },
    {
        nome: "Joma Top Flex",
        campo: "futsal",
        estilos: ["drible", "controle", "conforto"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca", "azul", "colorida"],
        preco: 450,
        resumo: "Conhecida pela flexibilidade, é uma opção para quem gosta de dribles, passes curtos e movimentação na quadra."
    },
    {
        nome: "Nike Mercurial",
        campo: "campo",
        estilos: ["velocidade", "drible"],
        pe: ["fino", "normal"],
        cores: ["preta", "azul", "vermelha", "colorida"],
        preco: 450,
        resumo: "Uma linha associada à velocidade e às arrancadas, interessante para quem gosta de atacar os espaços e superar adversários."
    },
    {
        nome: "Adidas F50",
        campo: "campo",
        estilos: ["velocidade", "drible"],
        pe: ["fino", "normal"],
        cores: ["azul", "vermelha", "colorida"],
        preco: 450,
        resumo: "Uma linha voltada para jogadores que valorizam leveza, velocidade e mudanças rápidas de direção."
    },
    {
        nome: "Adidas Predator",
        campo: "campo",
        estilos: ["controle", "forca"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca", "vermelha"],
        preco: 500,
        resumo: "Uma linha para quem valoriza controle da bola, passes precisos e finalizações."
    },
    {
        nome: "Mizuno Morelia",
        campo: "campo",
        estilos: ["controle", "conforto"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca"],
        preco: 500,
        resumo: "Uma linha conhecida pelo toque na bola e pelo conforto, interessante para quem prioriza domínio e passes."
    },
    {
        nome: "Puma Future",
        campo: "campo",
        estilos: ["drible", "controle"],
        pe: ["normal", "largo"],
        cores: ["preta", "azul", "colorida"],
        preco: 400,
        resumo: "Uma linha interessante para jogadores criativos que gostam de improvisar e mudar de direção."
    },
    {
        nome: "Penalty Society",
        campo: "society",
        estilos: ["controle", "conforto"],
        pe: ["normal", "largo", "naosei"],
        cores: ["preta", "branca", "azul"],
        preco: 200,
        resumo: "Uma alternativa para partidas de society, com foco em conforto e controle nas jogadas."
    },
    {
        nome: "Nike Mercurial Society",
        campo: "society",
        estilos: ["velocidade", "drible"],
        pe: ["fino", "normal"],
        cores: ["preta", "azul", "vermelha"],
        preco: 350,
        resumo: "Uma opção para quem gosta de arrancadas, velocidade e jogadas ofensivas no society."
    },
    {
        nome: "Adidas Copa Society",
        campo: "society",
        estilos: ["controle", "conforto"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca"],
        preco: 300,
        resumo: "Uma linha que combina com jogadores que valorizam conforto, domínio e passes."
    },
    {
        nome: "Puma Future Society",
        campo: "society",
        estilos: ["drible", "forca"],
        pe: ["normal", "largo"],
        cores: ["preta", "azul", "colorida"],
        preco: 350,
        resumo: "Uma opção para jogadores que gostam de criar jogadas e mudar de direção no society."
    },
    {
        nome: "Joma Top Flex Futsal",
        campo: "futsal",
        estilos: ["drible", "conforto"],
        pe: ["normal", "largo"],
        cores: ["preta", "branca", "azul", "colorida"],
        preco: 400,
        resumo: "Uma opção flexível para quem procura conforto, movimentação e habilidade na quadra."
    },
    {
        nome: "Penalty Campo",
        campo: "campo",
        estilos: ["controle", "conforto"],
        pe: ["normal", "largo", "naosei"],
        cores: ["preta", "branca"],
        preco: 200,
        resumo: "Uma alternativa para quem procura uma opção mais econômica para jogar no campo."
    },
    {
        nome: "Penalty Society de Entrada",
        campo: "society",
        estilos: ["velocidade", "controle", "conforto"],
        pe: ["normal", "largo", "naosei"],
        cores: ["preta", "branca", "azul"],
        preco: 150,
        resumo: "Uma opção de entrada para quem joga society e deseja controlar melhor os gastos."
    }
];

const nomesCampo = {
    campo: "Campo",
    society: "Society",
    futsal: "Futsal / Quadra"
};

const nomesEstilo = {
    velocidade: "Velocidade",
    drible: "Dribles e habilidade",
    controle: "Controle e passes",
    forca: "Força nos chutes",
    conforto: "Conforto e estabilidade"
};

const nomesPe = {
    fino: "Fino",
    normal: "Normal",
    largo: "Largo",
    naosei: "Não informado"
};

const nomesCor = {
    preta: "Preta",
    branca: "Branca",
    azul: "Azul",
    vermelha: "Vermelha",
    verde: "Verde",
    colorida: "Colorida"
};

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const campo = document.getElementById("campo").value;
    const posicao = document.getElementById("posicao").value;
    const estilo = document.getElementById("estilo").value;
    const pe = document.getElementById("pe").value;
    const cor = document.getElementById("cor").value;
    const orcamento = Number(document.getElementById("orcamento").value);

    // Primeiro, mantém apenas os modelos dentro do orçamento.
    const disponiveis = catalogo.filter(function(modelo) {
        return modelo.preco <= orcamento;
    });

    if (disponiveis.length === 0) {
        alert("Não encontramos um modelo cadastrado dentro desse orçamento.");
        return;
    }

    // Calcula a pontuação de cada modelo.
    const classificados = disponiveis.map(function(modelo) {
        let pontos = 0;

        if (modelo.campo === campo) pontos += 10;
        if (modelo.estilos.includes(estilo)) pontos += 5;
        if (modelo.pe.includes(pe)) pontos += 3;
        if (modelo.cores.includes(cor)) pontos += 2;

        // Pequeno ajuste pela posição escolhida.
        if (
            (posicao === "ponta" || posicao === "atacante") &&
            modelo.estilos.includes("velocidade")
        ) {
            pontos += 1;
        }

        if (
            posicao === "meia" &&
            modelo.estilos.includes("controle")
        ) {
            pontos += 1;
        }

        return { ...modelo, pontos };
    });

    // Ordena da maior para a menor pontuação.
    classificados.sort(function(a, b) {
        return b.pontos - a.pontos;
    });

    const melhor = classificados[0];

    document.getElementById("tituloResultado").textContent =
        nome + ", sua chuteira recomendada é " + melhor.nome + "!";

    document.getElementById("subtitulo").textContent =
        "Encontramos uma opção de acordo com suas respostas e seu orçamento.";

    document.getElementById("descricao").textContent =
        melhor.resumo + " Seu estilo escolhido é " +
        nomesEstilo[estilo].toLowerCase() + ".";

    document.getElementById("detalheCampo").textContent =
        nomesCampo[campo];

    document.getElementById("detalheCor").textContent =
        nomesCor[cor];

    document.getElementById("detalhePe").textContent =
        nomesPe[pe];

    document.getElementById("detalhePreco").textContent =
        "Até R$ " + melhor.preco.toFixed(2).replace(".", ",");

    // Imagem ilustrativa com o nome do modelo.
    // Pode ser trocada por uma foto real de cada chuteira.
    const imagem = document.getElementById("imagemChuteira");

    imagem.src =
        "https://placehold.co/700x400/edf5ef/14532d?text=" +
        encodeURIComponent(melhor.nome);

    imagem.alt = "Imagem ilustrativa da " + melhor.nome;

    resultado.hidden = false;

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});

document.getElementById("refazer").addEventListener("click", function() {
    formulario.reset();
    resultado.hidden = true;

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});
