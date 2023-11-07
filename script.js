

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
    maxChars: 16,
    currentChars: 1,
    computationMade: false,
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
        if (currentEquation.currentChars >= 11) {
            return
        }
        if (currentEquation.operand1 === "0") {
            currentEquation.operand1 = number.textContent    
        } else {
        currentEquation.operand1 += number.textContent
        }
    } else {
        if (currentEquation.currentChars >= 14) {
            return
        }
        currentEquation.operand2 === '' ?
        currentEquation.operand2 = number.textContent
        : currentEquation.operand2 += number.textContent
    }

    currentEquation.currentChars++
    updateDisplay()
}

function operatorSelection(operator) {

    if (currentEquation.operand2 === '') {
        currentEquation.operator = operator.textContent
    } else {
        equalsSelection()
    }

    currentEquation.currentChars++
    updateDisplay()

}

function posNegSelection() {

    if (currentEquation.operator === '' && currentEquation.operand1 != '0') {
        if (currentEquation.operand1.charAt(0) !== '-') {
            currentEquation.operand1 = `-${currentEquation.operand1}`
        }
    } else if (currentEquation.operator !== '') {
        if (currentEquation.operand2 !== '' & currentEquation.operand2 !== '0') {
            if (currentEquation.operand2.charAt(0) !== '-') {
                currentEquation.operand2 = `-${currentEquation.operand2}`     
            }
        }
    }
    currentEquation.currentChars++
    updateDisplay()
}

function pointSelection() {
    console.log(".");

    if (currentEquation.operator === '') {
        if (currentEquation.operand1 == '0'){
            currentEquation.operand1 = '0.'
        } else if (!currentEquation.operand1.includes('.')) {
            currentEquation.operand1 += '.'
        }
    } else {
        if (currentEquation.operand2 == ''){
            currentEquation.operand2 = '0.'
        } else if (!currentEquation.operand2.includes('.')) {
            currentEquation.operand2 += '.'
        }
    }

    currentEquation.currentChars++
    updateDisplay()
};

function equalsSelection() {

    if (currentEquation.operator !== '' && currentEquation.operand2 !== '') {
        let result = Math.round((currentEquation.compute()+ Number.EPSILON) * 100) / 100  
        previousEntries.textContent = `${currentEquation.operand1} ${currentEquation.operator} ${currentEquation.operand2}`;
        currentEquation.operand1 = result
        currentEquation.computationMade = true
        currentEquation.operand2 = ''
        currentEquation.operator = ''
        currentEquation.currentChars = String(currentEquation.operand1).length;
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

    currentEquation.currentChars--
    updateDisplay()

}

function allClear() {
    currentEquation.operand1 = '0';
    currentEquation.operand2 = '';
    currentEquation.operator = '';
    currentEquation.computationMade = false;
    currentEquation.currentChars = 1;
    previousEntries.textContent = '';

    updateDisplay();
}


