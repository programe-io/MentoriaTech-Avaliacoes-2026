/* ==========================================================
   ASTRO 2026
   DADOS + INTERAÇÕES
========================================================== */


/* ==========================================================
   CONFIGURAÇÃO
========================================================== */

const eventos = [

    /* ======================================================
       JANEIRO
    ====================================================== */

    {
        id: 1,
        nome: "Chuva de meteoros Quadrântidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-01-03T05:00:00",
        dataFim: "2026-01-03T23:59:00",
        icone: "✦",

        descricao:
            "As Quadrântidas atingem seu máximo no início de janeiro. " +
            "A atividade pode ser intensa, embora o pico seja relativamente curto.",

        observacao:
            "Procure um local escuro e observe durante as horas anteriores ao amanhecer.",

        visibilidade:
            "O radiante está em declinação norte, portanto a chuva favorece o hemisfério norte. " +
            "No hemisfério sul a observação é mais limitada.",

        curiosidade:
            "As Quadrântidas estão associadas ao objeto 2003 EH1 e podem produzir meteoros brilhantes.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 2,
        nome: "Júpiter em oposição",
        astro: "Júpiter",
        categoria: "Oposição",
        data: "2026-01-10T17:42:00",
        dataFim: "2026-01-10T23:59:00",
        icone: "♃",

        descricao:
            "Júpiter chega à oposição, ficando aproximadamente alinhado com a Terra " +
            "e o Sol e apresentando excelente visibilidade noturna.",

        observacao:
            "Procure Júpiter após o anoitecer. Binóculos ou telescópios pequenos " +
            "podem revelar suas principais luas.",

        visibilidade:
            "Visível durante grande parte da noite, dependendo da latitude e das condições locais.",

        curiosidade:
            "Na oposição, um planeta exterior tende a ficar mais brilhante e melhor posicionado para observação.",

        fonte:
            "https://science.nasa.gov/solar-system/skywatching/whats-up-january-2026-skywatching-tips-from-nasa/"
    },


    /* ======================================================
       FEVEREIRO
    ====================================================== */

    {
        id: 3,
        nome: "Grande configuração planetária",
        astro: "Eclipses",
        categoria: "Conjunção",
        data: "2026-02-28T18:30:00",
        dataFim: "2026-02-28T22:00:00",
        icone: "✦",

        descricao:
            "Mercúrio, Vênus, Netuno, Saturno, Urano e Júpiter aparecem " +
            "na mesma região geral do céu após o pôr do Sol.",

        observacao:
            "Procure o céu ocidental logo após o pôr do Sol. " +
            "Binóculos ou telescópio serão necessários para Urano e Netuno.",

        visibilidade:
            "A visibilidade exata depende da latitude, horizonte e condições atmosféricas.",

        curiosidade:
            "O termo 'desfile planetário' é popular, mas não é uma classificação técnica da astronomia.",

        fonte:
            "https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/"
    },


    /* ======================================================
       MARÇO
    ====================================================== */

    {
        id: 4,
        nome: "Eclipse lunar total",
        astro: "Lua",
        categoria: "Eclipses",
        data: "2026-03-03T11:35:00Z",
        dataFim: "2026-03-03T15:00:00Z",
        icone: "🌕",

        descricao:
            "A Lua atravessa a sombra da Terra e ocorre um eclipse lunar total. " +
            "Durante a totalidade, a Lua pode adquirir uma coloração avermelhada.",

        observacao:
            "Não são necessários equipamentos especiais para observar um eclipse lunar.",

        visibilidade:
            "O eclipse será especialmente favorável à América do Norte e poderá ser observado " +
            "em diferentes graus conforme a região.",

        curiosidade:
            "A coloração avermelhada acontece porque a atmosfera terrestre filtra e refrata parte da luz solar em direção à Lua.",

        fonte:
            "https://science.nasa.gov/moon/eclipses/"
    },

    {
        id: 5,
        nome: "Equinócio de março",
        astro: "Sol",
        categoria: "Sol",
        data: "2026-03-20T14:46:00Z",
        dataFim: "2026-03-20T23:59:00Z",
        icone: "☀",

        descricao:
            "O equinócio marca um dos dois momentos do ano em que o Sol cruza o equador celeste.",

        observacao:
            "É um evento astronômico global; a experiência local está relacionada à duração do dia e da noite.",

        visibilidade:
            "O fenômeno ocorre para toda a Terra.",

        curiosidade:
            "O equinócio de março marca o início da primavera astronômica no hemisfério norte e do outono astronômico no sul.",

        fonte:
            "https://eclipse.gsfc.nasa.gov/SKYCAL/SKYCAL.html?cal=2026"
    },


    /* ======================================================
       MERCÚRIO — RETRÓGRADOS
    ====================================================== */

    {
        id: 6,
        nome: "Mercúrio retrógrado — 1º período",
        astro: "Mercúrio",
        categoria: "Retrogrado",
        data: "2026-02-26T00:00:00",
        dataFim: "2026-03-20T23:59:00",
        icone: "☿",

        descricao:
            "Mercúrio apresenta um movimento retrógrado aparente no céu.",

        observacao:
            "O movimento é um efeito de perspectiva observado da Terra. " +
            "Ele não significa que Mercúrio esteja invertendo sua órbita.",

        visibilidade:
            "O movimento retrógrado é determinado pela posição aparente do planeta em relação às estrelas.",

        curiosidade:
            "Os períodos retrógrados de Mercúrio acontecem várias vezes ao longo de um ano.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },

    {
        id: 7,
        nome: "Mercúrio — maior elongação",
        astro: "Mercúrio",
        categoria: "Mercúrio",
        data: "2026-04-04T07:00:00",
        dataFim: "2026-04-04T23:59:00",
        icone: "☿",

        descricao:
            "Mercúrio alcança uma grande elongação a oeste do Sol.",

        observacao:
            "Essas ocasiões podem proporcionar uma janela favorável para localizar Mercúrio no céu.",

        visibilidade:
            "A observação depende da altitude do planeta em relação ao horizonte e do horário local.",

        curiosidade:
            "Mercúrio nunca se afasta muito do Sol visto da Terra.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },


    /* ======================================================
       ABRIL
    ====================================================== */

    {
        id: 8,
        nome: "Chuva de meteoros Líridas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-04-22T04:00:00",
        dataFim: "2026-04-22T23:59:00",
        icone: "✦",

        descricao:
            "As Líridas atingem seu máximo anual em abril.",

        observacao:
            "As melhores oportunidades normalmente ocorrem nas horas anteriores ao amanhecer.",

        visibilidade:
            "Favorecem latitudes do hemisfério norte, mas também podem ser observadas no sul em condições adequadas.",

        curiosidade:
            "A chuva está associada ao cometa C/1861 G1 Thatcher.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },


    /* ======================================================
       MAIO
    ====================================================== */

    {
        id: 9,
        nome: "Chuva de meteoros Eta Aquáridas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-05-05T04:00:00",
        dataFim: "2026-05-05T23:59:00",
        icone: "✦",

        descricao:
            "A Eta Aquáridas atinge seu pico em maio e é conhecida por meteoros rápidos.",

        observacao:
            "Observe principalmente antes do amanhecer, olhando para uma área ampla do céu.",

        visibilidade:
            "É especialmente interessante para observadores do hemisfério sul.",

        curiosidade:
            "A chuva está associada ao famoso cometa Halley.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 10,
        nome: "Lua Azul sazonal",
        astro: "Lua",
        categoria: "Lua",
        data: "2026-05-31T00:00:00",
        dataFim: "2026-05-31T23:59:00",
        icone: "🌕",

        descricao:
            "A Lua cheia de 31 de maio corresponde à chamada Lua Azul sazonal, " +
            "uma classificação baseada na ocorrência de quatro luas cheias em uma estação astronômica.",

        observacao:
            "A Lua cheia é facilmente observável a olho nu.",

        visibilidade:
            "Visível em todo o planeta durante a noite local, conforme o horário do nascer e pôr da Lua.",

        curiosidade:
            "Apesar do nome, a Lua Azul não fica necessariamente azul.",

        fonte:
            "https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/"
    },


    /* ======================================================
       JUNHO
    ====================================================== */

    {
        id: 11,
        nome: "Conjunção Vênus e Júpiter",
        astro: "Vênus",
        categoria: "Conjunção",
        data: "2026-06-09T18:00:00",
        dataFim: "2026-06-09T23:59:00",
        icone: "♀",

        descricao:
            "Vênus e Júpiter aparecem muito próximos no céu, formando uma das conjunções planetárias mais interessantes do ano.",

        observacao:
            "Procure os dois planetas após o pôr do Sol, baixos no céu ocidental.",

        visibilidade:
            "A visibilidade depende do horizonte local e das condições atmosféricas.",

        curiosidade:
            "Os dois planetas estarão separados por menos de 2 graus no céu na ocasião da conjunção.",

        fonte:
            "https://apod.nasa.gov/apod/ap260612.html"
    },

    {
        id: 12,
        nome: "Solstício de junho",
        astro: "Sol",
        categoria: "Sol",
        data: "2026-06-21T00:00:00",
        dataFim: "2026-06-21T23:59:00",
        icone: "☀",

        descricao:
            "O solstício marca o início do verão astronômico no hemisfério norte e do inverno astronômico no hemisfério sul.",

        observacao:
            "É um evento astronômico global e não depende de instrumentos.",

        visibilidade:
            "O efeito observado varia conforme a latitude.",

        curiosidade:
            "No hemisfério sul, o solstício de junho corresponde ao menor período de luz diurna do ano.",

        fonte:
            "https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/"
    },


    /* ======================================================
       MERCÚRIO — SEGUNDO PERÍODO
    ====================================================== */

    {
        id: 13,
        nome: "Mercúrio retrógrado — 2º período",
        astro: "Mercúrio",
        categoria: "Retrogrado",
        data: "2026-06-29T00:00:00",
        dataFim: "2026-07-24T23:59:00",
        icone: "☿",

        descricao:
            "Mercúrio entra novamente em movimento retrógrado aparente.",

        observacao:
            "O fenômeno é uma mudança aparente no movimento do planeta contra o fundo de estrelas.",

        visibilidade:
            "O efeito pode ser acompanhado por observadores usando cartas celestes e aplicativos astronômicos.",

        curiosidade:
            "O fenômeno ocorre por causa da geometria orbital relativa entre a Terra e Mercúrio.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },


    /* ======================================================
       JULHO
    ====================================================== */

    {
        id: 14,
        nome: "Chuva de meteoros Delta Aquáridas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-07-30T03:00:00",
        dataFim: "2026-07-30T23:59:00",
        icone: "✦",

        descricao:
            "A Delta Aquáridas do Sul atinge seu máximo no final de julho.",

        observacao:
            "As horas posteriores à meia-noite e anteriores ao amanhecer são favoráveis.",

        visibilidade:
            "É uma chuva particularmente interessante para o hemisfério sul.",

        curiosidade:
            "A taxa zenital horária prevista para 2026 é de aproximadamente 25 meteoros por hora em condições ideais.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },


    /* ======================================================
       AGOSTO
    ====================================================== */

    {
        id: 15,
        nome: "Eclipse solar total",
        astro: "Sol",
        categoria: "Eclipses",
        data: "2026-08-12T00:00:00Z",
        dataFim: "2026-08-12T23:59:00Z",
        icone: "☀",

        descricao:
            "A Lua passará diante do Sol produzindo um eclipse solar total ao longo de uma faixa que atravessa partes do norte da Rússia, Groenlândia, Islândia, Atlântico e Espanha.",

        observacao:
            "Nunca observe diretamente o Sol sem proteção solar apropriada e certificada.",

        visibilidade:
            "A totalidade será visível em partes da Groenlândia, Islândia, norte da Rússia e Espanha, além de uma pequena região de Portugal.",

        curiosidade:
            "Regiões muito maiores verão apenas uma fase parcial do eclipse.",

        fonte:
            "https://science.nasa.gov/eclipses/future-eclipses/total-solar-eclipse-on-august-12-2026/"
    },

    {
        id: 16,
        nome: "Chuva de meteoros Perseidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-08-13T04:00:00",
        dataFim: "2026-08-13T23:59:00",
        icone: "☄",

        descricao:
            "Uma das chuvas de meteoros mais famosas do ano atinge seu pico em agosto.",

        observacao:
            "2026 apresenta condições particularmente favoráveis devido à proximidade da Lua Nova.",

        visibilidade:
            "As Perseidas favorecem o hemisfério norte, mas meteoros também podem ser observados em latitudes do sul.",

        curiosidade:
            "A taxa zenital horária prevista pela American Meteor Society é de aproximadamente 100 meteoros por hora em condições ideais.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 17,
        nome: "Vênus em maior elongação",
        astro: "Vênus",
        categoria: "Vênus",
        data: "2026-08-15T15:00:00",
        dataFim: "2026-08-15T23:59:00",
        icone: "♀",

        descricao:
            "Vênus atinge uma grande elongação oriental de aproximadamente 45,9° em relação ao Sol.",

        observacao:
            "Procure Vênus baixo no céu após o pôr do Sol.",

        visibilidade:
            "A visibilidade exata depende da latitude e do horizonte local.",

        curiosidade:
            "Vênus é normalmente o objeto natural mais brilhante do céu noturno depois da Lua.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },

    {
        id: 18,
        nome: "Eclipse lunar parcial",
        astro: "Lua",
        categoria: "Eclipses",
        data: "2026-08-28T02:04:00Z",
        dataFim: "2026-08-28T23:59:00Z",
        icone: "🌑",

        descricao:
            "A Lua atravessará parcialmente a sombra umbral da Terra.",

        observacao:
            "Não é necessário equipamento especial para observar um eclipse lunar.",

        visibilidade:
            "Será visível em grande parte das Américas e também em partes da Europa e África.",

        curiosidade:
            "Diferentemente de um eclipse solar, observar um eclipse lunar a olho nu é seguro.",

        fonte:
            "https://science.nasa.gov/moon/eclipses/"
    },


    /* ======================================================
       SETEMBRO
    ====================================================== */

    {
        id: 19,
        nome: "Netuno em oposição",
        astro: "Netuno",
        categoria: "Oposição",
        data: "2026-09-26T10:36:00",
        dataFim: "2026-09-26T23:59:00",
        icone: "♆",

        descricao:
            "Netuno alcança oposição, ficando aproximadamente do lado oposto ao Sol no céu visto da Terra.",

        observacao:
            "Por ser muito distante e fraco, Netuno exige normalmente um telescópio para ser identificado.",

        visibilidade:
            "A oposição proporciona uma boa época anual para tentar observar o planeta.",

        curiosidade:
            "Netuno foi descoberto em 1846 a partir de previsões matemáticas relacionadas à órbita de Urano.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },

    {
        id: 20,
        nome: "Equinócio de setembro",
        astro: "Sol",
        categoria: "Sol",
        data: "2026-09-23T00:06:00Z",
        dataFim: "2026-09-23T23:59:00Z",
        icone: "☀",

        descricao:
            "O Sol cruza novamente o equador celeste, marcando o equinócio de setembro.",

        observacao:
            "Evento astronômico global.",

        visibilidade:
            "Seus efeitos sazonais são observados em toda a Terra.",

        curiosidade:
            "Marca o início do outono astronômico no hemisfério sul e da primavera no hemisfério norte.",

        fonte:
            "https://eclipse.gsfc.nasa.gov/SKYCAL/SKYCAL.html?cal=2026"
    },


    /* ======================================================
       VÊNUS RETRÓGRADO
    ====================================================== */

    {
        id: 21,
        nome: "Vênus retrógrado",
        astro: "Vênus",
        categoria: "Retrogrado",
        data: "2026-10-02T22:40:00",
        dataFim: "2026-11-12T23:59:00",
        icone: "♀",

        descricao:
            "Vênus apresenta um movimento retrógrado aparente no céu durante este período.",

        observacao:
            "O fenômeno é aparente e resulta da geometria orbital entre a Terra, Vênus e o Sol.",

        visibilidade:
            "O movimento pode ser acompanhado ao longo de várias noites comparando a posição de Vênus com estrelas de referência.",

        curiosidade:
            "Vênus não muda de direção em sua órbita heliocêntrica; o efeito é uma mudança aparente vista da Terra.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },


    /* ======================================================
       OUTUBRO
    ====================================================== */

    {
        id: 22,
        nome: "Saturno em oposição",
        astro: "Saturno",
        categoria: "Oposição",
        data: "2026-10-04T21:29:00",
        dataFim: "2026-10-04T23:59:00",
        icone: "♄",

        descricao:
            "Saturno chega à oposição e fica especialmente bem posicionado para observação.",

        observacao:
            "Um pequeno telescópio pode revelar os anéis de Saturno.",

        visibilidade:
            "Visível durante boa parte da noite nas proximidades da oposição.",

        curiosidade:
            "Os anéis de Saturno são compostos principalmente por partículas de gelo e rocha.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },

    {
        id: 23,
        nome: "Chuva de meteoros Orionidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-10-23T05:00:00",
        dataFim: "2026-10-23T23:59:00",
        icone: "✦",

        descricao:
            "As Orionidas atingem seu máximo em outubro.",

        observacao:
            "Procure uma área escura após a meia-noite.",

        visibilidade:
            "Pode ser observada nos dois hemisférios, com diferentes condições de altitude do radiante.",

        curiosidade:
            "Assim como as Eta Aquáridas, as Orionidas são produzidas por partículas deixadas pelo cometa Halley.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },


    /* ======================================================
       MERCÚRIO — TERCEIRO PERÍODO
    ====================================================== */

    {
        id: 24,
        nome: "Mercúrio retrógrado — 3º período",
        astro: "Mercúrio",
        categoria: "Retrogrado",
        data: "2026-10-24T20:49:00",
        dataFim: "2026-11-13T23:59:00",
        icone: "☿",

        descricao:
            "Mercúrio apresenta seu terceiro período de movimento retrógrado aparente de 2026.",

        observacao:
            "Compare a posição aparente de Mercúrio em relação às estrelas ao longo de várias noites.",

        visibilidade:
            "A possibilidade de observação direta de Mercúrio varia bastante durante o período.",

        curiosidade:
            "Mercúrio completa sua órbita ao redor do Sol em apenas cerca de 88 dias.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },


    /* ======================================================
       NOVEMBRO
    ====================================================== */

    {
        id: 25,
        nome: "Chuva de meteoros Leonidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-11-18T05:00:00",
        dataFim: "2026-11-18T23:59:00",
        icone: "☄",

        descricao:
            "As Leonidas atingem seu máximo em novembro.",

        observacao:
            "As melhores condições geralmente ocorrem durante as horas da madrugada.",

        visibilidade:
            "Pode ser observada nos dois hemisférios.",

        curiosidade:
            "As Leonidas estão associadas ao cometa 55P/Tempel-Tuttle.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 26,
        nome: "Urano em oposição",
        astro: "Urano",
        categoria: "Oposição",
        data: "2026-11-26T07:41:00",
        dataFim: "2026-11-26T23:59:00",
        icone: "♅",

        descricao:
            "Urano alcança oposição, proporcionando uma das melhores épocas do ano para procurar o planeta.",

        observacao:
            "Binóculos potentes ou telescópio podem ser necessários dependendo das condições.",

        visibilidade:
            "A oposição aumenta o período em que Urano fica acima do horizonte durante a noite.",

        curiosidade:
            "Urano foi o primeiro planeta descoberto com auxílio de um telescópio, em 1781.",

        fonte:
            "https://eco.mtk.nao.ac.jp/cgi-bin/koyomi/cande/phenomena_en.cgi"
    },


    /* ======================================================
       DEZEMBRO
    ====================================================== */

    {
        id: 27,
        nome: "Chuva de meteoros Geminidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-12-14T01:00:00",
        dataFim: "2026-12-14T23:59:00",
        icone: "✦",

        descricao:
            "As Geminidas são uma das chuvas de meteoros mais confiáveis do ano.",

        observacao:
            "Observe depois da meia-noite em local escuro e permita que os olhos se adaptem à escuridão.",

        visibilidade:
            "Pode ser observada em ambos os hemisférios.",

        curiosidade:
            "Diferentemente de muitas grandes chuvas, as Geminidas estão associadas ao asteroide 3200 Phaethon.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 28,
        nome: "Solstício de dezembro",
        astro: "Sol",
        categoria: "Sol",
        data: "2026-12-21T00:00:00",
        dataFim: "2026-12-21T23:59:00",
        icone: "☀",

        descricao:
            "O solstício de dezembro marca o início do verão astronômico no hemisfério sul e do inverno no hemisfério norte.",

        observacao:
            "Evento global que pode ser acompanhado pelas mudanças sazonais na duração do dia.",

        visibilidade:
            "Seus efeitos dependem da latitude.",

        curiosidade:
            "No hemisfério sul, o solstício de dezembro marca o período de maior duração da luz diurna do ano.",

        fonte:
            "https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/"
    },

    {
        id: 29,
        nome: "Chuva de meteoros Ursidas",
        astro: "Meteoros",
        categoria: "Meteoros",
        data: "2026-12-22T05:00:00",
        dataFim: "2026-12-22T23:59:00",
        icone: "✦",

        descricao:
            "As Ursidas encerram o calendário das principais chuvas de meteoros de 2026.",

        observacao:
            "Procure o céu nas horas da madrugada, longe da poluição luminosa.",

        visibilidade:
            "A chuva favorece o hemisfério norte devido à alta declinação do radiante.",

        curiosidade:
            "As Ursidas estão associadas ao cometa 8P/Tuttle.",

        fonte:
            "https://www.amsmeteors.org/meteor-showers/2020-meteor-shower-list/4920/"
    },

    {
        id: 30,
        nome: "Superlua de dezembro",
        astro: "Lua",
        categoria: "Lua",
        data: "2026-12-24T00:00:00",
        dataFim: "2026-12-24T23:59:00",
        icone: "🌕",

        descricao:
            "Uma Lua cheia próxima do perigeu fará com que o disco lunar aparente ficar um pouco maior e mais brilhante.",

        observacao:
            "Procure a Lua próxima do horizonte no momento do nascer ou pôr para um efeito visual marcante.",

        visibilidade:
            "Visível em grande parte do planeta durante a noite local.",

        curiosidade:
            "O termo superlua é usado para uma Lua cheia que ocorre próxima do ponto de maior aproximação da Lua com a Terra.",

        fonte:
            "https://www.nasa.gov/blogs/watch-the-skies/2026/01/16/most-notable-2026-astronomical-events-a-year-of-watching-the-skies/"
    }

];


/* ==========================================================
   ESTADO
========================================================== */

let astroAtual = "Todos";
let mesAtual = "Todos";


/* ==========================================================
   ELEMENTOS
========================================================== */

const eventFeed = document.getElementById("eventFeed");
const eventCount = document.getElementById("eventCount");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const monthSelect = document.getElementById("monthSelect");

const modal = document.getElementById("eventModal");
const closeModal = document.getElementById("closeModal");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalAstro = document.getElementById("modalAstro");
const modalDate = document.getElementById("modalDate");
const modalIcon = document.getElementById("modalIcon");

const modalDescription =
    document.getElementById("modalDescription");

const modalObservation =
    document.getElementById("modalObservation");

const modalVisibility =
    document.getElementById("modalVisibility");

const modalCuriosity =
    document.getElementById("modalCuriosity");

const modalSource =
    document.getElementById("modalSource");


/* ==========================================================
   FORMATADORES
========================================================== */

const formatDate = (dateString) => {

    const date = new Date(dateString);

    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            day: "2-digit",
            month: "long",
            year: "numeric"
        }
    ).format(date);
};


const formatDateShort = (dateString) => {

    const date = new Date(dateString);

    return new Intl.DateTimeFormat(
        "pt-BR",
        {
            day: "2-digit",
            month: "short"
        }
    ).format(date);
};


/* ==========================================================
   FILTRAGEM
========================================================== */

function getFilteredEvents() {

    const search =
        searchInput.value
            .trim()
            .toLowerCase();

    return eventos
        .filter(evento => {

            const matchesAstro =
                astroAtual === "Todos" ||
                evento.astro === astroAtual ||
                (
                    astroAtual === "Eclipses" &&
                    evento.categoria === "Eclipses"
                );

            const matchesMonth =
                mesAtual === "Todos" ||
                evento.data.substring(5, 7) === mesAtual;

            const searchableText = [

                evento.nome,
                evento.astro,
                evento.categoria,
                evento.descricao,
                formatDate(evento.data)

            ]
                .join(" ")
                .toLowerCase();

            const matchesSearch =
                !search ||
                searchableText.includes(search);

            return (
                matchesAstro &&
                matchesMonth &&
                matchesSearch
            );
        })
        .sort(
            (a, b) =>
                new Date(a.data) -
                new Date(b.data)
        );
}


/* ==========================================================
   RENDER FEED
========================================================== */

function renderEvents() {

    const filtered =
        getFilteredEvents();

    eventFeed.innerHTML = "";

    eventCount.textContent =
        `${filtered.length} ${
            filtered.length === 1
                ? "evento"
                : "eventos"
        }`;

    if (!filtered.length) {

        emptyState.classList.remove("hidden");

        return;
    }

    emptyState.classList.add("hidden");


    filtered.forEach((evento, index) => {

        const card =
            document.createElement("article");

        card.className = "event-card";

        card.style.animationDelay =
            `${index * 35}ms`;

        card.innerHTML = `

            <div class="event-icon">
                ${evento.icone}
            </div>

            <div class="event-main">

                <div class="event-date">
                    ${formatDateShort(evento.data)}
                </div>

                <h3>
                    ${evento.nome}
                </h3>

                <p>
                    ${evento.descricao}
                </p>

                <div class="event-tags">

                    <span class="event-tag">
                        ${evento.astro}
                    </span>

                    <span class="event-tag">
                        ${getCategoryLabel(evento.categoria)}
                    </span>

                </div>

            </div>

            <button
                class="event-action"
                data-event-id="${evento.id}"
            >
                Ver detalhes
            </button>

        `;

        eventFeed.appendChild(card);
    });


    document
        .querySelectorAll(".event-action")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const id =
                        Number(button.dataset.eventId);

                    openModal(id);
                }
            );
        });
}


/* ==========================================================
   CATEGORIAS
========================================================== */

function getCategoryLabel(category) {

    const labels = {

        Retrogrado:
            "Movimento retrógrado",

        Oposição:
            "Oposição",

        Conjunção:
            "Conjunção",

        Meteoros:
            "Chuva de meteoros",

        Eclipses:
            "Eclipse",

        Sol:
            "Evento solar",

        Lua:
            "Evento lunar",

        Vênus:
            "Vênus"

    };

    return labels[category] || category;
}


/* ==========================================================
   FILTROS DOS PLANETAS
========================================================== */

document
    .querySelectorAll(".filter-btn")
    .forEach(button => {

        button.addEventListener(
            "click",
            () => {

                document
                    .querySelectorAll(".filter-btn")
                    .forEach(btn =>
                        btn.classList.remove("active")
                    );

                button.classList.add("active");

                astroAtual =
                    button.dataset.astro;

                renderEvents();
            }
        );
    });


/* ==========================================================
   FILTRO DE MÊS
========================================================== */

monthSelect.addEventListener(
    "change",
    event => {

        mesAtual =
            event.target.value;

        renderEvents();
    }
);


/* ==========================================================
   PESQUISA
========================================================== */

searchInput.addEventListener(
    "input",
    renderEvents
);


/* ==========================================================
   MODAL
========================================================== */

function openModal(id) {

    const evento =
        eventos.find(item => item.id === id);

    if (!evento) return;

    modalIcon.textContent =
        evento.icone;

    modalCategory.textContent =
        getCategoryLabel(evento.categoria);

    modalTitle.textContent =
        evento.nome;

    modalAstro.textContent =
        `✦ ${evento.astro}`;

    modalDate.textContent =
        `📅 ${formatDate(evento.data)}`;

    modalDescription.textContent =
        evento.descricao;

    modalObservation.textContent =
        evento.observacao;

    modalVisibility.textContent =
        evento.visibilidade;

    modalCuriosity.textContent =
        evento.curiosidade;

    modalSource.href =
        evento.fonte;

    modal.classList.add("open");

    modal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeEventModal() {

    modal.classList.remove("open");

    modal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


closeModal.addEventListener(
    "click",
    closeEventModal
);


document
    .querySelector("[data-close-modal]")
    .addEventListener(
        "click",
        closeEventModal
    );


document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape" &&
            modal.classList.contains("open")
        ) {
            closeEventModal();
        }
    }
);


/* ==========================================================
   PRÓXIMO EVENTO
========================================================== */

function getNextEvent() {

    const now =
        new Date();

    return eventos
        .filter(
            evento =>
                new Date(evento.data) > now
        )
        .sort(
            (a, b) =>
                new Date(a.data) -
                new Date(b.data)
        )[0];
}


function updateNextEvent() {

    const next =
        getNextEvent();

    const name =
        document.getElementById(
            "nextEventName"
        );

    const description =
        document.getElementById(
            "nextEventDescription"
        );

    const date =
        document.getElementById(
            "nextEventDate"
        );

    if (!next) {

        name.textContent =
            "Calendário de 2026 encerrado";

        description.textContent =
            "Todos os eventos cadastrados para 2026 já aconteceram.";

        return;
    }

    name.textContent =
        next.nome;

    description.textContent =
        `${next.icone} ${next.astro} · ${getCategoryLabel(next.categoria)}`;

    date.textContent =
        formatDate(next.data);
}


function updateCountdown() {

    const next =
        getNextEvent();

    if (!next) return;

    const target =
        new Date(next.data).getTime();

    const now =
        Date.now();

    let difference =
        target - now;

    if (difference < 0) {
        updateNextEvent();
        return;
    }

    const day =
        1000 * 60 * 60 * 24;

    const hour =
        1000 * 60 * 60;

    const minute =
        1000 * 60;

    const days =
        Math.floor(
            difference / day
        );

    difference %= day;

    const hours =
        Math.floor(
            difference / hour
        );

    difference %= hour;

    const minutes =
        Math.floor(
            difference / minute
        );

    const seconds =
        Math.floor(
            (difference % minute) / 1000
        );


    document.getElementById("days")
        .textContent =
        String(days).padStart(2, "0");

    document.getElementById("hours")
        .textContent =
        String(hours).padStart(2, "0");

    document.getElementById("minutes")
        .textContent =
        String(minutes).padStart(2, "0");

    document.getElementById("seconds")
        .textContent =
        String(seconds).padStart(2, "0");
}


/* ==========================================================
   ECLIPSES
========================================================== */

function renderEclipses() {

    const grid =
        document.getElementById(
            "eclipseGrid"
        );

    const eclipses =
        eventos.filter(
            evento =>
                evento.categoria === "Eclipses"
        );

    grid.innerHTML = "";

    eclipses.forEach(evento => {

        const card =
            document.createElement("article");

        card.className =
            "eclipse-card";

        card.innerHTML = `

            <div class="eclipse-orb"></div>

            <span class="section-label">
                ${evento.astro === "Sol"
                    ? "ECLIPSE SOLAR"
                    : "ECLIPSE LUNAR"}
            </span>

            <h3>
                ${evento.nome}
            </h3>

            <p>
                ${evento.descricao}
            </p>

            <div class="eclipse-date">
                ${formatDate(evento.data)}
            </div>

        `;

        grid.appendChild(card);
    });
}


/* ==========================================================
   TIMELINE
========================================================== */

function renderTimeline() {

    const timeline =
        document.getElementById(
            "timeline"
        );

    timeline.innerHTML = "";

    const timelineEvents =
        [...eventos]
            .sort(
                (a, b) =>
                    new Date(a.data) -
                    new Date(b.data)
            );

    timelineEvents.forEach(evento => {

        const item =
            document.createElement("div");

        item.className =
            "timeline-item";

        item.innerHTML = `

            <span class="timeline-dot"></span>

            <div class="timeline-card">

                <div class="timeline-date">
                    ${formatDateShort(evento.data)}
                </div>

                <h3>
                    ${evento.nome}
                </h3>

                <p>
                    ${evento.astro}
                    ·
                    ${getCategoryLabel(evento.categoria)}
                </p>

            </div>

        `;

        timeline.appendChild(item);
    });
}


/* ==========================================================
   RELÓGIO
========================================================== */

updateNextEvent();
updateCountdown();

setInterval(
    updateCountdown,
    1000
);


/* ==========================================================
   INICIALIZAÇÃO
========================================================== */

renderEvents();
renderEclipses();
renderTimeline();


/* ==========================================================
   ATUALIZAÇÃO DO PRÓXIMO EVENTO
========================================================== */

setInterval(
    updateNextEvent,
    60000
);
