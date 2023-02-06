let buffer= '0';
let runningtotal = '0';
let previousoperator= null;
const screen= document.querySelector(".screen");
function buttonClick(value){
  if(isNaN(parseInt(value)))
  {
    handleSymbol(value);
  }
  else{
    handleNumber(value);
  }
  rerender();
}
function handleNumber(number){
  if(buffer == '0'){
    buffer = number;
  }
  else{
    buffer += number;
  }

}
function handleMath(value){
  if(buffer == '0')
  {
    return;
  }
  const intbuffer = parseInt(buffer);
  if (runningtotal == '0')
  {
    runningtotal = intbuffer;

  }
  else{
    flushoperation(intbuffer);
  }
  previousoperator = value;
  buffer = "0";
}
function flushoperation(intbuffer)
{
if(previousoperator == '+')
{
  runningtotal += intbuffer
}
else if(previousoperator == '-')
{
  runningtotal -= intbuffer
}
else if(previousoperator == 'x')
{
  runningtotal *= intbuffer;
}
else if(previousoperator == '÷')
{
  runningtotal /= intbuffer
}
}
function handleSymbol(symbol)
{
switch(symbol)
{
case 'C':
buffer= '0';
break;
case '←':
  if(buffer.length == '1'){
  buffer = '0';
  }
  else{
    buffer = buffer.substring(0, buffer.length -1);
  }
  case '=':
    if(previousoperator == null)
    {
      return;
    }
    flushoperation(parseInt(buffer));
    previousoperator = null;
    buffer = "" + runningtotal;
    runningtotal = '0';
  break;
case '+':
  case '-':
  case 'x':
  case '÷':
    handleMath(symbol);
    break;
}
}
function init() {
  console.log("hello")
  document
  .querySelector(".calc-buttons")
  .addEventListener("click", function(event){
    buttonClick(event.target.innerText);
  });
}
function rerender(){
  screen.innerText = buffer;
}
init();