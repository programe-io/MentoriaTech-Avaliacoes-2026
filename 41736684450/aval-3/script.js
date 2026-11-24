
let pacientes = [];
let opcao;

do {
    opcao = Number(prompt(
        "===== SISTEMA DE ANAMNESE =====\n\n" +
        "1 - Cadastrar paciente\n" +
        "2 - Listar pacientes\n" +
        "3 - Consultar ficha\n" +
        "4 - Atualizar ficha\n" +
        "5 - Excluir paciente\n" +
        "0 - Sair\n\n" +
        "Escolha uma opção:"
    ));

    switch (opcao) {

        case 1:
            let nome = prompt("Nome completo do paciente:");
            let idade = Number(prompt("Idade:"));
            let telefone = prompt("Telefone:");
            let motivo = prompt("Motivo da consulta:");
            let sintomas = prompt("Apresenta algum sintoma?");
            let alergias = prompt("Possui alergias? Quais?");
            let medicamentos = prompt("Faz uso de medicamentos?");
            let historico = prompt("Possui histórico de doenças?");
            let observacoes = prompt("Observações adicionais:");

            if (nome && nome.trim() !== "" && idade > 0) {

                pacientes.push({
                    nome: nome,
                    idade: idade,
                    telefone: telefone,
                    motivo: motivo,
                    sintomas: sintomas,
                    alergias: alergias,
                    medicamentos: medicamentos,
                    historico: historico,
                    observacoes: observacoes
                });

                alert("Ficha cadastrada com sucesso!");

            } else {
                alert("Nome ou idade inválidos!");
            }
            break;

        case 2:
            if (pacientes.length === 0) {
                alert("Nenhum paciente cadastrado.");
            } else {

                let lista = "===== PACIENTES CADASTRADOS =====\n";

                for (let i = 0; i < pacientes.length; i++) {
                    lista +=
                        "\n" + (i + 1) + " - " +
                        pacientes[i].nome +
                        "\nIdade: " + pacientes[i].idade +
                        "\nTelefone: " + pacientes[i].telefone +
                        "\n-------------------------";
                }

                alert(lista);
            }
            break;

        case 3:
            if (pacientes.length === 0) {
                alert("Nenhum paciente cadastrado.");
                break;
            }

            let consulta = Number(prompt(
                "Digite o número do paciente:\n" +
                pacientes.map((p, i) =>
                    (i + 1) + " - " + p.nome
                ).join("\n")
            ));

            if (consulta >= 1 && consulta <= pacientes.length) {

                let p = pacientes[consulta - 1];

                alert(
                    "===== FICHA DE ANAMNESE =====\n\n" +
                    "Nome: " + p.nome +
                    "\nIdade: " + p.idade +
                    "\nTelefone: " + p.telefone +
                    "\nMotivo da consulta: " + p.motivo +
                    "\nSintomas: " + p.sintomas +
                    "\nAlergias: " + p.alergias +
                    "\nMedicamentos: " + p.medicamentos +
                    "\nHistórico de doenças: " + p.historico +
                    "\nObservações: " + p.observacoes
                );

            } else {
                alert("Paciente não encontrado!");
            }
            break;

        case 4:
            if (pacientes.length === 0) {
                alert("Nenhum paciente cadastrado.");
                break;
            }

            let atualizar = Number(prompt(
                "Digite o número do paciente para atualizar:\n" +
                pacientes.map((p, i) =>
                    (i + 1) + " - " + p.nome
                ).join("\n")
            ));

            if (atualizar >= 1 && atualizar <= pacientes.length) {

                let p = pacientes[atualizar - 1];

                p.telefone = prompt("Novo telefone:", p.telefone);
                p.sintomas = prompt("Novos sintomas:", p.sintomas);
                p.alergias = prompt("Novas informações sobre alergias:", p.alergias);
                p.medicamentos = prompt("Novos medicamentos:", p.medicamentos);
                p.observacoes = prompt("Novas observações:", p.observacoes);

                alert("Ficha atualizada com sucesso!");

            } else {
                alert("Paciente não encontrado!");
            }
            break;

        case 5:
            if (pacientes.length === 0) {
                alert("Não existem fichas para excluir.");
                break;
            }

            let excluir = Number(prompt(
                "Digite o número do paciente que deseja excluir:\n" +
                pacientes.map((p, i) =>
                    (i + 1) + " - " + p.nome
                ).join("\n")
            ));

            if (excluir >= 1 && excluir <= pacientes.length) {

                pacientes.splice(excluir - 1, 1);

                alert("Ficha excluída com sucesso!");

            } else {
                alert("Número inválido!");
            }
            break;

        case 0:
            alert("Sistema encerrado!");
            break;

        default:
            alert("Opção inválida! Tente novamente.");
    }

} while (opcao !== 0);
