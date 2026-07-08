function copiar() {
      const texto = document.getElementById("texto").value;
        navigator.clipboard.writeText(texto)
            .then(() => alert("Texto copiado!"))
                .catch(() => alert("Erro ao copiar."));
                }
}