
let pacientes = [];

// Adicionar campos para cadastrar outro paciente
function adicionarCampo() {

    const formulario = document.getElementById(
        "formularioPacientes"
    );

    const novoCampo = document.createElement("div");

    novoCampo.className = "formulario";

    novoCampo.innerHTML = `
        <div class="campo">
            <label>Nome do Paciente</label>
            <input type="text" class="nome"
                placeholder="Digite o nome">
        </div>

        <div class="campo">
            <label>Peso (kg)</label>
            <input type="number" class="peso"
                placeholder="Ex: 70"
                min="0.1" step="any">
        </div>

        <div class="campo">
            <label>Altura (m)</label>
            <input type="number" class="altura"
                placeholder="Ex: 1.75"
                min="0.1" step="any">
        </div>
    `;

    formulario.appendChild(novoCampo);
}

// Classificar o IMC
function classificarIMC(imc) {

    if (imc < 18.5) {
        return {
            nome: "Abaixo do peso",
            classe: "baixo"
        };
    }

    if (imc < 25) {
        return {
            nome: "Peso normal",
            classe: "normal"
        };
    }

    if (imc < 30) {
        return {
            nome: "Sobrepeso",
            classe: "sobrepeso"
        };
    }

    if (imc < 35) {
        return {
            nome: "Obesidade grau I",
            classe: "obesidade"
        };
    }

    if (imc < 40) {
        return {
            nome: "Obesidade grau II",
            classe: "obesidade"
        };
    }

    return {
        nome: "Obesidade grau III",
        classe: "obesidade"
    };
}

// Cadastrar e calcular IMC dos pacientes
function cadastrarPacientes() {

    const nomes = document.querySelectorAll(".nome");
    const pesos = document.querySelectorAll(".peso");
    const alturas = document.querySelectorAll(".altura");

    let novosPacientes = [];

    for (let i = 0; i < nomes.length; i++) {

        const nome = nomes[i].value.trim();
        const peso = parseFloat(pesos[i].value);
        const altura = parseFloat(alturas[i].value);

        if (
            !nome ||
            !Number.isFinite(peso) ||
            !Number.isFinite(altura) ||
            peso <= 0 ||
            altura <= 0
        ) {
            alert(
                "Preencha corretamente todos os campos do paciente " +
                (i + 1)
            );
            return;
        }

        const imc = peso / (altura * altura);

        const classificacao = classificarIMC(imc);

        novosPacientes.push({

            id: crypto.randomUUID(),

            nome: nome,
            peso: peso,
            altura: altura,
            imc: imc,

            classificacao: classificacao.nome,
            classe: classificacao.classe

        });
    }

    pacientes.push(...novosPacientes);

    exibirPacientes();

    // Limpar formulário após cadastro
    document.getElementById("formularioPacientes").innerHTML = `
        <div class="formulario">

            <div class="campo">
                <label>Nome do Paciente</label>
                <input type="text" class="nome"
                    placeholder="Digite o nome">
            </div>

            <div class="campo">
                <label>Peso (kg)</label>
                <input type="number" class="peso"
                    placeholder="Ex: 70"
                    min="0.1" step="any">
            </div>

            <div class="campo">
                <label>Altura (m)</label>
                <input type="number" class="altura"
                    placeholder="Ex: 1.75"
                    min="0.1" step="any">
            </div>

        </div>
    `;

    alert("Pacientes cadastrados com sucesso!");
}

// Exibir pacientes na tabela
function exibirPacientes() {

    const lista = document.getElementById("listaPacientes");

    lista.innerHTML = "";

    pacientes.forEach((paciente) => {

        const linha = document.createElement("tr");

        const dados = [
            paciente.nome,
            paciente.peso.toFixed(2) + " kg",
            paciente.altura.toFixed(2) + " m",
            paciente.imc.toFixed(2),
            paciente.classificacao
        ];

        dados.forEach((dado, indice) => {

            const celula = document.createElement("td");

            if (indice === 4) {

                const span = document.createElement("span");

                span.className =
                    "classificacao " + paciente.classe;

                span.textContent = dado;

                celula.appendChild(span);

            } else {

                celula.textContent = dado;

            }

            linha.appendChild(celula);

        });

        // Botão para excluir paciente
        const acao = document.createElement("td");

        const botao = document.createElement("button");

        botao.textContent = "Excluir";

        botao.className = "btn-excluir";

        botao.onclick = function() {
            excluirPaciente(paciente.id);
        };

        acao.appendChild(botao);

        linha.appendChild(acao);

        lista.appendChild(linha);

    });

}

// Excluir paciente
function excluirPaciente(id) {

    pacientes = pacientes.filter(
        paciente => paciente.id !== id
    );

    if (pacientes.length === 0) {

        document.getElementById("listaPacientes").innerHTML = `
            <tr>
                <td colspan="6" class="vazio">
                    Nenhum paciente cadastrado.
                </td>
            </tr>
        `;

    } else {

        exibirPacientes();

    }

}
