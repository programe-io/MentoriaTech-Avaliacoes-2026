
let enviadas = [];

function enviar(numero) {
  const campo = document.getElementById("link" + numero);
  const status = document.getElementById("status" + numero);
  const botao = campo.parentElement.querySelector("button");

  const link = campo.value.trim();

  if (!link) {
    alert("Por favor, informe o link da avaliação!");
    campo.focus();
    return;
  }

  try {
    const endereco = new URL(link);

    if (!["http:", "https:"].includes(endereco.protocol)) {
      throw new Error("Link inválido");
    }
  } catch {
    alert("Digite um link válido, começando com https://");
    campo.focus();
    return;
  }

  if (!enviadas.includes(numero)) {
    enviadas.push(numero);
  }

  status.textContent = "✅ Avaliação enviada com sucesso!";
  status.style.color = "#078b69";

  campo.disabled = true;
  botao.disabled = true;
  botao.textContent = "Enviado";

  document.getElementById("contador").textContent =
    enviadas.length + " de 3 avaliações enviadas";

  document.getElementById("preenchimento").style.width =
    (enviadas.length / 3 * 100) + "%";
}

