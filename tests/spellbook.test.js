var assert = require("assert");
var stupefy = require("..");

describe("Spellbook", () => {
	var templ, outp;
	before(function() {
		stupefy.init();
		stupefy.conf["spells"] = __dirname + "/test_spells";
	});

	it("Discovers spells correctly", () => {
		assert.equal(stupefy.sbook.list().length, 2);
	});

	it("Enchants spells properly", () => {
		assert.equal(stupefy.sbook.enchant('shell_exec', {
			cmd: 'stupefy update'
		}).indexOf("require('child_process')"), 0);
	});
});