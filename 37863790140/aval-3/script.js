// Formato: q("pergunta", "resposta certa", "errada 1", "errada 2", "errada 3")
const q = (p, c, ...e) => ({ pergunta: p, certa: c, erradas: e });

const materias = {
  "Biologia": { icone: "🧬", perguntas: [
    q("Qual organela é responsável pela respiração celular?","Mitocôndria","Ribossomo","Lisossomo","Complexo de Golgi"),
    q("Como se chama o processo pelo qual as plantas produzem glicose usando luz?","Fotossíntese","Respiração","Fermentação","Digestão"),
    q("Qual molécula carrega a informação genética?","DNA","ATP","Glicose","Lipídio"),
    q("Qual célula do sangue transporta oxigênio?","Hemácias","Leucócitos","Plaquetas","Neurônios"),
    q("A qual reino pertencem os cogumelos?","Fungi","Plantae","Animalia","Monera"),
    q("Quantos cromossomos tem a espécie humana?","46","23","48","44"),
    q("Quem é considerado o pai da genética?","Gregor Mendel","Charles Darwin","Louis Pasteur","Robert Hooke"),
    q("Qual gás as plantas absorvem na fotossíntese?","Gás carbônico","Oxigênio","Nitrogênio","Hidrogênio"),
    q("Qual é o maior órgão do corpo humano?","Pele","Fígado","Intestino","Pulmão"),
    q("Qual vitamina o corpo produz com a exposição ao sol?","Vitamina D","Vitamina C","Vitamina A","Vitamina K"),
    q("Animais que possuem coluna vertebral são chamados de:","Vertebrados","Invertebrados","Protozoários","Artrópodes"),
    q("Onde as proteínas são sintetizadas na célula?","Ribossomos","Núcleo","Vacúolo","Centríolo"),
    q("Quem propôs a teoria da evolução por seleção natural?","Charles Darwin","Louis Pasteur","Carl Linnaeus","Alexander Fleming"),
    q("Qual órgão produz a insulina?","Pâncreas","Fígado","Rim","Estômago"),
    q("Qual destes animais é um mamífero?","Morcego","Pinguim","Tubarão","Sapo"),
    q("Qual estrutura celular contém o material genético?","Núcleo","Membrana","Citoplasma","Parede celular"),
    q("Na cadeia alimentar, quem produz o próprio alimento?","Produtores","Consumidores","Decompositores","Predadores"),
    q("A falta de vitamina C causa qual doença?","Escorbuto","Raquitismo","Beribéri","Anemia"),
    q("Quantas câmaras tem o coração humano?","4","2","3","5"),
    q("Qual destes animais é um anfíbio?","Sapo","Lagarto","Golfinho","Tubarão"),
    q("Qual mosquito transmite a dengue?","Aedes aegypti","Anopheles","Barbeiro","Culex"),
    q("Qual pigmento dá a cor verde às plantas?","Clorofila","Melanina","Hemoglobina","Queratina"),
    q("Onde ocorre a maior parte da absorção de nutrientes?","Intestino delgado","Estômago","Esôfago","Faringe"),
    q("Qual divisão celular origina os gametas?","Meiose","Mitose","Fagocitose","Osmose"),
    q("Qual tipo sanguíneo é considerado doador universal?","O negativo","AB positivo","A positivo","B negativo")
  ]},
  "História": { icone: "🏛️", perguntas: [
    q("Em que ano os portugueses chegaram ao Brasil?","1500","1492","1822","1889"),
    q("Quem proclamou a Independência do Brasil?","Dom Pedro I","Dom João VI","Getúlio Vargas","Deodoro da Fonseca"),
    q("Em que ano foi proclamada a República no Brasil?","1889","1822","1930","1888"),
    q("Em que ano começou a Revolução Francesa?","1789","1776","1815","1914"),
    q("Quem assinou a Lei Áurea?","Princesa Isabel","Dom Pedro I","Deodoro da Fonseca","Tiradentes"),
    q("Em que ano começou a Primeira Guerra Mundial?","1914","1939","1917","1945"),
    q("Em que ano terminou a Segunda Guerra Mundial?","1945","1939","1918","1950"),
    q("Qual era a capital do Império Romano?","Roma","Atenas","Cartago","Alexandria"),
    q("Qual civilização construiu as pirâmides de Gizé?","Egípcia","Maia","Romana","Grega"),
    q("Em que ano caiu o Muro de Berlim?","1989","1961","1945","1991"),
    q("Qual líder da Inconfidência Mineira foi enforcado em 1792?","Tiradentes","Zumbi","Frei Caneca","Dom Pedro II"),
    q("Quem chegou à América em 1492?","Cristóvão Colombo","Vasco da Gama","Pedro Álvares Cabral","Fernão de Magalhães"),
    q("Em que ano começou o Estado Novo de Getúlio Vargas?","1937","1930","1945","1964"),
    q("Em que ano começou a ditadura militar no Brasil?","1964","1930","1985","1945"),
    q("A queda de qual cidade, em 1453, marca o fim da Idade Média?","Constantinopla","Roma","Paris","Lisboa"),
    q("Quem iniciou a Reforma Protestante?","Martinho Lutero","João Calvino","Henrique VIII","Papa Leão X"),
    q("Em qual país começou a Revolução Industrial?","Inglaterra","França","Brasil","Alemanha"),
    q("Quem foi o primeiro imperador do Brasil?","Dom Pedro I","Dom Pedro II","Dom João VI","Deodoro da Fonseca"),
    q("Quais potências se opuseram na Guerra Fria?","EUA e URSS","França e Inglaterra","China e Japão","Alemanha e Itália"),
    q("Qual civilização antiga criou a democracia?","Grécia","Roma","Egito","Pérsia"),
    q("Quem foi Zumbi dos Palmares?","Líder do Quilombo dos Palmares","Imperador do Brasil","Presidente da República","Bandeirante paulista"),
    q("A invasão de qual país deu início à Segunda Guerra Mundial?","Polônia","França","Rússia","Áustria"),
    q("Qual presidente construiu Brasília?","Juscelino Kubitschek","Getúlio Vargas","Jânio Quadros","Eurico Dutra"),
    q("Em que ano os EUA declararam independência?","1776","1789","1812","1865"),
    q("Em que ano foi promulgada a atual Constituição brasileira?","1988","1967","1934","1824")
  ]},
  "Física": { icone: "⚛️", perguntas: [
    q("Qual é a unidade de força no SI?","Newton","Joule","Watt","Pascal"),
    q("Qual é a velocidade aproximada da luz no vácuo?","300.000 km/s","150.000 km/s","30.000 km/s","1.000.000 km/s"),
    q("Quem formulou a lei da gravitação universal?","Isaac Newton","Albert Einstein","Galileu Galilei","Nikola Tesla"),
    q("Qual é a unidade de energia no SI?","Joule","Newton","Watt","Volt"),
    q("Qual é a fórmula da velocidade média?","Δs/Δt","Δt/Δs","m·a","F·d"),
    q("Qual é o valor aproximado da gravidade na Terra?","9,8 m/s²","1,6 m/s²","3,7 m/s²","24 m/s²"),
    q("Qual é a unidade de resistência elétrica?","Ohm","Ampère","Volt","Watt"),
    q("Qual lei de Newton trata da inércia?","Primeira lei","Segunda lei","Terceira lei","Lei da gravitação"),
    q("Qual é a famosa equação de Einstein?","E = mc²","F = ma","V = RI","P = mg"),
    q("Qual é a unidade de potência?","Watt","Joule","Newton","Hertz"),
    q("O som NÃO se propaga em qual meio?","Vácuo","Ar","Água","Aço"),
    q("Qual é a unidade de frequência?","Hertz","Watt","Tesla","Pascal"),
    q("Qual é a expressão da Primeira Lei de Ohm?","V = R·i","F = m·a","P = m·v","E = m·g·h"),
    q("Qual tipo de lente converge os raios de luz?","Convexa","Côncava","Plana","Prismática"),
    q("Como se chama a energia associada ao movimento?","Cinética","Potencial","Térmica","Nuclear"),
    q("A que temperatura a água ferve ao nível do mar?","100 °C","90 °C","80 °C","120 °C"),
    q("Qual instrumento mede a temperatura?","Termômetro","Barômetro","Anemômetro","Amperímetro"),
    q("Segundo a Segunda Lei de Newton, F é igual a:","m·a","m/a","a/m","m·v"),
    q("Qual é a fórmula da quantidade de movimento?","m·v","m·a","F/m","½·m·v²"),
    q("'A toda ação corresponde uma reação' é qual lei de Newton?","Terceira lei","Primeira lei","Segunda lei","Lei de Hooke"),
    q("Como se chama o desvio da luz ao mudar de meio?","Refração","Reflexão","Difração","Polarização"),
    q("Qual é a unidade de pressão no SI?","Pascal","Newton","Joule","Watt"),
    q("Qual é a carga elétrica do elétron?","Negativa","Positiva","Neutra","Variável"),
    q("Quem propôs a Teoria da Relatividade?","Albert Einstein","Isaac Newton","Niels Bohr","Michael Faraday"),
    q("No vácuo, corpos de massas diferentes em queda livre chegam:","Ao mesmo tempo","O mais pesado antes","O mais leve antes","Nunca chegam")
  ]},
  "Geografia": { icone: "🌎", perguntas: [
    q("Qual é o maior país do mundo em área?","Rússia","Canadá","China","Estados Unidos"),
    q("Qual é a capital do Brasil?","Brasília","Rio de Janeiro","São Paulo","Salvador"),
    q("Qual é o maior oceano do planeta?","Pacífico","Atlântico","Índico","Ártico"),
    q("Qual é o rio mais extenso do Brasil?","Amazonas","São Francisco","Tocantins","Paraná"),
    q("Qual continente tem mais países?","África","Ásia","Europa","América"),
    q("Qual linha imaginária divide a Terra em hemisférios Norte e Sul?","Equador","Trópico de Capricórnio","Meridiano de Greenwich","Círculo Polar Ártico"),
    q("Qual é o maior deserto quente do mundo?","Saara","Gobi","Atacama","Kalahari"),
    q("Qual é a capital da Argentina?","Buenos Aires","Santiago","Montevidéu","Lima"),
    q("Qual bioma semiárido é exclusivo do Brasil?","Caatinga","Pampa","Tundra","Taiga"),
    q("Qual é a montanha mais alta do mundo?","Monte Everest","K2","Aconcágua","Kilimanjaro"),
    q("Qual é o estado mais populoso do Brasil?","São Paulo","Minas Gerais","Bahia","Rio de Janeiro"),
    q("Qual região brasileira tem mais estados?","Nordeste","Sudeste","Sul","Norte"),
    q("Qual cordilheira percorre a América do Sul?","Andes","Alpes","Himalaia","Montanhas Rochosas"),
    q("Qual país tem a maior população do mundo atualmente?","Índia","China","Estados Unidos","Indonésia"),
    q("Qual é a capital do Japão?","Tóquio","Kyoto","Osaka","Seul"),
    q("O Canal do Panamá liga quais oceanos?","Atlântico e Pacífico","Índico e Pacífico","Atlântico e Índico","Ártico e Atlântico"),
    q("Qual é o menor país do mundo?","Vaticano","Mônaco","Malta","San Marino"),
    q("Em qual estação os dias são mais longos no hemisfério Sul em dezembro?","Verão","Inverno","Outono","Primavera"),
    q("Em qual camada da atmosfera ocorrem os fenômenos do tempo?","Troposfera","Estratosfera","Mesosfera","Exosfera"),
    q("Em qual continente fica o Rio Nilo?","África","Ásia","América","Europa"),
    q("Qual destes países sul-americanos não tem litoral?","Bolívia","Chile","Peru","Equador"),
    q("Qual é a capital da Austrália?","Camberra","Sydney","Melbourne","Perth"),
    q("Qual meridiano é a referência dos fusos horários?","Greenwich","Equador","Trópico de Câncer","Antimeridiano"),
    q("Qual movimento da Terra causa o dia e a noite?","Rotação","Translação","Precessão","Nutação"),
    q("Qual é a maior floresta tropical do mundo?","Floresta Amazônica","Floresta do Congo","Floresta de Daintree","Taiga")
  ]}
};

