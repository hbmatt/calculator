const add = (a,b) => a + b;
const subtract = (a,b) => a - b;
const multiply = (a,b) => a * b;
const divide = (a,b) => a / b;

function operate(operation,a,b) {
    let result = (operation == add) ? add(a,b) :
        (operation == subtract) ? subtract(a,b) :
        (operation == multiply) ? multiply(a,b) :
        (operation == divide) ? divide(a,b) :
        'ERROR';
    return result.toString();
};


const display = document.querySelector('.calc-display');
const numbers = document.querySelectorAll('.number');
const backspace = document.querySelector('#delete');
const clear = document.querySelector('#clear');
const clearEntry = document.querySelector('#clear-entry');
const operators = document.querySelectorAll('.operator');
const equals = document.querySelector('#equals');

let displayValue = '';
let storedValue = NaN;
let operation = '';
let finalResult = '';

function clearAll() {
    displayValue = '';
    finalResult = '';
    operation = '';
    storedValue = NaN;
    display.textContent = displayValue;
};

function clearDisplay() {
    displayValue = '';
    display.textContent = displayValue;
};


operators.forEach((button) => {
    button.addEventListener('click', () => {
        if (isNaN(storedValue) === false) {
            a = Number(storedValue);
            b = Number(displayValue);
            storedValue = operate(operation,a,b);
        } else {
            storedValue = displayValue;
        };

        operation = (button.classList.contains('add')) ? add :
        (button.classList.contains('subtract')) ? subtract:
        (button.classList.contains('multiply')) ? multiply :
        (button.classList.contains('divide')) ? divide :
        'ERROR';

        displayValue = '';
        display.textContent = storedValue;
    });
});

numbers.forEach((button) => {
    button.addEventListener('click', () => {
        if (displayValue.indexOf('.') >= 0 && displayValue.length > 6) {
            return displayValue;
        } else if (displayValue.indexOf('.') < 0 && displayValue.length > 5) {
            return displayValue;
        } else {
            displayValue += button.textContent;
            display.textContent = displayValue;
        };
        document.querySelector('.decimal').disabled = (displayValue.indexOf('.') >= 0) ? true : false;
    });
});

backspace.addEventListener('click', () => {
    displayValue = displayValue.slice(0,-1);
    display.textContent = displayValue;
});

clear.addEventListener('click', clearAll);
clearEntry.addEventListener('click', clearDisplay);

equals.addEventListener('click', () => {
    a = Number(storedValue);
    b = Number(displayValue);
    if (operation == divide && b == 0) {
        alert("Now, what do you think you're doing? Start over.");
    } else {
        finalResult = operate(operation,a,b);

        if (finalResult.indexOf('.') >= 0 && finalResult.length > 7) {
            finalResult = finalResult.slice(0,7);
        } else if (finalResult.length > 6) {
            finalResult = finalResult.slice(0,6);
        };
        display.textContent = finalResult;
    };
    finalResult = '';
    displayValue = '';
    storedValue = NaN;
});

