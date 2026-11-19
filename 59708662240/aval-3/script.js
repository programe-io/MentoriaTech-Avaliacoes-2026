
const formulario = document.getElementById("formPaciente");

const campoNome = document.getElementById("nome");
const campoPeso = document.getElementById("peso");
const campoAltura = document.getElementById("altura");

const resultado = document.getElementById("resultado");
const listaPacientes = document.getElementById("listaPacientes");
const totalPacientes = document.getElementById("totalPacientes");

// Recupera os registros salvos no navegador
let pacientes = JSON.parse(localStorage.getItem("pacientesIMC")) || [];

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Salva os pacientes no navegador
function salvarPacientes() {
    localStorage.setItem("pacientesIMC", JSON.stringify(pacientes));
}

// Exibe o resultado do cálculo
function mostrarResultado(nome, peso, altura, imc) {

    resultado.innerHTML = `
        <div class="icone">📊</div>

        <h2>Resultado do IMC</h2>

        <div class="nome-resultado">
            ${nome}
        </div>

        <div class="valor-imc">
            ${imc.toFixed(2)}
        </div>

        <p>Índice de Massa Corporal calculado.</p>

        <div class="detalhe-resultado">
            Peso: ${peso.toFixed(1)} kg<br>
            Altura: ${altura.toFixed(2)} m
        </div>

        <p class="detalhe-resultado">
            O resultado é um indicador inicial e deve ser
            interpretado considerando idade e outros fatores.
        </p>
    `;
}

// Cadastrar paciente
formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campoNome.value.trim();
    const peso = Number(campoPeso.value);
    const altura = Number(campoAltura.value);

    // Verificar os dados
    if (nome === "") {
        alert("Digite o nome do paciente!");
        return;
    }

    if (!Number.isFinite(peso) || peso <= 0) {
        alert("Informe um peso válido!");
        return;
    }

    if (!Number.isFinite(altura) || altura <= 0) {
        alert("Informe uma altura válida!");
        return;
    }

    // Calcular IMC
    const imc = calcularIMC(peso, altura);

    if (!Number.isFinite(imc)) {
        alert("Não foi possível calcular o IMC.");
        return;
    }

    // Criar paciente
    const paciente = {
        id: Date.now() + Math.random(),
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc
    };

    // Adicionar à lista
    pacientes.push(paciente);

    // Salvar e atualizar
    salvarPacientes();
    mostrarResultado(nome, peso, altura, imc);
    listarPacientes();

    // Limpar formulário
    formulario.reset();

    alert("Paciente cadastrado com sucesso!");
});

// Mostrar pacientes na tabela
function listarPacientes() {

    listaPacientes.innerHTML = "";

    totalPacientes.textContent =
        pacientes.length +
        (pacientes.length === 1 ? " paciente" : " pacientes");

    if (pacientes.length === 0) {

        listaPacientes.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum paciente cadastrado.
                </td>
            </tr>
        `;

        return;
    }

    pacientes.forEach(function(paciente) {

        const linha = document.createElement("tr");

        const nome = document.createElement("td");
        nome.textContent = paciente.nome;

        const peso = document.createElement("td");
        peso.textContent = paciente.peso.toFixed(1) + " kg";

        const altura = document.createElement("td");
        altura.textContent = paciente.altura.toFixed(2) + " m";

        const imc = document.createElement("td");
        imc.textContent = paciente.imc.toFixed(2);

        const acao = document.createElement("td");

        const botaoExcluir = document.createElement("button");

        botaoExcluir.textContent = "Excluir";
        botaoExcluir.className = "btn-excluir";

        botaoExcluir.addEventListener("click", function() {
            excluirPaciente(paciente.id);
        });

        acao.appendChild(botaoExcluir);

        linha.appendChild(nome);
        linha.appendChild(peso);
        linha.appendChild(altura);
        linha.appendChild(imc);
        linha.appendChild(acao);

        listaPacientes.appendChild(linha);
    });
}

// Excluir paciente
function excluirPaciente(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este paciente?"
    );

    if (!confirmar) {
        return;
    }

    pacientes = pacientes.filter(function(paciente) {
        return paciente.id !== id;
    });

    salvarPacientes();
    listarPacientes();

    alert("Paciente excluído com sucesso!");
}

// Carregar registros ao abrir a página
listarPacientes();
