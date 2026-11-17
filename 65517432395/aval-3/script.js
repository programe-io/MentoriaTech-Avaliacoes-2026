const perfilForm = document.getElementById("perfilForm");
const metaForm = document.getElementById("metaForm");
const listaMetas = document.getElementById("listaMetas");

// Recuperação dos dados armazenados
let perfil = JSON.parse(
    localStorage.getItem("careerUpPerfil") || "null"
);

let metas = JSON.parse(
    localStorage.getItem("careerUpMetas") || "[]"
);

// Função para salvar informações
function salvarDados() {

    localStorage.setItem(
        "careerUpPerfil",
        JSON.stringify(perfil)
    );

    localStorage.setItem(
        "careerUpMetas",
        JSON.stringify(metas)
    );
}

// Função para cadastrar perfil
function cadastrarPerfil(nome, area) {

    perfil = {
        nome: nome,
        area: area
    };

    salvarDados();
    mostrarPerfil();
}

// Função para exibir perfil
function mostrarPerfil() {

    const areaPerfil = document.getElementById("perfilSalvo");

    if (perfil === null) {
        areaPerfil.textContent = "Nenhum perfil cadastrado.";
        return;
    }

    areaPerfil.textContent =
        "Olá, " + perfil.nome +
        "! Sua área de interesse é " + perfil.area + ".";
}

// Função para adicionar metas
function adicionarMeta(descricao) {

    let novaMeta = {
        id: Date.now(),
        descricao: descricao,
        concluida: false
    };

    metas.push(novaMeta);

    salvarDados();
    atualizarPainel();
}

// Função para concluir ou reabrir meta
function alterarStatus(id) {

    metas = metas.map(function(meta) {

        if (meta.id === id) {
            meta.concluida = !meta.concluida;
        }

        return meta;
    });

    salvarDados();
    atualizarPainel();
}

// Função para editar meta
function editarMeta(id) {

    let meta = metas.find(function(item) {
        return item.id === id;
    });

    if (!meta) return;

    let novoTexto = prompt(
        "Digite a nova descrição da meta:",
        meta.descricao
    );

    if (novoTexto !== null && novoTexto.trim() !== "") {

        meta.descricao = novoTexto.trim();

        salvarDados();
        atualizarPainel();
    }
}

// Função para excluir meta
function excluirMeta(id) {

    metas = metas.filter(function(meta) {
        return meta.id !== id;
    });

    salvarDados();
    atualizarPainel();
}

// Função para atualizar estatísticas
function atualizarEstatisticas() {

    let concluidas = 0;
    let pendentes = 0;

    // Estrutura de repetição FOR
    for (let i = 0; i < metas.length; i++) {

        if (metas[i].concluida === true) {
            concluidas++;
        } else {
            pendentes++;
        }
    }

    let progresso = metas.length > 0
        ? Math.round((concluidas / metas.length) * 100)
        : 0;

    document.getElementById("total").textContent = metas.length;
    document.getElementById("concluidas").textContent = concluidas;
    document.getElementById("pendentes").textContent = pendentes;
    document.getElementById("progresso").textContent = progresso + "%";
}

// Função para mostrar metas
function mostrarMetas() {

    listaMetas.innerHTML = "";

    if (metas.length === 0) {
        listaMetas.textContent = "Você ainda não cadastrou metas.";
        return;
    }

    // Estrutura FOR...OF
    for (let meta of metas) {

        let item = document.createElement("div");

        item.className = meta.concluida
            ? "meta-item concluida"
            : "meta-item";

        let descricao = document.createElement("p");

        descricao.textContent =
            meta.descricao +
            (meta.concluida ? " - Concluída" : " - Pendente");

        let acoes = document.createElement("div");
        acoes.className = "acoes";

        let status = document.createElement("button");
        status.textContent = meta.concluida
            ? "Reabrir meta"
            : "Concluir meta";

        status.addEventListener("click", function() {
            alterarStatus(meta.id);
        });

        let editar = document.createElement("button");
        editar.textContent = "Editar";
        editar.className = "editar";

        editar.addEventListener("click", function() {
            editarMeta(meta.id);
        });

        let excluir = document.createElement("button");
        excluir.textContent = "Excluir";
        excluir.className = "excluir";

        excluir.addEventListener("click", function() {
            excluirMeta(meta.id);
        });

        acoes.append(status, editar, excluir);
        item.append(descricao, acoes);

        listaMetas.appendChild(item);
    }
}

// Atualização geral
function atualizarPainel() {
    mostrarMetas();
    atualizarEstatisticas();
}

// Evento do perfil
perfilForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value.trim();
    let area = document.getElementById("area").value;

    if (nome === "" || area === "") {
        alert("Preencha todos os campos.");
        return;
    }

    cadastrarPerfil(nome, area);

    alert("Perfil salvo com sucesso!");
});

// Evento das metas
metaForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let descricao = document.getElementById("meta").value.trim();

    if (descricao === "") {
        alert("Digite uma meta profissional.");
        return;
    }

    adicionarMeta(descricao);

    metaForm.reset();
});

// Inicialização
function iniciarSistema() {

    mostrarPerfil();
    atualizarPainel();
}

iniciarSistema();