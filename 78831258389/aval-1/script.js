function executarCodigo() {
      const html = document.querySelectorAll("textarea")[0].value;
        const css = document.querySelectorAll("textarea")[1].value;
          const js = document.querySelectorAll("textarea")[2].value;

            const preview = document.getElementById("preview");

              preview.srcdoc = `
                  <style>${css}</style>
                      ${html}
                          <script>${js}<\/script>
                            `;
                            }
}