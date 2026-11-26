document.getElementById("input-arquivo").addEventListener("change", (e) => {
  const arquivo = e.target.files[0];
  if (!arquivo) return;
  const leitor = new FileReader();
  leitor.onload = () => {
    imagemBase64 = leitor.result;
  };
  leitor.readAsDataURL(arquivo);
});
