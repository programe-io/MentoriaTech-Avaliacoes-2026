
// HISTÓRIA DO DESENVOLVIMENTO DE SISTEMAS

const historia = [
    {
        ano: "Década de 1940",
        titulo: "Os primeiros computadores",
        descricao: "Surgiram os primeiros computadores eletrônicos, máquinas enormes utilizadas para realizar cálculos e processar informações."
    },
    {
        ano: "Década de 1950",
        titulo: "Início da programação",
        descricao: "As linguagens de programação começaram a evoluir, permitindo criar programas para diferentes atividades."
    },
    {
        ano: "Décadas de 1960 e 1970",
        titulo: "Sistemas operacionais",
        descricao: "Os sistemas operacionais ganharam espaço, facilitando o funcionamento e o gerenciamento dos computadores."
    },
    {
        ano: "Década de 1980",
        titulo: "Computadores pessoais",
        descricao: "Os computadores começaram a se popularizar, chegando às casas, escolas e empresas."
    },
    {
        ano: "Década de 1990",
        titulo: "A chegada da Internet",
        descricao: "A internet revolucionou a comunicação e possibilitou a criação de sites e sistemas online."
    },
    {
        ano: "Anos 2000",
        titulo: "Expansão tecnológica",
        descricao: "Os aplicativos, celulares e sistemas digitais passaram a fazer parte do cotidiano."
    },
    {
        ano: "2010 até hoje",
        titulo: "Inteligência Artificial",
        descricao: "Os sistemas evoluíram com inteligência artificial, computação em nuvem, automação e novas tecnologias."
    }
];

// Exibir a história no console
console.log("HISTÓRIA DO DESENVOLVIMENTO DE SISTEMAS");

historia.forEach((periodo, indice) => {
    console.log("-----------------------------");
    console.log("Período: " + periodo.ano);
    console.log("Evolução: " + periodo.titulo);
    console.log("Descrição: " + periodo.descricao);
});

console.log("-----------------------------");
console.log("A tecnologia continua evoluindo!");
