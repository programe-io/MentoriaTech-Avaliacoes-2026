
document.addEventListener("DOMContentLoaded", () => {

  // =================================
  // 1. ANIMAÇÃO DAS FOTOS E SEÇÕES
  // =================================

  const elementos = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {

    const observador = new IntersectionObserver((entradas) => {

      entradas.forEach((entrada) => {

        if (entrada.isIntersecting) {
          entrada.target.classList.add("mostrar");
          observador.unobserve(entrada.target);
        }

      });

    }, {
      threshold: 0.12
    });

    elementos.forEach((elemento) => {
      observador.observe(elemento);
    });

  } else {
    elementos.forEach(elemento => {
      elemento.classList.add("mostrar");
    });
  }


  // =================================
  // 2. PRÉ-VISUALIZAÇÃO DE ARQUIVOS
  // =================================

  const arquivo = document.getElementById("arquivo");
  const preview = document.getElementById("preview");

  let urlAnterior = null;

  if (arquivo && preview) {

    arquivo.addEventListener("change", () => {

      if (urlAnterior) {
        URL.revokeObjectURL(urlAnterior);
        urlAnterior = null;
      }

      preview.replaceChildren();

      const file = arquivo.files[0];

      if (!file) return;

      const limite = 20 * 1024 * 1024;

      if (file.size > limite) {
        preview.textContent =
          "Arquivo muito grande. Limite da demonstração: 20 MB.";
        arquivo.value = "";
        return;
      }

      urlAnterior = URL.createObjectURL(file);

      if (file.type.startsWith("image/")) {

        const imagem = document.createElement("img");
        imagem.src = urlAnterior;
        imagem.alt = "Pré-visualização do documento enviado";

        preview.appendChild(imagem);

      } else if (file.type.startsWith("video/")) {

        const video = document.createElement("video");
        video.src = urlAnterior;
        video.controls = true;

        preview.appendChild(video);

      } else {

        const texto = document.createElement("p");
        texto.textContent = "Arquivo selecionado: " + file.name;

        preview.appendChild(texto);

      }

    });

  }


  // =================================
  // 3. FORMULÁRIO DE RELATOS
  // =================================

  const form = document.getElementById("formDenuncia");
  const lista = document.getElementById("listaDenuncias");
  const mensagem = document.getElementById("mensagem");

  let relatos = [];

  try {
    relatos = JSON.parse(
      localStorage.getItem("relatosBrasil2026") || "[]"
    );

    if (!Array.isArray(relatos)) relatos = [];

  } catch {
    relatos = [];
  }


  function mostrarRelatos() {

    lista.replaceChildren();

    if (relatos.length === 0) {

      const vazio = document.createElement("p");
      vazio.textContent = "Nenhum relato registrado ainda.";

      lista.appendChild(vazio);
      return;
    }

    relatos.forEach((relato) => {

      const card = document.createElement("div");
      card.className = "relato";

      const titulo = document.createElement("h3");
      titulo.textContent = relato.tipo;

      const local = document.createElement("p");
      local.textContent = "Local: " + relato.local;

      const descricao = document.createElement("p");
      descricao.textContent = relato.descricao;

      const data = document.createElement("small");
      data.textContent = "Registrado em: " + relato.data;

      const status = document.createElement("p");
      status.textContent = "Status: relato não verificado.";

      card.append(titulo, local, descricao, data, status);

      lista.appendChild(card);

    });

  }


  if (form) {

    form.addEventListener("submit", (evento) => {

      evento.preventDefault();

      const tipo = document.getElementById("tipo").value;
      const local = document.getElementById("local").value;
      const descricao = document.getElementById("descricao").value;

      const arquivoSelecionado = arquivo?.files[0];

      const novoRelato = {

        tipo: tipo,
        local: local || "Não informado",
        descricao: descricao,
        arquivo: arquivoSelecionado
          ? arquivoSelecionado.name
          : "Nenhum arquivo",

        data: new Date().toLocaleString("pt-BR")

      };

      relatos.push(novoRelato);

      try {

        localStorage.setItem(
          "relatosBrasil2026",
          JSON.stringify(relatos)
        );

      } catch {

        relatos.pop();

        mensagem.textContent =
          "Não foi possível salvar. O armazenamento pode estar cheio.";

        return;

      }

      mensagem.textContent =
        "Relato registrado neste navegador com sucesso. Ainda não foi publicado nem verificado.";

      form.reset();

      preview.replaceChildren();

      if (urlAnterior) {
        URL.revokeObjectURL(urlAnterior);
        urlAnterior = null;
      }

      mostrarRelatos();

    });

  }


  // =================================
  // 4. COMPARADOR DE BOLETINS
  // =================================

  const botaoComparar = document.getElementById("comparar");

  const resultado = document.getElementById(
    "resultadoComparacao"
  );

  if (botaoComparar) {

    botaoComparar.addEventListener("click", () => {

      const ids = [
        "aLula",
        "aFlavio",
        "bLula",
        "bFlavio"
      ];

      const valores = ids.map(id => {

        const campo = document.getElementById(id);

        return campo.value.trim() === ""
          ? NaN
          : Number(campo.value);

      });

      if (
        valores.some(valor =>
          !Number.isSafeInteger(valor) || valor < 0
        )
      ) {

        resultado.textContent =
          "Preencha os quatro campos com números inteiros válidos.";

        return;

      }

      const [
        lulaA,
        flavioA,
        lulaB,
        flavioB
      ] = valores;

      const diferencaLula = lulaB - lulaA;
      const diferencaFlavio = flavioB - flavioA;

      resultado.replaceChildren();

      const titulo = document.createElement("h3");
      titulo.textContent = "RESULTADO DA COMPARAÇÃO";

      const linha1 = document.createElement("p");
      linha1.textContent =
        "Diferença de votos de Lula: " + diferencaLula;

      const linha2 = document.createElement("p");
      linha2.textContent =
        "Diferença de votos de Flávio: " + diferencaFlavio;

      const aviso = document.createElement("p");

      aviso.textContent =
        "Esta comparação é apenas numérica. Uma diferença não comprova fraude. Verifique se os documentos são autênticos e pertencem à mesma seção e ao mesmo turno.";

      resultado.append(
        titulo,
        linha1,
        linha2,
        aviso
      );

    });

  }


  // =================================
  // 5. CARREGAMENTO INICIAL
  // =================================

  mostrarRelatos();

  console.log("Portal Brasil 2026 carregado!");

});
