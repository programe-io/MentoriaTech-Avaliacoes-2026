1. index.html
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <meta
        name="description"
        content="Corações Cruzados - Novela"
    >

    <title>Corações Cruzados | Novela</title>

    <link rel="stylesheet" href="style.css">
</head>

<body>

    <!-- =================================
         CABEÇALHO
    ================================== -->

    <header class="header">

        <a href="#inicio" class="logo">
            CORAÇÕES
            <span>CRUZADOS</span>
        </a>

        <nav class="menu">

            <a href="#inicio">Início</a>

            <a href="#historia">História</a>

            <a href="#personagens">Personagens</a>

            <a href="#capitulos">Capítulos</a>

        </nav>

        <button
            id="temaBtn"
            class="tema-btn"
            aria-label="Alterar tema"
        >
            🌙
        </button>

    </header>


    <!-- =================================
         CONTEÚDO
    ================================== -->

    <main>

        <!-- HERO -->

        <section id="inicio" class="hero">

            <div class="hero-overlay"></div>

            <div class="hero-content">

                <p class="subtitulo">
                    UMA HISTÓRIA DE AMOR, SEGREDOS E VINGANÇA
                </p>

                <h1>
                    CORAÇÕES<br>
                    <span>CRUZADOS</span>
                </h1>

                <p class="descricao">

                    Dois corações separados pelo passado
                    descobrem que suas famílias escondem
                    um segredo capaz de mudar suas vidas
                    para sempre.

                </p>

                <div class="botoes">

                    <a
                        href="#capitulos"
                        class="btn btn-principal"
                    >
                        ▶ Ver capítulos
                    </a>

                    <a
                        href="#historia"
                        class="btn btn-secundario"
                    >
                        📖 Conheça a história
                    </a>

                </div>

            </div>

        </section>


        <!-- =================================
             HISTÓRIA
        ================================== -->

        <section
            id="historia"
            class="secao historia"
        >

            <div class="titulo-secao">

                <p>A HISTÓRIA</p>

                <h2>
                    UM AMOR PROIBIDO
                </h2>

            </div>

            <div class="historia-grid">

                <div>

                    <p>

                        Helena Duarte é uma jovem determinada
                        que vive em uma pequena cidade e sonha
                        em descobrir a verdade sobre a morte
                        misteriosa de seu pai.

                    </p>

                    <p>

                        Anos depois, ela conhece Rafael
                        Montenegro, herdeiro de uma das famílias
                        mais poderosas da região.

                    </p>

                </div>

                <div>

                    <p>

                        O que Helena não sabe é que as duas
                        famílias estão ligadas por um segredo
                        enterrado há décadas.

                    </p>

                    <p>

                        Enquanto o amor entre Helena e Rafael
                        cresce, a poderosa Laura Montenegro fará
                        de tudo para impedir que a verdade venha
                        à tona.

                    </p>

                </div>

            </div>

        </section>


        <!-- =================================
             PERSONAGENS
        ================================== -->

        <section
            id="personagens"
            class="secao"
        >

            <div class="titulo-secao">

                <p>ELENCO</p>

                <h2>
                    PERSONAGENS
                </h2>

            </div>

            <div
                id="personagensContainer"
                class="personagens-grid"
            ></div>

        </section>


        <!-- =================================
             CAPÍTULOS
        ================================== -->

        <section
            id="capitulos"
            class="secao capitulos"
        >

            <div class="titulo-secao">

                <p>ACOMPANHE A HISTÓRIA</p>

                <h2>
                    CAPÍTULOS
                </h2>

            </div>

            <div class="filtros">

                <input
                    type="search"
                    id="pesquisa"
                    placeholder="🔎 Buscar capítulo..."
                >

                <select id="filtro">

                    <option value="todos">
                        Todos
                    </option>

                    <option value="romance">
                        Romance
                    </option>

                    <option value="drama">
                        Drama
                    </option>

                    <option value="mistério">
                        Mistério
                    </option>

                </select>

            </div>

            <div
                id="capitulosContainer"
                class="capitulos-grid"
            ></div>

        </section>


        <!-- =================================
             SOBRE
        ================================== -->

        <section class="sobre secao">

            <div>

                <p class="label">
                    SOBRE A NOVELA
                </p>

                <h2>
                    CORAÇÕES CRUZADOS
                </h2>

            </div>

            <p>

                Uma história completamente fictícia
                criada para demonstrar um projeto
                utilizando HTML, CSS e JavaScript.

                <br><br>

                A novela mistura romance, drama,
                mistério e conflitos familiares.

            </p>

        </section>

    </main>


    <!-- =================================
         MODAL
    ================================== -->

    <div
        id="modal"
        class="modal"
    >

        <div class="modal-content">

            <button
                id="fecharModal"
                class="fechar"
            >
                ×
            </button>

            <div
                id="modalIcone"
                class="modal-icone"
            >
            </div>

            <div class="modal-info">

                <span id="modalCategoria"></span>

                <h2 id="modalTitulo"></h2>

                <p id="modalDescricao"></p>

                <div id="modalDetalhes"></div>

            </div>

        </div>

    </div>


    <!-- =================================
         RODAPÉ
    ================================== -->

    <footer>

        <div class="logo-footer">
            CORAÇÕES CRUZADOS
        </div>

        <p>
            Novela fictícia criada para fins educacionais.
        </p>

        <p>
            © <span id="ano"></span>
            Corações Cruzados
        </p>

    </footer>


    <script src="script.js"></script>

