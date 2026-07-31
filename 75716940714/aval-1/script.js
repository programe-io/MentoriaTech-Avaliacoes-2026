function abrirJogo(elementoImagem, titulo, descricao) {
    const modal = document.getElementById("modal");
    const conteudoModal = document.getElementById("modal-conteudo-dinamico");

   
    const linkDaImagem = elementoImagem.src;

    conteudoModal.innerHTML = `
        <span class="fechar" onclick="fecharModal()">&times;</span>
        <h2>${titulo}</h2>
        <img src="${linkDaImagem}" class="imagemModal" alt="${titulo}">
        <p style="margin-top: 15px;">${descricao}</p>
    `;

    modal.style.display = "flex";
}


function fecharModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}


window.onclick = function(event) {
    const modal = document.getElementById("modal");
    if (event.target === modal) {
        fecharModal();
    }
}



function abrirModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "flex";
    }
}


function fecharModal(idModal) {
    const modal = document.getElementById(idModal);
    if (modal) {
        modal.style.display = "none";
    }
}


window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}

window.onclick = function(event) {
    
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}