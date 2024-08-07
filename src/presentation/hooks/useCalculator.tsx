import { useRef, useState } from "react"

enum Operator {
	add,
	subtract,
	multiply,
	divide,
}

export const useCalculator = () => {

	const [number, setNumber] = useState('0');
	const [prevNumber, setPrevNumber] = useState('0');

	const lastOperation = useRef<Operator>()

	const clean = () => {
		setNumber('0');
		setPrevNumber('0');
	}
	// Borrar el ultimo numerlo ingresado
	const deleteOperation = () => {
		let currentSign = '';
		let temporalNumber = number;

		if (number.includes('-')) {
			currentSign = '-';
			// temporalNumber = number.substring(1);
			// tambien se puede hacer
			temporalNumber = number.replace('-', '');
		}

		if (temporalNumber.length > 1) {
			return setNumber(currentSign + temporalNumber.slice(0, -1));
		}

		setNumber('0');
	}

	const toggleSign = () => {
		if (number.includes('-')) {
			return setNumber(number.replace('-', ''))
		}
		setNumber('-' + number);
	}


	const buildNumber = (numberSting: string) => {
		if (number.includes('.') && numberSting === '.') return;
		if (number.startsWith('0') || number.startsWith('-0')) {

			// Punto decimal
			if (numberSting === '.') {
				return setNumber(number + numberSting)
			}
			// Evaluar si es otro 0 y no hay punto
			if (numberSting === '0' && number.includes('.')) {
				return setNumber(number + numberSting);
			}
			// Evaluar si es diferente de 0, no hay punto decimal y es el primer numero
			if (numberSting !== '0' && !number.includes('.')) {
				return setNumber(numberSting)
			}
			// Evaluar para evitar 00000.00
			if (numberSting === '0' && !number.includes('.')) {
				return;
			}

			return setNumber(number + numberSting);

		}

		setNumber(number + numberSting)
	}

	const setLastNumber = () => {
		if (number.endsWith('.')){
			setPrevNumber( number.slice(0, -1))
		}else {
			setPrevNumber (number);
		}
		setNumber('0');
	}


	const divideOperation = () =>{
		setLastNumber();
		lastOperation.current = Operator.divide;
	}
	const multiplyOperation = () =>{
		setLastNumber();
		lastOperation.current = Operator.multiply;
	}
	const subtractOperation = () =>{
		setLastNumber();
		lastOperation.current = Operator.subtract;
	}
	const addOperation = () =>{
		setLastNumber();
		lastOperation.current = Operator.add;
	}


const calculateResult = () => {
	const num1 = Number(number); // Number me transforma a numero "number"
	const num2 = Number(prevNumber);

	switch(lastOperation.current) { //lastOperation.current -> seria: 	add,subtract,multiply,divide,
		case Operator.add:
			setNumber(`${num1 + num2}`);
			break;
		case Operator.subtract:
			setNumber(`${num2 - num1}`);
			break;
		case Operator.multiply:
			setNumber(`${num1 * num2}`);
			break;
		case Operator.divide:
			setNumber(`${num2 / num1}`);
			break;

		default:
		throw new Error ('Operation not implemented');
	}
	setPrevNumber('0');
}



	return {
		// Properties
		number,
		prevNumber,
		//  Methods
		buildNumber,
		toggleSign,
		clean,
		deleteOperation,
		divideOperation,
		multiplyOperation,
		subtractOperation,
		addOperation,
		calculateResult,
	}
}

