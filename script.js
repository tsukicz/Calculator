const numberButtons = document.querySelectorAll('[data-number]') //pegar todos os buttons da nossa calculadora
const operationButtons = document.querySelectorAll('[data-operator]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

//classe para guardar o previous e o operador usado no cálculo
class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    formatDisplayNumber(number) {
        const stringNumber = number.toString();
    
        const integerDigits = parseFloat(stringNumber.split(".")[0]);
        const decimalDigits = stringNumber.split(".")[1];
    
        let integerDisplay;
    
        if (isNaN(integerDigits)) {
          integerDisplay = "";
        } else {
          integerDisplay = integerDigits.toLocaleString("en", {
            maximumFractionDigits: 0,
          });
        }
    
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
      }
    

    calculate() {
        let result;

        const _previousOperand = parseFloat(this.previousOperand)
        const _currentOperand = parseFloat(this.currentOperand)

        if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

        switch (this.operation) {
            case "+":
                result = _previousOperand + _currentOperand;
                break
            case "-":
                result = _previousOperand - _currentOperand;
                break
            case "÷":
                result = _previousOperand / _currentOperand;
                break
            case "x":
                result = _previousOperand * _currentOperand;
                break
            default:
                return;
        }

        this.currentOperand = result; // armazena o cálculo em currentOperand
        this.operation = undefined;
        this.previousOperand = "";
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // passa o valor digitado para o previous deixando o current para o novo valor a ser digitado

    chooseOperation(operation) {
        if (this.currentOperand === "") return;

        if(this.previousOperand !== '') {
            this.calculate();
        }

        this.operation = operation;

        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    // adiciona um número convertido em string ao final do valor atual de this.currentOperand, atualizando assim o valor dessa propriedade

    appendNumber(number) {
        if (this.currentOperand.includes(".") && number === ".") return;

        this.currentOperand = `${this.currentOperand}${number.toString()}`;
    }

    clear() {
        this.currentOperand = '';  //numeros em si
        this.previousOperand = '';
        this.operation = undefined;
    }

    // para atualizar na tela, por isso é chamada no final 

    updateDisplay() {
        this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
          this.previousOperand
        )} ${this.operation || ""}`;
        this.currentOperandTextElement.innerText = this.formatDisplayNumber(
          this.currentOperand
        );
      }
}


// instanciando => utiliza o "new ...() {}"

const calculator = new Calculator(
    previousOperandTextElement,
    currentOperandTextElement
);

// Quando um botão é clicado, ele chama a função appendNumber do objeto calculator, passando o texto do botão como argumento

for (const numberButton of numberButtons) {
    numberButton.addEventListener('click', () => {
        calculator.appendNumber(numberButton.innerText);
        calculator.updateDisplay();
    });
}

for (const operationButton of operationButtons) {
    operationButton.addEventListener('click', () => {
        calculator.chooseOperation(operationButton.innerText); // atualiza apenas na classe, por isso precisa do "calculator.updateDisplay()"
        calculator.updateDisplay(); // para atualizar na tela, por isso é chamada
    });
}

// para o botão AC, dando clear na nossa calculadora

allClearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay()
})

equalsButton.addEventListener('click', () => {
    calculator.calculate();
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay()
})





