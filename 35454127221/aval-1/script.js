
const form = document.getElementById("formIMC");

const campos = {
    nome: document.getElementById("nome"),
    idade: document.getElementById("idade"),
    sexo: document.getElementById("sexo"),
    peso: document.getElementById("peso"),
    altura: document.getElementById("altura")
};

const STORAGE_KEY = "healthControlRegistros";

let registros = carregarRegistros();

// CARREGAR DADOS
function carregarRegistros() {
    try {
        const dados = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        return Array.isArray(dados) ? dados : [];
    } catch {
        return [];
    }
}

// SALVAR DADOS
function salvarRegistros() {
    try {
        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(registros)
        );

        return true;
    } catch {
        alert("Não foi possível salvar os registros.");
        return false;
    }
}

// CALCULAR IMC
function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

// CLASSIFICAR ADULTOS
function classificar(imc) {

    if (imc < 18.5) return "Abaixo do peso";
    if (imc < 25) return "Peso adequado";
    if (imc < 30) return "Sobrepeso";
    if (imc < 35) return "Obesidade grau I";
    if (imc < 40) return "Obesidade grau II";

    return "Obesidade grau III";
}

// CADASTRAR
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = campos.nome.value.trim();
    const idade = Number(campos.idade.value);
    const sexo = campos.sexo.value;
    const peso = Number(campos.peso.value);
    const altura = Number(campos.altura.value);

    if (
        !nome ||
        !sexo ||
        !Number.isFinite(idade) ||
        !Number.isFinite(peso) ||
        !Number.isFinite(altura) ||
        idade < 1 || idade > 120 ||
        peso <= 0 || peso > 500 ||
        altura <= 0 || altura > 3
    ) {
        alert("Confira os dados preenchidos.");
        return;
    }

    const imc = calcularIMC(peso, altura);

    const adulto = idade >= 20;

    const categoria = adulto
        ? classificar(imc)
        : "Avaliação por idade";

    const registro = {
        id: crypto.randomUUID(),
        nome,
        idade,
        sexo,
        peso,
        altura,
        imc: Number(imc.toFixed(2)),
        categoria,
        data: new Date().toLocaleString("pt-BR")
    };

    registros.unshift(registro);

    if (!salvarRegistros()) {
        registros.shift();
        return;
    }

    mostrarResultado(registro);
    atualizarDashboard();
    mostrarHistorico();

    form.reset();

    document.getElementById("resultado")
        .scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
});

// MOSTRAR RESULTADO
function mostrarResultado(registro) {

    const painel = document.getElementById("resultado");

    painel.hidden = false;

    document.getElementById("valorIMC")
        .textContent = registro.imc.toFixed(2);

    document.getElementById("categoria")
        .textContent = registro.categoria;

    const descricao = registro.idade < 20
        ? "A interpretação exige curvas de crescimento por idade e sexo."
        : "Classificação de referência para adultos.";

    document.getElementById("descricao")
        .textContent = descricao;

    document.getElementById("observacao")
        .textContent =
        "O IMC é uma ferramenta de triagem e não substitui uma avaliação profissional.";
}

// ATUALIZAR DASHBOARD
function atualizarDashboard() {

    document.getElementById("totalRegistros")
        .textContent = registros.length;

    const adultos = registros.filter(
        item => item.idade >= 20
    );

    document.getElementById("totalAdultos")
        .textContent = adultos.length;

    document.getElementById("ultimoIMC")
        .textContent = registros.length
            ? registros[0].imc.toFixed(2)
            : "--";
}

// MOSTRAR HISTÓRICO
function mostrarHistorico(filtro = "") {

    const tabela = document.getElementById("tabelaHistorico");

    tabela.replaceChildren();

    const filtrados = registros.filter(item =>
        item.nome.toLowerCase().includes(filtro.toLowerCase())
    );

    if (filtrados.length === 0) {

        const linha = document.createElement("tr");
        const celula = document.createElement("td");

        celula.colSpan = 7;
        celula.textContent = "Nenhum registro encontrado.";

        linha.appendChild(celula);
        tabela.appendChild(linha);

        return;
    }

    filtrados.forEach(item => {

        const linha = document.createElement("tr");

        const dados = [
            item.nome,
            item.idade + " anos",
            item.peso + " kg",
            item.altura + " m",
            item.imc.toFixed(2)
        ];

        dados.forEach(texto => {

            const celula = document.createElement("td");
            celula.textContent = texto;

            linha.appendChild(celula);
        });

        const categoria = document.createElement("td");
        const etiqueta = document.createElement("span");

        etiqueta.className = "badge";
        etiqueta.textContent = item.categoria;

        categoria.appendChild(etiqueta);
        linha.appendChild(categoria);

        const acao = document.createElement("td");
        const botao = document.createElement("button");

        botao.className = "btn-remove";
        botao.textContent = "Excluir";

        botao.addEventListener("click", () => {
            excluirRegistro(item.id);
        });

        acao.appendChild(botao);
        linha.appendChild(acao);

        tabela.appendChild(linha);
    });
}

// PESQUISAR
document.getElementById("pesquisa")
    .addEventListener("input", function() {

        mostrarHistorico(this.value);

    });

// EXCLUIR UM REGISTRO
function excluirRegistro(id) {

    if (!confirm("Deseja excluir este cadastro?")) {
        return;
    }

    const anteriores = registros;

    registros = registros.filter(
        item => item.id !== id
    );

    if (!salvarRegistros()) {
        registros = anteriores;
        return;
    }

    atualizarDashboard();
    mostrarHistorico();
}

// EXCLUIR TODOS
document.getElementById("apagarTodos")
    .addEventListener("click", function() {

        if (registros.length === 0) {
            alert("Não existem registros para excluir.");
            return;
        }

        if (!confirm("Deseja excluir todos os registros?")) {
            return;
        }

        const anteriores = registros;
        registros = [];

        if (!salvarRegistros()) {
            registros = anteriores;
            return;
        }

        atualizarDashboard();
        mostrarHistorico();

        document.getElementById("resultado").hidden = true;
    });

// INICIALIZAR SISTEMA
atualizarDashboard();
mostrarHistorico();