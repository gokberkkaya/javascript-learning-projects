const resultDOM = document.querySelector("#res");

let first = "";
let operand = "";
let second = "";
let result = "";

function setInput(input) {

    let x = input.target.innerHTML;

    if(first.search("-") == -1 && first.search("[+]") == -1 &&  first.search("[*]") == -1 && first.search("/") == -1){
        if (x == "0" || x == "1" || x == "+" || x == "*" || x == "-" || x == "/"){
            first += x;
        }
    }
    else {
        if (x == 0 || x == 1){
            operand = first.slice(-1);
            second += x;
        }
        else if (x == "C"){
            first = "";
            second = "";
        }
        else if (x == "="){
            result = calculate();
            first = "";
            second = "";
        }
    }
    if(result != ""){
        resultDOM.innerHTML = result;
        result = "";
    }
    else{
        resultDOM.innerHTML = first+second;
    }
}

let calculate = () => {

    newFirst = parseInt(first,2);
    newSecond = parseInt(second,2);
    let result;
    if(operand == "+"){
        result = newFirst + newSecond;
    }
    else if(operand == "-"){
        result = newFirst - newSecond;
    }
    else if(operand == "*"){
        result = newFirst * newSecond;
    }
    else if(operand == "/"){
        result = newFirst / newSecond;
    }

    return result.toString(2);
}

const btn0DOM = document.querySelector("#btn0");
btn0DOM.addEventListener("click", setInput);
const btn1DOM = document.querySelector("#btn1");
btn1DOM.addEventListener("click", setInput);
const btnClrDOM = document.querySelector("#btnClr");
btnClrDOM.addEventListener("click", setInput);
const btnEqlDOM = document.querySelector("#btnEql");
btnEqlDOM.addEventListener("click", setInput);
const btnSumDOM = document.querySelector("#btnSum");
btnSumDOM.addEventListener("click", setInput);
const btnSubDOM = document.querySelector("#btnSub");
btnSubDOM.addEventListener("click", setInput);
const btnMulDOM = document.querySelector("#btnMul");
btnMulDOM.addEventListener("click", setInput);
const btnDivDOM = document.querySelector("#btnDiv");
btnDivDOM.addEventListener("click", setInput);