const telaMenu = document.getElementById('tela-menu');
const telaQuiz = document.getElementById('tela-quiz');
const gridMaterias = document.getElementById('grid-materias');
const elPergunta = document.getElementById('pergunta');
const caixaOpcoes = document.getElementById('caixa-opcoes');
const btnProximo = document.getElementById('btn-proximo');
const displayPontos = document.getElementById('pontos');
const infoMateria = document.getElementById('info-materia');
const barra = document.getElementById('barra-progresso');

let materiaAtual = "", lista = [], indice = 0, pontos = 0;

// Embaralha uma cópia do array (Fisher-Yates)
function embaralhar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Menu de matérias
Object.keys(materias).forEach(nome => {
  const b = document.createElement('button');
  b.className = 'btn-opcao btn-materia';
  b.textContent = `${materias[nome].icone} ${nome}`;
  b.onclick = () => iniciarQuiz(nome);
  gridMaterias.appendChild(b);
});

function mostrarMenu() {
  telaQuiz.classList.add('escondido');
  telaMenu.classList.remove('escondido');
  pontos = 0;
  displayPontos.textContent = 0;
}
document.getElementById('btn-menu').onclick = mostrarMenu;

// Sempre sorteia a ordem das perguntas e das respostas ao iniciar
function iniciarQuiz(nome) {
  materiaAtual = nome;
  lista = embaralhar(materias[nome].perguntas);
  indice = 0;
  pontos = 0;
  displayPontos.textContent = 0;
  telaMenu.classList.add('escondido');
  telaQuiz.classList.remove('escondido');
  mostrarPergunta();
}

