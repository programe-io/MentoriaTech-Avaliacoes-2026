let saldo = 0;

function spin() {
  let result = document.getElementById("result");
  let prize = document.getElementById("prize");
  let money = document.getElementById("money");

  // animação de giro
  result.classList.remove("spin");
  void result.offsetWidth;
  result.classList.add("spin");

  setTimeout(() => {
    let number = Math.floor(Math.random() * 100) + 1;

    result.textContent = "🎲";

    // 🎰 sistema de prêmios
    if (number <= 20) {
      saldo += 10;
      prize.textContent = "🍬 Você ganhou R$10";
    } 
    else if (number <= 40) {
      saldo += 20;
      prize.textContent = "🍫 Você ganhou R$20";
    } 
    else if (number <= 60) {
      saldo += 50;
      prize.textContent = "🎮 Você ganhou R$50";
    } 
    else if (number <= 85) {
      saldo -= 30;
      prize.textContent = "💀 Você perdeu R$30";
    } 
    else if (number <= 99) {
      saldo += 100;
      prize.textContent = "💰 JACKPOT R$100!";
    } 
    else {
      saldo += 500;
      prize.textContent = "🏆 MEGA JACKPOT R$500!!!";
    }

    // não deixar saldo negativo
    if (saldo < 0) saldo = 0;

    // atualizar tela
    money.textContent = "💰 Saldo: R$ " + saldo;

  }, 400);
}