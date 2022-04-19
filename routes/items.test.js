process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../app');
let items = require('../fakeDb');

let item = { name: 'cookies', price: 2.99 };

beforeEach(function () {
	// pushes an item into the shoppingList array before every test
	items.push(item);
});

afterEach(function () {
	// method of clearing the shoppingList array after every test
	items.length = 0;
});

describe('GET /items', () => {
	test('Get all items', async () => {
		const res = await request(app).get('/items');
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ items: [item] });
	});
});

describe('GET /items/:name', () => {
	test('Get item by name', async () => {
		const res = await request(app).get(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ item: item });
	});
	test('Responds with 404 for invalid item', async () => {
		const res = await request(app).get(`/items/sandwich`);
		expect(res.statusCode).toBe(404);
	});
});

describe('POST /items', () => {
	test('Creating a shopping list item', async () => {
		const res = await request(app)
			.post('/items')
			.send({ name: 'cereal', price: 4.99 });
		expect(res.statusCode).toBe(201);
		expect(res.body).toEqual({ added: { name: 'cereal', price: 4.99 } });
	});
	test('Responds with 400 if name and price are missing', async () => {
		const res = await request(app).post('/items').send({});
		expect(res.statusCode).toBe(400);
	});
});

describe('/PATCH /items/:name', () => {
	test("Updating an item's name", async () => {
		const res = await request(app)
			.patch(`/items/${item.name}`)
			.send({ name: 'ice cream', price: 3.99 });
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ item: { name: 'ice cream', price: 3.99 } });
	});

	test('Responds with 404 for invalid name', async () => {
		const res = await request(app)
			.patch(`/items/chicken`)
			.send({ name: 'ice cream' });
		expect(res.statusCode).toBe(404);
	});
});

describe('/DELETE /items/:name', () => {
	test('Deleting an item', async () => {
		const res = await request(app).delete(`/items/${item.name}`);
		expect(res.statusCode).toBe(200);
		expect(res.body).toEqual({ message: 'Deleted' });
	});
	test('Responds with 404 for deleting invalid item', async () => {
		const res = await request(app).delete(`/items/bread`);
		expect(res.statusCode).toBe(404);
	});
});
