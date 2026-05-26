// =========================
// MENU MOBILE
// =========================

const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');

menuBtn.addEventListener('click', () => {

    navLinks.classList.toggle('active');

});

// =========================
// BOTÕES INTERATIVOS
// =========================

const buttons = document.querySelectorAll('.post-actions button');

buttons.forEach(button => {

    button.addEventListener('click', () => {

        button.style.transform = "scale(0.90)";

        setTimeout(() => {

            button.style.transform = "scale(1)";

        },150);

    });

});

// =========================
// HEADER SCROLL EFFECT
// =========================

window.addEventListener('scroll', () => {

    const header = document.querySelector('header');

    if(window.scrollY > 50){

        header.style.background = "rgba(0,0,0,0.6)";
        header.style.backdropFilter = "blur(20px)";

    }else{

        header.style.background = "rgba(255,255,255,0.05)";
    }

});

// =========================
// LIKE SYSTEM
// =========================

const likeButtons = document.querySelectorAll('.fa-heart');

likeButtons.forEach(like => {

    like.addEventListener('click', () => {

        like.classList.toggle('active');

        if(like.classList.contains('active')){

            like.style.color = "#ff0055";
            like.style.transform = "scale(1.3)";

        }else{

            like.style.color = "#ffffff";
            like.style.transform = "scale(1)";
        }

    });

});

// =========================
// TREND CLICK EFFECT
// =========================

const trends = document.querySelectorAll('.trend');

trends.forEach(trend => {

    trend.addEventListener('click', () => {

        alert(`Você clicou em ${trend.innerText}`);

    });

});

// =========================
// IMAGE HOVER ANIMATION
// =========================

const galleryImages = document.querySelectorAll('.grid img');

galleryImages.forEach(img => {

    img.addEventListener('mouseenter', () => {

        img.style.filter = "brightness(1.2)";
    });

    img.addEventListener('mouseleave', () => {

        img.style.filter = "brightness(1)";
    });

});

// =========================
// LOADING ANIMATION
// =========================

window.addEventListener('load', () => {

    document.body.style.opacity = "1";

});

// =========================
// POSTS ANIMATION
// =========================

const articles = document.querySelectorAll('article');

window.addEventListener('scroll', () => {

    articles.forEach(article => {

        const articleTop = article.getBoundingClientRect().top;

        if(articleTop < window.innerHeight - 100){

            article.style.opacity = "1";
            article.style.transform = "translateY(0px)";
        }

    });

});

articles.forEach(article => {

    article.style.opacity = "0";
    article.style.transform = "translateY(50px)";
    article.style.transition = "0.6s";

});