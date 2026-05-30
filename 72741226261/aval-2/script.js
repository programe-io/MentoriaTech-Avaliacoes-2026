const likeBtn = document.getElementById('likeBtn');
const likeCount = document.getElementById('likeCount');

let curtido = false;
let numeroLikes = parseInt(likeCount.innerText);

likeBtn.addEventListener('click', () => {
    if (!curtido) {
        numeroLikes++;
        likeCount.innerText = numeroLikes;
        likeBtn.innerHTML = `❤️ Curtido! (${numeroLikes})`;
        likeBtn.classList.add('liked');
        curtido = true;
    } else {
        numeroLikes--;
        likeCount.innerText = numeroLikes;
        likeBtn.innerHTML = `❤️ Curtir (${numeroLikes})`;
        likeBtn.classList.remove('liked');
        curtido = false;
    }
});