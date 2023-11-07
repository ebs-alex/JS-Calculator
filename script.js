

const currentEntry = document.querySelector(".current-entry");
const previousEntries = document.querySelector(".previous-entries")

const numButtons = document.querySelectorAll(".number");
numButtons.forEach( (button) => {
    button.addEventListener('click', (event) => numSelection(event.target));
});

const operators = document.querySelectorAll(".operator");
operators.forEach( (button) => {
    button.addEventListener('click',(event) => operatorSelection(event.target))
});

const allClearBtn = document.querySelector("#all-clear");
allClearBtn.addEventListener('click', allClear);

const backspaceBtn = document.querySelector("#backspace");
backspaceBtn.addEventListener('click', backspaceEvent);

const pointBtn = document.querySelector("#point");
pointBtn.addEventListener("click", pointSelection);

const equalsBtn = document.querySelector("#equals");
equalsBtn.addEventListener("click", equalsSelection);

const posNegBtn = document.querySelector("#posNeg");
posNegBtn.addEventListener("click", posNegSelection)



let currentEquation = {
    operand1: "0",
    operator: '',
    operand2: '',
    compute() {
        switch (this.operator) {
            case "-":
                return +this.operand1 - +this.operand2
                break
            case "x":
                return +this.operand1 * +this.operand2
                break
            case "/":
                return +this.operand1 / +this.operand2
                break
            case "^":
                return Number(this.operand1) ** Number(this.operand2)
                break
            default: //+
            return +this.operand1 + +this.operand2
        }
    }
}

// let operand1 = currentEquation.operand1;
// let operand2 = currentEquation.operand2;
// let operator = currentEquation.operator;

// let previousEquation = {
//     operand1: 0,
//     operator: "+",
//     operand2: 0,
//     result: 0
// }


updateDisplay()

////functions

function doNothing(message = "nothing is being done") {
    console.log(message)
}

function updateDisplay() {
    currentEntry.textContent = `${currentEquation.operand1} ${currentEquation.operator} ${currentEquation.operand2}`
}

function numSelection(number) {
    // currentEntry.textContent += number.textContent;

    if (currentEquation.operator === '') {
        if (currentEquation.operand1 === "0") {
            currentEquation.operand1 = number.textContent    
        } else {
        currentEquation.operand1 += number.textContent
        }
    } else {
        currentEquation.operand2 === '' ?
        currentEquation.operand2 = number.textContent
        : currentEquation.operand2 += number.textContent
    }

    updateDisplay()
}

function operatorSelection(operator) {

    if (currentEquation.operand2 === '') {
        currentEquation.operator = operator.textContent
    } else {
        doNothing("in future this will trigger 'computation' ")
    }

    updateDisplay()

}

function posNegSelection() {
    console.log("+/-");
}

function pointSelection() {
    console.log(".");
};

function equalsSelection() {

    if (currentEquation.operator !== '' && currentEquation.operand2 !== '') {
        let result = currentEquation.compute()
        previousEntries.textContent = `${currentEquation.operand1} ${currentEquation.operator} ${currentEquation.operand2}`;
        currentEquation.operand1 = result
        currentEquation.operand2 = ''
        currentEquation.operator = ''
    };


    updateDisplay();

};

function backspaceEvent() {

    if (currentEquation.operator === '') {
        if (currentEquation.operand1 === '0' || currentEquation.operand1.length === 1) {
            currentEquation.operand1 = '0';
            doNothing("backspace on operand1 == '0' ")
        } else {
            currentEquation.operand1 = currentEquation.operand1.slice(0,-1)
        }
    } else if (currentEquation.operand2 === '') {
        currentEquation.operator = '';
    } else {
        if (currentEquation.operand2.length > 1) {
            currentEquation.operand2 = currentEquation.operand2.slice(0,-1)
        } else {
            currentEquation.operand2 = ''
        }
    }

    updateDisplay()

}

function allClear() {
    currentEquation.operand1 = '0'
    currentEquation.operand2 = ''
    currentEquation.operator = ''
    previousEntries.textContent = ''

    updateDisplay()
}


