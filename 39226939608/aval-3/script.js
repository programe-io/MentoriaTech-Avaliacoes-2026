/* =========================================
   ELEMENTOS
========================================= */

const form =
    document.getElementById("formTom");

const questions =
    document.querySelectorAll(".question");

const progressBar =
    document.getElementById("progressBar");

const resultSection =
    document.getElementById("resultado");

const resultNome =
    document.getElementById("resultNome");

const resultDescricao =
    document.getElementById("resultDescricao");

const resultMarca =
    document.getElementById("resultMarca");

const resultCodigo =
    document.getElementById("resultCodigo");

const resultColor =
    document.getElementById("resultColor");

const resultProfundidade =
    document.getElementById("resultProfundidade");

const resultSubtom =
    document.getElementById("resultSubtom");

const btnNovoTeste =
    document.getElementById("btnNovoTeste");

const btnTema =
    document.getElementById("btnTema");


/* =========================================
   CONTROLE DO QUIZ
========================================= */

let etapaAtual = 1;


/* =========================================
   MOSTRAR ETAPA
========================================= */

function mostrarEtapa(numero) {

    etapaAtual = numero;


    questions.forEach(
        question => {

            question.classList.remove(
                "active"
            );

            if (
                Number(
                    question.dataset.step
                ) === numero
            ) {

                question.classList.add(
                    "active"
                );
            }
        }
    );


    atualizarProgresso();

    window.scrollTo({
        top:
            document.getElementById(
                "teste"
            ).offsetTop - 80,

        behavior:
            "smooth"
    });
}


/* =========================================
   PROGRESSO
========================================= */

function atualizarProgresso() {

    const porcentagem =
        etapaAtual * 25;

    progressBar.style.width =
        `${porcentagem}%`;
}


/* =========================================
   VALIDAR ETAPA
========================================= */

function validarEtapa(numero) {

    const question =
        document.querySelector(
            `.question[data-step="${numero}"]`
        );


    const inputs =
        question.querySelectorAll(
            "input[required]"
        );


    const select =
        question.querySelector(
            "select[required]"
        );


    if (select) {

        if (
            select.value === ""
        ) {

            alert(
                "Selecione uma opção para continuar."
            );

            return false;
        }
    }


    if (inputs.length > 0) {

        const algumSelecionado =
            [...inputs].some(
                input =>
                    input.checked
            );


        if (!algumSelecionado) {

            alert(
                "Escolha uma opção para continuar."
            );

            return false;
        }
    }


    return true;
}


/* =========================================
   BOTÕES PRÓXIMO
========================================= */

document
    .querySelectorAll(
        ".next-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const proxima =
                        Number(
                            button.dataset.next
                        );


                    if (
                        validarEtapa(
                            etapaAtual
                        )
                    ) {

                        mostrarEtapa(
                            proxima
                        );
                    }
                }
            );
        }
    );


/* =========================================
   BOTÕES VOLTAR
========================================= */

document
    .querySelectorAll(
        ".back-button"
    )
    .forEach(
        button => {

            button.addEventListener(
                "click",
                () => {

                    const anterior =
                        Number(
                            button.dataset.back
                        );

                    mostrarEtapa(
                        anterior
                    );
                }
            );
        }
    );


/* =========================================
   DADOS DAS REFERÊNCIAS
========================================= */

const referencias = {

    "clara": {

        "quente": {
            nome: "Clara Dourada",
            cor: "#e8b99f",
            codigo: "C10",
            descricao:
                "Uma referência clara com aparência dourada e quente."
        },

        "frio": {
            nome: "Clara Rosada",
            cor: "#e4b8ad",
            codigo: "C05",
            descricao:
                "Uma referência clara com aparência rosada e subtom frio."
        },

        "neutro": {
            nome: "Clara Neutra",
            cor: "#e6bba8",
            codigo: "C08",
            descricao:
                "Uma referência clara e equilibrada entre características quentes e frias."
        }
    },


    "media-clara": {

        "quente": {
            nome: "Média Clara Dourada",
            cor: "#d99b7b",
            codigo: "MC20",
            descricao:
                "Uma referência média clara com aparência dourada."
        },

        "frio": {
            nome: "Média Clara Rosada",
            cor: "#d59b91",
            codigo: "MC15",
            descricao:
                "Uma referência média clara com aparência rosada."
        },

        "neutro": {
            nome: "Média Clara Neutra",
            cor: "#d3a087",
            codigo: "MC18",
            descricao:
                "Uma referência média clara com subtom equilibrado."
        }
    },


    "media": {

        "quente": {
            nome: "Média Dourada",
            cor: "#c88968",
            codigo: "M30",
            descricao:
                "Uma referência média com fundo dourado."
        },

        "frio": {
            nome: "Média Rosada",
            cor: "#bd8278",
            codigo: "M25",
            descricao:
                "Uma referência média com fundo rosado."
        },

        "neutro": {
            nome: "Média Neutra",
            cor: "#bf896f",
            codigo: "M28",
            descricao:
                "Uma referência média com subtom equilibrado."
        }
    },


    "media-escura": {

        "quente": {
            nome: "Média Escura Dourada",
            cor: "#a8664e",
            codigo: "ME35",
            descricao:
                "Uma referência média escura com fundo dourado."
        },

        "frio": {
            nome: "Média Escura Rosada",
            cor: "#9d6258",
            codigo: "ME30",
            descricao:
                "Uma referência média escura com fundo mais rosado."
        },

        "neutro": {
            nome: "Média Escura Neutra",
            cor: "#9e6a55",
            codigo: "ME33",
            descricao:
                "Uma referência média escura equilibrada."
        }
    },


    "escura": {

        "quente": {
            nome: "Escura Dourada",
            cor: "#744538",
            codigo: "E45",
            descricao:
                "Uma referência escura com aparência dourada."
        },

        "frio": {
            nome: "Escura Rosada",
            cor: "#6d423d",
            codigo: "E40",
            descricao:
                "Uma referência escura com fundo rosado."
        },

        "neutro": {
            nome: "Escura Neutra",
            cor: "#70483e",
            codigo: "E43",
            descricao:
                "Uma referência escura com características equilibradas."
        }
    }

};


