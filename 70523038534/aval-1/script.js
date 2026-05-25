function gerarSenha(tamanho = 12, incluirMaiusculas = true, incluirNumeros = true, incluirEspeciais = true) {
    const letrasMinusculas = "abcdefghijklmnopqrstuvwxyz";
    const letrasMaiusculas = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numeros = "0123456789";
    const especiais = "!@#$%^&*()_+~`|}{[]:;?><,./-=";

    let caracteresPermitidos = letrasMinusculas;
    if (incluirMaiusculas) caracteresPermitidos += letrasMaiusculas;
    if (incluirNumeros) caracteresPermitidos += numeros;
    if (incluirEspeciais) caracteresPermitidos += especiais;

    let senha = "";
    for (let i = 0; i < tamanho; i++) {
        const indiceAleatorio = Math.floor(Math.random() * caracteresPermitidos.length);
        senha += caracteresPermitidos[indiceAleatorio];
    }

    return senha;
}

// Exemplo de uso: Gera uma senha de 16 caracteres com todas as opções ativadas
console.log(gerarSenha(16, true, true, true));
