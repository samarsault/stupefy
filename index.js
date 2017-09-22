var engine = require("./lib/engine");
var conf = require('./lib/conf');

var stupefy = {
	init: function() {
		if (!this.conf)
		{
			if (this.conf.hasOwnProperty('plugins'))
			{
				for (var i = 0;i < this.conf.plugins.length;i++)
				{
					plob = require(this.conf.plugins[i])(stupefy);
					stupefy.registerPlugin(plob);
				}
			}
			if (this.conf.hasOwnProperty('tag_start') && this.conf.hasOwnProperty('tag_end')) {
				stupefy.expr.start = this.conf.tag_start;
				stupefy.expr.start = this.conf.tag_end;
			} else {
				stupefy.expr.start = "{%";
				stupefy.expr.end = "%}"
				if (!conf.autoTags)
					stupefy.autoTags = true;
			}
		}
		else {
			stupefy.autoTags = true;
		}
		
	},
	// log errors
	error:  (message) => {
		console.error(message);
	},
	autoTags: false,
	// expression structure
	expr: {
		start: "{%",
		end: "%}"
	},
	// register plugin object
	registerPlugin: function(plob) {
		// names of plugins
		var names = Object.keys(plob);
		
		for (var i = 0;i < names.length;i++)
		{
			var nm =  names[i];
			if (!this.plugins.hasOwnProperty(nm)) {
				this.engine[nm] = plob[nm];
			}
			else {
				this.error("Already has plugin - " + plobj);
			}
		}
	},
	// scope variables
	variables: { }
}

stupefy['conf'] = conf();
stupefy['engine'] = engine(stupefy);

module.exports = stupefy;