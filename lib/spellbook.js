//
// SpellBook Manager
//

var Handlebars = require("Handlebars");
var git = require("simple-git");
var path = require("path");
var fs = require("fs");
var FileHound = require("filehound");

function objMerge (obj1, obj2) {
	for (var item in obj2) {
		if (!this.hasOwnProperty(item))
			obj1[item] = obj2[item];
	}
	return obj1;
}

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
		update: function(dir) {
			var rp = git(dir);
			rp.getRemotes(true, function(e, remotes) {
				if (e || remotes.length == 0) { 
					stupefy.error("No remote found for " + dir);
					return;
				}
				var url = remotes[0].refs.fetch;
				git.fetch(url, function (err, raw) {
					if (!err) {
						// update available
						if (raw != "") {
							// do update
							rp.pull(function(err, update) {
								if (update) {
									console.log("Updated Spellbook"); 
									console.log(update.summary.changes);
								}
							});
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
			var j = FileHound.create().path(stupefy.conf["spells"])
				.ignoreHiddenFiles().ignoreHiddenDirectories();
			if (typeof name != "undefined")
				return j.match(name).findSync();
			return j.findSync();
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
