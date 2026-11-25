
// DADOS DO SISTEMA

let pesagens = JSON.parse(localStorage.getItem("ims_pesagens")) || [];
let clientes = JSON.parse(localStorage.getItem("ims_clientes")) || [];


// SALVAR DADOS

function salvarDados() {
    localStorage.setItem("ims_pesagens", JSON.stringify(pesagens));
    localStorage.setItem("ims_clientes", JSON.stringify(clientes));
}


// NAVEGAÇÃO

function mostrarPagina(pagina) {

    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.add("oculto");
    });

    document.getElementById(pagina).classList.remove("oculto");

    const titulos = {
        dashboard: "Dashboard",
        pesagem: "Nova Pesagem",
        historico: "Histórico de Pesagens",
        clientes: "Cadastro de Clientes"
    };

    document.getElementById("titulo-pagina").textContent = titulos[pagina];

    atualizarSistema();
}


// CALCULAR PESO LÍQUIDO

const brutoInput = document.getElementById("bruto");
const taraInput = document.getElementById("tara");
const liquidoInput = document.getElementById("liquido");

function calcularPeso() {

    const bruto = Number(brutoInput.value);
    const tara = Number(taraInput.value);

    liquidoInput.value =
        bruto >= tara ? (bruto - tara).toFixed(2) : "";

}

brutoInput.addEventListener("input", calcularPeso);
taraInput.addEventListener("input", calcularPeso);


// CADASTRAR CLIENTE

document.getElementById("form-cliente").addEventListener("submit", function(e) {

    e.preventDefault();

    const nome = document.getElementById("nome-cliente").value.trim();
    const documento = document.getElementById("documento").value.trim();
    const telefone = document.getElementById("telefone").value.trim();

    if (!nome) return;

    clientes.push({
        id: Date.now(),
        nome,
        documento,
        telefone
    });

    salvarDados();

    this.reset();

    atualizarSistema();

    alert("Cliente cadastrado com sucesso!");

});


// LISTAR CLIENTES

function listarClientes() {

    const tabela = document.getElementById("tabela-clientes");
    const select = document.getElementById("cliente-pesagem");

    tabela.innerHTML = "";
    select.innerHTML = '<option value="">Selecione o cliente</option>';

    clientes.forEach(cliente => {

        tabela.innerHTML += `
            <tr>
                <td>${escaparHTML(cliente.nome)}</td>
                <td>${escaparHTML(cliente.documento || "-")}</td>
                <td>${escaparHTML(cliente.telefone || "-")}</td>
            </tr>
        `;

        const option = document.createElement("option");
        option.value = cliente.id;
        option.textContent = cliente.nome;
        select.appendChild(option);

    });

}


// REGISTRAR PESAGEM

document.getElementById("form-pesagem").addEventListener("submit", function(e) {

    e.preventDefault();

    const bruto = Number(brutoInput.value);
    const tara = Number(taraInput.value);

    if (bruto < tara) {
        alert("O peso bruto não pode ser menor que a tara!");
        return;
    }

    const clienteId = Number(document.getElementById("cliente-pesagem").value);
    const cliente = clientes.find(c => c.id === clienteId);

    if (!cliente) {
        alert("Selecione um cliente válido!");
        return;
    }

    const pesagem = {

        numero: pesagens.length ? Math.max(...pesagens.map(p => p.numero)) + 1 : 1,

        cliente: cliente.nome,

        produto: document.getElementById("produto").value.trim(),

        placa: document.getElementById("placa").value.trim().toUpperCase(),

        motorista: document.getElementById("motorista").value.trim(),

        bruto: bruto,

        tara: tara,

        liquido: bruto - tara,

        data: document.getElementById("data-pesagem").value,

        observacoes: document.getElementById("observacoes").value.trim()

    };

    pesagens.push(pesagem);

    salvarDados();

    this.reset();

    liquidoInput.value = "";

    alert("Pesagem registrada com sucesso!");

    atualizarSistema();

    mostrarPagina("historico");

});


// LISTAR PESAGENS

