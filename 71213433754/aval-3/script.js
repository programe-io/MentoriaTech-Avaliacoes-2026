
document.body.innerHTML = "";

const style = document.createElement("style");

style.textContent = `
* {
    box-sizing: border-box;
    font-family: Arial, sans-serif;
}

body {
    background: #f1f5f9;
    margin: 0;
    padding: 25px 12px;
    color: #1e293b;
}

.container {
    max-width: 900px;
    margin: auto;
    background: white;
    padding: 25px;
    border-radius: 12px;
    box-shadow: 0 4px 15px #0001;
}

h1 {
    text-align: center;
    color: #0f766e;
}

h2 {
    font-size: 18px;
    color: #0f766e;
    border-bottom: 1px solid #cbd5e1;
    padding-bottom: 8px;
    margin-top: 28px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.campo {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.campo.completo {
    grid-column: 1 / -1;
}

label {
    font-size: 14px;
    font-weight: bold;
}

input, select, textarea {
    width: 100%;
    padding: 11px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    font-size: 14px;
}

textarea {
    min-height: 85px;
    resize: vertical;
}

.botoes {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 25px;
}

button {
    border: none;
    padding: 12px 17px;
    border-radius: 6px;
    cursor: pointer;
    color: white;
}

.salvar { background: #0f766e; }
.limpar { background: #64748b; }
.imprimir { background: #2563eb; }
.excluir { background: #dc2626; }

.card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    padding: 15px;
    margin-top: 12px;
}

.card button {
    margin-top: 10px;
}

@media(max-width: 600px) {
    .grid {
        grid-template-columns: 1fr;
    }

    .campo.completo {
        grid-column: auto;
    }
}

@media print {
    body { background: white; padding: 0; }
    .container { box-shadow: none; }
    .botoes, #cadastros { display: none; }
}
`;

document.head.appendChild(style);

const app = document.createElement("div");
app.className = "container";

