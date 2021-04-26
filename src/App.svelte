<div class="flex-container">
    <button class="calc-item" on:click={handleClick}>+</button>
    <button class="calc-item" on:click={handleClick}>-</button>
    <button class="calc-item"on:click={handleClick}>/</button>
    <button class="calc-item" on:click={handleClick}>*</button>
    <br />
    <button class="calc-item" on:click={handleClick}>0</button>
    <button class="calc-item" on:click={handleClick}>1</button>
    <button class="calc-item" on:click={handleClick}>2</button>
    <button class="calc-item" on:click={handleClick}>3</button>
    <button class="calc-item" on:click={handleClick}>4</button>
    <button class="calc-item" on:click={handleClick}>5</button>
    <button class="calc-item" on:click={handleClick}>6</button>
    <button class="calc-item" on:click={handleClick}>7</button>
    <button class="calc-item" on:click={handleClick}>8</button>
    <button class="calc-item" on:click={handleClick}>9</button>
    <button on:click={calculate}>Calculate</button>
    <div class="calc-raw_1">{stackItems}</div>
    <div class="calc-raw">{calcRaw}</div>
    <button on:click={clearCalc}>Clear</button>
</div>

<style>
 .flex-container {
     display: flex;
     flex-direction: row;
 }

 .calc-item {
    flex:1 1 auto;
 }
 .calc-raw {
     position: absolute;
     top: 120px;
     left: 50%;
 }
 .calc-raw_1 {
    position: absolute;
     top: 120px;
     left: 40%;
 }

</style>
<script>

let calcRaw = 'AYooo Type a number';
let stackItems = ''
const stack = [];
function handleClick(event) {
    stack.push(event.target.innerHTML);
    stackItems += event.target.innerHTML;
}

function clearCalc() {
    calcRaw = 'AYooo Type a number';
    stackItems = '';
}
function calculate() {
    let sum = 0;
    if(stack.length < 3) {
        return;
    }
    if(stack.length > 3) {
        stack = [];
        alert("Stack isn't correct")
    }
    const number_1 = stack.pop();
    const operation = stack.pop();
    const number_2 = stack.pop();
    let result = 0;
    if(operation === "*") {
        result = Number(number_1) * Number(number_2);
    } else if(operation === "/") {
        result = Number(number_1) / Number(number_2);
    } else if(operation === "-") {
        result = Number(number_1) - Number(number_2);
    } else if (operation === '+') {
        result = Number(number_1) + Number(number_2);
    }
    calcRaw = result;
}
</script>