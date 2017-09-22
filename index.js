var plugins = require("./lib/plugins.js");
var doProcess = require("./lib/processor.js");
var tokenize = require("./lib/tokenizer.js");
var conf = require('./lib/conf.js');

var stupefy = {
	init: function() {
		stupefy.plugins = plugins(stupefy);
		
		if (conf != -1)
		{
			if (conf.hasOwnProperty('plugins'))
			{
				for (var i = 0;i < conf.plugins.length;i++)
				{
					plob = require(conf.plugins[i])(stupefy);
					stupefy.registerPlugin(plob);
				}
			}
			if (conf.hasOwnProperty('tag_start') && conf.hasOwnProperty('tag_end')) {
				stupefy.expr.start = conf.tag_start;
				stupefy.expr.start = conf.tag_end;
			} else {
				stupefy.autoTags = true;
			}
		}
		else {
			stupefy.autoTags = true;
		}
		
	},
	// log errors
	error: function (message) {
		console.error(message);
	},
	autoTags: false,
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

module.exports = stupefy;