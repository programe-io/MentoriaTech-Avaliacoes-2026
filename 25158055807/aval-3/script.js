/* ===== CONFIGURAÇÃO ===== */
const CHAVE_STORAGE = "historico_pessoas_imc";
const $ = (id) => document.getElementById(id);

const el = {
    form: $("form-pessoa"), nome: $("input-nome"), idade: $("input-idade"),
    altura: $("input-altura"), peso: $("input-peso"),
    titulo: $("titulo-form"), salvar: $("btn-salvar"), cancelar: $("btn-cancelar"),
    erro: $("erro"), lista: $("lista"), busca: $("busca"),
    total: $("total-pessoas"), media: $("media-imc"), contador: $("contador"),
    previa: $("previa"), previaValor: $("previa-valor"), previaTexto: $("previa-texto"),
    toast: $("toast")
};

/* ===== ARMAZENAMENTO ===== */
function carregarPessoas() {
    try {
        const dados = JSON.parse(localStorage.getItem(CHAVE_STORAGE) || "[]");
        if (!Array.isArray(dados)) return [];
        return dados.filter(p => p && typeof p.id === "string" && typeof p.nome === "string" &&
            Number.isInteger(p.idade) && p.altura > 0 && p.peso > 0);
    } catch (e) {
        console.error("Erro ao carregar:", e);
        return [];
    }
}

function salvarStorage(lista) {
    try {
        localStorage.setItem(CHAVE_STORAGE, JSON.stringify(lista));
        return true;
    } catch (e) {
        console.error("Erro ao salvar:", e);
        avisar("Não foi possível salvar no navegador.");
        return false;
    }
}

let pessoas = carregarPessoas();
let idEmEdicao = null;

const gerarId = () => Date.now().toString() + Math.random().toString(36).slice(2, 7);

/* ===== REGRAS DO IMC ===== */
const calcularIMC = (peso, altura) => peso / (altura * altura);

function classificar(imc) {
    if (imc < 18.5) return { texto: "Abaixo do peso", faixa: "abaixo" };
    if (imc < 25)   return { texto: "Peso normal", faixa: "normal" };
    if (imc < 30)   return { texto: "Sobrepeso", faixa: "sobrepeso" };
    if (imc < 35)   return { texto: "Obesidade grau I", faixa: "obesidade" };
    if (imc < 40)   return { texto: "Obesidade grau II", faixa: "obesidade" };
    return { texto: "Obesidade grau III", faixa: "obesidade" };
}

const formatar = (v, casas) => Number(v).toLocaleString("pt-BR", {
    minimumFractionDigits: casas, maximumFractionDigits: casas
});

// Posição na régua: IMC 15 = 0%, IMC 40 = 100%
const posicaoRegua = (imc) => Math.min(100, Math.max(0, ((imc - 15) / 25) * 100));

/* ===== FORMULÁRIO ===== */
function lerFormulario() {
    return {
        nome: el.nome.value.trim(),
        idade: Number(el.idade.value),
        altura: Number(el.altura.value),
        peso: Number(el.peso.value)
    };
}

function validar(d) {
    if (!d.nome) return "Informe o nome do paciente.";
    if (!Number.isInteger(d.idade) || d.idade < 1 || d.idade > 126) return "Informe uma idade entre 1 e 126 anos.";
    if (!Number.isFinite(d.altura) || d.altura < 0.5 || d.altura > 2.5) return "Informe uma altura entre 0,50 m e 2,50 m.";
    if (!Number.isFinite(d.peso) || d.peso < 1 || d.peso > 500) return "Informe um peso entre 1 e 500 kg.";
    return "";
}

function atualizarPrevia() {
    const altura = Number(el.altura.value);
    const peso = Number(el.peso.value);

    if (altura >= 0.5 && altura <= 2.5 && peso >= 1 && peso <= 500) {
        const imc = calcularIMC(peso, altura);
        const c = classificar(imc);
        el.previa.dataset.faixa = c.faixa;
        el.previaValor.textContent = formatar(imc, 1);
        el.previaTexto.textContent = c.texto;
    } else {
        el.previa.dataset.faixa = "vazio";
        el.previaValor.textContent = "--";
        el.previaTexto.textContent = "Preencha altura e peso";
    }
}

function resetarFormulario() {
    idEmEdicao = null;
    el.form.reset();
    el.titulo.textContent = "Novo paciente";
    el.salvar.textContent = "Salvar paciente";
    el.cancelar.hidden = true;
    el.erro.hidden = true;
    atualizarPrevia();
}

