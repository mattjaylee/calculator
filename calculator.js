const calculator = document.getElementById('calculatorContainer');
const display = document.createElement('div');
//save array of the symbols which will decorate the buttons
let buttonFaces = ['7', '8', '9', '/',
'4', '5', '6', '*', '1',
'2', '3', '-', '0', '.', '+', '=', 'delete', 'clear']
function makeButtons(){
  const buttonArea = document.createElement('div');
  buttonArea.classList.add('buttonArea');
  calculator.appendChild(buttonArea);
  //loops through the buttonFaces array and creates a div with the textContent
  //and class of the div being the array element
  for (i = 0; i < buttonFaces.length; i++) {
    let buttonDiv = document.createElement('div');
    buttonDiv.classList.add(buttonFaces[i], 'button');
    buttonDiv.textContent = buttonFaces[i];
    //creates eventListeners for each button to add the button clicked to the
    //display textContent. If = is pressed it performs the operate function
    //on the displayContent
    buttonDiv.addEventListener('click',  function(){
      if (this.classList.item(0) == '=') {
        display.textContent = operate(display.textContent);
        console.log(display.textContent);
      }
      //clears display
      else if (this.classList.item(0) == 'clear'){
        display.textContent = '';
      }
      //backspaces display
      else if (this.classList.item(0) == 'delete'){
        display.textContent = display.textContent.slice(0, display.textContent.length - 1);
      }
      else {
        display.textContent += this.classList.item(0);
        console.log(display.textContent);
      }
    })
    buttonArea.appendChild(buttonDiv);
  }
}
function makeDisplay(){
  display.classList.add('display');
  calculator.appendChild(display);
}

makeDisplay();
makeButtons();

//will loop through the input until it operates all the muliplication and
//division operations and leaves only addition and subtraction then will
//move on to finish with addition and subtraction and return the answer
let decimal = 2;
function operate(input){
  let lastOperator;
  let nextOperator;
  let operation;
  //checks to see if the first input is a number or operator
  if (isNaN(input[0])){
    return 'Please enter a valid equation';
  }
  for (let i = 1; i < input.length; i++){
    if (input[i] == '*' || input[i] == '/'){
      lastOperator = findPreviousOperator(i, input);
      if (lastOperator == 'invalid'){
        return 'Please enter a valid operation';
        break;
      }
      nextOperator = findNextOperator(i, input);
      operation = findOperation(input, i, lastOperator, nextOperator);
      if (operation == 'cannot divide by 0'){
        return 'Cannot divide by 0';
        break;
      }
      input = input.slice(0, lastOperator + 1) + operation + input.slice(nextOperator);
      i = 0;
    }
  }
  for (let i = 1; i < input.length; i++){
    if (input[i] == '+' || input[i] == '-'){
      lastOperator = findPreviousOperator (i, input);
      if (lastOperator == 'invalid'){
        return 'Please enter a valid operation';
        break;
      }
      nextOperator = findNextOperator(i, input);
      operation = findOperation(input, i, lastOperator, nextOperator);
      input = input.slice(0, lastOperator + 1) + operation + input.slice(nextOperator);
      i = 0;
    }
  }
  if (input == NaN) {
    return 'invalid';
  }
  //this gives 2 decimal points of precision as standard when required, but
  //if the answer is an integer it will return an integer instead of a float
  //ending in .00
  else{
    input = parseFloat(input).toFixed(decimal);
    if (input[input.length - 1] == '0' && input[input.length - 2] == '0'){
      return parseInt(input);
    }
    else {
      return input;
    }
  }
}

//loops through the string before the selected operation backwards and returns
//either the index of the previous operator or if the selected operation is
//the first one it will return -1
function findPreviousOperator(index, string){
  for (let i = index - 1; i >= 0; i--) {
    if (isNaN(string[i]) && string[i] != '.'){
      //checks to see if an operator or period directly preceeds the current
      //operation being checked
      if (isNaN(string[i - 1]) || string[i - 1 == '.']){
        return 'invalid';
        break;
      }
      else {
        return i;
      }
    }
    else if (i == 0){
      return -1;
    }
  }
}

//loops through the rest of the string after selected operation and returns
//either the index of the next operator or if selected operation is the last
//one it will return string.length
function findNextOperator(index, string){
  for (let i = index + 1; i < string.length; i++){
    if (isNaN(string[i]) && string[i] != '.'){
      return i;
    }
    else if (i == string.length - 1){
      return (string.length);
    }
  }
}

//saves the precision of the answer in the decimal variable according to the
//user inputted precision
function findDecimal(input){
  for (i = 0; i < input.length; i++){
    if (input[i] == '.'){
      let newDecimal = input.length -i - 1;
      if (newDecimal > decimal){
        decimal = newDecimal;
      }
    }
  }
}
//separates the number strings in the operation before and after the operator
//then performs the operation and returns the answer to the single operation
function findOperation(string, operator, lastOperator, nextOperator){
  let innerOperation;
  let firstHalf = string.slice(lastOperator + 1, operator);
  let lastHalf = string.slice(operator + 1, nextOperator);
  //calls the findDecimal function to save the operation precision
  findDecimal(firstHalf);
  findDecimal(lastHalf);
  switch(string[operator]){
    case '/':
      if (lastHalf === '0'){
        return 'cannot divide by 0';
        break;
      }
      else {
        innerOperation = parseFloat(firstHalf) / parseFloat(lastHalf);
        return innerOperation;
        break;
      }
    case '*':
      innerOperation = parseFloat(firstHalf) * parseFloat(lastHalf);
      return innerOperation;
      break;
    case '+':
      innerOperation = parseFloat(firstHalf) + parseFloat(lastHalf);
      return innerOperation;
      break;
    case '-':
      innerOperation = parseFloat(firstHalf) - parseFloat(lastHalf);
      return innerOperation;
      break;
  }
}