</body>

</html>
2. style.css
/* ======================================
   RESET
====================================== */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

body {
    font-family:
        Arial,
        Helvetica,
        sans-serif;

    background: #fff8f8;

    color: #333;

    line-height: 1.6;

    overflow-x: hidden;

    transition:
        background 0.3s,
        color 0.3s;
}

a {
    text-decoration: none;

    color: inherit;
}


/* ======================================
   CABEÇALHO
====================================== */

.header {
    height: 75px;

    position: fixed;

    top: 0;
    left: 0;

    width: 100%;

    padding:
        0 7%;

    display: flex;

    align-items: center;

    justify-content: space-between;

    background:
        rgba(70, 10, 35, 0.96);

    color: white;

    z-index: 1000;

    box-shadow:
        0 3px 15px
        rgba(0, 0, 0, 0.2);
}


/* ======================================
   LOGO
====================================== */

.logo {
    font-family:
        Georgia,
        serif;

    font-size: 20px;

    font-weight: bold;

    letter-spacing: 2px;

    line-height: 0.9;

    text-align: center;

    color: white;
}

.logo span {
    display: block;

    color: #ffb3c6;

    font-size: 16px;
}


/* ======================================
   MENU
====================================== */

.menu {
    display: flex;

    gap: 30px;
}

.menu a {
    font-size: 14px;

    font-weight: bold;

    text-transform: uppercase;

    transition: 0.3s;
}

.menu a:hover {
    color: #ff9fba;
}


/* ======================================
   TEMA
====================================== */

.tema-btn {
    width: 40px;
    height: 40px;

    border-radius: 50%;

    border: 1px solid #ffffff66;

    background: transparent;

    color: white;

    cursor: pointer;

    font-size: 17px;
}


/* ======================================
   HERO
====================================== */

.hero {
    min-height: 100vh;

    position: relative;

    display: flex;

    align-items: center;

    padding:
        120px 8%
        70px;

    background:
        linear-gradient(
            90deg,
            #450b28,
            #7d234a,
            #b85773
        );

    color: white;
}

.hero-overlay {
    position: absolute;

    inset: 0;

    background:
        radial-gradient(
            circle at 80% 30%,
            rgba(255,255,255,0.2),
            transparent 35%
        );
}

.hero-content {
    position: relative;

    max-width: 650px;
}

.subtitulo {
    color: #ffd1dc;

    font-size: 13px;

    font-weight: bold;

    letter-spacing: 4px;

    margin-bottom: 20px;
}

.hero h1 {
    font-family:
        Georgia,
        serif;

    font-size:
        clamp(50px, 8vw, 100px);

    line-height: 0.85;

    margin-bottom: 30px;

    text-shadow:
        0 5px 15px
        rgba(0,0,0,0.3);
}

.hero h1 span {
    color: #ffd1dc;
}

.descricao {
    font-size: 18px;

    color: #f6dfe5;

    max-width: 570px;

    margin-bottom: 30px;
}


/* ======================================
   BOTÕES
====================================== */

.botoes {
    display: flex;

    gap: 15px;
}

.btn {
    padding:
        13px 22px;

    border-radius: 5px;

    font-weight: bold;

    transition: 0.3s;
}

.btn-principal {
    background: white;

    color: #6e1740;
}

.btn-principal:hover {
    background: #ffe1e9;

    transform:
        translateY(-3px);
}

