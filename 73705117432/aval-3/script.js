
const formulario = document.getElementById("formPaciente");
const lista = document.getElementById("listaPacientes");
const pesquisa = document.getElementById("pesquisa");

let pacientes = JSON.parse(localStorage.getItem("pacientes")) || [];

function salvarDados() {
  localStorage.setItem("pacientes", JSON.stringify(pacientes));
}

function mostrarPacientes(filtro = "") {
  lista.innerHTML = "";

  const encontrados = pacientes.filter(p =>
    p.nome.toLowerCase().includes(filtro.toLowerCase())
  );

  encontrados.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card-paciente";

    const titulo = document.createElement("h3");
    titulo.textContent = p.nome;

    const campos = [
      `Idade: ${p.idade}`,
      `Sexo: ${p.sexo}`,
      `Tipo sanguíneo: ${p.sangue}`,
      `Telefone: ${p.telefone || "Não informado"}`,
      `Alergias: ${p.alergias || "Não informado"}`,
      `Sintomas: ${p.sintomas}`,
      `Histórico: ${p.historico || "Não informado"}`,
      `Diagnóstico: ${p.diagnostico || "Não informado"}`,
      `Prescrição: ${p.prescricao || "Não informado"}`
    ];

    card.appendChild(titulo);

    campos.forEach(texto => {
      const paragrafo = document.createElement("p");
      paragrafo.textContent = texto;
      card.appendChild(paragrafo);
    });

    const acoes = document.createElement("div");
    acoes.className = "acoes";

    const imprimir = document.createElement("button");
    imprimir.textContent = "Imprimir";
    imprimir.onclick = () => imprimirFicha(p);

    const excluir = document.createElement("button");
    excluir.textContent = "Excluir";
    excluir.className = "excluir";
    excluir.onclick = () => {
      if (confirm("Deseja excluir esta ficha?")) {
        pacientes.splice(pacientes.indexOf(p), 1);
        salvarDados();
        mostrarPacientes(pesquisa.value);
      }
    };

    acoes.append(imprimir, excluir);
    card.appendChild(acoes);
    lista.appendChild(card);
  });

  if (encontrados.length === 0) {
    lista.textContent = "Nenhum paciente encontrado.";
  }
}

formulario.addEventListener("submit", function(event) {
  event.preventDefault();

  const paciente = {
    nome: document.getElementById("nome").value.trim(),
    idade: document.getElementById("idade").value,
    sexo: document.getElementById("sexo").value,
    sangue: document.getElementById("sangue").value,
    telefone: document.getElementById("telefone").value,
    alergias: document.getElementById("alergias").value,
    sintomas: document.getElementById("sintomas").value,
    historico: document.getElementById("historico").value,
    diagnostico: document.getElementById("diagnostico").value,
    prescricao: document.getElementById("prescricao").value
  };

  pacientes.push(paciente);
  salvarDados();
  formulario.reset();
  mostrarPacientes();

  alert("Ficha cadastrada com sucesso!");
});

pesquisa.addEventListener("input", () => {
  mostrarPacientes(pesquisa.value);
});

function imprimirFicha(p) {
  const janela = window.open("", "_blank");

  janela.document.write(`
    <html>
    <head>
      <title>Ficha Médica</title>
      <style>
        body { font-family: Arial; padding: 30px; }
        h1 { color: #9b7920; }
        p { margin: 12px 0; }
      </style>
    </head>
    <body>
      <h1>MediCare Pro - Ficha Médica</h1>
      <h2>${escapar(p.nome)}</h2>
      ${Object.entries(p).map(([chave, valor]) =>
        `<p><strong>${escapar(chave)}:</strong> ${escapar(valor)}</p>`
      ).join("")}
    </body>
    </html>
  `);

  janela.document.close();
  janela.print();
}

function escapar(valor) {
  return String(valor).replace(/[&<>"']/g, caractere => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[caractere]);
}

mostrarPacientes();
