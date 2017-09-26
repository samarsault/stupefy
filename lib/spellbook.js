//
// SpellBook Manager
//

var Handlebars = require("Handlebars");
var git = require("simple-git");
var path = require("path");
var fs = require("fs");

function objMerge (obj1, obj2) {
	for (var item in obj2) {
		if (!this.hasOwnProperty(item))
			obj1[item] = obj2[item];
	}
	return obj1;
}
var walk = function(dir) {
	var results = [];
	var list = fs.readdirSync(dir);
	list.forEach(function(file) {
		var f = file;
		file = path.join(dir,  file);
		var stat = fs.statSync(file);
		if (f.startsWith(".") || stat.isSymbolicLink()) 
			return;
		if (stat && stat.isDirectory() ) 
			results = results.concat(walk(file));
		else 
			results.push(file);
	
	});
	return results;
};


function render(str, data, gVars) {
	var template = Handlebars.compile(str);
	var templateData = objMerge(data, gVars);
	return template(templateData);
}

module.exports = function(stupefy) {
	var SB = {
		fetch: function(repo) {
			console.log("Fetching " + repo);
			git(stupefy.conf["spells"]).clone(repo, function(err, rsp) {
				console.log(rsp);
				if (!err) {
					console.log("Finished");
					console.log("Added spellbook " + repo);
					// Update metadata
				} else {
					stupefy.error(err);
				}
			});
		},
		update: function(dirName, done) {
			var rp = git(path.join(stupefy.conf["spells"], dirName));
			rp.getRemotes(true, function(e, remotes) {
				if (e || remotes.length == 0) { 
					stupefy.error("No remote found for " + dirName);
					return;
				}
				var url = remotes[0].refs.fetch;
				rp.fetch(url, function (err, fetchSummary) {
					if (!err) {
						// check if update available
						if (fetchSummary.raw != "") {
							rp.pull(function(error, update) {
								if (!error && update) {
									console.log("Updated Spellbook - " + dirName); 
									console.log(update.summary);
									done();
								}
							});
						} else {
							console.log(dirName + " is up to date");
						}
					}
				});
			});
		},
		// remove spellbook
		remove: function(name) { 
			var dir = path.join(stupefy.conf["spells"], name);
			if (fs.existsSync(dir)) {
				fs.rmdirSync(dir); 
			}
		},
		list: function(name) {
			if (!stupefy.spells) {
				
				var spellsDir = stupefy.conf["spells"];
				var results = [];
				var files = fs.readdirSync(spellsDir).filter(function(fname) {
					if(fs.statSync(path.join(spellsDir, fname)).isDirectory())
						return true;
					else if (!fname.startsWith("."))
						results.push(path.join(spellsDir, fname));
				});
				for (var i = 0;i < files.length;i++) {
					results = results.concat(walk(path.join(spellsDir, files[i]), name));
				}
				stupefy.spells = results;
			}

			if(typeof name == "undefined")
				return stupefy.spells;
			// filter
			return stupefy.spells.filter(function(relpath) {
				return path.basename(relpath) == name;
			});
		},
		enchant: function(name, data) {
			var results = SB.list(name);
			if (results.length > 0) {
				return render(fs.readFileSync(results[0], "utf8"), data, stupefy.variables);
			} else {
				// Search Remote Repositories
				stupefy.error("No such spell named " + name);
			}
		}
	};
	return SB;
};