.btn-secundario {
    border:
        1px solid #ffffff88;

    color: white;
}

.btn-secundario:hover {
    background:
        rgba(255,255,255,0.1);
}


/* ======================================
   SEÇÕES
====================================== */

.secao {
    max-width: 1250px;

    margin: auto;

    padding:
        90px 7%;
}

.titulo-secao {
    margin-bottom: 40px;
}

.titulo-secao p,
.label {
    color: #a52258;

    font-size: 12px;

    font-weight: bold;

    letter-spacing: 4px;
}

.titulo-secao h2,
.sobre h2 {
    font-family:
        Georgia,
        serif;

    font-size: 40px;

    color: #4c1530;
}


/* ======================================
   HISTÓRIA
====================================== */

.historia {
    background: white;

    max-width: none;

    padding-left: 10%;
    padding-right: 10%;
}

.historia-grid {
    max-width: 1000px;

    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 60px;
}

.historia-grid p {
    color: #666;

    margin-bottom: 20px;

    font-size: 16px;
}


/* ======================================
   PERSONAGENS
====================================== */

.personagens-grid {
    display: grid;

    grid-template-columns:
        repeat(4, 1fr);

    gap: 25px;
}

.personagem {
    background: white;

    border-radius: 8px;

    overflow: hidden;

    box-shadow:
        0 5px 20px
        rgba(90, 20, 50, 0.08);

    border:
        1px solid #f0dce3;

    cursor: pointer;

    transition:
        transform 0.3s,
        box-shadow 0.3s;
}

.personagem:hover {
    transform:
        translateY(-8px);

    box-shadow:
        0 15px 30px
        rgba(100, 20, 50, 0.15);
}

.personagem-imagem {
    height: 230px;

    display: flex;

    align-items: center;

    justify-content: center;

    background:
        linear-gradient(
            135deg,
            #f5c8d6,
            #8c3156
        );

    font-size: 90px;
}

.personagem-info {
    padding: 20px;
}

.personagem-info h3 {
    color: #4c1530;

    font-size: 20px;
}

.personagem-info p {
    color: #999;

    font-size: 14px;
}


/* ======================================
   CAPÍTULOS
====================================== */

.capitulos {
    background: #fff;

    max-width: none;

    padding-left: 10%;
    padding-right: 10%;
}

.filtros {
    display: flex;

    gap: 15px;

    margin-bottom: 30px;
}

#pesquisa,
#filtro {
    padding: 12px 15px;

    border:
        1px solid #ddd;

    border-radius: 5px;

    background: white;

    outline: none;

    font-size: 15px;
}

#pesquisa {
    width: 300px;
}

#pesquisa:focus,
#filtro:focus {
    border-color: #a52258;
}

.capitulos-grid {
    display: grid;

    grid-template-columns:
        repeat(3, 1fr);

    gap: 20px;
}

.capitulo {
    background: #fffafa;

    border:
        1px solid #eedde4;

    border-radius: 7px;

    padding: 25px;

    cursor: pointer;

    transition: 0.3s;
}

.capitulo:hover {
    border-color: #b53b68;

    transform:
        translateY(-5px);

    box-shadow:
        0 10px 25px
        rgba(90, 20, 50, 0.1);
}

.capitulo-numero {
    color: #a52258;

    font-weight: bold;

    font-size: 13px;
}

.capitulo h3 {
    color: #4c1530;

    margin:
        8px 0;
}

.capitulo p {
    color: #777;

    font-size: 14px;
}


/* ======================================
   SOBRE
====================================== */

.sobre {
    display: grid;

    grid-template-columns:
        1fr 1fr;

    gap: 60px;

    align-items: center;

    background:
        #4c1530;

    color: white;

    max-width: none;

    padding-left: 10%;
    padding-right: 10%;
}

.sobre h2 {
    color: white;
}

.sobre .label {
    color: #ffadc2;
}

.sobre > p {
    color: #ead9df;
}


/* ======================================
   MODAL
====================================== */

.modal {
    display: none;

    position: fixed;

    inset: 0;

    background:
        rgba(30, 0, 15, 0.85);

    z-index: 3000;

    align-items: center;

    justify-content: center;

    padding: 20px;
}

.modal.ativo {
    display: flex;
}

.modal-content {
    position: relative;

    max-width: 700px;

    width: 100%;

    background: white;

    border-radius: 10px;

    padding: 40px;

    box-shadow:
        0 20px 60px
        rgba(0,0,0,0.3);

    animation:
        aparecer 0.3s ease;
}

