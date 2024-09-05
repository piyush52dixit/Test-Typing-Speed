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
  let typedText = inputArea.value; // Don't trim, to catch incomplete words
  let typedWords = typedText.split(/\s+/); // Split typed text by spaces
  let originalWords = textToType.trim().split(/\s+/); // Split original text

  let highlightedText = "";
  let typedLength = typedWords.length;

  for (let i = 0; i < typedWords.length; i++) {
    let typedWord = typedWords[i];
    let originalWord = originalWords[i] || ""; // Handle extra typed words

    // Compare partially typed word with original word
    if (originalWord.startsWith(typedWord)) {
      highlightedText += `<span style="color: green;">${typedWord}</span> `;
    } else {
      highlightedText += `<span style="color: red;">${typedWord}</span> `;
    }
  }

  // Add remaining original words in grey
  if (typedWords.length < originalWords.length) {
    for (let i = typedWords.length; i < originalWords.length; i++) {
      highlightedText += `<span style="color: grey;">${originalWords[i]}</span> `;
    }
  }

  document.getElementById("highlighted-text").innerHTML = highlightedText;
}

inputArea.addEventListener("input", matchExactWords);
