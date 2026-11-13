
// ======================================
// ECOTRACK - SISTEMA DE RECICLAGEM
// ======================================


// CARREGAR REGISTROS SALVOS

let coletas = JSON.parse(
    localStorage.getItem("ecotrack") || "[]"
);

let coletaEditando = null;

let filtroAtual = "Todos";


// ELEMENTOS DO HTML

const formulario = document.getElementById("formColeta");

const codigo = document.getElementById("codigo");

const material = document.getElementById("material");

const quantidade = document.getElementById("quantidade");

const localColeta = document.getElementById("local");

const data = document.getElementById("data");

const destino = document.getElementById("destino");

const status = document.getElementById("status");

const pesquisa = document.getElementById("pesquisa");

const listaColetas = document.getElementById("listaColetas");

const botaoSalvar = document.getElementById("botaoSalvar");

const botaoCancelar = document.getElementById("botaoCancelar");


// SALVAR DADOS NO NAVEGADOR

function salvarDados() {

    localStorage.setItem(
        "ecotrack",
        JSON.stringify(coletas)
    );

}


// LIMPAR FORMULÁRIO

function limparFormulario() {

    formulario.reset();

    coletaEditando = null;

    document.getElementById("tituloFormulario").textContent =
        "＋ Nova coleta";

    botaoSalvar.textContent =
        "＋ Cadastrar coleta";

    botaoCancelar.hidden = true;

}


// CANCELAR EDIÇÃO

botaoCancelar.addEventListener("click", function() {

    limparFormulario();

});


// FORMATAR DATA

function formatarData(dataColeta) {

    const partes = dataColeta.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// CADASTRAR OU EDITAR COLETA

formulario.addEventListener("submit", function(event) {

    event.preventDefault();

    const novaColeta = {

        codigo: codigo.value.trim(),

        material: material.value,

        quantidade: Number(quantidade.value),

        local: localColeta.value.trim(),

        data: data.value,

        destino: destino.value.trim(),

        status: status.value

    };


    // VALIDAR CÓDIGO

    if (!novaColeta.codigo) {

        alert("Informe o código da coleta!");

        codigo.focus();

        return;

    }


    // VALIDAR MATERIAL

    const materiaisValidos = [
        "Papel",
        "Plástico",
        "Vidro",
        "Metal",
        "Eletrônicos",
        "Orgânicos",
        "Outros"
    ];

    if (!materiaisValidos.includes(novaColeta.material)) {

        alert("Selecione um material válido!");

        material.focus();

        return;

    }


    // VALIDAR QUANTIDADE

    if (
        !Number.isFinite(novaColeta.quantidade) ||
        novaColeta.quantidade <= 0
    ) {

        alert("A quantidade deve ser maior que zero!");

        quantidade.focus();

        return;

    }


    // VALIDAR LOCAL

    if (!novaColeta.local) {

        alert("Informe o local da coleta!");

        localColeta.focus();

        return;

    }


    // VALIDAR DATA

    if (!novaColeta.data) {

        alert("Informe a data da coleta!");

        data.focus();

        return;

    }


    // VALIDAR DESTINO

    if (!novaColeta.destino) {

        alert("Informe o destino do material!");

        destino.focus();

        return;

    }


    // VALIDAR STATUS

    const statusValidos = [
        "Pendente",
        "Em processamento",
        "Reciclado"
    ];

    if (!statusValidos.includes(novaColeta.status)) {

        alert("Selecione um status válido!");

        status.focus();

        return;

    }


    // VERIFICAR CÓDIGO DUPLICADO

    const codigoExiste = coletas.some(coleta => {

        return (
            coleta.codigo.toLowerCase() ===
            novaColeta.codigo.toLowerCase() &&
            coleta.id !== coletaEditando
        );

    });

    if (codigoExiste) {

        alert("Este código já está cadastrado!");

        codigo.focus();

        return;

    }


    // VERIFICAR EDIÇÃO

    if (coletaEditando !== null) {

        const coleta = coletas.find(
            item => item.id === coletaEditando
        );

        if (coleta) {

            Object.assign(coleta, novaColeta);

        }

        alert("Coleta atualizada com sucesso!");

    } else {

        // CRIAR NOVA COLETA

        const registro = {

            id: Date.now().toString() +
                Math.random().toString(36).slice(2),

            ...novaColeta

        };

        coletas.push(registro);

        alert("Coleta cadastrada com sucesso!");

    }


    salvarDados();

    limparFormulario();

    atualizarLista();

});


// EDITAR COLETA

function editarColeta(id) {

    const coleta = coletas.find(
        item => item.id === id
    );

    if (!coleta) return;

    codigo.value = coleta.codigo;

    material.value = coleta.material;

    quantidade.value = coleta.quantidade;

    localColeta.value = coleta.local;

    data.value = coleta.data;

    destino.value = coleta.destino;

    status.value = coleta.status;

    coletaEditando = id;

    document.getElementById("tituloFormulario").textContent =
        "✎ Editar coleta";

    botaoSalvar.textContent =
        "Salvar alterações";

    botaoCancelar.hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ALTERAR STATUS

function alterarStatus(id) {

    const coleta = coletas.find(
        item => item.id === id
    );

    if (!coleta) return;

    const sequencia = [
        "Pendente",
        "Em processamento",
        "Reciclado"
    ];

    const indiceAtual = sequencia.indexOf(coleta.status);

    coleta.status = sequencia[
        (indiceAtual + 1) % sequencia.length
    ];

    salvarDados();

    atualizarLista();

}


// EXCLUIR COLETA

function excluirColeta(id) {

    const confirmacao = confirm(
        "Deseja realmente excluir este registro?"
    );

    if (!confirmacao) return;

    coletas = coletas.filter(
        item => item.id !== id
    );

    if (coletaEditando === id) {

        limparFormulario();

    }

    salvarDados();

    atualizarLista();

    alert("Registro excluído com sucesso!");

}


// ATUALIZAR INDICADORES

function atualizarResumo() {

    const total = coletas.length;

    const peso = coletas.reduce(
        (soma, coleta) => soma + coleta.quantidade,
        0
    );

    const pendentes = coletas.filter(
        coleta => coleta.status === "Pendente"
    ).length;

    const recicladas = coletas.filter(
        coleta => coleta.status === "Reciclado"
    ).length;


    document.getElementById("totalColetas").textContent =
        total;

    document.getElementById("pesoTotal").textContent =
        peso.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }) + " kg";

    document.getElementById("coletasPendentes").textContent =
        pendentes;

    document.getElementById("coletasRecicladas").textContent =
        recicladas;

}


