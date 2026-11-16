
function abrirAba(aba) {

    const titulo = document.getElementById("titulo");
    const area = document.getElementById("area");

    if (aba === "clientes") {
        titulo.innerText = "Clientes";

        area.innerHTML = `
            <h2>Gerenciamento de clientes</h2>
            <p>Cadastre e organize seus clientes.</p>
            <br>
            <input id="nomeCliente" placeholder="Nome do cliente">
            <button onclick="cadastrarCliente()">Cadastrar</button>
            <div id="lista"></div>
        `;
    \}

    if (aba === "relatorios") {
        titulo.innerText = "Relatórios";
        area.innerHTML = `
            <h2>Relatórios do sistema</h2>
            <p>Clientes cadastrados: \${clientes.length\}</p>
            <p>Relatório demonstrativo disponível.</p>
        `;
    \}

    if (aba === "configuracoes") {
        titulo.innerText = "Configurações";
        area.innerHTML = `
            <h2>Configurações</h2>
            <p>Painel de configurações do sistema.</p>
        `;
    \}
\}

let clientes = [];

function cadastrarCliente() {

    const campo = document.getElementById("nomeCliente");
    const nome = campo.value.trim();

    if (nome === "") {
        alert("Digite o nome do cliente!");
        return;
    \}

    clientes.push(nome);

    document.getElementById("lista").innerHTML =
        "<h3>Clientes cadastrados</h3>" +
        clientes.map(nome => `<p>👤 \${nome\}</p>`).join("");

    campo.value = "";
\}$0