function listarPesagens(filtro = "") {

    const tabela = document.getElementById("tabela-pesagens");

    tabela.innerHTML = "";

    const resultado = pesagens.filter(p => {

        const texto = (
            p.cliente + " " +
            p.produto + " " +
            p.placa
        ).toLowerCase();

        return texto.includes(filtro.toLowerCase());

    });

    resultado.slice().reverse().forEach(p => {

        tabela.innerHTML += `
            <tr>
                <td>${p.numero}</td>
                <td>${escaparHTML(p.data.replace("T", " "))}</td>
                <td>${escaparHTML(p.cliente)}</td>
                <td>${escaparHTML(p.produto)}</td>
                <td>${escaparHTML(p.placa)}</td>
                <td>${formatarPeso(p.bruto)}</td>
                <td>${formatarPeso(p.tara)}</td>
                <td>${formatarPeso(p.liquido)}</td>
                <td>
                    <button class="btn-print" onclick="imprimirPesagem(${p.numero})">
                        Imprimir
                    </button>

                    <button class="btn-delete" onclick="excluirPesagem(${p.numero})">
                        Excluir
                    </button>
                </td>
            </tr>
        `;

    });

}


// PESQUISAR

document.getElementById("pesquisar").addEventListener("input", function() {
    listarPesagens(this.value);
});


// EXCLUIR PESAGEM

function excluirPesagem(numero) {

    if (!confirm("Deseja excluir esta pesagem?")) return;

    pesagens = pesagens.filter(p => p.numero !== numero);

    salvarDados();

    atualizarSistema();

}


// IMPRIMIR COMPROVANTE

function imprimirPesagem(numero) {

    const p = pesagens.find(p => p.numero === numero);

    if (!p) return;

    const janela = window.open("", "_blank");

    if (!janela) {
        alert("Permita a abertura de janelas para imprimir.");
        return;
    }

    janela.document.write(`
        <!DOCTYPE html>
        <html lang="pt-BR">
        <head>
            <meta charset="UTF-8">
            <title>Comprovante de Pesagem</title>
            <style>
                body {
                    font-family: Arial;
                    padding: 30px;
                    color: #111;
                }
                .comprovante {
                    max-width: 600px;
                    margin: auto;
                    border: 1px solid #333;
                    padding: 25px;
                }
                h2, h3 { text-align: center; }
                .linha {
                    border-bottom: 1px solid #ddd;
                    padding: 10px 0;
                }
                .assinatura {
                    margin-top: 60px;
                    text-align: center;
                }
            </style>
        </head>
        <body>
            <div class="comprovante">
                <h2>IMS - SISTEMA DE PESAGEM</h2>
                <h3>COMPROVANTE DE PESAGEM</h3>

                <div class="linha">Número: ${p.numero}</div>
                <div class="linha">Cliente: ${escaparHTML(p.cliente)}</div>
                <div class="linha">Produto: ${escaparHTML(p.produto)}</div>
                <div class="linha">Placa: ${escaparHTML(p.placa)}</div>
                <div class="linha">Motorista: ${escaparHTML(p.motorista || "-")}</div>
                <div class="linha">Data: ${escaparHTML(p.data.replace("T", " "))}</div>
                <div class="linha">Peso Bruto: ${formatarPeso(p.bruto)} kg</div>
                <div class="linha">Tara: ${formatarPeso(p.tara)} kg</div>
                <div class="linha"><strong>Peso Líquido: ${formatarPeso(p.liquido)} kg</strong></div>
                <div class="linha">Observações: ${escaparHTML(p.observacoes || "-")}</div>

                <div class="assinatura">
                    ___________________________<br>
                    Assinatura do responsável
                </div>
            </div>

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


// ATUALIZAR DASHBOARD

function atualizarDashboard() {

    document.getElementById("total-pesagens").textContent = pesagens.length;

    const bruto = pesagens.reduce((s, p) => s + p.bruto, 0);
    const liquido = pesagens.reduce((s, p) => s + p.liquido, 0);

    document.getElementById("peso-bruto").textContent =
        formatarPeso(bruto) + " kg";

    document.getElementById("peso-liquido").textContent =
        formatarPeso(liquido) + " kg";

    document.getElementById("total-clientes").textContent = clientes.length;

    const ultimas = document.getElementById("ultimas-pesagens");

    ultimas.innerHTML = "";

    pesagens.slice(-5).reverse().forEach(p => {

        ultimas.innerHTML += `
            <tr>
                <td>${p.numero}</td>
                <td>${escaparHTML(p.cliente)}</td>
                <td>${escaparHTML(p.produto)}</td>
                <td>${escaparHTML(p.placa)}</td>
                <td>${formatarPeso(p.liquido)} kg</td>
            </tr>
        `;

    });

}


// UTILITÁRIOS

function formatarPeso(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function escaparHTML(valor) {
    return String(valor ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// ATUALIZAÇÃO GERAL

function atualizarSistema() {

    listarClientes();
    listarPesagens(document.getElementById("pesquisar").value);
    atualizarDashboard();

}


// INICIALIZAÇÃO

document.getElementById("data-pesagem").value =
    new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    .toISOString().slice(0, 16);

atualizarSistema();