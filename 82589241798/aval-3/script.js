
let pacientes = [];

const formulario = document.getElementById("formulario");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    let paciente = {
        nome: document.getElementById("nome").value.trim(),
        idade: document.getElementById("idade").value,
        telefone: document.getElementById("telefone").value,
        data: document.getElementById("data").value,
        doenca: document.getElementById("doenca").value,
        alergia: document.getElementById("alergia").value,
        medicamento: document.getElementById("medicamento").value,
        cirurgia: document.getElementById("cirurgia").value,
        queixa: document.getElementById("queixa").value,
        sintomas: document.getElementById("sintomas").value,
        observacoes: document.getElementById("observacoes").value
    };

    pacientes.push(paciente);

    mostrarPacientes();

    formulario.reset();

    alert("Anamnese cadastrada com sucesso!");

});

function mostrarPacientes() {

    let lista = document.getElementById("lista");

    lista.innerHTML = "";

    let pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    pacientes.forEach((paciente, indice) => {

        if (!paciente.nome.toLowerCase().includes(pesquisa)) {
            return;
        }

        let ficha = document.createElement("div");

        ficha.className = "ficha";

        let titulo = document.createElement("h3");

        titulo.textContent = paciente.nome;

        ficha.appendChild(titulo);

        let dados = [
            ["Idade", paciente.idade],
            ["Telefone", paciente.telefone],
            ["Data da consulta", paciente.data],
            ["Doenças", paciente.doenca],
            ["Alergias", paciente.alergia],
            ["Medicamentos", paciente.medicamento],
            ["Cirurgias", paciente.cirurgia],
            ["Queixa principal", paciente.queixa],
            ["Sintomas", paciente.sintomas],
            ["Observações", paciente.observacoes]
        ];

        dados.forEach(([campo, valor]) => {

            let paragrafo = document.createElement("p");

            paragrafo.textContent =
                campo + ": " + (valor || "Não informado");

            ficha.appendChild(paragrafo);

        });

        let excluir = document.createElement("button");

        excluir.textContent = "Excluir Ficha";

        excluir.className = "excluir";

        excluir.onclick = function() {

            pacientes.splice(indice, 1);

            mostrarPacientes();

        };

        ficha.appendChild(excluir);

        lista.appendChild(ficha);

    });

}

document.getElementById("pesquisa")
.addEventListener("input", mostrarPacientes);