// CRIAR BOTÕES

function criarBotao(texto, classe, acao) {

    const botao = document.createElement("button");

    botao.type = "button";

    botao.textContent = texto;

    botao.className = classe;

    botao.addEventListener("click", acao);

    return botao;

}


// CRIAR ETIQUETAS

function criarEtiqueta(texto, classe) {

    const etiqueta = document.createElement("span");

    etiqueta.className = "etiqueta " + classe;

    etiqueta.textContent = texto;

    return etiqueta;

}


// LISTAR COLETAS

function atualizarLista() {

    listaColetas.innerHTML = "";

    const termo = pesquisa.value.toLowerCase().trim();


    // PESQUISA E FILTROS

    const coletasFiltradas = coletas.filter(coleta => {

        const correspondePesquisa =
            coleta.material.toLowerCase().includes(termo) ||
            coleta.local.toLowerCase().includes(termo) ||
            coleta.codigo.toLowerCase().includes(termo) ||
            coleta.destino.toLowerCase().includes(termo);

        const correspondeFiltro =
            filtroAtual === "Todos" ||
            coleta.status === filtroAtual;

        return correspondePesquisa && correspondeFiltro;

    });


    // MENSAGEM DE LISTA VAZIA

    document.getElementById("mensagemVazia").style.display =
        coletasFiltradas.length === 0 ? "block" : "none";


    // ORDENAR POR DATA

    coletasFiltradas.sort((a, b) =>
        b.data.localeCompare(a.data)
    );


    // EXIBIR COLETAS

    coletasFiltradas.forEach(coleta => {

        const linha = document.createElement("tr");


        // CÓDIGO

        const celulaCodigo = document.createElement("td");

        celulaCodigo.textContent = coleta.codigo;


        // MATERIAL

        const celulaMaterial = document.createElement("td");

        celulaMaterial.textContent = coleta.material;


        // QUANTIDADE

        const celulaQuantidade = document.createElement("td");

        celulaQuantidade.textContent =
            coleta.quantidade.toLocaleString("pt-BR") + " kg";


        // LOCAL

        const celulaLocal = document.createElement("td");

        celulaLocal.textContent = coleta.local;


        // STATUS

        const celulaStatus = document.createElement("td");

        let classeStatus = "pendente";

        if (coleta.status === "Em processamento") {

            classeStatus = "processamento";

        } else if (coleta.status === "Reciclado") {

            classeStatus = "reciclado";

        }

        const etiqueta = criarEtiqueta(
            coleta.status,
            classeStatus
        );

        celulaStatus.appendChild(etiqueta);


        // AÇÕES

        const celulaAcoes = document.createElement("td");

        const acoes = document.createElement("div");

        acoes.className = "acoes";


        // BOTÃO EDITAR

        const botaoEditar = criarBotao(
            "Editar",
            "editar",
            () => editarColeta(coleta.id)
        );


        // BOTÃO ALTERAR STATUS

        const botaoStatus = criarBotao(
            "Próximo status",
            "status-btn",
            () => alterarStatus(coleta.id)
        );


        // BOTÃO EXCLUIR

        const botaoExcluir = criarBotao(
            "Excluir",
            "excluir",
            () => excluirColeta(coleta.id)
        );


        acoes.appendChild(botaoEditar);

        acoes.appendChild(botaoStatus);

        acoes.appendChild(botaoExcluir);

        celulaAcoes.appendChild(acoes);


        // ADICIONAR À TABELA

        linha.appendChild(celulaCodigo);

        linha.appendChild(celulaMaterial);

        linha.appendChild(celulaQuantidade);

        linha.appendChild(celulaLocal);

        linha.appendChild(celulaStatus);

        linha.appendChild(celulaAcoes);

        listaColetas.appendChild(linha);

    });


    atualizarResumo();

}


// PESQUISAR COLETAS

pesquisa.addEventListener("input", function() {

    atualizarLista();

});


// FILTRAR COLETAS

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", function() {

        document.querySelectorAll(".filtro").forEach(item => {

            item.classList.remove("ativo");

        });

        this.classList.add("ativo");

        filtroAtual = this.dataset.filtro;

        atualizarLista();

    });

});


// INICIALIZAR SISTEMA

atualizarLista();
