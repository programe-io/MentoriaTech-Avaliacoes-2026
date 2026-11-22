
const formularioAcao = document.getElementById("acaoForm");
const areaLista = document.getElementById("listaAcoes");
const contadorAcoes = document.getElementById("totalAcoes");

let registroAcoes = [];

// Cadastro de uma nova ação
formularioAcao.addEventListener("submit", function(evento) {
    evento.preventDefault();

    const nomeAcao = document.getElementById("nome").value.trim();
    const tipoAcao = document.getElementById("categoria").value;
    const quantidadeAcao = Number(
        document.getElementById("quantidade").value
    );

    // Verifica se os dados estão corretos
    if (
        nomeAcao === "" ||
        tipoAcao === "" ||
        !Number.isInteger(quantidadeAcao) ||
        quantidadeAcao < 1
    ) {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    // Cria o registro
    const novaAcao = {
        nome: nomeAcao,
        categoria: tipoAcao,
        quantidade: quantidadeAcao
    };

    registroAcoes.push(novaAcao);

    atualizarTela();
    formularioAcao.reset();
});

// Atualiza a lista de ações
function atualizarTela() {
    areaLista.replaceChildren();

    if (registroAcoes.length === 0) {
        const mensagem = document.createElement("p");
        mensagem.textContent = "Nenhuma ação sustentável cadastrada ainda.";

        areaLista.appendChild(mensagem);
    } else {

        registroAcoes.forEach(function(item) {

            const cartao = document.createElement("div");

            const titulo = document.createElement("h3");
            titulo.textContent = item.nome;

            const categoria = document.createElement("p");
            categoria.textContent = "Categoria: " + item.categoria;

            const quantidade = document.createElement("p");
            quantidade.textContent = "Quantidade: " + item.quantidade;

            cartao.appendChild(titulo);
            cartao.appendChild(categoria);
            cartao.appendChild(quantidade);

            areaLista.appendChild(cartao);
        });
    }

    // Atualiza o total de ações cadastradas
    contadorAcoes.textContent = registroAcoes.length;
}
