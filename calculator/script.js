class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.readyToReset = false;
    this.clear();
  }

  clear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }

  delete() {
    if (this.currentOperand === '' && this.previousOperand !== '') {
      this.currentOperand = this.previousOperand
      this.operation = undefined
      this.previousOperand = ''
      return
    }
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === '.' && this.currentOperand.includes('.')) return;
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.compute();
    }
    if (operation === 'sqrt') {
      this.operation = operation;
      this.compute();
      return;
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = '';
  }

  compute() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (this.operation === 'sqrt') {
      if (isNaN(current)) return;
    } else {
      if (isNaN(prev) || isNaN(current)) return;
    }
    switch (this.operation) {
      case '+':
        computation = (prev + current);
        break
      case '-':
        computation = prev - current;
        break
      case '*':
        computation = prev * current;
        break
      case '÷':
        computation = prev / current;
        break
      case 'sqrt':
        if (current < 0) {
          this.readyToReset = true;
          this.currentOperand = "Error";
          this.operation = undefined;
          return
        }
        computation = Math.sqrt(current);
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = `sqrt(${current}) =`;
        return
      case 'power':
        computation = Math.pow(prev, current);
        break
      default:
        console.log('default')
        return;
    }
    this.readyToReset = true;
    this.currentOperand = Math.round(computation * 10000) / 10000;
    this.operation = undefined;
    this.previousOperand = '';
  }

  changeTheSign() {
    if (this.currentOperand === '0') return

    if (this.currentOperand === '') { this.currentOperand = '-' }
    else if (this.currentOperand === '-') { this.currentOperand = '' }
    else if (this.currentOperand.includes('-') && this.currentOperand.length > 1) {
      this.currentOperand = this.currentOperand.slice(1, this.currentOperand.length)
    } else {
      this.currentOperand = `-${this.currentOperand}`
    }
  }

  getDisplayNumber(number) {
    const stringNumber = number.toString()
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    if (this.currentOperand === '-0') {
      this.currentOperand = 0
    }
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null && this.operation !== 'power') {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else if (this.operation === 'power') {
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ^`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }

  updateDisplay1() {
    if (this.currentOperand === '-0') {
      this.currentOperand = 0
    }
    if (this.currentOperand === "Error") {
      this.currentOperandTextElement.innerText = this.currentOperand;
      return
    }

    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    this.previousOperandTextElement.innerText = this.previousOperand
  }

  updateDisplay2() {
    if (this.currentOperand === '-0') {
      this.currentOperand = 0
    }
    this.currentOperandTextElement.innerText =
      this.currentOperand
    if (this.operation != null) {
      this.previousOperandTextElement.innerText =
        `${this.previousOperand} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = ''
    }
  }
}


const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const sqrtButton = document.querySelector('[data-sqrt]')
const powerButton = document.querySelector('[data-power]')
const signButton = document.querySelector('[data-sign]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
  button.addEventListener("click", () => {

    if (calculator.previousOperand === "" &&
      calculator.currentOperand !== "" &&
      calculator.readyToReset) {
      calculator.currentOperand = "";
      calculator.readyToReset = false;
    }
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  })
})

equalsButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

sqrtButton.addEventListener('click', button => {
  calculator.chooseOperation('sqrt');
  calculator.updateDisplay1();
})

powerButton.addEventListener('click', button => {
  calculator.chooseOperation('power');
  calculator.updateDisplay();
})

signButton.addEventListener('click', button => {
  calculator.changeTheSign();
  calculator.updateDisplay2();
})