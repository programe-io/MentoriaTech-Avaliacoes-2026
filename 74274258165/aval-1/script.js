/* ==========================================
   BARATIER SYSTEM PREMIUM
      Desenvolvido por HERIC Antônio
         e Wesley Queiroz
         ========================================== */


         /* LOADER */

         window.addEventListener("load", () => {

         const loader = document.querySelector(".loader");

         setTimeout(() => {

         loader.style.opacity = "0";

         loader.style.visibility = "hidden";

         },1500);

         });


         /* CONTADORES ANIMADOS */

         const counters = document.querySelectorAll(".stat h2");

         counters.forEach(counter => {

         const target =
         parseInt(counter.innerText);

         if(isNaN(target)) return;

         let count = 0;

         const update = () => {

         const increment = target / 120;

         count += increment;

         if(count < target){

         counter.innerText =
         Math.ceil(count);

         requestAnimationFrame(update);

         }

         else{

         counter.innerText = target;

         }

         }

         update();

         });


         /* CADASTRO */

         const form =
         document.getElementById("formCadastro");

         if(form){

         form.addEventListener(

         "submit",

         (e)=>{

         e.preventDefault();

         mostrarToast(

         "Cadastro realizado com sucesso!"

         );

         form.reset();

         }

         );

         }


         /* TOAST */

         function mostrarToast(msg){

         const toast =

         document.createElement("div");

         toast.innerHTML = msg;

         toast.style.position = "fixed";

         toast.style.top = "30px";

         toast.style.right = "30px";

         toast.style.padding =
         "16px 25px";

         toast.style.background =
         "#38bdf8";

         toast.style.color =
         "white";

         toast.style.borderRadius =
         "12px";

         toast.style.fontWeight =
         "600";

         toast.style.zIndex =
         "99999";

         toast.style.boxShadow =
         "0 10px 30px rgba(0,0,0,.3)";

         toast.style.animation =
         "fade .4s";

         document.body.appendChild(

         toast

         );

         setTimeout(()=>{

         toast.remove();

         },3000);

         }


         /* BOTÕES */

         const botoes =

         document.querySelectorAll(

         ".food-card button"

         );

         botoes.forEach(btn=>{

         btn.addEventListener(

         "click",

         ()=>{

         mostrarToast(

         "Item adicionado ao pedido"

         );

         }

         );

         });


         /* MENU MOBILE */

         const menuBtn =

         document.querySelector(

         ".menu-mobile"

         );

         const nav =

         document.querySelector(

         "nav"

         );

         if(menuBtn){

         menuBtn.addEventListener(

         "click",

         ()=>{

         nav.classList.toggle(

         "ativo"

         );

         });

         }


         /* ACESSOS */

         let acessos =

         localStorage.getItem(

         "baratier"

         );

         if(acessos==null){

         acessos = 0;

         }

         acessos++;

         localStorage.setItem(

         "baratier",

         acessos

         );

         const contador =

         document.createElement(

         "div"

         );

         contador.innerHTML =

         "👁 " + acessos +
         " acessos";

         contador.style.position =

         "fixed";

         contador.style.bottom =

         "25px";

         contador.style.right =

         "25px";

         contador.style.background =

         "#38bdf8";

         contador.style.padding =

         "12px 20px";

         contador.style.borderRadius =

         "15px";

         contador.style.color =

         "white";

         contador.style.fontWeight =

         "700";

         contador.style.boxShadow =

         "0 0 25px rgba(0,0,0,.3)";

         contador.style.zIndex =

         "9999";

         document.body.appendChild(

         contador

         );


         /* SCROLL REVEAL */

         const reveal = () => {

         const elementos =

         document.querySelectorAll(

         ".food-card,.review,.mini-card,.stat"

         );

         elementos.forEach(el=>{

         const top =

         el.getBoundingClientRect()

         .top;

         if(top <

         window.innerHeight - 100){

         el.classList.add(

         "show"

         );

         }

         });

         };

         window.addEventListener(

         "scroll",

         reveal

         );

         reveal();


         /* VOLTAR AO TOPO */

         const topo =

         document.createElement(

         "button"

         );

         topo.innerHTML = "↑";

         topo.style.position =

         "fixed";

         topo.style.bottom =

         "90px";

         topo.style.right =

         "25px";

         topo.style.width =

         "50px";

         topo.style.height =

         "50px";

         topo.style.border =

         "none";

         topo.style.borderRadius =

         "50%";

         topo.style.background =

         "#0ea5e9";

         topo.style.color =

         "white";

         topo.style.fontSize =

         "22px";

         topo.style.cursor =

         "pointer";

         topo.style.zIndex =

         "9999";

         topo.style.display =

         "none";

         document.body.appendChild(

         topo

         );

         window.addEventListener(

         "scroll",

         ()=>{

         if(window.scrollY >

         500){

         topo.style.display =

         "block";

         }

         else{

         topo.style.display =

         "none";

         }

         }

         );

         topo.addEventListener(

         "click",

         ()=>{

         window.scrollTo({

         top:0,

         behavior:"smooth"

         });

         }

         );


         /* RESERVA */

         const reservaBtn =

         document.querySelector(

         ".btn-primary"

         );

         if(reservaBtn){

         reservaBtn.addEventListener(

         "click",

         ()=>{

         mostrarToast(

         "Mesa reservada com sucesso!"

         );

         }

         );

         }


         /* CARDÁPIO */

         const cardapioBtn =

         document.querySelector(

         ".btn-secondary"

         );

         if(cardapioBtn){

         cardapioBtn.addEventListener(

         "click",

         ()=>{

         document.querySelector(

         "#menu"

         ).scrollIntoView({

         behavior:"smooth"

         });

         }

         );

         }


         /* CONSOLE */

         console.log(

         "%cBARATIER SYSTEM PREMIUM",

         "color:#38bdf8;font-size:22px;font-weight:bold"

         );

         console.log(

         "Desenvolvido por HERIC Antônio e Wesley Queiroz"

         );