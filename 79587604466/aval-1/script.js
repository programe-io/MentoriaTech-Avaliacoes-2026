
const formulario = document.getElementById("formCadastro");
const mensagem = document.getElementById("mensagem");
const listaClientes = document.getElementById("listaClientes");

let clientes = JSON.parse(
    localStorage.getItem("clientesRestaurante")
) || [];

function mostrarClientes() {

    listaClientes.innerHTML = "";

    if (clientes.length === 0) {
        listaClientes.innerHTML =
            "<p>Nenhum cliente cadastrado.</p>";
        return;
    }

    clientes.forEach(cliente => {

        const div = document.createElement("div");
        div.className = "cliente";

        const titulo = document.createElement("h3");
        titulo.textContent = "Senha: " + cliente.senha;

        const dados = document.createElement("p");
        dados.textContent =
            `Nome: ${cliente.nome} | Telefone: ${cliente.telefone}`;

        const restaurante = document.createElement("p");
        restaurante.textContent =
            "Restaurante: " + cliente.restaurante;

        const pessoas = document.createElement("p");
        pessoas.textContent =
            "Quantidade de pessoas: " + cliente.pessoas;

        const data = document.createElement("p");
        data.textContent =
            `Data: ${cliente.data} | Horário: ${cliente.horario}`;

        div.append(titulo, dados, restaurante, pessoas, data);
        listaClientes.appendChild(div);
    });
}

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const restaurante = document.getElementById("restaurante").value;
    const pessoas = Number(document.getElementById("pessoas").value);
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    if (!nome || !telefone || !restaurante || !data || !horario) {
        mensagem.textContent = "Preencha todos os campos!";
        return;
    }

    if (pessoas < 1 || pessoas > 20) {
        mensagem.textContent = "Informe entre 1 e 20 pessoas.";
        return;
    }

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    const dataEscolhida = new Date(data + "T00:00:00");

    if (dataEscolhida < hoje) {
        mensagem.textContent = "Escolha uma data válida!";
        return;
    }

    const cliente = {
        nome,
        telefone,
        restaurante,
        pessoas,
        data,
        horario,
        senha: "R" + String(Date.now()).slice(-6)
    };

    clientes.push(cliente);

    localStorage.setItem(
        "clientesRestaurante",
        JSON.stringify(clientes)
    );

    mensagem.style.color = "green";
    mensagem.textContent =
        `Cadastro realizado! Sua senha é ${cliente.senha}`;

    formulario.reset();

    mostrarClientes();
});

mostrarClientes();
