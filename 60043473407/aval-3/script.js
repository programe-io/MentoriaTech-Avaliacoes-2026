
let pacientes = JSON.parse(
    localStorage.getItem("pacientes")
) || [];

let editando = null;

const form = document.getElementById("formAnamnese");

const campos = [
    "nome",
    "nascimento",
    "telefone",
    "email",
    "profissao",
    "endereco",
    "doencas",
    "alergias",
    "medicamentos",
    "familia",
    "queixa",
    "observacoes"
];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const paciente = {};

    campos.forEach(campo => {
        paciente[campo] =
            document.getElementById(campo).value;
    });

    if (editando !== null) {
        pacientes[editando] = paciente;
        editando = null;

        document.getElementById("btnSalvar").textContent =
            "Salvar Ficha";
    } else {
        pacientes.push(paciente);
    }

    salvar();
    form.reset();

    alert("Ficha cadastrada com sucesso!");
});

function salvar() {
    localStorage.setItem(
        "pacientes",
        JSON.stringify(pacientes)
    );

    mostrarPacientes();
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function mostrarPacientes() {
    const lista = document.getElementById("listaPacientes");

    const pesquisa = document.getElementById("pesquisa")
        .value.toLowerCase();

    lista.innerHTML = "";

    pacientes.forEach((paciente, index) => {

        if (!paciente.nome.toLowerCase().includes(pesquisa)) {
            return;
        }

        lista.innerHTML += `
            <tr>
                <td>${escapar(paciente.nome)}</td>
                <td>${escapar(paciente.nascimento)}</td>
                <td>${escapar(paciente.telefone)}</td>

                <td>
                    <button class="editar"
                        onclick="editarPaciente(${index})">
                        Editar
                    </button>

                    <button class="imprimir"
                        onclick="imprimirPaciente(${index})">
                        Imprimir
                    </button>

                    <button class="excluir"
                        onclick="excluirPaciente(${index})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;
    });
}

function editarPaciente(index) {
    const paciente = pacientes[index];

    campos.forEach(campo => {
        document.getElementById(campo).value =
            paciente[campo] || "";
    });

    document.getElementById("autorizacao").checked = true;

    editando = index;

    document.getElementById("btnSalvar").textContent =
        "Atualizar Ficha";

    document.querySelector(".informacoes").scrollIntoView({
        behavior: "smooth"
    });
}

function excluirPaciente(index) {
    if (confirm("Deseja excluir esta ficha?")) {

        pacientes.splice(index, 1);

        if (editando === index) {
            editando = null;
            form.reset();

            document.getElementById("btnSalvar").textContent =
                "Salvar Ficha";
        } else if (editando !== null && editando > index) {
            editando--;
        }

        salvar();
    }
}

function imprimirPaciente(index) {
    const paciente = pacientes[index];

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
        return;
    }

    const conteudo = campos.map(campo => `
        <p>
            <strong>${campo.charAt(0).toUpperCase() + campo.slice(1)}:</strong>
            ${escapar(paciente[campo] || "Não informado")}
        </p>
    `).join("");

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Ficha de Anamnese</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 30px;
                    line-height: 1.8;
                }
                h1 {
                    color: #176b87;
                    text-align: center;
                }
                p {
                    border-bottom: 1px solid #ddd;
                    padding: 5px;
                }
            </style>
        </head>
        <body>
            <h1>Ficha de Anamnese</h1>
            ${conteudo}
            <br>
            <p>Assinatura do profissional: ____________________</p>
            <p>Assinatura do paciente: _______________________</p>
            <script>
                window.onload = function() {
                    window.print();
                };
            <\/script>
        </body>
        </html>
    `);

    janela.document.close();
}

document.getElementById("pesquisa").addEventListener(
    "input", mostrarPacientes
);

mostrarPacientes();