@keyframes aparecer {

    from {
        opacity: 0;

        transform:
            translateY(20px);
    }

    to {
        opacity: 1;

        transform:
            translateY(0);
    }
}

.fechar {
    position: absolute;

    right: 15px;
    top: 15px;

    width: 40px;
    height: 40px;

    border: none;

    border-radius: 50%;

    background: #f3dce4;

    color: #6e1740;

    font-size: 25px;

    cursor: pointer;
}

.modal-icone {
    font-size: 80px;

    margin-bottom: 15px;
}

.modal-info span {
    color: #a52258;

    font-weight: bold;

    text-transform: uppercase;

    font-size: 12px;

    letter-spacing: 2px;
}

.modal-info h2 {
    font-family: Georgia, serif;

    color: #4c1530;

    font-size: 35px;

    margin:
        10px 0 20px;
}

.modal-info p {
    color: #666;
}


/* ======================================
   RODAPÉ
====================================== */

footer {
    background: #260b18;

    color: #c9aab6;

    text-align: center;

    padding: 40px 20px;
}

.logo-footer {
    font-family: Georgia, serif;

    color: white;

    font-size: 22px;

    margin-bottom: 10px;
}


/* ======================================
   MODO ESCURO
====================================== */

body.escuro {
    background: #151015;

    color: #eee;
}

body.escuro .historia,
body.escuro .capitulos {
    background: #1c171a;
}

body.escuro .personagem,
body.escuro .capitulo {
    background: #241e21;

    border-color: #44343b;
}

body.escuro .personagem-info h3,
body.escuro .capitulo h3 {
    color: #ffd0dc;
}

body.escuro .personagem-info p,
body.escuro .capitulo p,
body.escuro .historia-grid p {
    color: #aaa;
}

body.escuro .titulo-secao h2 {
    color: #ffd0dc;
}

body.escuro #pesquisa,
body.escuro #filtro {
    background: #241e21;

    color: white;

    border-color: #55434b;
}


/* ======================================
   RESPONSIVIDADE
====================================== */

@media (max-width: 1000px) {

    .personagens-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

    .capitulos-grid {
        grid-template-columns:
            repeat(2, 1fr);
    }

}

@media (max-width: 700px) {

    .header {
        padding:
            0 20px;
    }

    .menu {
        display: none;
    }

    .hero {
        padding:
            120px 25px
            60px;
    }

    .hero h1 {
        font-size: 55px;
    }

    .botoes {
        flex-direction: column;
    }

    .btn {
        text-align: center;
    }

    .historia-grid,
    .sobre {
        grid-template-columns: 1fr;
    }

    .personagens-grid,
    .capitulos-grid {
        grid-template-columns: 1fr;
    }

    .filtros {
        flex-direction: column;
    }

    #pesquisa {
        width: 100%;
    }

    .titulo-secao h2,
    .sobre h2 {
        font-size: 32px;
    }

}
3. script.js
"use strict";


/* ======================================
   PERSONAGENS
====================================== */

const personagens = [

    {
        nome: "Helena Duarte",

        papel: "Protagonista",

        icone: "👩🏻",

        descricao:
            "Uma jovem determinada que busca descobrir a verdade sobre o passado de sua família."
    },

    {
        nome: "Rafael Montenegro",

        papel: "Protagonista",

        icone: "👨🏻",

        descricao:
            "Herdeiro da poderosa família Montenegro. Apaixona-se por Helena sem conhecer todos os segredos de suas famílias."
    },

    {
        nome: "Laura Montenegro",

        papel: "Antagonista",

        icone: "👠",

        descricao:
            "Uma mulher poderosa e determinada que fará de tudo para proteger os segredos da família."
    },

    {
        nome: "Miguel Duarte",

        papel: "Pai de Helena",

        icone: "👨🏻‍💼",

        descricao:
            "Sua morte misteriosa é uma das peças principais do grande segredo da novela."
    },

    {
        nome: "Clara Duarte",

        papel: "Mãe de Helena",

        icone: "👩🏻‍🦰",

        descricao:
            "Uma mulher que guarda informações importantes sobre o passado da família."
    },

    {
        nome: "Gabriel Costa",

        papel: "Melhor amigo",

        icone: "🧑🏻",

        descricao:
            "Amigo fiel de Helena que ajuda a investigar os acontecimentos misteriosos."
    },

    {
        nome: "Beatriz Almeida",

        papel: "Amiga de Helena",

        icone: "👩🏻",

        descricao:
            "Uma jovem inteligente que acaba envolvida nos conflitos da família Montenegro."
    },

    {
        nome: "Eduardo Montenegro",

        papel: "Patriarca",

        icone: "👔",

        descricao:
            "O poderoso patriarca dos Montenegro, que conhece mais sobre o passado do que revela."
    }

];


