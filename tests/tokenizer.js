var assert = require('assert');
var stupefy = require('../index.js');

describe('Tokenizer', () => {
	var t1,t2,t3;

	before(function() {
		var tl1 = "enchant sort, size: 'n',  array: 'a'"
		var tl2 = "enchant jquery";
		var tl3 = "def $: 'name'";
		t1 = stupefy.engine.tokenize(tl1);
		t2 = stupefy.engine.tokenize(tl2);
 	});

	it('Returns correct command & data ', () => {
		assert.equal(t1.name, 'enchant');
		assert.equal(t1.arg, 'sort');
		assert.equal(t1.data.size, 'n');
		assert.equal(t1.data.array, 'a');
	});

	it('Handles omitted stuff', () => {
		assert.equal(t2.name, 'enchant');
		assert.equal(t2.arg, 'jquery');
	});

});