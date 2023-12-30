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
  // Select all cells in the crossword grid
  const cells = document.querySelectorAll('.puzzle-item');

  // Iterate through each cell and fill it with 'a'
  cells.forEach(cell => {
    cell.value = 'a';
  });
}
