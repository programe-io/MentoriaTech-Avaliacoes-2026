function abrirModal() {
    const modal = document.getElementById("modal");
    const img = document.getElementById("poster");
    const imgModal = document.getElementById("imgModal");

    modal.style.display = "block";
    imgModal.src = img.src;
}

function fecharModal() {
    document.getElementById("modal").style.display = "none";
}

function compartilhar() {
    alert("📢 Cartaz compartilhado com sucesso!");
}