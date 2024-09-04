// script.js
let timerElement = document.getElementById("timer");
let wordCountElement = document.getElementById("word-count");
let wpmElement = document.getElementById("wpm");
let inputArea = document.getElementById("input-area");
let startButton = document.getElementById("start-button");
let textToType = document.getElementById("text-to-type").textContent;

let time = 0;
let timerInterval;

function startTimer() {
  time = 0;
  timerInterval = setInterval(() => {
    time++;
    timerElement.textContent = time;
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function calculateWPM() {
  let wordsTyped = inputArea.value.trim().split(/\s+/).length;
  let minutes = time / 60;
  let wpm = Math.round(wordsTyped / minutes);
  wordCountElement.textContent = wordsTyped;
  wpmElement.textContent = wpm;
}

startButton.addEventListener("click", () => {
  inputArea.value = "";
  inputArea.focus();
  startTimer();
  startButton.disabled = true;
});

inputArea.addEventListener("input", () => {
  matchExactWords();
  if (inputArea.value === textToType) {
    stopTimer();
    calculateWPM();
    startButton.disabled = false;
  }
});

function matchExactWords() {
  const singleTypedWordArr = inputArea.value.trim().split("");
  const singleParaWordArr = textToType.trim().split("");

  singleParaWordArr?.length > 0 &&
    singleParaWordArr?.map((singleParaWord) => {
      return singleParaWord;
    });
  singleTypedWordArr?.length > 0 &&
    singleTypedWordArr?.map((singleTypedWord) => {
      return singleTypedWord;
    });
}
