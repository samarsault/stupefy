//
// Stupify
// Some Built-In Plugins
//
var fs = require("fs");

module.exports = {
	// register plugins
	register: function (plobj) {
		// names of plugins
		var names = Object.keys(plob);

		for (var i = 0;i < names.length;i++)
		{
			var nm =  names[i];

			if (!this.plugins.hasOwnProperty(nm))
			{
				this.plugins[nm] = plobj[nm];
			}
			else
			{
				this.error("Already has plugin - " + plobj);
			}
		}
	},
	plugins: {
		// Include another file
		include: function(filename) {
			try {
				fs.fstatSync(filename);
				return fs.readFileSync(filename, "utf-8");
			} catch(exp) {
				this.error("'" + filename + "' not found / accessible")
				return null;
			}
		},
		// include and stupefied file
		include_p: function (filename) {
			var data = this.plugins.include(filename);
			if (data != null)
				return this.process(data);
			return null;
		},
		// Define Variable
		define: function (name, value) {
			this.variables[name] = value;
			return null;
		},
		// Print Variable
		print: function (name) {
			if (this.variables.hasOwnProperty(name))
				return this.variables[name];
			return "Variable not defined";
		}
	}
};