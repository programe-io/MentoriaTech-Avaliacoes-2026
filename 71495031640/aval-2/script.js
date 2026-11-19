
// BANCO DE DADOS LOCAL

let carros = JSON.parse(localStorage.getItem("carros")) || [];
let clientes = JSON.parse(localStorage.getItem("clientes")) || [];
let vendas = JSON.parse(localStorage.getItem("vendas")) || [];

function salvarDados() {
    localStorage.setItem("carros", JSON.stringify(carros));
    localStorage.setItem("clientes", JSON.stringify(clientes));
    localStorage.setItem("vendas", JSON.stringify(vendas));
}

// FORMATAÇÃO DE MOEDA

function moeda(valor) {
    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// NAVEGAÇÃO

function mostrarPagina(pagina, elemento) {
    document.querySelectorAll(".pagina").forEach(p => {
        p.classList.add("oculto");
    });

    document.getElementById(pagina).classList.remove("oculto");

    document.querySelectorAll("nav a").forEach(a => {
        a.classList.remove("active");
    });

    elemento.classList.add("active");

    const titulos = {
        dashboard: "Dashboard",
        veiculos: "Veículos",
        clientes: "Clientes",
        vendas: "Vendas"
    };

    document.getElementById("titulo").innerText = titulos[pagina];

    atualizarSistema();
}

// VEÍCULOS

function abrirFormularioCarro() {
    document.getElementById("formCarro").classList.remove("oculto");
}

function fecharFormularioCarro() {
    document.getElementById("formCarro").classList.add("oculto");
}

function cadastrarCarro() {
    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const ano = document.getElementById("ano").value;
    const preco = document.getElementById("preco").value;
    const cor = document.getElementById("cor").value.trim();
    const placa = document.getElementById("placa").value.trim().toUpperCase();

    if (!marca || !modelo || !ano || !preco || !cor || !placa) {
        alert("Preencha todos os campos!");
        return;
    }

    if (Number(preco) <= 0 || Number(ano) < 1900) {
        alert("Informe um preço e ano válidos.");
        return;
    }

    if (carros.some(c => c.placa === placa)) {
        alert("Esta placa já está cadastrada!");
        return;
    }

    carros.push({
        id: Date.now(),
        marca,
        modelo,
        ano,
        preco: Number(preco),
        cor,
        placa,
        vendido: false
    });

    salvarDados();

    document.querySelectorAll("#formCarro input").forEach(i => i.value = "");

    fecharFormularioCarro();
    atualizarSistema();

    alert("Veículo cadastrado com sucesso!");
}

function listarCarros() {
    const lista = document.getElementById("listaCarros");
    const pesquisa = document.getElementById("pesquisaCarro").value.toLowerCase();

    lista.innerHTML = "";

    carros.filter(c =>
        `${c.marca} ${c.modelo} ${c.placa}`.toLowerCase().includes(pesquisa)
    ).forEach(c => {

        lista.innerHTML += `
        <tr>
            <td>${c.marca}</td>
            <td>${c.modelo}</td>
            <td>${c.ano}</td>
            <td>${moeda(c.preco)}</td>
            <td>${c.cor}</td>
            <td>${c.placa}</td>
            <td>
                <span class="status ${c.vendido ? 'vendido' : ''}">
                    ${c.vendido ? 'Vendido' : 'Disponível'}
                </span>
            </td>
            <td>
                ${!c.vendido ? `<button class="excluir" onclick="excluirCarro(${c.id})">Excluir</button>` : '-'}
            </td>
        </tr>`;
    });
}

function excluirCarro(id) {
    if (!confirm("Deseja realmente excluir este veículo?")) return;

    carros = carros.filter(c => c.id !== id);

    salvarDados();
    atualizarSistema();
}

// CLIENTES

function cadastrarCliente() {
    const nome = document.getElementById("nomeCliente").value.trim();
    const telefone = document.getElementById("telefoneCliente").value.trim();
    const cpf = document.getElementById("cpfCliente").value.trim();

    if (!nome || !telefone || !cpf) {
        alert("Preencha todos os dados do cliente!");
        return;
    }

    if (clientes.some(c => c.cpf === cpf)) {
        alert("Este CPF já está cadastrado!");
        return;
    }

    clientes.push({
        id: Date.now(),
        nome,
        telefone,
        cpf
    });

    salvarDados();

    document.getElementById("nomeCliente").value = "";
    document.getElementById("telefoneCliente").value = "";
    document.getElementById("cpfCliente").value = "";

    atualizarSistema();

    alert("Cliente cadastrado com sucesso!");
}

function listarClientes() {
    const lista = document.getElementById("listaClientes");

    lista.innerHTML = "";

    clientes.forEach(c => {
        lista.innerHTML += `
        <tr>
            <td>${c.nome}</td>
            <td>${c.telefone}</td>
            <td>${c.cpf}</td>
        </tr>`;
    });

    const select = document.getElementById("clienteVenda");

    select.innerHTML = '<option value="">Selecione um cliente</option>';

    clientes.forEach(c => {
        select.innerHTML += `
        <option value="${c.id}">${c.nome}</option>`;
    });
}

// VENDAS

function registrarVenda() {
    const clienteId = Number(document.getElementById("clienteVenda").value);
    const carroId = Number(document.getElementById("carroVenda").value);
    const valor = Number(document.getElementById("valorVenda").value);

    const cliente = clientes.find(c => c.id === clienteId);
    const carro = carros.find(c => c.id === carroId);

    if (!cliente || !carro || !valor || valor <= 0) {
        alert("Preencha todos os dados da venda!");
        return;
    }

    if (carro.vendido) {
        alert("Este veículo já foi vendido!");
        return;
    }

    vendas.push({
        id: Date.now(),
        cliente: cliente.nome,
        carro: `${carro.marca} ${carro.modelo}`,
        valor,
        data: new Date().toLocaleDateString("pt-BR")
    });

    carro.vendido = true;

    salvarDados();

    document.getElementById("valorVenda").value = "";

    atualizarSistema();

    alert("Venda realizada com sucesso!");
}

function listarVendas() {
    const lista = document.getElementById("listaVendas");

    lista.innerHTML = "";

    vendas.forEach(v => {
        lista.innerHTML += `
        <tr>
            <td>${v.cliente}</td>
            <td>${v.carro}</td>
            <td>${moeda(v.valor)}</td>
            <td>${v.data}</td>
        </tr>`;
    });

    const select = document.getElementById("carroVenda");

    select.innerHTML = '<option value="">Selecione um veículo</option>';

    carros.filter(c => !c.vendido).forEach(c => {
        select.innerHTML += `
        <option value="${c.id}">
            ${c.marca} ${c.modelo} - ${moeda(c.preco)}
        </option>`;
    });
}

// DASHBOARD

function atualizarDashboard() {
    document.getElementById("totalCarros").innerText = carros.length;

    document.getElementById("disponiveis").innerText =
        carros.filter(c => !c.vendido).length;

    document.getElementById("totalVendas").innerText = vendas.length;

    const total = vendas.reduce((soma, v) => soma + v.valor, 0);

    document.getElementById("faturamento").innerText = moeda(total);
}

// ATUALIZAÇÃO GERAL

function atualizarSistema() {
    listarCarros();
    listarClientes();
    listarVendas();
    atualizarDashboard();
}

// INICIALIZAÇÃO

atualizarSistema();
