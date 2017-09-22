//
// Stupify
// Some Built-In Plugins
//
var fs = require('fs');
var path = require('path');

function getUserHome() {
	return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
}

module.exports = function (self) {
	return {
		// Include another file
		include: function(filename) {
			filename = path.join(process.cwd() , filename);
			try {
				fs.accessSync(filename, fs.F_OK)
				return fs.readFileSync(filename, "utf-8");
			} catch(exp) {
				self.error("'" + filename + "' not found / accessible")
				return null;
			}
		},
		// include and stupefied file
		include_p: function (filename) {
			var data = self.plugins.include(filename);
			if (data != null)
			return self.process(data);
			return null;
		},
		// Define Variable
		define: function (name, value) {
			self.variables[name] = value;
			return null;
		},
		enchant: function(name) {
			var spell = path.join(getUserHome(), ".spells", name);
			if (fs.existsSync(spell)) {
				return fs.readFileSync(spell, "utf8");
			} else {
				self.error("No spell named " + name + " found.");
			}

			return null;
		},
		// Print Variable
		print: function (name) {
			if (self.variables.hasOwnProperty(name))
				return self.variables[name];
			self.error("Variable" + name + " not defined");
			return null;
		}
		
	}
};
