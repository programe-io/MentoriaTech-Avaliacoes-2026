let amigos = ["Adriane", "Adriele", "Lay", "Sofia"];
let melhores = ["Adriane"];

let publicacoes = [
    {nome:"Adriane", texto:"Uma pausa para apreciar as pequenas coisas 🌿", curtidas:24, imagem:"https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800"},
    {nome:"Lay", texto:"O céu de hoje parecia pintura ✨", curtidas:18, imagem:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800"},
    {nome:"Adriele", texto:"Café quentinho e um novo dia ☕", curtidas:31, imagem:"https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=800"}
];

let conversas = {};
let curtidasPeloUsuario = [];

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, c => ({
        "&":"&amp;", "<":"&lt;", ">":"&gt;",
        '"':"&quot;", "'":"&#39;"
    })[c]);
}

function pesquisar(valor) {
    mostrar(valor.trim() ? "pesquisa" : "inicio", valor);
}

function mostrar(pagina, termo = "") {
    const area = document.getElementById("conteudo");

    document.getElementById("contador-amigos").textContent = amigos.length;
    document.getElementById("contador-posts").textContent = publicacoes.length;

    if (pagina === "inicio") {
        area.innerHTML = `
            <div class="feed-cabecalho">
                <h2>Bem-vinda, Sofia ✦</h2>
                <button class="roxo" onclick="mostrar('publicar')">＋ Criar</button>
            </div>
            <p class="subtitulo">Um pouquinho do que está acontecendo por aqui.</p>

            <section class="stories">
                ${["Sofia","Adriane","Adriele","Lay"].map((nome,i)=>`
                    <button class="story" onclick="mostrar('amigos')">
                        <span class="story-foto">${nome[0]}</span>
                        <span>${nome}</span>
                    </button>
                `).join("")}
            </section>

            <button class="composer" onclick="mostrar('publicar')">
                S · Compartilhe algo especial...
            </button>

            ${publicacoes.map((p,i)=>`
                <article class="card post-card">
                    <div class="post-topo">
                        <span class="avatar">${escaparHTML(p.nome[0])}</span>
                        <div class="post-autor">
                            <strong>${escaparHTML(p.nome)}</strong>
                            <small>Agora mesmo · 🌎</small>
                        </div>
                    </div>

                    <p class="post-texto">${escaparHTML(p.texto)}</p>
                    ${p.imagem ? `<img class="post-imagem" src="${escaparHTML(p.imagem)}" alt="Foto da publicação">` : ""}

                    <p>💜 ${p.curtidas} curtidas</p>

                    <div class="post-acoes">
                        <button onclick="curtir(${i})">
                            ${curtidasPeloUsuario.includes(i) ? "💜 Curtido" : "♡ Curtir"}
                        </button>
                        <button onclick="comentar(${i})">▢ Comentar</button>
                        <button onclick="compartilhar(${i})">↗ Compartilhar</button>
                    </div>
                    <div id="comentarios-${i}"></div>
                </article>
            `).join("")}
        `;
    }

    else if (pagina === "publicar") {
        area.innerHTML = `
            <h2>➕ Criar publicação</h2>
            <div class="card">
                <textarea id="texto" placeholder="O que você está pensando?"></textarea>
                <input type="url" id="imagem" placeholder="Link da imagem (opcional)">
                <button class="roxo" onclick="publicar()">Publicar 💜</button>
            </div>
        `;
    }

    else if (pagina === "amigos") {
        area.innerHTML = `
            <h2>👥 Meus amigos</h2>
            <div class="card">
                <input id="novoAmigo" placeholder="Nome do amigo">
                <button class="roxo" onclick="adicionarAmigo()">Adicionar amigo</button>
            </div>
            <div id="listaAmigos"></div>
        `;
        atualizarAmigos();
    }

    else if (pagina === "melhores") {
        area.innerHTML = `
            <h2>💚 Melhores amigos</h2>
            <p class="subtitulo">Escolha quem faz parte da sua lista especial.</p>
            <div id="listaMelhores"></div>
        `;
        atualizarMelhores();
    }

    else if (pagina === "mensagens") {
        area.innerHTML = `
            <h2>💬 Conversas</h2>
            <select id="destinatario" onchange="carregarMensagens()">
                <option value="">Escolha um amigo</option>
                ${amigos.map(a=>`<option value="${escaparHTML(a)}">${escaparHTML(a)}</option>`).join("")}
            </select>
            <div class="card" id="historico">Escolha um amigo para começar.</div>
            <input id="mensagem" placeholder="Digite sua mensagem...">
            <button class="roxo" onclick="enviarMensagem()">Enviar 💜</button>
        `;
    }

    else if (pagina === "perfil") {
        area.innerHTML = `
            <h2>👤 Meu perfil</h2>
            <div class="card">
                <span class="avatar avatar-grande">S</span>
                <h3>Sofia</h3>
                <p>Seu espaço, suas histórias. 💜</p>
                <p>${amigos.length} amigos · ${melhores.length} melhores amigos</p>
                <p>${publicacoes.length} publicações</p>
            </div>
        `;
    }

    else if (pagina === "notificacoes") {
        area.innerHTML = `
            <h2>🔔 Notificações</h2>
            <div class="card">
                <p>💜 Bem-vinda ao seu Instagram!</p>
                <p>✨ Seu espaço está pronto para novas amizades.</p>
            </div>
        `;
    }

    else if (pagina === "pesquisa") {
        const busca = termo.toLowerCase();
        const resultados = publicacoes.filter(p =>
            p.nome.toLowerCase().includes(busca) ||
            p.texto.toLowerCase().includes(busca)
        );
        const pessoas = amigos.filter(a => a.toLowerCase().includes(busca));

        area.innerHTML = `
            <h2>🔎 Resultados da busca</h2>
            <p class="subtitulo">Resultados para "${escaparHTML(termo)}"</p>
            <h3 class="secao-titulo">Pessoas</h3>
            ${pessoas.map(a=>`<div class="amigo">👤 ${escaparHTML(a)}</div>`).join("") || "<p>Nenhuma pessoa encontrada.</p>"}
            <h3 class="secao-titulo">Publicações</h3>
            ${resultados.map(p=>`
                <div class="card">
                    <strong>${escaparHTML(p.nome)}</strong>
                    <p>${escaparHTML(p.texto)}</p>
                </div>
            `).join("") || "<p>Nenhuma publicação encontrada.</p>"}
        `;
    }
}

