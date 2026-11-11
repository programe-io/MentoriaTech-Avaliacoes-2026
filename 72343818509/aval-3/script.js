
let dataAtual = new Date();
let eventos = [];

function mostrarCalendario() {
    let ano = dataAtual.getFullYear();
    let mes = dataAtual.getMonth();

    let primeiroDia = new Date(ano, mes, 1).getDay();
    let ultimoDia = new Date(ano, mes + 1, 0).getDate();

    let nomesMeses = [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
    ];

    document.getElementById("mesAno").innerText =
        nomesMeses[mes] + " " + ano;

    let datas = document.getElementById("datas");
    datas.innerHTML = "";

    for (let i = 0; i < primeiroDia; i++) {
        datas.innerHTML += "<div></div>";
    }

    for (let dia = 1; dia <= ultimoDia; dia++) {
        let div = document.createElement("div");
        div.innerText = dia;

        let data = `${ano}-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

        if (
            dia === new Date().getDate() &&
            mes === new Date().getMonth() &&
            ano === new Date().getFullYear()
        ) {
            div.classList.add("hoje");
        }

        if (eventos.some(e => e.data === data)) {
            div.classList.add("temEvento");
        }

        div.onclick = () => {
            document.getElementById("dataEvento").value = data;
            listarEventos();
        };

        datas.appendChild(div);
    }
}

function mudarMes(valor) {
    dataAtual.setMonth(dataAtual.getMonth() + valor);
    mostrarCalendario();
}

function cadastrarEvento() {
    let data = document.getElementById("dataEvento").value;
    let titulo = document.getElementById("tituloEvento").value.trim();

    if (titulo.length < 5) {
        alert("O título deve ter pelo menos 5 caracteres!");
        return;
    }

    if (!data || !/^\d{4}-\d{2}-\d{2}$/.test(data)) {
        alert("Selecione uma data válida!");
        return;
    }

    eventos.push({ data, titulo });

    alert("Evento cadastrado!");

    document.getElementById("tituloEvento").value = "";

    mostrarCalendario();
    listarEventos();
}

function listarEventos() {
    let lista = document.getElementById("eventos");
    let data = document.getElementById("dataEvento").value;

    lista.innerHTML = "";

    eventos.forEach((evento, indice) => {
        if (evento.data === data) {
            let p = document.createElement("p");
            p.textContent = evento.titulo + " - ";

            let botao = document.createElement("button");
            botao.textContent = "Excluir";
            botao.onclick = () => excluirEvento(indice);

            p.appendChild(botao);
            lista.appendChild(p);
        }
    });
}

function excluirEvento(indice) {
    eventos.splice(indice, 1);
    mostrarCalendario();
    listarEventos();
}

mostrarCalendario();
