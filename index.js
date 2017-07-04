var plugins = require("./lib/plugins.js");
var doProcess = require("./lib/processor.js");
var tokenize = require("./lib//tokenizer.js");

var stupefy = {
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
	// register plugin object
	registerPlugin: function (plob) {
		// names of plugins
		var names = Object.keys(plob);

		for (var i = 0;i < names.length;i++)
		{
			var nm =  names[i];

			if (!this.plugins.hasOwnProperty(nm))
			{
				this.plugins[nm] = plob[nm];
			}
			else
			{
				this.error("Already has plugin - " + plobj);
			}
		}
	},
	// scope variables
	variables: { }
}

stupefy.plugins = plugins(stupefy);

module.exports = stupefy;