// import KioskBoard from 'kioskboard';
import "../../node_modules/kioskboard/dist/kioskboard-2.3.0.min.js";
// import "../../node_modules/kioskboard/dist/kioskboard-2.3.0.min.css";

// const KioskBoard = require('kioskboard');


const CROSSWORD_SIZE = 5;


window.onload = function () {
  generateCrosswordGrid();
  document.getElementById('fillGridButton').addEventListener('click', fillCrosswordGrid);

  initializeKeyboard();
  runKeyboard();  

};


function initializeKeyboard() {
  // Initialize KioskBoard (default/all options)

  KioskBoard.init({
    keysArrayOfObjects: null,

    keysJsonUrl: '../../node_modules/kioskboard/dist/kioskboard-keys-english.json',

    language: 'en',

    // The theme of keyboard => "light" || "dark" || "flat" || "material" || "oldschool"
    theme: 'dark',

    // Scrolls the document to the top or bottom(by the placement option) of the input/textarea element. Prevented when "false"
    autoScroll: true,

    // Uppercase or lowercase to start. Uppercased when "true"
    capsLockActive: true,

    /*
    * Allow or prevent real/physical keyboard usage. Prevented when "false"
    * In addition, the "allowMobileKeyboard" option must be "true" as well, if the real/physical keyboard has wanted to be used.
    */
    allowRealKeyboard: false,

    // Allow or prevent mobile keyboard usage. Prevented when "false"
    allowMobileKeyboard: false,

    // CSS animations for opening or closing the keyboard
    cssAnimations: true,

    // CSS animations duration as millisecond
    cssAnimationsDuration: 100,

    // CSS animations style for opening or closing the keyboard => "slide" || "fade"
    cssAnimationsStyle: 'slide',

    // Enable or Disable Spacebar functionality on the keyboard. The Spacebar will be passive when "false"
    keysAllowSpacebar: false,

    // Text of the space key (Spacebar). Without text => " "
    keysSpacebarText: 'Space',

    // Font family of the keys
    keysFontFamily: 'sans-serif',

    // Font size of the keys
    keysFontSize: '20px',

    // Font weight of the keys
    keysFontWeight: 'normal',

    // Size of the icon keys
    keysIconSize: '20px',

    // Text of the Enter key (Enter/Return). Without text => " "
    keysEnterText: 'Enter',

    // The callback function of the Enter key. This function will be called when the enter key has been clicked.
    keysEnterCallback: undefined,

    // The Enter key can close and remove the keyboard. Prevented when "false"
    keysEnterCanClose: true,
  });
}

function runKeyboard() {
  // Select the input or the textarea element(s) to run the KioskBoard
  KioskBoard.run('.js-kioskboard-input');
}
//==============================

function generateCrosswordGrid() {
  const puzzleContainer = document.getElementById("puzzleContainer");

  for (let i = 0; i < CROSSWORD_SIZE * CROSSWORD_SIZE; i++) {
    const puzzleCell = document.createElement("input");
    puzzleCell.classList.add("puzzle-item");
    puzzleCell.classList.add("js-kioskboard-input");

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
      // Not sure why but lines.length -1 still results in parsing an empty line.
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