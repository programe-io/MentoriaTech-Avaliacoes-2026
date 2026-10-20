
const CHAVES = {
    alunos: "chamada_alunos_v1",
    chamadas: "chamada_registros_v1",
    config: "chamada_config_v1"
};

const DIAS = ["segunda", "terca", "quarta", "quinta", "sexta"];

const NOMES_DIAS = {
    segunda: "Segunda-feira",
    terca: "Terça-feira",
    quarta: "Quarta-feira",
    quinta: "Quinta-feira",
    sexta: "Sexta-feira"
};

const PADRAO_CONFIG = {
    segunda: 0,
    terca: 5,
    quarta: 1,
    quinta: 3,
    sexta: 1
};

function ler(chave, padrao) {
    try {
        return JSON.parse(localStorage.getItem(chave)) ?? padrao;
    } catch {
        return padrao;
    }
}

let alunos = ler(CHAVES.alunos, []);
let chamadas = ler(CHAVES.chamadas, []);
let config = {
    ...PADRAO_CONFIG,
    ...ler(CHAVES.config, {})
};

let marcacoes = {};

function guardar() {
    localStorage.setItem(CHAVES.alunos, JSON.stringify(alunos));
    localStorage.setItem(CHAVES.chamadas, JSON.stringify(chamadas));
    localStorage.setItem(CHAVES.config, JSON.stringify(config));
}

function id() {
    return Date.now().toString(36) +
        Math.random().toString(36).slice(2, 8);
}