/* ======================================
   CAPÍTULOS
====================================== */

const capitulos = [

    {
        numero: 1,

        titulo:
            "O encontro inesperado",

        categoria: "romance",

        descricao:
            "Helena e Rafael se encontram pela primeira vez durante uma festa na cidade."
    },

    {
        numero: 2,

        titulo:
            "Um segredo do passado",

        categoria: "mistério",

        descricao:
            "Helena encontra uma antiga fotografia que pode revelar a verdade sobre seu pai."
    },

    {
        numero: 3,

        titulo:
            "A ameaça",

        categoria: "drama",

        descricao:
            "Laura percebe que Helena está investigando o passado e decide agir."
    },

    {
        numero: 4,

        titulo:
            "A carta escondida",

        categoria: "mistério",

        descricao:
            "Uma carta antiga chega às mãos de Helena e muda completamente sua investigação."
    },

    {
        numero: 5,

        titulo:
            "Entre dois corações",

        categoria: "romance",

        descricao:
            "Rafael revela seus sentimentos por Helena, mas descobre que suas famílias são inimigas."
    },

    {
        numero: 6,

        titulo:
            "A verdade começa a aparecer",

        categoria: "drama",

        descricao:
            "Clara decide finalmente contar parte do segredo que guardou durante anos."
    },

    {
        numero: 7,

        titulo:
            "O desaparecimento",

        categoria: "mistério",

        descricao:
            "Uma pessoa importante desaparece e Helena acredita que Laura está envolvida."
    },

    {
        numero: 8,

        titulo:
            "Uma escolha difícil",

        categoria: "romance",

        descricao:
            "Rafael precisa escolher entre sua família e o amor que sente por Helena."
    },

    {
        numero: 9,

        titulo:
            "A grande revelação",

        categoria: "drama",

        descricao:
            "Uma descoberta coloca em risco tudo aquilo que Helena acreditava saber."
    },

    {
        numero: 10,

        titulo:
            "O segredo",

        categoria: "mistério",

        descricao:
            "Helena finalmente descobre a conexão entre a morte de seu pai e a família Montenegro."
    },

    {
        numero: 11,

        titulo:
            "Confronto",

        categoria: "drama",

        descricao:
            "Helena confronta Laura e exige que ela conte toda a verdade."
    },

    {
        numero: 12,

        titulo:
            "Corações cruzados",

        categoria: "romance",

        descricao:
            "Helena e Rafael precisam decidir se o amor será capaz de superar o passado."
    }

];


/* ======================================
   ELEMENTOS
====================================== */

const personagensContainer =
    document.querySelector(
        "#personagensContainer"
    );

const capitulosContainer =
    document.querySelector(
        "#capitulosContainer"
    );

const pesquisa =
    document.querySelector(
        "#pesquisa"
    );

const filtro =
    document.querySelector(
        "#filtro"
    );

const modal =
    document.querySelector(
        "#modal"
    );

const fecharModal =
    document.querySelector(
        "#fecharModal"
    );

const modalIcone =
    document.querySelector(
        "#modalIcone"
    );

const modalCategoria =
    document.querySelector(
        "#modalCategoria"
    );

const modalTitulo =
    document.querySelector(
        "#modalTitulo"
    );

const modalDescricao =
    document.querySelector(
        "#modalDescricao"
    );

const modalDetalhes =
    document.querySelector(
        "#modalDetalhes"
    );

const temaBtn =
    document.querySelector(
        "#temaBtn"
    );

const ano =
    document.querySelector(
        "#ano"
    );


/* ======================================
   MOSTRAR PERSONAGENS
====================================== */

function mostrarPersonagens() {

    personagensContainer.innerHTML = "";

    personagens.forEach(
        (personagem) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "personagem";

            card.innerHTML = `

                <div class="personagem-imagem">

                    ${personagem.icone}

                </div>

                <div class="personagem-info">

                    <h3>
                        ${personagem.nome}
                    </h3>

                    <p>
                        ${personagem.papel}
                    </p>

                </div>

            `;


            card.addEventListener(
                "click",
                () => {

                    abrirModalPersonagem(
                        personagem
                    );

                }
            );


            personagensContainer.appendChild(
                card
            );

        }
    );

}


