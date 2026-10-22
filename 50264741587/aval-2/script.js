const followButton = document.getElementById('followButton');

followButton.addEventListener('click', () => {
  const isFollowing = followButton.classList.toggle('following');
    followButton.textContent = isFollowing ? 'Seguindo ✓' : 'Seguir';
    });

    document.querySelectorAll('.post').forEach((post) => {
      post.addEventListener('click', () => {
          post.classList.toggle('liked');
              post.querySelector('.like').textContent = post.classList.contains('liked') ? '♥' : '♡';
                });
                });
                