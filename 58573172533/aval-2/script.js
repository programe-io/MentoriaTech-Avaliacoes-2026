 const curiosidades = [
      "💡 Muitas fábricas funcionavam de 12 a 16 horas por dia.",
      "💡 O trem a vapor revolucionou os transportes.",
      "💡 Algumas cidades ficaram cobertas por fumaça devido à poluição.",
      "💡 Trabalhadores recebiam salários muito baixos.",
      "💡 A Revolução Industrial ajudou a formar o mundo moderno."
    ];

    function mostrarCuriosidade() {
      const box = document.getElementById("info");
      const random = Math.floor(Math.random() * curiosidades.length);

      box.textContent = curiosidades[random];
    }