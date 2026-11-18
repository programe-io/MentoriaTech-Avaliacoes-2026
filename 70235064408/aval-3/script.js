
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];
let codigo = pacientes.length > 0
    ? Math.max(...pacientes.map(p => p.id)) + 1
    : 1;

const formulario = document.getElementById("form-pessoa");
const lista = document.getElementById("lista-pacientes");
const mensagem = document.getElementById("mensagem");
const pesquisa = document.getElementById("pesquisa");

// Calcula o IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// Classifica o IMC (faixas ilustrativas para adultos)
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso adequado";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else {
        return "Obesidade";
    }
}

// Salva os pacientes no navegador
function salvarPacientes() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

// Exibe os pacientes na tabela
function mostrarPacientes(filtro = "") {
    lista.innerHTML = "";

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (filtrados.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="7">Nenhum paciente encontrado.</td>
            </tr>
        `;
        return;
    }

    filtrados.forEach(paciente => {
        const imc = calcularIMC(paciente.peso, paciente.altura);
        const classificacao = classificarIMC(imc);

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${paciente.id}</td>
            <td>${paciente.nome}</td>
            <td>${paciente.idade}</td>
            <td>${paciente.altura.toFixed(2)} m</td>
            <td>${paciente.peso.toFixed(1)} kg</td>
            <td>${imc.toFixed(2)} - ${classificacao}</td>
            <td>
                <button onclick="excluirPaciente(${paciente.id})">
                    Excluir
                </button>
            </td>
        `;

        lista.appendChild(linha);
    });
}

// Cadastra um novo paciente
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const idade = Number(document.getElementById("idade").value);
    const altura = Number(document.getElementById("altura").value);
    const peso = Number(document.getElementById("peso").value);

    if (!nome || idade <= 0 || altura <= 0 || peso <= 0 ||
        !Number.isFinite(altura) || !Number.isFinite(peso)) {
        mensagem.textContent = "Preencha todos os campos corretamente.";
        mensagem.style.color = "red";
        return;
    }

    const paciente = {
        id: codigo++,
        nome: nome,
        idade: idade,
        altura: altura,
        peso: peso
    };

    pacientes.push(paciente);

    salvarPacientes();
    mostrarPacientes();

    formulario.reset();

    mensagem.textContent = "Paciente cadastrado com sucesso!";
    mensagem.style.color = "green";
});

// Exclui um paciente
function excluirPaciente(id) {
    pacientes = pacientes.filter(p => p.id !== id);

    salvarPacientes();
    mostrarPacientes(pesquisa.value);
}

// Pesquisa pacientes pelo nome
pesquisa.addEventListener("input", function() {
    mostrarPacientes(pesquisa.value);
});

// Exibe os dados salvos ao abrir a página
mostrarPacientes();