/* =========================================
   SUBTOM EM TEXTO
========================================= */

function nomeSubtom(subtom) {

    const nomes = {

        quente:
            "Subtom quente",

        frio:
            "Subtom frio",

        neutro:
            "Subtom neutro"
    };


    return nomes[subtom];
}


/* =========================================
   PROFUNDIDADE EM TEXTO
========================================= */

function nomeProfundidade(profundidade) {

    const nomes = {

        clara:
            "Profundidade clara",

        "media-clara":
            "Profundidade média clara",

        media:
            "Profundidade média",

        "media-escura":
            "Profundidade média escura",

        escura:
            "Profundidade escura"
    };


    return nomes[profundidade];
}


/* =========================================
   GERAR RESULTADO
========================================= */

function gerarResultado() {

    const profundidade =
        document.querySelector(
            'input[name="profundidade"]:checked'
        ).value;


    const subtom =
        document.querySelector(
            'input[name="subtom"]:checked'
        ).value;


    const sol =
        document.querySelector(
            'input[name="sol"]:checked'
        ).value;


    const marca =
        document.getElementById(
            "marca"
        ).value;


    const referencia =
        referencias
            [profundidade]
            [subtom];


    /* ==============================
       RESULTADO
    =============================== */

    resultNome.textContent =
        referencia.nome;


    resultDescricao.textContent =
        referencia.descricao;


    resultCodigo.textContent =
        `${marca} ${referencia.codigo}`;


    resultMarca.textContent =
        marca;


    resultColor.style.background =
        referencia.cor;


    resultProfundidade.textContent =
        nomeProfundidade(
            profundidade
        );


    resultSubtom.textContent =
        nomeSubtom(
            subtom
        );


    /* ==============================
       OBSERVAÇÃO SOBRE O SOL
    =============================== */

    let observacaoSol = "";


    if (
        sol === "queima"
    ) {

        observacaoSol =
            "Sua resposta sobre exposição solar sugere atenção especial ao subtom e à iluminação durante o teste.";

    } else if (
        sol === "bronzeia"
    ) {

        observacaoSol =
            "Sua resposta indica uma reação intermediária ao sol.";

    } else {

        observacaoSol =
            "Sua resposta indica facilidade para ganhar cor com a exposição solar.";
    }


    resultDescricao.textContent +=
        " " +
        observacaoSol;


    /* ==============================
       SALVAR
    =============================== */

    const dados = {

        profundidade,

        subtom,

        sol,

        marca,

        referencia
    };


    localStorage.setItem(
        "meuTomIdeal",
        JSON.stringify(
            dados
        )
    );


    /* ==============================
       EXIBIR
    =============================== */

    resultSection.classList.add(
        "show"
    );


    setTimeout(
        () => {

            resultSection.scrollIntoView({
                behavior:
                    "smooth"
            });

        },
        100
    );
}


/* =========================================
   FORMULÁRIO
========================================= */

form.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (
            !validarEtapa(
                etapaAtual
            )
        ) {

            return;
        }


        gerarResultado();
    }
);


/* =========================================
   NOVO TESTE
========================================= */

btnNovoTeste.addEventListener(
    "click",
    function() {

        form.reset();

        resultSection.classList.remove(
            "show"
        );

        mostrarEtapa(1);


        window.scrollTo({
            top:
                document.getElementById(
                    "teste"
                ).offsetTop - 80,

            behavior:
                "smooth"
        });
    }
);


/* =========================================
   TEMA
========================================= */

btnTema.addEventListener(
    "click",
    function() {

        document.body.classList.toggle(
            "dark"
        );


        const darkMode =
            document.body.classList.contains(
                "dark"
            );


        btnTema.textContent =
            darkMode
                ? "☀️"
                : "🌙";


        localStorage.setItem(
            "meuTomTema",
            darkMode
                ? "dark"
                : "light"
        );
    }
);


/* =========================================
   CARREGAR TEMA
========================================= */

function carregarTema() {

    const tema =
        localStorage.getItem(
            "meuTomTema"
        );


    if (
        tema === "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

        btnTema.textContent =
            "☀️";
    }
}


/* =========================================
   CARREGAR RESULTADO ANTERIOR
========================================= */

function carregarResultadoAnterior() {

    const salvo =
        localStorage.getItem(
            "meuTomIdeal"
        );


    if (!salvo) {
        return;
    }


    try {

        const dados =
            JSON.parse(
                salvo
            );


        if (
            dados.referencia
        ) {

            resultNome.textContent =
                dados.referencia.nome;

            resultDescricao.textContent =
                dados.referencia.descricao;

            resultCodigo.textContent =
                `${dados.marca} ${dados.referencia.codigo}`;

            resultMarca.textContent =
                dados.marca;

            resultColor.style.background =
                dados.referencia.cor;

            resultProfundidade.textContent =
                nomeProfundidade(
                    dados.profundidade
                );

            resultSubtom.textContent =
                nomeSubtom(
                    dados.subtom
                );
        }

    } catch (erro) {

        console.log(
            "Não foi possível carregar o resultado anterior."
        );
    }
}


/* =========================================
   INICIALIZAÇÃO
========================================= */

carregarTema();

carregarResultadoAnterior();

atualizarProgresso();