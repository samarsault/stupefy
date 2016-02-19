var plugins = require("./lib/plugins.js");
var doProcess = require("./lib/processor.js");
var tokenize = require("./lib//tokenizer.js");

module.exports = {
	// log errors
	error: function (message) {
		console.error(message);
	},
	// expression structure
	expr: {
		start: "{%",
		end: "%}"
	},
	// get tokens
	tokenize: tokenize,
	// process function
	process: doProcess,
	// plugins
	plugins: plugins.plugins,
	// register plugin object
	registerPlugin: plugins.register,
	// scope variables
	variables: { }
}