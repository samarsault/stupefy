var assert = require('assert');
var stupefy = require('../index.js');

describe('Tokenizer', function () {
	var token;

	beforeEach(function() {
		var templ = "foo_bar (arg1, arg2, arg3) ";
		token = stupefy.tokenize(templ);
 	});

	it('Returns correct function name', function () {
		assert.equal(token.name, 'foo_bar');
	});


	it('Returns correct arguments', function () {
		assert.equal(token.arguments[0], 'arg1');
		assert.equal(token.arguments[1], 'arg2');
		assert.equal(token.arguments[2], 'arg3');
	});
});