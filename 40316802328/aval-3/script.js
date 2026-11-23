/* =================================
   CONFIGURAÇÃO
   (mesma chave de antes: os dados já salvos continuam aparecendo)
================================= */

const CHAVE = "historico_pessoas_imc";

const FAIXAS = [
    { limite: 18.5, nome: "Abaixo do peso",     cor: "var(--c-abaixo)" },
    { limite: 25,   nome: "Peso normal",        cor: "var(--c-normal)" },
    { limite: 30,   nome: "Sobrepeso",          cor: "var(--c-sobre)"  },
    { limite: 35,   nome: "Obesidade grau I",   cor: "var(--c-obeso)"  },
    { limite: 40,   nome: "Obesidade grau II",  cor: "var(--c-obeso)"  },
    { limite: Infinity, nome: "Obesidade grau III", cor: "var(--c-obeso)" }
];

const $ = id => document.getElementById(id);

const el = {
    grade: $("grade"), total: $("total"), media: $("media"),
    distribuicao: $("distribuicao"), busca: $("busca"), ordem: $("ordem"),
    dialogo: $("dialogo"), form: $("form"), titulo: $("titulo"), salvar: $("salvar"),
    nome: $("f-nome"), idade: $("f-idade"), altura: $("f-altura"), peso: $("f-peso"),
    previa: $("previa"), erro: $("msg-erro"), aviso: $("aviso")
};

let pessoas = [];
let editandoId = null;
let timerAviso = null;


/* =================================
   ARMAZENAMENTO
================================= */

const ler = () => {
    try {
        const lista = JSON.parse(localStorage.getItem(CHAVE));
        if (!Array.isArray(lista)) return [];
        return lista.filter(p =>
            p && typeof p.id === "string" && typeof p.nome === "string" &&
            Number.isInteger(p.idade) && p.altura > 0 && p.peso > 0
        );
    } catch {
        return [];
    }
};

const gravar = lista => {
    try {
        localStorage.setItem(CHAVE, JSON.stringify(lista));
        pessoas = lista;
        return true;
    } catch {
        mostrarAviso("Não foi possível salvar no navegador.");
        return false;
    }
};


/* =================================
   CÁLCULOS E FORMATO
================================= */

const imcDe = p => p.peso / (p.altura * p.altura);

const faixaDe = imc => FAIXAS.find(f => imc < f.limite);

const fmt = (n, casas) =>
    Number(n).toLocaleString("pt-BR", { minimumFractionDigits: casas, maximumFractionDigits: casas });

const posicaoNaEscala = imc => Math.min(100, Math.max(0, ((imc - 15) / 25) * 100));


/* =================================
   AVISO NA TELA
================================= */

function mostrarAviso(texto) {
    el.aviso.textContent = texto;
    el.aviso.hidden = false;
    clearTimeout(timerAviso);
    timerAviso = setTimeout(() => { el.aviso.hidden = true; }, 2500);
}


/* =================================
   CRIAÇÃO DE ELEMENTOS
================================= */

function criar(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
}

function criarCartao(p) {
    const imc = imcDe(p);
    const faixa = faixaDe(imc);

    const cartao = criar("article", "cartao");
    cartao.style.setProperty("--cor", faixa.cor);

    // Topo: nome + IMC
    const topo = criar("div", "cartao-topo");
    const dados = criar("div");
    dados.append(criar("h3", "", p.nome), criar("p", "idade", `${p.idade} anos`));
    topo.append(dados, criar("span", "imc-valor", fmt(imc, 1)));

    // Escala com marcador
    const escala = criar("div", "escala");
    const marcador = criar("span", "marcador");
    marcador.style.left = posicaoNaEscala(imc) + "%";
    escala.append(marcador);

    // Medidas
    const medidas = criar("div", "medidas");
    const alt = criar("span", "", "Altura "); alt.append(criar("b", "", `${fmt(p.altura, 2)} m`));
    const pes = criar("span", "", "Peso ");   pes.append(criar("b", "", `${fmt(p.peso, 1)} kg`));
    medidas.append(alt, pes);

    // Ações
    const acoes = criar("div", "cartao-acoes");
    const editar = criar("button", "b-editar", "Editar");
    const excluir = criar("button", "b-excluir", "Excluir");
    editar.type = excluir.type = "button";
    editar.addEventListener("click", () => abrirFormulario(p.id));
    excluir.addEventListener("click", () => excluir_(p.id));
    acoes.append(editar, excluir);

    cartao.append(topo, criar("span", "etiqueta", faixa.nome), escala, medidas, acoes);
    return cartao;
}


/* =================================
   DESENHAR A TELA
================================= */

function listaVisivel() {
    const termo = el.busca.value.trim().toLowerCase();
    let lista = pessoas.filter(p => p.nome.toLowerCase().includes(termo));

    if (el.ordem.value === "nome") {
        lista.sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));
    } else if (el.ordem.value === "imc") {
        lista.sort((a, b) => imcDe(b) - imcDe(a));
    } else {
        lista.reverse();
    }
    return lista;
}

