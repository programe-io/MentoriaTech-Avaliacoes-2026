// ========================= //
//        script.js          //
// ========================= //

// MENU RESPONSIVO

const menuBtn = document.getElementById("menu-btn");
const menuList = document.getElementById("menu-list");

menuBtn.addEventListener("click", () => {
  menuList.classList.toggle("active");
});

// EFEITO NO HEADER

window.addEventListener("scroll", () => {

  const header = document.querySelector("header");

  if(window.scrollY > 50){

    header.style.background = "rgba(0,0,0,0.7)";

  }else{

    header.style.background = "rgba(255,255,255,0.05)";

  }

});

// BOTÕES INTERATIVOS

const buttons = document.querySelectorAll(".btn");

buttons.forEach(button => {

  button.addEventListener("mouseover", () => {

    button.style.transform = "scale(1.05)";

  });

  button.addEventListener("mouseout", () => {

    button.style.transform = "scale(1)";

  });

});