/* ===== AÇÕES ===== */
function iniciarEdicao(id) {
    const p = pessoas.find(x => x.id === id);
    if (!p) return;

    idEmEdicao = id;
    el.nome.value = p.nome;
    el.idade.value = p.idade;
    el.altura.value = p.altura;
    el.peso.value = p.peso;
    el.titulo.textContent = "Editar paciente";
    el.salvar.textContent = "Salvar alterações";
    el.cancelar.hidden = false;
    el.erro.hidden = true;
    atualizarPrevia();
    el.nome.focus();
    window.scrollTo({ top: 0, behavior: "smooth" });
}

function excluir(id) {
    const p = pessoas.find(x => x.id === id);
    if (!p || !confirm(`Excluir ${p.nome} do histórico?`)) return;

    const nova = pessoas.filter(x => x.id !== id);
    if (!salvarStorage(nova)) return;

    pessoas = nova;
    if (idEmEdicao === id) resetarFormulario();
    render();
    avisar("Paciente excluído.");
}

/* ===== AVISO (TOAST) ===== */
let temporizador;
function avisar(msg) {
    el.toast.textContent = msg;
    el.toast.hidden = false;
    clearTimeout(temporizador);
    temporizador = setTimeout(() => { el.toast.hidden = true; }, 2600);
}

/* ===== RENDERIZAÇÃO ===== */
function criar(tag, classe, texto) {
    const e = document.createElement(tag);
    if (classe) e.className = classe;
    if (texto !== undefined) e.textContent = texto;
    return e;
}

function criarItem(p) {
    const imc = calcularIMC(p.peso, p.altura);
    const c = classificar(imc);

    const li = criar("li", "item");
    li.dataset.faixa = c.faixa;

    const info = criar("div");
    info.append(
        criar("p", "item-nome", p.nome),
        criar("p", "item-dados",
            `${p.idade} anos • ${formatar(p.altura, 2)} m • ${formatar(p.peso, 1)} kg`)
    );

    const valor = criar("div", "item-imc");
    valor.append(criar("strong", "", formatar(imc, 1)), criar("span", "", c.texto));

    const regua = criar("div", "regua");
    const marca = document.createElement("i");
    marca.style.left = posicaoRegua(imc) + "%";
    regua.appendChild(marca);

    const acoes = criar("div", "item-acoes");
    const bEditar = criar("button", "", "Editar");
    bEditar.type = "button";
    bEditar.dataset.acao = "editar";
    bEditar.dataset.id = p.id;
    const bExcluir = criar("button", "excluir", "Excluir");
    bExcluir.type = "button";
    bExcluir.dataset.acao = "excluir";
    bExcluir.dataset.id = p.id;
    acoes.append(bEditar, bExcluir);

    li.append(info, valor, regua, acoes);
    return li;
}

function atualizarResumo() {
    const n = pessoas.length;
    el.total.textContent = n;
    el.contador.textContent = n + (n === 1 ? " registro" : " registros");

    const soma = pessoas.reduce((s, p) => s + calcularIMC(p.peso, p.altura), 0);
    el.media.textContent = n ? formatar(soma / n, 1) : "0,0";
}

function render() {
    atualizarResumo();
    el.lista.innerHTML = "";

    const termo = el.busca.value.trim().toLowerCase();
    const visiveis = pessoas.filter(p => p.nome.toLowerCase().includes(termo));

    if (visiveis.length === 0) {
        const li = criar("li", "vazio",
            pessoas.length === 0
                ? "Nenhum paciente ainda. Preencha o formulário para cadastrar o primeiro."
                : "Nenhum paciente encontrado para essa busca.");
        el.lista.appendChild(li);
        return;
    }

    visiveis.forEach(p => el.lista.appendChild(criarItem(p)));
}

/* ===== EVENTOS ===== */
el.form.addEventListener("submit", (e) => {
    e.preventDefault();

    const dados = lerFormulario();
    const msg = validar(dados);

    if (msg) {
        el.erro.textContent = msg;
        el.erro.hidden = false;
        return;
    }
    el.erro.hidden = true;

    const editando = idEmEdicao !== null;
    const nova = editando
        ? pessoas.map(p => p.id === idEmEdicao ? { ...p, ...dados } : p)
        : [...pessoas, { id: gerarId(), ...dados }];

    if (!salvarStorage(nova)) return;

    pessoas = nova;
    resetarFormulario();
    render();
    avisar(editando ? "Dados atualizados." : "Paciente cadastrado.");
});

el.lista.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    if (b.dataset.acao === "editar") iniciarEdicao(b.dataset.id);
    if (b.dataset.acao === "excluir") excluir(b.dataset.id);
});

el.cancelar.addEventListener("click", resetarFormulario);
el.busca.addEventListener("input", render);
el.altura.addEventListener("input", atualizarPrevia);
el.peso.addEventListener("input", atualizarPrevia);

/* ===== INÍCIO ===== */
render();