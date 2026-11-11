
let clientes = [];
let geradorDeCodigo = 0;

// Função para cadastrar cliente
function cadastrarCliente() {

    let nome = document.getElementById("nome").value;
    let email = document.getElementById("email").value;
    let telefone = document.getElementById("telefone").value;

    if (nome.trim().length < 3) {
        mostrarMensagem("O nome deve ter pelo menos 3 caracteres!", "red");
        return;
    }

    if (!email.includes("@") || !email.includes(".")) {
        mostrarMensagem("Digite um e-mail válido!", "red");
        return;
    }

    if (telefone.trim() === "") {
        mostrarMensagem("Informe o telefone!", "red");
        return;
    }

    let cliente = {
        codigo: ++geradorDeCodigo,
        nome: nome,
        email: email,
        telefone: telefone
    };

    clientes.push(cliente);

    listarClientes();

    document.getElementById("nome").value = "";
    document.getElementById("email").value = "";
    document.getElementById("telefone").value = "";

    mostrarMensagem("Cliente cadastrado com sucesso!", "green");
}

// Função para listar clientes
function listarClientes() {

    let lista = document.getElementById("listaClientes");

    let pesquisa = document.getElementById("pesquisa").value.toLowerCase();

    lista.innerHTML = "";

    for (let i = 0; i < clientes.length; i++) {

        if (clientes[i].nome.toLowerCase().includes(pesquisa)) {

            lista.innerHTML += `
                <tr>
                    <td>${clientes[i].codigo}</td>
                    <td>${clientes[i].nome}</td>
                    <td>${clientes[i].email}</td>
                    <td>${clientes[i].telefone}</td>
                    <td>
                        <button class="excluir"
                            onclick="excluirCliente(${clientes[i].codigo})">
                            Excluir
                        </button>
                    </td>
                </tr>
            `;
        }
    }
}

// Função para buscar cliente pelo código
function buscarCliente(codigo) {

    return clientes.find(cliente => cliente.codigo === codigo);

}

// Função para excluir cliente
function excluirCliente(codigo) {

    let cliente = buscarCliente(codigo);

    if (cliente === undefined) {
        mostrarMensagem("Cliente não encontrado!", "red");
        return;
    }

    clientes = clientes.filter(cliente => cliente.codigo !== codigo);

    listarClientes();

    mostrarMensagem("Cliente excluído com sucesso!", "green");
}

// Função para mostrar mensagens
function mostrarMensagem(texto, cor) {

    let mensagem = document.getElementById("mensagem");

    mensagem.textContent = texto;
    mensagem.style.color = cor;

}
