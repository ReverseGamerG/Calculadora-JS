'use strict'

const display = document.getElementById('display');
const numeros = document.querySelectorAll('[id*=tecla');
const operadores = document.querySelectorAll('[id*=operador');

let newNumber = true;
let operador;
let numeroAnterior;

const operacaoPendente = () => operador != undefined

const calcular = () => {
  if(operacaoPendente()){
    const numeroAtual = parseFloat(display.textContent.replace(',', '.'));
    newNumber = true;
    const resultado = eval (`${numeroAnterior}${operador}${numeroAtual}`);
    attDisplay(resultado)

    /*Outra Forma de Fazer*/
  //   if(operador == '+'){
  //     attDisplay(numeroAnterior + numeroAtual)
  //   }else if (operador == '-'){
  //     attDisplay(numeroAnterior - numeroAtual)
  //   }else if (operador == '*'){
  //     attDisplay(numeroAnterior * numeroAtual)
  //   }else if (operador == '/'){
  //     attDisplay(numeroAnterior / numeroAtual)
  //   }
  }
}

const attDisplay = (text) => {
  if(newNumber){
    display.textContent = text.toLocaleString('BR');
    newNumber = false;
  }else{
    display.textContent += text.toLocaleString('BR');
  }
}

const insertNumber = (event) => attDisplay(event.target.textContent);
numeros.forEach(numero => numero.addEventListener('click',  insertNumber));

const selectOperator = (event) => {
  if(!newNumber){
    calcular()
    newNumber = true;
    operador = event.target.textContent;
    numeroAnterior = parseFloat(display.textContent.replace(',', '.'));
  }
}
operadores.forEach (operador => operador.addEventListener('click', selectOperator));

const activeEqual = () => {
  calcular();
  operador = undefined;
}
document.getElementById('igual').addEventListener('click', activeEqual);

const cleanDs = () => display.textContent = '';
document.getElementById('limparDisplay').addEventListener('click', cleanDs);

const cleanCalc = () =>{
  cleanDs();
  operador = undefined;
  newNumber = true;
  numeroAnterior = undefined;
}
document.getElementById('limparCalculo').addEventListener('click', cleanCalc);

const removeLastNmbr = () =>{
  display.textContent = display.textContent.slice(0, -1);
}
document.getElementById('backspace').addEventListener('click', removeLastNmbr);


const inverterSinal = () => {
  newNumber = true;
  attDisplay(display.textContent * -1);
}
document.getElementById('inverter').addEventListener('click', inverterSinal);

const existeDec = () => display.textContent.indexOf(',') != -1;
const existeValor = () => display.textContent.length > 0;
const insertDec = () => {
  if (!existeDec()){
    if (existeValor()){
      attDisplay(',');
    }else{
      attDisplay('0,');
    }
  }
}
document.getElementById('decimal').addEventListener('click', insertDec);

const mapKeyboard = {
  '0'        : 'tecla0',
  '1'        : 'tecla1',
  '2'        : 'tecla2',
  '3'        : 'tecla3',
  '4'        : 'tecla4',
  '5'        : 'tecla5',
  '6'        : 'tecla6',
  '7'        : 'tecla7',
  '8'        : 'tecla8',
  '9'        : 'tecla9',
  '/'        : 'operadorDividir',
  '*'        : 'operadorMultiplicar',
  '-'        : 'operadorSubtrair',
  '+'        : 'operadorAdicionar',
  '='        : 'igual',
  'Enter'    : 'igual',
  'Backspace': 'backspace',
  'C'        : 'limparDisplay',
  'Espace'   : 'limparCalculo',
  ','        : 'decimal'
}

const mapingKeyboard = (event) => {
  const tecla = event.key;

  const allowTecla = () => Object.keys(mapKeyboard).indexOf(tecla) != -1;
  if (allowTecla) document.getElementById(mapKeyboard[tecla]).click()
}
document.addEventListener('keydown', mapingKeyboard)