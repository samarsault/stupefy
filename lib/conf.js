var fs = require("fs");
var path = require("path");

var $HOME = process.env[(process.platform == "win32") ? "USERPROFILE" : "HOME"];
var filePath = path.join($HOME, ".stupefy.json");
var spellsDir = path.join($HOME, "spells");

module.exports = function () {
	if (fs.existsSync(filePath)) {
		return require(filePath);
	} else {
		if (!fs.existsSync(spellsDir)) 
			fs.mkdirSync(spellsDir);
		fs.writeFileSync(filePath, JSON.stringify({
			spells: spellsDir
		}));
		return { conf: spellsDir };
	}
};