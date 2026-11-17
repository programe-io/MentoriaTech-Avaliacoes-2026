
let contatos = [
    {
        nome: "Maria Oliveira",
        foto: "https://i.pravatar.cc/100?img=47",
        naoLidas: 2,
        mensagens: [
            {texto: "Oi! Tudo bem?", minha: false},
            {texto: "Vamos conversar?", minha: false}
        ]
    },
    {
        nome: "Pedro Santos",
        foto: "https://i.pravatar.cc/100?img=12",
        naoLidas: 1,
        mensagens: [
            {texto: "Bom dia!", minha: false}
        ]
    },
    {
        nome: "Ana Clara",
        foto: "https://i.pravatar.cc/100?img=44",
        naoLidas: 0,
        mensagens: [
            {texto: "Até amanhã!", minha: false}
        ]
    },
    {
        nome: "Lucas Ferreira",
        foto: "https://i.pravatar.cc/100?img=13",
        naoLidas: 3,
        mensagens: [
            {texto: "Você viu a novidade?", minha: false}
        ]
    },
    {
        nome: "Juliana Costa",
        foto: "https://i.pravatar.cc/100?img=49",
        naoLidas: 0,
        mensagens: [
            {texto: "Obrigada pela ajuda!", minha: false}
        ]
    }
];

let contatoAtual = null;
let favoritos = [];
let chamadas = [
    "Maria Oliveira - Chamada recebida",
    "Pedro Santos - Chamada realizada",
    "Ana Clara - Chamada perdida"
];

// TROCAR DE TELA
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.add("escondido");
    });

    document.getElementById(id).classList.remove("escondido");

    if (id === "favoritos") {
        mostrarFavoritos();
    }
}

// MOSTRAR CONTATOS
function atualizarContatos(filtro = "") {
    let lista = document.getElementById("listaContatos");
    lista.innerHTML = "";

    contatos.forEach((contato, indice) => {

        if (!contato.nome.toLowerCase().includes(
            filtro.toLowerCase()
        )) return;

        let div = document.createElement("div");
        div.className = "contato";

        if (contato.naoLidas > 0) {
            div.classList.add("naoLida");
        }

        let foto = document.createElement("img");
        foto.src = contato.foto;

        let informacoes = document.createElement("div");

        let nome = document.createElement("strong");
        nome.textContent = contato.nome;

        let resumo = document.createElement("small");
        resumo.textContent = contato.naoLidas > 0
            ? contato.naoLidas + " mensagens não lidas"
            : "Clique para conversar";

        informacoes.append(nome, resumo);
        div.append(foto, informacoes);

        div.onclick = () => abrirConversa(indice);

        lista.appendChild(div);
    });
}

// PESQUISAR CONTATOS
function pesquisarContatos() {
    let pesquisa = document.getElementById("pesquisa").value;
    atualizarContatos(pesquisa);
}

// ADICIONAR CONTATO
function adicionarContato() {
    let nome = prompt("Qual o nome do novo contato?");

    if (!nome || !nome.trim()) return;

    contatos.push({
        nome: nome.trim(),
        foto: "https://i.pravatar.cc/100?img=5",
        naoLidas: 0,
        mensagens: []
    });

    atualizarContatos();
    alert("Contato adicionado!");
}

// ABRIR CONVERSA
function abrirConversa(indice) {
    contatoAtual = indice;

    let contato = contatos[indice];

    contato.naoLidas = 0;

    document.getElementById("nomeContato").textContent =
        contato.nome;

    document.getElementById("fotoContato").src =
        contato.foto;

    document.getElementById("statusContato").textContent =
        "Disponível no ChatCat";

    atualizarMensagens();
    atualizarContatos();
}

// MOSTRAR MENSAGENS
function atualizarMensagens() {
    if (contatoAtual === null) return;

    let area = document.getElementById("mensagens");
    area.innerHTML = "";

    contatos[contatoAtual].mensagens.forEach((msg, indice) => {

        let bolha = document.createElement("div");

        bolha.className = "bolha";

        if (msg.minha) {
            bolha.classList.add("minha");
        }

        if (msg.foto) {
            let imagem = document.createElement("img");
            imagem.src = msg.foto;
            imagem.alt = "Foto enviada";
            bolha.appendChild(imagem);
        }

        if (msg.texto) {
            let texto = document.createElement("p");
            texto.textContent = msg.texto;
            bolha.appendChild(texto);
        }

        let acoes = document.createElement("div");
        acoes.className = "acoesMensagem";

        let favorito = document.createElement("button");
        favorito.textContent = "⭐";
        favorito.title = "Favoritar mensagem";

        favorito.onclick = () => adicionarFavorito(
            msg.texto || "Foto enviada"
        );

        let apagar = document.createElement("button");
        apagar.textContent = "🗑️";
        apagar.title = "Apagar mensagem";

        apagar.onclick = () => apagarMensagem(indice);

        acoes.append(favorito, apagar);
        bolha.appendChild(acoes);

        area.appendChild(bolha);
    });

    area.scrollTop = area.scrollHeight;
}

// ENVIAR MENSAGEM
function enviarMensagem() {
    if (contatoAtual === null) {
        alert("Escolha uma conversa primeiro!");
        return;
    }

    let campo = document.getElementById("textoMensagem");
    let texto = campo.value.trim();

    if (texto === "") {
        alert("Digite uma mensagem!");
        return;
    }

    contatos[contatoAtual].mensagens.push({
        texto: texto,
        minha: true
    });

    campo.value = "";

    atualizarMensagens();
    atualizarContatos();
}

