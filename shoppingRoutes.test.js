process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
let shoppingList = require('../fakeDb');

beforeEach(function () {
	// pushes an item into the shoppingList array before every test
	shoppingList.push();
});

afterEach(function () {
	// method of clearing the shoppingList array after every test
	shoppingList.length = 0;
});
