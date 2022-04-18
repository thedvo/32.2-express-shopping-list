//  You should use an array to store your items in the shopping list.
// Each item should be a JavaScript object with the keys of name, and price.

// Remember that since you are using an array for storage, this will be cleared each time the server restarts. Create a simple file called fakeDb.js which contains the following:

global.items = [
	{ name: 'Oreos', price: 3.99 },
	{ name: 'Cocoa Puffs', price: 4.99 },
	{ name: 'Cheez-Its', price: 3.99 },
];

module.exports = items;
