

// ABRIR E FECHAR MENU

function abrirMenu() {

    const menu = document.getElementById("menu");

    menu.classList.toggle("aberto");

}


// IMPEDIR DATAS PASSADAS

const campoData = document.getElementById("data");

const hoje = new Date();

const dataLocal = new Date(
    hoje.getTime() - hoje.getTimezoneOffset() * 60000
).toISOString().split("T")[0];

campoData.min = dataLocal;


// FORMULÁRIO DE AGENDAMENTO

const formulario = document.getElementById("formAgendamento");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const telefone = document.getElementById("telefone").value.trim();

    const servico = document.getElementById("servico").value;

    const data = document.getElementById("data").value;

    const horario = document.getElementById("horario").value;

    const observacoes =
        document.getElementById("observacoes").value.trim();

    if (!nome || !telefone || !servico || !data || !horario) {

        alert("Preencha todos os campos obrigatórios!");

        return;

    }

    // FORMATAR DATA

    const partes = data.split("-");

    const dataFormatada =
        `${partes[2]}/${partes[1]}/${partes[0]}`;


    // MOSTRAR RESUMO

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = `

        <h3>Solicitação de agendamento</h3>

        <p><strong>Cliente:</strong> ${protegerTexto(nome)}</p>

        <p><strong>WhatsApp:</strong> ${protegerTexto(telefone)}</p>

        <p><strong>Procedimento:</strong> ${protegerTexto(servico)}</p>

        <p><strong>Data:</strong> ${dataFormatada}</p>

        <p><strong>Horário:</strong> ${protegerTexto(horario)}</p>

        <p><strong>Observações:</strong>
        ${protegerTexto(observacoes || "Nenhuma")}</p>

        <br>

        <p>
            Solicitação preparada com sucesso!
            Entre em contato com Myrella para confirmar
            a disponibilidade do horário.
        </p>

    `;

    resultado.classList.add("visivel");

    resultado.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

});


// PROTEGER OS DADOS DIGITADOS

function protegerTexto(texto) {

    return String(texto).replace(/[&<>"']/g, caractere => ({

        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"

    })[caractere]);

}

