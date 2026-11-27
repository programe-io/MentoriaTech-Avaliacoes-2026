window.AppStore = {
    read(chave, padrao) {
        try {
            const valor = localStorage.getItem(chave);
            return valor === null ? padrao : JSON.parse(valor);
        } catch (erro) {
            console.error("Erro ao ler armazenamento:", erro);
            return padrao;
        }
    },

    write(chave, valor) {
        try {
            localStorage.setItem(chave, JSON.stringify(valor));
            return true;
        } catch (erro) {
            console.error("Erro ao salvar:", erro);
            return false;
        }
    },

    uid(prefixo = "item") {
        return prefixo + "_" + Date.now().toString(36) +
            Math.random().toString(36).slice(2, 8);
    }
};

window.AppStore.documentos = () =>
    AppStore.read("bloco_documentos", []);

window.AppStore.pastas = () =>
    AppStore.read("bloco_pastas", []);

window.AppStore.temas = () => {
    let temas = AppStore.read("bloco_temas", null);

    const cssCiber = `
        body {
            background-image:
                radial-gradient(circle at 20% 20%, rgba(0, 191, 255, 0.13), transparent 35%),
                radial-gradient(circle at 80% 80%, rgba(0, 90, 255, 0.15), transparent 40%) !important;
            background-color: #061426 !important;
        }

        .paper, .sidebar {
            box-shadow:
                0 0 12px rgba(0, 191, 255, 0.12),
                inset 0 0 12px rgba(0, 191, 255, 0.035);
        }

        button {
            transition: 0.2s ease;
        }

        button:hover {
            box-shadow: 0 0 12px rgba(0, 191, 255, 0.35);
        }

        ::selection {
            background: #087CA7;
            color: #FFFFFF;
        }
    `;

    const padroes = {
        morango: {
            image: "https://i.postimg.cc/Jz4fxN6w/Morangos.jpg",
            cursor: "https://i.postimg.cc/nrCBFwTZ/cursor-morango-(1).png",
            cursorPointer: "https://i.postimg.cc/PJPYXFKH/cursor-morango-cliker-(1).png"
        },

        claro: {
            image: "https://i.postimg.cc/FHsMpyW5/Lirios.jpg",
            cursor: "https://i.postimg.cc/zXMYpdMm/lirio-cursor-(1).png",
            cursorPointer: "https://i.postimg.cc/gk5b4M7C/cursor-cliker-lirio-(1).png"
        },

        ciber: {
            image: "https://i.postimg.cc/zfh0F31R/ciber.jpg",
            cursor: "https://i.postimg.cc/DwgDHBpK/cursor-cyber-(1).png",
            cursorPointer: "https://i.postimg.cc/P54c92Vj/cliker-cyber-(1).png"
        },

        escuro: {
            image: "https://i.postimg.cc/cL4phRDj/dark-mode.jpg",
            cursor: "https://i.postimg.cc/8cZJq8vk/dark-cursor-(1).png",
            cursorPointer: "https://i.postimg.cc/FRj0CnGZ/click-dark-(1).png"
        }
    };

    if (!Array.isArray(temas) || temas.length === 0) {
        temas = [
            {
                id: AppStore.uid("tema"),
                name: "Morango",
                background: "#F9D6E1",
                paper: "#FFF5F0",
                text: "#713747",
                accent: "#C94F70",
                border: "#E9A3B7",
                font: "Georgia, serif",
                backgroundImage: "",
                radius: 18,
                borderWidth: 2,
                css: ""
            },
            {
                id: AppStore.uid("tema"),
                name: "Claro",
                background: "#F5F0DC",
                paper: "#FFFFFF",
                text: "#55533F",
                accent: "#9A986A",
                border: "#D9D2AE",
                font: "Georgia, serif",
                backgroundImage: "",
                radius: 18,
                borderWidth: 1,
                css: ""
            },
            {
                id: AppStore.uid("tema"),
                name: "Ciber",
                background: "#061426",
                paper: "#0B1F38",
                text: "#D9F3FF",
                accent: "#00BFFF",
                border: "#087CA7",
                font: "Arial, sans-serif",
                backgroundImage: "",
                radius: 12,
                borderWidth: 2,
                css: cssCiber
            },
            {
                id: AppStore.uid("tema"),
                name: "Escuro",
                background: "#000000",
                paper: "#FFFFFF",
                text: "#000000",
                accent: "#4b4b4b",
                border: "#adadad",
                font: "Georgia, serif",
                backgroundImage: "",
                radius: 18,
                borderWidth: 2,
                decoration: "✧",
                css: ""
            }
        ];
    }

    temas = temas.map(tema => {
        const nome = String(tema.name || "").toLowerCase();

        const chave = nome.includes("morango") ? "morango"
            : nome.includes("claro") || nome.includes("lírio") || nome.includes("lirio") ? "claro"
            : nome.includes("ciber") || nome.includes("cyber") ? "ciber"
            : nome.includes("escuro") || nome.includes("dark") ? "escuro"
            : null;

        const padrao = chave ? padroes[chave] : {};

        const atualizado = { ...tema };

        if (
            chave === "ciber" &&
            tema.background === "#1A2025" &&
            tema.paper === "#F8FBFF" &&
            tema.text === "#354D68"
        ) {
            Object.assign(atualizado, {
                background: "#061426",
                paper: "#0B1F38",
                text: "#D9F3FF",
                accent: "#00BFFF",
                border: "#087CA7",
                radius: 12,
                borderWidth: 2,
                css: cssCiber
            });
        }

        return {
            ...atualizado,
            image: atualizado.image || padrao.image || "",
            cursor: atualizado.cursorNormal || padrao.cursor || atualizado.cursor || "",
            cursorPointer: atualizado.cursorPointer || atualizado.cursorClique || padrao.cursorPointer || ""
        };
    });

    AppStore.write("bloco_temas", temas);
    return temas;
};

