const htmlEditor = document.getElementById("htmlCode");
const cssEditor = document.getElementById("cssCode");
const jsEditor = document.getElementById("jsCode");
const preview = document.getElementById("preview");

// Atualizar a pré-visualização
function updatePreview() {
  const html = htmlEditor.value;
    const css = cssEditor.value;
      const js = jsEditor.value.replace(
          /<\/script/gi,
              "<\\/script"
                );

                  preview.srcdoc = `
                      <!DOCTYPE html>
                          <html>
                              <head>
                                    <meta charset="UTF-8">
                                          <style>${css}</style>
                                              </head>
                                                  <body>
                                                        ${html}
                                                              <script>${js}<\/script>
                                                                  </body>
                                                                      </html>
                                                                        `;
                                                                        }

                                                                        // Atualização automática
                                                                        htmlEditor.addEventListener("input", updatePreview);
                                                                        cssEditor.addEventListener("input", updatePreview);
                                                                        jsEditor.addEventListener("input", updatePreview);

                                                                        // Maximizar editores
                                                                        document.querySelectorAll(".maximize").forEach(button => {
                                                                          button.addEventListener("click", () => {
                                                                              const editor = button.closest(".editor");

                                                                                  editor.classList.toggle("expanded");

                                                                                      button.textContent = editor.classList.contains("expanded")
                                                                                            ? "Restaurar"
                                                                                                  : "Maximizar";
                                                                                                    });
                                                                                                    });

                                                                                                    // Botão voltar
                                                                                                    document.querySelector(".back").addEventListener("click", () => {
                                                                                                      window.history.back();
                                                                                                      });

                                                                                                      // Botão publicar
                                                                                                      document.getElementById("publish").addEventListener("click", () => {
                                                                                                        alert(
                                                                                                            "Seu projeto está pronto! Para publicá-lo, configure o repositório no GitHub Pages."
                                                                                                              );
                                                                                                              });

                                                                                                              // Inicializar
                                                                                                              updatePreview();