const CROSSWORD_SIZE = 5;


window.onload = function () {
  generateCrosswordGrid();
  document.getElementById('fillGridButton').addEventListener('click', fillCrosswordGrid);
};


function generateCrosswordGrid() {
  const puzzleContainer = document.getElementById("puzzleContainer");

  for (let i = 0; i < CROSSWORD_SIZE * CROSSWORD_SIZE; i++) {
    const puzzleCell = document.createElement("input");
    puzzleCell.classList.add("puzzle-item");

    // Replace character on input
    puzzleCell.addEventListener("input", function () {
      this.value = this.value.charAt(this.value.length - 1);
    });

    puzzleContainer.appendChild(puzzleCell);
  }
}


function fillCrosswordGrid() {
  // fetch('assets/five-by-five-crosswords.txt')
  fetch('assets/test.txt')
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n');
      const length_without_trailing_newline = lines.length - 2;
      const words = lines[getRandomInt(0, length_without_trailing_newline)].split(',').slice(0, CROSSWORD_SIZE);
      fillCrosswordGridWithWords(words);
    })
    .catch(error => {
      console.error('Error loading the words:', error);
    });
}

function fillCrosswordGridWithWords(words) {
  const cells = document.querySelectorAll('.puzzle-item');
  cells.forEach((cell, index) => {
    cell.value = words[Math.floor(index / CROSSWORD_SIZE)][index % CROSSWORD_SIZE];
  });
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}