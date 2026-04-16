let startTime, elapsedTime = 0, timerInterval;

function timeToString(time) {
  let diffInHrs = time / 3600000;
  let hh = Math.floor(diffInHrs);

  let diffInMin = (diffInHrs - hh) * 60;
  let mm = Math.floor(diffInMin);

  let diffInSec = (diffInMin - mm) * 60;
  let ss = Math.floor(diffInSec);

  let diffInMs = (diffInSec - ss) * 100;
  let ms = Math.floor(diffInMs);

  return `${hh.toString().padStart(2, "0")}:${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

function start() {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    document.getElementById("display").innerHTML = timeToString(elapsedTime);
  }, 10);
}

function pause() {
  clearInterval(timerInterval);
}

function reset() {
  clearInterval(timerInterval);
  document.getElementById("display").innerHTML = "00:00:00.00";
  elapsedTime = 0;
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  let li = document.createElement("li");
  li.innerText = `Volta: ${timeToString(elapsedTime)}`;
  document.getElementById("laps").appendChild(li);
}