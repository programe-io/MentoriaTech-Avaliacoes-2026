
let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

document.getElementById("data").textContent =
    new Date().toLocaleDateString("pt-BR", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

function salvarDados() {
    localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function atualizarPainel() {
    document.getElementById("total").textContent = pacientes.length;
    document.getElementById("consultas").textContent = pacientes.length;
    document.getElementById("fichas").textContent = pacientes.length;
}

document.getElementById("formulario").addEventListener("submit", function(e) {
    e.preventDefault();

    const paciente = {
        id: Date.now(),
        nome: valor("nome"),
        cpf: valor("cpf"),
        nascimento: valor("nascimento"),
        sexo: valor("sexo"),
        telefone: valor("telefone"),
        email: valor("email"),
        sangue: valor("sangue"),
        alergias: valor("alergias"),
        medicamentos: valor("medicamentos"),
        emergencia: valor("emergencia"),
        medico: valor("medico"),
        especialidade: valor("especialidade"),
        pressao: valor("pressao"),
        temperatura: valor("temperatura"),
        sintomas: valor("sintomas"),
        historico: valor("historico"),
        diagnostico: valor("diagnostico"),
        prescricao: valor("prescricao"),
        dataCadastro: new Date().toLocaleDateString("pt-BR")
    };

    pacientes.push(paciente);

    salvarDados();
    atualizarPainel();
    mostrarPacientes();

    alert("Ficha médica cadastrada com sucesso!");

    this.reset();
});

function valor(id) {
    return document.getElementById(id).value.trim();
}

function textoSeguro(texto) {
    return String(texto || "Não informado").replace(/[&<>"']/g, c => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[c]);
}

function mostrarPacientes() {
    const busca = document.getElementById("pesquisa").value.toLowerCase();

    const filtrados = pacientes.filter(p =>
        p.nome.toLowerCase().includes(busca) ||
        p.cpf.toLowerCase().includes(busca)
    );

    const lista = document.getElementById("lista");

    if (!filtrados.length) {
        lista.innerHTML = "<p>Nenhum paciente encontrado.</p>";
        return;
    }

    lista.innerHTML = filtrados.map(p => `
        <div class="registro">
            <div>
                <strong>${textoSeguro(p.nome)}</strong>
                <p>${textoSeguro(p.especialidade)} • ${p.dataCadastro}</p>
            </div>
            <button onclick="verFicha(${p.id})">Ver ficha</button>
        </div>
    `).join("");
}

function verFicha(id) {
    const p = pacientes.find(p => p.id === id);
    if (!p) return;

    document.getElementById("documento").innerHTML = `
        <h1>✚ MediCare Pro</h1>
        <p>FICHA DE REGISTRO MÉDICO</p>
        <hr>

        <h3>Informações pessoais</h3>
        <p><strong>Nome:</strong> ${textoSeguro(p.nome)}</p>
        <p><strong>CPF:</strong> ${textoSeguro(p.cpf)}</p>
        <p><strong>Nascimento:</strong> ${textoSeguro(p.nascimento)}</p>
        <p><strong>Sexo:</strong> ${textoSeguro(p.sexo)}</p>
        <p><strong>Telefone:</strong> ${textoSeguro(p.telefone)}</p>
        <p><strong>E-mail:</strong> ${textoSeguro(p.email)}</p>

        <h3>Informações clínicas</h3>
        <p><strong>Tipo sanguíneo:</strong> ${textoSeguro(p.sangue)}</p>
        <p><strong>Alergias:</strong> ${textoSeguro(p.alergias)}</p>
        <p><strong>Medicamentos:</strong> ${textoSeguro(p.medicamentos)}</p>
        <p><strong>Emergência:</strong> ${textoSeguro(p.emergencia)}</p>

        <h3>Atendimento</h3>
        <p><strong>Médico:</strong> ${textoSeguro(p.medico)}</p>
        <p><strong>Especialidade:</strong> ${textoSeguro(p.especialidade)}</p>
        <p><strong>Pressão:</strong> ${textoSeguro(p.pressao)}</p>
        <p><strong>Temperatura:</strong> ${textoSeguro(p.temperatura)}</p>

        <h3>Relatório clínico</h3>
        <p><strong>Sintomas:</strong> ${textoSeguro(p.sintomas)}</p>
        <p><strong>Histórico:</strong> ${textoSeguro(p.historico)}</p>
        <p><strong>Diagnóstico:</strong> ${textoSeguro(p.diagnostico)}</p>
        <p><strong>Prescrição:</strong> ${textoSeguro(p.prescricao)}</p>

        <hr>
        <p>Data de cadastro: ${textoSeguro(p.dataCadastro)}</p>
        <p>Registro demonstrativo — requer validação do profissional responsável.</p>
    `;

    document.getElementById("visualizacao").classList.add("ativo");
}

function fecharFicha() {
    document.getElementById("visualizacao").classList.remove("ativo");
}

function mostrarFicha() {
    document.getElementById("formulario").scrollIntoView({
        behavior: "smooth"
    });
}

function mostrarHistorico() {
    document.querySelector(".pacientes").scrollIntoView({
        behavior: "smooth"
    });
}

atualizarPainel();
mostrarPacientes();
