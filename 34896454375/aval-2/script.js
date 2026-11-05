let selectedImageSrc = "";

const uploadPhotoBtn = document.getElementById('upload-photo-btn');
const imageInput = document.getElementById('post-image-input');
const publishBtn = document.getElementById('publish-btn');
const postTextArea = document.getElementById('post-text');
const feedWrapper = document.getElementById('feed-posts-wrapper');

// Abrir galeria do celular ao clicar em Foto
if (uploadPhotoBtn && imageInput) {
    uploadPhotoBtn.addEventListener('click', () => {
        imageInput.click();
    });
}

// Carregar foto selecionada temporariamente
if (imageInput && uploadPhotoBtn) {
    imageInput.addEventListener('change', (event) => {
        const file = event.target.files;
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                selectedImageSrc = e.target.result;
                uploadPhotoBtn.textContent = "✅ Pronta";
                uploadPhotoBtn.style.backgroundColor = "#e8f5e9";
                uploadPhotoBtn.style.color = "#2e7d32";
            };
            reader.readAsDataURL(file);
        }
    });
}

// Botão Publicar
if (publishBtn && postTextArea && feedWrapper) {
    publishBtn.addEventListener('click', () => {
        const textContent = postTextArea.value.trim();
        
        if (textContent === "" && selectedImageSrc === "") {
            alert("Digite algo ou escolha uma foto antes de publicar! 💕");
            return;
        }

        const newPost = document.createElement('div');
        newPost.className = 'feed-post';

        let postHTML = `
            <div class="user-profile">
                <div class="avatar">❤️</div>
                <div class="user-info">
                    <div class="username">Clara Cristiana</div>
                    <div class="post-time">Agora mesmo</div>
                </div>
            </div>
            <div class="post-content">${textContent}</div>
        `;

        if (selectedImageSrc !== "") {
            postHTML += `<img class="post-image" src="${selectedImageSrc}" alt="Foto do Post">`;
        }

        postHTML += `
            <div class="post-actions">
                <button class="action-btn like-btn">❤️ Curtir</button>
                <button class="action-btn">💬 Comentar</button>
            </div>
        `;

        newPost.innerHTML = postHTML;
        feedWrapper.insertBefore(newPost, feedWrapper.firstChild);

        // Resetar os campos
        postTextArea.value = "";
        selectedImageSrc = "";
        imageInput.value = "";
        uploadPhotoBtn.textContent = "📷 Foto";
        uploadPhotoBtn.style.backgroundColor = "#fff5f5";
        uploadPhotoBtn.style.color = "#e56b6f";
    });
}

// Botão Curtir dinâmico
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('like-btn')) {
        const btn = event.target;
        if (btn.style.color === 'rgb(229, 107, 111)') {
            btn.style.color = '#a89494';
            btn.style.fontWeight = 'normal';
        } else {
            btn.style.color = '#e56b6f';
            btn.style.fontWeight = 'bold';
        }
    }
});
