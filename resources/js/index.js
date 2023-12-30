window.onload = function () {
  generateCrosswordGrid();
  document.getElementById('fillGridButton').addEventListener('click', fillCrosswordGrid);
};


function generateCrosswordGrid() {
  const puzzleContainer = document.getElementById("puzzleContainer");

  for (let i = 0; i < 25; i++) {
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
  fetch('assets/five-by-five-crosswords.txt')
    .then(response => response.text())
    .then(text => {
      const lines = text.split('\n'); // Split text into lines
      const words = lines[getRandomInt(0, lines.length)].split(',').slice(0, 5); // Use the first line, split by comma
      fillCrosswordGridWithWords(words);
    })
    .catch(error => {
      console.error('Error loading the words:', error);
    });
}

function fillCrosswordGridWithWords(words) {
  const cells = document.querySelectorAll('.puzzle-item');
  cells.forEach((cell, index) => {
    // cell.value = index;
    // if (index < words.length) {
      cell.value = words[Math.floor(index / 5)][index % 5];
    // }
  });
}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}