/* ======================================
   MOSTRAR CAPÍTULOS
====================================== */

function mostrarCapitulos(
    lista = capitulos
) {

    capitulosContainer.innerHTML = "";

    if (lista.length === 0) {

        capitulosContainer.innerHTML = `

            <p>
                Nenhum capítulo encontrado.
            </p>

        `;

        return;
    }


    lista.forEach(
        (capitulo) => {

            const card =
                document.createElement(
                    "article"
                );

            card.className =
                "capitulo";

            card.innerHTML = `

                <span class="capitulo-numero">

                    CAPÍTULO
                    ${capitulo.numero}

                </span>

                <h3>
                    ${capitulo.titulo}
                </h3>

                <p>
                    ${capitulo.descricao}
                </p>

            `;


            card.addEventListener(
                "click",
                () => {

                    abrirModalCapitulo(
                        capitulo
                    );

                }
            );


            capitulosContainer.appendChild(
                card
            );

        }
    );

}


/* ======================================
   BUSCA
====================================== */

function filtrarCapitulos() {

    const termo =
        pesquisa.value
            .toLowerCase()
            .trim();

    const categoria =
        filtro.value;


    const resultados =
        capitulos.filter(
            (capitulo) => {

                const correspondeTexto =
                    capitulo.titulo
                        .toLowerCase()
                        .includes(termo) ||
                    capitulo.descricao
                        .toLowerCase()
                        .includes(termo);


                const correspondeCategoria =
                    categoria === "todos" ||
                    capitulo.categoria === categoria;


                return (
                    correspondeTexto &&
                    correspondeCategoria
                );

            }
        );


    mostrarCapitulos(
        resultados
    );

}


pesquisa.addEventListener(
    "input",
    filtrarCapitulos
);


filtro.addEventListener(
    "change",
    filtrarCapitulos
);


/* ======================================
   MODAL PERSONAGEM
====================================== */

function abrirModalPersonagem(
    personagem
) {

    modalIcone.textContent =
        personagem.icone;

    modalCategoria.textContent =
        personagem.papel;

    modalTitulo.textContent =
        personagem.nome;

    modalDescricao.textContent =
        personagem.descricao;

    modalDetalhes.innerHTML = `
        <p>
            Personagem da novela
            <strong>Corações Cruzados</strong>.
        </p>
    `;


    abrirModal();

}


/* ======================================
   MODAL CAPÍTULO
====================================== */

function abrirModalCapitulo(
    capitulo
) {

    modalIcone.textContent =
        "📺";

    modalCategoria.textContent =
        `Capítulo ${capitulo.numero}`;

    modalTitulo.textContent =
        capitulo.titulo;

    modalDescricao.textContent =
        capitulo.descricao;

    modalDetalhes.innerHTML = `
        <p>
            Categoria:
            <strong>
                ${capitulo.categoria}
            </strong>
        </p>
    `;


    abrirModal();

}


/* ======================================
   ABRIR MODAL
====================================== */

function abrirModal() {

    modal.classList.add(
        "ativo"
    );

    document.body.style.overflow =
        "hidden";

}


/* ======================================
   FECHAR MODAL
====================================== */

function fechar() {

    modal.classList.remove(
        "ativo"
    );

    document.body.style.overflow =
        "auto";

}


fecharModal.addEventListener(
    "click",
    fechar
);


modal.addEventListener(
    "click",
    (event) => {

        if (
            event.target === modal
        ) {

            fechar();

        }

    }
);


/* ======================================
   ESC FECHA MODAL
====================================== */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape"
        ) {

            fechar();

        }

    }
);


/* ======================================
   MODO ESCURO
====================================== */

let escuro = false;


temaBtn.addEventListener(
    "click",
    () => {

        escuro =
            !escuro;

        document.body.classList.toggle(
            "escuro"
        );


        temaBtn.textContent =
            escuro
                ? "☀️"
                : "🌙";

    }
);


/* ======================================
   ANO AUTOMÁTICO
====================================== */

ano.textContent =
    new Date().getFullYear();


/* ======================================
   INICIALIZAÇÃO
====================================== */

mostrarPersonagens();

mostrarCapitulos();
Estrutura do projeto
Corações-Cruzados/
│
├── index.html
├── style.css
└── script.js