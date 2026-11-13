// Lógica de Curtir
const likeIcon = document.getElementById('likeIcon');
const likeCountElement = document.getElementById('likeCount');

let likesCount = 1240;
let isLiked = false;

likeIcon.addEventListener('click', () => {
  if (!isLiked) {
    likesCount++;
    likeIcon.classList.remove('fa-regular');
    likeIcon.classList.add('fa-solid');
    likeIcon.style.color = '#ed4956';
    isLiked = true;
  } else {
    likesCount--;
    likeIcon.classList.remove('fa-solid');
    likeIcon.classList.add('fa-regular');
    likeIcon.style.color = '#262626';
    isLiked = false;
  }
  
  likeCountElement.textContent = likesCount.toLocaleString('pt-BR');
});

// Lógica para abrir e fechar Stories
const storyModal = document.getElementById('storyModal');
const storyModalUser = document.getElementById('storyModalUser');
const storyModalImg = document.getElementById('storyModalImg');

function openStory(username, imageUrl) {
  storyModalUser.textContent = username;
  storyModalImg.src = imageUrl;
  storyModal.style.display = 'flex';
}

function closeStory() {
  storyModal.style.display = 'none';
}
