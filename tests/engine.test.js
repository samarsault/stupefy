var assert = require('assert');
var stupefy = require('../index');

describe('Processor', () => {

	var templ, outp;
	before(function() {
		stupefy.init();
		stupefy.conf['spells'] = __dirname + '/test_spells'
	});

	it('Handles basic spells correctly', () => {
		templ = "{% enchant sort, size: 'n', array: 'A' %}";
		outp = stupefy.engine.process(templ);
		assert.equal(outp.indexOf('for'), 0);
	});

	it('Handles variables correctly', () => {
		templ = "{% def global, name: 'John', age: 12 %}{% print name %}\t{% print age %}";
		outp = stupefy.engine.process(templ);
		assert.equal(outp, 'John\t12');
	})

	it('Includes correctly', () => {
		templ = "{% include tests/include_test %}";
		outp = stupefy.engine.process(templ);
		assert.equal(outp, 'hello world')
	});
});

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