
const menu = document.getElementById("menu");
const links = document.getElementById("links");

menu.onclick = () => {
  links.classList.toggle("open");
};

links.querySelectorAll("a").forEach(link => {
  link.onclick = () => links.classList.remove("open");
});
