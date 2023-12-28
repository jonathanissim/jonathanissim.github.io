window.onload = function() {
  generateCrosswordGrid();
};


function generateCrosswordGrid() {
  const puzzleContainer = document.getElementById("puzzleContainer");

  for (let i = 0; i < 25; i++) {
    const puzzleItem = document.createElement("div");
    puzzleItem.classList.add("puzzle-item");
    puzzleItem.textContent = i;
    puzzleContainer.appendChild(puzzleItem);
  }
}
