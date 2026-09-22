const mensagens = [

"O sucesso não acontece da noite para o dia. Ele é construído com dedicação, aprendizado e coragem para enfrentar desafios.",

"Cada dia é uma nova oportunidade para aprender, crescer e se tornar uma pessoa melhor do que ontem.",

"Os sonhos parecem distantes apenas para quem desiste. Continue caminhando e você chegará ao seu destino.",

"A bondade é uma das maiores qualidades que alguém pode ter. Pequenos gestos podem transformar a vida de outra pessoa.",

"Nunca deixe que o medo impeça você de tentar. Grandes conquistas começam com um simples passo."

];

function trocarMensagem(){

let numero = Math.floor(Math.random() * mensagens.length);

document.getElementById("mensagem").innerHTML = mensagens[numero];

}
