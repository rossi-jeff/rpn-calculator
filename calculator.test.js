import { Calculator } from './calculator.js';
import * as jest from 'jest-mock';

global.console = {
	log: jest.fn(),
	error: jest.fn()
}

global.process = {
	exit: jest.fn()
}

describe('Reverse Polish Notation Calculator', () => {
	beforeAll(done => {
  	done()
	});

	afterAll(done => {
  	done()
	});

	it('Should return 0 for empty input', () => {
		const calc = new Calculator();
		calc.input('');

		expect(global.console.log).toHaveBeenCalledWith(0);
	});

	it('Should error on divide by zero', () => {
		const calc = new Calculator();
		calc.input('2 0 /');

		expect(global.console.error).toHaveBeenCalledWith('Error: Division by zero');
		expect(global.process.exit).toHaveBeenCalled();
	});

	it('Should return the input on single input', () => {
		const calc = new Calculator();
		calc.input('5');

		expect(global.console.log).toHaveBeenCalledWith(5);
	});

	it('Should return the last input when no operators', () => {
		const calc = new Calculator();
		calc.input('5 6');

		expect(global.console.log).toHaveBeenCalledWith(6);
	});

	it('Should perform addition', () => {
		const calc = new Calculator();
		calc.input('8 3 +');

		expect(global.console.log).toHaveBeenCalledWith(11);
	});

	it('Should perform subtraction', () => {
		const calc = new Calculator();
		calc.input('12 5 -');

		expect(global.console.log).toHaveBeenCalledWith(7);
	});

	it('Should perform multiplication', () => {
		const calc = new Calculator();
		calc.input('4 5 *');

		expect(global.console.log).toHaveBeenCalledWith(20);
	});

	it('Should perform division', () => {
		const calc = new Calculator();
		calc.input('18 3 /');

		expect(global.console.log).toHaveBeenCalledWith(6);
	});

	it('Should quit on command', () => {
		const calc = new Calculator();
		calc.input('q');

		expect(global.console.log).toHaveBeenCalledWith('Goodbye!!!');
	});

	it('Should display a help message', () => {
		const calc = new Calculator();
		calc.input('h');

		expect(global.console.log).toHaveBeenCalled();
	});
})