app.innerHTML = `
<h1>📋 Ficha de Anamnese</h1>
<p style="text-align:center;color:#64748b">
    Cadastro e histórico de saúde do paciente
</p>

<form id="formulario">

<h2>1. Dados pessoais</h2>

<div class="grid">
    <div class="campo completo">
        <label>Nome completo *</label>
        <input name="nome" required>
    </div>

    <div class="campo">
        <label>Data de nascimento</label>
        <input type="date" name="nascimento">
    </div>

    <div class="campo">
        <label>Sexo</label>
        <select name="sexo">
            <option value="">Selecione</option>
            <option>Feminino</option>
            <option>Masculino</option>
            <option>Outro</option>
            <option>Prefere não informar</option>
        </select>
    </div>

    <div class="campo">
        <label>Telefone</label>
        <input name="telefone" type="tel">
    </div>

    <div class="campo">
        <label>E-mail</label>
        <input name="email" type="email">
    </div>

    <div class="campo completo">
        <label>Endereço</label>
        <input name="endereco">
    </div>

    <div class="campo">
        <label>Profissão</label>
        <input name="profissao">
    </div>

    <div class="campo">
        <label>Estado civil</label>
        <select name="estadoCivil">
            <option value="">Selecione</option>
            <option>Solteiro(a)</option>
            <option>Casado(a)</option>
            <option>Divorciado(a)</option>
            <option>Viúvo(a)</option>
            <option>Outro</option>
        </select>
    </div>
</div>

<h2>2. Histórico de saúde</h2>

<div class="grid">
    <div class="campo">
        <label>Possui alguma doença?</label>
        <select name="doenca">
            <option>Não</option>
            <option>Sim</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo">
        <label>Possui alergias?</label>
        <select name="alergia">
            <option>Não</option>
            <option>Sim</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo completo">
        <label>Quais doenças ou condições?</label>
        <textarea name="doencasDetalhes"></textarea>
    </div>

    <div class="campo completo">
        <label>Quais alergias?</label>
        <textarea name="alergiasDetalhes"></textarea>
    </div>

    <div class="campo">
        <label>Faz uso de medicamentos?</label>
        <select name="medicamento">
            <option>Não</option>
            <option>Sim</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo">
        <label>Já realizou cirurgias?</label>
        <select name="cirurgia">
            <option>Não</option>
            <option>Sim</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo completo">
        <label>Medicamentos em uso</label>
        <textarea name="medicamentosDetalhes"></textarea>
    </div>

    <div class="campo completo">
        <label>Histórico de cirurgias e internações</label>
        <textarea name="cirurgiasDetalhes"></textarea>
    </div>
</div>

<h2>3. Histórico familiar</h2>

<div class="grid">
    <div class="campo completo">
        <label>Doenças na família</label>
        <textarea name="historicoFamiliar"
        placeholder="Ex.: diabetes, hipertensão, doenças cardíacas..."></textarea>
    </div>
</div>

<h2>4. Hábitos de vida</h2>

<div class="grid">
    <div class="campo">
        <label>Pratica atividade física?</label>
        <select name="atividade">
            <option>Não</option>
            <option>Sim, regularmente</option>
            <option>Às vezes</option>
        </select>
    </div>

    <div class="campo">
        <label>Fuma?</label>
        <select name="fumante">
            <option>Não</option>
            <option>Sim</option>
            <option>Ex-fumante</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo">
        <label>Consome bebidas alcoólicas?</label>
        <select name="alcool">
            <option>Não</option>
            <option>Sim</option>
            <option>Socialmente</option>
            <option>Não informado</option>
        </select>
    </div>

    <div class="campo">
        <label>Qualidade do sono</label>
        <select name="sono">
            <option>Boa</option>
            <option>Regular</option>
            <option>Ruim</option>
            <option>Não informado</option>
        </select>
    </div>
</div>

<h2>5. Queixa principal e sintomas</h2>

<div class="grid">
    <div class="campo completo">
        <label>Queixa principal</label>
        <textarea name="queixa"
        placeholder="Descreva o motivo da consulta..."></textarea>
    </div>

    <div class="campo completo">
        <label>Sintomas apresentados</label>
        <textarea name="sintomas"></textarea>
    </div>

    <div class="campo completo">
        <label>Observações adicionais</label>
        <textarea name="observacoes"></textarea>
    </div>
</div>

<h2>6. Responsável pelo atendimento</h2>

<div class="grid">
    <div class="campo">
        <label>Nome do profissional</label>
        <input name="profissional">
    </div>

    <div class="campo">
        <label>Registro profissional</label>
        <input name="registro">
    </div>

    <div class="campo">
        <label>Data do atendimento</label>
        <input type="date" name="dataAtendimento">
    </div>
</div>

<div class="botoes">
    <button class="salvar" type="submit">
        Salvar ficha
    </button>

    <button class="limpar" type="reset">
        Limpar formulário
    </button>

    <button class="imprimir" type="button" id="imprimir">
        Imprimir ficha
    </button>
</div>

</form>

<h2>📁 Pacientes cadastrados</h2>
<div id="cadastros"></div>
`;

document.body.appendChild(app);

// Banco de dados local
let fichas = JSON.parse(
    localStorage.getItem("fichasAnamnese") || "[]"
);

const formulario = document.getElementById("formulario");

// Salvar ficha
formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const dados = Object.fromEntries(
        new FormData(formulario).entries()
    );

    dados.id = Date.now();
    dados.criadoEm = new Date().toLocaleDateString("pt-BR");

    fichas.push(dados);

    localStorage.setItem(
        "fichasAnamnese",
        JSON.stringify(fichas)
    );

    alert("Ficha cadastrada com sucesso!");

    formulario.reset();
    mostrarFichas();
});

// Listar fichas
function mostrarFichas() {
    const area = document.getElementById("cadastros");

    area.innerHTML = "";

    if (fichas.length === 0) {
        area.textContent = "Nenhum paciente cadastrado.";
        return;
    }

    fichas.forEach(ficha => {
        const card = document.createElement("div");
        card.className = "card";

        const nome = document.createElement("strong");
        nome.textContent = ficha.nome;

        const data = document.createElement("p");
        data.textContent =
            "Cadastro: " + ficha.criadoEm;

        const excluir = document.createElement("button");
        excluir.className = "excluir";
        excluir.textContent = "Excluir";

        excluir.addEventListener("click", () => {
            if (confirm("Deseja excluir esta ficha?")) {
                fichas = fichas.filter(
                    item => item.id !== ficha.id
                );

                localStorage.setItem(
                    "fichasAnamnese",
                    JSON.stringify(fichas)
                );

                mostrarFichas();
            }
        });

        card.append(nome, data, excluir);
        area.appendChild(card);
    });
}

// Imprimir ficha
document.getElementById("imprimir")
    .addEventListener("click", () => {
        window.print();
    });

// Inicializar
mostrarFichas();
