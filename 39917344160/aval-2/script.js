
// SISTEMA DE TRANSPORTES

let veiculos = [
    {
        nome: "Carro",
        tipo: "Terrestre",
        capacidade: 5,
        velocidade: 120
    },
    {
        nome: "Ônibus",
        tipo: "Terrestre",
        capacidade: 45,
        velocidade: 90
    },
    {
        nome: "Avião",
        tipo: "Aéreo",
        capacidade: 180,
        velocidade: 850
    },
    {
        nome: "Navio",
        tipo: "Aquático",
        capacidade: 500,
        velocidade: 50
    },
    {
        nome: "Moto",
        tipo: "Terrestre",
        capacidade: 2,
        velocidade: 110
    }
];

// Mostrar todos os veículos
function listarVeiculos() {
    console.log("=== LISTA DE TRANSPORTES ===");

    veiculos.forEach((veiculo) => {
        console.log("Veículo: " + veiculo.nome);
        console.log("Tipo: " + veiculo.tipo);
        console.log("Capacidade: " + veiculo.capacidade + " pessoas");
        console.log("Velocidade: " + veiculo.velocidade + " km/h");
        console.log("--------------------------");
    });
}

// Adicionar um novo veículo
function adicionarVeiculo(nome, tipo, capacidade, velocidade) {
    veiculos.push({
        nome: nome,
        tipo: tipo,
        capacidade: capacidade,
        velocidade: velocidade
    });

    console.log(nome + " cadastrado com sucesso!");
}

// Pesquisar veículo
function pesquisarVeiculo(nome) {
    let encontrado = veiculos.find((veiculo) =>
        veiculo.nome.toLowerCase() === nome.toLowerCase()
    );

    if (encontrado) {
        console.log("Veículo encontrado!");
        console.log(encontrado);
    } else {
        console.log("Veículo não encontrado!");
    }
}

// Filtrar por categoria
function filtrarVeiculos(tipo) {
    let resultado = veiculos.filter((veiculo) =>
        veiculo.tipo.toLowerCase() === tipo.toLowerCase()
    );

    console.log("Categoria: " + tipo);
    console.log(resultado);
}

// Calcular tempo de viagem
function calcularViagem(distancia, velocidade) {
    let tempo = distancia / velocidade;

    console.log("Distância: " + distancia + " km");
    console.log("Velocidade: " + velocidade + " km/h");
    console.log("Tempo estimado: " + tempo.toFixed(2) + " horas");
}

// EXECUTANDO O SISTEMA

listarVeiculos();

pesquisarVeiculo("Avião");

filtrarVeiculos("Terrestre");

calcularViagem(300, 100);

adicionarVeiculo("Trem", "Terrestre", 300, 160);
