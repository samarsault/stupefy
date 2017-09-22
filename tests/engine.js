var assert = require('assert');
var stupefy = require('../index');

describe('Processor', function () {

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
});