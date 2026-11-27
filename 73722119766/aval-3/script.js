
let pessoas = JSON.parse(localStorage.getItem("pessoas")) || [];
let codigo = pessoas.length
  ? Math.max(...pessoas.map(p => p.codigo)) + 1
  : 1;

function calcularIMC(p, a) {
  return p / (a * a);
}

function classificar(imc) {
  if (imc < 18.5) return "Abaixo do peso";
  if (imc < 25) return "Normal";
  if (imc < 30) return "Sobrepeso";
  return "Obesidade";
}

function salvar() {
  localStorage.setItem("pessoas", JSON.stringify(pessoas));
}

function adicionar(pessoa) {
  pessoas.push({ codigo: codigo++, ...pessoa });
  salvar();
  render();
}

function render() {
  lista.innerHTML = "";

  pessoas.forEach(p => {
    let imc = calcularIMC(p.peso, p.altura);

    lista.innerHTML += `
      <tr>
        <td>${p.codigo}</td>
        <td>${p.nome}</td>
        <td>${p.idade}</td>
        <td>${p.peso.toFixed(1)} kg</td>
        <td>${p.altura.toFixed(2)} m</td>
        <td>${imc.toFixed(2)}</td>
        <td>${classificar(imc)}</td>
      </tr>`;
  });
}

form.addEventListener("submit", e => {
  e.preventDefault();

  let pessoa = {
    nome: nome.value.trim(),
    idade: Number(idade.value),
    peso: Number(peso.value),
    altura: Number(altura.value)
  };

  erro.textContent = "";

  if (!pessoa.nome || pessoa.idade <= 0 ||
      pessoa.peso <= 0 || pessoa.altura <= 0) {
    erro.textContent = "Preencha os dados corretamente!";
    return;
  }

  adicionar(pessoa);
  form.reset();
});

render();
