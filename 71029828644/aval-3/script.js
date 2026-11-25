
let pacientes = JSON.parse(
    localStorage.getItem("pacientes")
) || [];

const form = document.getElementById("formAnamnese");

const lista = document.getElementById("listaPacientes");

const pesquisa = document.getElementById("pesquisa");

// Salvar dados no navegador
function salvarDados() {

    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

}

// Coletar informações do formulário
function coletarDados() {

    const campos = [
        "nome",
        "nascimento",
        "cpf",
        "telefone",
        "email",
        "sexo",
        "profissao",
        "estadoCivil",
        "endereco",
        "doencas",
        "medicamentos",
        "alergias",
        "cirurgias",
        "familia",
        "atividade",
        "fuma",
        "alcool",
        "alimentacao",
        "sono",
        "queixa",
        "sintomas",
        "observacoes",
        "profissional",
        "registro"
    ];

    let dados = {};

    campos.forEach(campo => {

        dados[campo] = document.getElementById(campo).value;

    });

    return dados;

}

// Cadastrar paciente
form.addEventListener("submit", function(event) {

    event.preventDefault();

    const dados = coletarDados();

    pacientes.push({
        id: Date.now(),
        ...dados
    });

    salvarDados();

    atualizarLista();

    form.reset();

    alert("Anamnese cadastrada com sucesso!");

});

// Atualizar lista de pacientes
function atualizarLista() {

    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    const resultado = pacientes.filter(paciente =>
        paciente.nome.toLowerCase().includes(termo)
    );

    if (resultado.length === 0) {

        lista.innerHTML =
            '<p class="vazio">Nenhum paciente cadastrado.</p>';

        return;

    }

    resultado.forEach(paciente => {

        const card = document.createElement("div");

        card.className = "paciente";

        const nome = document.createElement("h3");
        nome.textContent = paciente.nome;

        const telefone = document.createElement("p");
        telefone.textContent =
            "Telefone: " + paciente.telefone;

        const nascimento = document.createElement("p");
        nascimento.textContent =
            "Nascimento: " + paciente.nascimento;

        const profissional = document.createElement("p");
        profissional.textContent =
            "Profissional: " + paciente.profissional;

        const visualizar = document.createElement("button");

        visualizar.className = "btn-visualizar";
        visualizar.textContent = "Visualizar ficha";

        visualizar.onclick = () => visualizarFicha(paciente.id);

        const excluir = document.createElement("button");

        excluir.className = "btn-excluir";
        excluir.textContent = "Excluir";

        excluir.onclick = () => excluirPaciente(paciente.id);

        card.append(
            nome,
            telefone,
            nascimento,
            profissional,
            visualizar,
            excluir
        );

        lista.appendChild(card);

    });

}

// Visualizar ficha completa
function visualizarFicha(id) {

    const paciente = pacientes.find(
        item => item.id === id
    );

    if (!paciente) return;

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas pop-up para visualizar a ficha.");
        return;
    }

    const nomes = {
        nascimento: "Data de nascimento",
        cpf: "CPF",
        telefone: "Telefone",
        email: "E-mail",
        sexo: "Sexo",
        profissao: "Profissão",
        estadoCivil: "Estado civil",
        endereco: "Endereço",
        doencas: "Doenças ou condições de saúde",
        medicamentos: "Medicamentos",
        alergias: "Alergias",
        cirurgias: "Cirurgias",
        familia: "Histórico familiar",
        atividade: "Atividade física",
        fuma: "Tabagismo",
        alcool: "Consumo de álcool",
        alimentacao: "Alimentação",
        sono: "Horas de sono",
        queixa: "Queixa principal",
        sintomas: "Início dos sintomas",
        observacoes: "Observações",
        profissional: "Profissional responsável",
        registro: "Registro profissional"
    };

    let conteudo = `
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Ficha de Anamnese</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 30px;
                    color: #1e293b;
                }

                h1 {
                    color: #0f766e;
                    text-align: center;
                }

                h2 {
                    border-bottom: 2px solid #0f766e;
                    padding-bottom: 8px;
                    margin-top: 25px;
                }

                p {
                    padding: 7px;
                    border-bottom: 1px solid #ddd;
                    overflow-wrap: anywhere;
                }

                button {
                    padding: 12px 20px;
                    background: #0f766e;
                    color: white;
                    border: none;
                    cursor: pointer;
                }

                @media print {
                    button {
                        display: none;
                    }
                }
            </style>
        </head>
        <body>

            <h1>Ficha de Anamnese</h1>

            <h2>Dados do paciente</h2>
    `;

    Object.keys(nomes).forEach(campo => {

        const valor = paciente[campo] || "Não informado";

        const p = document.createElement("p");

        p.textContent = nomes[campo] + ": " + valor;

        conteudo += p.outerHTML;

    });

    conteudo += `
            <br>
            <button onclick="window.print()">Imprimir ficha</button>

        </body>
        </html>
    `;

    janela.document.open();
    janela.document.write(conteudo);
    janela.document.close();

}

// Excluir paciente
function excluirPaciente(id) {

    const confirmar = confirm(
        "Deseja realmente excluir esta ficha?"
    );

    if (confirmar) {

        pacientes = pacientes.filter(
            paciente => paciente.id !== id
        );

        salvarDados();

        atualizarLista();

    }

}

// Pesquisar pacientes
pesquisa.addEventListener(
    "input",
    atualizarLista
);

// Inicializar sistema
atualizarLista();
