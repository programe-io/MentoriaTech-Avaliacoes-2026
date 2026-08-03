function assinar() {
    let nome = document.getElementById('nome-aluno').value;
    let campoAssinatura = document.getElementById('assinatura');

    if (nome.trim() === "") {
        campoAssinatura.textContent = "Por favor, digite seu nome!";
        campoAssinatura.style.color = "#e74c3c";
    } else {
        campoAssinatura.textContent = "Assinado por: " + nome + " ✅";
        campoAssinatura.style.color = "#27ae60";
    }
}