function toggleLike(element) {
    if (element.classList.contains('fa-regular')) {
        element.classList.remove('fa-regular', 'fa-heart');
        element.classList.add('fa-solid', 'fa-heart', 'liked');
    } else {
        element.classList.remove('fa-solid', 'fa-heart', 'liked');
        element.classList.add('fa-regular', 'fa-heart');
    }
}
