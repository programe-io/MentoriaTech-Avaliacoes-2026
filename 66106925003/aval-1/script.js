const posts = document.querySelectorAll('.post-card');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

if (searchInput) {
  searchInput.addEventListener('input', (event) => {
    const query = event.target.value.toLowerCase();

    posts.forEach((post) => {
      const text = post.textContent.toLowerCase();
      post.style.display = text.includes(query) ? 'block' : 'none';
    });
  });
}