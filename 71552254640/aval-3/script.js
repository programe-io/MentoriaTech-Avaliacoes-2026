const dicas = [

"Pratique pelo menos 30 minutos de atividade física diariamente.",

"Beba bastante água ao longo do dia.",

"Tenha uma alimentação rica em frutas e verduras.",

"Mantenha a vacinação sempre atualizada.",

"Durma entre 7 e 9 horas por noite.",

"Lave as mãos frequentemente para evitar doenças.",

"Cuide também da sua saúde mental, reservando momentos de descanso."

];

function mostrarDica(){

let numero = Math.floor(Math.random() * dicas.length);

document.getElementById("mensagem").innerHTML = dicas[numero];

}