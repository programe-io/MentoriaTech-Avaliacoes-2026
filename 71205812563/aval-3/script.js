
// =====================================
// SISTEMA DE FICHA DE ANAMNESE
// 100% JAVASCRIPT
// =====================================

document.body.innerHTML = "";

const style = document.createElement("style");

style.textContent = `
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
}

body {
  margin: 0;
  padding: 25px 15px;
  background: #eef2f7;
  color: #334155;
}

.container {
  max-width: 950px;
  margin: auto;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 5px 20px #0001;
}

header {
  text-align: center;
  border-bottom: 3px solid #0d9488;
  padding-bottom: 20px;
}

header h1 {
  color: #0f766e;
}

h2 {
  color: #0f766e;
  font-size: 18px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 10px;
  margin-top: 30px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.full {
  grid-column: 1 / -1;
}

label {
  font-weight: bold;
  font-size: 14px;
}

input, textarea, select {
  padding: 12px;
  border: 1px solid #cbd5e1;
  border-radius: 7px;
  width: 100%;
  outline: none;
}

textarea {
  min-height: 85px;
  resize: vertical;
}

input:focus, textarea:focus, select:focus {
  border-color: #0d9488;
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 25px;
}

button {
  padding: 12px 18px;
  border: none;
  border-radius: 7px;
  cursor: pointer;
  font-weight: bold;
}

.save { background: #0d9488; color: white; }
.print { background: #2563eb; color: white; }
.clear { background: #e2e8f0; }

.paciente {
  background: #f1f5f9;
  padding: 12px;
  margin: 10px 0;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

#mensagem {
  color: #0f766e;
  font-weight: bold;
  margin-top: 15px;
}

@media(max-width: 600px) {
  .grid { grid-template-columns: 1fr; }
  .full { grid-column: auto; }
  .container { padding: 18px; }
}

@media print {
  body { background: white; padding: 0; }
  .container { box-shadow: none; }
  .actions, #lista, #mensagem { display: none; }
}
`;

document.head.appendChild(style);

// =====================================
// CRIAR ESTRUTURA
// =====================================

const container = document.createElement("main");
container.className = "container";

document.body.appendChild(container);

container.innerHTML = `
<header>
  <h1>📋 Ficha de Anamnese</h1>
  <p>Cadastro e avaliação do paciente</p>
</header>

<form id="form">

<h2>1. Dados pessoais</h2>

<div class="grid">

  <div class="field">
    <label>Nome completo *</label>
    <input name="nome" required>
  </div>

  <div class="field">
    <label>Data de nascimento</label>
    <input type="date" name="nascimento">
  </div>

  <div class="field">
    <label>CPF</label>
    <input name="cpf">
  </div>

  <div class="field">
    <label>Telefone</label>
    <input type="tel" name="telefone">
  </div>

  <div class="field">
    <label>E-mail</label>
    <input type="email" name="email">
  </div>

  <div class="field">
    <label>Profissão</label>
    <input name="profissao">
  </div>

  <div class="field full">
    <label>Endereço</label>
    <input name="endereco">
  </div>

</div>

<h2>2. Histórico médico</h2>

<div class="grid">

  <div class="field full">
    <label>Possui doenças?</label>
    <textarea name="doencas"></textarea>
  </div>

  <div class="field full">
    <label>Possui alergias?</label>
    <textarea name="alergias"></textarea>
  </div>

  <div class="field full">
    <label>Utiliza medicamentos?</label>
    <textarea name="medicamentos"></textarea>
  </div>

  <div class="field full">
    <label>Já realizou cirurgias?</label>
    <textarea name="cirurgias"></textarea>
  </div>

  <div class="field full">
    <label>Histórico familiar</label>
    <textarea name="historico"></textarea>
  </div>

</div>

<h2>3. Hábitos de vida</h2>

<div class="grid">

  <div class="field">
    <label>Atividade física</label>
    <select name="atividade">
      <option value="">Selecione</option>
      <option>Sim</option>
      <option>Não</option>
      <option>Ocasionalmente</option>
    </select>
  </div>

  <div class="field">
    <label>Tabagismo</label>
    <select name="fumante">
      <option value="">Selecione</option>
      <option>Sim</option>
      <option>Não</option>
      <option>Ex-fumante</option>
    </select>
  </div>

  <div class="field">
    <label>Consome álcool?</label>
    <select name="alcool">
      <option value="">Selecione</option>
      <option>Sim</option>
      <option>Não</option>
      <option>Ocasionalmente</option>
    </select>
  </div>

  <div class="field">
    <label>Qualidade do sono</label>
    <select name="sono">
      <option value="">Selecione</option>
      <option>Boa</option>
      <option>Regular</option>
      <option>Ruim</option>
    </select>
  </div>

</div>

<h2>4. Avaliação complementar</h2>

<div class="grid">

  <div class="field">
    <label>Peso (kg)</label>
    <input type="number" name="peso" step="0.1">
  </div>

  <div class="field">
    <label>Altura (cm)</label>
    <input type="number" name="altura" step="0.1">
  </div>

  <div class="field full">
    <label>Queixa principal</label>
    <textarea name="queixa"></textarea>
  </div>

  <div class="field full">
    <label>Observações profissionais</label>
    <textarea name="observacoes"></textarea>
  </div>

</div>

<h2>5. Responsável pelo atendimento</h2>

<div class="grid">

  <div class="field">
    <label>Nome do profissional</label>
    <input name="profissional">
  </div>

  <div class="field">
    <label>Data do atendimento</label>
    <input type="date" name="data">
  </div>

</div>

<div class="field" style="margin-top:20px">
  <label>
    <input type="checkbox" name="declaracao" required
      style="width:auto">
    Confirmo que as informações fornecidas são verdadeiras.
  </label>
</div>

<div class="actions">
  <button class="save" type="submit">💾 Salvar ficha</button>
  <button class="print" type="button" id="imprimir">🖨 Imprimir</button>
  <button class="clear" type="reset">Limpar</button>
</div>

<p id="mensagem"></p>

</form>

<h2>📁 Pacientes cadastrados</h2>
<div id="lista"></div>
`;

