(() => {
  const updateCurrentTime = () => {
    const clock = document.getElementById("currentTime");
    if (clock) {
      clock.textContent = new Date().toUTCString();
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", updateCurrentTime, { once: true });
  } else {
    updateCurrentTime();
  }

  window.setInterval(updateCurrentTime, 1000);
})();