// ENVIAR FOTO
function enviarFoto(event) {
    if (contatoAtual === null) {
        alert("Escolha uma conversa primeiro!");
        event.target.value = "";
        return;
    }

    let arquivo = event.target.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha uma imagem válida!");
        event.target.value = "";
        return;
    }

    if (arquivo.size > 3 * 1024 * 1024) {
        alert("A imagem deve ter até 3 MB!");
        event.target.value = "";
        return;
    }

    let leitor = new FileReader();

    leitor.onload = function() {
        contatos[contatoAtual].mensagens.push({
            foto: leitor.result,
            minha: true
        });

        atualizarMensagens();
        atualizarContatos();
        event.target.value = "";
    };

    leitor.readAsDataURL(arquivo);
}

// INSERIR EMOJI
function inserirEmoji() {
    let campo = document.getElementById("textoMensagem");

    campo.value += " 😊";
    campo.focus();
}

// APAGAR MENSAGEM
function apagarMensagem(indice) {
    if (confirm("Deseja apagar esta mensagem?")) {
        contatos[contatoAtual].mensagens.splice(indice, 1);
        atualizarMensagens();
    }
}

// ADICIONAR FAVORITO
function adicionarFavorito(texto) {
    favoritos.push(texto);

    alert("Mensagem adicionada aos favoritos!");
}

// MOSTRAR FAVORITOS
function mostrarFavoritos() {
    let lista = document.getElementById("listaFavoritos");
    lista.innerHTML = "";

    if (favoritos.length === 0) {
        lista.textContent = "Nenhuma mensagem favorita.";
    }

    favoritos.forEach(texto => {
        let item = document.createElement("div");
        item.className = "item";
        item.textContent = "⭐ " + texto;
        lista.appendChild(item);
    });
}

// PUBLICAR STATUS
function publicarStatus() {
    let texto = document.getElementById("textoStatus").value.trim();
    let arquivo = document.getElementById("fotoStatus").files[0];

    if (!texto && !arquivo) {
        alert("Escreva algo ou escolha uma foto!");
        return;
    }

    function criarStatus(foto = "") {
        let item = document.createElement("div");
        item.className = "item";

        let descricao = document.createElement("p");
        descricao.textContent = "🐱 Meu status: " + texto;
        item.appendChild(descricao);

        if (foto) {
            let imagem = document.createElement("img");
            imagem.src = foto;
            imagem.alt = "Foto do status";
            item.appendChild(imagem);
        }

        document.getElementById("listaStatus").prepend(item);

        document.getElementById("textoStatus").value = "";
        document.getElementById("fotoStatus").value = "";
    }

    if (arquivo) {
        if (!arquivo.type.startsWith("image/")) {
            alert("Escolha uma imagem válida!");
            return;
        }

        if (arquivo.size > 3 * 1024 * 1024) {
            alert("A foto deve ter até 3 MB!");
            return;
        }

        let leitor = new FileReader();

        leitor.onload = () => criarStatus(leitor.result);
        leitor.readAsDataURL(arquivo);
    } else {
        criarStatus();
    }
}

// REGISTRAR LIGAÇÃO
function registrarLigacao() {
    let nome = prompt("Digite o nome do contato:");

    if (!nome || !nome.trim()) return;

    let tipo = prompt(
        "Digite o tipo: recebida, realizada ou perdida"
    );

    if (!tipo) return;

    chamadas.unshift(
        nome.trim() + " - Chamada " + tipo.trim() +
        " - " + new Date().toLocaleString("pt-BR")
    );

    atualizarLigacoes();
}

// MOSTRAR LIGAÇÕES
function atualizarLigacoes() {
    let lista = document.getElementById("historicoLigacoes");
    lista.innerHTML = "";

    chamadas.forEach(chamada => {
        let item = document.createElement("div");
        item.className = "item";
        item.textContent = "📞 " + chamada;

        lista.appendChild(item);
    });
}

// ALTERAR FOTO DO PERFIL
function alterarFoto(event) {
    let arquivo = event.target.files[0];

    if (!arquivo) return;

    if (!arquivo.type.startsWith("image/")) {
        alert("Escolha uma imagem válida!");
        event.target.value = "";
        return;
    }

    if (arquivo.size > 3 * 1024 * 1024) {
        alert("Escolha uma foto de até 3 MB!");
        event.target.value = "";
        return;
    }

    let leitor = new FileReader();

    leitor.onload = function() {
        document.getElementById("fotoPerfil").src = leitor.result;
        document.getElementById("fotoMenu").src = leitor.result;
    };

    leitor.readAsDataURL(arquivo);
}

// SALVAR PERFIL
function salvarPerfil() {
    let nome = document.getElementById("nomeUsuario").value.trim();
    let sobre = document.getElementById("sobreUsuario").value.trim();

    if (!nome) {
        alert("Digite seu nome!");
        return;
    }

    document.getElementById("nomeMenu").textContent = nome;

    document.getElementById("resultadoPerfil").textContent =
        "Nome: " + nome + " | Sobre: " + sobre;

    alert("Perfil atualizado com sucesso!");
}

// INICIAR SITE
atualizarContatos();
atualizarLigacoes();