function desenharResumo() {
    el.total.textContent = pessoas.length;
    el.media.textContent = pessoas.length
        ? fmt(pessoas.reduce((s, p) => s + imcDe(p), 0) / pessoas.length, 1)
        : "0,0";

    // Contagem por categoria (agrupa as obesidades)
    const grupos = [
        { nome: "Abaixo", cor: FAIXAS[0].cor, teste: i => i < 18.5 },
        { nome: "Normal", cor: FAIXAS[1].cor, teste: i => i >= 18.5 && i < 25 },
        { nome: "Sobrepeso", cor: FAIXAS[2].cor, teste: i => i >= 25 && i < 30 },
        { nome: "Obesidade", cor: FAIXAS[3].cor, teste: i => i >= 30 }
    ];

    el.distribuicao.replaceChildren(...grupos.map(g => {
        const qtd = pessoas.filter(p => g.teste(imcDe(p))).length;
        const li = criar("li");
        const ponto = criar("span", "ponto");
        ponto.style.background = g.cor;
        li.append(ponto, `${g.nome}: ${qtd}`);
        return li;
    }));
}

function desenhar() {
    desenharResumo();

    const lista = listaVisivel();

    if (lista.length === 0) {
        const msg = pessoas.length === 0
            ? "Nenhum paciente cadastrado. Clique em “Novo paciente” para começar."
            : "Nenhum paciente encontrado para essa busca.";
        el.grade.replaceChildren(criar("p", "vazio", msg));
        return;
    }

    el.grade.replaceChildren(...lista.map(criarCartao));
}


/* =================================
   FORMULÁRIO (janela)
================================= */

function atualizarPrevia() {
    const altura = Number(el.altura.value);
    const peso = Number(el.peso.value);

    if (altura > 0 && peso > 0) {
        const imc = peso / (altura * altura);
        el.previa.textContent = `${fmt(imc, 1)} — ${faixaDe(imc).nome}`;
    } else {
        el.previa.textContent = "—";
    }
}

function abrirFormulario(id = null) {
    editandoId = id;
    el.form.reset();
    el.erro.hidden = true;

    if (id) {
        const p = pessoas.find(x => x.id === id);
        if (!p) return;
        el.nome.value = p.nome;
        el.idade.value = p.idade;
        el.altura.value = p.altura;
        el.peso.value = p.peso;
        el.titulo.textContent = "Editar paciente";
        el.salvar.textContent = "Salvar alterações";
    } else {
        el.titulo.textContent = "Novo paciente";
        el.salvar.textContent = "Cadastrar";
    }

    atualizarPrevia();
    el.dialogo.showModal();
    el.nome.focus();
}

function fecharFormulario() {
    el.dialogo.close();
    editandoId = null;
}

function validar(d) {
    if (!d.nome) return "Informe o nome do paciente.";
    if (!Number.isInteger(d.idade) || d.idade < 1 || d.idade > 126) return "A idade deve ficar entre 1 e 126 anos.";
    if (!(d.altura >= 0.5 && d.altura <= 2.5)) return "A altura deve ficar entre 0,50 m e 2,50 m.";
    if (!(d.peso >= 1 && d.peso <= 500)) return "O peso deve ficar entre 1 e 500 kg.";
    return "";
}

function enviarFormulario(e) {
    e.preventDefault();

    const dados = {
        nome: el.nome.value.trim(),
        idade: Number(el.idade.value),
        altura: Number(el.altura.value),
        peso: Number(el.peso.value)
    };

    const problema = validar(dados);
    if (problema) {
        el.erro.textContent = problema;
        el.erro.hidden = false;
        return;
    }

    let ok;
    if (editandoId) {
        ok = gravar(pessoas.map(p => p.id === editandoId ? { ...p, ...dados } : p));
    } else {
        const id = Date.now().toString() + Math.random().toString(36).slice(2, 7);
        ok = gravar([...pessoas, { id, ...dados }]);
    }
    if (!ok) return;

    mostrarAviso(editandoId ? "Dados atualizados." : "Paciente cadastrado.");
    fecharFormulario();
    desenhar();
}


/* =================================
   EXCLUIR
================================= */

function excluir_(id) {
    const p = pessoas.find(x => x.id === id);
    if (!p) return;

    if (!confirm(`Excluir ${p.nome} do histórico?`)) return;

    if (gravar(pessoas.filter(x => x.id !== id))) {
        mostrarAviso("Paciente excluído.");
        desenhar();
    }
}


/* =================================
   EVENTOS E INÍCIO
================================= */

$("abrir-form").addEventListener("click", () => abrirFormulario());
$("fechar-form").addEventListener("click", fecharFormulario);
el.form.addEventListener("submit", enviarFormulario);
[el.altura, el.peso].forEach(i => i.addEventListener("input", atualizarPrevia));
el.busca.addEventListener("input", desenhar);
el.ordem.addEventListener("change", desenhar);

// Fechar ao clicar fora da janela
el.dialogo.addEventListener("click", e => {
    if (e.target === el.dialogo) fecharFormulario();
});

pessoas = ler();
desenhar();