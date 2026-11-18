
const form = document.getElementById("formCliente");
const lista = document.getElementById("listaClientes");
const pesquisa = document.getElementById("pesquisa");

let clientes = JSON.parse(localStorage.getItem("clientes")) || [];

function salvar() {
    localStorage.setItem("clientes", JSON.stringify(clientes));
\}

function atualizar() {
    lista.innerHTML = "";

    const termo = pesquisa.value.toLowerCase();

    clientes.forEach((cliente, index) => {
        if (
            cliente.nome.toLowerCase().includes(termo) ||
            cliente.telefone.toLowerCase().includes(termo)
        ) {
            const linha = document.createElement("tr");

            const nome = document.createElement("td");
            nome.textContent = cliente.nome;

            const telefone = document.createElement("td");
            telefone.textContent = cliente.telefone;

            const email = document.createElement("td");
            email.textContent = cliente.email || "-";

            const acao = document.createElement("td");
            const botao = document.createElement("button");

            botao.textContent = "Excluir";
            botao.className = "excluir";

            botao.addEventListener("click", () => excluir(index));

            acao.appendChild(botao);

            linha.append(nome, telefone, email, acao);
            lista.appendChild(linha);
        \}
    \});

    document.getElementById("total").textContent = clientes.length;

    document.getElementById("recentes").textContent =
        clientes.filter(c => Date.now() - c.criadoEm < 86400000).length;
\}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!nome || !telefone) {
        alert("Preencha os campos obrigatórios!");
        return;
    \}

    clientes.push({
        nome,
        telefone,
        email,
        criadoEm: Date.now()
    \});

    salvar();
    form.reset();
    atualizar();

    alert("Cliente cadastrado com sucesso!");
\});

function excluir(index) {
    if (confirm("Deseja realmente excluir este cliente?")) {
        clientes.splice(index, 1);
        salvar();
        atualizar();
    \}
\}
$0