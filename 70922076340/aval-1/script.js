const searchInput = document.getElementById('searchInput');
const posts = document.querySelectorAll('.post');

searchInput.addEventListener('keyup', () => {
    const termo = searchInput.value.toLowerCase();

    posts.forEach(post => {
        const titulo = post.querySelector('h2').textContent.toLowerCase();

        if (titulo.includes(termo)) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
});