// Elementos do DOM
const campoSenha = document.querySelector("#senha");
const btnCopiar = document.querySelector("#btn-copiar");
const sliderTamanho = document.querySelector("#tamanho");
const valorTamanho = document.querySelector("#valor-tamanho");

const chkMaiusculas = document.querySelector("#maiusculas");
const chkMinusculas = document.querySelector("#minusculas");
const chkNumeros = document.querySelector("#numeros");
const chkSimbolos = document.querySelector("#simbolos");
const btnGerar = document.querySelector("#btn-gerar");

// Conjuntos de caracteres
const maiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const minusculas = "abcdefghijklmnopqrstuvwxyz";
const numeros = "0123456789";
const simbolos = "!@#$%^&*()_+-=[]{}|;:,.<>?";

// Atualiza o valor do texto conforme move o slider
sliderTamanho.addEventListener("input", () => {
    valorTamanho.textContent = sliderTamanho.value;
});

// Função para gerar a senha aleatória
function gerarSenha() {
    let caracteresDisponiveis = "";
    let senhaGerada = "";

    if (chkMaiusculas.checked) caracteresDisponiveis += maiusculas;
    if (chkMinusculas.checked) caracteresDisponiveis += minusculas;
    if (chkNumeros.checked) caracteresDisponiveis += numeros;
    if (chkSimbolos.checked) caracteresDisponiveis += simbolos;

    if (caracteresDisponiveis === "") {
        alert("Selecione pelo menos uma opção para gerar a senha!");
        return;
    }

    const tamanho = parseInt(sliderTamanho.value);

    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresDisponiveis.length);
        senhaGerada += caracteresDisponiveis[indiceAleatorio];
    }

    campoSenha.value = senhaGerada;
}

// Função para copiar a senha para a área de transferência
function copiarSenha() {
    if (!campoSenha.value) return;

    navigator.clipboard.writeText(campoSenha.value).then(() => {
        const textoOriginal = btnCopiar.textContent;
        btnCopiar.textContent = "Copiado!";
        setTimeout(() => {
            btnCopiar.textContent = textoOriginal;
        }, 1500);
    });
}

// Eventos dos botões
btnGerar.addEventListener("click", gerarSenha);
btnCopiar.addEventListener("click", copiarSenha);

// Gera uma senha automaticamente ao carregar a página
gerarSenha();