function escapar(texto) {
    return String(texto).replace(/[&<>"']/g, caractere => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[caractere]);
}

function dataHoje() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function diaDaData(data) {
    const numero = new Date(`${data}T12:00:00`).getDay();

    return ({
        1: "segunda",
        2: "terca",
        3: "quarta",
        4: "quinta",
        5: "sexta"
    })[numero] || "segunda";
}

function dataBR(data) {
    if (!data) return "";
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function valor(idElemento) {
    return document.getElementById(idElemento).value;
}

function definir(idElemento, valorNovo) {
    document.getElementById(idElemento).value = valorNovo;
}

function prepararMarcacoes() {
    const novas = {};

    alunos.forEach(aluno => {
        novas[aluno.id] = marcacoes[aluno.id] || {
            presenca: "",
            atividade: ""
        };
    });

    marcacoes = novas;
}

function atualizarSeletorAulas() {
    const dia = valor("diaSemana");
    const quantidade = Number(config[dia] || 0);
    const seletor = document.getElementById("numeroAula");
    const anterior = Number(seletor.value || 1);

    seletor.innerHTML = "";

    for (let i = 1; i <= Math.max(quantidade, 1); i++) {
        const opcao = document.createElement("option");
        opcao.value = i;
        opcao.textContent = `Aula ${i}`;
        seletor.appendChild(opcao);
    }

    seletor.value = String(Math.min(anterior, Math.max(quantidade, 1)));
    seletor.disabled = quantidade === 0;
}

function renderizarChamada() {
    prepararMarcacoes();

    const busca = valor("buscaAluno").trim().toLocaleLowerCase("pt-BR");

    const filtrados = alunos.filter(aluno =>
        aluno.nome.toLocaleLowerCase("pt-BR").includes(busca)
    );

    document.getElementById("corpoChamada").innerHTML =
        filtrados.map((aluno, indice) => {
            const marcacao = marcacoes[aluno.id] || {};

            const classeNome =
                marcacao.presenca === "presente" ? "presente-print" :
                marcacao.presenca === "ausente" ? "ausente-print" : "";

            return `
            <tr data-id="${aluno.id}">
                <td>${indice + 1}</td>
                <td class="nome-aluno ${classeNome}">
                    ${escapar(aluno.nome)}
                </td>
                <td>
                    <div class="opcoes">
                        <button class="marcacao ${marcacao.presenca === "presente" ? "selecionado presente" : ""}"
                            data-tipo="presenca" data-valor="presente">
                            Presente
                        </button>
                        <button class="marcacao ${marcacao.presenca === "ausente" ? "selecionado ausente" : ""}"
                            data-tipo="presenca" data-valor="ausente">
                            Ausente
                        </button>
                    </div>
                </td>
                <td>
                    <div class="opcoes">
                        <button class="marcacao ${marcacao.atividade === "sim" ? "selecionado sim" : ""}"
                            data-tipo="atividade" data-valor="sim">
                            Sim
                        </button>
                        <button class="marcacao ${marcacao.atividade === "nao" ? "selecionado nao" : ""}"
                            data-tipo="atividade" data-valor="nao">
                            Não
                        </button>
                    </div>
                </td>
            </tr>`;
        }).join("");

    document.getElementById("estadoVazio").style.display =
        alunos.length ? "none" : "block";

    document.getElementById("totalAlunos").textContent = alunos.length;

    document.getElementById("totalPresentes").textContent =
        alunos.filter(a => marcacoes[a.id]?.presenca === "presente").length;

    document.getElementById("totalAusentes").textContent =
        alunos.filter(a => marcacoes[a.id]?.presenca === "ausente").length;

    document.getElementById("totalAtividades").textContent =
        alunos.filter(a => marcacoes[a.id]?.atividade === "sim").length;
}

function renderizarAlunos() {
    document.getElementById("corpoAlunos").innerHTML =
        alunos.map((aluno, indice) => `
        <tr>
            <td>${indice + 1}</td>
            <td>${escapar(aluno.nome)}</td>
            <td>
                <button class="btn perigo" data-remover="${aluno.id}">
                    Excluir
                </button>
            </td>
        </tr>
    `).join("");

    document.getElementById("estadoAlunos").style.display =
        alunos.length ? "none" : "block";

    renderizarChamada();
}

function chamadaAtual() {
    return {
        id: id(),
        data: valor("dataAula"),
        dia: valor("diaSemana"),
        aula: Number(valor("numeroAula") || 1),
        turma: valor("turma").trim(),
        criadaEm: new Date().toISOString(),
        registros: alunos.map(aluno => ({
            alunoId: aluno.id,
            nome: aluno.nome,
            presenca: marcacoes[aluno.id]?.presenca || "",
            atividade: marcacoes[aluno.id]?.atividade || ""
        }))
    };
}

function salvarChamada() {
    if (!alunos.length) {
        alert("Cadastre pelo menos um aluno.");
        return;
    }

    const registro = chamadaAtual();

    if (!registro.data) {
        alert("Escolha a data da aula.");
        return;
    }

    const indice = chamadas.findIndex(chamada =>
        chamada.data === registro.data &&
        chamada.dia === registro.dia &&
        Number(chamada.aula) === registro.aula &&
        chamada.turma === registro.turma
    );

    if (indice >= 0) {
        if (!confirm("Já existe uma chamada para esta aula. Deseja atualizá-la?")) {
            return;
        }

        registro.id = chamadas[indice].id;
        chamadas[indice] = registro;
    } else {
        chamadas.unshift(registro);
    }

    guardar();
    renderizarHistorico();

    document.getElementById("avisoCopia").textContent =
        "Chamada salva com sucesso.";
}

function copiarAnterior() {
    const data = valor("dataAula");
    const turma = valor("turma").trim();
    const aula = Number(valor("numeroAula") || 1);

    const anteriores = chamadas
        .filter(c => c.turma === turma &&
            (c.data < data || (c.data === data && c.aula < aula)))
        .sort((a, b) =>
            b.data.localeCompare(a.data) || b.aula - a.aula
        );

    if (!anteriores.length) {
        alert("Não há chamada anterior salva para esta turma.");
        return;
    }

    const origem = anteriores[0];

    origem.registros.forEach(registro => {
        const aluno = alunos.find(a => a.id === registro.alunoId) ||
            alunos.find(a => a.nome === registro.nome);

        if (aluno) {
            marcacoes[aluno.id] = {
                presenca: registro.presenca || "",
                atividade: registro.atividade || ""
            };
        }
    });

    renderizarChamada();

    document.getElementById("avisoCopia").textContent =
        `Marcações copiadas da chamada de ${dataBR(origem.data)}, aula ${origem.aula}.`;
}

function renderizarHistorico() {
    const filtro = valor("filtroHistorico")
        .trim().toLocaleLowerCase("pt-BR");

    const lista = chamadas.filter(c =>
        `${c.data} ${dataBR(c.data)} ${NOMES_DIAS[c.dia] || c.dia} ${c.turma || ""} aula ${c.aula}`
            .toLocaleLowerCase("pt-BR").includes(filtro)
    );

    document.getElementById("listaHistorico").innerHTML =
        lista.map(c => {
            const presentes = c.registros.filter(r =>
                r.presenca === "presente").length;

            const ausentes = c.registros.filter(r =>
                r.presenca === "ausente").length;

            return `
            <article class="item-historico">
                <div>
                    <h3>${dataBR(c.data)} · ${NOMES_DIAS[c.dia] || c.dia}
                        · Aula ${c.aula} ${escapar(c.turma || "")}</h3>
                    <p>${c.registros.length} aluno(s) ·
                        ${presentes} presente(s) · ${ausentes} ausente(s)</p>
                </div>
                <div class="acoes-historico">
                    <button class="btn secundario" data-abrir="${c.id}">Abrir</button>
                    <button class="btn secundario" data-modelo="${c.id}">Usar como modelo</button>
                    <button class="btn perigo" data-excluir-chamada="${c.id}">Excluir</button>
                </div>
            </article>`;
        }).join("");

    document.getElementById("historicoVazio").style.display =
        lista.length ? "none" : "block";
}

function abrirChamada(chamada, modelo = false) {
    definir("dataAula", chamada.data);
    definir("diaSemana", chamada.dia);

    atualizarSeletorAulas();
    definir("numeroAula", String(chamada.aula));
    definir("turma", chamada.turma || "");

    marcacoes = {};

    chamada.registros.forEach(registro => {
        const aluno = alunos.find(a => a.id === registro.alunoId) ||
            alunos.find(a => a.nome === registro.nome);

        if (aluno) {
            marcacoes[aluno.id] = {
                presenca: registro.presenca || "",
                atividade: registro.atividade || ""
            };
        }
    });

    renderizarChamada();
    trocarTela("chamada");

    document.getElementById("avisoCopia").textContent = modelo
        ? "Modelo carregado. Confira as marcações e salve a nova chamada."
        : "Chamada carregada.";
}

function trocarTela(nome) {
    document.querySelectorAll(".aba").forEach(botao => {
        botao.classList.toggle("ativa", botao.dataset.tela === nome);
    });

    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.toggle("ativa", tela.id === `tela-${nome}`);
    });

    if (nome === "alunos") renderizarAlunos();
    if (nome === "historico") renderizarHistorico();
}

function baixar(nome, conteudo, tipo = "text/plain;charset=utf-8") {
    const arquivo = new Blob([conteudo], { type: tipo });
    const url = URL.createObjectURL(arquivo);
    const link = document.createElement("a");

    link.href = url;
    link.download = nome;
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportarAlunos() {
    const linhas = ["Nome", ...alunos.map(a =>
        `"${a.nome.replace(/"/g, '""')}"`
    )];

    baixar("lista_alunos.csv", "\uFEFF" + linhas.join("\n"),
        "text/csv;charset=utf-8");
}

function importarLista(arquivo) {
    const leitor = new FileReader();

    leitor.onload = () => {
        const linhas = String(leitor.result)
            .split(/\r?\n/)
            .map(l => l.trim())
            .filter(Boolean);

        let adicionados = 0;

        linhas.forEach((linha, indice) => {
            let nome = linha.replace(/^"|"$/g, "")
                .replace(/""/g, '"')
                .split(/[;,]/)[0].trim();

            if (indice === 0 && /nome/i.test(nome)) return;

            if (nome && !alunos.some(a =>
                a.nome.toLocaleLowerCase("pt-BR") ===
                nome.toLocaleLowerCase("pt-BR"))) {
                alunos.push({ id: id(), nome });
                adicionados++;
            }
        });

        guardar();
        renderizarAlunos();
        alert(`${adicionados} aluno(s) importado(s).`);
    };

    leitor.readAsText(arquivo, "UTF-8");
}

function backup() {
    baixar("backup_sistema_chamada.json",
        JSON.stringify({ versao: 1, alunos, chamadas, config }, null, 2),
        "application/json");
}

function restaurar(arquivo) {
    const leitor = new FileReader();

    leitor.onload = () => {
        try {
            const dados = JSON.parse(leitor.result);

            if (!Array.isArray(dados.alunos) ||
                !Array.isArray(dados.chamadas) || !dados.config) {
                throw new Error("Backup inválido");
            }

            if (!confirm("Restaurar substituirá os dados atuais. Continuar?")) {
                return;
            }

            alunos = dados.alunos;
            chamadas = dados.chamadas;
            config = { ...PADRAO_CONFIG, ...dados.config };

            guardar();
            inicializar();

            alert("Backup restaurado.");
        } catch {
            alert("Arquivo de backup inválido.");
        }
    };

    leitor.readAsText(arquivo);
}

function configurarCampos() {
    DIAS.forEach(dia => definir(`cfg-${dia}`, config[dia] ?? 0));
}

function inicializar() {
    definir("dataAula", dataHoje());
    definir("diaSemana", diaDaData(dataHoje()));

    atualizarSeletorAulas();
    configurarCampos();
    prepararMarcacoes();
    renderizarAlunos();
    renderizarHistorico();
}

/* Navegação entre telas */
document.querySelectorAll(".aba").forEach(botao => {
    botao.addEventListener("click", () =>
        trocarTela(botao.dataset.tela)
    );
});

/* Atualização da data e do dia da semana */
document.getElementById("dataAula").addEventListener("change", () => {
    if (valor("dataAula")) {
        definir("diaSemana", diaDaData(valor("dataAula")));
    }

    atualizarSeletorAulas();
});

document.getElementById("diaSemana")
    .addEventListener("change", atualizarSeletorAulas);

/* Marcação de presença e atividade */
document.getElementById("corpoChamada").addEventListener("click", evento => {
    const botao = evento.target.closest("button[data-tipo]");
    if (!botao) return;

    const alunoId = botao.closest("tr").dataset.id;
    const tipo = botao.dataset.tipo;
    const valorMarcacao = botao.dataset.valor;

    marcacoes[alunoId] = marcacoes[alunoId] || {
        presenca: "",
        atividade: ""
    };

    marcacoes[alunoId][tipo] =
        marcacoes[alunoId][tipo] === valorMarcacao
            ? ""
            : valorMarcacao;

    renderizarChamada();
});

/* Cadastro de alunos */
document.getElementById("formAluno").addEventListener("submit", evento => {
    evento.preventDefault();

    const nome = valor("nomeAluno").trim();
    if (!nome) return;

    if (alunos.some(a =>
        a.nome.toLocaleLowerCase("pt-BR") ===
        nome.toLocaleLowerCase("pt-BR"))) {
        alert("Esse aluno já está cadastrado.");
        return;
    }

    const aluno = { id: id(), nome };
    alunos.push(aluno);

    marcacoes[aluno.id] = { presenca: "", atividade: "" };

    definir("nomeAluno", "");
    guardar();
    renderizarAlunos();
});

/* Exclusão de alunos */
document.getElementById("corpoAlunos").addEventListener("click", evento => {
    const botao = evento.target.closest("[data-remover]");
    if (!botao) return;

    const aluno = alunos.find(a => a.id === botao.dataset.remover);

    if (confirm(`Excluir ${aluno?.nome || "este aluno"}?`)) {
        alunos = alunos.filter(a => a.id !== botao.dataset.remover);
        delete marcacoes[botao.dataset.remover];

        guardar();
        renderizarAlunos();
    }
});

/* Botões da chamada */
document.getElementById("btnSalvar")
    .addEventListener("click", salvarChamada);

document.getElementById("btnCopiar")
    .addEventListener("click", copiarAnterior);

document.getElementById("btnTodosPresentes").addEventListener("click", () => {
    alunos.forEach(aluno => {
        marcacoes[aluno.id] = marcacoes[aluno.id] || {
            presenca: "",
            atividade: ""
        };

        marcacoes[aluno.id].presenca = "presente";
    });

    renderizarChamada();
});

document.getElementById("btnLimpar").addEventListener("click", () => {
    if (confirm("Limpar todas as marcações desta chamada?")) {
        alunos.forEach(aluno => {
            marcacoes[aluno.id] = { presenca: "", atividade: "" };
        });

        renderizarChamada();
    }
});

document.getElementById("btnImprimir").addEventListener("click", () => {
    if (!alunos.length) {
        alert("Cadastre alunos antes de imprimir.");
        return;
    }

    window.print();
});

document.getElementById("buscaAluno")
    .addEventListener("input", renderizarChamada);

document.getElementById("filtroHistorico")
    .addEventListener("input", renderizarHistorico);

/* Ações do histórico */
document.getElementById("listaHistorico").addEventListener("click", evento => {
    const botao = evento.target.closest("button");
    if (!botao) return;

    const chamada = chamadas.find(c =>
        c.id === botao.dataset.abrir ||
        c.id === botao.dataset.modelo ||
        c.id === botao.dataset.excluirChamada
    );

    if (!chamada) return;

    if (botao.dataset.abrir) abrirChamada(chamada);

    if (botao.dataset.modelo) abrirChamada(chamada, true);

    if (botao.dataset.excluirChamada &&
        confirm("Excluir esta chamada salva?")) {
        chamadas = chamadas.filter(c => c.id !== chamada.id);
        guardar();
        renderizarHistorico();
    }
});

/* Configurações */
document.getElementById("formConfiguracoes")
    .addEventListener("submit", evento => {
        evento.preventDefault();

        DIAS.forEach(dia => {
            config[dia] = Math.max(
                0,
                Math.min(20, Number(valor(`cfg-${dia}`) || 0))
            );
        });

        guardar();
        atualizarSeletorAulas();
        alert("Configurações salvas.");
    });

/* Importação, exportação e backup */
document.getElementById("btnExportarAlunos")
    .addEventListener("click", exportarAlunos);

document.getElementById("importarAlunos").addEventListener("change", evento => {
    if (evento.target.files[0]) importarLista(evento.target.files[0]);
    evento.target.value = "";
});

document.getElementById("btnBackup")
    .addEventListener("click", backup);

document.getElementById("restaurarBackup").addEventListener("change", evento => {
    if (evento.target.files[0]) restaurar(evento.target.files[0]);
    evento.target.value = "";
});

/* Inicialização do sistema */
inicializar();
