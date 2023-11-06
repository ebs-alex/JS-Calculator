const title  = document.querySelector("#title");
title.style.textDecoration = "underline";
title.style.textUnderlineOffset = "4px";
title.style.textDecorationThickness = "1px";

const currentEntry = document.querySelector(".current-entry");

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






////functions

function numSelection(number) {
    currentEntry.textContent += number.textContent;
}

function operatorSelection(operator) {
    currentEntry.textContent += operator.textContent;
}

function pointSelection() {
    console.log(".");
};

function equalsSelection() {
    console.log("=");
};

function backspaceEvent() {
    console.log("backspace")
}

function allClear() {
    currentEntry.textContent = ""
}


