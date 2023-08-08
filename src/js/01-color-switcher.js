  const body = document.querySelector("body");
  const startBtn = document.querySelector("button[data-start]");
  const stopBtn = document.querySelector("button[data-stop]");
  let timerId = null;

  startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  });
  
  
  stopBtn.addEventListener("click", () => {
    clearInterval(timerId);
  });

  function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }