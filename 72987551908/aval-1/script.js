const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const posts = document.querySelectorAll('.post-card');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

function applyFilters() {
  const term = searchInput.value.toLowerCase().trim();
  const activeFilter = document.querySelector('.filter-btn.active')?.dataset.filter || 'all';

  posts.forEach((post) => {
    const title = post.dataset.title.toLowerCase();
    const category = post.dataset.category;
    const matchesText = title.includes(term) || post.textContent.toLowerCase().includes(term);
    const matchesCategory = activeFilter === 'all' || category === activeFilter;

    post.classList.toggle('hidden', !(matchesText && matchesCategory));
  });
}

searchInput?.addEventListener('input', applyFilters);

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    applyFilters();
  });
});

const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = newsletterForm.querySelector('input');
  if (input) {
    input.value = '';
    alert('Obrigado por se inscrever!');
  }
});
