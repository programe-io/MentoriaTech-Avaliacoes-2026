// BLOG DA BELLYNHA - JAVASCRIPT

const idiomas = {

  pt: {
    titulo: "Blog da Bellynha",
    descricao: "Melhores dicas de cabelo",
    sobre: "Sobre",
    perfil: "bellynha diva",
    galeria: "Galeria",

    post1Titulo: "5 penteados fáceis para escola",
    post1Texto:
      "Aprenda penteados rápidos e lindos para usar na escola, festa ou passeio. Tranças, coque simples e rabo de cavalo estiloso estão super na moda!",

    post2Titulo: "Como deixar o cabelo brilhoso",
    post2Texto:
      "Use hidratação semanal, óleo capilar e evite água muito quente. Pequenos cuidados fazem o cabelo ficar saudável e cheio de brilho."
  },

  en: {
    titulo: "Bellynha's Blog",
    descricao: "Best hair tips",
    sobre: "About",
    perfil: "bellynha diva",
    galeria: "Gallery",

    post1Titulo: "5 easy hairstyles for school",
    post1Texto:
      "Learn quick and beautiful hairstyles for school, parties or walks. Braids, buns and stylish ponytails are trending!",

    post2Titulo: "How to make your hair shiny",
    post2Texto:
      "Use weekly hydration, hair oil and avoid very hot water. Small care routines make your hair healthy and shiny."
  },

  es: {
    titulo: "Blog de Bellynha",
    descricao: "Los mejores consejos para el cabello",
    sobre: "Sobre",
    perfil: "bellynha diva",
    galeria: "Galería",

    post1Titulo: "5 peinados fáciles para la escuela",
    post1Texto:
      "Aprende peinados rápidos y hermosos para usar en la escuela, fiestas o paseos. ¡Las trenzas y coletas están muy de moda!",

    post2Titulo: "Cómo dejar el cabello brillante",
    post2Texto:
      "Usa hidratación semanal, aceite capilar y evita el agua muy caliente. Los pequeños cuidados dejan el cabello saludable y brillante."
  }

};

function trocarIdioma(idioma){

  document.getElementById("titulo").innerText =
    idiomas[idioma].titulo;

  document.getElementById("descricao").innerText =
    idiomas[idioma].descricao;

  document.getElementById("sobre").innerText =
    idiomas[idioma].sobre;

  document.getElementById("perfilTexto").innerText =
    idiomas[idioma].perfil;

  document.getElementById("galeria").innerText =
    idiomas[idioma].galeria;

  document.getElementById("post1Titulo").innerText =
    idiomas[idioma].post1Titulo;

  document.getElementById("post1Texto").innerText =
    idiomas[idioma].post1Texto;

  document.getElementById("post2Titulo").innerText =
    idiomas[idioma].post2Titulo;

  document.getElementById("post2Texto").innerText =
    idiomas[idioma].post2Texto;
}