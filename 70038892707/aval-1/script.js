// Dados dos alunos
const alunos = {

    turma: {
        nome: "Toda a turma",
        notas: [7.5, 8.2, 8.8, 7.9, 9.1, 8.5, 8.7],
        concluidas: 87,
        pendentes: 13,
        frequencia: [95, 93, 96, 91, 94, 95]
    },

    ana: {
        nome: "Ana Silva",
        notas: [8.5, 9.0, 9.5, 8.8, 9.7, 9.2, 9.4],
        concluidas: 90,
        pendentes: 10,
        frequencia: [98, 97, 100, 96, 98, 99]
    },

    joao: {
        nome: "João Santos",
        notas: [7.0, 7.8, 8.2, 7.5, 8.5, 8.0, 8.1],
        concluidas: 80,
        pendentes: 20,
        frequencia: [95, 92, 94, 90, 93, 95]
    },

    maria: {
        nome: "Maria Oliveira",
        notas: [9.0, 9.5, 9.8, 9.2, 9.7, 9.6, 9.5],
        concluidas: 95,
        pendentes: 5,
        frequencia: [100, 98, 100, 97, 99, 100]
    },

    carlos: {
        nome: "Carlos Souza",
        notas: [6.0, 6.5, 7.0, 6.2, 7.3, 6.8, 7.0],
        concluidas: 65,
        pendentes: 35,
        frequencia: [88, 85, 89, 84, 87, 86]
    }
};

let graficoNotas;
let graficoAtividades;
let graficoFrequencia;


// Criar gráfico de notas
function criarGraficoNotas(dados) {

    const ctx = document
        .getElementById("graficoNotas")
        .getContext("2d");

    if (graficoNotas) {
        graficoNotas.destroy();
    }

    graficoNotas = new Chart(ctx, {
        type: "line",

        data: {
            labels: [
                "Atividade 1",
                "Atividade 2",
                "Atividade 3",
                "Atividade 4",
                "Atividade 5",
                "Atividade 6",
                "Atividade 7"
            ],

            datasets: [{
                label: "Nota",
                data: dados.notas,

                borderColor: "#4f46e5",
                backgroundColor: "rgba(79, 70, 229, 0.12)",

                borderWidth: 3,
                fill: true,

                tension: 0.4,

                pointBackgroundColor: "#4f46e5",
                pointRadius: 5
            }]
        },

        options: {
            responsive: true,

            scales: {
                y: {
                    min: 0,
                    max: 10,

                    ticks: {
                        stepSize: 2
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Gráfico de atividades
function criarGraficoAtividades(dados) {

    const ctx = document
        .getElementById("graficoAtividades")
        .getContext("2d");

    if (graficoAtividades) {
        graficoAtividades.destroy();
    }

    graficoAtividades = new Chart(ctx, {

        type: "doughnut",

        data: {
            labels: [
                "Concluídas",
                "Pendentes"
            ],

            datasets: [{
                data: [
                    dados.concluidas,
                    dados.pendentes
                ],

                backgroundColor: [
                    "#22c55e",
                    "#e5e7eb"
                ],

                borderWidth: 0
            }]
        },

        options: {
            responsive: true,

            cutout: "70%",

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}


// Gráfico de frequência
function criarGraficoFrequencia(dados) {

    const ctx = document
        .getElementById("graficoFrequencia")
        .getContext("2d");

    if (graficoFrequencia) {
        graficoFrequencia.destroy();
    }

    graficoFrequencia = new Chart(ctx, {

        type: "bar",

        data: {

            labels: [
                "Mar",
                "Abr",
                "Mai",
                "Jun",
                "Jul",
                "Ago"
            ],

            datasets: [{

                label: "Frequência (%)",

                data: dados.frequencia,

                backgroundColor: "#8b5cf6",

                borderRadius: 6
            }]
        },

        options: {

            responsive: true,

            scales: {

                y: {
                    min: 0,
                    max: 100,

                    ticks: {
                        callback: function(value) {
                            return value + "%";
                        }
                    }
                }
            },

            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}


// Atualizar todos os gráficos
function atualizarDashboard() {

    const select = document.getElementById("aluno");

    const alunoSelecionado = select.value;

    const dados = alunos[alunoSelecionado];

    criarGraficoNotas(dados);
    criarGraficoAtividades(dados);
    criarGraficoFrequencia(dados);
}


// Evento do botão
document
    .getElementById("btnAtualizar")
    .addEventListener("click", atualizarDashboard);


// Atualizar automaticamente ao trocar o aluno
document
    .getElementById("aluno")
    .addEventListener("change", atualizarDashboard);


// Inicializar
atualizarDashboard();
