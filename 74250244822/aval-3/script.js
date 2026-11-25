function iniciar() {
window.addEventListener("error", (ev) => { const a = document.getElementById("aviso"); if (a) { a.textContent = "Erro: " + ev.message; a.classList.add("mostra"); } });
const CHAVE = "fichasMedicas";
const campos = ["nome", "nascimento", "sexo", "cpf", "telefone", "sangue", "peso", "altura",
  "alergias", "medicamentos", "doencas", "obs", "emergNome", "emergTel"];

const $ = (id) => document.getElementById(id);
let selecionada = null;

/* ---------- Armazenamento ---------- */
let memoria = [];       // usado se o navegador bloquear o localStorage
let avisouMemoria = false;
function carregar() {
  try { return JSON.parse(localStorage.getItem(CHAVE)) || []; }
  catch { return memoria; }
}
function gravar(fichas) {
  memoria = fichas;
  try { localStorage.setItem(CHAVE, JSON.stringify(fichas)); }
  catch {
    if (!avisouMemoria) {
      avisouMemoria = true;
      setTimeout(() => aviso("Este ambiente bloqueia o salvamento permanente: as fichas valem só até recarregar a página."), 2400);
    }
  }
}

/* ---------- Utilidades ---------- */
function esc(texto) {
  const d = document.createElement("div");
  d.textContent = texto ?? "";
  return d.innerHTML;
}
function aviso(msg) {
  const el = $("aviso");
  el.textContent = msg;
  el.classList.add("mostra");
  setTimeout(() => el.classList.remove("mostra"), 2200);
}
function idade(nasc) {
  if (!nasc) return "";
  const hoje = new Date(), n = new Date(nasc + "T00:00:00");
  let a = hoje.getFullYear() - n.getFullYear();
  const m = hoje.getMonth() - n.getMonth();
  if (m < 0 || (m === 0 && hoje.getDate() < n.getDate())) a--;
  return a;
}
function dataBR(nasc) {
  if (!nasc) return "";
  const [a, m, d] = nasc.split("-");
  return `${d}/${m}/${a}`;
}
function imc(peso, altura) {
  if (!peso || !altura) return "";
  const v = peso / Math.pow(altura / 100, 2);
  let faixa = "obesidade";
  if (v < 18.5) faixa = "abaixo do peso";
  else if (v < 25) faixa = "peso normal";
  else if (v < 30) faixa = "sobrepeso";
  return `${v.toFixed(1)} (${faixa})`;
}
function soNumeros(t) { return (t || "").replace(/\D/g, ""); }
function validaCPF(cpf) {
  const c = soNumeros(cpf);
  if (c.length !== 11 || /^(\d)\1+$/.test(c)) return false;
  for (let t = 9; t < 11; t++) {
    let soma = 0;
    for (let i = 0; i < t; i++) soma += c[i] * (t + 1 - i);
    const dv = ((soma * 10) % 11) % 10;
    if (dv !== Number(c[t])) return false;
  }
  return true;
}

/* ---------- Abas ---------- */
function abrirAba(nome) {
  document.querySelectorAll(".aba").forEach((b) => b.classList.toggle("ativa", b.dataset.aba === nome));
  document.querySelectorAll(".painel").forEach((p) => p.classList.toggle("ativo", p.id === nome));
  if (nome === "consultar") listar();
}
document.querySelectorAll(".aba").forEach((b) => b.addEventListener("click", () => abrirAba(b.dataset.aba)));

/* ---------- Máscara de CPF ---------- */
$("cpf").addEventListener("input", (e) => {
  const n = soNumeros(e.target.value).slice(0, 11);
  e.target.value = n
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2");
});

/* ---------- Formulário ---------- */
function limparForm() {
  campos.forEach((c) => ($(c).value = ""));
  $("id").value = "";
  $("tituloForm").textContent = "Nova ficha";
  $("btnSalvar").textContent = "Salvar ficha";
}

$("btnCancelar").addEventListener("click", limparForm);

function salvar() {
  const obrigatorios = [["nome", "o nome"], ["nascimento", "a data de nascimento"], ["sexo", "o sexo"], ["cpf", "o CPF"]];
  for (const [campo, rotulo] of obrigatorios) {
    if (!$(campo).value.trim()) {
      aviso("Preencha " + rotulo + ".");
      $(campo).focus();
      return;
    }
  }
  if (soNumeros($("cpf").value).length !== 11) {
    aviso("O CPF precisa ter 11 números.");
    $("cpf").focus();
    return;
  }

  const fichas = carregar();
  const id = $("id").value;
  const ficha = { id: id || String(Date.now()) };
  campos.forEach((c) => (ficha[c] = $(c).value.trim()));

  const duplicado = fichas.some((f) => soNumeros(f.cpf) === soNumeros(ficha.cpf) && f.id !== ficha.id);
  if (duplicado) {
    aviso("Já existe uma ficha com esse CPF.");
    return;
  }

  if (id) {
    const i = fichas.findIndex((f) => f.id === id);
    fichas[i] = ficha;
  } else {
    ficha.criadoEm = new Date().toISOString();
    fichas.push(ficha);
  }

  gravar(fichas);
  limparForm();
  atualizarContador();
  selecionada = ficha.id;
  aviso(id ? "Ficha atualizada." : "Ficha salva.");
  abrirAba("consultar");
}
$("btnSalvar").addEventListener("click", salvar);

function editar(id) {
  const f = carregar().find((x) => x.id === id);
  if (!f) return;
  campos.forEach((c) => ($(c).value = f[c] || ""));
  $("id").value = f.id;
  $("tituloForm").textContent = "Editar ficha";
  $("btnSalvar").textContent = "Salvar alterações";
  abrirAba("nova");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

let confirmando = false;
function excluir(id, botao) {
  const f = carregar().find((x) => x.id === id);
  if (!f) return;
  if (!confirmando) {
    confirmando = true;
    botao.textContent = "Clique de novo para confirmar";
    setTimeout(() => { confirmando = false; if (botao.isConnected) botao.textContent = "Excluir"; }, 3500);
    return;
  }
  confirmando = false;
  gravar(carregar().filter((x) => x.id !== id));
  selecionada = null;
  atualizarContador();
  listar();
  aviso("Ficha excluída.");
}

/* ---------- Consulta ---------- */
function atualizarContador() {
  $("contador").textContent = carregar().length;
}

function listar() {
  const termo = $("busca").value.trim().toLowerCase();
  const n = soNumeros(termo);
  const fichas = carregar()
    .filter((f) => f.nome.toLowerCase().includes(termo) || (n && soNumeros(f.cpf).includes(n)))
    .sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"));

  const ul = $("lista");
  if (!fichas.length) {
    ul.innerHTML = `<li class="vazio">${termo ? "Nenhuma ficha encontrada." : "Nenhuma ficha cadastrada ainda."}</li>`;
  } else {
    ul.innerHTML = fichas.map((f) => `
      <li><button type="button" data-id="${esc(f.id)}" class="${f.id === selecionada ? "sel" : ""}">
        <strong>${esc(f.nome)}</strong>
        <small>${esc(f.cpf)} · ${idade(f.nascimento)} anos</small>
      </button></li>`).join("");
  }

  if (selecionada && fichas.some((f) => f.id === selecionada)) mostrar(selecionada);
  else {
    selecionada = null;
    $("detalhe").innerHTML = '<p class="vazio">Selecione uma ficha para ver os detalhes.</p>';
  }
}

function mostrar(id) {
  const f = carregar().find((x) => x.id === id);
  if (!f) return;
  selecionada = id;
  document.querySelectorAll(".lista button").forEach((b) => b.classList.toggle("sel", b.dataset.id === id));

  const bloco = (titulo, valor) => valor ? `<div class="bloco"><span>${titulo}</span>${esc(valor)}</div>` : "";
  const dado = (titulo, valor) => valor ? `<div><span>${titulo}</span>${esc(String(valor))}</div>` : "";

  $("detalhe").innerHTML = `
    <h3>${esc(f.nome)}</h3>
    <p class="sub">${idade(f.nascimento)} anos · ${esc(f.sexo)}</p>
    ${f.alergias ? `<div class="alergia">Alergias: ${esc(f.alergias)}</div>` : ""}
    <div class="dados">
      ${dado("Nascimento", dataBR(f.nascimento))}
      ${dado("CPF", f.cpf)}
      ${dado("Telefone", f.telefone)}
      ${dado("Tipo sanguíneo", f.sangue)}
      ${dado("Peso", f.peso && f.peso + " kg")}
      ${dado("Altura", f.altura && f.altura + " cm")}
      ${dado("IMC", imc(f.peso, f.altura))}
    </div>
    ${bloco("Medicamentos em uso", f.medicamentos)}
    ${bloco("Doenças crônicas", f.doencas)}
    ${bloco("Histórico e observações", f.obs)}
    ${bloco("Contato de emergência", [f.emergNome, f.emergTel].filter(Boolean).join(" · "))}
    <div class="acoes">
      <button class="btn primario" data-acao="editar">Editar</button>
      <button class="btn" data-acao="imprimir">Imprimir</button>
      <button class="btn perigo" data-acao="excluir">Excluir</button>
    </div>`;
}

$("lista").addEventListener("click", (e) => {
  const b = e.target.closest("button[data-id]");
  if (b) mostrar(b.dataset.id);
});

$("detalhe").addEventListener("click", (e) => {
  const acao = e.target.dataset.acao;
  if (acao === "editar") editar(selecionada);
  if (acao === "excluir") excluir(selecionada, e.target);
  if (acao === "imprimir") { try { window.print(); } catch { aviso("A impressão está bloqueada neste ambiente."); } }
});

$("busca").addEventListener("input", listar);

atualizarContador();

}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", iniciar);
else iniciar();