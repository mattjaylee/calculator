const calculator = document.getElementById('calculatorContainer');
let buttonFaces = ['seven', 'eight', 'nine', 'divide',
'four', 'five', 'six', 'multiply', 'one',
'tow', 'three', 'minus', 'zero', 'point', 'plus', 'equals', 'delete', 'clear']
function makeButtons() {
  const buttonArea = document.createElement('div');
  buttonArea.classList.add('buttonArea');
  calculator.appendChild(buttonArea);
  for (i = 0; i < buttonFaces.length; i++) {
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add(buttonFaces[i]);
    buttonDiv.textContent = buttonFaces[i];
    buttonArea.appendChild(buttonDiv);
  }
}
function makeDisplay() {
  const display = document.createElement('div');
  display.classList.add('display');
  calculator.appendChild(display);
}
makeDisplay();
makeButtons();