window.Documentos = {
    atual: null,
    temporizador: null,
    pastasAbertas: {},
    documentoArrastado: null,

    listar() {
        return AppStore.documentos();
    },

    salvarLista(lista) {
        AppStore.write("bloco_documentos", lista);
    },

    criar() {
        const documento = {
            id: AppStore.uid("doc"),
            title: "Documento sem título",
            content: "",
            folderId: null,
            updatedAt: new Date().toISOString()
        };

        const lista = this.listar();
        lista.unshift(documento);
        this.salvarLista(lista);
        this.abrir(documento.id);

        return documento;
    },

    abrir(id) {
        const documento = this.listar().find(item => item.id === id);
        if (!documento) return;

        if (this.atual && this.atual.id !== id) {
            clearTimeout(this.temporizador);
            this.salvarAgora();
        }

        this.atual = documento;
        AppStore.write("bloco_documento_ativo", id);

        document.getElementById("telaBoasVindas").hidden = true;
        document.getElementById("areaDocumento").hidden = false;
        document.getElementById("tituloDocumento").value = documento.title;
        document.getElementById("editor").innerHTML = documento.content || "";
        document.getElementById("nomeDocumentoTopo").textContent = documento.title;

        this.contarPalavras();
        this.atualizarData();
        this.renderizarLista();
    },

    agendarSalvamento() {
        if (!this.atual) return;

        document.getElementById("statusSalvamento").textContent = "Salvando...";

        clearTimeout(this.temporizador);
        this.temporizador = setTimeout(() => this.salvarAgora(), 500);
    },

    salvarAgora() {
        if (!this.atual) return;

        const titulo = document.getElementById("tituloDocumento").value.trim()
            || "Documento sem título";

        const conteudo = document.getElementById("editor").innerHTML;
        const lista = this.listar();
        const indice = lista.findIndex(item => item.id === this.atual.id);

        if (indice === -1) return;

        lista[indice].title = titulo;
        lista[indice].content = conteudo;
        lista[indice].updatedAt = new Date().toISOString();

        this.atual = lista[indice];
        this.salvarLista(lista);

        document.getElementById("nomeDocumentoTopo").textContent = titulo;
        document.getElementById("statusSalvamento").textContent =
            "Tudo salvo ૮ ․ ․ ྀིა";

        this.atualizarData();
        this.renderizarLista();
    },

    contarPalavras() {
        const texto = document.getElementById("editor").innerText.trim();
        const quantidade = texto ? texto.split(/\s+/).length : 0;

        document.getElementById("contadorPalavras").textContent =
            quantidade + (quantidade === 1 ? " palavra" : " palavras");
    },

    atualizarData() {
        if (!this.atual) return;

        const data = new Date(this.atual.updatedAt);

        document.getElementById("dataAtualizacao").textContent =
            "Atualizado em " + data.toLocaleDateString("pt-BR");
    },

    iniciarArrastar(linha, documento) {
        linha.draggable = true;

        linha.addEventListener("dragstart", evento => {
            this.documentoArrastado = documento.id;

            evento.dataTransfer.setData("text/plain", documento.id);
            evento.dataTransfer.effectAllowed = "move";

            linha.classList.add("dragging");
        });

        linha.addEventListener("dragend", () => {
            this.documentoArrastado = null;
            linha.classList.remove("dragging");

            document.querySelectorAll(".drag-over").forEach(elemento => {
                elemento.classList.remove("drag-over");
            });
        });
    },

    configurarDestino(elemento, pastaId) {
        elemento.addEventListener("dragover", evento => {
            evento.preventDefault();
            evento.dataTransfer.dropEffect = "move";
            elemento.classList.add("drag-over");
        });

        elemento.addEventListener("dragleave", evento => {
            if (!elemento.contains(evento.relatedTarget)) {
                elemento.classList.remove("drag-over");
            }
        });

        elemento.addEventListener("drop", evento => {
            evento.preventDefault();
            evento.stopPropagation();

            elemento.classList.remove("drag-over");

            const documentoId =
                evento.dataTransfer.getData("text/plain") ||
                this.documentoArrastado;

            if (!documentoId) return;

            this.moverParaPasta(documentoId, pastaId);
        });
    },

    criarCabecalhoPasta(pasta, nav, quantidade) {
        const linha = document.createElement("div");
        linha.className = "folder-row";

        const abrir = document.createElement("button");
        abrir.type = "button";
        abrir.className = "folder-toggle";

        const aberta = this.pastasAbertas[pasta.id] !== false;

        abrir.innerHTML = `
            <span class="folder-arrow">${aberta ? "⌄" : "›"}</span>
            <span>${this.escapar(pasta.name)}</span>
            <small>${quantidade}</small>
        `;

        abrir.addEventListener("click", () => {
            this.pastasAbertas[pasta.id] = !aberta;
            this.renderizarLista();
        });

        const renomear = document.createElement("button");
        renomear.type = "button";
        renomear.className = "folder-action";
        renomear.textContent = "✎";
        renomear.title = "Renomear pasta";

        renomear.addEventListener("click", () => {
            const nome = prompt("Novo nome da pasta:", pasta.name);
            if (nome === null) return;

            const novoNome = nome.trim();

            if (!novoNome) {
                mostrarToast("Digite um nome para a pasta.");
                return;
            }

            const pastas = AppStore.pastas();
            const alvo = pastas.find(item => item.id === pasta.id);

            if (!alvo) return;

            alvo.name = novoNome;
            AppStore.write("bloco_pastas", pastas);
            this.renderizarLista();
        });

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "folder-action";
        excluir.textContent = "×";
        excluir.title = "Excluir pasta";

        excluir.addEventListener("click", () => {
            if (!confirm(`Excluir a pasta "${pasta.name}"? Os documentos serão mantidos fora dela.`)) {
                return;
            }

            const documentos = this.listar().map(doc => ({
                ...doc,
                folderId: doc.folderId === pasta.id ? null : doc.folderId
            }));

            const pastas = AppStore.pastas().filter(item => item.id !== pasta.id);

            this.salvarLista(documentos);
            AppStore.write("bloco_pastas", pastas);

            delete this.pastasAbertas[pasta.id];

            this.renderizarLista();
            mostrarToast("Pasta excluída. Seus documentos foram mantidos!");
        });

        linha.append(abrir, renomear, excluir);

        this.configurarDestino(linha, pasta.id);

        nav.appendChild(linha);
    },

    criarBotaoDocumento(doc, nav) {
        const linha = document.createElement("div");
        linha.className = "file-row";

        const botaoAbrir = document.createElement("button");
        botaoAbrir.type = "button";
        botaoAbrir.className = "file-item";
        botaoAbrir.textContent = "▤ " + doc.title;
        botaoAbrir.title = doc.title;

        if (this.atual && this.atual.id === doc.id) {
            botaoAbrir.classList.add("active");
        }

        botaoAbrir.addEventListener("click", () => this.abrir(doc.id));

        const excluir = document.createElement("button");
        excluir.type = "button";
        excluir.className = "delete-file-button";
        excluir.textContent = "×";
        excluir.title = "Excluir documento";

        excluir.addEventListener("click", evento => {
            evento.stopPropagation();
            this.excluir(doc.id);
        });

        linha.append(botaoAbrir, excluir);

        this.iniciarArrastar(linha, doc);

        nav.appendChild(linha);
    },

    moverParaPasta(documentoId, pastaId) {
        const documentos = this.listar();
        const documento = documentos.find(item => item.id === documentoId);

        if (!documento) return;

        if (pastaId && !AppStore.pastas().some(pasta => pasta.id === pastaId)) {
            return;
        }

        if (documento.folderId === pastaId) return;

        documento.folderId = pastaId;

        this.salvarLista(documentos);

        if (pastaId) {
            this.pastasAbertas[pastaId] = true;
        }

        this.renderizarLista();

        mostrarToast(
            pastaId
                ? "Documento movido para a pasta!"
                : "Documento retirado da pasta!"
        );
    },

    renderizarLista() {
        const nav = document.getElementById("listaDocumentos");
        if (!nav) return;

        const documentos = this.listar();
        const pastas = AppStore.pastas();

        nav.replaceChildren();

        pastas.forEach(pasta => {
            const itens = documentos.filter(doc => doc.folderId === pasta.id);

            this.criarCabecalhoPasta(pasta, nav, itens.length);

            if (this.pastasAbertas[pasta.id] === false) return;

            itens.forEach(doc => this.criarBotaoDocumento(doc, nav));
        });

        const soltos = documentos.filter(doc =>
            !doc.folderId || !pastas.some(pasta => pasta.id === doc.folderId)
        );

        if (pastas.length && soltos.length) {
            const titulo = document.createElement("div");
            titulo.className = "folder-label";
            titulo.textContent = "OUTROS DOCUMENTOS";

            nav.appendChild(titulo);
        }

        soltos.forEach(doc => this.criarBotaoDocumento(doc, nav));
    },

    criarPasta(nome) {
        const pastas = AppStore.pastas();

        const pasta = {
            id: AppStore.uid("pasta"),
            name: nome.trim(),
            createdAt: new Date().toISOString()
        };

        pastas.push(pasta);
        AppStore.write("bloco_pastas", pastas);

        this.pastasAbertas[pasta.id] = true;
        this.renderizarLista();
    },

    voltarBiblioteca() {
        if (this.atual) {
            clearTimeout(this.temporizador);
            this.salvarAgora();
        }

        this.atual = null;
        AppStore.write("bloco_documento_ativo", null);

        document.getElementById("areaDocumento").hidden = true;
        document.getElementById("telaBoasVindas").hidden = false;
        document.getElementById("nomeDocumentoTopo").textContent =
            "Nenhum documento aberto";

        this.renderizarLista();
    },

    excluir(id) {
        const documentos = this.listar();
        const documento = documentos.find(item => item.id === id);

        if (!documento) return;

        if (!confirm(`Deseja realmente excluir "${documento.title}"?`)) return;

        if (this.atual && this.atual.id === id) {
            clearTimeout(this.temporizador);
            this.temporizador = null;
            this.atual = null;

            document.getElementById("areaDocumento").hidden = true;
            document.getElementById("telaBoasVindas").hidden = false;
            document.getElementById("nomeDocumentoTopo").textContent =
                "Nenhum documento aberto";

            AppStore.write("bloco_documento_ativo", null);
        }

        this.salvarLista(documentos.filter(item => item.id !== id));

        this.renderizarLista();
        mostrarToast("Documento excluído.");
    },

    escapar(texto) {
        return String(texto).replace(/[&<>"']/g, caractere => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        })[caractere]);
    }
};

window.TemaImagens = {
    banco: null,

    abrirBanco() {
        if (this.banco) return Promise.resolve(this.banco);

        return new Promise((resolve, reject) => {
            const pedido = indexedDB.open("CaderninhoImagens", 1);

            pedido.onupgradeneeded = evento => {
                const banco = evento.target.result;

                if (!banco.objectStoreNames.contains("capas")) {
                    banco.createObjectStore("capas");
                }
            };

            pedido.onsuccess = evento => {
                this.banco = evento.target.result;
                resolve(this.banco);
            };

            pedido.onerror = () => reject(pedido.error);
        });
    },

    async salvar(id, arquivo) {
        const banco = await this.abrirBanco();

        return new Promise((resolve, reject) => {
            const transacao = banco.transaction("capas", "readwrite");
            transacao.objectStore("capas").put(arquivo, id);

            transacao.oncomplete = () => resolve(true);
            transacao.onerror = () => reject(transacao.error);
        });
    },

    async obter(id) {
        const banco = await this.abrirBanco();

        return new Promise((resolve, reject) => {
            const transacao = banco.transaction("capas", "readonly");
            const pedido = transacao.objectStore("capas").get(id);

            pedido.onsuccess = () => resolve(pedido.result || null);
            pedido.onerror = () => reject(pedido.error);
        });
    },

    async obterDataURL(id) {
        const arquivo = await this.obter(id);

        if (!arquivo) return null;

        return new Promise((resolve, reject) => {
            const leitor = new FileReader();

            leitor.onload = () => resolve(leitor.result);
            leitor.onerror = () => reject(leitor.error);

            leitor.readAsDataURL(arquivo);
        });
    },

    async excluir(id) {
        const banco = await this.abrirBanco();

        return new Promise((resolve, reject) => {
            const transacao = banco.transaction("capas", "readwrite");

            transacao.objectStore("capas").delete(id);

            transacao.oncomplete = () => resolve(true);
            transacao.onerror = () => reject(transacao.error);
        });
    }
};

window.Temas = {
    atualId: null,
    tokenGaleria: 0,
    tokenInicial: 0,

    listar() {
        return AppStore.temas();
    },

    salvar(lista) {
        AppStore.write("bloco_temas", lista);
    },

    iniciar() {
        const temas = this.listar();
        const salvo = AppStore.read("bloco_tema_ativo", null);
        let escolhido = AppStore.read("bloco_tema_escolhido", false);

        if (!AppStore.read("bloco_visual_neutro_v2", false)) {
            AppStore.write("bloco_visual_neutro_v2", true);
            AppStore.write("bloco_tema_escolhido", false);
            escolhido = false;
        }

        this.atualId = temas.some(tema => tema.id === salvo)
            ? salvo
            : temas[0].id;

        if (escolhido) {
            this.aplicar(this.atualId);
        } else {
            this.aplicarBaseMonocromatica();
        }

        this.renderizarGaleria();
        this.renderizarOpcoesIniciais();
    },

    atual() {
        return this.listar().find(tema => tema.id === this.atualId);
    },

    aplicarBaseMonocromatica() {
        const body = document.body;

        body.style.backgroundImage = "none";
        body.style.backgroundColor = "#F2F2F2";
        body.style.color = "#222222";
        body.style.fontFamily = "Georgia, serif";

        body.style.setProperty("--app-bg", "#F2F2F2");
        body.style.setProperty("--paper-bg", "#FFFFFF");
        body.style.setProperty("--text-color", "#222222");
        body.style.setProperty("--accent-color", "#333333");
        body.style.setProperty("--border-color", "#DDDDDD");
        body.style.setProperty("--muted-color", "#777777");
        body.style.setProperty("--soft-color", "#EEEEEE");
        body.style.setProperty("--soft-hover", "#DDDDDD");
        body.style.setProperty("--toolbar-bg", "#F7F7F7");
        body.style.setProperty("--quote-bg", "#F4F4F4");

        document.querySelectorAll(".paper, .sidebar").forEach(element => {
            element.removeAttribute("style");
        });

        this.aplicarCursor("", "");
        this.aplicarCSS("");
    },

    aplicar(id) {
        const tema = this.listar().find(item => item.id === id);
        if (!tema) return;

        this.atualId = id;
        AppStore.write("bloco_tema_ativo", id);

        const body = document.body;

        body.style.backgroundColor = tema.background || "#F2F2F2";
        body.style.backgroundImage = tema.backgroundImage
            ? `url("${tema.backgroundImage}")`
            : "none";

        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed";
        body.style.color = tema.text || "#222222";
        body.style.fontFamily = tema.font || "Georgia, serif";

        body.style.setProperty("--app-bg", tema.background || "#F2F2F2");
        body.style.setProperty("--paper-bg", tema.paper || "#FFFFFF");
        body.style.setProperty("--text-color", tema.text || "#222222");
        body.style.setProperty("--accent-color", tema.accent || "#333333");
        body.style.setProperty("--border-color", tema.border || "#DDDDDD");
        body.style.setProperty("--muted-color", tema.text || "#777777");
        body.style.setProperty("--soft-color", tema.paper || "#EEEEEE");
        body.style.setProperty("--soft-hover", tema.border || "#DDDDDD");
        body.style.setProperty("--toolbar-bg", tema.paper || "#F7F7F7");
        body.style.setProperty("--quote-bg", tema.background || "#F4F4F4");

        const paper = document.querySelector(".paper");

        if (paper) {
            paper.style.backgroundColor = tema.paper || "#FFFFFF";
            paper.style.color = tema.text || "#222222";
            paper.style.borderColor = tema.border || "#DDDDDD";
            paper.style.borderWidth = (tema.borderWidth ?? 1) + "px";
            paper.style.borderStyle = "solid";
            paper.style.borderRadius = (tema.radius ?? 18) + "px";
            paper.style.fontFamily = tema.font || "Georgia, serif";
        }

        const sidebar = document.querySelector(".sidebar");

        if (sidebar) {
            sidebar.style.backgroundColor = tema.paper || "#FFFFFF";
            sidebar.style.color = tema.text || "#222222";
            sidebar.style.borderColor = tema.border || "#DDDDDD";
        }

        document.querySelectorAll(".document-title, .editor").forEach(element => {
            element.style.color = tema.text || "#222222";
            element.style.fontFamily = tema.font || "Georgia, serif";
        });

        this.aplicarCursor(tema.cursor || "", tema.cursorPointer || "");
        this.aplicarCSS(tema.css || "");
    },

    aplicarCursor(cursorNormal, cursorClique) {
        let estilo = document.getElementById("cursorTemaStyle");

        if (!estilo) {
            estilo = document.createElement("style");
            estilo.id = "cursorTemaStyle";
            document.head.appendChild(estilo);
        }

        const normal = cursorNormal
            ? `url("${cursorNormal}") 0 0, auto`
            : "auto";

        const clique = cursorClique
            ? `url("${cursorClique}") 0 0, pointer`
            : "pointer";

        estilo.textContent = `
            body, body * {
                cursor: ${normal} !important;
            }

            button, a, select, summary,
            [role="button"], label[for],
            input[type="button"],
            input[type="submit"],
            input[type="reset"] {
                cursor: ${clique} !important;
            }

            input, textarea, [contenteditable="true"] {
                cursor: text !important;
            }
        `;
    },

    aplicarCSS(css) {
        let estilo = document.getElementById("cssDoTema");

        if (!estilo) {
            estilo = document.createElement("style");
            estilo.id = "cssDoTema";
            document.head.appendChild(estilo);
        }

        estilo.textContent = css || "";
    },

    criar() {
        const tema = {
            id: AppStore.uid("tema"),
            name: "Novo tema",
            background: "#F2F2F2",
            paper: "#FFFFFF",
            text: "#222222",
            accent: "#444444",
            border: "#DDDDDD",
            font: "Georgia, serif",
            backgroundImage: "",
            cursor: "",
            cursorPointer: "",
            radius: 18,
            borderWidth: 1,
            decoration: "",
            css: ""
        };

        const temas = this.listar();
        temas.push(tema);
        this.salvar(temas);

        this.atualId = tema.id;
        Personalizacao.abrir(tema.id);

        this.renderizarGaleria();

        return tema;
    },

    editar(id) {
        const tema = this.listar().find(item => item.id === id);
        if (tema) Personalizacao.abrir(id);
    },

    async duplicar(id) {
        const original = this.listar().find(item => item.id === id);
        if (!original) return;

        const copia = {
            ...original,
            id: AppStore.uid("tema"),
            name: original.name + " - cópia"
        };

        const imagem = await TemaImagens.obter(id);

        if (imagem) {
            await TemaImagens.salvar(copia.id, imagem);
        }

        const temas = this.listar();
        temas.push(copia);
        this.salvar(temas);

        await this.renderizarGaleria();
        await this.renderizarOpcoesIniciais();

        mostrarToast("Tema duplicado!");
    },

    async excluir(id) {
        const temas = this.listar();

        if (temas.length <= 1) {
            mostrarToast("Você precisa manter pelo menos um tema.");
            return;
        }

        if (!confirm("Deseja excluir este tema?")) return;

        const restantes = temas.filter(item => item.id !== id);

        this.salvar(restantes);
        await TemaImagens.excluir(id);

        if (this.atualId === id) {
            this.aplicar(restantes[0].id);
        }

        await this.renderizarGaleria();
        await this.renderizarOpcoesIniciais();

        mostrarToast("Tema excluído!");
    },

    async criarPreview(tema) {
        const preview = document.createElement("div");
        preview.className = "theme-preview";
        preview.style.backgroundColor = tema.background || "#EEEEEE";

        const imagemSalva = await TemaImagens.obterDataURL(tema.id);
        const fonte = imagemSalva || tema.image || "";

        if (fonte) {
            const imagem = document.createElement("img");
            imagem.className = "theme-card-image";
            imagem.src = fonte;
            imagem.alt = "Capa de " + tema.name;
            preview.appendChild(imagem);
        } else {
            const folha = document.createElement("div");
            folha.className = "theme-preview-paper";
            folha.style.backgroundColor = tema.paper || "#FFFFFF";
            folha.style.border = `1px solid ${tema.border || "#DDDDDD"}`;
            preview.appendChild(folha);
        }

        return preview;
    },

    async renderizarGaleria() {
        const galeria = document.getElementById("galeriaTemas");
        if (!galeria) return;

        const token = ++this.tokenGaleria;
        const fragmento = document.createDocumentFragment();
        const temas = this.listar();

        for (const tema of temas) {
            const card = document.createElement("article");
            card.className = "theme-card";

            if (tema.id === this.atualId) {
                card.classList.add("active");
            }

            const preview = await this.criarPreview(tema);

            const nome = document.createElement("strong");
            nome.textContent = tema.name;

            const descricao = document.createElement("small");
            descricao.textContent = "Aparência personalizada";

            const acoes = document.createElement("div");
            acoes.className = "theme-card-actions";

            const criarBotao = (texto, acao) => {
                const botao = document.createElement("button");
                botao.type = "button";
                botao.textContent = texto;
                botao.addEventListener("click", acao);
                return botao;
            };

            const usar = criarBotao("Usar", async () => {
                this.aplicar(tema.id);
                AppStore.write("bloco_tema_escolhido", true);

                document.getElementById("popupTema").classList.remove("is-open");

                await this.renderizarGaleria();
                mostrarToast("Tema aplicado!");
            });

            const editar = criarBotao("Editar", () => this.editar(tema.id));
            const duplicar = criarBotao("Duplicar", () => this.duplicar(tema.id));
            const excluir = criarBotao("Excluir", () => this.excluir(tema.id));

            acoes.append(usar, editar, duplicar, excluir);
            card.append(preview, nome, descricao, acoes);

            fragmento.appendChild(card);
        }

        if (token === this.tokenGaleria) {
            galeria.replaceChildren(fragmento);
        }
    },

    async renderizarOpcoesIniciais() {
        const area = document.getElementById("opcoesTemaInicial");
        if (!area) return;

        const token = ++this.tokenInicial;
        const fragmento = document.createDocumentFragment();
        const temas = this.listar().slice(0, 4);

        for (const [indice, tema] of temas.entries()) {
            const botao = document.createElement("button");
            botao.type = "button";
            botao.className = "theme-card initial-theme-card";

            const preview = await this.criarPreview(tema);

            const nome = document.createElement("strong");
            nome.textContent = tema.name || "Meu tema " + (indice + 1);

            const ajuda = document.createElement("small");
            ajuda.textContent = "Escolher este espaço";

            botao.append(preview, nome, ajuda);

            botao.addEventListener("click", async () => {
                this.aplicar(tema.id);
                AppStore.write("bloco_tema_escolhido", true);

                document.getElementById("popupTema").classList.remove("is-open");

                await this.renderizarGaleria();
            });

            fragmento.appendChild(botao);
        }

        if (token === this.tokenInicial) {
            area.replaceChildren(fragmento);
        }
    }
};

window.Personalizacao = {
    temaId: null,
    iniciado: false,

    async abrir(id) {
        const tema = Temas.listar().find(item => item.id === id);
        if (!tema) return;

        this.temaId = id;

        document.getElementById("nomeTemaInput").value = tema.name || "";

        document.getElementById("corFundo").value = tema.background || "#F2F2F2";
        document.getElementById("corCaixa").value = tema.paper || "#FFFFFF";
        document.getElementById("corTexto").value = tema.text || "#222222";
        document.getElementById("corDestaque").value = tema.accent || "#444444";
        document.getElementById("corBorda").value = tema.border || "#DDDDDD";
        document.getElementById("fonteTema").value = tema.font || "Georgia, serif";

        document.getElementById("imagemFundo").value = tema.backgroundImage || "";
        document.getElementById("cursorTema").value = tema.cursor || "";
        document.getElementById("cursorCliqueTema").value = tema.cursorPointer || "";

        document.getElementById("arredondamento").value = tema.radius ?? 18;
        document.getElementById("espessuraBorda").value = tema.borderWidth ?? 1;
        document.getElementById("enfeiteTema").value = tema.decoration || "";
        document.getElementById("codigoCSS").value = tema.css || "";

        document.getElementById("imagemTemaArquivo").value = "";
        document.getElementById("mensagemTema").textContent = "";

        const preview = document.getElementById("previewImagemTema");
        const imagem = await TemaImagens.obterDataURL(id);

        if (imagem) {
            preview.src = imagem;
            preview.hidden = false;
        } else {
            preview.removeAttribute("src");
            preview.hidden = true;
        }

        this.mudarAba("visual");

        document.getElementById("modalConfiguracoes").classList.add("is-open");
    },

    iniciar() {
        if (this.iniciado) return;
        this.iniciado = true;

        const campoArquivo = document.getElementById("imagemTemaArquivo");
        const botaoRemover = document.getElementById("removerImagemTema");

        campoArquivo.addEventListener("change", async () => {
            const arquivo = campoArquivo.files[0];

            if (!arquivo) return;

            if (!arquivo.type.startsWith("image/")) {
                mostrarToast("Escolha um arquivo de imagem.");
                campoArquivo.value = "";
                return;
            }

            try {
                await TemaImagens.salvar(this.temaId, arquivo);

                const preview = document.getElementById("previewImagemTema");
                preview.src = await TemaImagens.obterDataURL(this.temaId);
                preview.hidden = false;

                await Temas.renderizarGaleria();
                await Temas.renderizarOpcoesIniciais();

                mostrarToast("Imagem adicionada!");
            } catch (erro) {
                console.error(erro);
                mostrarToast("Não foi possível salvar a imagem.");
            }

            campoArquivo.value = "";
        });

        botaoRemover.addEventListener("click", async () => {
            if (!this.temaId) return;

            try {
                await TemaImagens.excluir(this.temaId);

                const preview = document.getElementById("previewImagemTema");
                preview.removeAttribute("src");
                preview.hidden = true;

                await Temas.renderizarGaleria();
                await Temas.renderizarOpcoesIniciais();

                mostrarToast("Imagem removida!");
            } catch (erro) {
                console.error(erro);
                mostrarToast("Não foi possível remover a imagem.");
            }
        });
    },

    obterValores() {
        return {
            name: document.getElementById("nomeTemaInput").value.trim() || "Meu tema",

            background: document.getElementById("corFundo").value,
            paper: document.getElementById("corCaixa").value,
            text: document.getElementById("corTexto").value,
            accent: document.getElementById("corDestaque").value,
            border: document.getElementById("corBorda").value,

            font: document.getElementById("fonteTema").value,
            backgroundImage: document.getElementById("imagemFundo").value.trim(),

            cursor: document.getElementById("cursorTema").value.trim(),
            cursorPointer: document.getElementById("cursorCliqueTema").value.trim(),

            radius: Number(document.getElementById("arredondamento").value),
            borderWidth: Number(document.getElementById("espessuraBorda").value),

            decoration: document.getElementById("enfeiteTema").value
        };
    },

    async salvarVisual() {
        const temas = Temas.listar();
        const indice = temas.findIndex(item => item.id === this.temaId);

        if (indice === -1) return;

        Object.assign(temas[indice], this.obterValores());

        Temas.salvar(temas);
        Temas.aplicar(this.temaId);

        await Temas.renderizarGaleria();
        await Temas.renderizarOpcoesIniciais();

        document.getElementById("mensagemTema").textContent =
            "Aparência salva com sucesso! ♡";

        mostrarToast("Personalização salva!");
    },

    visualizarCSS() {
        const css = document.getElementById("codigoCSS").value;

        Temas.aplicarCSS(css);

        document.getElementById("mensagemTema").textContent =
            "Pré-visualização aplicada. Ainda não foi salva.";
    },

    async salvarCSS() {
        const temas = Temas.listar();
        const indice = temas.findIndex(item => item.id === this.temaId);

        if (indice === -1) return;

        temas[indice].css = document.getElementById("codigoCSS").value;

        Temas.salvar(temas);
        Temas.aplicar(this.temaId);

        await Temas.renderizarGaleria();

        document.getElementById("mensagemTema").textContent =
            "CSS salvo com sucesso! ♡";

        mostrarToast("Código CSS salvo!");
    },

    mudarAba(nome) {
        const visual = nome === "visual";

        document.getElementById("abaVisual").hidden = !visual;
        document.getElementById("abaCodigo").hidden = visual;

        document.querySelectorAll(".tab-button").forEach(botao => {
            botao.classList.toggle("active", botao.dataset.tab === nome);
        });
    }
};

function mostrarToast(mensagem) {
    const toast = document.getElementById("toast");
    if (!toast) return;

    toast.textContent = mensagem;
    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 2600);
}

function abrirModal(id) {
    document.getElementById(id)?.classList.add("is-open");
}

function fecharModal(id) {
    document.getElementById(id)?.classList.remove("is-open");
}

document.addEventListener("DOMContentLoaded", () => {

    Personalizacao.iniciar();
    Temas.iniciar();

    const temaEscolhido = AppStore.read("bloco_tema_escolhido", false);

    if (!temaEscolhido) {
        abrirModal("popupTema");
    }

    Documentos.renderizarLista();

    const documentoSalvo = AppStore.read("bloco_documento_ativo", null);

    if (documentoSalvo) {
        Documentos.abrir(documentoSalvo);
    }

    document.getElementById("novoDocumento")
        .addEventListener("click", () => Documentos.criar());

    document.getElementById("criarPrimeiroDocumento")
        .addEventListener("click", () => Documentos.criar());

    document.getElementById("atualizarLista")
        .addEventListener("click", () => {
            Documentos.renderizarLista();
            mostrarToast("Biblioteca atualizada!");
        });

    document.getElementById("voltarBiblioteca")
        .addEventListener("click", () => Documentos.voltarBiblioteca());

    const editor = document.getElementById("editor");
    const titulo = document.getElementById("tituloDocumento");

    editor.addEventListener("input", () => {
        Documentos.contarPalavras();
        Documentos.agendarSalvamento();
    });

    titulo.addEventListener("input", () => {
        Documentos.agendarSalvamento();
    });

    document.getElementById("novaPasta")
        .addEventListener("click", () => {
            document.getElementById("nomePastaInput").value = "";
            abrirModal("modalNomePasta");
            document.getElementById("nomePastaInput").focus();
        });

    document.getElementById("confirmarPasta")
        .addEventListener("click", () => {
            const campo = document.getElementById("nomePastaInput");
            const nome = campo.value.trim();

            if (!nome) {
                mostrarToast("Digite um nome para a pasta.");
                campo.focus();
                return;
            }

            Documentos.criarPasta(nome);
            fecharModal("modalNomePasta");
            mostrarToast("Pasta criada!");
        });

    document.getElementById("abrirGaleria")
        .addEventListener("click", async () => {
            await Temas.renderizarGaleria();
            abrirModal("modalGaleria");
        });

    document.getElementById("criarTema")
        .addEventListener("click", () => Temas.criar());

    document.getElementById("abrirConfiguracoes")
        .addEventListener("click", () => {
            const tema = Temas.atual();
            if (tema) Personalizacao.abrir(tema.id);
        });

    document.querySelectorAll(".tab-button").forEach(botao => {
        botao.addEventListener("click", () => {
            Personalizacao.mudarAba(botao.dataset.tab);
        });
    });

    document.getElementById("salvarVisual")
        .addEventListener("click", () => Personalizacao.salvarVisual());

    document.getElementById("visualizarCSS")
        .addEventListener("click", () => Personalizacao.visualizarCSS());

    document.getElementById("salvarCSS")
        .addEventListener("click", () => Personalizacao.salvarCSS());

    document.querySelectorAll("[data-command]").forEach(botao => {
        botao.addEventListener("click", () => {
            editor.focus();
            document.execCommand(botao.dataset.command, false, null);
            Documentos.agendarSalvamento();
        });
    });

    document.getElementById("formatoTexto")
        .addEventListener("change", evento => {
            editor.focus();
            document.execCommand("formatBlock", false, evento.target.value);
            Documentos.agendarSalvamento();
        });

    document.getElementById("inserirLinha")
        .addEventListener("click", () => {
            editor.focus();
            document.execCommand("insertHorizontalRule");
            Documentos.agendarSalvamento();
        });

    document.getElementById("limparFormatacao")
        .addEventListener("click", () => {
            editor.focus();
            document.execCommand("removeFormat");
            Documentos.agendarSalvamento();
        });

    document.querySelectorAll("[data-close]").forEach(botao => {
        botao.addEventListener("click", () => fecharModal(botao.dataset.close));
    });

    document.querySelectorAll(".overlay").forEach(overlay => {
        overlay.addEventListener("click", evento => {
            if (evento.target === overlay && overlay.id !== "popupTema") {
                overlay.classList.remove("is-open");
            }
        });
    });

    document.addEventListener("keydown", evento => {
        if (
            (evento.ctrlKey || evento.metaKey) &&
            evento.key.toLowerCase() === "s"
        ) {
            evento.preventDefault();
            Documentos.salvarAgora();
            mostrarToast("Documento salvo!");
        }
    });

});