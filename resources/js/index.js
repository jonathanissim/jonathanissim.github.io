window.onload = function () {
  generateCrosswordGrid();
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
