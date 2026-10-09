const botao = document.getElementById("btnCuriosidade");
const texto = document.getElementById("textoCuriosidade");

botao.addEventListener("click", function() {
    texto.innerHTML =
        "Curiosidade: O carro Impala 1967 de Dean Winchester se tornou um dos símbolos mais famosos da série Sobrenatural.";
});