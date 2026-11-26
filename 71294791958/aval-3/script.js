
const formulario = document.getElementById("formAnamnese");

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    // Coletar os dados preenchidos
    const dados = {
        nome: document.getElementById("nome").value,
        nascimento: document.getElementById("nascimento").value,
        cpf: document.getElementById("cpf").value,
        telefone: document.getElementById("telefone").value,
        email: document.getElementById("email").value,
        profissao: document.getElementById("profissao").value,
        sexo: document.getElementById("sexo").value,
        estadoCivil: document.getElementById("estadoCivil").value,

        doenca: document.getElementById("doenca").value,
        detalhesDoenca: document.getElementById("detalhesDoenca").value,

        alergia: document.getElementById("alergia").value,
        detalhesAlergia: document.getElementById("detalhesAlergia").value,

        medicamento: document.getElementById("medicamento").value,
        detalhesMedicamento: document.getElementById("detalhesMedicamento").value,

        cirurgia: document.getElementById("cirurgia").value,
        detalhesCirurgia: document.getElementById("detalhesCirurgia").value,

        historicoFamiliar: document.getElementById("historicoFamiliar").value,
        detalhesFamiliar: document.getElementById("detalhesFamiliar").value,

        atividade: document.getElementById("atividade").value,
        frequencia: document.getElementById("frequencia").value,
        alcool: document.getElementById("alcool").value,
        tabaco: document.getElementById("tabaco").value,
        alimentacao: document.getElementById("alimentacao").value,
        sono: document.getElementById("sono").value,

        peso: document.getElementById("peso").value,
        altura: document.getElementById("altura").value,
        pressao: document.getElementById("pressao").value,
        temperatura: document.getElementById("temperatura").value,

        queixa: document.getElementById("queixa").value,
        observacoes: document.getElementById("observacoes").value
    };

    console.log("Dados da anamnese:", dados);

    alert(
        "Ficha de anamnese preenchida com sucesso!\n" +
        "Paciente: " + dados.nome
    );

});

function imprimirFicha() {

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        alert("Preencha os campos obrigatórios antes de imprimir.");
        return;
    }

    window.print();
}

// Limpar formulário
formulario.addEventListener("reset", function() {

    setTimeout(() => {
        console.log("Formulário limpo!");
    }, 0);

});
