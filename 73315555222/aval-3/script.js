// ==========================================
//  TABELA DE IMC
//  Cada pessoa: { nome, peso, altura }
// ==========================================

let pessoas = [];

// ---------- ELEMENTOS ----------
const form         = document.getElementById("form-pessoa");
const campoNome    = document.getElementById("nome");
const campoPeso    = document.getElementById("peso");
const campoAltura  = document.getElementById("altura");
const corpoTabela  = document.getElementById("corpo-tabela");
const mensagem     = document.getElementById("mensagem");

// ---------- AUXILIARES ----------
function mostrarMensagem(texto, tipo = "sucesso") {
  mensagem.textContent = texto;
  mensagem.className = "mensagem " + tipo;
  setTimeout(() => {
    mensagem.textContent = "";
    mensagem.className = "mensagem";
  }, 3000);
}

// Calcula o IMC: peso / (altura * altura)
function calcularIMC(peso, altura) {
  return peso / (altura * altura);
}

// Classifica o IMC e retorna { texto, classe }
function classificarIMC(imc) {
  if (imc < 18.5) return { texto: "Abaixo do peso",      classe: "abaixo"    };
  if (imc < 25.0) return { texto: "Normal",              classe: "normal"    };
  if (imc < 30.0) return { texto: "Sobrepeso",           classe: "sobrepeso" };
  if (imc < 35.0) return { texto: "Obesidade Grau I",    classe: "obeso1"    };
  if (imc < 40.0) return { texto: "Obesidade Grau II",   classe: "obeso2"    };
  return                  { texto: "Obesidade Grau III", classe: "obeso3"    };
}

// ==========================================
//  CADASTRAR PESSOA
// ==========================================
form.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nome   = campoNome.value.trim();
  const peso   = parseFloat(campoPeso.value);
  const altura = parseFloat(campoAltura.value);

  if (!nome) {
    return mostrarMensagem("Informe o nome!", "erro");
  }
  if (isNaN(peso) || peso <= 0) {
    return mostrarMensagem("Peso inválido!", "erro");
  }
  if (isNaN(altura) || altura <= 0) {
    return mostrarMensagem("Altura inválida!", "erro");
  }

  pessoas.push({ nome, peso, altura });
  form.reset();
  campoNome.focus();
  renderizarTabela();
  mostrarMensagem("✅ Pessoa adicionada!");
});

// ==========================================
//  RENDERIZAR A TABELA
// ==========================================
function renderizarTabela() {
  corpoTabela.innerHTML = "";

  if (pessoas.length === 0) {
    corpoTabela.innerHTML =
      `<tr><td colspan="6" class="vazio">Nenhuma pessoa cadastrada.</td></tr>`;
    return;
  }

  pessoas.forEach((p, index) => {
    const imc      = calcularIMC(p.peso, p.altura);
    const classe   = classificarIMC(imc);

    const linha = document.createElement("tr");
    // Aplica a classe de cor na linha toda
    linha.classList.add(classe.classe);

    linha.innerHTML = `
      <td>${p.nome}</td>
      <td>${p.peso.toFixed(1)}</td>
      <td>${p.altura.toFixed(2)}</td>
      <td><strong>${imc.toFixed(1)}</strong></td>
      <td class="situacao">${classe.texto}</td>
      <td>
        <button class="btn-remover" onclick="removerPessoa(${index})">🗑️</button>
      </td>
    `;
    corpoTabela.appendChild(linha);
  });
}

// ==========================================
//  REMOVER PESSOA
// ==========================================
function removerPessoa(index) {
  pessoas.splice(index, 1);
  renderizarTabela();
  mostrarMensagem("🗑️ Pessoa removida.");
}

// ---------- INICIALIZAÇÃO ----------
// Alguns exemplos para já aparecer a tabela preenchida (como no enunciado)
pessoas.push({ nome: "João 1", peso: 72.0, altura: 1.65 });
pessoas.push({ nome: "João 2", peso: 65.0, altura: 1.68 });

renderizarTabela();