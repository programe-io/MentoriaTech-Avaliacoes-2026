
const formulario = document.getElementById("formIMC");

const campoNome = document.getElementById("nome");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");

const mensagemInicial = document.getElementById("mensagemInicial");
const resultadoIMC = document.getElementById("resultadoIMC");

const nomeResultado = document.getElementById("nomeResultado");
const valorIMC = document.getElementById("valorIMC");
const informacaoIMC = document.getElementById("informacaoIMC");

const listaPacientes = document.getElementById("listaPacientes");
const totalRegistros = document.getElementById("totalRegistros");

// Histórico armazenado somente na memória.
let pacientes = [];

// CALCULAR IMC

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();
    const peso = Number(campoPeso.value);
    const altura = Number(campoAltura.value);

    // Verificação dos campos.

    if (nome === "") {
        alert("Digite o nome do paciente.");
        campoNome.focus();
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Informe um peso válido.");
        campoPeso.focus();
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Informe uma altura válida.");
        campoAltura.focus();
        return;
    }

    // Fórmula do IMC.

    const imc = peso / (altura * altura);

    const imcFormatado = imc.toFixed(2).replace(".", ",");

    // Mostrar resultado.

    nomeResultado.textContent = nome;
    valorIMC.textContent = imcFormatado;

    informacaoIMC.textContent =
        "O cálculo foi realizado dividindo o peso (" +
        peso + " kg) pelo quadrado da altura (" +
        altura + " m). O valor apresentado é uma medida de referência " +
        "e precisa ser interpretado considerando idade, sexo e contexto individual.";

    mensagemInicial.hidden = true;
    resultadoIMC.hidden = false;

    // Adicionar paciente ao histórico.

    const paciente = {
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imcFormatado
    };

    pacientes.push(paciente);

    atualizarHistorico();

    // Limpar os campos.

    formulario.reset();

});

// ATUALIZAR HISTÓRICO

function atualizarHistorico() {

    listaPacientes.innerHTML = "";

    totalRegistros.textContent =
        pacientes.length +
        (pacientes.length === 1 ? " registro" : " registros");

    if (pacientes.length === 0) {

        listaPacientes.innerHTML = `
            <tr>
                <td colspan="5" class="vazio">
                    Nenhum paciente cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    pacientes.forEach(function(paciente, indice) {

        const linha = document.createElement("tr");

        const dados = [
            paciente.nome,
            paciente.peso + " kg",
            paciente.altura + " m",
            paciente.imc
        ];

        dados.forEach(function(valor) {
            const celula = document.createElement("td");
            celula.textContent = valor;
            linha.appendChild(celula);
        });

        const celulaAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirPaciente(indice);
        });

        celulaAcao.appendChild(botaoExcluir);
        linha.appendChild(celulaAcao);

        listaPacientes.appendChild(linha);

    });

}

// EXCLUIR PACIENTE

function excluirPaciente(indice) {

    pacientes.splice(indice, 1);

    atualizarHistorico();

}

// LIMPAR RESULTADO QUANDO O FORMULÁRIO FOR REINICIADO

formulario.addEventListener("reset", function() {

    mensagemInicial.hidden = false;
    resultadoIMC.hidden = true;

});
