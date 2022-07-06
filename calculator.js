import * as readline from 'readline';
const prompts = readline.createInterface(process.stdin, process.stdout);
  

export class Calculator {
	commands = new Set(['q','c','h','d']);
	operators = new Set(['+','-','*','/']);
	data = []
	running = true

	run() {
		console.log('Welcome to RPN Calulator\n');
		this.help();
	}

	read() {
		if (!this.running) this.quit();
		prompts.question('> ', response => {
			this.input(response);
		})
	}

	error(msg) {
		console.error(`Error: ${msg}`);
		this.quit();
	}

	input(str) {
		const tokens = str.toLowerCase().split(/\s+/)
		for (const token of tokens) {
			if (this.commands.has(token)) {
				switch (token) {
					case 'c':
						return this.clear();
					case 'h':
						return this.help();
					case 'd':
						return this.display();
					default:
						return this.quit();
				}
			} else if (isNaN(token) && !this.operators.has(token)) {
				console.log(`${token} is not a valid token`);
			} else {
				this.data.push(token)
			}
		}
		this.evaluate();
	}

	help() {
		console.log('Help');
		console.log('-------------------------');
		console.log('q: quit the program');
		console.log('c: clear program data');
		console.log('d: display program data');
		console.log('h: display this message');
		console.log('-------------------------');
		this.read();
	}

	clear() {
		console.log('clearing data');
		this.data = [];
		this.read();
	}

	quit() {
		this.running = false;
		console.log('Goodbye!!!');
		process.exit();
	}

	evaluate() {
		const { operators, data } = this
		const results = []
		for (const token of data) {
			if (operators.has(token)) {
				const op1 = results.pop()
				const op2 = results.pop()
				if (op1 === undefined || op2 === undefined) return this.error('Invalid Input');
				switch (token) {
					case '+':
						results.push(op1 + op2);
						break;
					case '-':
						results.push(op2 - op1);
						break;
					case '*':
						results.push(op1 * op2);
						break;
					case '/':
						if (op1 === 0) return this.error('Division by zero');
						results.push(op2 / op1);
						break;
					default:
						return this.error('Should not get here');
				}
			} else {
				results.push(parseFloat(token));
			}
		}

		const value = results.pop() || 0;
		console.log(value);

		this.read();
	}

	display() {
		console.log(this.data);
		this.read();
	}
}