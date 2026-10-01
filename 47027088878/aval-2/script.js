const senha = document.getElementById("senha");
const copiar = document.getElementById("copiar");
const gerar = document.getElementById("gerar");

const tamanho = document.getElementById("tamanho");
const valorTamanho = document.getElementById("valorTamanho");

const maiusculas = document.getElementById("maiusculas");
const minusculas = document.getElementById("minusculas");
const numeros = document.getElementById("numeros");
const simbolos = document.getElementById("simbolos");

const mensagem = document.getElementById("mensagem");


const caracteres = {
    maiusculas: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

    minusculas: "abcdefghijklmnopqrstuvwxyz",

    numeros: "0123456789",

    simbolos: "!@#$%&*()_+-=[]{}<>?"
};


// Atualiza o tamanho mostrado na tela
tamanho.addEventListener("input", () => {

    valorTamanho.textContent = tamanho.value;

});


// Gera a senha
function gerarSenha() {

    let caracteresDisponiveis = "";

    let senhaGerada = "";


    if (maiusculas.checked) {
        caracteresDisponiveis += caracteres.maiusculas;
    }

    if (minusculas.checked) {
        caracteresDisponiveis += caracteres.minusculas;
    }

    if (numeros.checked) {
        caracteresDisponiveis += caracteres.numeros;
    }

    if (simbolos.checked) {
        caracteresDisponiveis += caracteres.simbolos;
    }


    // Verifica se alguma opção foi selecionada
    if (caracteresDisponiveis.length === 0) {

        senha.value = "";

        mensagem.textContent =
            "⚠️ Selecione pelo menos uma opção.";

        return;
    }


    // Cria a senha
    for (let i = 0; i < tamanho.value; i++) {

        const indice = Math.floor(
            Math.random() * caracteresDisponiveis.length
        );

        senhaGerada += caracteresDisponiveis[indice];

    }


    senha.value = senhaGerada;

    mensagem.textContent = "Senha gerada com sucesso!";

}


// Botão gerar
gerar.addEventListener("click", gerarSenha);


// Copiar senha
copiar.addEventListener("click", async () => {

    if (senha.value === "") {

        mensagem.textContent =
            "⚠️ Gere uma senha primeiro.";

        return;
    }


    try {

        await navigator.clipboard.writeText(senha.value);

        mensagem.textContent =
            "✅ Senha copiada!";

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível copiar a senha.";

    }

});


// Gera uma senha automaticamente ao abrir
gerarSenha();