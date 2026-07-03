const html = document.getElementById("html");
const css = document.getElementById("css");
const js = document.getElementById("js");
const preview = document.getElementById("preview");

function atualizar(){

    const codigo = `
    <!DOCTYPE html>
    <html>
    <head>
    <style>
    ${css.value}
    </style>
    </head>

    <body>

    ${html.value}

    <script>
    ${js.value}
    <\/script>

    </body>
    </html>
    `;

    preview.srcdoc = codigo;
}

html.addEventListener("input", atualizar);
css.addEventListener("input", atualizar);
js.addEventListener("input", atualizar);

function maximizar(id){

    const editor = document.getElementById(id).parentElement;

    if(editor.classList.contains("max")){
        editor.classList.remove("max");
    }else{

        document.querySelectorAll(".editor").forEach(e=>{
            e.classList.remove("max");
        });

        editor.classList.add("max");
    }

}