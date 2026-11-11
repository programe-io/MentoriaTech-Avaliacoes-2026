
const mesAno = document.getElementById("mes-ano");
const dias = document.getElementById("dias");

let data = new Date();

function mostrarCalendario() {
    let ano = data.getFullYear();
    let mes = data.getMonth();

    let primeiroDia = new Date(ano, mes, 1).getDay();
    let ultimoDia = new Date(ano, mes + 1, 0).getDate();

    mesAno.innerText = data.toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric"
    });

    dias.innerHTML = "";

    for (let i = 0; i < primeiroDia; i++) {
        dias.innerHTML += '<span class="vazio"></span>';
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        let classe = "";

        if (
            dia === new Date().getDate() &&
            mes === new Date().getMonth() &&
            ano === new Date().getFullYear()
        ) {
            classe = "hoje";
        }

        dias.innerHTML += `<span class="${classe}">${dia}</span>`;
    }
}

document.getElementById("anterior").onclick = function() {
    data.setMonth(data.getMonth() - 1);
    mostrarCalendario();
};

document.getElementById("proximo").onclick = function() {
    data.setMonth(data.getMonth() + 1);
    mostrarCalendario();
};

mostrarCalendario();
