const CHAVE_STORAGE = "ficha_anamnese_parte2_v1";

let fichas = JSON.parse(localStorage.getItem(CHAVE_STORAGE)) || [
  {
    id: crypto.randomUUID(),
    paciente: "Ana Beatriz Costa",
    queixa: "Acompanhamento nutricional e rotina de treinos",
    medicamentos: "Nenhum",
    alergias: "Camarão",
    habitos: ["Atividade física regular"],
    observacoes: "Paciente relata boa qualidade de sono e busca ganho de massa magra.",
    consentimento: true,
    criadoEm: new Date().toLocaleDateString("pt-BR")
  }
];

const form = document.getElementById("form-anamnese-p2");
const listaFichas = document.getElementById("lista-fichas");
const buscaInput = document.getElementById("busca");
const btnLimpar = document.getElementById("btn-limpar");
const btnImprimir = document.getElementById("btn-imprimir");

const elTotalFichas = document.getElementById("total-fichas");
const elTotalAlergias = document.getElementById("total-alergias");
const elTotalMedicamentos = document.getElementById("total-medicamentos");

function salvar() {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(fichas));
}

function possuiInformacaoAtiva(texto) {
  if (!texto) return false;
  const limpo = texto.trim().toLowerCase();
  return limpo !== "" && !["nenhum", "nenhuma", "nao", "não", "sem", "-"].includes(limpo);
}

function atualizarKPIs() {
  elTotalFichas.textContent = fichas.length;
  elTotalAlergias.textContent = fichas.filter((f) => possuiInformacaoAtiva(f.alergias)).length;
  elTotalMedicamentos.textContent = fichas.filter((f) => possuiInformacaoAtiva(f.medicamentos)).length;
}

function renderizar() {
  const termo = buscaInput.value.trim().toLowerCase();
  const filtradas = fichas.filter(
    (f) =>
      f.paciente.toLowerCase().includes(termo) ||
      f.queixa.toLowerCase().includes(termo)
  );

  listaFichas.innerHTML = "";

  if (filtradas.length === 0) {
    listaFichas.innerHTML = `<p class="vazio">Nenhuma ficha encontrada.</p>`;
    atualizarKPIs();
    return;
  }

  filtradas.forEach((ficha) => {
    const tagsHtml = ficha.habitos.length
      ? ficha.habitos
          .map((h) => {
            const alerta = h.includes("Tabagismo") || h.includes("álcool") ? "alerta" : "";
            return `<span class="tag ${alerta}">${h}</span>`;
          })
          .join("")
      : `<span class="ficha-data">Sem hábitos marcados</span>`;

    const card = document.createElement("article");
    card.className = "card-ficha";
    card.innerHTML = `
      <div class="ficha-topo">
        <div>
          <h3>${ficha.paciente}</h3>
          <span class="ficha-data">Registrada em ${ficha.criadoEm}</span>
        </div>
        <button type="button" class="btn btn-excluir" onclick="removerFicha('${ficha.id}')">Excluir</button>
      </div>
      <div class="ficha-detalhes">
        <p><strong>Queixa principal:</strong> ${ficha.queixa}</p>
        <p><strong>Medicamentos:</strong> ${ficha.medicamentos || "Não informado"}</p>
        <p><strong>Alergias:</strong> ${ficha.alergias || "Não informado"}</p>
        ${ficha.observacoes ? `<p><strong>Observações:</strong> ${ficha.observacoes}</p>` : ""}
      </div>
      <div class="tags-habitos">${tagsHtml}</div>
    `;
    listaFichas.appendChild(card);
  });

  atualizarKPIs();
}

function removerFicha(id) {
  fichas = fichas.filter((f) => f.id !== id);
  salvar();
  renderizar();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const paciente = document.getElementById("paciente").value.trim();
  const queixa = document.getElementById("queixa-principal").value.trim();
  const medicamentos = document.getElementById("medicamentos").value.trim();
  const alergias = document.getElementById("alergias").value.trim();
  const observacoes = document.getElementById("observacoes").value.trim();
  const consentimento = document.getElementById("consentimento").checked;

  if (!paciente || !queixa || !consentimento) return;

  const habitos = [];
  if (document.getElementById("hab-fumante").checked) habitos.push("Tabagismo / Fumante");
  if (document.getElementById("hab-etilismo").checked) habitos.push("Consumo de álcool");
  if (document.getElementById("hab-atividade").checked) habitos.push("Atividade física regular");
  if (document.getElementById("hab-cirurgia").checked) habitos.push("Cirurgias anteriores");

  fichas.unshift({
    id: crypto.randomUUID(),
    paciente,
    queixa,
    medicamentos,
    alergias,
    habitos,
    observacoes,
    consentimento,
    criadoEm: new Date().toLocaleDateString("pt-BR")
  });

  salvar();
  renderizar();
  form.reset();
  document.getElementById("paciente").focus();
});

btnLimpar.addEventListener("click", () => {
  form.reset();
  document.getElementById("paciente").focus();
});

btnImprimir.addEventListener("click", () => {
  window.print();
});

buscaInput.addEventListener("input", renderizar);

renderizar();