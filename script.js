// Select DOM elements
const scrambledWordElement = document.getElementById("scrambled-word");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const messageElement = document.getElementById("message");
const newWordBtn = document.getElementById("new-word-btn");

let originalWord = ""; // The original word
let scrambledWord = ""; // The scrambled version

// Function to fetch a word from the API
async function fetchWord() {
  const response = await fetch("https://api.datamuse.com/words?sp=????"); // Words with 4 letters
  const words = await response.json();
  const randomWord = words[Math.floor(Math.random() * words.length)].word;

  return randomWord.toLowerCase();
}

// Function to scramble a word
function scrambleWord(word) {
  const letters = word.split("");
  for (let i = letters.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [letters[i], letters[j]] = [letters[j], letters[i]];
  }
  return letters.join("");
}

// Function to display a new word
async function newWord() {
  messageElement.textContent = "";
  guessInput.value = "";

  originalWord = await fetchWord();
  scrambledWord = scrambleWord(originalWord);
  scrambledWordElement.textContent = scrambledWord;
}

// Check the user's guess
function checkGuess() {
  const userGuess = guessInput.value.toLowerCase();

  if (userGuess === originalWord) {
    messageElement.textContent = "Correct!";
    messageElement.style.color = "green";
  } else {
    messageElement.textContent = "Try Again!";
    messageElement.style.color = "red";
  }
}

// Event listeners
submitBtn.addEventListener("click", checkGuess);
newWordBtn.addEventListener("click", newWord);

// Initialize the game with a new word
newWord();
