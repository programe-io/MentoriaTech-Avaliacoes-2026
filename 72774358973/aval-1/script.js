
const formulario = document.getElementById("form-imc");

const lista = document.getElementById("lista-registros");

const mensagem = document.getElementById("mensagem");

const botaoLimpar = document.getElementById("limpar");

let registros = JSON.parse(localStorage.getItem("registrosIMC")) || [];

function salvarRegistros() {
    localStorage.setItem(
        "registrosIMC",
        JSON.stringify(registros)
    );
}

function mostrarRegistros() {

    lista.innerHTML = "";

    if (registros.length === 0) {
        lista.innerHTML = `
            <tr>
                <td colspan="5">
                    Nenhum registro cadastrado.
                </td>
            </tr>
        `;
        return;
    }

    registros.forEach((pessoa) => {

        const linha = document.createElement("tr");

        const celulaNome = document.createElement("td");
        celulaNome.textContent = pessoa.nome;

        const celulaPeso = document.createElement("td");
        celulaPeso.textContent = pessoa.peso + " kg";

        const celulaAltura = document.createElement("td");
        celulaAltura.textContent = pessoa.altura + " m";

        const celulaIMC = document.createElement("td");
        celulaIMC.textContent = pessoa.imc.toFixed(2);

        const celulaAcao = document.createElement("td");

        const botaoExcluir = document.createElement("button");
        botaoExcluir.textContent = "Excluir";
        botaoExcluir.classList.add("excluir");

        botaoExcluir.addEventListener("click", () => {
            excluirPessoa(pessoa.id);
        });

        celulaAcao.appendChild(botaoExcluir);

        linha.append(
            celulaNome,
            celulaPeso,
            celulaAltura,
            celulaIMC,
            celulaAcao
        );

        lista.appendChild(linha);
    });
}

formulario.addEventListener("submit", function(evento) {

    evento.preventDefault();

    const nome = document.getElementById("nome").value.trim();

    const peso = Number(document.getElementById("peso").value);

    const altura = Number(document.getElementById("altura").value);

    if (!nome || peso <= 0 || altura <= 0) {
        mensagem.textContent = "Preencha os campos corretamente!";
        return;
    }

    const imc = peso / (altura * altura);

    const pessoa = {
        id: Date.now(),
        nome: nome,
        peso: peso,
        altura: altura,
        imc: imc
    };

    registros.push(pessoa);

    salvarRegistros();

    mostrarRegistros();

    formulario.reset();

    mensagem.textContent = "Cadastro realizado com sucesso!";
});

function excluirPessoa(id) {

    registros = registros.filter(pessoa => pessoa.id !== id);

    salvarRegistros();

    mostrarRegistros();
}

botaoLimpar.addEventListener("click", function() {

    if (confirm("Deseja apagar todos os registros?")) {

        registros = [];

        salvarRegistros();

        mostrarRegistros();
    }
});

mostrarRegistros();