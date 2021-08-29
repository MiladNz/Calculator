let currTotal = 0;
let temp = "0"; //what's on display of calculator
let prevOperator = null;

const calcScreen = document.querySelector(".calc-result");
document.querySelector(".calculator-buttons").addEventListener("click", (e)=>{
    buttonClick(e.target.innerHTML);
});

//separates the value of the button clicks into NotANumber and Numbers
function buttonClick(value) {
    if(isNaN(parseInt(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}

function handleSymbol(value) {
    switch (value){
        case "C":
            temp = "0";
            currTotal = 0;
            prevOperator = null;
            break;
        case "=":
            if(prevOperator === null) {
                return; //this would mean that there is nothing to be calculated yet
            }
            flushOperation(parseInt(temp));
            temp = "" + currTotal;
            prevOperator = null;
            currTotal = 0;
            break;

        case "←":
            if(temp.length === 1){ //if the screen is any single number, always turn it to 0 when deleting
                temp = "0";
            }else{
                temp = temp.substring(0,temp.length-1); //delete the numbers one by one
            }
            breake;
            
        default:
            handleMath(value);
            break;
    }
}

function handleNumber(value){
    if(temp === "0"){
        temp = value;
    }else{
        temp += value;
    }
}

function handleMath(value){
    const internalBuffer = parseInt(temp);
    
    if (currTotal === 0){
        currTotal = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }
    prevOperator = value;
    temp = "0";
}

function flushOperation(internalBuffer){
    if(prevOperator === "+"){
        currTotal += internalBuffer;
    }else if(prevOperator === "-"){
        currTotal -= internalBuffer;
    }else if(prevOperator === "*"){
        currTotal *= internalBuffer;
    }else{
        currTotal /= internalBuffer;
    }
}

function rerenderScreen(){
    calcScreen.value = temp;
}