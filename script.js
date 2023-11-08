

const currentEntry = document.querySelector(".current-entry");
const previousEntries = document.querySelector(".previous-entries")

const numButtons = document.querySelectorAll(".number");
numButtons.forEach( (button) => {
    button.addEventListener('click', (event) => 
    numSelection(event.target));
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
    currentChars: 1,
    computationMade: false,
    error: false,
    compute() {
        switch (this.operator) {
            case "-":
                return +this.operand1 - +this.operand2
                break
            case "x":
                return +this.operand1 * +this.operand2
                break
            case "/":
                if (this.operand2 === "0") {
                    errorSequence()
                    break
                } else {
                return +this.operand1 / +this.operand2
                }
                break
            case "^":
                return Number(this.operand1) ** Number(this.operand2)
                break
            default: //+
            return +this.operand1 + +this.operand2
        }
    }
}


const invisible = document.querySelector(".invisible")
document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;
    
    if (code.includes("Digit")) {

        if (name === "^") {
            invisible.textContent = name;
            operatorSelection(invisible)
            invisible.textContent = ''
        }

        if (!isNaN(+name)) {
            invisible.textContent = name
            numSelection(invisible);
            invisible.textContent = ''
        }

    } else {
        switch (name) {
            case "-":
                invisible.textContent = name;
                operatorSelection(invisible)
                invisible.textContent = ''
                break
            case "x":
                invisible.textContent = name;
                operatorSelection(invisible)
                invisible.textContent = ''
                break
            case "/":
                invisible.textContent = name;
                operatorSelection(invisible)
                invisible.textContent = ''
                break
            case "+":
                invisible.textContent = name;
                operatorSelection(invisible)
                invisible.textContent = ''
                break
            case "=":
                equalsSelection()  
                break
            case "Enter":
                equalsSelection()   
                break
            case "Backspace":               
                backspaceEvent()
                break
            case "Escape":               
                allClear()
                break
            case "Alt":               
                posNegSelection()
                break
            case ".":
                pointSelection()
                break
            default:
                // doNothing(name)
        }
    }
}, false)


updateDisplay()

function doNothing(message = "nothing is being done") {
    console.log(message)
}

function updateDisplay() {
    currentEntry.textContent = `${currentEquation.operand1} ${currentEquation.operator} ${currentEquation.operand2}`
}

function numSelection(number) {
    number.blur()
    if (currentEquation.error === true) {
        allClear()
        return
    }

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
    operator.blur()
    if (currentEquation.error === true) {
        allClear()
        return
    }

    if (currentEquation.operand1.charAt(currentEquation.operand1.length-1) === ".") {
        currentEquation.operand1 = currentEquation.operand1.slice(0,-1)
    }


    if (currentEquation.operand2 === '') {
        currentEquation.operator = operator.textContent
    } else {
        equalsSelection()
    }

    currentEquation.currentChars++
    updateDisplay()

}

function posNegSelection() {
    if (currentEquation.error === true) {
        allClear()
        return
    }

    if (currentEquation.operator === '' && (currentEquation.operand1 != '0' && currentEquation.operand1 != '0.')) {
        if (currentEquation.operand1.charAt(0) !== '-') {
            currentEquation.operand1 = `-${currentEquation.operand1}`
        } else {
            console.log("test")
            currentEquation.operand1 = currentEquation.operand1.slice(1)
        }
    } else if (currentEquation.operator !== '') {
        if (currentEquation.operand2 !== '' && currentEquation.operand2 !== '0') {
            if (currentEquation.operand2.charAt(0) !== '-') {
                currentEquation.operand2 = `-${currentEquation.operand2}`     
            } else {
                console.log("test")
                currentEquation.operand2 = currentEquation.operand2.slice(1)
            }
        }
    }
    currentEquation.currentChars++
    updateDisplay()
}

function pointSelection() {
    if (currentEquation.error === true) {
        allClear()
        return
    }

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
    if (currentEquation.error === true) {
        allClear()
        return
    }

    if (currentEquation.operand2.charAt(currentEquation.operand2.length-1) === ".") {
        currentEquation.operand2 = currentEquation.operand2.slice(0,-1)
    }

    if (currentEquation.operator !== '' && currentEquation.operand2 !== '') {
        let result = Math.round((currentEquation.compute()+ Number.EPSILON) * 100) / 100;
        

        previousEntries.textContent = `${currentEquation.operand1} ${currentEquation.operator} ${currentEquation.operand2}`;
        currentEquation.operand1 = String(result)
        if (currentEquation.operand1 === "NaN") {
            result = "ERROR"
            return
        }

        currentEquation.computationMade = true
        currentEquation.operand2 = ''
        currentEquation.operator = ''
        currentEquation.currentChars = String(currentEquation.operand1).length;
    };

    
    updateDisplay();

};

function backspaceEvent() {
    this.blur()
    if (currentEquation.error === true) {
        allClear()
        return
    }

    if (currentEquation.operator === '') {
        if (currentEquation.operand1 === '0' || currentEquation.operand1.length === 1) {
            allClear()
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
    currentEquation.error = false,
    previousEntries.textContent = '';

    updateDisplay();
}


function errorSequence() {
    currentEquation.error = true;
    currentEquation.operand1 = 'ERORR';
    currentEquation.operand2 = '';
    currentEquation.operator = '';
    updateDisplay();
}