// =====================================
// ELEMENTOS
// =====================================

const form = document.querySelector("#form");
const lista = document.querySelector("#lista");
const mensagem = document.querySelector("#mensagem");

let pacientes = JSON.parse(
  localStorage.getItem("anamnese") || "[]"
);

// =====================================
// SALVAR
// =====================================

function salvarDados() {
  localStorage.setItem(
    "anamnese",
    JSON.stringify(pacientes)
  );
}

// =====================================
// CADASTRAR PACIENTE
// =====================================

form.addEventListener("submit", function(event) {

  event.preventDefault();

  const dados = Object.fromEntries(
    new FormData(form).entries()
  );

  dados.id = crypto.randomUUID();

  pacientes.push(dados);

  salvarDados();
  renderizar();

  mensagem.textContent =
    "Ficha cadastrada com sucesso!";

  form.reset();

});

// =====================================
// LISTAR PACIENTES
// =====================================

function renderizar() {

  lista.innerHTML = "";

  pacientes.forEach((paciente) => {

    const div = document.createElement("div");
    div.className = "paciente";

    const nome = document.createElement("strong");
    nome.textContent = paciente.nome;

    const botoes = document.createElement("div");

    const visualizar = document.createElement("button");
    visualizar.textContent = "Visualizar";
    visualizar.style.background = "#bfdbfe";

    visualizar.onclick = () => visualizarFicha(paciente.id);

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.style.background = "#fecaca";

    excluir.onclick = () => excluirFicha(paciente.id);

    botoes.append(visualizar, excluir);
    div.append(nome, botoes);

    lista.appendChild(div);

  });

}

// =====================================
// VISUALIZAR FICHA
// =====================================

function visualizarFicha(id) {

  const paciente = pacientes.find(p => p.id === id);

  const janela = window.open("", "_blank");

  if (!janela) {
    alert("Permita a abertura de janelas pop-up.");
    return;
  }

  const conteudo = Object.entries(paciente)
    .filter(([chave]) => chave !== "id")
    .map(([chave, valor]) => `
      <p>
        <strong>${chave.toUpperCase()}:</strong>
        ${valor || "Não informado"}
      </p>
    `).join("");

  const titulo = document.createElement("h1");
  titulo.textContent = "Ficha de Anamnese";

  const dados = document.createElement("div");
  dados.innerHTML = conteudo;

  janela.document.body.style.fontFamily = "Arial";
  janela.document.body.style.padding = "25px";
  janela.document.body.append(titulo, dados);

}

// =====================================
// EXCLUIR FICHA
// =====================================

function excluirFicha(id) {

  if (!confirm("Deseja excluir esta ficha?")) return;

  pacientes = pacientes.filter(p => p.id !== id);

  salvarDados();
  renderizar();

}

// =====================================
// IMPRIMIR
// =====================================

document.querySelector("#imprimir").onclick = () => {
  window.print();
};

// =====================================
// INICIALIZAR
// =====================================

renderizar();