function mostrarPergunta() {
  caixaOpcoes.innerHTML = "";
  btnProximo.classList.add('escondido');
  btnProximo.textContent = indice === lista.length - 1 ? "Ver resultado 🏁" : "Próxima Pergunta ➔";
  const p = lista[indice];
  infoMateria.textContent = `${materias[materiaAtual].icone} ${materiaAtual} • ${indice + 1}/${lista.length}`;
  barra.style.width = `${(indice / lista.length) * 100}%`;
  elPergunta.textContent = `${indice + 1}. ${p.pergunta}`;

  const opcoes = embaralhar([{ t: p.certa, ok: true }, ...p.erradas.map(t => ({ t, ok: false }))]);
  opcoes.forEach(o => {
    const b = document.createElement('button');
    b.className = 'btn-opcao';
    b.textContent = o.t;
    b.dataset.correta = o.ok;
    b.onclick = selecionar;
    caixaOpcoes.appendChild(b);
  });
}

function selecionar(e) {
  const escolhido = e.currentTarget;
  if (escolhido.dataset.correta === "true") {
    escolhido.classList.add('correto');
    pontos += 10;
    displayPontos.textContent = pontos;
  } else {
    escolhido.classList.add('errado');
  }
  Array.from(caixaOpcoes.children).forEach(b => {
    if (b.dataset.correta === "true") b.classList.add('correto');
    b.disabled = true;
  });
  btnProximo.classList.remove('escondido');
}

btnProximo.onclick = () => {
  indice++;
  indice < lista.length ? mostrarPergunta() : mostrarResultado();
};

function mostrarResultado() {
  barra.style.width = "100%";
  const acertos = pontos / 10;
  elPergunta.innerHTML = `🎉 Fim de ${materiaAtual}!<br>Você acertou <span style="color:#00e676">${acertos}/${lista.length}</span><br>Pontuação: <span style="color:#ff6b6b">${pontos} pontos</span>`;
  caixaOpcoes.innerHTML = "";
  const again = document.createElement('button');
  again.className = 'btn-opcao';
  again.textContent = "🔄 Jogar novamente (embaralha tudo)";
  again.onclick = () => iniciarQuiz(materiaAtual);
  const outra = document.createElement('button');
  outra.className = 'btn-opcao';
  outra.textContent = "📚 Escolher outra matéria";
  outra.onclick = mostrarMenu;
  caixaOpcoes.append(again, outra);
  btnProximo.classList.add('escondido');
}