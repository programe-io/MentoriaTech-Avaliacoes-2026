
const formulario = document.getElementById("imcForm");
const resultado = document.getElementById("resultado");
const historico = document.getElementById("historico");

// Recuperar histórico salvo
let registros = JSON.parse(
    localStorage.getItem("historicoIMC") || "[]"
);

// Classificar IMC
function classificarIMC(imc) {
    if (imc < 18.5) {
        return "Abaixo do peso";
    } else if (imc < 25) {
        return "Peso normal";
    } else if (imc < 30) {
        return "Sobrepeso";
    } else if (imc < 35) {
        return "Obesidade grau I";
    } else if (imc < 40) {
        return "Obesidade grau II";
    } else {
        return "Obesidade grau III";
    }
}

// Calcular IMC
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const peso = Number(document.getElementById("peso").value);
    const altura = Number(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0 ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura)) {
        alert("Informe valores válidos!");
        return;
    }

    const imc = peso / (altura * altura);
    const classificacao = classificarIMC(imc);

    const registro = {
        id: Date.now(),
        nome,
        peso,
        altura,
        imc: imc.toFixed(2),
        classificacao
    };

    registros.push(registro);

    salvarHistorico();
    mostrarResultado(registro);
    listarHistorico();

    formulario.reset();
});

// Mostrar resultado
function mostrarResultado(registro) {
    resultado.innerHTML = `
        <p>Paciente: ${escaparHTML(registro.nome)}</p>
        <p>IMC: ${registro.imc}</p>
        <p class="normal">
            Classificação: ${registro.classificacao}
        </p>
    `;
}

// Proteger conteúdo inserido pelo usuário
function escaparHTML(texto) {
    return texto.replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

// Listar histórico
function listarHistorico() {
    historico.innerHTML = "";

    registros.forEach(registro => {
        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${escaparHTML(registro.nome)}</td>
            <td>${registro.peso} kg</td>
            <td>${registro.altura} m</td>
            <td>${registro.imc}</td>
            <td>${escaparHTML(registro.classificacao)}</td>
            <td>
                <button class="excluir"
                    onclick="excluirRegistro(${registro.id})">
                    Excluir
                </button>
            </td>
        `;

        historico.appendChild(linha);
    });
}

// Excluir registro
function excluirRegistro(id) {
    registros = registros.filter(registro => registro.id !== id);

    salvarHistorico();
    listarHistorico();
}

// Limpar todo histórico
function limparHistorico() {
    if (confirm("Deseja apagar todo o histórico?")) {
        registros = [];
        salvarHistorico();
        listarHistorico();
        resultado.innerHTML = "";
    }
}

// Salvar no navegador
function salvarHistorico() {
    localStorage.setItem(
        "historicoIMC",
        JSON.stringify(registros)
    );
}

// Carregar histórico ao abrir a página
listarHistorico();
