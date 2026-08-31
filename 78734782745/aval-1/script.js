let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativas = 0;

function verificarPalpite() {
    // Pega o valor digitado no input do HTML
    const palpiteUsuario = Number(document.getElementById('palpite').value);
    const mensagem = document.getElementById('mensagem');
    const botaoReiniciar = document.getElementById('botaoReiniciar');

    // Valida se o usuário digitou um número válido
    if (!palpiteUsuario || palpiteUsuario < 1 || palpiteUsuario > 100) {
        mensagem.textContent = "Por favor, digite um número válido entre 1 e 100.";
        mensagem.style.color = "orange";
        return;
    \}

    tentativas++;

    // Lógica do jogo (condicionais)
    if (palpiteUsuario === numeroSecreto) {
        mensagem.textContent = `🎉 Parabéns! Você acertou em \${tentativas\} tentativas!`;
        mensagem.style.color = "green";
        botaoReiniciar.style.display = "inline-block"; // Mostra o botão reiniciar
    \} else if (palpiteUsuario < numeroSecreto) {
        mensagem.textContent = "Muito baixo! Tente um número maior. ⬆️";
        mensagem.style.color = "blue";
    \} else {
        mensagem.textContent = "Muito alto! Tente um número menor. ⬇️";
        mensagem.style.color = "red";
    \}
$0