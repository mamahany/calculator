const buttons = document.querySelectorAll('.buttons button');
const display = document.querySelector('.display');
let firstNumber = "", secondNumber = "", operator = "", result = "";
function operate(operator, firstNumber, secondNumber){
    firstNumber = parseFloat(firstNumber);
    secondNumber = parseFloat(secondNumber);
    switch(operator){
        case "+":
            return Math.round((firstNumber+secondNumber) * 1000) / 1000;
        case "-":
            return Math.round((firstNumber-secondNumber) * 1000) / 1000;
        case "*":
            return Math.round((firstNumber*secondNumber) * 1000) / 1000;
        case "/":
            if(secondNumber === 0){
                return "NOOOO!";
            }else{
                return Math.round((firstNumber/secondNumber) * 1000) / 1000;
            }
    }
}


function updateDisplay(element){
    let content = display.textContent; 
    if (content === "NOOOO!") {
        display.textContent = "0";
        content = display.textContent;
    }
    switch(element){
        case "+":
        case "-":
        case "*":
        case "/":
            if(!operator && content !== "0"){
                operator = element;
                firstNumber = content;
                display.textContent += operator;
            }else if(firstNumber && secondNumber && operator){
                result = String(operate(operator,firstNumber,secondNumber));
                if(result !== "NOOOO!"){
                    firstNumber = result;
                    operator = element;
                    secondNumber = "";
                    display.textContent = firstNumber + operator;
                    result = "";
                }else{
                    display.textContent = result;
                    result = "";
                    operator = "";
                    firstNumber = "";
                    secondNumber = "";
                }
            }
            break;
        case "=":
            if(operator && firstNumber && secondNumber){
                result = String(operate(operator, firstNumber, secondNumber));
                display.textContent = result;
                if(result === "NOOOO!"){
                    firstNumber = "";
                    secondNumber = "";
                    operator = "";
                }else{
                    firstNumber = result;
                    secondNumber = "";
                    operator = "";
                    result = "";
                }
            }
            break;
        case "AC":
            display.textContent = "0";
            firstNumber = "";
            secondNumber = "";
            operator = "";
            break;
        case ".":
            if(!operator && !(firstNumber.includes(element))){
                firstNumber += element;
                display.textContent += element;
            }
            if(operator && !(secondNumber.includes(element))){
                secondNumber += element;
                display.textContent += element;
            }
            break;
        default:
            if(content == "0" || result){
                display.textContent = element;
                firstNumber = element;
                result = "";
            }else if(firstNumber && operator){
                secondNumber += element;
                display.textContent += element;
            }else if(firstNumber){
                firstNumber += element;
                display.textContent += element;
            }
            else{
                display.textContent += element;
                firstNumber += element;
            }
    }
}

function handleBackspace(){
    content = display.textContent;
    if(content == "NOOOO!"){
        display.textContent = "0";
    }else if (content.length > 1){
        display.textContent = content.slice(0, -1);
        if (operator && secondNumber) {
            secondNumber = secondNumber.slice(0, -1);
        }else if(operator){
            operator = "";
        }
        else {
            firstNumber = firstNumber.slice(0, -1);
        }
    }else{
    display.textContent = "0";
    firstNumber = "";
    secondNumber = "";
    }
}

// Deal with keyboard
document.addEventListener('keydown', (event) => {
    const key = event.key === "Enter" ? "=" : event.key;
    if ("0123456789+-*/.=".includes(key)) {
        updateDisplay(key);
    } else if (key === "Backspace") {
        handleBackspace();
    } else if (key === "Escape") {
        updateDisplay("AC");
    }
});

// When a button is clicked
buttons.forEach((btn) => btn.addEventListener("click", () => updateDisplay(btn.textContent)))