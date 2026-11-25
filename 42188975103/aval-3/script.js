const form = document.getElementById("form-pessoa");
const tabela = document.getElementById("tabela-pessoas");

let pessoas = [];
let editando = -1;

function exibir() {
    tabela.innerHTML = "";

    pessoas.forEach((p, i) => {
        let imc = p.peso / (p.altura * p.altura);
        let classe = imc < 18.5 ? "abaixo" :
            imc < 25 ? "normal" :
            imc < 30 ? "sobrepeso" : "obesidade";

        let nomeClasse = {
            abaixo: "Abaixo do peso",
            normal: "Normal",
            sobrepeso: "Sobrepeso",
            obesidade: "Obesidade"
        };

        tabela.innerHTML += `
            <tr>
                <td>${p.nome}</td>
                <td>${p.idade}</td>
                <td>${p.altura} m</td>
                <td>${p.peso} kg</td>
                <td>${imc.toFixed(2)}</td>
                <td><span class="selo ${classe}">${nomeClasse[classe]}</span></td>
                <td class="acoes">
                    <button onclick="editar(${i})">Editar</button>
                    <button class="remover" onclick="remover(${i})">Excluir</button>
                </td>
            </tr>`;
    });

    if (pessoas.length === 0) {
        tabela.innerHTML = `<tr><td colspan="7" class="vazio">Nenhuma pessoa cadastrada.</td></tr>`;
    }
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    const nome = document.getElementById("input-nome").value.trim();
    const idade = Number(document.getElementById("input-idade").value);
    const altura = Number(document.getElementById("input-altura").value);
    const peso = Number(document.getElementById("input-peso").value);
    const erro = document.getElementById("erro");

    if (!nome || idade < 1 || idade > 120 ||
        altura < 0.5 || altura > 2.5 ||
        peso < 2 || peso > 500) {
        erro.textContent = "Preencha os campos corretamente.";
        erro.hidden = false;
        return;
    }

    erro.hidden = true;

    const pessoa = { nome, idade, altura, peso };

    if (editando === -1) {
        pessoas.push(pessoa);
    } else {
        pessoas[editando] = pessoa;
        editando = -1;
    }

    form.reset();
    document.getElementById("btn-cancelar").hidden = true;
    document.getElementById("titulo-form").textContent = "Nova pessoa";
    document.getElementById("btn-salvar").textContent = "Salvar";

    exibir();
});

function editar(i) {
    const p = pessoas[i];

    document.getElementById("input-nome").value = p.nome;
    document.getElementById("input-idade").value = p.idade;
    document.getElementById("input-altura").value = p.altura;
    document.getElementById("input-peso").value = p.peso;

    editando = i;
    document.getElementById("titulo-form").textContent = "Editar pessoa";
    document.getElementById("btn-salvar").textContent = "Atualizar";
    document.getElementById("btn-cancelar").hidden = false;
}

function remover(i) {
    pessoas.splice(i, 1);
    editando = -1;
    form.reset();
    exibir();
}

document.getElementById("btn-cancelar").addEventListener("click", function() {
    editando = -1;
    form.reset();
    document.getElementById("titulo-form").textContent = "Nova pessoa";
    document.getElementById("btn-salvar").textContent = "Salvar";
    this.hidden = true;
    exibir();
});

exibir();