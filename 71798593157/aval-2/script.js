const htmlInput = document.getElementById("htmlCode");
const cssInput = document.getElementById("cssCode");
const jsInput = document.getElementById("jsCode");
const previewFrame = document.getElementById("preview");

// Atualiza a pré-visualização automaticamente ao digitar
function atualizarPreview() {
  const html = htmlInput.value;
    const css = `<style>${cssInput.value}</style>`;
      const js = `<script>${jsInput.value}<\/script>`;

        const doc = previewFrame.contentDocument || previewFrame.contentWindow.document;
          doc.open();
            doc.write(html + css + js);
              doc.close();
              }

              htmlInput.addEventListener("input", atualizarPreview);
              cssInput.addEventListener("input", atualizarPreview);
              jsInput.addEventListener("input", atualizarPreview);

              // Função para os botões "Maximizar"
              function maximizar(botao) {
                const bloco = botao.closest(".bloco-editor");
                  bloco.classList.toggle("maximizado");

                    if (bloco.classList.contains("maximizado")) {
                        botao.textContent = "Minimizar";
                          } else {
                              botao.textContent = "Maximizar";
                                }
                                }
                                