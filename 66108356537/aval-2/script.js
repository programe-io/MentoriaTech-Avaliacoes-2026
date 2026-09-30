<script>
  function like(button) {
    if (button.textContent.includes("♡")) {
      button.textContent = "♥ Curtido";
    } else {
      button.textContent = "♡ Curtir";
    }
  }

  function comment() {
    const texto = prompt("Digite seu comentário:");
    if (texto) {
      alert("Comentário publicado: " + texto);
    }
  }
</script>