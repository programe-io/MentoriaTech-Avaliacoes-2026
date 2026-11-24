function ampliar(foto) {
      document.getElementById("visualizador").style.display = "flex";
        document.getElementById("fotoGrande").src = foto.src;
        }

        function fechar() {
          document.getElementById("visualizador").style.display = "none";
          }
}