function publicar() {
    const texto = document.getElementById("texto").value.trim();
    const imagem = document.getElementById("imagem").value.trim();

    if (!texto) {
        alert("Escreva alguma coisa!");
        return;
    }

    publicacoes.unshift({
        nome:"Sofia",
        texto,
        imagem,
        curtidas:0
    });

    mostrar("inicio");
}

function curtir(i) {
    if (curtidasPeloUsuario.includes(i)) {
        curtidasPeloUsuario = curtidasPeloUsuario.filter(x=>x !== i);
        publicacoes[i].curtidas--;
    } else {
        curtidasPeloUsuario.push(i);
        publicacoes[i].curtidas++;
    }
    mostrar("inicio");
}

function comentar(i) {
    const texto = prompt("Escreva seu comentário:");
    if (!texto || !texto.trim()) return;

    if (!publicacoes[i].comentarios) {
        publicacoes[i].comentarios = [];
    }

    publicacoes[i].comentarios.push(texto.trim());
    mostrar("inicio");
}

function compartilhar(i) {
    const texto = publicacoes[i].texto;
    if (navigator.share) {
        navigator.share({title:"Instagram Sofia", text:texto});
    } else {
        alert("Publicação: " + texto);
    }
}

function adicionarAmigo() {
    const campo = document.getElementById("novoAmigo");
    const nome = campo.value.trim();

    if (!nome) {
        alert("Digite um nome!");
        return;
    }

    if (amigos.some(a=>a.toLowerCase() === nome.toLowerCase())) {
        alert("Esse amigo já está na lista!");
        return;
    }

    amigos.push(nome);
    atualizarAmigos();
    document.getElementById("contador-amigos").textContent = amigos.length;
}

function atualizarAmigos() {
    document.getElementById("listaAmigos").innerHTML =
        amigos.map(a=>`
            <div class="amigo">👤 ${escaparHTML(a)}</div>
        `).join("");
}

function atualizarMelhores() {
    document.getElementById("listaMelhores").innerHTML =
        amigos.map(a=>`
            <label class="amigo">
                <input type="checkbox"
                    style="width:auto;display:inline"
                    ${melhores.includes(a) ? "checked" : ""}
                    onchange="alternarMelhor('${escaparHTML(a)}',this.checked)">
                💚 ${escaparHTML(a)}
            </label>
        `).join("");
}

function alternarMelhor(nome, marcado) {
    if (marcado && !melhores.includes(nome)) {
        melhores.push(nome);
    } else if (!marcado) {
        melhores = melhores.filter(a=>a !== nome);
    }
}

function enviarMensagem() {
    const amigo = document.getElementById("destinatario").value;
    const campo = document.getElementById("mensagem");
    const texto = campo.value.trim();

    if (!amigo) {
        alert("Escolha um amigo!");
        return;
    }

    if (!texto) return;

    if (!conversas[amigo]) conversas[amigo] = [];

    conversas[amigo].push("Você: " + texto);
    campo.value = "";
    carregarMensagens();
}

function carregarMensagens() {
    const amigo = document.getElementById("destinatario").value;
    const historico = document.getElementById("historico");

    historico.innerHTML = amigo
        ? (conversas[amigo] || []).map(m=>`<p>${escaparHTML(m)}</p>`).join("") || "Nenhuma mensagem ainda."
        : "Escolha um amigo para começar.";
}

mostrar("inicio");