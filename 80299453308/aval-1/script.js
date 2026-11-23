/* ==========================================================
   DADOS DA TURMA — edite este arquivo para mudar nomes e textos
   ----------------------------------------------------------
   • Para preencher uma vaga "A definir", troque o nome entre aspas.
   • "bio" é a frase que aparece no perfil do aluno (opcional).
   • Os posts que ficam para sempre no blog vão em POSTS_FIXOS.
   ========================================================== */

const TURMA = {
  nome: "Blog da Turma",
  descricao: "O espaço de cada aluno para publicar textos, trabalhos e ideias.",
  ano: 2026
};

const ALUNOS = [
  { nome: "Alan Ricardo" },
  { nome: "Aline" },
  { nome: "Ananda" },
  { nome: "Larissa" },
  { nome: "Alisson Vinícius" },
  { nome: "Cíntia" },
  { nome: "Lara" },
  { nome: "Carla" },
  { nome: "José Eduardo" },
  { nome: "Willame" },
  { nome: "Tyson Alves" },
  { nome: "Victor" },
  { nome: "Misael" },
  { nome: "João Anderson" },
  { nome: "Marcos André" },
  { nome: "Sábio" },
  { nome: "Léo Vinícius" },
  { nome: "Maria Eloá" },
  { nome: "Tyson Michel" },
  { nome: "Eric Ricardo" },
  { nome: "Helder" },
  { nome: "Weslane" },
  { nome: "João Guilherme" },
  { nome: "Isabelle" },
  { nome: "Gustavo" },
  { nome: "Maria Clara" },
  { nome: "Emanuele" },
  { nome: "Ramalho" },
  { nome: "Carla (2)" },   // a Carla foi citada duas vezes: troque pelo sobrenome
  { nome: "Maria Riviane" },
  { nome: "Maria Lúcia" },
  { nome: "Luana" },
  { nome: "Carlos Eduardo" }

  // Para adicionar alguém ou preencher uma vaga sem nome, use:
  // { nome: "A definir", vaga: 34 },
];

/* Posts permanentes (aparecem para todo mundo que abrir o blog).
   "autor" deve ser exatamente o nome do aluno na lista acima.
   Exemplo:
   {
     autor: "Aline",
     titulo: "Meu primeiro trabalho",
     resumo: "Uma frase curta sobre o post.",
     tags: ["trabalho"],
     data: "2026-11-23",
     conteudo: `Texto do post. Use ## para subtítulo e - para listas.`
   }
*/
const POSTS_FIXOS = [];