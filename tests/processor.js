var assert = require('assert');
var stupefy = require('../index.js');

describe('Processor', function () {

	var templ, outp;

	it('Handles basic expressions correctly', function () {
		templ = "{% define(PI, 3.14159) %}{% print(PI) %}";
		outp = stupefy.process(templ);
		assert.equal(outp, '3.14159');
	});

	it('Replaces preprocessor directive, nothing else', function () {
		templ = "{% define(PI, 3.14159) %} {% print(PI) %} is pi";
		outp = stupefy.process(templ);
		assert.equal(outp, ' 3.14159 is pi');
	});

	it('Customizable Tags', function () {
		stupefy.expr.start = "##";
		stupefy.expr.end = "##";

		templ = "## define(name, stupefy)## ## print(name) ##";
		outp = stupefy.process(templ);
		assert.equal(outp, ' stupefy')
	});
});