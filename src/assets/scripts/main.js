// src/test.js
class Person {
	constructor(name, age) {
		this.name = name;
		this.age = age;
	}

	greet() {
		console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
	}

	async getData() {
		const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
		const data = await response.json();
		console.log('Fetched data:', data);
	}
}

const person = new Person('John Doe', 30);
person.greet();
person.getData();

const { name, age } = person;
console.log(`Destructured name: ${name}, age: ${age}`);
